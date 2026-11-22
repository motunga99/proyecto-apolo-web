// ==========================================
// ESCENARIO DE SOCIEDADES (2D, con ilustraciones)
// Reemplaza al mundo 3D: Damian, los socios, la casa, la caja fuerte de la empresa,
// la plata, el escudo, la mesa de la junta y los papeles, sobre un fondo oscuro.
// Tiene las mismas funciones que la escena 3D vieja, así los capítulos no cambian.
// ==========================================

const W = 1120;
const H = 600;
const PISO = 520;
const RUTA = 'ilustraciones/';

// Dónde va cada cosa: x = centro, abajo = dónde apoya, alto = tamaño
const COSAS = {
  casa: { img: 'casa', x: 112, abajo: PISO, alto: 205 },
  persona: { img: 'damian', x: 300, abajo: PISO, alto: 330 },
  auto: { img: 'auto', x: 178, abajo: 572, alto: 72 },
  linea: { x: 410, abajo: PISO + 20, alto: 420, linea: true },
  pared: { img: 'escudo', x: 410, abajo: 420, alto: 175, sinSombra: true },
  socio2: { img: 'socia', x: 500, abajo: PISO, alto: 312 },
  socio3: { img: 'socio', x: 590, abajo: PISO, alto: 322 },
  socio4: { img: 'socio-joven', x: 680, abajo: PISO, alto: 318 },
  trabajadores: { img: 'trabajadores', x: 590, abajo: PISO, alto: 330 },
  mesa: { img: 'mesa-junta', x: 590, abajo: 596, alto: 150 },
  libro: { img: 'libro', x: 590, abajo: 548, alto: 62, sinSombra: true },
  monedas: { img: 'monedas', x: 802, abajo: 566, alto: 108 },
  pila: { img: 'acciones', x: 802, abajo: 470, alto: 70, sinSombra: true },
  empresa: { img: 'edif-autonomo', x: 895, abajo: PISO, alto: 215 },
  camion: { img: 'camion', x: 1002, abajo: PISO, alto: 124 },
  registro: { img: 'registro', x: 1010, abajo: 296, alto: 150, sinSombra: true },
  notario: { img: 'notario', x: 760, abajo: PISO, alto: 318 },
  escritura: { img: 'escritura', x: 832, abajo: 360, alto: 112, sinSombra: true },
  banco: { img: 'banco', x: 770, abajo: PISO, alto: 318 }
};

// Dónde aparece cada cartelito
const ANCLAS = {
  globo: [300, PISO - 340], persona: [300, PISO - 340],
  casa: [112, PISO - 214], auto: [178, 494],
  deuda: [920, PISO - 270], monedas: [802, 452],
  socio2: [500, PISO - 322], socio3: [590, PISO - 392], socio4: [680, PISO - 328],
  registro: [1010, 140], escritura: [800, 244], pared: [430, 160], mesa: [770, 452]
};
// Con trabajadores (laboral y cooperativa) los tres socios son los de esa imagen
const ANCLAS_TRAB = { socio2: [478, PISO - 336], socio3: [592, PISO - 400], socio4: [702, PISO - 330] };

const TIPOS = {
  autonomo: { texto: 'AUTÓNOMO', fondo: '#059669' },
  sa: { texto: 'SOCIEDAD ANÓNIMA (SA)', fondo: '#4f46e5' },
  sl: { texto: 'SOCIEDAD LIMITADA (SL)', fondo: '#ea580c' },
  laboral: { texto: 'SOCIEDAD LABORAL', fondo: '#0d9488' },
  cooperativa: { texto: 'COOPERATIVA', fondo: '#9333ea' },
  otras: { texto: 'OTRAS SOCIEDADES', fondo: '#64748b' }
};

const VISTAS = {
  general: { x: W / 2, y: H / 2, zoom: 1 },
  empresa: { x: 840, y: 330, zoom: 1.25 },
  socios: { x: 540, y: 320, zoom: 1.14 }
};

