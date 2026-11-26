// ==========================================
// ANIMACIONES DEL TEMA MERCANCÍAS PELIGROSAS (ADR)
// Fotos de Gemini (ilustraciones/adr-*.webp) con rombos, paneles naranja y carteles dibujados encima.
// Misma forma de uso que las otras: montarAnim(div, nombre, { pausado })
// ==========================================

const NS = 'http://www.w3.org/2000/svg';
// Fotos que todavía no llegaron: mientras tanto se usa la cisterna
const PENDIENTES = { equipo: 'cisterna', accidente: 'cisterna' };
const IMG = n => `ilustraciones/adr-${PENDIENTES[n] || n}.webp`;
const S = 320 / 1376, Y0 = 22;            // fotos de 1376 x 768
const px = x => +(x * S).toFixed(1), py = y => +(Y0 + y * S).toFixed(1);
const foto = n => `<image href="${IMG(n)}" x="0" y="${Y0}" width="320" height="${(768 * S).toFixed(1)}"/>`;
const FONDO = t => `<rect width="320" height="260" rx="14" fill="#0b1220"/><text x="160" y="16" text-anchor="middle" font-size="11.5" font-weight="900" fill="#fff">${t}</text>`;
const CARTEL = `<rect x="8" y="206" width="304" height="48" rx="10" fill="#0f172a" stroke="#22d3ee" stroke-opacity="0.4"/>
  <text id="c1" x="160" y="224" text-anchor="middle" font-size="10.5" font-weight="900" fill="#67e8f9"></text>
  <text id="c2" x="160" y="241" text-anchor="middle" font-size="8.8" fill="#e2e8f0"></text>`;
const caja = (id, x, y, w, h, color = '#22d3ee') => `<rect id="${id}" x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="none" stroke="${color}" stroke-width="2.5" opacity="0"/>`;
const tag = (id, x, y, txt, color = '#22d3ee') => { const w = txt.length * 5.5 + 14; return `<g id="${id}" opacity="0.25"><rect x="${x - w / 2}" y="${y - 10}" width="${w}" height="18" rx="9" fill="#0b1220" stroke="${color}" stroke-width="1.5"/><text x="${x}" y="${y + 3}" text-anchor="middle" font-size="9.5" font-weight="900" fill="#fff">${txt}</text></g>`; };

