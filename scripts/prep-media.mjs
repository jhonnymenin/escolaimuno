/**
 * Gera os arquivos de src/assets/ a partir dos originais em media/.
 * Rode `npm run media` depois de trocar qualquer foto ou logo em media/.
 *
 * - fotos naturais: redimensionadas e recomprimidas
 * - fotos duotone: mapeadas para a paleta (sombras navy, luzes azul-claro)
 * - logos: recortadas na transparência + variante branca para uso sobre navy
 */
import sharp from 'sharp';
import { mkdirSync, readdirSync, existsSync } from 'node:fs';
import { basename, extname, join } from 'node:path';

const FOTOS_IN = 'media/fotos';
const LOCAL_IN = 'media/local';
const PESSOAS_IN = 'media/pessoas';
const LOGOS_IN = 'media/logos';
const LOGOS_ESCURAS_IN = 'media/logos-fundo-escuro';
const FOTOS_OUT = 'src/assets/fotos';
const LOCAL_OUT = 'src/assets/local';
const PESSOAS_OUT = 'src/assets/pessoas';
const LOGOS_OUT = 'src/assets/logos';

mkdirSync(FOTOS_OUT, { recursive: true });
mkdirSync(LOCAL_OUT, { recursive: true });
mkdirSync(PESSOAS_OUT, { recursive: true });
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
 * Algumas marcas entregam duas artes: uma para fundo claro e outra para fundo
 * escuro. Quando existe `media/logos-fundo-escuro/<nome>.png`, essa arte vira
 * a variante `-branco` tal como o dono da marca desenhou. Para as demais, a
 * variante é a silhueta da logo pintada de branco.
 */
const temArteEscura = (nome) => existsSync(join(LOGOS_ESCURAS_IN, `${nome}.png`));

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

/**
 * Retratos: cor natural, com a saturação quase intacta — é uma pessoa, não um
 * elemento gráfico. Só perdem um fio para não destoar da paleta fria.
 */
for (const arquivo of readdirSync(PESSOAS_IN)) {
  const nome = basename(arquivo, extname(arquivo));
  const info = await sharp(join(PESSOAS_IN, arquivo))
    .rotate()
    .resize({ width: 1200, height: 1600, fit: 'inside', withoutEnlargement: true })
    .modulate({ saturation: 0.82 })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(join(PESSOAS_OUT, `${nome}.jpg`));

  console.log(`retrato ${nome.padEnd(20)} ${info.width}x${info.height}`);
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

  const info = await sharp(recortada).png({ compressionLevel: 9 }).toFile(join(LOGOS_OUT, `${nome}.png`));

  if (temArteEscura(nome)) {
    // A marca entregou a arte de fundo escuro: usa como veio, só recortada.
    await sharp(join(LOGOS_ESCURAS_IN, `${nome}.png`))
      .ensureAlpha()
      .trim({ threshold: 1 })
      .resize({ width: MAX_LOGO, fit: 'inside', withoutEnlargement: true })
      .png({ compressionLevel: 9 })
      .toFile(join(LOGOS_OUT, `${nome}-branco.png`));
  } else {
    // Sem arte própria: a silhueta da logo pintada de branco.
    const { width, height } = await sharp(recortada).metadata();
    const alfa = await sharp(recortada).extractChannel('alpha').raw().toBuffer();

    await sharp({ create: { width, height, channels: 3, background: '#ffffff' } })
      .joinChannel(alfa, { raw: { width, height, channels: 1 } })
      .png({ compressionLevel: 9 })
      .toFile(join(LOGOS_OUT, `${nome}-branco.png`));
  }

  console.log(
    `logo  ${nome.padEnd(20)} ${info.width}x${info.height}  cor + ${temArteEscura(nome) ? 'arte escura da marca' : 'silhueta branca'}`
  );
}
