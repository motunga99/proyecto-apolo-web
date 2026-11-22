// ==========================================
// ANIMACIONES 2D (SVG) PARA EL TEMA DE MECÁNICA
// motor4t, turbo, embrague, caja, diferencial
// Movimiento suave, sin rebotes. Devuelve una función para detenerla.
// ==========================================
const NS = 'http://www.w3.org/2000/svg';

function engranaje(cx, cy, r, dientes, color) {
  let d = '';
  const paso = (Math.PI * 2) / dientes;
  for (let i = 0; i < dientes; i++) {
    const a = i * paso;
    const pts = [[a, r - 5], [a + paso * 0.15, r + 5], [a + paso * 0.45, r + 5], [a + paso * 0.6, r - 5]];
    pts.forEach(([ang, rr], j) => { d += (i === 0 && j === 0 ? 'M' : 'L') + (cx + rr * Math.cos(ang)).toFixed(1) + ' ' + (cy + rr * Math.sin(ang)).toFixed(1) + ' '; });
  }
  return `<path d="${d}Z" fill="${color}" stroke="#0f172a" stroke-width="1.5"/><circle cx="${cx}" cy="${cy}" r="${r * 0.28}" fill="#0f172a"/>`;
}


// ---- curvas del motor (se calculan una vez) ----
const RX = r => 40 + r / 3000 * 260;
const parDe = r => 0.3 + 0.7 * Math.exp(-Math.pow((r - 1300) / (r < 1300 ? 700 : 1800), 2));
const potDe = r => { let m = 0; for (let k = 600; k <= 3000; k += 50) m = Math.max(m, parDe(k) * k); return parDe(r) * r / m; };
const ceDe = r => 0.25 + 0.55 * Math.pow((r - 1300) / 1500, 2);
function curva(fn, y0 = 190, alto = 140) { let d = ''; for (let r = 600; r <= 3000; r += 50) d += (r === 600 ? 'M' : 'L') + RX(r).toFixed(1) + ' ' + (y0 - fn(r) * alto).toFixed(1) + ' '; return d; }
const D_PAR = curva(parDe), D_POT = curva(potDe), D_CE = curva(ceDe);
function flujo(contenedor, idPath, n, color, r = 4) {
  const p = contenedor.querySelector('#' + idPath);
  const g = document.createElementNS(NS, 'g');
  p.parentNode.appendChild(g);
  const L = p.getTotalLength();
  const ps = [];
  for (let i = 0; i < n; i++) { const c = document.createElementNS(NS, 'circle'); c.setAttribute('r', r); c.setAttribute('fill', color); g.appendChild(c); ps.push(c); }
  return (t, vel = 40, activo = true) => {
    g.style.opacity = activo ? 1 : 0;
    ps.forEach((c, i) => { const pt = p.getPointAtLength(((t * vel + i * L / n) % L + L) % L); c.setAttribute('cx', pt.x); c.setAttribute('cy', pt.y); });
  };
}

