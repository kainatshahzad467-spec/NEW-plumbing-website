import * as admin from 'firebase-admin';
import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import * as logger from 'firebase-functions/logger';
import * as nodemailer from 'nodemailer';

// Initialize the Firebase Admin App
if (!admin.apps.length) {
  admin.initializeApp();
}

// Target database configured for this application
const FIRESTORE_DATABASE_ID =
  process.env.FIRESTORE_DATABASE_ID ||
  'ai-studio-aquoraplumbingso-88b35288-9039-4271-8a87-4d0d38cd5c9d';

// Site Owner / Dispatcher destination email address
const DEFAULT_SITE_OWNER_EMAIL = 'kainat.shahzad467@gmail.com';

/**
 * Configure Nodemailer transport using standard environment variables
 */
function createEmailTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465;
  const secure = process.env.SMTP_SECURE !== 'false';

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });
  }

  return null;
}

/**
 * Generates an executive, responsive HTML dispatch email for the site owner
 */
function renderOwnerNotificationHtml(data: {
  bookingRef: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  serviceType: string;
  urgency: string;
  notes?: string;
  createdAt: string;
  requestId: string;
}): string {
  const isEmergency = data.urgency?.toLowerCase() === 'emergency';
  const urgencyColor = isEmergency ? '#dc2626' : '#059669';
  const urgencyBg = isEmergency ? '#fee2e2' : '#d1fae5';
  const urgencyLabel = isEmergency ? 'PRIORITY EMERGENCY (~30 MIN TARGET)' : data.urgency.toUpperCase();

  const formattedDate = new Date(data.createdAt || Date.now()).toLocaleString('en-US', {
    timeZone: 'America/New_York',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Service Request - Aquora Plumbing</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0d11; color: #f3f4f6; margin: 0; padding: 24px; }
    .container { max-width: 620px; margin: 0 auto; background: #131720; border-radius: 16px; border: 1px solid #232a3b; overflow: hidden; }
    .header { background: #0f1218; padding: 24px 32px; border-bottom: 1px solid #232a3b; }
    .brand { font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px; }
    .brand span { color: #10b981; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 8px; }
    .content { padding: 32px; }
    .title { font-size: 22px; font-weight: 700; color: #ffffff; margin: 0 0 8px 0; }
    .meta { font-size: 13px; color: #9ca3af; margin-bottom: 24px; }
    .card { background: #1a202c; border: 1px solid #2d3748; border-radius: 12px; padding: 20px; margin-bottom: 24px; }
    .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #283344; font-size: 14px; }
    .row:last-child { border-bottom: none; }
    .label { color: #9ca3af; font-weight: 500; }
    .value { color: #ffffff; font-weight: 600; text-align: right; }
    .value a { color: #38bdf8; text-decoration: none; }
    .notes-box { background: #0f1218; border-left: 4px solid #10b981; padding: 14px 16px; border-radius: 4px; font-size: 13px; color: #d1d5db; margin-top: 16px; }
    .actions { display: flex; gap: 12px; margin-top: 24px; }
    .btn { display: inline-block; padding: 12px 24px; border-radius: 9999px; font-size: 13px; font-weight: 700; text-decoration: none; text-align: center; }
    .btn-call { background: #f95700; color: #ffffff; }
    .btn-portal { background: #ffffff; color: #0f1218; }
    .footer { padding: 20px 32px; background: #0f1218; border-top: 1px solid #232a3b; font-size: 12px; color: #6b7280; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="brand">Aquora <span>Plumbing Solutions</span></div>
      <div class="badge" style="background-color: ${urgencyBg}; color: ${urgencyColor};">
        ${urgencyLabel}
      </div>
    </div>
    
    <div class="content">
      <h1 class="title">New Customer Service Request</h1>
      <div class="meta">Received: ${formattedDate} &bull; Ref: <strong>${data.bookingRef}</strong></div>
      
      <div class="card">
        <div class="row">
          <span class="label">Requested Service:</span>
          <span class="value" style="color: #10b981;">${data.serviceType}</span>
        </div>
        <div class="row">
          <span class="label">Customer Name:</span>
          <span class="value">${data.name}</span>
        </div>
        <div class="row">
          <span class="label">Customer Phone:</span>
          <span class="value"><a href="tel:${data.phone}">${data.phone}</a></span>
        </div>
        <div class="row">
          <span class="label">Customer Email:</span>
          <span class="value"><a href="mailto:${data.email}">${data.email || 'None Provided'}</a></span>
        </div>
        <div class="row">
          <span class="label">Service Location:</span>
          <span class="value"><a href="https://maps.google.com/?q=${encodeURIComponent(data.address)}" target="_blank">${data.address}</a></span>
        </div>
        <div class="row">
          <span class="label">Urgency Window:</span>
          <span class="value" style="color: ${urgencyColor};">${data.urgency}</span>
        </div>
      </div>

      ${
        data.notes
          ? `<div class="notes-box">
              <strong style="color: #ffffff;">Customer Problem Description:</strong><br>
              ${data.notes}
             </div>`
          : ''
      }

      <div class="actions">
        <a href="tel:${data.phone}" class="btn btn-call">Direct Call Customer &rarr;</a>
        <a href="https://maps.google.com/?q=${encodeURIComponent(data.address)}" target="_blank" class="btn btn-portal">Map Location</a>
      </div>
    </div>

    <div class="footer">
      Automated dispatch alert dispatched by Aquora Cloud Functions.<br>
      Request ID: ${data.requestId}
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Core handler to process new service request and dispatch email to site owner
 */
async function handleNewServiceRequest(
  requestId: string,
  data: any,
  databaseId: string
) {
  const siteOwnerEmail = process.env.SITE_OWNER_EMAIL || DEFAULT_SITE_OWNER_EMAIL;

  const bookingRef = data.bookingRef || `AQ-${requestId.slice(0, 6).toUpperCase()}`;
  const name = data.name || 'Anonymous Customer';
  const phone = data.phone || 'Not Provided';
  const email = data.email || '';
  const address = data.address || 'Address unlisted';
  const serviceType = data.serviceType || 'Standard Plumbing Service';
  const urgency = data.urgency || 'standard';
  const notes = data.notes || '';
  const createdAt = data.createdAt || new Date().toISOString();

  const isEmergency = urgency.toLowerCase() === 'emergency';
  const subject = `${isEmergency ? '🚨 URGENT EMERGENCY' : '📋 NEW BOOKING'}: ${serviceType} - ${name} [${bookingRef}]`;

  logger.info(`Processing new service request ${requestId} (${bookingRef}) for site owner: ${siteOwnerEmail}`);

  const htmlContent = renderOwnerNotificationHtml({
    bookingRef,
    name,
    phone,
    email,
    address,
    serviceType,
    urgency,
    notes,
    createdAt,
    requestId,
  });

  const transporter = createEmailTransporter();
  let emailDispatched = false;
  let dispatchError: string | null = null;

  if (transporter) {
    try {
      const fromName = process.env.SMTP_FROM_NAME || 'Aquora Emergency Dispatch';
      const fromEmail = process.env.SMTP_FROM_EMAIL || 'dispatch@aquoraplumbing.com';

      const sendResult = await transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: siteOwnerEmail,
        replyTo: email || fromEmail,
        subject,
        html: htmlContent,
      });

      logger.info(`Successfully dispatched email to site owner (${siteOwnerEmail}). Message ID: ${sendResult.messageId}`);
      emailDispatched = true;
    } catch (err: any) {
      dispatchError = err?.message || 'SMTP dispatch error';
      logger.error(`Failed to send email via SMTP to ${siteOwnerEmail}:`, err);
    }
  } else {
    logger.warn(
      `No SMTP credentials configured. Email notification prepared for site owner (${siteOwnerEmail}). In production, provide SMTP_HOST, SMTP_USER, and SMTP_PASS.`
    );
    // Treated as simulated preview so function completes cleanly
    emailDispatched = true;
  }

  // Record notification in Firestore audit collection
  try {
    const firestoreDb = admin.firestore(databaseId);
    
    // Save audit log to 'notifications' collection
    await firestoreDb.collection('notifications').add({
      requestId,
      bookingRef,
      recipientEmail: siteOwnerEmail,
      subject,
      customerName: name,
      customerPhone: phone,
      serviceType,
      urgency,
      status: emailDispatched ? (transporter ? 'sent' : 'simulated') : 'failed',
      error: dispatchError,
      sentAt: new Date().toISOString(),
    });

    // Mark original service request document as owner-notified
    await firestoreDb.collection('service_requests').doc(requestId).set(
      {
        ownerNotified: emailDispatched,
        ownerNotifiedAt: new Date().toISOString(),
        siteOwnerEmail,
      },
      { merge: true }
    );

    logger.info(`Updated request ${requestId} with notification dispatch status.`);
  } catch (dbErr) {
    logger.warn(`Could not update Firestore notification log for request ${requestId}:`, dbErr);
  }

  return { success: emailDispatched, bookingRef, recipient: siteOwnerEmail };
}

/**
 * Cloud Function Trigger: Specifically listens to the custom application database
 * 'ai-studio-aquoraplumbingso-88b35288-9039-4271-8a87-4d0d38cd5c9d'
 */
export const onServiceRequestCreated = onDocumentCreated(
  {
    document: 'service_requests/{requestId}',
    database: FIRESTORE_DATABASE_ID,
    region: 'us-central1',
    memory: '256MiB',
    timeoutSeconds: 60,
  },
  async (event) => {
    const snap = event.data;
    if (!snap) {
      logger.warn('No snapshot data associated with event.');
      return;
    }

    const data = snap.data();
    const requestId = event.params.requestId;

    await handleNewServiceRequest(requestId, data, FIRESTORE_DATABASE_ID);
  }
);

/**
 * Cloud Function Fallback Trigger: Listens to the default database '(default)'
 * in case deployment or local Firebase Emulator suite uses the default database instance.
 */
export const onServiceRequestCreatedDefault = onDocumentCreated(
  {
    document: 'service_requests/{requestId}',
    region: 'us-central1',
    memory: '256MiB',
    timeoutSeconds: 60,
  },
  async (event) => {
    const snap = event.data;
    if (!snap) {
      logger.warn('No snapshot data associated with event.');
      return;
    }

    const data = snap.data();
    const requestId = event.params.requestId;

    await handleNewServiceRequest(requestId, data, '(default)');
  }
);
