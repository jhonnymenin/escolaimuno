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
const LOGOS_IN = 'media/logos';
const FOTOS_OUT = 'src/assets/fotos';
const LOGOS_OUT = 'src/assets/logos';

mkdirSync(FOTOS_OUT, { recursive: true });
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

for (const arquivo of readdirSync(LOGOS_IN)) {
  const nome = basename(arquivo, extname(arquivo));
  const origem = join(LOGOS_IN, arquivo);

  const recortada = await sharp(origem).ensureAlpha().trim({ threshold: 1 }).png().toBuffer();
  const info = await sharp(recortada).png({ compressionLevel: 9 }).toFile(join(LOGOS_OUT, `${nome}.png`));

  // Variante branca: mantém o recorte (alfa) e pinta tudo de branco.
  const { width, height } = await sharp(recortada).metadata();
  const alfa = await sharp(recortada).extractChannel('alpha').toBuffer();
  await sharp({ create: { width, height, channels: 3, background: '#ffffff' } })
    .joinChannel(alfa)
    .png({ compressionLevel: 9 })
    .toFile(join(LOGOS_OUT, `${nome}-branco.png`));

  console.log(`logo  ${nome.padEnd(20)} ${info.width}x${info.height}  cor + branco`);
}
