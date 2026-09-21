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
| `npm run check` | Checagem de tipos dos arquivos `.astro` |
| `npm run media` | Regera `src/assets/` a partir dos originais em `media/` |
| `npm run og` | Regera `src/assets/img/og.jpg` e `public/favicon.svg` |

---

## Variáveis de ambiente

Todas são públicas (prefixo `PUBLIC_`) e ficam em `.env` local e nas *Environment Variables*
do projeto na Vercel. O arquivo de referência é [`.env.example`](.env.example).

| Variável | Uso | Obrigatória |
|---|---|---|
| `PUBLIC_CTA_URL` | Link de inscrição (produto na plataforma EAD da ON). **Se vazio, o CTA cai para o WhatsApp.** | não |
| `PUBLIC_WHATSAPP` | Número com DDI, só dígitos. Usado quando `PUBLIC_CTA_URL` está vazio. Tem padrão embutido (`5511970687422`) para o CTA não ficar morto num deploy sem variáveis | não |
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
media/
  fotos/                   Fotos originais, em alta. Fonte de verdade.
  logos/                   Logos originais (PNG com transparência).
src/
  content/escola.ts        TODO o texto e os dados. Tipado. Nenhum componente tem copy.
  config/site.ts           Links, contatos, IDs e flags, lidos de import.meta.env
  components/sections/     Uma seção por arquivo, na ordem da página
  components/ui/           Peças pequenas: Cta, Foto, Icon, DotGrid, logos
  assets/fotos/            Derivadas de media/fotos por `npm run media`
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

Para trocar uma foto, substitua o arquivo em `media/fotos/` **mantendo o nome** e rode
`npm run media`. Para acrescentar outra, coloque em `media/fotos/`, rode o script e
importe a variante certa na seção.

**Logos** — de cada original saem duas versões: a colorida e uma branca (mesmo recorte,
tudo pintado de branco) para uso sobre navy. Os arquivos já vêm aparados na
transparência, então basta trocar o PNG em `media/logos/` e rodar `npm run media`.

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

- Lighthouse: **99/100/100/100** em mobile e **100/100/100/100** em desktop
  (performance, acessibilidade, boas práticas, SEO).
- Sem erros de console; build e `astro check` limpos.
- Conferido em 375px, 768px, 1024px e 1440px, sem rolagem horizontal em nenhum.
- Contraste AA em todo o texto, foco visível, um único `h1`, HTML semântico e
  `prefers-reduced-motion` respeitado — com ele ligado, a cascata do grid de 100 pontos
  e o acendimento da linha do tempo aparecem prontos, sem animação.
