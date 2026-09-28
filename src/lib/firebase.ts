import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  User,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { sendWelcomeEmailViaEmailJS, sendBookingEmailNotification } from './emailService';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Initialize Firestore with custom database ID if provided
export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

export const SITE_OWNER_EMAIL = 'kainat.shahzad467@gmail.com';

export function isSiteOwner(user: User | null): boolean {
  return Boolean(user && user.email?.toLowerCase() === SITE_OWNER_EMAIL.toLowerCase());
}

// Data structure for service requests in Firestore
export interface ServiceRequestDoc {
  id?: string;
  userId?: string | null;
  bookingRef: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  serviceType: string;
  urgency: 'emergency' | 'sameday' | 'scheduled';
  notes?: string;
  status: 'pending' | 'confirmed' | 'dispatched' | 'completed' | 'cancelled';
  createdAt: string;
  source?: string;
  ownerNotified?: boolean;
  ownerNotifiedAt?: string;
  siteOwnerEmail?: string;
}

/**
 * Sign in with Google Popup
 */
export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  // Persist user record in users collection
  if (result.user) {
    try {
      const userRef = doc(db, 'users', result.user.uid);
      await setDoc(userRef, {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName || '',
        photoURL: result.user.photoURL || '',
        lastLogin: new Date().toISOString(),
      }, { merge: true });
    } catch {
      // Ignored if user profile write rules vary
    }
  }
  return result.user;
}

/**
 * Sign up with Email & Password
 */
export async function signUpWithEmail(email: string, pass: string, name?: string) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
  if (name && userCredential.user) {
    await updateProfile(userCredential.user, { displayName: name });
  }
  if (userCredential.user) {
    try {
      const userRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userRef, {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: name || '',
        lastLogin: new Date().toISOString(),
      }, { merge: true });
    } catch {
      // Ignored
    }
  }
  return userCredential.user;
}

/**
 * Sign in with Email & Password
 */
export async function logInWithEmail(email: string, pass: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, pass);
  return userCredential.user;
}

/**
 * Send Password Reset Email
 */
export async function resetPassword(email: string) {
  return await sendPasswordResetEmail(auth, email);
}

/**
 * Sign out
 */
export async function logOut() {
  return await signOut(auth);
}

/**
 * Save customer appointment or service request in Firestore
 */
export async function saveServiceRequest(data: Omit<ServiceRequestDoc, 'id'>): Promise<string> {
  const requestsCollection = collection(db, 'service_requests');
  const createdAt = data.createdAt || new Date().toISOString();
  
  const docRef = await addDoc(requestsCollection, {
    ...data,
    createdAt,
    status: data.status || 'pending',
    siteOwnerEmail: SITE_OWNER_EMAIL,
    ownerNotified: true,
    ownerNotifiedAt: createdAt,
  });

  // Also record into the audit notifications collection for the site owner
  try {
    const notificationsCollection = collection(db, 'notifications');
    await addDoc(notificationsCollection, {
      requestId: docRef.id,
      bookingRef: data.bookingRef,
      recipientEmail: SITE_OWNER_EMAIL,
      subject: `${data.urgency === 'emergency' ? '🚨 EMERGENCY' : '📋 NEW BOOKING'}: ${data.serviceType} - ${data.name} [${data.bookingRef}]`,
      customerName: data.name,
      customerPhone: data.phone,
      serviceType: data.serviceType,
      urgency: data.urgency,
      status: 'sent',
      sentAt: createdAt,
    });
  } catch {
    // Non-critical if offline or guest write rule
  }

  // Also trigger automated confirmation email via configured EmailJS
  try {
    await sendBookingEmailNotification({
      bookingRef: data.bookingRef,
      customerName: data.name,
      customerEmail: data.email,
      customerPhone: data.phone,
      serviceType: data.serviceType,
      urgency: data.urgency,
      address: data.address,
      notes: data.notes,
    });
  } catch (emailErr) {
    console.warn('Booking confirmation email notice:', emailErr);
  }

  return docRef.id;
}

/**
 * Update service request status (for site owner / dispatchers)
 */
export async function updateServiceRequestStatus(
  requestId: string,
  status: ServiceRequestDoc['status']
) {
  const requestDocRef = doc(db, 'service_requests', requestId);
  await setDoc(requestDocRef, { status }, { merge: true });
}

/**
 * Subscribe to user's service requests in Firestore
 * If the user is the site owner, loads all incoming customer bookings!
 */
export function subscribeToUserRequests(
  user: User,
  onUpdate: (requests: ServiceRequestDoc[]) => void,
  onError?: (err: Error) => void
) {
  const requestsRef = collection(db, 'service_requests');
  
  // If authenticated as site owner, listen to all incoming service requests
  const q = isSiteOwner(user)
    ? query(requestsRef)
    : query(requestsRef, where('userId', '==', user.uid));

  return onSnapshot(
    q,
    (snapshot) => {
      const list: ServiceRequestDoc[] = [];
      snapshot.forEach((d) => {
        list.push({ id: d.id, ...d.data() } as ServiceRequestDoc);
      });
      // Sort newest first by createdAt
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      onUpdate(list);
    },
    (error) => {
      if (onError) onError(error);
    }
  );
}

/**
 * Save newsletter subscriber to Firestore
 */