const CSS = `
#escenario { position: fixed; left: 466px; right: 16px; top: 92px; bottom: 16px; z-index: 5; overflow: hidden; border-radius: 22px; }
#escenario .ajuste { position: absolute; left: 50%; top: 50%; width: ${W}px; height: ${H}px; transform-origin: 0 0; }
#escenario .mundo { position: absolute; inset: 0; transform-origin: 0 0; transition: transform 1.1s cubic-bezier(0.22, 1, 0.36, 1); }
#escenario .fondo { position: absolute; inset: -200px; background:
  radial-gradient(ellipse 60% 45% at 50% 62%, rgba(56, 189, 248, 0.10), transparent 70%),
  radial-gradient(ellipse 40% 30% at 20% 30%, rgba(167, 139, 250, 0.08), transparent 70%); }
#escenario .piso { position: absolute; left: -200px; right: -200px; top: ${PISO}px; height: 160px;
  background: linear-gradient(180deg, rgba(148, 163, 184, 0.10), transparent 80%); border-top: 1px solid rgba(148, 163, 184, 0.18); }
.cosa { position: absolute; transform-origin: 50% 100%; opacity: 0; pointer-events: none;
  transition: opacity 0.7s ease, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), filter 0.6s ease; transform: translate(-50%, -100%) translateY(14px) scale(0.94); }
.cosa.ve { opacity: 1; transform: translate(-50%, -100%); }
.cosa.ya { transition: none !important; }
.cosa img { display: block; height: 100%; width: auto; filter: drop-shadow(0 14px 22px rgba(0, 0, 0, 0.55)); }
.cosa .sombra { position: absolute; left: 50%; bottom: -10px; width: 80%; height: 22px; transform: translateX(-50%); border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.55), transparent 70%); z-index: -1; }
.cosa.linea { width: 4px; border-radius: 4px; background: linear-gradient(180deg, transparent, #38bdf8 20%, #a78bfa 80%, transparent);
  box-shadow: 0 0 18px 4px rgba(56, 189, 248, 0.55); }
.cosa.brilla img { filter: drop-shadow(0 0 26px rgba(56, 189, 248, 0.9)) drop-shadow(0 14px 22px rgba(0, 0, 0, 0.55)); }
.cosa.pared img { animation: paredLuz 2.6s ease-in-out infinite; }
@keyframes paredLuz { 50% { filter: drop-shadow(0 0 34px rgba(125, 211, 252, 0.95)) brightness(1.08); } }
.cartel-tipo { position: absolute; transform: translate(-50%, -100%); padding: 7px 16px; border-radius: 999px; color: #fff;
  font: 900 15px 'Nunito', sans-serif; letter-spacing: 0.06em; white-space: nowrap; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45), 0 0 0 2px rgba(255, 255, 255, 0.18) inset;
  opacity: 0; transition: opacity 0.6s ease; }
.cartel-tipo.ve { opacity: 1; }
.ficha { position: absolute; width: 30px; height: 19px; border-radius: 4px; transform: translate(-50%, -50%);
  border: 1px solid rgba(255, 255, 255, 0.55); box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); opacity: 0;
  transition: left 1.2s cubic-bezier(0.45, 0, 0.2, 1), top 1.2s cubic-bezier(0.45, 0, 0.2, 1), opacity 0.5s ease; }
.ficha.ve { opacity: 1; }
.ficha::after { content: ''; position: absolute; left: 4px; right: 4px; top: 5px; height: 2px; background: rgba(255, 255, 255, 0.6); box-shadow: 0 5px 0 rgba(255, 255, 255, 0.4); }
#escenario .capa-etq { position: absolute; inset: 0; pointer-events: none; z-index: 5000; }
#escenario .etiqueta3d { width: max-content; opacity: 0; transition: opacity 0.45s ease, left 0.6s cubic-bezier(0.22, 1, 0.36, 1), top 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
#escenario .etiqueta3d.ve { opacity: 1; }
@media (max-width: 1100px) { #escenario { left: 8px; right: 8px; top: 84px; bottom: auto; height: 46vh; } }
`;