// ---------- ROMBOS (etiquetas de peligro) ----------
const LLAMA = (c = '#000') => `<path d="M0 -13 C6 -6 7 -1 5 4 C8 2 8 -2 8 -2 C12 4 9 12 0 13 C-9 12 -11 4 -7 -2 C-6 2 -4 3 -3 3 C-6 -3 -3 -9 0 -13 Z" fill="${c}"/>`;
const SIMB = {
  explosion: c => `<polygon points="0,-13 3,-5 11,-8 6,-1 13,3 5,4 6,12 0,6 -6,12 -5,4 -13,3 -6,-1 -11,-8 -3,-5" fill="${c}"/>`,
  llama: LLAMA,
  botella: c => `<g fill="${c}" transform="rotate(-30)"><rect x="-4" y="-8" width="8" height="20" rx="3"/><rect x="-2" y="-13" width="4" height="6"/></g>`,
  calavera: c => `<text y="9" text-anchor="middle" font-size="26" fill="${c}">☠</text>`,
  oxido: c => `<g>${LLAMA(c)}<ellipse cx="0" cy="11" rx="10" ry="3" fill="none" stroke="${c}" stroke-width="2.4"/></g>`,
  bio: c => `<text y="9" text-anchor="middle" font-size="26" fill="${c}">☣</text>`,
  radio: c => `<text y="9" text-anchor="middle" font-size="26" fill="${c}">☢</text>`,
  corrosivo: c => `<g fill="${c}"><rect x="-11" y="-12" width="6" height="11" transform="rotate(-25 -8 -6)"/><rect x="4" y="-12" width="6" height="11" transform="rotate(25 7 -6)"/><circle cx="-6" cy="3" r="2"/><circle cx="6" cy="3" r="2"/><rect x="-12" y="8" width="24" height="4"/></g>`,
  rayas: c => `<g fill="${c}">${[-9, -5, -1, 3, 7].map(x => `<rect x="${x}" y="-14" width="2.4" height="14"/>`).join('')}</g>`
};
const CLASES = {
  '1': { a: '#f97316', b: '#f97316', s: 'explosion', sc: '#000', n: '1', t: 'explosivos' },
  '1.4': { a: '#f97316', b: '#f97316', s: null, sc: '#000', n: '1', t: 'explosivo 1.4', big: '1.4' },
  '2.1': { a: '#dc2626', b: '#dc2626', s: 'llama', sc: '#000', n: '2', t: 'gas inflamable' },
  '2.2': { a: '#16a34a', b: '#16a34a', s: 'botella', sc: '#000', n: '2', t: 'gas no inflamable' },
  '2.3': { a: '#fff', b: '#fff', s: 'calavera', sc: '#000', n: '2', t: 'gas tóxico' },
  '3': { a: '#dc2626', b: '#dc2626', s: 'llama', sc: '#000', n: '3', t: 'líquido inflamable' },
  '4.1': { a: 'url(#rayasRojas)', b: 'url(#rayasRojas)', s: 'llama', sc: '#000', n: '4', t: 'sólido inflamable' },
  '4.2': { a: '#fff', b: '#dc2626', s: 'llama', sc: '#000', n: '4', t: 'se prende solo' },
  '4.3': { a: '#2563eb', b: '#2563eb', s: 'llama', sc: '#000', n: '4', t: 'con agua, gas' },
  '5.1': { a: '#facc15', b: '#facc15', s: 'oxido', sc: '#000', n: '5.1', t: 'comburente' },
  '5.2': { a: '#dc2626', b: '#facc15', s: 'llama', sc: '#000', n: '5.2', t: 'peróxido' },
  '6.1': { a: '#fff', b: '#fff', s: 'calavera', sc: '#000', n: '6', t: 'tóxico' },
  '6.2': { a: '#fff', b: '#fff', s: 'bio', sc: '#000', n: '6', t: 'infeccioso' },
  '7': { a: '#facc15', b: '#fff', s: 'radio', sc: '#000', n: '7', t: 'radiactivo' },
  '8': { a: '#fff', b: '#111', s: 'corrosivo', sc: '#000', n: '8', t: 'corrosivo' },
  '9': { a: '#fff', b: '#fff', s: 'rayas', sc: '#000', n: '9', t: 'diversos' }
};
const DEFS = `<defs><pattern id="rayasRojas" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#fff"/><rect width="4" height="8" fill="#dc2626"/></pattern></defs>`;
function rombo(id, cx, cy, r, k, conTexto = true) {
  const c = CLASES[k], e = r / 20;
  return `<g id="${id}" transform="translate(${cx} ${cy})">
    <g transform="rotate(45)"><rect x="${-r * 0.71}" y="${-r * 0.71}" width="${r * 1.42}" height="${r * 1.42}" fill="${c.b}" stroke="#000" stroke-width="1"/>
      <path d="M${-r * 0.71} ${-r * 0.71} H${r * 0.71} L${-r * 0.71} ${r * 0.71} Z" fill="${c.a}"/>
      <rect x="${-r * 0.62}" y="${-r * 0.62}" width="${r * 1.24}" height="${r * 1.24}" fill="none" stroke="${k === '8' ? '#fff' : '#000'}" stroke-width="${0.8 * e}"/></g>
    ${c.s ? `<g transform="translate(0 ${-r * 0.32}) scale(${e * 0.95})">${SIMB[c.s](c.sc)}</g>` : `<text y="${-r * 0.12}" text-anchor="middle" font-size="${r * 0.55}" font-weight="900" fill="#000">${c.big}</text>`}
    <text y="${r * 0.72}" text-anchor="middle" font-size="${r * 0.36}" font-weight="900" fill="${k === '8' ? '#fff' : '#000'}">${c.n}</text>
    ${conTexto ? `<text y="${r + 12}" text-anchor="middle" font-size="8.5" font-weight="900" fill="#67e8f9">${c.t}</text>` : ''}</g>`;
}
// ---------- PANEL NARANJA ----------
function panel(id, x, y, w, arriba = '', abajo = '') {
  const h = w * 0.75, lw = Math.max(1.2, w / 40);
  return `<g id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w / 30}" fill="#f97316" stroke="#000" stroke-width="${lw * 1.6}"/>
    ${arriba || abajo ? `<line x1="${x}" y1="${y + h / 2}" x2="${x + w}" y2="${y + h / 2}" stroke="#000" stroke-width="${lw}"/>` : ''}
    <text id="${id}-a" x="${x + w / 2}" y="${y + h * 0.4}" text-anchor="middle" font-size="${h * 0.34}" font-weight="900" fill="#000">${arriba}</text>
    <text id="${id}-b" x="${x + w / 2}" y="${y + h * 0.88}" text-anchor="middle" font-size="${h * 0.34}" font-weight="900" fill="#000">${abajo}</text></g>`;
}
const V16 = (x, y) => `<g id="v16"><circle cx="${x}" cy="${y}" r="16" fill="#fbbf24" opacity="0.25"/><rect x="${x - 6}" y="${y - 4}" width="12" height="8" rx="3" fill="#f59e0b" stroke="#fff" stroke-width="1"/></g>`;
// Posiciones en la foto de la cisterna (panel de adelante y de atrás)
const PAN_DEL = [px(206), py(395), px(96)], PAN_TRAS = [px(1092), py(315), px(81)];