const CADENA = [['MOTOR', 40, 64], ['EMBRAGUE', 120, 64], ['CAJA', 200, 64], ['ÁRBOL', 280, 64], ['DIFERENCIAL', 200, 140], ['PALIERES', 120, 140], ['RUEDAS', 40, 140]];
const CADENA_INFO = [
  ['MOTOR', 'Hace la fuerza: quema el gasoil y hace girar el cigüeñal.'],
  ['EMBRAGUE', 'Conecta o desconecta el motor. Lo pisás para cambiar de marcha.'],
  ['CAJA DE CAMBIOS', 'Las marchas: elegís más fuerza (corta) o más velocidad (larga).'],
  ['ÁRBOL DE TRANSMISIÓN', 'Un eje largo que lleva el giro hasta el eje de atrás.'],
  ['GRUPO CÓNICO Y DIFERENCIAL', 'Gira el movimiento hacia las ruedas y en la curva deja que la de afuera gire más.'],
  ['PALIERES', 'Los dos ejes que llevan el giro a cada rueda.'],
  ['RUEDAS', 'Convierten el giro en avance: el camión anda.']
];
const DIBUJOS = {
  curvas: `
    <rect x="0" y="0" width="320" height="230" rx="14" fill="#0b1220"/>
    <text id="cv-tit" x="160" y="20" text-anchor="middle" font-size="12" font-weight="900" fill="#fff">LAS CURVAS DEL MOTOR</text>
    <rect x="${RX(1000)}" y="38" width="${RX(1700) - RX(1000)}" height="152" fill="#22c55e" opacity="0.13"/>
    <text x="${(RX(1000) + RX(1700)) / 2}" y="185" text-anchor="middle" font-size="8" font-weight="800" fill="#86efac">ZONA VERDE</text>
    <line x1="40" y1="190" x2="302" y2="190" stroke="#64748b" stroke-width="1.5"/><line x1="40" y1="38" x2="40" y2="190" stroke="#64748b" stroke-width="1.5"/>
    ${[0, 1000, 2000, 3000].map(r => `<text x="${RX(r)}" y="202" text-anchor="middle" font-size="8" fill="#94a3b8">${r}</text>`).join('')}
    <text x="171" y="214" text-anchor="middle" font-size="8" fill="#94a3b8">vueltas por minuto</text>
    <path d="${D_POT}" fill="none" stroke="#38bdf8" stroke-width="3"/><text x="296" y="${190 - potDe(2900) * 140 - 6}" text-anchor="end" font-size="9" font-weight="800" fill="#7dd3fc">potencia</text>
    <path d="${D_PAR}" fill="none" stroke="#f59e0b" stroke-width="3"/><text x="${RX(1300)}" y="${190 - 140 - 6}" text-anchor="middle" font-size="9" font-weight="800" fill="#fcd34d">par (fuerza)</text>
    <path d="${D_CE}" fill="none" stroke="#f472b6" stroke-width="2.5" stroke-dasharray="5 4"/><text x="60" y="${190 - ceDe(650) * 140 - 6}" font-size="9" font-weight="800" fill="#f9a8d4">consumo específico</text>
    <line id="cv-cursor" x1="0" y1="38" x2="0" y2="190" stroke="#fff" stroke-width="1.5" stroke-dasharray="3 3"/>
    <circle id="cv-ppar" r="5" fill="#f59e0b"/><circle id="cv-ppot" r="5" fill="#38bdf8"/><circle id="cv-pce" r="4" fill="#f472b6"/>
    <rect x="44" y="222" width="232" height="0" fill="none"/>
    <text id="cv-msg" x="160" y="34" text-anchor="middle" font-size="9.5" fill="#e2e8f0"></text>`,
  piezas: `
    <rect x="0" y="0" width="320" height="230" rx="14" fill="#0b1220"/>
    <image href="ilustraciones/motor-piezas.png" x="20" y="26" width="135.0" height="189.8"/>
    <text x="160" y="17" text-anchor="middle" font-size="11" font-weight="900" fill="#fff">EL MOTOR DESARMADO, DE ABAJO HACIA ARRIBA</text>
    <g id="pz0"><line x1="135.0" y1="190.2" x2="172" y2="190.2" stroke="#22d3ee" stroke-width="1.2" stroke-dasharray="3 2"/><circle cx="135.0" cy="190.2" r="3.5" fill="#22d3ee"/><text x="176" y="189.2" font-size="9" font-weight="900" fill="#fff">1 · CÁRTER</text><text x="176" y="198.7" font-size="7" fill="#cbd5e1">la bandeja de abajo: guarda el aceite</text></g><g id="pz1"><line x1="138.6" y1="135.5" x2="172" y2="135.5" stroke="#22d3ee" stroke-width="1.2" stroke-dasharray="3 2"/><circle cx="138.6" cy="135.5" r="3.5" fill="#22d3ee"/><text x="176" y="134.5" font-size="9" font-weight="900" fill="#fff">2 · BLOQUE</text><text x="176" y="144.0" font-size="7" fill="#cbd5e1">la parte grande: cilindros y pistones</text></g><g id="pzj"><line x1="133.1" y1="97.9" x2="172" y2="97.9" stroke="#22d3ee" stroke-width="1.2" stroke-dasharray="3 2"/><circle cx="133.1" cy="97.9" r="3.5" fill="#22d3ee"/><text x="176" y="96.9" font-size="9" font-weight="900" fill="#fff">JUNTA DE CULATA</text><text x="176" y="106.4" font-size="7" fill="#cbd5e1">el burlete: que no se escape nada</text></g><g id="pz2"><line x1="136.8" y1="71.6" x2="172" y2="71.6" stroke="#22d3ee" stroke-width="1.2" stroke-dasharray="3 2"/><circle cx="136.8" cy="71.6" r="3.5" fill="#22d3ee"/><text x="176" y="70.6" font-size="9" font-weight="900" fill="#fff">3 · CULATA</text><text x="176" y="80.1" font-size="7" fill="#cbd5e1">tapa los cilindros; tiene las válvulas</text></g><g id="pz3"><line x1="151.4" y1="42.4" x2="172" y2="42.4" stroke="#22d3ee" stroke-width="1.2" stroke-dasharray="3 2"/><circle cx="151.4" cy="42.4" r="3.5" fill="#22d3ee"/><text x="176" y="41.4" font-size="9" font-weight="900" fill="#fff">4 · TAPA DE BALANCINES</text><text x="176" y="50.9" font-size="7" fill="#cbd5e1">arriba de todo: acá se echa el aceite</text></g>`,
  cilindrada: `
    <rect x="0" y="0" width="320" height="230" rx="14" fill="#0b1220"/>
    <defs><clipPath id="clc0"><circle cx="83.2" cy="82.8" r="18.5"/><rect x="66.8" y="82.8" width="32.8" height="41.9"/></clipPath><clipPath id="clc1"><circle cx="138.6" cy="82.8" r="18.5"/><rect x="122.2" y="82.8" width="32.8" height="41.9"/></clipPath><clipPath id="clc2"><circle cx="192.9" cy="82.8" r="18.5"/><rect x="176.5" y="82.8" width="32.8" height="41.9"/></clipPath><clipPath id="clc3"><circle cx="247.6" cy="82.8" r="18.5"/><rect x="231.2" y="82.8" width="32.8" height="41.9"/></clipPath></defs>
    <image href="ilustraciones/cilindros.png" x="10" y="24" width="300.0" height="180.8"/>
    <text x="160" y="17" text-anchor="middle" font-size="11" font-weight="900" fill="#fff">CILINDRADA: CUÁNTO ENTRA EN LOS CILINDROS</text>
    <rect id="cl0" x="64.7" y="124.7" width="37.0" height="0" fill="#38bdf8" opacity="0.7" clip-path="url(#clc0)"/><text id="cll0" x="83.2" y="106.8" text-anchor="middle" font-size="10" font-weight="900" fill="#fff" opacity="0">3 L</text><rect x="63.2" y="53.1" width="40" height="11" rx="5" fill="#0b1220" opacity="0.85"/><text x="83.2" y="61.1" text-anchor="middle" font-size="7.5" font-weight="800" fill="#e2e8f0">cilindro 1</text><rect id="cl1" x="120.1" y="124.7" width="37.0" height="0" fill="#38bdf8" opacity="0.7" clip-path="url(#clc1)"/><text id="cll1" x="138.6" y="106.8" text-anchor="middle" font-size="10" font-weight="900" fill="#fff" opacity="0">3 L</text><rect x="118.6" y="53.1" width="40" height="11" rx="5" fill="#0b1220" opacity="0.85"/><text x="138.6" y="61.1" text-anchor="middle" font-size="7.5" font-weight="800" fill="#e2e8f0">cilindro 2</text><rect id="cl2" x="174.4" y="124.7" width="37.0" height="0" fill="#38bdf8" opacity="0.7" clip-path="url(#clc2)"/><text id="cll2" x="192.9" y="106.8" text-anchor="middle" font-size="10" font-weight="900" fill="#fff" opacity="0">3 L</text><rect x="172.9" y="53.1" width="40" height="11" rx="5" fill="#0b1220" opacity="0.85"/><text x="192.9" y="61.1" text-anchor="middle" font-size="7.5" font-weight="800" fill="#e2e8f0">cilindro 3</text><rect id="cl3" x="229.1" y="124.7" width="37.0" height="0" fill="#38bdf8" opacity="0.7" clip-path="url(#clc3)"/><text id="cll3" x="247.6" y="106.8" text-anchor="middle" font-size="10" font-weight="900" fill="#fff" opacity="0">3 L</text><rect x="227.6" y="53.1" width="40" height="11" rx="5" fill="#0b1220" opacity="0.85"/><text x="247.6" y="61.1" text-anchor="middle" font-size="7.5" font-weight="800" fill="#e2e8f0">cilindro 4</text>
    <text id="cl-msg" x="160" y="214" text-anchor="middle" font-size="11" font-weight="800" fill="#7dd3fc"></text>
    <text x="160" y="226" text-anchor="middle" font-size="8" fill="#94a3b8">lo que entra en un cilindro × cuántos cilindros hay</text>`,
  inyeccion: `
    <rect x="0" y="0" width="320" height="230" rx="14" fill="#0b1220"/>
    <text x="160" y="18" text-anchor="middle" font-size="12" font-weight="900" fill="#fff">EL CAMINO DEL GASOIL</text>
    <path id="iy-p" d="M35 108 L95 108 L160 108 L195 108 L195 40 L246 40" fill="none" stroke="#334155" stroke-width="6" stroke-linejoin="round"/>
    <g id="iy0"><rect x="10" y="88" width="50" height="40" rx="8" fill="#1e293b" stroke="#475569" stroke-width="2"/><text x="35" y="112" text-anchor="middle" font-size="9" font-weight="800" fill="#e2e8f0">TANQUE</text></g>
    <g id="iy1"><rect x="68" y="92" width="56" height="32" rx="8" fill="#1e293b" stroke="#475569" stroke-width="2"/><text x="96" y="105" text-anchor="middle" font-size="7" font-weight="800" fill="#e2e8f0">BOMBA DE</text><text x="96" y="115" text-anchor="middle" font-size="7" font-weight="800" fill="#e2e8f0">ALIMENTACIÓN</text></g>
    <g id="iy2"><rect x="132" y="92" width="56" height="32" rx="8" fill="#1e293b" stroke="#475569" stroke-width="2"/><text x="160" y="105" text-anchor="middle" font-size="7" font-weight="800" fill="#e2e8f0">BOMBA DE</text><text x="160" y="115" text-anchor="middle" font-size="7" font-weight="800" fill="#e2e8f0">INYECCIÓN</text></g>
    <rect x="222" y="48" width="56" height="96" rx="4" fill="none" stroke="#94a3b8" stroke-width="3"/>
    <rect id="iy-aire" x="225" y="51" width="50" height="50" fill="#fb923c" opacity="0.35"/>
    <text x="250" y="80" text-anchor="middle" font-size="7" font-weight="800" fill="#fed7aa">aire muy</text><text x="250" y="89" text-anchor="middle" font-size="7" font-weight="800" fill="#fed7aa">caliente</text>
    <path id="iy-spray" d="M250 56 L236 92 L264 92 Z" fill="#fde68a" opacity="0"/>
    <circle id="iy-llama" cx="250" cy="76" r="24" fill="#f97316" opacity="0"/>
    <g id="iy-piston"><rect x="225" y="102" width="50" height="22" rx="3" fill="#cbd5e1"/><rect x="225" y="106" width="50" height="2" fill="#475569"/></g>
    <text x="284" y="118" font-size="7" fill="#94a3b8">pistón</text>
    <g id="iy3"><rect x="238" y="28" width="24" height="26" rx="4" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/><text x="250" y="24" text-anchor="middle" font-size="7.5" font-weight="800" fill="#fcd34d">INYECTOR</text></g>
    <text x="250" y="156" text-anchor="middle" font-size="7.5" fill="#94a3b8">CILINDRO</text>
    <rect x="10" y="164" width="300" height="58" rx="10" fill="#0f172a" stroke="#22d3ee" stroke-opacity="0.35"/>
    <text id="iy-nom" x="160" y="182" text-anchor="middle" font-size="10.5" font-weight="900" fill="#67e8f9"></text>
    <text id="iy-d1" x="160" y="199" text-anchor="middle" font-size="8.4" fill="#e2e8f0"></text>
    <text id="iy-d2" x="160" y="213" text-anchor="middle" font-size="8.4" fill="#e2e8f0"></text>`,
  lubricacion: `
    <rect x="0" y="0" width="320" height="230" rx="14" fill="#0b1220"/>
    <text x="160" y="20" text-anchor="middle" font-size="12" font-weight="900" fill="#fff">EL ACEITE RECORRE EL MOTOR</text>
    <path d="M40 180 L250 180 L240 206 L50 206 Z" fill="#475569"/><path d="M52 192 L238 192 L234 204 L56 204Z" fill="#facc15" opacity="0.85"/><text x="145" y="218" text-anchor="middle" font-size="9" font-weight="800" fill="#fde68a">CÁRTER (acá se guarda)</text>
    <path id="lb-p" d="M90 196 L90 150 L150 150 L150 90 L230 90 L230 60 M150 90 L80 90 L80 60" fill="none" stroke="#334155" stroke-width="5"/>
    <path id="lb-a" d="M90 196 L90 150 L150 150 L150 90 L230 90 L230 60" fill="none" stroke="none"/>
    <path id="lb-b" d="M90 196 L90 150 L150 150 L150 90 L80 90 L80 60" fill="none" stroke="none"/>
    <rect x="72" y="150" width="36" height="24" rx="6" fill="#0e7490"/><text x="90" y="166" text-anchor="middle" font-size="7.5" font-weight="800" fill="#fff">BOMBA</text>
    <rect x="132" y="112" width="36" height="24" rx="6" fill="#7c3aed"/><text x="150" y="128" text-anchor="middle" font-size="7.5" font-weight="800" fill="#fff">FILTRO</text>
    <rect x="200" y="34" width="60" height="24" rx="6" fill="#1e293b" stroke="#475569"/><text x="230" y="50" text-anchor="middle" font-size="8" fill="#e2e8f0">cigüeñal</text>
    <rect x="50" y="34" width="60" height="24" rx="6" fill="#1e293b" stroke="#475569"/><text x="80" y="50" text-anchor="middle" font-size="8" fill="#e2e8f0">pistones</text>
    <circle cx="270" cy="130" r="26" fill="#0f172a" stroke="#475569" stroke-width="2"/><line id="lb-aguja" x1="270" y1="130" x2="270" y2="110" stroke="#f97316" stroke-width="3" stroke-linecap="round"/><text x="270" y="168" text-anchor="middle" font-size="8" fill="#94a3b8">presión de aceite</text>`,
  refrigeracion: `
    <rect x="0" y="0" width="320" height="230" rx="14" fill="#0b1220"/>
    <text id="rf-tit" x="160" y="20" text-anchor="middle" font-size="12" font-weight="900" fill="#fff">MOTOR FRÍO: EL TERMOSTATO CERRADO</text>
    <text id="rf-desc" x="160" y="36" text-anchor="middle" font-size="9" fill="#cbd5e1"></text>
    <rect x="30" y="70" width="100" height="100" rx="12" fill="#475569"/><text x="80" y="124" text-anchor="middle" font-size="10" font-weight="900" fill="#fff">MOTOR</text>
    <rect x="210" y="60" width="80" height="120" rx="6" fill="#334155"/>${[0, 1, 2, 3, 4, 5, 6].map(i => `<line x1="${218 + i * 10}" y1="66" x2="${218 + i * 10}" y2="174" stroke="#64748b" stroke-width="2"/>`).join('')}<text x="250" y="196" text-anchor="middle" font-size="9" font-weight="800" fill="#e2e8f0">RADIADOR</text>
    <g id="rf-vent" transform="translate(250 120)">${[0, 1, 2, 3].map(i => `<ellipse cx="0" cy="-16" rx="6" ry="16" fill="#94a3b8" transform="rotate(${i * 90})"/>`).join('')}<circle r="5" fill="#0f172a"/></g>
    <path id="rf-chico" d="M130 90 L160 90 L160 150 L130 150" fill="none" stroke="#334155" stroke-width="5"/>
    <path id="rf-grande" d="M130 90 L210 90 M290 150 L300 150 L300 200 L110 200 L110 170" fill="none" stroke="#334155" stroke-width="5"/>
    <path id="rf-a" d="M130 90 L160 90 L160 150 L130 150" fill="none" stroke="none"/>
    <path id="rf-b" d="M130 90 L210 90 L210 150 L290 150 L300 150 L300 200 L110 200 L110 170" fill="none" stroke="none"/>
    <rect id="rf-termo" x="154" y="82" width="14" height="16" rx="3" fill="#ef4444"/><text x="161" y="76" text-anchor="middle" font-size="7.5" fill="#fca5a5">termostato</text>
    <rect x="30" y="182" width="70" height="8" rx="4" fill="#1e293b"/><rect id="rf-temp" x="30" y="182" width="10" height="8" rx="4" fill="#38bdf8"/><text x="65" y="178" text-anchor="middle" font-size="7.5" fill="#94a3b8">temperatura</text>`,
  electricidad: `
    <rect x="0" y="0" width="320" height="230" rx="14" fill="#0b1220"/>
    <text id="el-tit" x="160" y="20" text-anchor="middle" font-size="12" font-weight="900" fill="#fff">ARRANCAR: LA BATERÍA MUEVE EL ARRANQUE</text>
    <rect x="120" y="70" width="80" height="56" rx="6" fill="#111827" stroke="#334155"/><rect x="132" y="62" width="12" height="8" fill="#ef4444"/><rect x="176" y="62" width="12" height="8" fill="#1f2937"/>
    <rect x="128" y="112" width="64" height="8" rx="4" fill="#1e293b"/><rect id="el-carga" x="128" y="112" width="40" height="8" rx="4" fill="#22c55e"/><text x="160" y="96" text-anchor="middle" font-size="10" font-weight="900" fill="#fff">BATERÍA</text>
    <g id="el-alt" transform="translate(52 98)"><circle r="26" fill="#0e7490"/>${[0, 1, 2, 3, 4, 5].map(i => `<rect x="-2" y="-24" width="4" height="12" fill="#a5f3fc" transform="rotate(${i * 60})"/>`).join('')}</g><text x="52" y="140" text-anchor="middle" font-size="9" font-weight="800" fill="#e2e8f0">ALTERNADOR</text><text x="52" y="151" text-anchor="middle" font-size="8" fill="#94a3b8">hace la electricidad</text>
    <g id="el-corona" transform="translate(262 170)"><circle r="34" fill="#64748b"/>${Array.from({ length: 18 }, (_, i) => `<rect x="-3" y="-38" width="6" height="7" fill="#94a3b8" transform="rotate(${i * 20})"/>`).join('')}<circle r="10" fill="#334155"/></g><text x="262" y="222" text-anchor="middle" font-size="8" fill="#94a3b8">corona del volante</text>
    <rect x="236" y="78" width="40" height="30" rx="6" fill="#7c3aed"/><text x="256" y="72" text-anchor="middle" font-size="8.5" font-weight="800" fill="#e2e8f0">MOTOR DE ARRANQUE</text>
    <rect id="el-pinon" x="252" y="108" width="8" height="18" fill="#f59e0b"/>
    <path id="el-p1" d="M200 98 L236 93" fill="none" stroke="#334155" stroke-width="4"/>
    <path id="el-p2" d="M78 98 L120 98" fill="none" stroke="#334155" stroke-width="4"/>
    <text id="el-msg" x="160" y="186" text-anchor="middle" font-size="9.5" fill="#cbd5e1"></text>`,
  varilla: `
    <rect x="0" y="0" width="320" height="230" rx="14" fill="#0b1220"/>
    <text x="160" y="20" text-anchor="middle" font-size="12" font-weight="900" fill="#fff">MEDIR EL ACEITE CON LA VARILLA</text>
    <text x="160" y="36" text-anchor="middle" font-size="9" fill="#cbd5e1">motor parado y frío · camión en llano</text>
    <path d="M60 150 L200 150 L190 196 L70 196 Z" fill="#475569"/><path d="M68 170 L192 170 L188 194 L72 194Z" fill="#facc15" opacity="0.85"/><text x="130" y="212" text-anchor="middle" font-size="9" font-weight="800" fill="#fde68a">CÁRTER</text>
    <g id="vr"><circle cx="150" cy="44" r="8" fill="none" stroke="#ef4444" stroke-width="3"/><rect x="148" y="52" width="4" height="140" fill="#cbd5e1"/><rect id="vr-aceite" x="148" y="170" width="4" height="22" fill="#facc15"/><line x1="144" y1="172" x2="156" y2="172" stroke="#22c55e" stroke-width="2"/><line x1="144" y1="184" x2="156" y2="184" stroke="#ef4444" stroke-width="2"/></g>
    <g id="vr-zoom" opacity="0"><rect x="214" y="60" width="90" height="120" rx="10" fill="#1e293b"/><rect x="255" y="70" width="8" height="100" fill="#cbd5e1"/><rect x="255" y="112" width="8" height="58" fill="#facc15"/><line x1="245" y1="100" x2="273" y2="100" stroke="#22c55e" stroke-width="3"/><text x="232" y="103" text-anchor="end" font-size="8" fill="#86efac">MÁX</text><line x1="245" y1="140" x2="273" y2="140" stroke="#ef4444" stroke-width="3"/><text x="232" y="143" text-anchor="end" font-size="8" fill="#fca5a5">MÍN</text><text x="259" y="190" text-anchor="middle" font-size="8.5" font-weight="800" fill="#86efac">entre las dos: bien</text></g>`,
  cadena: `
    <rect x="0" y="0" width="320" height="230" rx="14" fill="#0b1220"/>
    <text x="160" y="24" text-anchor="middle" font-size="13" font-weight="900" fill="#fff">EL GIRO VA DEL MOTOR A LAS RUEDAS</text>
    <path d="M40 64 L280 64 L280 100 L200 140 L40 140" fill="none" stroke="#334155" stroke-width="5" stroke-linejoin="round"/>
    <circle id="k-luz" r="9" fill="#22d3ee" opacity="0.9"/>
    ${CADENA.map(([n, x, y], i) => `<g id="k${i}"><rect x="${x - 35}" y="${y - 14}" width="70" height="28" rx="8" fill="#1e293b" stroke="#475569" stroke-width="2"/><text x="${x}" y="${y + 3.5}" text-anchor="middle" font-size="${n.length > 8 ? 7.5 : n.length > 5 ? 8.5 : 10}" font-weight="800" fill="#e2e8f0">${n}</text><text x="${x}" y="${y - 18}" text-anchor="middle" font-size="7" fill="#64748b">${i + 1}</text></g>`).join('')}
    <rect x="14" y="166" width="292" height="52" rx="10" fill="#0f172a" stroke="#22d3ee" stroke-opacity="0.35"/>
    <text id="k-nom" x="160" y="186" text-anchor="middle" font-size="11" font-weight="900" fill="#67e8f9"></text>
    <text id="k-desc" x="160" y="204" text-anchor="middle" font-size="8.6" fill="#e2e8f0"></text>`,
  motor4t: `
    <rect x="0" y="0" width="320" height="230" rx="14" fill="#0b1220"/>
    <text id="m-fase" x="160" y="22" text-anchor="middle" font-size="16" font-weight="900" fill="#fff">ADMISIÓN</text>
    <text id="m-desc" x="160" y="40" text-anchor="middle" font-size="11" fill="#cbd5e1">entra aire</text>
    <rect x="98" y="52" width="124" height="20" rx="4" fill="#64748b"/>
    <rect id="m-gas" x="104" y="72" width="112" height="40" fill="#38bdf8" opacity="0.6"/>
    <rect x="96" y="72" width="8" height="110" fill="#94a3b8"/><rect x="216" y="72" width="8" height="110" fill="#94a3b8"/>
    <g id="m-valv-adm"><line x1="125" y1="44" x2="125" y2="72" stroke="#cbd5e1" stroke-width="4"/><rect x="113" y="70" width="24" height="5" rx="2" fill="#38bdf8"/></g>
    <g id="m-valv-esc"><line x1="195" y1="44" x2="195" y2="72" stroke="#cbd5e1" stroke-width="4"/><rect x="183" y="70" width="24" height="5" rx="2" fill="#94a3b8"/></g>
    <rect x="154" y="40" width="12" height="34" rx="3" fill="#f59e0b"/>
    <path id="m-spray" d="M160 74 L148 98 L172 98 Z" fill="#fde68a" opacity="0"/>
    <circle id="m-llama" cx="160" cy="92" r="28" fill="#f97316" opacity="0"/>
    <text x="104" y="64" font-size="8" fill="#e2e8f0">admisión</text><text x="186" y="64" font-size="8" fill="#e2e8f0">escape</text>
    <g id="m-piston"><rect x="105" y="0" width="110" height="34" rx="4" fill="#cbd5e1"/><rect x="105" y="5" width="110" height="3" fill="#475569"/><rect x="105" y="11" width="110" height="3" fill="#475569"/></g>
    <line id="m-biela" x1="160" y1="0" x2="160" y2="0" stroke="#e2e8f0" stroke-width="9" stroke-linecap="round"/>
    <circle cx="160" cy="196" r="26" fill="#334155"/>
    <circle id="m-codo" cx="160" cy="174" r="7" fill="#f59e0b"/>
    <text x="232" y="110" font-size="9" fill="#94a3b8">pistón</text><text x="232" y="160" font-size="9" fill="#94a3b8">biela</text><text x="232" y="204" font-size="9" fill="#94a3b8">cigüeñal</text>
    <g id="m-puntos"><circle cx="20" cy="212" r="4" fill="#38bdf8"/></g>`,
  turbo: `
    <rect x="0" y="0" width="320" height="230" rx="14" fill="#0b1220"/>
    <text x="160" y="22" text-anchor="middle" font-size="15" font-weight="900" fill="#fff">EL TURBO</text>
    <rect x="18" y="104" width="70" height="22" rx="6" fill="#38bdf8" opacity="0.35"/><text x="46" y="98" text-anchor="middle" font-size="9" fill="#7dd3fc">aire de afuera</text>
    <g id="t-comp" transform="translate(110 115)"><circle r="34" fill="#1e3a8a"/>${[0, 1, 2, 3, 4, 5].map(i => `<path d="M0 0 L30 -6 L30 6 Z" fill="#7dd3fc" transform="rotate(${i * 60})"/>`).join('')}<circle r="6" fill="#0f172a"/></g>
    <rect x="144" y="111" width="32" height="8" fill="#cbd5e1"/>
    <g id="t-turb" transform="translate(210 115)"><circle r="34" fill="#44403c"/>${[0, 1, 2, 3, 4, 5].map(i => `<path d="M0 0 L30 -6 L30 6 Z" fill="#a8a29e" transform="rotate(${i * 60})"/>`).join('')}<circle r="6" fill="#0f172a"/></g>
    <rect x="232" y="104" width="70" height="22" rx="6" fill="#78716c" opacity="0.45"/><text x="276" y="98" text-anchor="middle" font-size="9" fill="#d6d3d1">humo del escape</text>
    <path d="M110 160 L110 196 L40 196" fill="none" stroke="#38bdf8" stroke-width="5" stroke-dasharray="8 8" id="t-aire"/>
    <text x="40" y="214" font-size="10" fill="#7dd3fc">→ al motor: le mete MÁS aire (más fuerza)</text>
    <text x="210" y="168" text-anchor="middle" font-size="10" fill="#d6d3d1">el humo hace girar este molinito</text>
    <text x="160" y="58" text-anchor="middle" font-size="10" fill="#cbd5e1">dos molinitos pegados: si gira uno, gira el otro</text>`,
  embrague: `
    <rect x="0" y="0" width="320" height="230" rx="14" fill="#0b1220"/>
    <text id="e-tit" x="160" y="22" text-anchor="middle" font-size="14" font-weight="900" fill="#fff">PEDAL SUELTO</text>
    <text id="e-desc" x="160" y="40" text-anchor="middle" font-size="10.5" fill="#cbd5e1">el disco se aprieta: el motor mueve la caja</text>
    <text x="80" y="210" text-anchor="middle" font-size="10" fill="#94a3b8">volante del motor</text>
    <g id="e-vol" transform="translate(80 125)"><circle r="62" fill="#64748b" stroke="#334155" stroke-width="5"/>${[0, 1, 2, 3, 4, 5].map(i => `<circle cx="38" cy="0" r="6" fill="#334155" transform="rotate(${i * 60})"/>`).join('')}<rect x="-3" y="-60" width="6" height="22" fill="#f59e0b"/></g>
    <g id="e-disco"><g id="e-disco-g" transform="translate(0 125)"><circle r="50" fill="#78350f" stroke="#a16207" stroke-width="6"/>${[0, 1, 2, 3].map(i => `<rect x="-3" y="-46" width="6" height="18" fill="#fde68a" transform="rotate(${i * 90})"/>`).join('')}</g></g>
    <rect id="e-eje" x="0" y="121" width="80" height="8" fill="#cbd5e1"/>
    <text id="e-caja" x="270" y="210" text-anchor="middle" font-size="10" fill="#94a3b8">hacia la caja</text>`,
  caja: `
    <rect x="0" y="0" width="320" height="230" rx="14" fill="#0b1220"/>
    <text id="c-tit" x="160" y="22" text-anchor="middle" font-size="14" font-weight="900" fill="#fff">PRIMERA (marcha corta)</text>
    <text id="c-desc" x="160" y="40" text-anchor="middle" font-size="10.5" fill="#cbd5e1">el chico mueve al grande: menos vueltas, MÁS FUERZA</text>
    <g id="c-a" transform="translate(105 128)">${engranaje(0, 0, 34, 10, '#f59e0b')}</g>
    <g id="c-b" transform="translate(203 128)">${engranaje(0, 0, 60, 18, '#38bdf8')}</g>
    <text id="c-la" x="105" y="210" text-anchor="middle" font-size="10" fill="#fde68a">viene del motor</text>
    <text id="c-lb" x="203" y="210" text-anchor="middle" font-size="10" fill="#bae6fd">va a las ruedas</text>`,
  diferencial: `
    <rect x="0" y="0" width="320" height="230" rx="14" fill="#0b1220"/>
    <text x="160" y="22" text-anchor="middle" font-size="14" font-weight="900" fill="#fff">EN LA CURVA (visto desde arriba)</text>
    <path d="M40 210 A170 170 0 0 1 210 40" fill="none" stroke="#475569" stroke-width="3" stroke-dasharray="6 6"/>
    <path d="M90 210 A120 120 0 0 1 210 90" fill="none" stroke="#475569" stroke-width="3" stroke-dasharray="6 6"/>
    <g id="d-eje"><line id="d-linea" x1="0" y1="0" x2="0" y2="0" stroke="#cbd5e1" stroke-width="5"/><circle id="d-caja" r="9" fill="#f59e0b"/><rect id="d-ra" width="22" height="12" rx="3" fill="#22c55e"/><rect id="d-ri" width="22" height="12" rx="3" fill="#38bdf8"/></g>
    <text x="236" y="150" font-size="10" fill="#86efac">afuera:</text><text id="d-na" x="236" y="164" font-size="12" font-weight="800" fill="#86efac">0 vueltas</text>
    <text x="236" y="186" font-size="10" fill="#7dd3fc">adentro:</text><text id="d-ni" x="236" y="200" font-size="12" font-weight="800" fill="#7dd3fc">0 vueltas</text>`
};

