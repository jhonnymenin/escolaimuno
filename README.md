# Escola Continuada de Doenças Imunomediadas — landing page 2027

Landing page estática de inscrição, com um único objetivo: levar ao clique de inscrição
(100 vagas, turma única, temporada 2027 em Campinas).

**Stack:** Astro 5 (saída estática) · Tailwind CSS 4 · TypeScript · zero JS por padrão.
Sem backend, sem CMS, sem biblioteca de UI.

---

## Rodar local

```bash
npm install
cp .env.example .env     # ajuste os valores
npm run dev              # http://localhost:4321
```

> **Build local travando?** `astro build` e `astro check` emperram quando o caminho do
> projeto tem espaços ou acentos (hoje ele mora em `05 - Código Claude/`). A saída fica
> vazia e o processo não consome CPU. Contorne com um atalho sem acentos:
> `ln -sfn "$PWD" /tmp/escola-lp && cd /tmp/escola-lp && CI=1 npx astro build`.
> A Vercel não é afetada: lá o repositório fica em um caminho limpo.

Outros comandos:

| Comando | O que faz |
|---|---|
| `npm run build` | Gera o site em `dist/` |
| `npm run preview` | Serve `dist/` localmente |
| `npm run check` | Checagem de tipos dos arquivos `.astro` |
| `npm run media` | Regera `src/assets/` a partir dos originais em `media/` |
| `npm run og` | Regera `src/assets/img/og.jpg` e `public/favicon.svg` |

---

## Variáveis de ambiente

Todas são públicas (prefixo `PUBLIC_`) e ficam em `.env` local e nas *Environment Variables*
do projeto na Vercel. O arquivo de referência é [`.env.example`](.env.example).

| Variável | Uso | Obrigatória |
|---|---|---|
| `PUBLIC_CTA_URL` | Sobrescreve o link da temporada definido em `src/config/ofertas.ts`, para trocá-lo sem deploy | não |
| `PUBLIC_WHATSAPP` | Número com DDI, só dígitos. Usado quando `PUBLIC_CTA_URL` está vazio. Tem padrão embutido (`5511970687422`) para o CTA não ficar morto num deploy sem variáveis | não |
| `PUBLIC_SPONSOR_CONTACT` | E-mail ou link para empresas interessadas em patrocínio. Se vazio, o bloco some do rodapé | não |
| `PUBLIC_GTM_ID` | Google Tag Manager (`GTM-XXXXXXX`). Se vazio, nada é carregado | não |
| `PUBLIC_META_PIXEL_ID` | Meta Pixel. Se vazio, nada é carregado | não |
| `PUBLIC_SITE_URL` | URL final, usada em canonical, Open Graph e sitemap. Hoje `https://escola.on-dig.online`, que também é o padrão no código | sim |

Flags de conteúdo ficam em [`src/config/site.ts`](src/config/site.ts):

| Flag | Padrão | Efeito |
|---|---|---|
| `showCertificate` | `true` | Mostra o item "Certificação" em *O que você leva da temporada* |

---

## Deploy na Vercel

1. Suba o repositório no GitHub.
2. Na Vercel, **Add New → Project** e importe o repositório.
3. O framework é detectado como **Astro**; os padrões servem:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
4. Em **Settings → Environment Variables**, cadastre as variáveis da tabela acima
   (Production, Preview e Development).
5. Em **Settings → Domains**, aponte o domínio final. Depois disso, confira que
   `PUBLIC_SITE_URL` bate com ele e faça um redeploy — canonical, Open Graph e
   sitemap dependem desse valor.
6. Atualize a linha `Sitemap:` de [`public/robots.txt`](public/robots.txt) com o domínio final.

---

## As nove ofertas

Todas já estão à venda na EAD Plataforma. Os links ficam em um lugar só,
[`src/config/ofertas.ts`](src/config/ofertas.ts) — não há URL de compra escrita em
nenhum componente.

