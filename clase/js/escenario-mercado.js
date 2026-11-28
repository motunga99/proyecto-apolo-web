// ==========================================
// ESCENARIO CON ILUSTRACIONES (2D): lo usan Mercado del transporte y Laboral
// Igual que el de Sociedades: muñequitos, camiones y edificios sobre fondo oscuro.
// Cada paso arma su propia escena: dónde va cada cosa.
// Después, la "línea" del paso va mostrando, moviendo y haciendo hablar a cada uno.
// Todo se mueve suave, sin rebotes.
// ==========================================

const W = 1120;
const H = 600;
const PISO = 520;
const RUTA = 'ilustraciones/';

// Las ilustraciones que se pueden usar: img = archivo, alto = tamaño normal
const CATALOGO = {
  // personas
  juan: { img: 'juan', alto: 300, cara: 1 },
  pedro: { img: 'pedro', alto: 300, cara: 1 },
  pablo: { img: 'pablo', alto: 300, cara: 1 },
  maria: { img: 'maria', alto: 300, cara: 1 },
  luis: { img: 'luis', alto: 300, cara: 1 },
  perito: { img: 'perito', alto: 300, cara: 1 },
  carmen: { img: 'carmen', alto: 300, cara: 1 },
  teresa: { img: 'socia', alto: 300, cara: 1 },
  lopez: { img: 'socio', alto: 300, cara: 1 },
  antonio: { img: 'lopez', alto: 290, cara: 1 },
  ana: { img: 'ana', alto: 290, cara: 1 },
  ricardo: { img: 'banco', alto: 300, cara: 1 },
  sergio: { img: 'socio-joven', alto: 300, cara: 1 },
  vocal: { img: 'notario', alto: 290, cara: 1 },
  inspector: { img: 'inspector', alto: 290, cara: 1 },
  operarios: { img: 'trabajadores', alto: 290, cara: 2 },
  // vehículos
  camion: { img: 'camion', alto: 130 },
  camionRojo: { img: 'camion-golpe', alto: 150 },
  camionFabrica: { img: 'camion-ana', alto: 120 },
  camionArt: { img: 'camion-art', alto: 120 },
  tren: { img: 'tren', alto: 70, sinSombra: true },
  barco: { img: 'barco', alto: 95, sinSombra: true },
  avion: { img: 'avion', alto: 90, sinSombra: true },
  contenedor: { img: 'contenedor', alto: 80 },
  barrera: { img: 'barrera', alto: 120 },
  // edificios
  fabrica: { img: 'edif-fabrica', alto: 210 },
  almacen: { img: 'edif-cliente', alto: 200 },
  puerto: { img: 'edif-puerto', alto: 200 },
  tienda: { img: 'edif-quesos', alto: 220 },
  empresa: { img: 'edif-apolo', alto: 220 },
  agencia: { img: 'edif-sucursal', alto: 150 },
  oficinaPublica: { img: 'edif-oficina', alto: 220 },
  // cosas
  monedas: { img: 'monedas', alto: 90 },
  papel: { img: 'carta-porte', alto: 90, sinSombra: true },
  factura: { img: 'factura', alto: 90, sinSombra: true },
  poliza: { img: 'bilateral', alto: 90, sinSombra: true },
  laudo: { img: 'escritura', alto: 90, sinSombra: true },
  carpeta: { img: 'carpeta', alto: 80, sinSombra: true },
  escudo: { img: 'escudo', alto: 150, sinSombra: true },
  mesa: { img: 'mesa-junta', alto: 140 },
  mazo: { img: 'mazo', alto: 70 },
  reloj: { img: 'reloj', alto: 150, sinSombra: true },
  palets: { img: 'palets', alto: 110 },
  surtidor: { img: 'surtidor', alto: 170 },
  // tema laboral
  laura: { img: 'medica', alto: 300, cara: 1 },
  juanHerido: { img: 'juan-vendado', alto: 300, cara: 1 },
  dolorEspalda: { img: 'dolor-espalda', alto: 300, cara: 1 },
  manolo: { img: 'dolor-pecho', alto: 300, cara: 1 },
  levantaBien: { img: 'levanta-bien', alto: 290, cara: 1 },
  levantaMal: { img: 'levanta-mal', alto: 280, cara: 1 },
  maniqui: { img: 'maniqui-epi', alto: 300 },
  toro: { img: 'toro', alto: 170 },
  cabina: { img: 'cabina', alto: 300 },
  caja: { img: 'caja-carton', alto: 80 },
  crema: { img: 'crema', alto: 70 },
  bidon: { img: 'bidon-quimico', alto: 150 },
  ambulancia: { img: 'ambulancia', alto: 120 },
  tarjetaCap: { img: 'tarjeta-cap', alto: 80, sinSombra: true },
  casa: { img: 'casa', alto: 190 },
  auto: { img: 'auto', alto: 80 },
  // ADR: quién hace qué y los papeles
  expedidor: { img: 'expedidor', alto: 300, cara: 1 },
  cargador: { img: 'cargador', alto: 300, cara: 1 },
  transportista: { img: 'transportista', alto: 300, cara: 1 },
  destinataria: { img: 'destinataria', alto: 300, cara: 1 },
  cisterna: { img: 'camion-cisterna', alto: 140 },
  quimica: { img: 'edif-quimica', alto: 200 },
  gasolinera: { img: 'gasolinera', alto: 170 },
  instrucciones: { img: 'instrucciones', alto: 110, sinSombra: true },
  calzo: { img: 'calzo', alto: 50 },
  dni: { img: 'licencia', alto: 80, sinSombra: true },
  autorizacion: { img: 'certificado', alto: 80, sinSombra: true },
  // Neumáticos: el taller de Pedro
  rueda: { img: 'rueda', alto: 250 },
  llantaAcero: { img: 'llanta-acero', alto: 220 },
  llantaAleacion: { img: 'llanta-aleacion', alto: 220 },
  camara: { img: 'camara', alto: 150 },
  corte: { img: 'rueda-corte', alto: 300 },
  flanco: { img: 'flanco-texto', alto: 300, sinSombra: true },
  manometro: { img: 'manometro', alto: 200 },
  desinflada: { img: 'rueda-desinflada', alto: 190 },
  reventada: { img: 'rueda-reventada', alto: 250 },
  bordillo: { img: 'rueda-bordillo', alto: 190 },
  charco: { img: 'charco', alto: 95, sinSombra: true },
  desgBordes: { img: 'desg-bordes', alto: 280 },
  desgCentro: { img: 'desg-centro', alto: 280 },
  desgLado: { img: 'desg-lado', alto: 280 },
  llantaCorte: { img: 'llanta-corte', alto: 420, sinSombra: true },
  llantaUna: { img: 'llanta-una', alto: 170, sinSombra: true },
  llantaVarias: { img: 'llanta-varias', alto: 170, sinSombra: true },
  // ADR: certificado y equipo
  itv: { img: 'edif-itv', alto: 210 },
  certAdr: { img: 'certificado-adr', alto: 120, sinSombra: true },
  cisternaCorte: { img: 'cisterna-rompeolas', alto: 170 },
  eqLinterna: { img: 'eq-linterna', alto: 34 },
  eqChaleco: { img: 'eq-chaleco', alto: 110 },
  eqGafas: { img: 'eq-gafas', alto: 30 },
  eqCalzo: { img: 'eq-calzo', alto: 60 },
  eqConos: { img: 'eq-conos', alto: 120 },
  eqExtintor: { img: 'eq-extintor', alto: 150 },
  eqV16: { img: 'eq-v16', alto: 45 }
};

