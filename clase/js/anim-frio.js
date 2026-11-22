// ==========================================
// ANIMACIONES DEL TEMA FRIGORÍFICOS (ATP)
// Fotos de Gemini (ilustraciones/frio-*.webp) con termómetro, carteles y letras encima.
// Misma forma de uso que anim-mecanica.js: montarAnim(div, nombre, { pausado })
// ==========================================

const NS = 'http://www.w3.org/2000/svg';
const IMG = n => `ilustraciones/frio-${n}.webp`;
// Las fotos son 1024 x 572. En el dibujo ocupan 320 de ancho desde y = 22.
const S = 320 / 1024, Y0 = 22;
const px = x => +(x * S).toFixed(1);
const py = y => +(Y0 + y * S).toFixed(1);
const foto = (n, id = '') => `<image ${id ? `id="${id}"` : ''} href="${IMG(n)}" x="0" y="${Y0}" width="320" height="${(572 * S).toFixed(1)}" preserveAspectRatio="xMidYMid slice"/>`;

const FONDO = t => `<rect x="0" y="0" width="320" height="260" rx="14" fill="#0b1220"/>
  <text x="160" y="16" text-anchor="middle" font-size="11.5" font-weight="900" fill="#fff">${t}</text>`;
const CARTEL = `<rect x="8" y="206" width="304" height="48" rx="10" fill="#0f172a" stroke="#22d3ee" stroke-opacity="0.4"/>
  <text id="c1" x="160" y="224" text-anchor="middle" font-size="10.5" font-weight="900" fill="#67e8f9"></text>
  <text id="c2" x="160" y="241" text-anchor="middle" font-size="8.8" fill="#e2e8f0"></text>`;

// Termómetro (de -25 a +35 grados)
function termo(x, y, h) {
  return `<g><rect x="${x - 15}" y="${y - 20}" width="30" height="${h + 44}" rx="12" fill="#0b1220" opacity="0.75"/>
    <rect x="${x - 6}" y="${y}" width="12" height="${h}" rx="6" fill="#0f172a" stroke="#cbd5e1" stroke-width="2"/>
    <circle cx="${x}" cy="${y + h + 7}" r="10" fill="#0f172a" stroke="#cbd5e1" stroke-width="2"/>
    <circle id="tb" cx="${x}" cy="${y + h + 7}" r="6.5" fill="#38bdf8"/>
    <rect id="tl" x="${x - 3}" y="${y + h}" width="6" height="0" rx="3" fill="#38bdf8"/>
    <text id="tn" x="${x}" y="${y - 7}" text-anchor="middle" font-size="10.5" font-weight="900" fill="#fff"></text></g>`;
}
function ponerTermo(q, y, h, g) {
  const f = (g + 25) / 60, alto = Math.max(4, f * h);
  const c = g <= 0 ? '#38bdf8' : g <= 12 ? '#22d3ee' : g <= 20 ? '#fbbf24' : '#f97316';
  q('tl').setAttribute('y', (y + h - alto + 5).toFixed(1)); q('tl').setAttribute('height', alto.toFixed(1));
  q('tl').setAttribute('fill', c); q('tb').setAttribute('fill', c);
  q('tn').textContent = (g > 0 ? '+' : '') + Math.round(g) + ' °C';
}
// Etiqueta con flecha que apunta a algo de la foto
function etiqueta(id, x, y, ax, ay, texto, color = '#22d3ee') {
  const w = texto.length * 5.6 + 14;
  return `<g id="${id}"><line x1="${x}" y1="${y}" x2="${ax}" y2="${ay}" stroke="${color}" stroke-width="1.6"/><circle cx="${ax}" cy="${ay}" r="3.5" fill="${color}"/>
    <rect x="${x - w / 2}" y="${y - 10}" width="${w}" height="18" rx="9" fill="#0b1220" stroke="${color}" stroke-width="1.5"/>
    <text x="${x}" y="${y + 3}" text-anchor="middle" font-size="9.5" font-weight="900" fill="#fff">${texto}</text></g>`;
}
// Flechitas de calor
const flechas = (p, n, color = '#fb923c') => Array.from({ length: n }, (_, i) =>
  `<path id="${p}${i}" d="M0 0 l12 0 m-4 -4 l4 4 l-4 4" fill="none" stroke="${color}" stroke-width="2.6" stroke-linecap="round"/>`).join('');
