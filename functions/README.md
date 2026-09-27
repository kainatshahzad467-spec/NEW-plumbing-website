# Aquora Plumbing - Firebase Cloud Function Email Dispatcher

This Cloud Function automatically triggers whenever a new customer appointment or service request is created in the `service_requests` Firestore collection (`ai-studio-aquoraplumbingso-88b35288-9039-4271-8a87-4d0d38cd5c9d`), rendering an executive HTML alert and sending it directly to the site owner (`kainat.shahzad467@gmail.com`).

---

## What It Does
1. **Listens to Firestore Events**:
   - `onDocumentCreated` on `service_requests/{requestId}`
   - Configured specifically for database `ai-studio-aquoraplumbingso-88b35288-9039-4271-8a87-4d0d38cd5c9d`
2. **Alerts Site Owner**:
   - Sends full customer details (Name, Phone number with tap-to-call, Email, Service address with Google Maps link, Service requested, Urgency window, and notes).
   - Urgency badge (Emergency calls highlighted with priority red badge).
3. **Audit Trail**:
   - Writes record to Firestore collection `notifications`
   - Updates the original `service_requests` doc with `ownerNotified: true`.

---

## Deployment to Firebase

### 1. Install Dependencies
```bash
cd functions
npm install
```

### 2. Configure Environment Variables
You can configure your SMTP credentials (e.g. SendGrid, Mailgun, AWS SES, or Gmail App Password) using Firebase Secret Manager or environment variables:

```bash
firebase functions:secrets:set SMTP_PASS
```
Or in a `.env` file in `functions/`:
```env
SITE_OWNER_EMAIL=kainat.shahzad467@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=dispatch@aquoraplumbing.com
SMTP_PASS=your-16-char-app-password
SMTP_FROM_NAME="Aquora Emergency Dispatch"
SMTP_FROM_EMAIL=dispatch@aquoraplumbing.com
```

### 3. Deploy
```bash
firebase deploy --only functions
```

Or deploy just the service request trigger:
```bash
firebase deploy --only functions:onServiceRequestCreated
```

---

## Testing Locally with Firebase Emulator
```bash
cd functions
npm run serve
```
