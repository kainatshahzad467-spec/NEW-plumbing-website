import React, { useState, useEffect } from 'react';
import {
  X,
  User as UserIcon,
  Mail,
  Lock,
  LogOut,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Phone,
  FileText,
  MapPin,
  RefreshCw,
  Settings2,
  Send,
} from 'lucide-react';
import { User } from 'firebase/auth';
import { getStoredEmailJSKeys, saveEmailJSKeys, sendWelcomeEmailViaEmailJS } from '../lib/emailService';
import {
  auth,
  signInWithGoogle,
  logInWithEmail,
  signUpWithEmail,
  logOut,
  resetPassword,
  subscribeToUserRequests,
  updateServiceRequestStatus,
  isSiteOwner,
  SITE_OWNER_EMAIL,
  ServiceRequestDoc,
} from '../lib/firebase';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onOpenBooking: () => void;
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onOpenBooking,
}) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  // User's service requests state
  const [requests, setRequests] = useState<ServiceRequestDoc[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(false);

  // EmailJS Direct Delivery Keys State (for 100% Free Emailing)
  const [showEmailSettings, setShowEmailSettings] = useState(false);
  const [emailKeys, setEmailKeys] = useState(getStoredEmailJSKeys());
  const [emailConfigSaved, setEmailConfigSaved] = useState(false);
  const [testEmailAddress, setTestEmailAddress] = useState('');
  const [testSending, setTestSending] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  // Subscribe to requests when user is logged in
  useEffect(() => {
    if (!currentUser) {
      setRequests([]);
      return;
    }

    setLoadingRequests(true);
    const unsubscribe = subscribeToUserRequests(
      currentUser,
      (data) => {
        setRequests(data);
        setLoadingRequests(false);
      },
      (err) => {
        console.warn('Could not load user requests:', err);
        setLoadingRequests(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setAuthError(null);
    try {
      await signInWithGoogle();
    } catch (err: unknown) {
      const error = err as { message?: string; code?: string };
      if (error.code === 'auth/popup-closed-by-user') {
        setAuthError('Sign-in cancelled. Please try again.');
      } else if (error.code === 'auth/unauthorized-domain') {
        setAuthError('This domain is not yet authorized in Firebase Console > Authentication > Settings > Authorized domains. Please add your Vercel domain.');
      } else if (error.code === 'auth/popup-blocked') {
        setAuthError('Sign-in popup was blocked by your browser. Please allow popups for this site.');
      } else {
        setAuthError(error.message || 'Failed to authenticate with Google. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError(null);

    try {
      if (authMode === 'signup') {
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters long.');
        }
        await signUpWithEmail(email, password, displayName);
      } else {
        await logInWithEmail(email, password);
      }
    } catch (err: unknown) {
      const error = err as { message?: string; code?: string };
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        setAuthError('Invalid email or password. Please verify your credentials.');
      } else if (error.code === 'auth/email-already-in-use') {
        setAuthError('An account with this email already exists. Try signing in.');
      } else if (error.code === 'auth/operation-not-allowed') {
        setAuthError('Email/Password sign-in is currently disabled in your Firebase project. Please enable "Email/Password" in Firebase Console > Authentication > Sign-in method, or use "Continue with Google".');
      } else if (error.code === 'auth/weak-password') {
        setAuthError('Password is too weak. Please use at least 6 characters.');
      } else if (error.code === 'auth/network-request-failed') {
        setAuthError('Network error. Please check your internet connection.');
      } else {
        setAuthError(error.message || 'Authentication error. Please check your details.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email || !email.includes('@')) {
      setAuthError('Please enter your email address above to receive a password reset link.');
      return;
    }
    setResetLoading(true);
    setAuthError(null);
    try {
      await resetPassword(email.trim());
      setResetSent(true);
    } catch (err: unknown) {
      const error = err as { message?: string; code?: string };
      if (error.code === 'auth/user-not-found') {
        setAuthError('No account found with this email. Please check your spelling or create an account.');
      } else {
        setAuthError(error.message || 'Could not send reset link. Please check the email entered.');
      }
    } finally {
      setResetLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#12151b] border border-white/15 rounded-3xl p-6 sm:p-8 text-white shadow-2xl my-8 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          aria-label="Close client portal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LOGGED IN VIEW: CLIENT DASHBOARD */}
        {currentUser ? (
          <div className="space-y-6">
            {/* User Profile Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div className="flex items-center gap-3.5">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || 'Client'}
                    className="w-12 h-12 rounded-full border border-[#10B981] object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 font-bold text-lg">
                    {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-white tracking-tight">
                      {currentUser.displayName || (isSiteOwner(currentUser) ? 'Master Dispatcher' : 'Valued Client')}
                    </h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${
                      isSiteOwner(currentUser)
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    }`}>
                      {isSiteOwner(currentUser) ? 'Site Owner / Dispatcher' : 'Verified Client'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-light mt-0.5">
                    {currentUser.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenBooking();
                  }}
                  className="px-4 py-2 rounded-full bg-white text-slate-900 hover:bg-slate-100 font-semibold text-xs transition-all shadow-md active:scale-95"
                >
                  + New Service Request
                </button>
                <button
                  onClick={handleSignOut}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-colors"
                  title="Sign Out"
                  aria-label="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bookings & Requests Section */}
            <div>
              {/* Cloud Function Status & Free EmailJS Settings for Site Owner */}
              {isSiteOwner(currentUser) && (
                <div className="mb-5 space-y-3">
                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-start justify-between gap-3 text-xs">
                    <div className="flex items-start gap-3">
                      <span className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <strong className="text-white font-semibold">100% Free Client Emailing System (EmailJS)</strong>
                          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                            Zero Blaze / $0 Card Required
                          </span>
                        </div>
                        <p className="text-slate-300 font-light leading-relaxed">
                          Deliver instant welcome emails and $50 promo codes directly to newsletter subscribers without paying or upgrading Firebase.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowEmailSettings(!showEmailSettings)}
                      className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
                    >
                      <Settings2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{showEmailSettings ? 'Hide Setup' : 'Configure Free Email'}</span>
                    </button>
                  </div>

                  {/* Expandable EmailJS Configuration Box */}
                  {showEmailSettings && (
                    <div className="p-5 rounded-2xl bg-[#090b0f] border border-emerald-500/30 space-y-4 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between pb-2 border-b border-white/10">
                        <div>
                          <h5 className="text-sm font-bold text-white">EmailJS Free Setup (200 Free Emails / Month)</h5>
                          <p className="text-[11px] text-slate-400">
                            Create free account at <a href="https://www.emailjs.com" target="_blank" rel="noreferrer" className="text-emerald-400 underline font-medium">emailjs.com</a>, add your Gmail service, and paste your 3 keys below:
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                            Service ID
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. service_xxxxxx"
                            value={emailKeys.serviceId}
                            onChange={(e) => setEmailKeys({ ...emailKeys, serviceId: e.target.value.trim() })}
                            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-400 font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                            Template ID
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. template_xxxxxx"
                            value={emailKeys.templateId}
                            onChange={(e) => setEmailKeys({ ...emailKeys, templateId: e.target.value.trim() })}
                            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-400 font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                            Public Key (User ID)
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. user_xxxxxx or key_xxxx"
                            value={emailKeys.publicKey}
                            onChange={(e) => setEmailKeys({ ...emailKeys, publicKey: e.target.value.trim() })}
                            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-400 font-mono"
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            saveEmailJSKeys(emailKeys);
                            setEmailConfigSaved(true);
                            setTimeout(() => setEmailConfigSaved(false), 3000);
                          }}
                          className="px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs tracking-tight transition-all active:scale-95 cursor-pointer"
                        >
                          {emailConfigSaved ? '✓ Settings Saved!' : 'Save EmailJS Keys'}
                        </button>

                        {/* Test Email Section */}
                        <div className="flex items-center gap-2">
                          <input
                            type="email"
                            placeholder="Test recipient email..."
                            value={testEmailAddress}
                            onChange={(e) => setTestEmailAddress(e.target.value)}
                            className="px-3 py-1.5 rounded-full bg-white/5 border border-white/15 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-400 w-48"
                          />
                          <button
                            type="button"
                            disabled={testSending || !testEmailAddress.trim()}
                            onClick={async () => {
                              saveEmailJSKeys(emailKeys);
                              setTestSending(true);
                              setTestResult(null);
                              const res = await sendWelcomeEmailViaEmailJS({
                                toEmail: testEmailAddress.trim(),
                                promoCode: 'AQUORA50',
                              });
                              setTestResult({
                                success: res.success,
                                message: res.message || (res.success ? 'Email sent successfully!' : 'Delivery failed'),
                              });
                              setTestSending(false);
                            }}
                            className="px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white font-medium text-xs flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                          >
                            <Send className="w-3 h-3 text-emerald-400" />
                            <span>{testSending ? 'Sending...' : 'Send Test Mail'}</span>
                          </button>
                        </div>
                      </div>

                      {testResult && (
                        <div
                          className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                            testResult.success
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-red-500/20 text-red-300 border border-red-500/30'
                          }`}
                        >
                          {testResult.success ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                          )}
                          <span>{testResult.message}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-sm font-semibold tracking-tight text-white">
                    {isSiteOwner(currentUser) ? 'All Incoming Service Requests' : 'Your Active Appointments & Requests'}
                  </h4>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                    {requests.length}
                  </span>
                </div>
              </div>

              {loadingRequests ? (
                <div className="py-12 text-center text-slate-400 text-xs flex flex-col items-center justify-center gap-2">
                  <RefreshCw className="w-5 h-5 animate-spin text-emerald-400" />
                  <span>Loading your service history...</span>
                </div>
              ) : requests.length > 0 ? (
                <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                  {requests.map((req) => (
                    <div
                      key={req.id || req.bookingRef}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all text-xs space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-white/10 text-slate-200 font-semibold">
                              {req.bookingRef}
                            </span>
                            <span className="font-medium text-white text-sm">
                              {req.serviceType}
                            </span>
                          </div>
                          
                          {/* Customer Name & Phone for Site Owner */}
                          {isSiteOwner(currentUser) && (
                            <div className="flex flex-wrap items-center gap-3 text-slate-300 mt-1.5 font-medium">
                              <span className="text-white">{req.name}</span>
                              <a
                                href={`tel:${req.phone}`}
                                className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                              >
                                <Phone className="w-3 h-3" />
                                {req.phone}
                              </a>
                              {req.email && (
                                <a
                                  href={`mailto:${req.email}`}
                                  className="text-slate-400 hover:text-white flex items-center gap-1 truncate max-w-[180px]"
                                >
                                  <Mail className="w-3 h-3" />
                                  {req.email}
                                </a>
                              )}
                            </div>
                          )}

                          <div className="flex items-center gap-3 text-slate-400 mt-1 text-[11px]">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-500" />
                              {new Date(req.createdAt).toLocaleDateString([], {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                            {req.address && (
                              <span className="flex items-center gap-1 truncate max-w-[200px]">
                                <MapPin className="w-3 h-3 text-slate-500" />
                                {req.address}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1.5">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                              req.urgency === 'emergency'
                                ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            }`}
                          >
                            {req.urgency === 'emergency' ? 'Emergency (~30 min)' : req.urgency}
                          </span>
                          
                          {/* Owner Email Notification Status */}
                          <span className="text-[10px] text-emerald-400/90 font-light flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            Email Alert Dispatched
                          </span>

                          <span className="text-[10px] text-slate-400 font-medium">
                            Status: <strong className="text-white capitalize">{req.status || 'Pending'}</strong>
                          </span>
                        </div>
                      </div>

                      {req.notes && (
                        <p className="text-[11px] text-slate-300 bg-black/30 p-2.5 rounded-xl border border-white/5 font-light">
                          <strong className="text-slate-400 font-medium">Notes:</strong> {req.notes}
                        </p>
                      )}

                      {/* Site Owner Quick Status Actions */}
                      {isSiteOwner(currentUser) && req.id && (
                        <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                          <span className="text-[11px] text-slate-400">Update Status:</span>
                          <div className="flex items-center gap-1.5">
                            {(['pending', 'confirmed', 'dispatched', 'completed'] as const).map((st) => (
                              <button
                                key={st}
                                onClick={() => req.id && updateServiceRequestStatus(req.id, st)}
                                className={`px-2 py-0.5 rounded-md text-[10px] capitalize transition-all ${
                                  req.status === st
                                    ? 'bg-emerald-500 text-slate-950 font-bold'
                                    : 'bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white'
                                }`}
                              >
                                {st}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-10 text-center rounded-2xl bg-white/5 border border-white/10 p-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h5 className="text-sm font-semibold text-white">No active service calls yet</h5>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto font-light">
                    Have an urgent leak, drain backup, or planning a renovation? Your booked appointments will appear here with live dispatch updates.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenBooking();
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F95700] hover:bg-[#e04e00] text-white font-semibold text-xs tracking-tight transition-colors shadow-lg mt-2"
                  >
                    <span>Schedule Free Call / Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Direct 24/7 Hotline Footer */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Priority Emergency Dispatch: <strong className="text-white">(800) 459-PIPE</strong></span>
              </span>
              <span className="text-[11px] text-slate-500 font-light">
                Connected to Firestore Database
              </span>
            </div>
          </div>
        ) : (
          /* NOT LOGGED IN VIEW: AUTH FLOW */
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-medium mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Secure Customer Portal</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                Client Portal & Booking Management
              </h3>
              <p className="text-sm text-slate-400 mt-1 font-light leading-relaxed">
                Sign in to view your dispatch status, manage service requests, and track plumber arrival times.
              </p>
            </div>

            {/* Google Fast Sign In Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm transition-all shadow-md active:scale-95 disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{loading ? 'Connecting...' : 'Continue with Google'}</span>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">Or continue with email</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            {/* Error Notification */}
            {authError && (
              <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{authError}</span>
              </div>
            )}

            {/* Mode Switcher Tabs */}
            <div className="flex rounded-xl bg-white/5 p-1 border border-white/10">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('signin');
                  setAuthError(null);
                }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  authMode === 'signin' ? 'bg-white text-slate-900 font-semibold shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('signup');
                  setAuthError(null);
                }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  authMode === 'signup' ? 'bg-white text-slate-900 font-semibold shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailAuth} className="space-y-3.5">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Your Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Miller"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-slate-300">
                    Password
                  </label>
                  {authMode === 'signin' && (
                    <button
                      type="button"
                      onClick={handleResetPassword}
                      disabled={resetLoading}
                      className="text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      {resetLoading ? 'Sending...' : 'Forgot password?'}
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              {resetSent && (
                <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>Password reset email sent to <strong>{email}</strong>! Please check your inbox.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold text-xs tracking-tight transition-colors shadow-lg active:scale-95 disabled:opacity-50 mt-2"
              >
                {loading
                  ? 'Processing...'
                  : authMode === 'signup'
                  ? 'Create Client Account'
                  : 'Sign In to Client Portal'}
              </button>
            </form>

            {/* Reassurance Features */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-[11px] text-slate-400 font-light">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Encrypted client records</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Track dispatch ETA in real time</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