function moverFlechas(q, p, n, t, x0, x1, y0, dy) {
  for (let i = 0; i < n; i++) {
    const f = ((t / 2.2) + i / n) % 1;
    q(p + i).setAttribute('transform', `translate(${(x0 + (x1 - x0) * f).toFixed(1)} ${(y0 + i * dy).toFixed(1)})`);
    q(p + i).setAttribute('opacity', (f < 0.15 ? f / 0.15 : f > 0.8 ? (1 - f) / 0.2 : 1).toFixed(2));
  }
}
// Cuadrito con letras del ATP (blanco con letras azul oscuro)
const PLACA = (id, x, y, w, h) => `<g id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="#fff" stroke="#1e3a8a" stroke-width="1.5"/>
  <text id="${id}-l" x="${x + w / 2}" y="${y + h * 0.55}" text-anchor="middle" font-size="${h * 0.42}" font-weight="900" fill="#1e3a8a"></text>
  <text id="${id}-f" x="${x + w / 2}" y="${y + h * 0.88}" text-anchor="middle" font-size="${h * 0.22}" font-weight="800" fill="#1e3a8a">06-2028</text></g>`;
const brillo = t => (0.55 + 0.45 * Math.abs(Math.sin(t * 2.2))).toFixed(2);
const fade = (f, a, b) => Math.max(0, Math.min(1, (f - a) / (b - a)));

const SIGLAS = [
  ['FNA', 'frigorífico', 'normal', 'A'], ['FRA', 'frigorífico', 'reforzado', 'A'], ['FRC', 'frigorífico', 'reforzado', 'C'],
  ['FND', 'frigorífico', 'normal', 'D'], ['FRF', 'frigorífico', 'reforzado', 'F'], ['RNA', 'refrigerante', 'normal', 'A'],
  ['RRA', 'refrigerante', 'reforzado', 'A'], ['RND', 'refrigerante', 'normal', 'D'], ['CRA', 'calorífico', 'reforzado', 'A'],
  ['IN', 'isotermo', 'normal', ''], ['IR', 'isotermo', 'reforzado', '']
];

