import emailjs from '@emailjs/browser';

const STORAGE_KEY = 'aquora_emailjs_config';

export interface EmailJSKeys {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

// Built-in configured credentials from EmailJS
export const DEFAULT_EMAILJS_KEYS: EmailJSKeys = {
  serviceId: 'service_eyfg1zh',
  templateId: 'template_5hh7nyt',
  publicKey: '-BRw2zP6vCsUp1aqi',
};

export function getStoredEmailJSKeys(): EmailJSKeys {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.serviceId || parsed.publicKey) {
        return {
          serviceId: parsed.serviceId || DEFAULT_EMAILJS_KEYS.serviceId,
          templateId: parsed.templateId || DEFAULT_EMAILJS_KEYS.templateId,
          publicKey: parsed.publicKey || DEFAULT_EMAILJS_KEYS.publicKey,
        };
      }
    }
  } catch {
    // Ignore local storage parse error
  }

  return {
    serviceId: (import.meta.env.VITE_EMAILJS_SERVICE_ID as string) || DEFAULT_EMAILJS_KEYS.serviceId,
    templateId: (import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string) || DEFAULT_EMAILJS_KEYS.templateId,
    publicKey: (import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string) || DEFAULT_EMAILJS_KEYS.publicKey,
  };
}

export function saveEmailJSKeys(keys: EmailJSKeys) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(keys));
  } catch (e) {
    console.error('Failed to save EmailJS keys:', e);
  }
}

export interface NewsletterEmailPayload {
  toEmail: string;
  promoCode?: string;
  subject?: string;
}

export interface BookingEmailPayload {
  bookingRef: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceType: string;
  urgency: string;
  address?: string;
  notes?: string;
}

/**
 * Sends automated booking confirmation email via EmailJS
 */
export async function sendBookingEmailNotification(
  payload: BookingEmailPayload
): Promise<{ success: boolean; message?: string }> {
  const { serviceId, templateId, publicKey } = getStoredEmailJSKeys();

  if (serviceId && templateId && publicKey) {
    try {
      const emailRecipient = payload.customerEmail || 'kainat.shahzad467@gmail.com';
      await emailjs.send(
        serviceId,
        templateId,
        {
          to_email: emailRecipient,
          client_email: emailRecipient,
          email: emailRecipient,
          from_name: 'Aquora Master Dispatch',
          to_name: payload.customerName || 'Valued Client',
          booking_ref: payload.bookingRef,
          service_type: payload.serviceType,
          urgency: payload.urgency,
          address: payload.address || 'Address on file',
          company_name: 'Aquora Plumbing Solutions',
          support_phone: '(800) 459-PIPE',
          message: `Booking Ref #${payload.bookingRef} confirmed for ${payload.serviceType} (${payload.urgency}). Dispatch team notified. ETA updates available in Client Portal.`,
        },
        publicKey
      );

      return {
        success: true,
        message: 'Booking dispatch email delivered!',
      };
    } catch (err: any) {
      console.warn('Booking email notification notice:', err);
      return {
        success: false,
        message: err?.text || err?.message || 'Email delivery skipped',
      };
    }
  }

  return { success: false, message: 'Email keys pending' };
}

/**
 * Sends a welcome newsletter email directly to the subscriber using EmailJS (100% Free - 0 Credit Card)
 */
export async function sendWelcomeEmailViaEmailJS({
  toEmail,
  promoCode = 'AQUORA50',
}: NewsletterEmailPayload): Promise<{ success: boolean; message?: string }> {
  const { serviceId, templateId, publicKey } = getStoredEmailJSKeys();

  if (serviceId && templateId && publicKey) {
    try {
      const response = await emailjs.send(
        serviceId,
        templateId,
        {
          to_email: toEmail,
          client_email: toEmail,
          subscriber_email: toEmail,
          user_email: toEmail,
          email: toEmail,
          from_name: 'Aquora Plumbing Solutions',
          to_name: toEmail.split('@')[0],
          promo_code: promoCode,
          company_name: 'Aquora Plumbing Solutions',
          support_phone: '(800) 459-PIPE',
          current_year: new Date().getFullYear().toString(),
          message: `Welcome to the Aquora Plumbing Home Care Club! Use code ${promoCode} for $50 OFF your next service. Priority Emergency Hotline: (800) 459-PIPE`,
        },
        publicKey
      );

      return {
        success: response.status === 200,
        message: 'Welcome email successfully delivered to client inbox via EmailJS!',
      };
    } catch (err: any) {
      console.warn('EmailJS delivery warning:', err);
      return {
        success: false,
        message: err?.text || err?.message || 'Email delivery failed',
      };
    }
  }

  return {
    success: false,
    message: 'EmailJS keys not yet saved. Please configure in the Dispatch Portal.',
  };
}