| Oferta | Produto | Vendas encerram |
|---|---|---|
| Temporada completa (R$ 990) | `/23` | não encerra |
| Encontro 01 — 18/03/2027 | `/24` | 18/03/2027 19:00 |
| Encontro 02 — 15/04/2027 | `/26` | 15/04/2027 19:00 |
| Encontro 03 — 20/05/2027 | `/27` | 20/05/2027 19:00 |
| Encontro 04 — 17/06/2027 | `/28` | 17/06/2027 19:00 |
| Encontro 05 — 19/08/2027 | `/29` | 19/08/2027 19:00 |
| Encontro 06 — 16/09/2027 | `/30` | 16/09/2027 19:00 |
| Encontro 07 — 21/10/2027 | `/31` | 21/10/2027 19:00 |
| Encontro 08 — 11/11/2027 | `/32` | 11/11/2027 19:00 |

Base: `https://oneducacao.eadplataforma.app/cart/buy/one/click`. Horários de Brasília.
Repare que o produto 25 não existe — a numeração pula.

### Encontro já realizado

A EAD encerra a venda de cada encontro às 19h do próprio dia; depois disso o link abre
um carrinho vazio. A página calcula isso **no navegador**, inclusive no carregamento
inicial, e o encontro passado fica apagado, sem botão, com o texto "Encontro realizado".

O `vendasAte` de cada oferta é um ISO com o fuso `-03:00`, então o script compara
instantes e o relógio do visitante não interfere. A temporada não tem prazo e fica
sempre ativa.

Para testar antes da data, finja o relógio no DevTools ou rode a página com uma data
fixa. O ponto de corte do Encontro 01 é `2027-03-18T19:00:00-03:00`.

---

## Para onde vai cada botão

| Botão | Destino |
|---|---|
| Header, hero, barra fixa do mobile e "Quero me inscrever" (seção final) | produto da temporada |
| "Quero a temporada completa" (*Como participar*) | produto da temporada |
| "Quero um encontro" (*Como participar*) | âncora `#temporada`, para a pessoa escolher a data |
| "Quero só este encontro" (um por encontro) | produto daquele encontro |
| "Tirar dúvidas no WhatsApp" e "Falar no WhatsApp" (rodapé) | WhatsApp |

O WhatsApp é canal secundário: fica perto das opções de compra e no rodapé, e não
aparece mais em nenhum botão de inscrição. A migração de avulso para temporada é feita
manualmente pela equipe, por isso o bloco "Mudou de ideia" aponta para o WhatsApp.

[`Cta.astro`](src/components/ui/Cta.astro) resolve o destino nesta ordem: `href`
(âncora) → `checkout` (o link daquele botão) → `whatsapp` (a mensagem daquele botão) →
CTA global. A prioridade existe para que um link faltando nunca deixe um botão sem
destino.

---

## UTM por vendedor

Cada vendedor divulga a landing com as próprias UTMs:

```
https://escola.on-dig.online/?utm_source=maria&utm_medium=comercial&utm_campaign=escola-imuno-2027
```

Na chegada, `utm_source`, `utm_medium`, `utm_campaign`, `utm_term` e `utm_content` são
lidos da URL e guardados em `localStorage` (chave `ecdi:utm`, sempre em `try/catch`).
Ficam valendo se a pessoa navegar ou voltar outro dia, e **uma visita nova com UTM
substitui o conjunto inteiro** — para não misturar o vendedor de hoje com o de uma
campanha antiga.

Os valores salvos são acrescentados, via `URL`/`URLSearchParams`, **só aos links do
host `oneducacao.eadplataforma.app`**. WhatsApp e Google Maps ficam intactos.

Independente disso, todo clique em CTA dispara `cta_click` no `dataLayer` e no Pixel,
com a posição do botão (`hero`, `final`, `modalidade-temporada`, `encontro-01` …
`encontro-08`), o que permite ver qual tema puxa mais lead.

---

## Organização