const DIBUJOS = {
  // ---------- CAPÍTULO 1 ----------
  perecederas: `${FONDO('MERCANCÍAS PERECEDERAS: COMIDA QUE SE PUDRE')}${foto('comida')}
    ${etiqueta('e0', 70, 60, 105, 100, 'carne')}${etiqueta('e1', 120, 190, 150, 160, 'pescado')}
    ${etiqueta('e2', 255, 50, 280, 85, 'leche')}${etiqueta('e3', 270, 190, 300, 160, 'congelados')}${CARTEL}`,
  donde: `${FONDO('¿DÓNDE SE APLICA EL ATP?')}${foto('barco')}
    <g id="km"><rect x="18" y="40" width="96" height="40" rx="10" fill="#0b1220" stroke="#22d3ee" stroke-width="2"/>
    <text x="66" y="57" text-anchor="middle" font-size="9" font-weight="800" fill="#cbd5e1">en barco, menos de</text>
    <text x="66" y="73" text-anchor="middle" font-size="14" font-weight="900" fill="#67e8f9">150 km</text></g>${CARTEL}`,
  congelados: `${FONDO('CONGELADOS Y COEFICIENTE K')}${foto('isotermo')}
    ${flechas('fk', 4)}${etiqueta('pared', 150, 46, 132, 72, 'paredes: por acá se cuela el calor', '#fbbf24')}
    ${termo(300, 50, 116)}${CARTEL}`,
  camara: `${FONDO('TRABAJAR EN UNA CÁMARA DE FRÍO')}${foto('camara')}
    <ellipse id="hielo" cx="175" cy="${py(420)}" rx="80" ry="13" fill="none" stroke="#38bdf8" stroke-width="2.5"/>
    ${etiqueta('eh', 250, 175, 210, py(420), 'placas de hielo en el piso', '#38bdf8')}${CARTEL}`,
  // ---------- CAPÍTULO 2 ----------
  tipos: `${FONDO('LOS 4 TIPOS DE CAJA')}
    ${['isotermo', 'refrigerante', 'frigorifico', 'calorifico', 'cisterna'].map((n, i) => `<g id="tp${i}" opacity="0">${foto(n)}</g>`).join('')}
    <g id="tache" opacity="0"><line x1="60" y1="40" x2="260" y2="190" stroke="#ef4444" stroke-width="6" stroke-linecap="round"/><line x1="260" y1="40" x2="60" y2="190" stroke="#ef4444" stroke-width="6" stroke-linecap="round"/></g>
    <g id="nums">${['I', 'R', 'F', 'C'].map((l, i) => `<g id="nb${i}"><rect x="${70 + i * 48}" y="26" width="38" height="20" rx="10" fill="#0b1220" stroke="#22d3ee" stroke-width="1.5"/>
      <text x="${89 + i * 48}" y="40" text-anchor="middle" font-size="10" font-weight="900" fill="#67e8f9">${i + 1}</text></g>`).join('')}</g>${CARTEL}`,
  isotermo: `${FONDO('ISOTERMO: UNA CONSERVADORA GIGANTE')}${foto('isotermo')}
    ${flechas('fi', 4)}${etiqueta('ep', 92, 44, px(130), py(240), 'paredes que aíslan', '#fbbf24')}
    ${etiqueta('es', 175, 194, px(360), py(300), 'sin máquina: no enfría ni calienta', '#94a3b8')}
    ${termo(300, 50, 116)}${CARTEL}`,
  refrigerante: `${FONDO('REFRIGERANTE: FRÍO SIN MÁQUINA')}${foto('refrigerante')}
    <g><rect x="12" y="30" width="64" height="30" rx="9" fill="#0b1220" stroke="#fbbf24" stroke-width="1.5"/><text x="44" y="50" text-anchor="middle" font-size="11" font-weight="900" fill="#fcd34d">☀ +30 °C</text></g>
    ${etiqueta('eh', 185, 46, px(430), py(235), 'hielo: no es una máquina', '#38bdf8')}
    ${termo(300, 50, 116)}${CARTEL}`,
  frigorifico: `${FONDO('FRIGORÍFICO: FRÍO CON MÁQUINA')}${foto('frigorifico')}
    ${etiqueta('em', 140, 40, px(250), py(220), 'su propia máquina de frío', '#38bdf8')}
    ${termo(300, 50, 116)}${CARTEL}`,
  calorifico: `${FONDO('CALORÍFICO: DA CALOR')}${foto('calorifico')}
    <g><rect x="12" y="30" width="64" height="30" rx="9" fill="#0b1220" stroke="#bae6fd" stroke-width="1.5"/><text x="44" y="50" text-anchor="middle" font-size="11" font-weight="900" fill="#e0f2fe">❄ -10 °C</text></g>
    ${etiqueta('ec', 165, 46, px(250), py(240), 'calefacción', '#fb923c')}
    ${termo(300, 50, 116)}${CARTEL}`,
  compara: `${FONDO('REFRIGERANTE CONTRA FRIGORÍFICO')}
    <svg x="0" y="40" width="158" height="120" viewBox="90 90 620 330" preserveAspectRatio="xMidYMid slice"><image href="${IMG('refrigerante')}" width="1024" height="572"/></svg>
    <svg x="162" y="40" width="158" height="120" viewBox="90 90 620 330" preserveAspectRatio="xMidYMid slice"><image href="${IMG('frigorifico')}" width="1024" height="572"/></svg>
    <g id="ladoA"><rect x="2" y="38" width="154" height="124" rx="6" fill="none" stroke="#38bdf8" stroke-width="3"/>
      <text x="79" y="32" text-anchor="middle" font-size="11" font-weight="900" fill="#7dd3fc">REFRIGERANTE</text>
      <text x="79" y="178" text-anchor="middle" font-size="11" font-weight="900" fill="#fff">frío SIN máquina</text>
      <text x="79" y="194" text-anchor="middle" font-size="9.5" fill="#cbd5e1">4 clases: A a D</text></g>
    <g id="ladoB"><rect x="164" y="38" width="154" height="124" rx="6" fill="none" stroke="#a78bfa" stroke-width="3"/>
      <text x="241" y="32" text-anchor="middle" font-size="11" font-weight="900" fill="#c4b5fd">FRIGORÍFICO</text>
      <text x="241" y="178" text-anchor="middle" font-size="11" font-weight="900" fill="#fff">frío CON máquina</text>
      <text x="241" y="194" text-anchor="middle" font-size="9.5" fill="#cbd5e1">6 clases: A a F</text></g>${CARTEL}`,
  // ---------- CAPÍTULO 3 ----------
  letra1: `${FONDO('1ª LETRA: QUÉ TIPO DE CAJA ES')}
    ${[['I', 'isotermo'], ['R', 'refrigerante'], ['F', 'frigorifico'], ['C', 'calorifico']].map(([l, n], i) => `<g id="l1${i}" opacity="0.3">
      <svg x="${6 + i * 78}" y="34" width="74" height="70" viewBox="90 60 680 380" preserveAspectRatio="xMidYMid slice"><image href="${IMG(n)}" width="1024" height="572"/></svg>
      <rect x="${6 + i * 78}" y="34" width="74" height="70" rx="6" fill="none" stroke="#22d3ee" stroke-width="2"/>
      <rect x="${18 + i * 78}" y="112" width="50" height="56" rx="8" fill="#fff" stroke="#1e3a8a" stroke-width="3"/>
      <text x="${43 + i * 78}" y="152" text-anchor="middle" font-size="34" font-weight="900" fill="#1e3a8a">${l}</text>
      <text x="${43 + i * 78}" y="186" text-anchor="middle" font-size="9.5" font-weight="900" fill="#67e8f9">${['isotermo', 'refrigerante', 'frigorífico', 'calorífico'][i]}</text></g>`).join('')}${CARTEL}`,
  letra2: `${FONDO('2ª LETRA: NORMAL O REFORZADO')}
    ${[['N', 'normal'], ['R', 'reforzado']].map(([l, d], i) => `<g id="l2${i}" opacity="0.3"><rect x="${50 + i * 130}" y="36" width="90" height="90" rx="12" fill="#fff" stroke="#1e3a8a" stroke-width="3"/>
      <text x="${95 + i * 130}" y="102" text-anchor="middle" font-size="62" font-weight="900" fill="#1e3a8a">${l}</text>
      <text x="${95 + i * 130}" y="146" text-anchor="middle" font-size="12" font-weight="900" fill="#67e8f9">${d}</text></g>`).join('')}
    <g id="iso" opacity="0"><rect x="60" y="158" width="200" height="38" rx="10" fill="#0b1220" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="160" y="182" text-anchor="middle" font-size="12" font-weight="900" fill="#fde68a">IN = isotermo normal · IR = isotermo reforzado</text></g>${CARTEL}`,
  letra3: `${FONDO('3ª LETRA: LA CLASE')}
    ${[['Refrigerante', 'R', 'ABCD'], ['Frigorífico', 'F', 'ABCDEF'], ['Calorífico', 'C', 'AB'], ['Isotermo', 'I', '']].map(([n, l, cl], i) => `<g id="l3${i}" opacity="0.3">
      <text x="12" y="${52 + i * 38}" font-size="11" font-weight="900" fill="#fff">${n}</text>
      ${cl ? cl.split('').map((c, j) => `<rect x="${92 + j * 28}" y="${37 + i * 38}" width="24" height="24" rx="5" fill="#fff" stroke="#1e3a8a" stroke-width="2"/><text x="${104 + j * 28}" y="${55 + i * 38}" text-anchor="middle" font-size="14" font-weight="900" fill="#1e3a8a">${c}</text>`).join('')
        : `<text x="100" y="${54 + i * 38}" font-size="11" font-weight="900" fill="#fde68a">sin clase: solo 2 letras (IN, IR)</text>`}
      ${cl ? `<text x="${96 + cl.length * 28}" y="${54 + i * 38}" font-size="10" font-weight="900" fill="#67e8f9">${cl.length} clases</text>` : ''}</g>`).join('')}${CARTEL}`,
  practica: `${FONDO('PRACTICÁ: LEÉ LAS LETRAS DEL CAMIÓN')}${foto('camion')}
    ${[0, 1, 2].map(i => `<g id="pl${i}"><rect x="${50 + i * 58}" y="${py(125)}" width="46" height="46" rx="6" fill="#fff" stroke="#1e3a8a" stroke-width="2.5"/>
      <text id="pt${i}" x="${73 + i * 58}" y="${py(125) + 36}" text-anchor="middle" font-size="32" font-weight="900" fill="#1e3a8a"></text>
      <text id="ps${i}" x="${73 + i * 58}" y="${py(125) + 58}" text-anchor="middle" font-size="8.5" font-weight="900" fill="#1e3a8a"></text></g>`).join('')}
    ${PLACA('pp', px(615), py(122), 28, 22)}${CARTEL}`,
  placa: `${FONDO('DÓNDE VAN LAS LETRAS')}${foto('camion')}
    ${PLACA('pq', px(600), py(122), 34, 27)}
    <rect id="aro" x="${px(600) - 5}" y="${py(122) - 5}" width="44" height="37" rx="6" fill="none" stroke="#22d3ee" stroke-width="2.5"/>
    ${etiqueta('e1', 120, 44, px(600) - 6, py(122) + 6, 'esquina de arriba, cerca de adelante')}
    <g id="lupa" opacity="0"><rect x="40" y="70" width="120" height="96" rx="8" fill="#fff" stroke="#1e3a8a" stroke-width="3"/>
      <text id="lupa-l" x="100" y="120" text-anchor="middle" font-size="36" font-weight="900" fill="#1e3a8a">FRC</text>
      <text x="100" y="150" text-anchor="middle" font-size="18" font-weight="900" fill="#1e3a8a">06-2028</text>
      <text id="lupa-n" x="100" y="184" text-anchor="middle" font-size="9.5" font-weight="900" fill="#fde68a"></text></g>${CARTEL}`,
  distintivo: `${FONDO('EL DISTINTIVO Y LA PLACA')}${foto('camion')}
    <g id="dz"><rect x="44" y="60" width="96" height="96" rx="6" fill="#fff" stroke="#1e3a8a" stroke-width="3"/>
      <text x="92" y="122" text-anchor="middle" font-size="34" font-weight="900" fill="#1e3a8a">FRC</text>
      <text x="92" y="174" text-anchor="middle" font-size="9.5" font-weight="900" fill="#fde68a">blanco + letras azul oscuro</text></g>
    <g id="pc" opacity="0"><rect x="150" y="72" width="128" height="80" rx="4" fill="#e2e8f0" stroke="#475569" stroke-width="2"/>
      <text x="214" y="116" text-anchor="middle" font-size="10" font-weight="900" fill="#334155">placa de certificación</text>
      <line x1="150" y1="162" x2="278" y2="162" stroke="#22d3ee" stroke-width="1.5"/><text x="214" y="176" text-anchor="middle" font-size="10" font-weight="900" fill="#67e8f9">160 mm</text>
      <line x1="288" y1="72" x2="288" y2="152" stroke="#22d3ee" stroke-width="1.5"/><text x="300" y="116" font-size="10" font-weight="900" fill="#67e8f9" transform="rotate(90 300 116)" text-anchor="middle">100 mm</text></g>${CARTEL}`
};