// ---------- QUÉ MUESTRA CADA PANTALLA ----------
// frases: [título, texto, ids que se prenden]
const A = {
  intro: { t: 'DAMIAN EMPIEZA A LLEVAR GASOIL', f: 'cisterna', x: caja('pd', ...PAN_DEL, 30) + caja('pt', ...PAN_TRAS, 30) + tag('tp', 160, 44, 'paneles naranja = mercancía peligrosa', '#f97316'),
    fr: [['ADR', 'Acuerdo europeo para llevar mercancías peligrosas por carretera.', []],
      ['SE CUMPLE SIEMPRE', 'En un viaje a Alemania y en uno dentro de España.', []],
      ['LOS PANELES NARANJA', 'Avisan que el camión lleva mercancía peligrosa.', ['pd', 'pt', 'tp']],
      ['ALTO RIESGO', 'Lo que sirve para un atentado: plan de protección.', []]] },
  exento: { t: '¿CUÁNDO NO SE APLICA EL ADR?', f: 'caja',
    fr: [['COMPRADO EN UNA TIENDA, PARA VOS', 'Un particular con cosas de uso personal: sin ADR.', []],
      ['EL GASOIL DEL DEPÓSITO', 'El que usa el camión para andar (menos de 1.500 l): sin ADR.', []],
      ['EMPRESA, PARA USO PROPIO', 'En envases de menos de 450 l (con otras condiciones): sin ADR.', []],
      ['RESIDUOS: SÍ ES ADR', 'La carta de porte dice "RESIDUO" delante del nombre.', []],
      ['SI SIGUE EN BARCO', 'Valen las normas del barco. Por mar, el código IMDG.', []]] },
  clases: { t: 'LAS 9 CLASES DE PELIGRO', f: null,
    x: ['1', '2.1', '3', '4.1', '5.1', '6.1', '7', '8', '9'].map((k, i) => rombo('r' + i, 60 + (i % 3) * 100, 46 + Math.floor(i / 3) * 56, 17, k)).join(''),
    fr: [['CADA PELIGRO TIENE SU ROMBO', 'Se llaman etiquetas de peligro: un dibujo y un número.', ['r0', 'r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8']],
      ['EL NÚMERO DE ABAJO ES LA CLASE', 'Del 1 al 9. Algunas se dividen: 4.1, 4.2, 4.3…', ['r3', 'r4', 'r5']]] , todos: true },
  clase1: { t: 'CLASE 1: EXPLOSIVOS', f: null, x: rombo('ra', 100, 90, 42, '1') + rombo('rb', 230, 90, 42, '1.4'),
    fr: [['CLASE 1 = EXPLOSIVOS', 'Rombo naranja con una explosión y un 1.', ['ra']],
      ['1.1 = EXPLOTA TODO JUNTO', '"Explosión en masa". El rombo naranja con 1.4 es otra división.', ['rb']],
      ['NO SE MEZCLAN', 'Explosivos no van con otras mercancías peligrosas.', ['ra']],
      ['CAMIONES EX/II Y EX/III', 'EX de explosivo.', ['ra']]] },
  clase2: { t: 'CLASE 2: GASES', f: null, x: rombo('ra', 60, 88, 34, '2.1') + rombo('rb', 160, 88, 34, '2.2') + rombo('rc', 260, 88, 34, '2.3') +
      `<g id="let" opacity="0"><rect x="40" y="150" width="240" height="30" rx="8" fill="#0f172a" stroke="#fbbf24"/><text x="160" y="169" text-anchor="middle" font-size="9.5" font-weight="900" fill="#fde68a">F inflamable · T tóxico · A asfixiante · O comburente</text></g>`,
    fr: [['ROJO CON LLAMA Y 2', 'Gas inflamable: se prende.', ['ra']],
      ['VERDE CON BOTELLA', 'Gas no inflamable y no tóxico.', ['rb']],
      ['BLANCO CON CALAVERA', 'Gas tóxico.', ['rc']],
      ['LAS LETRAS DE LOS GASES', 'Se juntan: TF, TC, TO, TOC, TFC.', ['let']]] },
  clase3: { t: 'CLASE 3: LÍQUIDOS INFLAMABLES', f: 'cisterna', x: rombo('ra', 255, 80, 30, '3') + caja('pd', ...PAN_DEL, 30),
    fr: [['COMO LA GASOLINA', 'Rombo rojo con llama y un 3.', ['ra']],
      ['MENOS DE 60 °C', 'Punto de inflamación: la temperatura a la que su vapor se prende.', ['ra']],
      ['CISTERNAS FL', 'Para líquidos y gases inflamables. Llevan toma de tierra.', ['pd']],
      ['SI SE DERRAMA', 'El peligro es el incendio.', ['ra']]] },
  clase4: { t: 'CLASE 4: SÓLIDOS QUE SE PRENDEN', f: null, x: rombo('ra', 60, 88, 34, '4.1') + rombo('rb', 160, 88, 34, '4.2') + rombo('rc', 260, 88, 34, '4.3'),
    fr: [['4.1 SÓLIDOS INFLAMABLES', 'Rayas rojas y blancas. Se prenden por roce o golpe.', ['ra']],
      ['4.2 SE PRENDEN SOLOS', 'Mitad blanco, mitad rojo. Grupo de embalaje I.', ['rb']],
      ['4.3 CON AGUA LARGAN GAS', 'Azul con llama. El contenedor, impermeable.', ['rc']]] },
  clase5: { t: 'CLASE 5: COMBURENTES Y PERÓXIDOS', f: null, x: rombo('ra', 100, 88, 40, '5.1') + rombo('rb', 220, 88, 40, '5.2'),
    fr: [['5.1 COMBURENTES', 'Amarillo con bola en llamas. Avivan el fuego de otras cosas.', ['ra']],
      ['NUNCA PARA RELLENAR HUECOS', 'Comburente no: madera, espuma o bolsas de aire sí.', ['ra']],
      ['5.2 PERÓXIDOS ORGÁNICOS', 'Grupos P1 y P2. Frío de emergencia aunque el motor esté apagado.', ['rb']]] },
  clase6: { t: 'CLASE 6: TÓXICOS E INFECCIOSOS', f: null, x: rombo('ra', 100, 88, 40, '6.1') + rombo('rb', 220, 88, 40, '6.2'),
    fr: [['6.1 TÓXICOS', 'Calavera. Dañan al tragar, respirar o tocar. Ej: plaguicidas.', ['ra']],
      ['NO SE CARGAN EN LA CIUDAD', 'Sin autorización, las tóxicas no se cargan dentro de un pueblo.', ['ra']],
      ['6.2 INFECCIOSOS', 'Microbios que contagian. Grupos I1 a I4. Número 606.', ['rb']]] },
  clase789: { t: 'CLASES 7, 8 Y 9', f: null, x: rombo('ra', 60, 88, 34, '7') + rombo('rb', 160, 88, 34, '8') + rombo('rc', 260, 88, 34, '9'),
    fr: [['7 RADIACTIVOS', 'Largan partículas que dañan a las personas.', ['ra']],
      ['8 CORROSIVOS', 'Queman la piel. Con humedad, largan vapores.', ['rb']],
      ['9 DIVERSOS', 'Los que no entran en otra clase. Ej: medio ambiente.', ['rc']]] },
  embalaje: { t: 'GRUPOS DE EMBALAJE', f: 'envases', x: tag('g1', 70, 44, 'I = muy peligrosas', '#ef4444') + tag('g2', 165, 44, 'II', '#fbbf24') + tag('g3', 250, 44, 'III = menos peligro', '#22c55e'),
    fr: [['GRUPO I', 'Para las mercancías MUY peligrosas.', ['g1']], ['GRUPO II', 'Peligro medio.', ['g2']], ['GRUPO III', 'Para las de MENOS peligro.', ['g3']]] },
  panel1: { t: 'EL PANEL NARANJA', f: 'cisterna', x: caja('pd', ...PAN_DEL, 30) + caja('pt', ...PAN_TRAS, 30) + panel('pg', 214, 28, 84) + `<g id="med" opacity="0"><text x="256" y="104" text-anchor="middle" font-size="10" font-weight="900" fill="#67e8f9">40 × 30 cm</text></g>`,
    fr: [['NARANJA CON BORDE NEGRO', 'Dice que el camión lleva mercancía peligrosa.', ['pg']],
      ['MIDE 40 × 30 CM', '40 de ancho y 30 de alto.', ['pg', 'med']],
      ['UNO ADELANTE Y OTRO ATRÁS', 'Caja o cisterna con una mercancía: los mismos paneles.', ['pd', 'pt']]] },
  panel2: { t: 'LOS DOS NÚMEROS DEL PANEL', f: null, x: panel('pg', 80, 40, 160, '33', '1203') +
      tag('ta', 160, 165, 'arriba: el PELIGRO (mínimo 2 cifras)', '#f97316') + tag('tb', 160, 188, 'abajo: el número ONU = qué materia es', '#22d3ee'),
    fr: [['ARRIBA: EL PELIGRO', 'Número de identificación de peligro, de 2 o 3 cifras.', ['ta']],
      ['ABAJO: EL NÚMERO ONU', 'Dice exactamente qué mercancía es (1203 = gasolina).', ['tb']],
      ['¿CUÁNDO LLEVA NÚMEROS?', 'En cisternas y a granel. Si no, el panel va liso.', ['ta', 'tb']]] },
  panel3: { t: 'QUÉ QUIERE DECIR CADA CIFRA', f: null, x: panel('pg', 95, 30, 130, '', '') +
      `<text id="sig" x="160" y="150" text-anchor="middle" font-size="13" font-weight="900" fill="#fde68a"></text><text id="sig2" x="160" y="170" text-anchor="middle" font-size="10" fill="#cbd5e1"></text>`, especial: 'cifras' },
  panel4: { t: 'CISTERNAS CON COMPARTIMENTOS', f: null,
    x: `<rect x="30" y="60" width="260" height="70" rx="35" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>` +
      [1, 2, 3].map(i => `<line x1="${30 + i * 65}" y1="62" x2="${30 + i * 65}" y2="128" stroke="#475569" stroke-width="2"/>`).join('') +
      [0, 1, 2, 3].map(i => panel('pc' + i, 48 + i * 65, 80, 30)).join('') + panel('pa', 4, 82, 22) + panel('pz', 294, 82, 22),
    fr: [['UN PANEL POR COMPARTIMENTO', '4 compartimentos: 1 adelante, 1 atrás y 4 por cada lado.', ['pc0', 'pc1', 'pc2', 'pc3', 'pa', 'pz']],
      ['VACÍA PERO SIN LIMPIAR', 'Sigue con paneles, siempre: todavía es peligrosa.', ['pc0', 'pc1', 'pc2', 'pc3']],
      ['LIMPIA O SIN MERCANCÍA', 'Los paneles se sacan o se tapan por completo.', ['pa', 'pz']]] },
  etiq1: { t: 'LAS ETIQUETAS EN LOS BULTOS', f: 'envases', x: rombo('e1', px(330), py(330), 13, '3', false) + rombo('e2', px(560), py(420), 13, '8', false) + rombo('e3', px(780), py(330), 13, '6.1', false) + tag('un', 200, 44, 'UN 1203', '#fde68a'),
    fr: [['UNA ETIQUETA POR CADA PELIGRO', 'El principal y el secundario que diga el ADR. Sin repetir.', ['e1', 'e2', 'e3']],
      ['"UN" + NÚMERO ONU', 'Cada bulto lleva el número ONU con UN delante.', ['un']],
      ['CARGAR JUNTAS', 'Materias distintas: solo si el ADR lo autoriza.', ['e1', 'e3']]] },
  etiq2: { t: 'DÓNDE VAN LAS PLACAS-ETIQUETA', f: 'cisterna', x: rombo('s1', 200, 72, 14, '3', false) + rombo('s2', 290, 150, 14, '3', false) + tag('t1', 200, 44, 'en los 2 costados'),
    fr: [['CISTERNA Y GRANEL: 3 PLACAS', 'Dos a los costados y una atrás.', ['s1', 's2', 't1']],
      ['CONTENEDOR: 4', 'En los dos costados y en cada extremo.', ['s1']],
      ['VACÍA SIN LIMPIAR', 'Lleva las mismas etiquetas que llena.', ['s1', 's2']]] },
  envases: { t: 'LOS ENVASES', f: 'envases', x: tag('b1', px(190), py(250), 'bidón') + tag('b2', px(460), py(280), 'jerricán') + tag('b3', px(1000), py(250), 'saco'),
    fr: [['BIDÓN', 'Envase redondo (cilíndrico).', ['b1']], ['JERRICÁN', 'De metal o plástico, cuadrado, con agujeros.', ['b2']], ['SACO', 'Blando: papel, plástico o tela.', ['b3']],
      ['SIN RESTOS POR FUERA', 'Bien atados, sin pérdidas. Y no se abren nunca.', []]] },
  papeles: { t: 'LOS PAPELES A BORDO', f: 'papeles',
    fr: [['CARTA DE PORTE', 'Qué mercancía es (UN + número), cuánta y quién la manda.', []],
      ['INSTRUCCIONES ESCRITAS', 'Qué hacer en una emergencia. En la cabina, en tu idioma.', []],
      ['DNI CON FOTO', 'De cada persona que va en el camión.', []],
      ['CERTIFICADO DE APROBACIÓN', 'Cuando el ADR lo pide (cisternas). Todo vigente.', []]] },
  certificado: { t: 'EL CERTIFICADO DEL CAMIÓN', f: 'cisterna', x: tag('t1', 230, 44, 'cisterna de más de 1.000 l'),
    fr: [['CERTIFICADO DE APROBACIÓN ADR', 'Dice que el vehículo cumple el ADR. Lo da la autoridad.', ['t1']],
      ['QUÉ TIENE', 'Matrícula, chasis, dueño, materias que puede llevar y validez.', []],
      ['REVISIÓN CADA AÑO', 'Cisternas de más de 1.000 l. Rompeolas: 70% de la cisterna.', ['t1']]] },
  conductor: { t: 'DAMIAN Y SU AUTORIZACIÓN', f: null, x: `<image href="ilustraciones/damian.png" x="20" y="28" width="120" height="170" preserveAspectRatio="xMidYMid meet"/>` +
      tag('a1', 230, 60, 'autorización ADR: la da la DGT') + tag('a2', 230, 90, 'dura 5 años') + tag('a3', 230, 120, 'alcohol: 0,3 g/l sangre') + tag('a4', 230, 150, '0,15 mg/l en el soplido'),
    fr: [['AUTORIZACIÓN ESPECIAL', 'Sin ella no se puede ni empezar a cargar.', ['a1']], ['DURA 5 AÑOS', 'Básica; para explosivos o radiactivos, más.', ['a2']],
      ['ALCOHOL', 'Máximo 0,3 g/l en sangre o 0,15 mg/l en aire.', ['a3', 'a4']]] },
  equipo: { t: 'EL EQUIPO DEL CAMIÓN', f: 'equipo',
    fr: [['PARA CADA PERSONA', 'Una linterna y un chaleco fluorescente.', []], ['PARA EL CAMIÓN', 'Un calzo, protección para los ojos y dos señales autoportantes (conos).', []],
      ['EXTINTORES', 'Siempre. 5 t o 10 t: mínimo 2. Revisión cada 5 años.', []]] },
  quien: { t: 'QUIÉN HACE QUÉ', f: 'carga', x: tag('q1', 70, 44, 'EXPEDIDOR') + tag('q2', 160, 44, 'CARGADOR') + tag('q3', 255, 44, 'TRANSPORTISTA'),
    fr: [['EXPEDIDOR', 'El dueño del envío: prepara todo y elige los envases.', ['q1']], ['CARGADOR', 'El responsable de la carga: calzo, sin fugas.', ['q2']],
      ['TRANSPORTISTA', 'Elige camión y conductor, pone paneles, papeles y equipo.', ['q3']],
      ['CONDUCTOR', 'Lee los papeles antes de cargar y revisa la cisterna.', []]] },
  carga: { t: 'AL CARGAR LA CISTERNA', f: 'carga',
    fr: [['CAMIÓN INMOVILIZADO', 'Freno puesto y calzo. Toma de tierra con inflamables.', []], ['LO QUE QUEDÓ ADENTRO', 'Tiene que ser compatible. Si no, se limpia antes.', []],
      ['NUNCA ENTRAR', 'A una cisterna sin limpiar no se entra nunca.', []], ['UN SOLO REMOLQUE', 'Y cuidado con el efecto ola del líquido.', []]] },
  rimp: { t: 'LA RIMP: LOS CAMINOS PERMITIDOS', f: 'ruta', x: caja('au', 10, 130, 200, 60, '#22c55e'),
    fr: [['RIMP', 'Red de Itinerarios para Mercancías Peligrosas.', ['au']], ['AUTOPISTAS Y AUTOVÍAS', 'Si coinciden con tu ruta, son obligatorias.', ['au']],
      ['SALIR DE LA RIMP', 'Para cargar, descargar, reparar, descansar o ir a casa.', []]] },
  ciudad: { t: 'ENTRAR A UNA CIUDAD', f: 'ruta', x: caja('ci', 110, 30, 100, 60, '#ef4444') + caja('cv', 10, 110, 230, 90, '#22c55e'),
    fr: [['SOLO PARA CARGAR O DESCARGAR', 'Si no, a la ciudad no se entra.', ['ci']], ['RODEALA', 'Por la circunvalación más de afuera.', ['cv']],
      ['ENTRÁ POR LO MÁS CERCA', 'Por el acceso más próximo al lugar de entrega.', ['ci']]] },
  velocidad: { t: 'VELOCIDAD Y DÍAS', f: 'ruta', x: `<g id="s40"><circle cx="230" cy="70" r="26" fill="#fff" stroke="#dc2626" stroke-width="6"/><text x="230" y="78" text-anchor="middle" font-size="22" font-weight="900">40</text></g>` +
      `<g id="s80"><circle cx="290" cy="70" r="26" fill="#fff" stroke="#dc2626" stroke-width="6"/><text x="290" y="78" text-anchor="middle" font-size="22" font-weight="900">80</text></g>`,
    fr: [['CIUDAD Y TRAVESÍA: 40', 'Con mercancías peligrosas, máximo 40 km/h.', ['s40']], ['AUTOPISTA Y AUTOVÍA: 80', 'Máximo 80 km/h.', ['s80']],
      ['DOMINGOS Y FESTIVOS', 'Solo con excepción (gas de casa, gasolineras, hospitales) o permiso.', []]] },
  accidente: { t: 'SI PASA ALGO', f: 'accidente', x: (PENDIENTES.accidente ? V16(px(330), py(240)) : '') ,
    fr: [['PRIMERO: LAS INSTRUCCIONES ESCRITAS', 'Mirá qué dicen y hacelo.', []], ['AVISAR', 'Baliza V-16 en el techo, chaleco y llamar a emergencias.', ['v16']],
      ['NO', 'Fumar, chispas, pisar lo derramado o apagar el fuego de la carga.', []], ['PROTEGERSE', 'Equipo de protección antes de acercarse a una fuga.', []]] },
  fuego: { t: 'EL TRIÁNGULO DEL FUEGO', f: 'fuego',
    x: `<polygon points="160,40 230,160 90,160" fill="none" stroke="#fbbf24" stroke-width="3"/>` + tag('f1', 160, 34, 'COMBUSTIBLE', '#fb923c') + tag('f2', 250, 168, 'CALOR', '#ef4444') + tag('f3', 70, 168, 'COMBURENTE (oxígeno)', '#38bdf8'),
    fr: [['3 COSAS JUNTAS', 'Combustible + comburente + calor = triángulo del fuego.', ['f1', 'f2', 'f3']], ['+ REACCIÓN EN CADENA', 'Son 4: el tetraedro del fuego.', ['f1', 'f2', 'f3']],
      ['CLASES DE FUEGO', 'A sólidos · B líquidos · C gases.', []]] },
  salud: { t: 'CUIDARSE AL TRABAJAR', f: 'carga',
    fr: [['LIMPIAR CISTERNAS', 'Sin cuidado: lesiones en los ojos y en la piel.', []], ['MALAS POSTURAS', 'Causan hernias de disco.', []], ['CARGA Y DESCARGA', 'Ahí también hay que tener mucho cuidado.', []]] }
};
const CIFRAS = [['2', 'gas por presión o reacción'], ['3', 'líquido o gas que se prende'], ['4', 'sólido que se prende'], ['5', 'comburente'], ['6', 'tóxico o infeccioso'],
  ['7', 'radiactivo'], ['8', 'corrosivo'], ['9', 'reacción violenta espontánea'], ['30', 'un 0 completa si alcanza una cifra'], ['33', 'cifra repetida = peligro más fuerte'],
  ['X423', 'X = reacciona peligrosamente con el agua'], ['22', 'gas licuado refrigerado, asfixiante'], ['23', 'gas inflamable'], ['90', 'medio ambiente, diversos'], ['606', 'materia infecciosa']];

