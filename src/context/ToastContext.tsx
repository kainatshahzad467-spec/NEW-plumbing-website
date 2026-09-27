import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Info,
  AlertCircle,
  X,
  Clock,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastItem {
  id: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
  bookingRef?: string;
  serviceType?: string;
  urgency?: 'emergency' | 'sameday' | 'scheduled';
  etaText?: string;
  duration?: number; // ms, default 7000ms
  action?: ToastAction;
  createdAt: number;
}

interface ToastContextValue {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, 'id' | 'createdAt'>) => string;
  removeToast: (id: string) => void;
  showBookingSuccess: (params: {
    bookingRef: string;
    serviceType: string;
    urgency: 'emergency' | 'sameday' | 'scheduled';
    name?: string;
    onViewPortal?: () => void;
  }) => string;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((toast: Omit<ToastItem, 'id' | 'createdAt'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    const newToast: ToastItem = {
      ...toast,
      id,
      type: toast.type || 'info',
      duration: toast.duration ?? 7000,
      createdAt: Date.now(),
    };

    setToasts((prev) => [newToast, ...prev.slice(0, 3)]); // Keep at most 4 active
    return id;
  }, []);

  const showBookingSuccess = useCallback(
    ({
      bookingRef,
      serviceType,
      urgency,
      name,
      onViewPortal,
    }: {
      bookingRef: string;
      serviceType: string;
      urgency: 'emergency' | 'sameday' | 'scheduled';
      name?: string;
      onViewPortal?: () => void;
    }) => {
      const isEmergency = urgency === 'emergency';
      const eta = isEmergency ? 'Within 28 Minutes' : 'Same-Day Dispatch Window';

      return addToast({
        type: 'success',
        title: isEmergency ? '🚨 Emergency Dispatch Activated' : 'Service Request Received',
        message: `${name ? `${name}, your` : 'Your'} request for ${serviceType} is registered in Firestore. Our licensed team has been alerted.`,
        bookingRef,
        serviceType,
        urgency,
        etaText: eta,
        duration: 9000, // Stay 9 seconds for high reassurance
        action: onViewPortal
          ? {
              label: 'Track in Portal',
              onClick: onViewPortal,
            }
          : undefined,
      });
    },
    [addToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, showBookingSuccess }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

/**
 * Toast Container positioned prominently at the bottom-right of the viewport
 * Highly visible, responsive on mobile devices, and styled in Aquora's precision dark theme
 */
const ToastContainer: React.FC<{
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[9999] flex flex-col gap-3 max-w-sm sm:max-w-md w-[calc(100vw-2.5rem)] pointer-events-none"
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <ToastItemCard key={toast.id} toast={toast} onDismiss={() => onDismiss(toast.id)} />
      ))}
    </div>
  );
};

/**
 * Single Toast Item Card with animated progress bar and hover-pause support
 */
const ToastItemCard: React.FC<{
  toast: ToastItem;
  onDismiss: () => void;
}> = ({ toast, onDismiss }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(100);
  const startTimeRef = useRef<number>(Date.now());
  const remainingTimeRef = useRef<number>(toast.duration || 7000);

  React.useEffect(() => {
    if (!toast.duration || toast.duration <= 0) return;

    let animationFrameId: number;
    const totalDuration = toast.duration;

    const tick = () => {
      if (!isPaused) {
        const elapsed = Date.now() - startTimeRef.current;
        const remaining = Math.max(0, remainingTimeRef.current - elapsed);
        const nextProgress = (remaining / totalDuration) * 100;
        setProgress(nextProgress);

        if (remaining <= 0) {
          onDismiss();
          return;
        }
      }
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused, toast.duration, onDismiss]);

  const handleMouseEnter = () => {
    if (!isPaused && toast.duration) {
      const elapsed = Date.now() - startTimeRef.current;
      remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (isPaused) {
      startTimeRef.current = Date.now();
      setIsPaused(false);
    }
  };

  const isEmergency = toast.urgency === 'emergency';

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`pointer-events-auto relative overflow-hidden rounded-2xl bg-[#0f1218]/95 backdrop-blur-xl border p-4 shadow-2xl transition-all duration-300 transform translate-y-0 opacity-100 animate-in slide-in-from-bottom-5 fade-in ${
        isEmergency
          ? 'border-orange-500/40 shadow-orange-950/40'
          : toast.type === 'success'
          ? 'border-emerald-500/40 shadow-emerald-950/40'
          : toast.type === 'error'
          ? 'border-red-500/40 shadow-red-950/40'
          : 'border-white/20 shadow-black/50'
      }`}
      role="alert"
    >
      {/* Background radial glow */}
      <div
        className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl pointer-events-none ${
          isEmergency
            ? 'bg-orange-500/20'
            : toast.type === 'success'
            ? 'bg-emerald-500/20'
            : 'bg-sky-500/15'
        }`}
      />

      <div className="relative flex items-start gap-3">
        {/* Status Icon */}
        <div
          className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border shadow-inner ${
            isEmergency
              ? 'bg-orange-500/15 text-orange-400 border-orange-500/30'
              : toast.type === 'success'
              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
              : toast.type === 'error'
              ? 'bg-red-500/15 text-red-400 border-red-500/30'
              : 'bg-white/10 text-white border-white/20'
          }`}
        >
          {isEmergency ? (
            <AlertTriangle className="w-5 h-5 animate-pulse" />
          ) : toast.type === 'success' ? (
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          ) : toast.type === 'error' ? (
            <AlertCircle className="w-5 h-5" />
          ) : (
            <Info className="w-5 h-5" />
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 min-w-0 pr-6">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-semibold tracking-tight text-white truncate">
              {toast.title}
            </h4>
            {toast.bookingRef && (
              <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/10 text-emerald-300 border border-emerald-500/20 shrink-0">
                {toast.bookingRef}
              </span>
            )}
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-light">
            {toast.message}
          </p>

          {/* Quick status details badge row */}
          {(toast.etaText || toast.serviceType) && (
            <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[11px]">
              {toast.etaText && (
                <div className="flex items-center gap-1 text-slate-300 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                  <Clock className="w-3 h-3 text-emerald-400" />
                  <span>ETA: <strong className="text-white font-medium">{toast.etaText}</strong></span>
                </div>
              )}
              <div className="flex items-center gap-1 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>Live Dispatch Synced</span>
              </div>
            </div>
          )}

          {/* Action button if provided */}
          {toast.action && (
            <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  toast.action?.onClick();
                  onDismiss();
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group cursor-pointer"
              >
                <span>{toast.action.label}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
              <span className="text-[10px] text-slate-500 font-mono">24/7 Priority</span>
            </div>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={onDismiss}
          className="absolute top-0 right-0 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Auto-dismiss progress countdown line */}
      {toast.duration && toast.duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5 overflow-hidden">
          <div
            className={`h-full transition-all linear duration-75 ${
              isEmergency
                ? 'bg-orange-500'
                : toast.type === 'success'
                ? 'bg-emerald-500'
                : 'bg-sky-400'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};