export function montarAnim(contenedor, nombre, opts = {}) {
  const pausado = opts.pausado || (() => false);
  contenedor.innerHTML = `<svg viewBox="0 0 320 260" xmlns="${NS}" style="width:100%;height:auto;display:block">${DIBUJOS[nombre] || ''}</svg>`;
  const q = id => contenedor.querySelector('#' + id);
  const cartel = (a, b) => { q('c1').textContent = a; q('c2').textContent = b; };
  const ciclo = (t, dur, n) => Math.floor(t / dur) % n;
  let t = 0, ultimo = performance.now(), vivo = true;

  const ANIMS = {
    perecederas: t => {
      const k = ciclo(t, 4.5, 3);
      for (let i = 0; i < 4; i++) q('e' + i).setAttribute('opacity', k === 0 ? brillo(t + i) : 0.85);
      cartel(...[['CARNE, PESCADO, LECHE, CONGELADOS', 'Se echan a perder si se calientan: son mercancías perecederas.'],
        ['ATP = ACUERDO ENTRE PAÍSES', 'Reglas para llevarlas y cómo tienen que ser los camiones.'],
        ['ESPAÑA LO FIRMÓ', 'Y llevar comida a temperatura regulada tiene regulación especial.']][k]);
    },
    donde: t => {
      const k = ciclo(t, 4.5, 3);
      q('km').setAttribute('opacity', k === 2 ? brillo(t) : 0.35);
      cartel(...[['VIAJES INTERNACIONALES', 'Se aplica directo entre países que firmaron el ATP.'],
        ['CUENTA AJENA O PROPIA', 'Trabajes para otro o lleves tu propia mercancía.'],
        ['EN BARCO: MENOS DE 150 KM', 'Sigue valiendo si la mercancía va adentro del camión.']][k]);
    },
    congelados: t => {
      const k = ciclo(t, 6, 2);
      moverFlechas(q, 'fk', 4, t, 2, px(120) - 12, py(170), 22);
      for (let i = 0; i < 4; i++) if (k === 0) q('fk' + i).setAttribute('opacity', 0);
      q('pared').setAttribute('opacity', k === 1 ? brillo(t) : 0);
      ponerTermo(q, 50, 116, k === 0 ? -15 + 5 * Math.sin(t * 1.2) : 2);
      cartel(...(k === 0 ? ['CONGELADOS: DE -20 °C A -10 °C', 'Como máximo, según el producto. Mirá el termómetro.']
        : ['COEFICIENTE K', 'Cuánto calor se cuela por las paredes. Más chico = aísla mejor.']));
    },
    camara: t => {
      q('hielo').setAttribute('opacity', brillo(t)); q('eh').setAttribute('opacity', brillo(t + 1));
      cartel('PISO CON PLACAS DE HIELO', 'El accidente más común: resbalarse y caerse al mismo nivel.');
    },
    tipos: t => {
      const NOM = [['1 · ISOTERMO', 'Paredes que aíslan. Sin máquina.'], ['2 · REFRIGERANTE', 'Aísla + frío sin máquina (hielo).'],
        ['3 · FRIGORÍFICO', 'Aísla + su propia máquina de frío.'], ['4 · CALORÍFICO', 'Aísla + calefacción.'],
        ['CISTERNA NO ES UN TIPO', 'Es la forma de la caja. Puede ser de cualquiera de los 4 tipos.']];
      const dur = 4, k = ciclo(t, dur, 5), f = (t % dur) / dur;
      for (let i = 0; i < 5; i++) q('tp' + i).setAttribute('opacity', i === k ? Math.min(1, f / 0.15).toFixed(2) : 0);
      for (let i = 0; i < 4; i++) q('nb' + i).setAttribute('opacity', i === k ? 1 : 0.35);
      q('tache').setAttribute('opacity', k === 4 && f > 0.3 ? 0.9 : 0);
      cartel(...NOM[k]);
    },
    isotermo: t => {
      moverFlechas(q, 'fi', 4, t, 2, px(118) - 12, py(170), 24);
      const k = ciclo(t, 5, 2);
      q('ep').setAttribute('opacity', k === 0 ? brillo(t) : 0.5); q('es').setAttribute('opacity', k === 1 ? brillo(t) : 0.5);
      ponerTermo(q, 50, 116, 4 + Math.sin(t * 0.7));
      cartel(...(k === 0 ? ['PAREDES QUE AÍSLAN', 'El calor de afuera choca contra la pared y casi no entra.']
        : ['NO TIENE MÁQUINA', 'No enfría ni calienta: solo mantiene la temperatura.']));
    },
    refrigerante: t => {
      const f = (t % 12) / 12, g = f < 0.6 ? 30 - 23 * (f / 0.6) : 7;
      ponerTermo(q, 50, 116, g); q('eh').setAttribute('opacity', brillo(t));
      cartel(...(f < 0.6 ? ['ENFRIANDO SIN MÁQUINA…', 'La fuente de frío no es un equipo mecánico ni de absorción.']
        : ['CLASE A: MÁXIMO +7 °C', 'Con +30 °C afuera, adentro no puede pasar de +7 °C.']));
    },
    frigorifico: t => {
      const f = (t % 16) / 16, g = f < 0.45 ? 12 - 32 * (f / 0.45) : f < 0.55 ? -20 : -20 + 32 * ((f - 0.55) / 0.45);
      ponerTermo(q, 50, 116, g); q('em').setAttribute('opacity', brillo(t));
      cartel('CLASE C: ENTRE +12 °C Y -20 °C', 'La máquina pone la temperatura que se elija dentro de ese rango.');
    },
    calorifico: t => {
      const f = (t % 12) / 12, g = f < 0.6 ? -10 + 22 * (f / 0.6) : 12;
      ponerTermo(q, 50, 116, g); q('ec').setAttribute('opacity', brillo(t));
      cartel(...(f < 0.6 ? ['CALENTANDO…', 'Sirve para que la carga no se congele cuando afuera hace mucho frío.']
        : ['CLASE A: +12 °C O MÁS', 'Con -10 °C afuera, adentro no puede bajar de +12 °C.']));
    },
    compara: t => {
      const k = ciclo(t, 4.5, 3);
      q('ladoA').setAttribute('opacity', k === 1 ? 0.35 : 1); q('ladoB').setAttribute('opacity', k === 0 ? 0.35 : 1);
      cartel(...[['REFRIGERANTE = SIN MÁQUINA', 'Su frío no es un equipo mecánico ni de absorción. 4 clases.'],
        ['FRIGORÍFICO = CON MÁQUINA', 'Tiene su propia máquina (mecánica o de absorción). 6 clases.'],
        ['LA TRAMPA QUE MÁS SALE', '¿Tiene máquina? Frigorífico. ¿No tiene? Refrigerante.']][k]);
    },
    letra1: t => {
      const k = ciclo(t, 3, 5);
      for (let i = 0; i < 4; i++) q('l1' + i).setAttribute('opacity', k === 4 || i === k ? 1 : 0.3);
      cartel(...[['I = ISOTERMO', 'La primera letra dice el tipo de caja.'], ['R = REFRIGERANTE', 'R primera = refrigerante.'],
        ['F = FRIGORÍFICO', 'F de frigorífico, el de la máquina de frío.'], ['C = CALORÍFICO', 'C de calorífico, el que da calor.'],
        ['I · R · F · C', 'Son letras: no números ni colores.']][k]);
    },
    letra2: t => {
      const k = ciclo(t, 4, 3);
      q('l20').setAttribute('opacity', k === 0 || k === 2 ? 1 : 0.3); q('l21').setAttribute('opacity', k >= 1 ? 1 : 0.3);
      q('iso').setAttribute('opacity', k === 2 ? 1 : 0);
      cartel(...[['N = NORMAL', 'La N del medio es normal. No quiere decir "anual".'], ['R = REFORZADO', 'R en el medio = reforzado (no refrigerante).'],
        ['EL ISOTERMO: SOLO 2 LETRAS', 'No tiene clase. IN o IR.']][k]);
    },
    letra3: t => {
      const k = ciclo(t, 3.5, 4);
      for (let i = 0; i < 4; i++) q('l3' + i).setAttribute('opacity', i === k ? 1 : 0.3);
      cartel(...[['REFRIGERANTE: 4 CLASES', 'De la A a la D.'], ['FRIGORÍFICO: 6 CLASES', 'De la A a la F.'],
        ['CALORÍFICO: 2 CLASES', 'A y B.'], ['ISOTERMO: SIN CLASE', 'Lleva solo 2 letras: IN o IR.']][k]);
    },
    practica: t => {
      const dur = 5, k = ciclo(t, dur, SIGLAS.length), f = (t % dur) / dur, e = SIGLAS[k];
      const significado = [e[1], e[2], e[3] ? 'clase ' + e[3] : 'sin clase'];
      for (let i = 0; i < 3; i++) {
        const op = fade(f, 0.05 + i * 0.12, 0.15 + i * 0.12);
        q('pl' + i).setAttribute('opacity', (i === 2 && !e[3] ? 0.2 : op).toFixed(2));
        q('pt' + i).textContent = e[0][i] || '–'; q('ps' + i).textContent = op > 0.6 ? significado[i] : '';
      }
      q('pp-l').textContent = e[0];
      if (f > 0.45) cartel(e[0] + ' = ' + e[1] + ' ' + e[2] + (e[3] ? ' de la clase ' + e[3] : ''),
        !e[3] ? 'El isotermo lleva solo 2 letras.' : e[0].startsWith('RR') ? 'R primera = refrigerante · R del medio = reforzado.' : 'Tipo · normal o reforzado · clase.');
      else cartel('¿QUÉ DICE?', 'Leé las letras de a una…');
    },
    placa: t => {
      const k = ciclo(t, 5, 3);
      q('aro').setAttribute('opacity', brillo(t)); q('e1').setAttribute('opacity', k === 0 ? 1 : 0.25);
      q('lupa').setAttribute('opacity', k === 0 ? 0 : 1);
      q('pq-l').textContent = k === 2 ? 'FRC X' : 'FRC'; q('lupa-l').textContent = k === 2 ? 'FRC X' : 'FRC';
      q('lupa-n').textContent = k === 1 ? 'abajo: vence en junio de 2028' : k === 2 ? 'X: el equipo se puede sacar' : '';
      cartel(...[['ESQUINA DE ARRIBA, CERCA DE ADELANTE', 'En los DOS costados del camión.'],
        ['DEBAJO: CUÁNDO VENCE', 'Solo mes y año del certificado.'],
        ['LETRA X', 'Si el equipo de frío o calor se puede sacar o no es autónomo.']][k]);
    },
    distintivo: t => {
      const k = ciclo(t, 5, 2);
      q('dz').setAttribute('opacity', k === 0 ? 1 : 0.25); q('pc').setAttribute('opacity', k === 1 ? 1 : 0);
      cartel(...(k === 0 ? ['DISTINTIVO DE MERCANCÍAS PERECEDERAS', 'Cuadrado blanco con las letras en azul oscuro.']
        : ['PLACA DE CERTIFICACIÓN', 'Mide como mínimo 160 × 100 mm.']));
    }
  };

  function cuadro(ahora) {
    if (!vivo) return;
    const dt = pausado() ? 0 : Math.max(0, Math.min(0.05, (ahora - ultimo) / 1000)); ultimo = ahora; t += dt;
    if (ANIMS[nombre]) ANIMS[nombre](t);
    requestAnimationFrame(cuadro);
  }
  requestAnimationFrame(cuadro);
  return () => { vivo = false; };
}