export function crearEscenarioSociedades() {
  const estilo = document.createElement('style');
  estilo.textContent = CSS;
  document.head.appendChild(estilo);

  const raiz = document.createElement('div');
  raiz.id = 'escenario';
  raiz.innerHTML = `<div class="ajuste"><div class="mundo"><div class="fondo"></div><div class="piso"></div></div></div>`;
  document.body.appendChild(raiz);
  const ajuste = raiz.querySelector('.ajuste');
  const mundo = raiz.querySelector('.mundo');

  // ---------- LAS COSAS ----------
  const els = {};
  Object.entries(COSAS).forEach(([nombre, c]) => {
    const el = document.createElement('div');
    el.className = 'cosa' + (c.linea ? ' linea' : '') + (nombre === 'pared' ? ' pared' : '');
    el.style.left = c.x + 'px';
    el.style.top = c.abajo + 'px';
    el.style.height = c.alto + 'px';
    if (c.img) el.innerHTML = `<img src="${RUTA}${c.img}.png" alt="">` + (c.sinSombra ? '' : '<div class="sombra"></div>');
    // orden de adelante y atrás: lo que apoya más abajo va adelante
    el.style.zIndex = String(Math.round(c.abajo));
    mundo.appendChild(el);
    els[nombre] = el;
  });
  els.pila.style.zIndex = '600';
  els.libro.style.zIndex = '610';
  els.escritura.style.zIndex = '620';
  els.registro.style.zIndex = '100';
  els.empresa.style.zIndex = '50';
  const imgEmpresa = els.empresa.querySelector('img');
  // precargar los edificios de cada tipo
  ['sa', 'sl', 'laboral', 'cooperativa', 'otras'].forEach(n => { const i = new Image(); i.src = RUTA + 'edif-' + n + '.png'; });

  const imgPersona = els.persona.querySelector('img');
  function cara(cual) { imgPersona.src = RUTA + (cual === 'normal' ? 'damian' : 'damian-' + cual) + '.png'; }
  // precargar las caras
  ['damian-contento', 'damian-preocupado'].forEach(n => { const i = new Image(); i.src = RUTA + n + '.png'; });

  const cartel = document.createElement('div');
  cartel.className = 'cartel-tipo';
  cartel.style.left = COSAS.empresa.x + 'px';
  cartel.style.top = (PISO - COSAS.empresa.alto - 16) + 'px';
  cartel.style.zIndex = '700';
  mundo.appendChild(cartel);

  const capa = document.createElement('div');
  capa.className = 'capa-etq';
  mundo.appendChild(capa);

  // ---------- FICHAS: las acciones o participaciones ----------
  // 60 acciones en la historia: 40 de Damian y 10 de cada socio. Se dibujan 12 fichas (8, 2 y 2).
  const fichas = [];
  const DESTINO = [];
  const pieDe = (nombre, i, col) => [COSAS[nombre].x + 46 + (i % col) * 32 - (col - 1) * 8, PISO - 12 - Math.floor(i / col) * 20];
  for (let i = 0; i < 12; i++) {
    const f = document.createElement('div');
    f.className = 'ficha';
    f.style.zIndex = '650';
    mundo.appendChild(f);
    fichas.push(f);
    DESTINO.push(i < 8 ? pieDe('persona', i, 4) : i < 10 ? pieDe('socio2', i - 8, 2) : pieDe('socio3', i - 10, 2));
  }
  const ORIGEN = i => [COSAS.pila.x - 24 + (i % 4) * 16, COSAS.pila.abajo - 30 - Math.floor(i / 4) * 6];
  const nuevas = [];
  for (let i = 0; i < 4; i++) {
    const f = document.createElement('div');
    f.className = 'ficha';
    f.style.zIndex = '650';
    f.style.background = 'linear-gradient(135deg, #fde68a, #f59e0b)';
    mundo.appendChild(f);
    nuevas.push(f);
  }
  const ORIGEN_N = i => [COSAS.empresa.x - 70 + (i % 2) * 34, PISO - 60 - Math.floor(i / 2) * 20];
  const DESTINO_N = i => pieDe('socio4', i, 2);
  let colorFicha = ['#22c55e', '#14532d'];
  function pintarFichas() {
    fichas.forEach(f => { f.style.background = `linear-gradient(135deg, ${colorFicha[0]}, ${colorFicha[1]})`; });
  }
  function ponerFicha(f, [x, y], inmediato) {
    if (inmediato) { f.style.transition = 'none'; void f.offsetWidth; }
    f.style.left = x + 'px';
    f.style.top = y + 'px';
    if (inmediato) { void f.offsetWidth; f.style.transition = ''; }
  }

  // ---------- AJUSTE AL TAMAÑO Y VISTAS ----------
  let vista = VISTAS.general;
  function ajustar() {
    const k = Math.min(raiz.clientWidth / W, raiz.clientHeight / H);
    ajuste.style.transform = `scale(${k}) translate(-50%, -50%)`;
  }
  function aplicarVista() {
    const z = vista.zoom;
    mundo.style.transform = `translate(${W / 2 - vista.x * z}px, ${H / 2 - vista.y * z}px) scale(${z})`;
  }
  window.addEventListener('resize', ajustar);
  ajustar();
  aplicarVista();

  // ---------- ESTADO ----------
  let trabajadores = false; // laboral y cooperativa: los socios son el grupo de trabajadores
  const visibles = new Set();
  const nombreReal = n => (trabajadores && ['socio2', 'socio3', 'socio4'].includes(n)) ? 'trabajadores' : n;

  function ver(nombre, siNo, inmediato = false) {
    const el = els[nombre];
    if (!el) return;
    if (inmediato) el.classList.add('ya');
    el.classList.toggle('ve', siNo);
    el.style.transform = '';
    if (siNo) visibles.add(nombre); else visibles.delete(nombre);
    if (inmediato) { void el.offsetWidth; el.classList.remove('ya'); }
  }

  // ---------- LO QUE PIDEN LOS CAPÍTULOS ----------
  function mostrar(nombre, siNo = true) {
    const n = nombreReal(nombre);
    ver(n, siNo);
    if (nombre === 'pared' && siNo) cara('contento');
    if (nombre === 'monedas') ver('pila', false);
  }
  function yaVisible(nombre) {
    ver(nombreReal(nombre), true, true);
  }
  const etiquetas = {};
  function etiqueta(nombre, html = null, tipo = '') {
    if (etiquetas[nombre]) { etiquetas[nombre].remove(); delete etiquetas[nombre]; }
    // los papeles y las personas que acompañan al cartel
    if (nombre === 'registro') ver('registro', html !== null);
    if (nombre === 'escritura') { ver('escritura', html !== null); ver('notario', html !== null && !visibles.has('banco')); }
    if (nombre === 'deuda') { ver('banco', html !== null); if (html !== null) ver('notario', false); }
    if (nombre === 'mesa') ver('libro', html !== null && /libro/i.test(html));
    if (html === null) return;
    if (tipo === 'globo') Object.entries(etiquetas).forEach(([otro, el]) => { if (el.classList.contains('globo')) { el.remove(); delete etiquetas[otro]; } });
    const a = (trabajadores && ANCLAS_TRAB[nombre]) || ANCLAS[nombre];
    if (!a) return;
    const el = document.createElement('div');
    el.className = 'etiqueta3d aparece ve ' + tipo;
    el.style.left = a[0] + 'px';
    el.style.top = a[1] + 'px';
    el.dataset.ax = a[0];
    el.dataset.ay = a[1];
    el.innerHTML = `<div class="etq-in">${html}</div>`;
    capa.appendChild(el);
    etiquetas[nombre] = el;
    reacomodar(true);
  }

  // ---------- QUE LOS CARTELES NO TAPEN CARAS NI SE PISEN ENTRE ELLOS ----------
  // Cada cartel arranca en su lugar; si tapa una cara u otro cartel, sube (y si no entra, se corre al costado).
  const CARAS = { damian: 0, socia: 0, 'socio.png': 0, 'socio-joven': 0, notario: 0, banco: 0, trabajadores: 1 };
  function caras() {
    const r = [];
    mundo.querySelectorAll('.cosa.ve').forEach(el => {
      const img = el.querySelector('img');
      if (!img) return;
      const src = img.getAttribute('src');
      const k = Object.keys(CARAS).find(n => src.includes(n));
      if (k === undefined) return;
      const w = el.offsetWidth, h = el.offsetHeight, x = el.offsetLeft - w / 2, y = el.offsetTop - h;
      if (CARAS[k]) r.push([x + w * 0.04, y - 4, x + w * 0.96, y + h * 0.3]);
      else r.push([x + w * 0.24, y - 4, x + w * 0.76, y + h * 0.22]);
      cuerpos.push([x + w * 0.15, y, x + w * 0.85, y + h]);
    });
    return r;
  }
  let cuerpos = [];
  const choca = (a, b) => a[0] < b[2] + 6 && a[2] > b[0] - 6 && a[1] < b[3] + 6 && a[3] > b[1] - 6;
  function reacomodar(alInstante = false) {
    const lista = Object.values(etiquetas);
    if (!lista.length) return;
    cuerpos = [];
    const ocupado = caras();
    // lo que se ve con la vista actual (si no, el cartel quedaría fuera de la pantalla)
    const z = vista.zoom || 1;
    const minX = Math.max(8, vista.x - W / 2 / z + 10), maxX = Math.min(W - 8, vista.x + W / 2 / z - 10);
    const techo = Math.max(10, vista.y - H / 2 / z + 12), suelo = Math.min(H - 8, vista.y + H / 2 / z - 8);
    lista.forEach(el => {
      const ax = +el.dataset.ax, ay = +el.dataset.ay;
      const w = el.offsetWidth, h = el.offsetHeight;
      const caja = (x, y) => [x - w / 2, y - h, x + w / 2, y];
      const libre = (x, y) => !ocupado.some(o => choca(caja(x, y), o));
      // busca el lugar libre más cercano a donde tenía que ir (prefiere subir antes que bajar o correrse)
      let pos = null, mejor = Infinity;
      for (let dx = -520; dx <= 520; dx += 20) {
        const x = Math.max(minX + w / 2, Math.min(maxX - w / 2, ax + dx));
        const cx = Math.abs(x - ax) * 1.4;
        if (cx >= mejor) continue;
        for (let y = techo + h; y <= suelo; y += 8) {
          let c = cx + (y <= ay ? (ay - y) : (y - ay) * 1.8);
          if (c >= mejor) continue;
          // tapar un cuerpo se puede, pero mejor si hay lugar libre
          const b = caja(x, y);
          c += cuerpos.filter(o => choca(b, o)).length * 90;
          if (c < mejor && libre(x, y)) { mejor = c; pos = [x, y]; }
        }
      }
      if (!pos) pos = [ax, Math.max(ay, techo + h)];
      if (alInstante) el.style.transition = 'none';
      el.style.left = pos[0] + 'px';
      el.style.top = pos[1] + 'px';
      if (alInstante) { void el.offsetWidth; el.style.transition = ''; }
      ocupado.push(caja(pos[0], pos[1]));
    });
  }
  setInterval(() => reacomodar(false), 150);
  // Se lo llevan para pagar la deuda: viaja hacia la empresa y desaparece
  function llevarse(nombre) {
    cara('preocupado');
    const el = els[nombre];
    if (!el) return;
    const dx = COSAS.empresa.x - COSAS[nombre].x;
    el.style.transform = `translate(-50%, -100%) translateX(${dx}px) scale(0.3)`;
    el.style.opacity = '0';
    setTimeout(() => { el.classList.remove('ve'); el.style.opacity = ''; }, 950);
  }
  function acciones(estado, inmediato = false) {
    // 'no' | 'pila' | 'repartidas'
    const ve = estado !== 'no';
    ver('pila', estado === 'pila', inmediato);
    fichas.forEach((f, i) => {
      f.classList.toggle('ve', ve);
      if (estado === 'pila') ponerFicha(f, ORIGEN(i), true);
      if (estado === 'repartidas') {
        if (inmediato) ponerFicha(f, DESTINO[i], true);
        else {
          ponerFicha(f, ORIGEN(i), true);
          setTimeout(() => ponerFicha(f, DESTINO[i], false), 60 + i * 70);
        }
      }
    });
  }
  function accionesNuevas(estado, inmediato = false) {
    nuevas.forEach((f, i) => {
      f.classList.toggle('ve', estado !== 'no');
      if (estado === 'pila') ponerFicha(f, ORIGEN_N(i), true);
      if (estado === 'repartidas') {
        if (inmediato) ponerFicha(f, DESTINO_N(i), true);
        else { ponerFicha(f, ORIGEN_N(i), true); setTimeout(() => ponerFicha(f, DESTINO_N(i), false), 80 + i * 90); }
      }
    });
  }
  function colorAcciones(color = 0x22c55e, brillo = 0x14532d) {
    const hex = n => '#' + n.toString(16).padStart(6, '0');
    // el segundo color se usa más claro para el degradado
    colorFicha = [hex(color), hex(brillo)];
    pintarFichas();
  }
  function pensar(siNo) { cara(siNo ? 'preocupado' : 'normal'); }
  function tipo(clave) {
    trabajadores = clave === 'laboral' || clave === 'cooperativa';
    // el nombre ya está escrito en el edificio: el cartelito de color queda oculto
    imgEmpresa.src = RUTA + 'edif-' + (clave || 'autonomo') + '.png';
    if (clave) { cartel.textContent = TIPOS[clave].texto; cartel.style.background = TIPOS[clave].fondo; }
    // si ya estaban los socios, cambiarlos por el grupo (o al revés)
    const habia = ['socio2', 'socio3', 'socio4', 'trabajadores'].some(n => visibles.has(n));
    if (habia) {
      ['socio2', 'socio3', 'socio4'].forEach(n => ver(n, false, true));
      ver('trabajadores', false, true);
      if (trabajadores) ver('trabajadores', true, true);
      else ['socio2', 'socio3'].forEach(n => ver(n, true, true));
    }
  }
  function limpiar() {
    Object.keys(els).forEach(n => { ver(n, false, true); els[n].style.opacity = ''; });
    Object.keys(etiquetas).forEach(n => { etiquetas[n].remove(); delete etiquetas[n]; });
    fichas.forEach(f => f.classList.remove('ve'));
    nuevas.forEach(f => f.classList.remove('ve'));
    colorAcciones();
    cara('normal');
  }
  function setVista(nombre) {
    vista = VISTAS[nombre] || VISTAS.general;
    aplicarVista();
  }

  pintarFichas();
  return {
    mostrar, yaVisible, etiqueta, llevarse, acciones, accionesNuevas, colorAcciones, pensar, tipo, limpiar, setVista,
    actualizar: () => {}, ubicarEtiquetas: () => {}
  };
}
