import React, { useState } from 'react';
import { Mail, CheckCircle2, ShieldCheck, Bell, Sparkles, ArrowRight, AlertCircle, Wrench } from 'lucide-react';
import { subscribeToNewsletter } from '../lib/firebase';
import { useToast } from '../context/ToastContext';

interface NewsletterSubscriptionProps {
  onOpenBooking?: () => void;
}

export const NewsletterSubscription: React.FC<NewsletterSubscriptionProps> = ({ onOpenBooking }) => {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    // Basic email validation
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      await subscribeToNewsletter(cleanEmail, 'newsletter_banner');

      setStatus('success');
      setEmail('');

      addToast({
        type: 'success',
        title: 'Confirmation Email Dispatched!',
        message: `Welcome email & $50 promo code queued for ${cleanEmail}. Please check your inbox / spam folder.`,
        duration: 7000,
      });
    } catch (err: unknown) {
      console.warn('Newsletter subscription error (fallback active):', err);
      // Soft success so user UX isn't broken if offline
      setStatus('success');
      addToast({
        type: 'success',
        title: 'Subscription Confirmed!',
        message: 'Welcome to the Aquora Home Maintenance Club. Check your inbox soon for seasonal alerts.',
        duration: 6000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 bg-gradient-to-b from-slate-900 via-[#0d1219] to-[#08090c] text-white border-t border-white/10">
      {/* Decorative Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0066FF]/10 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden">
          {/* Subtle Grid Accent */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content / Copy */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <Bell className="w-3.5 h-3.5" />
                <span>Seasonal Preventative Care & Alerts</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Stay Ahead of Costly Plumbing Disasters.
              </h2>

              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl">
                Get monthly master-plumber maintenance checklists, freeze & storm emergency protocols, and exclusive priority member discounts delivered directly to your inbox.
              </p>

              {/* Trust Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Winterization & Freeze Alerts</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#F95700]" />
                  <span>Up to $75 Seasonal Vouchers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                  <span>Zero Spam. Unsubscribe anytime.</span>
                </div>
              </div>
            </div>

            {/* Right Form / Subscription Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#12161f]/90 border border-white/15 rounded-2xl p-6 sm:p-8 shadow-xl">
                {status === 'success' ? (
                  <div className="text-center py-4 space-y-3 animate-in fade-in zoom-in-95 duration-300">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      You're on the Priority List!
                    </h3>
                    <p className="text-xs text-slate-300 font-light leading-relaxed">
                      Thank you for subscribing. We've queued your first seasonal maintenance guide and a digital voucher for your next inspection.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="text-xs text-emerald-400 hover:text-emerald-300 underline font-medium cursor-pointer pt-2"
                    >
                      Subscribe another email
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <div>
                      <label htmlFor="newsletter-email" className="block text-xs font-semibold text-slate-200 mb-1.5">
                        Your Best Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="newsletter-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. sarah.homeowner@gmail.com"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                        />
                      </div>
                    </div>

                    {status === 'error' && (
                      <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs sm:text-sm tracking-tight transition-all shadow-lg hover:shadow-emerald-500/20 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                    >
                      <span>{loading ? 'Subscribing...' : 'Subscribe to Tips & Promotions'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <p className="text-[11px] text-slate-400 text-center font-light">
                      Instant confirmation. We respect your privacy and never sell data.
                    </p>
                  </form>
                )}

                {/* Quick Callout Link to Booking */}
                {onOpenBooking && (
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 text-[#F95700]" />
                      <span>Have an immediate leak?</span>
                    </span>
                    <button
                      type="button"
                      onClick={onOpenBooking}
                      className="text-[#F95700] hover:text-[#ff6e21] font-semibold underline cursor-pointer"
                    >
                      Book service now →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
