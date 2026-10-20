/**
 * Links de checkout da plataforma EAD da ON.
 *
 * Enquanto um link estiver vazio, o botão correspondente cai para o WhatsApp
 * com a mensagem certa — a página nunca fica com um CTA morto. Para ligar um
 * produto, cole a URL aqui e faça o deploy.
 *
 * O produto da temporada também aceita a variável de ambiente PUBLIC_CTA_URL,
 * que tem precedência sobre o valor abaixo.
 */

/** Produto da temporada completa (8 encontros, R$ 990). */
export const checkoutTemporada = '';

/**
 * Produtos de encontro avulso (R$ 250), um por data.
 * A chave é o número do encontro, como em `content/escola.ts`.
 */
export const checkoutEncontros: Record<string, string> = {
  '01': '',
  '02': '',
  '03': '',
  '04': '',
  '05': '',
  '06': '',
  '07': '',
  '08': '',
};

export const checkoutDoEncontro = (numero: string): string =>
  checkoutEncontros[numero]?.trim() ?? '';
