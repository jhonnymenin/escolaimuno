/**
 * As nove ofertas à venda na EAD Plataforma: a temporada completa e um produto
 * por encontro. É a única fonte dos links de compra — não há link de checkout
 * escrito em nenhum componente.
 *
 * `vendasAte` é o instante em que a EAD encerra a venda daquele encontro:
 * 19h do próprio dia, horário de Brasília. Depois disso o link abre um carrinho
 * vazio, então a página esconde o botão e marca o encontro como realizado.
 * A temporada não tem prazo.
 */

export interface Oferta {
  /** 'temporada' ou o número do encontro, como em `content/escola.ts`. */
  id: 'temporada' | string;
  url: string;
  /** ISO com fuso de Brasília. Ausente = sempre à venda. */
  vendasAte?: string;
}

const EAD = 'https://oneducacao.eadplataforma.app/cart/buy/one/click';

export const OFFERS: Oferta[] = [
  { id: 'temporada', url: `${EAD}/23` },
  { id: '01', url: `${EAD}/24`, vendasAte: '2027-03-18T19:00:00-03:00' },
  { id: '02', url: `${EAD}/26`, vendasAte: '2027-04-15T19:00:00-03:00' },
  { id: '03', url: `${EAD}/27`, vendasAte: '2027-05-20T19:00:00-03:00' },
  { id: '04', url: `${EAD}/28`, vendasAte: '2027-06-17T19:00:00-03:00' },
  { id: '05', url: `${EAD}/29`, vendasAte: '2027-08-19T19:00:00-03:00' },
  { id: '06', url: `${EAD}/30`, vendasAte: '2027-09-16T19:00:00-03:00' },
  { id: '07', url: `${EAD}/31`, vendasAte: '2027-10-21T19:00:00-03:00' },
  { id: '08', url: `${EAD}/32`, vendasAte: '2027-11-11T19:00:00-03:00' },
];

const porId = new Map(OFFERS.map((o) => [o.id, o]));

export const oferta = (id: string): Oferta | undefined => porId.get(id);

/** Domínio da EAD. O script de UTM só mexe em links deste host. */
export const HOST_EAD = 'oneducacao.eadplataforma.app';