const CSS_BASE = `
#escenario { position: fixed; left: 466px; right: 16px; top: 92px; bottom: 16px; z-index: 5; overflow: hidden; border-radius: 22px; }
#escenario .ajuste { position: absolute; left: 50%; top: 50%; width: ${W}px; height: ${H}px; transform-origin: 0 0; }
#escenario .mundo { position: absolute; inset: 0; transform-origin: 0 0; }
#escenario .fondo { position: absolute; inset: -200px; background:
  radial-gradient(ellipse 60% 45% at 50% 62%, rgba(56, 189, 248, 0.10), transparent 70%),
  radial-gradient(ellipse 40% 30% at 20% 30%, rgba(167, 139, 250, 0.08), transparent 70%); }
#escenario .piso { position: absolute; left: -200px; right: -200px; top: ${PISO}px; height: 160px;
  background: linear-gradient(180deg, rgba(148, 163, 184, 0.10), transparent 80%); border-top: 1px solid rgba(148, 163, 184, 0.18); }
.cosa { position: absolute; transform-origin: 50% 100%; opacity: 0; pointer-events: none;
  transition: opacity 0.7s ease, left 1.6s cubic-bezier(0.45, 0, 0.2, 1), top 1.6s cubic-bezier(0.45, 0, 0.2, 1), filter 0.6s ease;
  transform: translate(-50%, -100%); }
.cosa.ve { opacity: 1; }
.cosa.ya { transition: none !important; }
.cosa.ve.chau { opacity: 0.18; filter: grayscale(1); }
.cosa img { display: block; height: 100%; width: auto; filter: drop-shadow(0 14px 22px rgba(0, 0, 0, 0.55)); }
.cosa.espejo img { transform: scaleX(-1); }
.cosa .sombra { position: absolute; left: 50%; bottom: -10px; width: 80%; height: 22px; transform: translateX(-50%); border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.55), transparent 70%); z-index: -1; }
.cosa.brilla img { animation: cosaLuz 2.4s ease-in-out infinite; }
@keyframes cosaLuz { 0%, 100% { filter: drop-shadow(0 14px 22px rgba(0, 0, 0, 0.55)); } 50% { filter: drop-shadow(0 0 26px rgba(56, 189, 248, 0.95)) drop-shadow(0 14px 22px rgba(0, 0, 0, 0.55)) brightness(1.08); } }
.cosa.rojo img { animation: cosaRoja 2.4s ease-in-out infinite; }
@keyframes cosaRoja { 0%, 100% { filter: drop-shadow(0 14px 22px rgba(0, 0, 0, 0.55)); } 50% { filter: drop-shadow(0 0 26px rgba(248, 113, 113, 0.95)) drop-shadow(0 14px 22px rgba(0, 0, 0, 0.55)); } }
.vuela { position: absolute; transform: translate(-50%, -50%); opacity: 0; z-index: 900; pointer-events: none;
  transition: left 1.5s cubic-bezier(0.45, 0, 0.2, 1), top 1.5s cubic-bezier(0.45, 0, 0.2, 1), opacity 0.5s ease; }
.vuela img { height: 100%; width: auto; filter: drop-shadow(0 0 14px rgba(253, 224, 71, 0.8)) drop-shadow(0 8px 12px rgba(0, 0, 0, 0.5)); }
.vuela.ve { opacity: 1; }
.flecha { position: absolute; height: 6px; border-radius: 6px; transform-origin: 0 50%; opacity: 0; z-index: 40; pointer-events: none;
  background: linear-gradient(90deg, rgba(56, 189, 248, 0.2), #38bdf8); box-shadow: 0 0 16px 3px rgba(56, 189, 248, 0.6); transition: opacity 0.6s ease; }
.flecha::after { content: ''; position: absolute; right: -6px; top: 50%; width: 0; height: 0; transform: translateY(-50%);
  border-left: 16px solid #38bdf8; border-top: 11px solid transparent; border-bottom: 11px solid transparent; }
.flecha.ve { opacity: 1; }
.flecha.verde { background: linear-gradient(90deg, rgba(34, 197, 94, 0.2), #22c55e); box-shadow: 0 0 16px 3px rgba(34, 197, 94, 0.6); }
.flecha.verde::after { border-left-color: #22c55e; }
.flecha.roja { background: linear-gradient(90deg, rgba(239, 68, 68, 0.2), #ef4444); box-shadow: 0 0 16px 3px rgba(239, 68, 68, 0.6); }
.flecha.roja::after { border-left-color: #ef4444; }
.flecha.amarilla { background: linear-gradient(90deg, rgba(250, 204, 21, 0.2), #facc15); box-shadow: 0 0 16px 3px rgba(250, 204, 21, 0.6); }
.flecha.amarilla::after { border-left-color: #facc15; }
.titulo-esc { position: absolute; left: 50%; top: 18px; transform: translateX(-50%); padding: 8px 22px; border-radius: 999px; z-index: 950;
  font: 900 22px 'Nunito', sans-serif; letter-spacing: 0.04em; color: #fff; white-space: nowrap; opacity: 0; transition: opacity 0.6s ease;
  background: linear-gradient(90deg, #0e7490, #4f46e5); box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45), 0 0 0 2px rgba(255, 255, 255, 0.18) inset; }
.titulo-esc.ve { opacity: 1; }
.agujas { position: absolute; transform: translate(-50%, -50%); pointer-events: none; z-index: 980; opacity: 0; transition: opacity 0.5s ease; }
.agujas.ve { opacity: 1; }
#escenario .capa-etq { position: absolute; inset: 0; pointer-events: none; z-index: 5000; }
#escenario .etiqueta3d { width: max-content; opacity: 0; transition: opacity 0.45s ease, left 0.6s cubic-bezier(0.22, 1, 0.36, 1), top 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
#escenario .etiqueta3d.ve { opacity: 1; }
@media (max-width: 1100px) { #escenario { left: 8px; right: 8px; top: 84px; bottom: auto; height: 46vh; } }
`;