```
media/
  fotos/                   Fotos originais, em alta. Fonte de verdade.
  local/                   Fotos da APM Campinas (recepção, anfiteatro, terraço).
  logos/                   Logos originais (PNG com transparência).
src/
  content/escola.ts        TODO o texto e os dados. Tipado. Nenhum componente tem copy.
  config/site.ts           Links, contatos, IDs e flags, lidos de import.meta.env
  config/ofertas.ts        As nove ofertas da EAD: link e prazo de venda de cada uma
  components/sections/     Uma seção por arquivo, na ordem da página
  components/ui/           Peças pequenas: Cta, Foto, Icon, DotGrid, logos
  assets/fotos/            Derivadas de media/fotos por `npm run media`
  assets/local/            Derivadas de media/local por `npm run media`
  assets/logos/            Derivadas de media/logos por `npm run media`
  assets/img/og.jpg        Imagem de Open Graph (1200×630)
  layouts/Base.astro       head, SEO, JSON-LD (EventSeries + 8 Event), tracking
  styles/global.css        Tokens de cor e tipografia, utilitários de layout
scripts/prep-media.mjs     Gera src/assets/ a partir de media/
scripts/gen-og.mjs         Gera og.jpg e favicon.svg
```

### Identidade

| Token | Valor | Uso |
|---|---|---|
| `navy` | `#032766` | Texto principal e fundos escuros |
| `azul` | `#0375C0` | Apoio |
| `ciano` | `#03A7BE` | Apoio |
| `ceu` | `#2FA8EE` | Apoio |
| `agua` | `#5CCFC9` | CTA sobre navy |
| `mist` | `#F2F6FA` | Fundo claro alternativo |
| `ink2` | `#5B6B82` | Texto secundário |
| `line` | `#DCE4EE` | Divisores |
| `ciano-texto` / `azul-texto` | `#026B7A` / `#0369AB` | Variantes escurecidas, para texto pequeno sobre fundo claro atingir AA |

Tipografia: **Sora** 700 nos títulos (tracking −0,02em, line-height 1,05, escala fluida),
**Inter** 16–18px no texto. Fontes self-hosted via `@fontsource-variable` — não há
requisição ao Google Fonts. A Sora é precarregada porque a `h1` é o elemento de maior
pintura da página.

---

## Fotos e logos

Os originais ficam em `media/` e **nunca são usados direto pela página**.
`npm run media` gera tudo o que `src/assets/` precisa:

**Fotos** — de cada original saem três arquivos:

| Arquivo | Onde entra |
|---|---|
| `nome.jpg` | versão natural, redimensionada (hoje não usada, fica disponível) |
| `nome-duotone.jpg` | duotone escuro (`#010C26` → `#26689E`), para as seções navy |
| `nome-duotone-claro.jpg` | duotone claro (`#083474` → `#E2EEFA`), para as seções brancas |

Distribuição atual: `vacinacao` no hero, `seringa-frasco` em *Por que existe*,
`terapias` em *Como é o encontro*, `centro-cirurgico` em *Quem conduz* e
`pesquisadora` na seção de inscrição.

**Fotos do local** (`media/local/`) seguem outro caminho: saem em cor natural, só
com a saturação reduzida, porque é o único ponto da página em que interessa ver a
casa como ela é. São as três que a turma usa na mesma noite — recepção, anfiteatro
e terraço.

