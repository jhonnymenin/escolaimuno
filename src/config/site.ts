/** Links, contatos, IDs e flags. Tudo lido de import.meta.env. */

const env = import.meta.env;

const str = (v: unknown): string => (typeof v === 'string' ? v.trim() : '');

export const site = {
  url: str(env.PUBLIC_SITE_URL) || 'https://escolaimunomediadas.com.br',

  /** Link de inscrição. Vazio => o CTA cai para o WhatsApp. */
  ctaUrl: str(env.PUBLIC_CTA_URL),

  /**
   * Número com DDI, só dígitos. O padrão existe para o CTA nunca ficar morto
   * num deploy sem variáveis; PUBLIC_WHATSAPP sobrescreve.
   */
  whatsapp: str(env.PUBLIC_WHATSAPP).replace(/\D/g, '') || '5511970687422',

  /** E-mail ou link para empresas interessadas em patrocínio. */
  sponsorContact: str(env.PUBLIC_SPONSOR_CONTACT),

  gtmId: str(env.PUBLIC_GTM_ID),
  metaPixelId: str(env.PUBLIC_META_PIXEL_ID),

  flags: {
    showCertificate: true,
  },
} as const;

/** href do contato comercial: e-mail vira mailto:, o resto passa direto. */
export const sponsorHref = (): string => {
  const c = site.sponsorContact;
  if (!c) return '';
  if (/^https?:\/\//i.test(c) || c.startsWith('mailto:')) return c;
  return `mailto:${c}`;
};

/** Link do WhatsApp com uma mensagem já escrita. */
export const whatsappHref = (mensagem: string): string =>
  site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensagem)}`
    : '#inscricao';

/** URL base do CTA. Sem PUBLIC_CTA_URL, cai para o WhatsApp. */
export const ctaHref = (mensagem: string): string =>
  site.ctaUrl || whatsappHref(mensagem);