export function crearEscenarioMercado({ id = 'escenario', z = 5 } = {}) {
  const estilo = document.createElement('style');
  // el id se puede cambiar (en ADR ya existe un #escenario)
  estilo.textContent = CSS_BASE.split('#escenario').join('#' + id).replace('z-index: 5; overflow', `z-index: ${z}; overflow`);
  document.head.appendChild(estilo);

  const raiz = document.createElement('div');
  raiz.id = id;
  raiz.innerHTML = `<div class="ajuste"><div class="mundo"><div class="fondo"></div><div class="piso"></div></div></div>`;
  document.body.appendChild(raiz);
  const ajuste = raiz.querySelector('.ajuste');
  const mundo = raiz.querySelector('.mundo');
  const capa = document.createElement('div');
  capa.className = 'capa-etq';
  mundo.appendChild(capa);
  const titulo = document.createElement('div');
  titulo.className = 'titulo-esc';
  mundo.appendChild(titulo);

  // precargar todas las ilustraciones
  Object.values(CATALOGO).forEach(c => { const i = new Image(); i.src = RUTA + c.img + '.png'; });

  function ajustar() {
    const k = Math.min(raiz.clientWidth / W, raiz.clientHeight / H);
    ajuste.style.transform = `scale(${k}) translate(-50%, -50%)`;
  }
  window.addEventListener('resize', ajustar);
  ajustar();

  // ---------- LAS COSAS DE LA ESCENA ----------
  // escena = { id: ['juan', x, { abajo, alto, espejo }] }
  let els = {};
  let pos = {};
  let extras = [];

  function preparar(escena = {}) {
    Object.values(els).forEach(el => el.remove());
    extras.forEach(el => el.remove());
    els = {}; pos = {}; extras = [];
    Object.entries(escena).forEach(([id, [nombre, x, o = {}]]) => {
      const c = CATALOGO[nombre];
      if (!c) return;
      const alto = o.alto || c.alto;
      const abajo = o.abajo ?? PISO;
      const el = document.createElement('div');
      el.className = 'cosa' + (o.espejo ? ' espejo' : '');
      el.style.left = x + 'px';
      el.style.top = abajo + 'px';
      el.style.height = alto + 'px';
      el.innerHTML = `<img src="${RUTA}${c.img}.png" alt="">` + (c.sinSombra || o.sinSombra ? '' : '<div class="sombra"></div>');
      el.style.zIndex = String(o.z ?? Math.round(abajo));
      mundo.appendChild(el);
      els[id] = el;
      pos[id] = { x, abajo, alto, cara: c.cara || 0 };
    });
  }

  function ver(id, siNo, inmediato = false) {
    const el = els[id];
    if (!el) return;
    if (inmediato) el.classList.add('ya');
    el.classList.toggle('ve', siNo);
    if (!siNo) {
      el.classList.remove('chau', 'brilla', 'rojo');
      // si se va, se lleva su cartel y su globito
      [id, 'g:' + id].forEach(k => { if (etiquetas[k]) { etiquetas[k].remove(); delete etiquetas[k]; } });
    }
    if (inmediato) { void el.offsetWidth; el.classList.remove('ya'); }
  }
  const mostrar = (id, siNo = true) => ver(id, siNo);
  const yaVisible = id => ver(id, true, true);
  const ocultar = id => ver(id, false);

  // Moverse a otro lugar (caminar, manejar)
  function mover(id, x, abajo = null) {
    const el = els[id];
    if (!el) return;
    el.style.left = x + 'px';
    pos[id].x = x;
    if (abajo !== null) { el.style.top = abajo + 'px'; pos[id].abajo = abajo; }
  }
  function brilla(id, siNo = true, color = '') {
    const el = els[id];
    if (!el) return;
    el.classList.toggle(color === 'rojo' ? 'rojo' : 'brilla', siNo);
  }
  function apagar(id, siNo = true) { const el = els[id]; if (el) el.classList.toggle('chau', siNo); }

  // Algo que vuela de una cosa a otra: monedas, un papel...
  function volar(nombre, desde, hasta, { alto = 56, quedarse = false } = {}) {
    const c = CATALOGO[nombre];
    const a = pos[desde], b = pos[hasta];
    if (!c || !a || !b) return;
    const el = document.createElement('div');
    el.className = 'vuela';
    el.style.height = alto + 'px';
    el.innerHTML = `<img src="${RUTA}${c.img}.png" alt="">`;
    el.style.left = a.x + 'px';
    el.style.top = (a.abajo - a.alto * 0.5) + 'px';
    mundo.appendChild(el);
    extras.push(el);
    void el.offsetWidth;
    el.classList.add('ve');
    el.style.left = b.x + 'px';
    el.style.top = (b.abajo - b.alto * 0.5) + 'px';
    if (!quedarse) setTimeout(() => el.classList.remove('ve'), 2300);
  }

  // Flecha que une dos cosas (quién le encarga a quién)
  const flechas = {};
  function flecha(nombre, desde, hasta, color = '', y = null) {
    if (flechas[nombre]) { flechas[nombre].remove(); delete flechas[nombre]; }
    if (!desde) return;
    const a = pos[desde], b = pos[hasta];
    if (!a || !b) return;
    const ya = y ?? (a.abajo - a.alto * 0.45), yb = y ?? (b.abajo - b.alto * 0.45);
    const dir = Math.sign(b.x - a.x) || 1;
    const x1 = a.x + dir * 70, x2 = b.x - dir * 80;
    const largo = Math.hypot(x2 - x1, yb - ya);
    const el = document.createElement('div');
    el.className = 'flecha ' + color;
    el.style.left = x1 + 'px';
    el.style.top = ya + 'px';
    el.style.width = largo + 'px';
    el.style.transform = `rotate(${Math.atan2(yb - ya, x2 - x1)}rad)`;
    mundo.appendChild(el);
    extras.push(el);
    flechas[nombre] = el;
    void el.offsetWidth;
    el.classList.add('ve');
  }

  // Agujas del reloj encima de la ilustración del reloj (dan una vuelta = 1 hora)
  let agujas = null;
  function reloj(id, segundos = 4) {
    const p = pos[id];
    if (!p) return;
    if (agujas) agujas.remove();
    const r = p.alto * 0.36;
    agujas = document.createElement('div');
    agujas.className = 'agujas';
    agujas.style.left = p.x + 'px';
    agujas.style.top = (p.abajo - p.alto / 2) + 'px';
    agujas.innerHTML = `<svg width="${r * 2.4}" height="${r * 2.4}" viewBox="-60 -60 120 120">
      <path id="arco" d="" fill="rgba(34,197,94,0.45)"/>
      <line id="min" x1="0" y1="0" x2="0" y2="-46" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>
      <circle r="5" fill="#ef4444"/></svg>`;
    mundo.appendChild(agujas);
    extras.push(agujas);
    void agujas.offsetWidth;
    agujas.classList.add('ve');
    const arco = agujas.querySelector('#arco'), min = agujas.querySelector('#min');
    const t0 = performance.now();
    const paso = ahora => {
      if (!agujas || !agujas.isConnected) return;
      const k = Math.min(1, (ahora - t0) / (segundos * 1000));
      const ang = k * Math.PI * 2;
      min.setAttribute('transform', `rotate(${k * 360})`);
      const x = 50 * Math.sin(ang), y = -50 * Math.cos(ang);
      arco.setAttribute('d', k >= 1 ? 'M0 -50 A50 50 0 1 1 -0.01 -50 Z' : `M0 0 L0 -50 A50 50 0 ${ang > Math.PI ? 1 : 0} 1 ${x} ${y} Z`);
      if (k < 1) requestAnimationFrame(paso);
    };
    requestAnimationFrame(paso);
  }

  function cartelTitulo(texto, color = null) {
    if (!texto) { titulo.classList.remove('ve'); return; }
    titulo.textContent = texto;
    titulo.style.background = color || '';
    titulo.classList.add('ve');
  }

  // ---------- CARTELITOS ----------
  // etiqueta(id, html, tipo): arriba de una cosa. Con un id que no existe se puede dar [x, y].
  const etiquetas = {};
  function etiqueta(id, html = null, tipo = '', donde = null) {
    if (etiquetas[id]) { etiquetas[id].remove(); delete etiquetas[id]; }
    if (html === null) return;
    let a = donde;
    if (!a) {
      const p = pos[id];
      if (!p) return;
      a = [p.x, p.abajo - p.alto - 12];
    }
    if (tipo === 'globo') Object.entries(etiquetas).forEach(([otro, el]) => { if (el.classList.contains('globo')) { el.remove(); delete etiquetas[otro]; } });
    const el = document.createElement('div');
    el.className = 'etiqueta3d aparece ve ' + tipo;
    el.style.left = a[0] + 'px';
    el.style.top = a[1] + 'px';
    el.dataset.ax = a[0];
    el.dataset.ay = a[1];
    el.innerHTML = `<div class="etq-in">${html}</div>`;
    capa.appendChild(el);
    etiquetas[id] = el;
    reacomodar(true);
  }
  // Globito de lo que dice alguien (aparte del cartel de esa persona)
  function globo(id, html = null) {
    const p = pos[id];
    etiqueta('g:' + id, html, 'globo', p ? [p.x, p.abajo - p.alto - 12] : null);
  }

  // Que los carteles no tapen caras ni se pisen (igual que en Sociedades)
  let cuerpos = [];
  const choca = (a, b) => a[0] < b[2] + 6 && a[2] > b[0] - 6 && a[1] < b[3] + 6 && a[3] > b[1] - 6;
  function caras() {
    const r = [];
    cuerpos = [];
    Object.entries(els).forEach(([id, el]) => {
      if (!el.classList.contains('ve') || !pos[id].cara) return;
      const w = el.offsetWidth, h = el.offsetHeight, x = pos[id].x - w / 2, y = pos[id].abajo - h;
      if (pos[id].cara === 2) r.push([x + w * 0.04, y - 4, x + w * 0.96, y + h * 0.3]);
      else r.push([x + w * 0.2, y - 4, x + w * 0.8, y + h * 0.22]);
      cuerpos.push([x + w * 0.15, y, x + w * 0.85, y + h]);
    });
    return r;
  }
  function reacomodar(alInstante = false) {
    const lista = Object.values(etiquetas);
    if (!lista.length) return;
    const ocupado = caras();
    lista.forEach(el => {
      const ax = +el.dataset.ax, ay = +el.dataset.ay;
      const w = el.offsetWidth, h = el.offsetHeight;
      const caja = (x, y) => [x - w / 2, y - h, x + w / 2, y];
      const libre = (x, y) => !ocupado.some(o => choca(caja(x, y), o));
      let p = null, mejor = Infinity;
      for (let dx = -520; dx <= 520; dx += 20) {
        const x = Math.max(18 + w / 2, Math.min(W - 18 - w / 2, ax + dx));
        const cx = Math.abs(x - ax) * 1.4;
        if (cx >= mejor) continue;
        for (let y = 70 + h; y <= H - 8; y += 8) {
          let c = cx + (y <= ay ? (ay - y) : (y - ay) * 1.8);
          if (c >= mejor) continue;
          const b = caja(x, y);
          c += cuerpos.filter(o => choca(b, o)).length * 90;
          if (c < mejor && libre(x, y)) { mejor = c; p = [x, y]; }
        }
      }
      if (!p) p = [ax, Math.max(ay, 70 + h)];
      if (alInstante) el.style.transition = 'none';
      el.style.left = p[0] + 'px';
      el.style.top = p[1] + 'px';
      if (alInstante) { void el.offsetWidth; el.style.transition = ''; }
      ocupado.push(caja(p[0], p[1]));
    });
  }
  setInterval(() => reacomodar(false), 150);

  function limpiar() {
    Object.keys(etiquetas).forEach(n => { etiquetas[n].remove(); delete etiquetas[n]; });
    Object.keys(flechas).forEach(n => delete flechas[n]);
    agujas = null;
    cartelTitulo(null);
  }

  return {
    preparar, mostrar, yaVisible, ocultar, mover, brilla, apagar, volar, flecha, reloj, etiqueta, globo, titulo: cartelTitulo, limpiar,
    setVista: () => {}, actualizar: () => {}
  };
}
