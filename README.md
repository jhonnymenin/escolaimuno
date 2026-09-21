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

Outros comandos:

| Comando | O que faz |
|---|---|
| `npm run build` | Gera o site em `dist/` |
| `npm run preview` | Serve `dist/` localmente |
| `npm run og` | Regera `src/assets/img/og.jpg` e `public/favicon.svg` |

---

## Variáveis de ambiente

Todas são públicas (prefixo `PUBLIC_`) e ficam em `.env` local e nas *Environment Variables*
do projeto na Vercel. O arquivo de referência é [`.env.example`](.env.example).

| Variável | Uso | Obrigatória |
|---|---|---|
| `PUBLIC_CTA_URL` | Link de inscrição (produto na plataforma EAD da ON). **Se vazio, o CTA cai para o WhatsApp.** | não |
| `PUBLIC_WHATSAPP` | Número com DDI, só dígitos (ex.: `5519999999999`). Usado quando `PUBLIC_CTA_URL` está vazio | sim, se não houver `PUBLIC_CTA_URL` |
| `PUBLIC_SPONSOR_CONTACT` | E-mail ou link para empresas interessadas em patrocínio. Se vazio, o bloco some do rodapé | não |
| `PUBLIC_GTM_ID` | Google Tag Manager (`GTM-XXXXXXX`). Se vazio, nada é carregado | não |
| `PUBLIC_META_PIXEL_ID` | Meta Pixel. Se vazio, nada é carregado | não |
| `PUBLIC_SITE_URL` | URL final, usada em canonical, Open Graph e sitemap | sim |

Flags de conteúdo ficam em [`src/config/site.ts`](src/config/site.ts):

| Flag | Padrão | Efeito |
|---|---|---|
| `showCertificate` | `true` | Mostra o item "Certificação" em *O que você leva da temporada* |
| `showEndTime` | `false` | Mostra o horário `21h30` no item "Networking" da linha do tempo. Desligado porque o término ainda não está confirmado |

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

## CTA, atribuição e tracking

- O CTA usa `PUBLIC_CTA_URL`. Sem ela, abre `wa.me/{PUBLIC_WHATSAPP}` com a mensagem
  definida em `escola.whatsappMensagem`.
- Na chegada, `utm_*`, `fbclid` e `gclid` são capturados e guardados em `sessionStorage`.
  No link de inscrição eles voltam como parâmetros de URL; no WhatsApp, a origem é
  acrescentada ao fim da mensagem.
- Todo clique dispara `cta_click` com a posição (`hero`, `header`, `sticky`, `final`)
  no `dataLayer` e no Pixel.
- GTM e Pixel só são injetados se as variáveis existirem, e de forma adiada: na primeira
  interação (`pointerdown`, `keydown`, `scroll`, `touchstart`) ou após 3s.

O link **Adicionar à agenda** de cada encontro gera um `.ics` no próprio navegador
(19h–21h30, `America/Sao_Paulo`, na SMCC). Nada sai do cliente.

---

## Organização

```
src/
  content/escola.ts        TODO o texto e os dados. Tipado. Nenhum componente tem copy.
  config/site.ts           Links, contatos, IDs e flags, lidos de import.meta.env
  components/sections/     Uma seção por arquivo, na ordem da página
  components/ui/           Peças pequenas: Cta, Icon, DotGrid, Silhueta, logos
  assets/img/og.jpg        Imagem de Open Graph (1200×630)
  layouts/Base.astro       head, SEO, JSON-LD (EventSeries + 8 Event), tracking
  styles/global.css        Tokens de cor e tipografia, utilitários de layout
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
requisição ao Google Fonts.

---

## Trocar as logos e as fotos

Dois conjuntos de arte são **reconstruções**, feitas em SVG porque os arquivos oficiais não
estavam disponíveis. Ambos estão isolados em um único componente cada:

- **Logos dos realizadores** — [`src/components/ui/LogoRealizador.astro`](src/components/ui/LogoRealizador.astro).
  Substitua o conteúdo de cada bloco pelo SVG oficial, mantendo:
  - a mesma proporção de `viewBox` para as três (elas são renderizadas com altura fixa,
    `h-7` no hero e no rodapé, `h-9` em *Quem conduz*, e largura automática);
  - a variante `light`, em branco, para uso sobre navy;
  - a ordem **ON Educação → Immunogenic → Clínica Alergológica**, definida em
    `escola.quemConduz.realizadores`.
- **Marca da Escola** — [`src/components/ui/LogoEscola.astro`](src/components/ui/LogoEscola.astro).
- **Fundo de células** do hero e da seção de inscrição —
  [`src/components/ui/CelulasBg.astro`](src/components/ui/CelulasBg.astro).
  Para usar a fotografia duotone original, troque o `<svg>` por um `<Image />` de
  `astro:assets`, apontando para o arquivo em `src/assets/img/`, com `width`/`height`
  explícitos e `loading="eager"` no hero (`lazy` na inscrição). As camadas de
  escurecimento por cima já estão no componente que o consome.
- **Imagem de Open Graph** — gerada por `npm run og`. Para usar uma arte final, apague o
  script do fluxo e coloque o arquivo em `src/assets/img/og.jpg` (1200×630).

---

## Duplicar para outra escola

A página foi montada para ser clonada trocando dois lugares:

1. **`src/content/escola.ts`** — todo o texto, os oito encontros, o público, os
   realizadores, o local, os horários e os dados de SEO. Os tipos (`Encontro`,
   `Realizador`, `TemaIcone`) garantem que nada fique faltando.
2. **`src/assets/`** e os componentes de marca citados acima — logos, imagem de OG
   e, se for o caso, fotos.

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

- Lighthouse **100/100/100/100** (performance, acessibilidade, boas práticas, SEO),
  em mobile e desktop.
- Sem erros de console; build limpo.
- Conferido em 375px, 768px e 1440px.
- Contraste AA em todo o texto, foco visível, um único `h1`, HTML semântico e
  `prefers-reduced-motion` respeitado — com ele ligado, a cascata do grid de 100 pontos
  e o acendimento da linha do tempo aparecem prontos, sem animação.
