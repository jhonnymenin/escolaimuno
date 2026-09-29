/**
 * Gera os arquivos de src/assets/ a partir dos originais em media/.
 * Rode `npm run media` depois de trocar qualquer foto ou logo em media/.
 *
 * - fotos naturais: redimensionadas e recomprimidas
 * - fotos duotone: mapeadas para a paleta (sombras navy, luzes azul-claro)
 * - logos: recortadas na transparência + variante branca para uso sobre navy
 */
import sharp from 'sharp';
import { mkdirSync, readdirSync } from 'node:fs';
import { basename, extname, join } from 'node:path';

const FOTOS_IN = 'media/fotos';
const LOCAL_IN = 'media/local';
const LOGOS_IN = 'media/logos';
const FOTOS_OUT = 'src/assets/fotos';
const LOCAL_OUT = 'src/assets/local';
const LOGOS_OUT = 'src/assets/logos';

mkdirSync(FOTOS_OUT, { recursive: true });
mkdirSync(LOCAL_OUT, { recursive: true });
mkdirSync(LOGOS_OUT, { recursive: true });

/** Duotone: sombra -> navy quase preto, luz -> azul médio. out = d + cinza * (l - d) / 255.
 *  ESCURO fica sob texto branco, nas seções navy. CLARO entra nas seções brancas. */
const ESCURO = { sombra: [1, 12, 38], luz: [38, 104, 158] }; // #010C26 -> #26689E
const CLARO = { sombra: [8, 52, 116], luz: [226, 238, 250] }; // #083474 -> #E2EEFA

// Matriz que converte para cinza mantendo os três canais (grayscale() reduz a um só,
// e linear() com array precisa de três).
const CINZA = Array.from({ length: 3 }, () => [0.2126, 0.7152, 0.0722]);

const duotone = (pipe, { sombra, luz }) =>
  pipe
    .recomb(CINZA)
    .normalise()
    .linear(
      luz.map((l, i) => (l - sombra[i]) / 255),
      sombra
    );

const MAX = 2200;
/** Nenhuma logo aparece com mais de ~180px de largura; 1400 cobre 3x disso. */
const MAX_LOGO = 1400;

/**
 * A logo da Alergológica veio na versão para fundo escuro: a palavra
 * "Alergológica" é um verde quase branco que some no branco. Para a versão de
 * fundo claro, só os pixels claros da área do texto viram verde escuro — o
 * símbolo e a palavra "saúde" ficam exatamente como estão.
 *
 * `aPartirDe` é a fração da largura em que o texto começa, medida no original.
 */
const RECOLORIR = {
  'clinica-alergologica': { aPartirDe: 0.318, acimaDe: 190, para: [27, 79, 75] },
};

/**
 * O símbolo da Alergológica é feito de pétalas translúcidas sobrepostas. Uma
 * versão branca chapada viraria uma mancha, então nessas marcas o branco é
 * modulado pelo brilho do pixel: o que era claro fica opaco, o que era escuro
 * fica translúcido, e o desenho continua legível sobre navy.
 */
const BRANCO_COM_RELEVO = new Set(['clinica-alergologica']);

/** Repinta os pixels claros de uma faixa da imagem, preservando o alfa. */
const repintar = async (buffer, regra) => {
  const img = sharp(buffer).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const inicio = Math.round(width * regra.aPartirDe);

  for (let y = 0; y < height; y += 1) {
    for (let x = inicio; x < width; x += 1) {
      const i = (y * width + x) * channels;
      if (data[i + 3] === 0) continue;
      const lum = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
      if (lum <= regra.acimaDe) continue;
      [data[i], data[i + 1], data[i + 2]] = regra.para;
    }
  }

  return sharp(data, { raw: { width, height, channels } }).png({ compressionLevel: 9 }).toBuffer();
};

for (const arquivo of readdirSync(FOTOS_IN)) {
  const nome = basename(arquivo, extname(arquivo));
  const origem = join(FOTOS_IN, arquivo);

  const natural = sharp(origem).rotate().resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true });
  const infoN = await natural.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(join(FOTOS_OUT, `${nome}.jpg`));

  const base = () =>
    sharp(origem).rotate().resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true });

  await duotone(base(), ESCURO).jpeg({ quality: 82, mozjpeg: true }).toFile(join(FOTOS_OUT, `${nome}-duotone.jpg`));
  await duotone(base(), CLARO).jpeg({ quality: 82, mozjpeg: true }).toFile(join(FOTOS_OUT, `${nome}-duotone-claro.jpg`));

  console.log(`foto  ${nome.padEnd(20)} ${infoN.width}x${infoN.height}  natural + duotone escuro + duotone claro`);
}

/**
 * As fotos do local ficam em cor natural — é o único ponto da página em que
 * interessa ver a casa como ela é. Só perdem um pouco de saturação para não
 * brigar com a paleta fria do resto.
 */
for (const arquivo of readdirSync(LOCAL_IN)) {
  const nome = basename(arquivo, extname(arquivo));
  const info = await sharp(join(LOCAL_IN, arquivo))
    .rotate()
    .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
    .modulate({ saturation: 0.72 })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(join(LOCAL_OUT, `${nome}.jpg`));

  console.log(`local ${nome.padEnd(20)} ${info.width}x${info.height}`);
}

for (const arquivo of readdirSync(LOGOS_IN)) {
  const nome = basename(arquivo, extname(arquivo));
  const origem = join(LOGOS_IN, arquivo);

  const recortada = await sharp(origem)
    .ensureAlpha()
    .trim({ threshold: 1 })
    .resize({ width: MAX_LOGO, fit: 'inside', withoutEnlargement: true })
    .png()
    .toBuffer();

  const regra = RECOLORIR[nome];
  const paraFundoClaro = regra ? await repintar(recortada, regra) : recortada;
  const info = await sharp(paraFundoClaro).png({ compressionLevel: 9 }).toFile(join(LOGOS_OUT, `${nome}.png`));

  // Variante branca: mantém o recorte (alfa) e pinta tudo de branco.
  const { width, height } = await sharp(recortada).metadata();
  let alfa = await sharp(recortada).extractChannel('alpha').raw().toBuffer();

  if (BRANCO_COM_RELEVO.has(nome)) {
    const { data, info } = await sharp(recortada)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const canais = info.channels;
    const modulado = Buffer.alloc(width * height);
    for (let i = 0; i < width * height; i += 1) {
      const j = i * canais;
      const lum = (0.2126 * data[j] + 0.7152 * data[j + 1] + 0.0722 * data[j + 2]) / 255;
      const fator = Math.min(1, 0.6 + 0.45 * lum);
      modulado[i] = Math.round(data[j + 3] * fator);
    }
    alfa = modulado; // já está em raw, 1 canal
  }

  await sharp({ create: { width, height, channels: 3, background: '#ffffff' } })
    .joinChannel(alfa, { raw: { width, height, channels: 1 } })
    .png({ compressionLevel: 9 })
    .toFile(join(LOGOS_OUT, `${nome}-branco.png`));

  console.log(`logo  ${nome.padEnd(20)} ${info.width}x${info.height}  cor + branco`);
}