> As fotos do local vieram do site da própria casa
> ([smcc.org.br](https://smcc.org.br/institucional/sede-social/)). Como o evento
> acontece lá, o uso é natural, mas vale um "ok" por escrito da secretaria antes de
> divulgar — ou substituí-las por fotos suas, que é só trocar os arquivos em
> `media/local/` e rodar `npm run media`.

Para trocar uma foto, substitua o arquivo em `media/fotos/` **mantendo o nome** e rode
`npm run media`. Para acrescentar outra, coloque em `media/fotos/`, rode o script e
importe a variante certa na seção.

**Logos** — de cada original saem duas versões: a colorida e uma branca (mesmo recorte,
tudo pintado de branco) para uso sobre navy. Os arquivos já vêm aparados na
transparência e reduzidos a 1400px, então basta trocar o PNG em `media/logos/` e rodar
`npm run media`.

Duas marcas têm tratamento próprio, declarado no topo de
[`scripts/prep-media.mjs`](scripts/prep-media.mjs):

- **Alergológica saúde** — o arquivo oficial é a versão para fundo escuro: a palavra
  "Alergológica" é um verde quase branco (`#E1F1F0`) que some no branco. Para a versão
  de fundo claro, o script repinta só os pixels claros da área do texto com um verde
  escuro (`#1B4F4B`); o símbolo e a palavra "saúde" ficam intactos. **Se existir o
  arquivo oficial para fundo claro, ele é melhor: coloque em `media/logos/` e remova a
  entrada de `RECOLORIR`.**
- **Alergológica saúde**, na versão branca — o símbolo é feito de pétalas translúcidas
  sobrepostas, e um branco chapado viraria uma mancha. Nessa marca o branco é modulado
  pelo brilho de cada pixel, o que mantém o desenho legível sobre navy.

As três logos de realizador aparecem sempre na **mesma altura visual**, não na mesma
caixa: [`LogoRealizador.astro`](src/components/ui/LogoRealizador.astro) guarda um fator
óptico por marca e a altura final vem da variável CSS `--logo-h`, definida por quem usa
o componente — o que permite mudá-la por breakpoint sem gerar outro arquivo. A ordem
**ON Educação → Immunogenic → Clínica Alergológica** vem de
`escola.quemConduz.realizadores`.

> Os originais da Clínica Alergológica (263×48) e da Immunogenic (340×73) são pequenos.
> Eles servem nos tamanhos em que aparecem, mas se houver versão vetorial ou em alta,
> vale substituir: é só trocar o arquivo em `media/logos/` e rodar `npm run media`.

A imagem de Open Graph é gerada por `npm run og`. Para usar uma arte final, coloque o
arquivo em `src/assets/img/og.jpg` (1200×630) e pare de rodar o script.

---

## Duplicar para outra escola

A página foi montada para ser clonada trocando dois lugares:

1. **`src/content/escola.ts`** — todo o texto, os oito encontros, o público, os
   realizadores, o local, os horários e os dados de SEO. Os tipos (`Encontro`,
   `Realizador`, `TemaIcone`) garantem que nada fique faltando.
2. **`media/`** — as fotos e as logos da outra escola, seguido de `npm run media`.

Além disso:

- Os ícones dos temas ficam em [`src/components/ui/Icon.astro`](src/components/ui/Icon.astro),
  referenciados pelo campo `icone` de cada encontro. Para outra escola, acrescente os
  novos desenhos ali e amplie o tipo `TemaIcone`.
- O JSON-LD é gerado a partir de `escola.encontros`; não há nada a editar.
- A paleta e a tipografia ficam em `src/styles/global.css`, no bloco `@theme`.

Nenhuma seção tem texto embutido no componente — se algo precisar mudar de palavra,
o lugar é `content/escola.ts`.

---

## Qualidade

Estado verificado nesta versão, com `npm run preview` servindo `dist/`:

- Lighthouse: **99/100/100/100** em mobile (performance, acessibilidade, boas
  práticas, SEO).
- Sem erros de console; build limpo.
- Conferido em 375px, 768px, 1024px e 1440px, sem rolagem horizontal em nenhum.
- Os nove botões de compra levam ao produto certo da EAD, conferido contra a tabela
  de ofertas.
- Com `?utm_source=teste`, os links da EAD saem com `utm_source=teste`, inclusive
  depois de recarregar a página sem o parâmetro; WhatsApp e Maps ficam intactos.
- Simulando o relógio depois de 18/03/2027 19:00, o Encontro 01 mostra
  "Encontro realizado" e perde o botão; os outros sete seguem ativos.
- O mapa do Google é um iframe de terceiro e só é montado quando a seção *O lugar*
  chega perto da tela, então não entra no carregamento inicial. Sem JavaScript, o
  bloco fica com o nome da casa e o link para o Google Maps.
- Contraste AA em todo o texto, foco visível, um único `h1`, HTML semântico e
  `prefers-reduced-motion` respeitado — com ele ligado, a cascata do grid de 100 pontos
  e o acendimento da linha do tempo aparecem prontos, sem animação.