export async function subscribeToNewsletter(email: string, source: string = 'footer_newsletter') {
  const subscribersCol = collection(db, 'newsletter_subscribers');
  const now = new Date().toISOString();
  const cleanEmail = email.trim().toLowerCase();

  // 1. Save subscriber document
  const docRef = await addDoc(subscribersCol, {
    email: cleanEmail,
    subscribedAt: now,
    source,
    active: true,
  });

  // 2. Queue Email document in Firestore '/mail' collection (Industry standard Firebase Trigger Email / SendGrid / SMTP Extension schema)
  try {
    const mailCol = collection(db, 'mail');
    await addDoc(mailCol, {
      to: [cleanEmail],
      message: {
        subject: '🎉 Welcome to Aquora Plumbing Home Care Club & VIP Maintenance Alerts',
        text: `Hello,\n\nThank you for subscribing to the Aquora Plumbing Solutions Home Care Club!\n\nHere is your seasonal plumbing maintenance guide and VIP $50 voucher on your next service.\n\nPriority Emergency Dispatch: (800) 459-PIPE\nOfficial Site: https://aquoraplumbing.com\n\nWarm regards,\nCarlos Mendoza & The Aquora Engineering Team`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #0c0e12; color: #ffffff; border-radius: 16px;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h1 style="color: #10B981; margin: 0; font-size: 26px; letter-spacing: -0.5px;">Aquora Plumbing Solutions</h1>
              <p style="color: #94a3b8; font-size: 14px; margin-top: 4px;">State Licensed & Insured Master Plumbers</p>
            </div>
            
            <div style="background-color: #171b22; padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 20px;">
              <h2 style="color: #ffffff; font-size: 18px; margin-top: 0;">Welcome to the Home Care Club!</h2>
              <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6;">
                You are now registered to receive our monthly seasonal preventative checklists, freeze alerts, and exclusive VIP member promotions.
              </p>
              
              <div style="background-color: rgba(16, 185, 129, 0.15); border: 1px solid #10B981; padding: 14px; border-radius: 8px; margin: 16px 0; text-align: center;">
                <p style="color: #10B981; font-weight: bold; font-size: 16px; margin: 0;">PROMO CODE: AQUORA50</p>
                <p style="color: #94a3b8; font-size: 12px; margin: 4px 0 0 0;">$50 OFF any residential drain cleaning or water heater flush</p>
              </div>

              <h3 style="color: #f1f5f9; font-size: 14px; margin-bottom: 8px;">Your 3 Immediate Homeowner Tips:</h3>
              <ul style="color: #94a3b8; font-size: 13px; line-height: 1.6; padding-left: 20px;">
                <li>Locate and tag your main water shut-off valve before an emergency occurs.</li>
                <li>Never pour grease, oil, or fibrous peels down garbage disposals.</li>
                <li>Test your water heater's Temperature & Pressure (T&P) relief valve annually.</li>
              </ul>
            </div>

            <div style="text-align: center; padding: 12px; border-top: 1px solid rgba(255,255,255,0.1);">
              <p style="color: #F95700; font-size: 14px; font-weight: bold; margin: 0;">24/7 Rapid Emergency Dispatch: (800) 459-PIPE</p>
              <p style="color: #64748b; font-size: 11px; margin-top: 8px;">Aquora Plumbing Solutions Inc · Metro Dispatch Center</p>
            </div>
          </div>
        `,
      },
      createdAt: now,
      subscriberId: docRef.id,
    });
  } catch (err) {
    console.warn('Could not queue direct email to /mail collection:', err);
  }

  // 3. Also notify site owner audit log
  try {
    const notificationsCollection = collection(db, 'notifications');
    await addDoc(notificationsCollection, {
      subscriberId: docRef.id,
      recipientEmail: SITE_OWNER_EMAIL,
      subject: `📬 NEW NEWSLETTER SUBSCRIBER: ${cleanEmail}`,
      subscriberEmail: cleanEmail,
      status: 'queued',
      sentAt: now,
      source,
    });
  } catch {
    // Non-critical audit log
  }

  // 4. Send free direct client welcome email via EmailJS (Option 2)
  try {
    await sendWelcomeEmailViaEmailJS({
      toEmail: cleanEmail,
      promoCode: 'AQUORA50',
    });
  } catch (emailErr) {
    console.warn('EmailJS auto-send note:', emailErr);
  }

  return docRef.id;
}

export interface CustomerReviewDoc {
  id?: string;
  name: string;
  role: string;
  service: string;
  rating: number;
  comment: string;
  createdAt: string;
  status: 'published' | 'pending';
}

/**
 * Submit a customer review into Firestore
 */
export async function submitCustomerReview(review: Omit<CustomerReviewDoc, 'id' | 'createdAt' | 'status'>) {
  const reviewsCol = collection(db, 'reviews');
  const now = new Date().toISOString();

  const docRef = await addDoc(reviewsCol, {
    ...review,
    createdAt: now,
    status: 'published',
  });

  return docRef.id;
}

/**
 * Subscribe to real-time customer reviews from Firestore
 */
export function subscribeToCustomerReviews(
  onReviewsUpdate: (reviews: CustomerReviewDoc[]) => void,
  onError?: (error: Error) => void
) {
  const reviewsCol = collection(db, 'reviews');
  const q = query(reviewsCol, orderBy('createdAt', 'desc'));

  return onSnapshot(
    q,
    (snapshot) => {
      const reviewsList: CustomerReviewDoc[] = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<CustomerReviewDoc, 'id'>),
      }));
      onReviewsUpdate(reviewsList);
    },
    (error) => {
      console.warn('Failed to listen to reviews:', error);
      if (onError) onError(error);
    }
  );
}
