/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_CTA_URL?: string;
  readonly PUBLIC_WHATSAPP?: string;
  readonly PUBLIC_SPONSOR_CONTACT?: string;
  readonly PUBLIC_GTM_ID?: string;
  readonly PUBLIC_META_PIXEL_ID?: string;
  readonly PUBLIC_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  dataLayer?: unknown[];
  fbq?: (...args: unknown[]) => void;
}