export function montarAnim(contenedor, nombre, opts = {}) {
  const pausado = opts.pausado || (() => false);
  contenedor.innerHTML = `<svg viewBox="0 0 320 230" xmlns="${NS}" style="width:100%;height:auto;display:block">${DIBUJOS[nombre] || ''}</svg>`;
  const q = id => contenedor.querySelector('#' + id);
  let t = 0, ultimo = performance.now(), vivo = true;
  function cuadro(ahora) {
    if (!vivo) return;
    const dt = pausado() ? 0 : Math.max(0, Math.min(0.05, (ahora - ultimo) / 1000)); ultimo = ahora; t += dt;
    if (nombre === 'motor4t') motor(t); else if (nombre === 'turbo') turbo(t);
    else if (nombre === 'embrague') embrague(t); else if (nombre === 'caja') caja(t);
    else if (nombre === 'diferencial') dif(t); else if (nombre === 'cadena') cadena(t);
    else if (ANIMS[nombre]) ANIMS[nombre](t);
    requestAnimationFrame(cuadro);
  }
  const FASES = [
    ['1 · ADMISIÓN', 'el pistón baja y entra SOLO AIRE', '#38bdf8'],
    ['2 · COMPRESIÓN', 'el pistón sube y aprieta el aire: se calienta muchísimo', '#fb923c'],
    ['3 · COMBUSTIÓN', 'se inyecta gasoil, se quema solo y empuja el pistón', '#ef4444'],
    ['4 · ESCAPE', 'el pistón sube y saca los gases quemados', '#94a3b8']
  ];
  function motor(t) {
    const ciclo = (t / 14) % 1;          // 14 segundos por ciclo completo (dos vueltas): lento para verlo bien
    const th = ciclo * Math.PI * 4;      // ángulo del cigüeñal
    const fase = Math.floor(ciclo * 4);
    const r = 22, L = 60, cx = 160, cy = 196;
    const codoX = cx + r * Math.sin(th), codoY = cy - r * Math.cos(th);
    const pY = codoY - Math.sqrt(L * L - Math.pow(r * Math.sin(th), 2));  // perno del pistón
    const top = pY - 26;                 // arriba del pistón
    q('m-codo').setAttribute('cx', codoX.toFixed(1)); q('m-codo').setAttribute('cy', codoY.toFixed(1));
    q('m-biela').setAttribute('x1', 160); q('m-biela').setAttribute('y1', pY.toFixed(1));
    q('m-biela').setAttribute('x2', codoX.toFixed(1)); q('m-biela').setAttribute('y2', codoY.toFixed(1));
    q('m-piston').setAttribute('transform', `translate(0 ${top.toFixed(1)})`);
    const gas = q('m-gas'); gas.setAttribute('height', Math.max(4, top - 72).toFixed(1));
    const [nom, desc, col] = FASES[fase];
    q('m-fase').textContent = nom; q('m-desc').textContent = desc;
    const f = (ciclo * 4) % 1;
    gas.setAttribute('fill', col);
    gas.setAttribute('opacity', fase === 1 ? 0.35 + 0.5 * f : fase === 2 ? 0.85 - 0.5 * f : 0.6);
    q('m-valv-adm').setAttribute('transform', `translate(0 ${fase === 0 ? 8 * Math.sin(f * Math.PI) : 0})`);
    q('m-valv-esc').setAttribute('transform', `translate(0 ${fase === 3 ? 8 * Math.sin(f * Math.PI) : 0})`);
    q('m-spray').setAttribute('opacity', fase === 2 && f < 0.18 ? 0.9 : 0);
    q('m-llama').setAttribute('opacity', fase === 2 && f < 0.5 ? (0.75 * (1 - f / 0.5)).toFixed(2) : 0);
    q('m-llama').setAttribute('cy', (72 + (top - 72) / 2).toFixed(1));
    q('m-puntos').innerHTML = [0, 1, 2, 3].map(i => `<circle cx="${45 + i * 13}" cy="222" r="4" fill="${i === fase ? FASES[i][2] : '#334155'}"/>`).join('');
  }
  function turbo(t) {
    q('t-comp').setAttribute('transform', `translate(110 115) rotate(${(t * 120) % 360})`);
    q('t-turb').setAttribute('transform', `translate(210 115) rotate(${(-t * 120) % 360})`);
    q('t-aire').setAttribute('stroke-dashoffset', (-t * 30).toFixed(1));
  }
  function embrague(t) {
    const ciclo = (t / 10) % 1;
    const pisado = ciclo > 0.5;
    const f = pisado ? Math.min(1, (ciclo - 0.5) * 8) : Math.min(1, ciclo * 8);
    const sep = pisado ? 40 * f : 40 * (1 - f);  // separación del disco
    q('e-vol').setAttribute('transform', `translate(80 125) rotate(${(t * 90) % 360})`);
    const giraDisco = sep < 4;
    q('e-disco').setAttribute('transform', `translate(${150 + sep} 0)`);
    if (giraDisco) q('e-disco-g').setAttribute('transform', `translate(0 125) rotate(${(t * 90) % 360})`);
    q('e-eje').setAttribute('x', 150 + sep); q('e-eje').setAttribute('width', Math.max(0, 300 - (150 + sep)));
    q('e-tit').textContent = pisado ? 'PEDAL PISADO (desembragado)' : 'PEDAL SUELTO (embragado)';
    q('e-desc').textContent = pisado ? 'el disco se separa: el motor gira, la caja NO' : 'el disco se aprieta al volante: el motor mueve la caja';
  }
  function caja(t) {
    const ciclo = (t / 10) % 1;
    const primera = ciclo < 0.5;
    // en primera el chico (motor) mueve al grande (ruedas). En marcha larga se invierte.
    const vMotor = 90;
    const aMotor = (t * vMotor) % 360;
    if (primera) {
      q('c-a').setAttribute('transform', `translate(105 128) rotate(${aMotor})`);
      q('c-b').setAttribute('transform', `translate(203 128) rotate(${(-aMotor * 10 / 18) % 360})`);
      q('c-la').textContent = 'del motor (chico)'; q('c-lb').textContent = 'a las ruedas (grande)';
      q('c-tit').textContent = 'PRIMERA (marcha corta)'; q('c-desc').textContent = 'el chico mueve al grande: menos vueltas, MÁS FUERZA';
    } else {
      q('c-b').setAttribute('transform', `translate(203 128) rotate(${aMotor})`);
      q('c-a').setAttribute('transform', `translate(105 128) rotate(${(-aMotor * 18 / 10) % 360})`);
      q('c-la').textContent = 'a las ruedas (chico)'; q('c-lb').textContent = 'del motor (grande)';
      q('c-tit').textContent = 'MARCHA LARGA'; q('c-desc').textContent = 'el grande mueve al chico: MÁS VELOCIDAD, menos fuerza';
    }
  }
  function cadena(t) {
    const tramo = (t / 3.2) % CADENA.length;
    const i = Math.floor(tramo), f = tramo - i;
    const a = CADENA[i], b = CADENA[Math.min(i + 1, CADENA.length - 1)];
    q('k-luz').setAttribute('cx', a[1] + (b[1] - a[1]) * f); q('k-luz').setAttribute('cy', a[2] + (b[2] - a[2]) * f);
    q('k-nom').textContent = (i + 1) + ' · ' + CADENA_INFO[i][0]; q('k-desc').textContent = CADENA_INFO[i][1];
    CADENA.forEach((_, k) => { const r = q('k' + k).querySelector('rect'); r.setAttribute('stroke', k === i ? '#22d3ee' : '#475569'); r.setAttribute('fill', k === i ? '#0e7490' : '#1e293b'); });
  }
  // ---- animaciones nuevas ----
  const ANIMS = {};
  ANIMS.curvas = t => {
    const ciclo = (t / 16) % 1;
    const rpm = 600 + 2400 * (ciclo < 0.5 ? ciclo * 2 : (1 - ciclo) * 2);
    const x = RX(rpm);
    q('cv-cursor').setAttribute('x1', x); q('cv-cursor').setAttribute('x2', x);
    [['cv-ppar', parDe], ['cv-ppot', potDe], ['cv-pce', ceDe]].forEach(([id, fn]) => { q(id).setAttribute('cx', x); q(id).setAttribute('cy', 190 - fn(rpm) * 140); });
    let msg = Math.round(rpm / 10) * 10 + ' vueltas: ';
    if (rpm < 900) msg += 'cerca del ralentí, par mínimo';
    else if (rpm <= 1700) msg += 'zona verde: par alto y consumo mínimo';
    else if (rpm < 2300) msg += 'el par baja, el consumo sube';
    else msg += 'cerca de la potencia máxima: gasta muchísimo';
    q('cv-msg').textContent = msg;
  };
  ANIMS.piezas = t => {
    const orden = ['pz0', 'pz1', 'pzj', 'pz2', 'pz3'];
    const act = Math.floor((t / 3) % 5), f = (t / 3) % 1;
    orden.forEach((id, i) => { const on = i === act; q(id).style.opacity = on ? (0.75 + 0.25 * Math.sin(f * Math.PI)).toFixed(2) : 0.3; });
  };
  ANIMS.cilindrada = t => {
    const ciclo = (t / 10) % 1;
    let llenos = 0;
    for (let i = 0; i < 4; i++) {
      const f = Math.max(0, Math.min(1, (ciclo - 0.05 - i * 0.18) / 0.15));
      if (f >= 1) llenos++;
      q('cl' + i).setAttribute('height', (59.6 * f).toFixed(1)); q('cl' + i).setAttribute('y', (124.7 - 59.6 * f).toFixed(1));
      q('cll' + i).setAttribute('opacity', f >= 1 ? 1 : 0);
    }
    q('cl-msg').textContent = llenos === 0 ? 'cada cilindro se llena de aire: entran 3 litros' : llenos < 4 ? `${llenos} cilindro${llenos > 1 ? 's' : ''}: ${llenos * 3} litros` : '4 cilindros × 3 litros = 12 litros de cilindrada';
  };
  let fIy = null;
  const IY = [
    ['1 · EL TANQUE', 'Acá se guarda el gasoil.', 'Es el depósito que llenás en la estación de servicio.'],
    ['2 · BOMBA DE ALIMENTACIÓN', 'Chupa el gasoil del tanque', 'y lo empuja hacia la bomba de inyección.'],
    ['3 · BOMBA DE INYECCIÓN', 'Le da muchísima fuerza (presión) y decide cuánto mandar.', 'Si el motor se pasa de vueltas, corta el gasoil (corte de inyección).'],
    ['4 · EL INYECTOR', 'Es una boquilla, como la de un perfume, arriba del cilindro.', 'Tira el gasoil en gotitas finitas (pulverizado), como un spray.'],
    ['5 · ¿DÓNDE Y PARA QUÉ LO TIRA?', 'Adentro del cilindro, arriba del pistón, donde el aire está apretado y calentísimo.', 'En gotitas se mezcla bien con el aire, se prende solo y empuja el pistón.']
  ];
  ANIMS.inyeccion = t => {
    if (!fIy) fIy = flujo(contenedor, 'iy-p', 9, '#fbbf24', 4);
    const paso = Math.floor((t / 4) % 5);
    fIy(t, 45);
    const f = (t / 2) % 1;
    const tira = paso >= 3 && f < 0.3;
    const prende = paso >= 3 && f > 0.25 && f < 0.6;
    q('iy-spray').setAttribute('opacity', tira ? 0.95 : 0);
    q('iy-llama').setAttribute('opacity', prende ? (0.85 * (1 - (f - 0.25) / 0.35)).toFixed(2) : 0);
    q('iy-piston').setAttribute('transform', `translate(0 ${prende ? (16 * (f - 0.25) / 0.35).toFixed(1) : f >= 0.6 ? (16 * (1 - (f - 0.6) / 0.4)).toFixed(1) : 0})`);
    [0, 1, 2, 3].forEach(k => { const r = q('iy' + k).querySelector('rect'); const on = k === paso || (paso === 4 && k === 3); r.setAttribute('stroke', on ? '#22d3ee' : (k === 3 ? '#f59e0b' : '#475569')); r.setAttribute('fill', on ? '#0e7490' : '#1e293b'); });
    q('iy-nom').textContent = IY[paso][0]; q('iy-d1').textContent = IY[paso][1]; q('iy-d2').textContent = IY[paso][2];
  };
  let fLa = null, fLb = null;
  ANIMS.lubricacion = t => {
    if (!fLa) { fLa = flujo(contenedor, 'lb-a', 8, '#facc15', 4); fLb = flujo(contenedor, 'lb-b', 8, '#facc15', 4); }
    fLa(t, 35); fLb(t + 1.3, 35);
    q('lb-aguja').setAttribute('transform', `rotate(${40 + Math.sin(t * 1.5) * 6} 270 130)`);
  };
  let fRa = null, fRb = null;
  ANIMS.refrigeracion = t => {
    if (!fRa) { fRa = flujo(contenedor, 'rf-a', 6, '#38bdf8', 4); fRb = flujo(contenedor, 'rf-b', 12, '#38bdf8', 4); }
    const ciclo = (t / 14) % 1;
    const caliente = ciclo > 0.45;
    const temp = Math.min(1, ciclo / 0.45);
    q('rf-temp').setAttribute('width', (10 + 60 * (caliente ? 1 : temp)).toFixed(1));
    q('rf-temp').setAttribute('fill', caliente ? '#f97316' : '#38bdf8');
    fRa(t, 40, !caliente); fRb(t, 55, caliente);
    q('rf-termo').setAttribute('fill', caliente ? '#22c55e' : '#ef4444');
    q('rf-tit').textContent = caliente ? 'MOTOR CALIENTE: EL TERMOSTATO SE ABRE' : 'MOTOR FRÍO: EL TERMOSTATO CERRADO';
    q('rf-desc').textContent = caliente ? 'el líquido pasa por el radiador y el ventilador lo enfría' : 'el líquido no va al radiador: así el motor se calienta rápido';
    q('rf-vent').setAttribute('transform', `translate(250 120) rotate(${caliente ? (t * 300) % 360 : 0})`);
  };
  let fE1 = null, fE2 = null;
  ANIMS.electricidad = t => {
    if (!fE1) { fE1 = flujo(contenedor, 'el-p1', 3, '#fde047', 3.5); fE2 = flujo(contenedor, 'el-p2', 3, '#fde047', 3.5); }
    const ciclo = (t / 12) % 1;
    const arranca = ciclo < 0.4;
    fE1(t, 40, arranca); fE2(t, 40, !arranca);
    q('el-pinon').setAttribute('y', arranca ? 126 : 108);
    q('el-corona').setAttribute('transform', `translate(262 170) rotate(${arranca ? (t * 120) % 360 : (t * 200) % 360})`);
    q('el-alt').setAttribute('transform', `translate(52 98) rotate(${arranca ? 0 : (t * 260) % 360})`);
    const carga = arranca ? 40 - 20 * (ciclo / 0.4) : Math.min(60, 20 + 40 * ((ciclo - 0.4) / 0.6));
    q('el-carga').setAttribute('width', carga.toFixed(1));
    q('el-tit').textContent = arranca ? 'ARRANCAR: LA BATERÍA MUEVE EL ARRANQUE' : 'ANDANDO: EL ALTERNADOR CARGA LA BATERÍA';
    q('el-msg').textContent = arranca ? 'el piñón del arranque engancha en la corona del volante y hace girar el motor' : 'la batería guarda la electricidad que hace el alternador';
  };
  ANIMS.varilla = t => {
    const ciclo = (t / 9) % 1;
    let sube = 0;
    if (ciclo < 0.3) sube = 0; else if (ciclo < 0.45) sube = (ciclo - 0.3) / 0.15; else if (ciclo < 0.85) sube = 1; else sube = 1 - (ciclo - 0.85) / 0.15;
    q('vr').setAttribute('transform', `translate(0 ${(-110 * sube).toFixed(1)})`);
    q('vr-zoom').setAttribute('opacity', ciclo > 0.45 && ciclo < 0.85 ? 1 : 0);
  };
  let vueltasA = 0, vueltasI = 0;
  function dif(t) {
    const ciclo = (t / 12) % 1;
    if (ciclo < 0.01) { vueltasA = 0; vueltasI = 0; }
    const ang = Math.PI / 2 * ciclo;        // de 0 a 90 grados por la curva
    const cx = 210, cy = 210;
    const ra = 170, ri = 120;
    const pa = [cx - ra * Math.cos(ang), cy - ra * Math.sin(ang)];
    const pi = [cx - ri * Math.cos(ang), cy - ri * Math.sin(ang)];
    q('d-linea').setAttribute('x1', pa[0]); q('d-linea').setAttribute('y1', pa[1]);
    q('d-linea').setAttribute('x2', pi[0]); q('d-linea').setAttribute('y2', pi[1]);
    q('d-caja').setAttribute('cx', (pa[0] + pi[0]) / 2); q('d-caja').setAttribute('cy', (pa[1] + pi[1]) / 2);
    const rot = (ang * 180 / Math.PI) + 90;
    q('d-ra').setAttribute('transform', `translate(${pa[0]} ${pa[1]}) rotate(${rot}) translate(-11 -6)`);
    q('d-ri').setAttribute('transform', `translate(${pi[0]} ${pi[1]}) rotate(${rot}) translate(-11 -6)`);
    vueltasA = ciclo * 30; vueltasI = ciclo * 30 * ri / ra;
    q('d-na').textContent = vueltasA.toFixed(1).replace('.', ',') + ' vueltas';
    q('d-ni').textContent = vueltasI.toFixed(1).replace('.', ',') + ' vueltas';
  }
  requestAnimationFrame(cuadro);
  return () => { vivo = false; };
}
