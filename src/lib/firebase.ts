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
  const docRef = await addDoc(subscribersCol, {
    email: email.trim().toLowerCase(),
    subscribedAt: now,
    source,
    active: true,
  });
  return docRef.id;
}
