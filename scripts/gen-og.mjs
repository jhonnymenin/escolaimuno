import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const cores = ['#0375C0', '#2FA8EE', '#03A7BE', '#5CCFC9', '#0A3D8F'];
let seed = 314159;
const rand = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
let cells = '';
for (let i = 0; i < 70; i++) {
  const r = 30 + rand() * 110;
  const cx = 600 + rand() * 640;
  const cy = rand() * 630;
  const c = cores[Math.floor(rand() * cores.length)];
  const o = (0.12 + rand() * 0.4).toFixed(3);
  cells += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="${c}" opacity="${o}"/>`;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#032766"/>
${cells}
<rect width="1200" height="630" fill="url(#g)"/>
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
<stop offset="0.28" stop-color="#032766" stop-opacity="1"/>
<stop offset="0.72" stop-color="#032766" stop-opacity="0"/>
</linearGradient></defs>
<g font-family="Verdana, DejaVu Sans, sans-serif">
<text x="72" y="150" fill="#5CCFC9" font-size="20" font-weight="700" letter-spacing="4">INSCRICOES ABERTAS</text>
<text x="72" y="250" fill="#FFFFFF" font-size="58" font-weight="700">Escola Continuada de</text>
<text x="72" y="322" fill="#FFFFFF" font-size="58" font-weight="700">Doencas Imunomediadas</text>
<text x="72" y="392" fill="#9FC3E8" font-size="26">Temporada 2027 &#183; Campinas &#183; 8 encontros presenciais</text>
<text x="72" y="540" fill="#5CCFC9" font-size="24" font-weight="700" letter-spacing="2">100 VAGAS &#183; TURMA UNICA</text>
</g>
<rect x="72" y="430" width="120" height="3" fill="#03A7BE"/>
</svg>`;

await sharp(Buffer.from(svg)).jpeg({ quality: 86 }).toFile('src/assets/img/og.jpg');

writeFileSync('public/favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34"><rect width="34" height="34" rx="6" fill="#032766"/><path d="M17 21V13m0 0-5-5m5 5 5-5" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/><circle cx="17" cy="24" r="3.2" fill="#5CCFC9"/><circle cx="10.6" cy="7" r="2.8" fill="#03A7BE"/><circle cx="23.4" cy="7" r="2.8" fill="#2FA8EE"/></svg>`);
console.log('ok');