export function montarAnim(contenedor, nombre, opts = {}) {
  const pausado = opts.pausado || (() => false);
  const d = A[nombre] || A.intro;
  const svgExtra = d.x || '';
  contenedor.innerHTML = `<svg viewBox="0 0 320 260" xmlns="${NS}" style="width:100%;height:auto;display:block">${DEFS}${FONDO(d.t)}${d.f ? foto(d.f) : ''}${svgExtra}${CARTEL}</svg>`;
  const q = id => contenedor.querySelector('#' + id);
  let t = 0, ultimo = performance.now(), vivo = true, prev = -1;
  const todosIds = [...new Set((d.fr || []).flatMap(f => f[2]))];
  function cuadro(ahora) {
    if (!vivo) return;
    const dt = pausado() ? 0 : Math.max(0, Math.min(0.05, (ahora - ultimo) / 1000)); ultimo = ahora; t += dt;
    if (d.especial === 'cifras') {
      const k = Math.floor(t / 3.2) % CIFRAS.length, c = CIFRAS[k];
      q('pg-a').textContent = c[0]; q('sig').textContent = 'Cifra ' + c[0]; q('sig2').textContent = c[1];
      q('c1').textContent = 'NÚMERO DE PELIGRO (ARRIBA)'; q('c2').textContent = 'Cada cifra es un peligro. Leelas de a una.';
    } else {
      const fr = d.fr, k = Math.floor(t / 4.8) % fr.length, f = fr[k];
      if (k !== prev) { q('c1').textContent = f[0]; q('c2').textContent = f[1]; prev = k; }
      const br = (0.55 + 0.45 * Math.abs(Math.sin(t * 2.4))).toFixed(2);
      todosIds.forEach(id => { const el = q(id); if (el) el.setAttribute('opacity', f[2].includes(id) ? br : (el.tagName === 'rect' ? 0 : 0.3)); });
    }
    requestAnimationFrame(cuadro);
  }
  requestAnimationFrame(cuadro);
  return () => { vivo = false; };
}
