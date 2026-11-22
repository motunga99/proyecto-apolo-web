// ==========================================
// ESCENARIO DEL CAP (2D, con ilustraciones)
// Reemplaza al mundo 3D: el centro de formación de la empresa CAP, el profesor, Damian,
// el camión, la sucursal, el aula móvil, la oficina de exámenes con el examinador,
// los vehículos que no necesitan CAP y el calendario de los 5 años.
// Tiene las mismas funciones que la escena 3D vieja, así los capítulos no cambian.
// ==========================================

const W = 1120;
const H = 600;
const PISO = 520;      // edificios y personas
const RUTA_Y = 556;    // vehículos
const FRENTE_Y = 612;  // segunda fila de vehículos (los que no necesitan CAP)
const RUTA = 'ilustraciones/';

const COSAS = {
  empresaCAP: { img: 'edif-empresa-cap', x: 260, abajo: PISO, alto: 240 },
  profesor: { img: 'profesor', x: 505, abajo: PISO + 8, alto: 285 },
  vos: { img: 'damian', x: 615, abajo: PISO + 8, alto: 285 },
  camion: { img: 'camion', x: 800, abajo: RUTA_Y, alto: 135 },
  sucursal: { img: 'edif-sucursal', x: 1020, abajo: PISO, alto: 170 },
  aulaMovil: { img: 'aula-movil', x: 1095, abajo: RUTA_Y, alto: 132 },
  examen: { img: 'edif-oficina', x: 1565, abajo: PISO, alto: 250 },
  examinador: { img: 'examinador', x: 1795, abajo: PISO + 8, alto: 285 },
  // Los que no necesitan CAP: dos filas
  bomberos: { img: 'bomberos', x: 2250, abajo: RUTA_Y, alto: 112 },
  militar: { img: 'militar', x: 2530, abajo: RUTA_Y, alto: 112 },
  policia: { img: 'policia-van', x: 2800, abajo: RUTA_Y, alto: 100 },
  emergencia: { img: 'salvamento', x: 2390, abajo: FRENTE_Y, alto: 104 },
  tractor: { img: 'tractor', x: 2660, abajo: FRENTE_Y, alto: 118 },
  taller: { img: 'camion-taller', x: 2930, abajo: FRENTE_Y, alto: 112 }
};
const PROP = {
  'edif-empresa-cap': 700 / 468, profesor: 261 / 700, damian: 248 / 700, camion: 700 / 422, 'edif-sucursal': 637 / 457,
  'aula-movil': 700 / 303, 'edif-oficina': 700 / 531, examinador: 233 / 700, bomberos: 700 / 318, militar: 700 / 321,
  'policia-van': 700 / 323, salvamento: 700 / 364, tractor: 700 / 546, 'camion-taller': 700 / 339
};
const PERSONAS = ['profesor', 'vos', 'examinador'];

// La tarjeta de cualificación, arriba de Damian
const TARJETAS = {
  tarjetaCAP: { img: 'tarjeta-cap', titulo: 'TARJETA DE CUALIFICACIÓN', sub: 'Vale 5 años · en toda la UE', color: '#0284c7', sobre: 'vos' }
};

// El calendario de los 5 años, en el aire
const CAL = { x: 900, y: 74, ancho: 112, alto: 54, sep: 10 };
const CAL_IZQ = CAL.x - (5 * CAL.ancho + 4 * CAL.sep) / 2;

const ANCLAS_FIJAS = {
  calendario: [CAL.x, CAL.y + 74],
  cielo: [1200, 160]
};

const conPiso = (x, zoom, pantalla = 540) => ({ x, zoom, y: RUTA_Y - (pantalla - H / 2) / zoom });
const VISTAS = {
  general: conPiso(1000, 0.58, 500),
  centro: conPiso(645, 0.95),
  examen: conPiso(1550, 1.0),
  exentos: conPiso(2600, 1.1, 490)
};

const CSS = `
#escenario { position: fixed; left: 466px; right: 322px; top: 92px; bottom: 16px; z-index: 5; overflow: hidden; border-radius: 22px; }
#escenario .ajuste { position: absolute; left: 50%; top: 50%; width: ${W}px; height: ${H}px; transform-origin: 0 0; }
#escenario .mundo { position: absolute; left: 0; top: 0; width: ${W}px; height: ${H}px; transform-origin: 0 0; transition: transform 1.1s cubic-bezier(0.22, 1, 0.36, 1); }
#escenario .fondo { position: absolute; left: -2000px; right: -4000px; top: -2000px; bottom: -600px; background:
  radial-gradient(ellipse 30% 40% at 40% 70%, rgba(56, 189, 248, 0.10), transparent 70%),
  radial-gradient(ellipse 25% 30% at 60% 40%, rgba(167, 139, 250, 0.07), transparent 70%); }
#escenario .vereda { position: absolute; left: -2000px; width: 7000px; top: ${PISO}px; height: 22px;
  background: linear-gradient(180deg, rgba(148, 163, 184, 0.16), rgba(148, 163, 184, 0.05)); border-top: 1px solid rgba(148, 163, 184, 0.25); }
#escenario .ruta { position: absolute; left: -2000px; width: 7000px; top: ${PISO + 22}px; height: 140px;
  background: linear-gradient(180deg, rgba(30, 41, 59, 0.75), rgba(15, 23, 42, 0) 90%); }
#escenario .ruta::after { content: ''; position: absolute; left: 0; right: 0; top: 40px; height: 4px; opacity: 0.35;
  background: repeating-linear-gradient(90deg, #e2e8f0 0 46px, transparent 46px 92px); }
.cosa { position: absolute; transform-origin: 50% 100%; opacity: 0; pointer-events: none;
  transition: opacity 0.7s ease, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), left 2.4s cubic-bezier(0.45, 0, 0.2, 1), filter 0.6s ease;
  transform: translate(-50%, -100%) translateY(14px) scale(0.94); }
.cosa.ve { opacity: 1; transform: translate(-50%, -100%); }
.cosa.ya { transition: none !important; }
.cosa img { display: block; height: 100%; width: auto; filter: drop-shadow(0 14px 22px rgba(0, 0, 0, 0.55)); }
.cosa .sombra { position: absolute; left: 50%; bottom: -10px; width: 80%; height: 22px; transform: translateX(-50%); border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.55), transparent 70%); z-index: -1; }
.cosa.brilla img { animation: cosaLuz 1.8s ease-out; }
@keyframes cosaLuz { 30% { filter: drop-shadow(0 0 26px rgba(125, 211, 252, 0.95)) drop-shadow(0 14px 22px rgba(0, 0, 0, 0.55)) brightness(1.12); } }
.calendario { position: absolute; display: flex; gap: ${CAL.sep}px; opacity: 0; transition: opacity 0.7s ease; z-index: 300; pointer-events: none; }
.calendario.ve { opacity: 1; }
.calendario.ya { transition: none !important; }
.cal-anio { width: ${CAL.ancho}px; height: ${CAL.alto}px; border-radius: 12px; display: flex; align-items: center; justify-content: center;
  font: 900 17px 'Nunito', sans-serif; color: #e2e8f0; background: #475569; border: 2px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.45); transition: background 0.6s ease, color 0.6s ease, box-shadow 0.6s ease; white-space: nowrap; }
.cal-anio.on { background: #34f5a0; color: #064e3b; box-shadow: 0 0 0 3px rgba(52, 245, 160, 0.35), 0 0 22px rgba(52, 245, 160, 0.6); }
.cal-anio.on.ultimo { background: #facc15; color: #713f12; box-shadow: 0 0 0 3px rgba(250, 204, 21, 0.4), 0 0 24px rgba(250, 204, 21, 0.7); }
#escenario .capa-etq { position: absolute; left: 0; top: 0; width: ${W}px; height: ${H}px; pointer-events: none; z-index: 5000; }
#escenario .etiqueta3d { width: max-content; opacity: 0; transition: opacity 0.45s ease, left 0.6s cubic-bezier(0.22, 1, 0.36, 1), top 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
#escenario .etiqueta3d.ve { opacity: 1; }
#escenario .etiqueta3d.fuera { opacity: 0 !important; }
.tarjeta-doc { position: absolute; width: 186px; transform: translate(-50%, -100%); opacity: 0; transition: opacity 0.6s ease, left 0.5s ease, top 0.5s ease;
  display: flex; align-items: center; gap: 8px; padding: 6px 8px; border-radius: 12px; background: rgba(15, 23, 42, 0.92); border: 2px solid; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5); }
.tarjeta-doc.ve { opacity: 1; }
.tarjeta-doc.fuera { opacity: 0 !important; }
.tarjeta-doc.aparece { animation: tarjLuz 2s ease-out; }
@keyframes tarjLuz { 0% { filter: brightness(1.6); } 30% { box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.35), 0 0 30px rgba(255, 255, 255, 0.6); } 100% { filter: none; } }
.tarjeta-doc img { width: 54px; height: 42px; object-fit: contain; flex: none; filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.6)); }
.tarjeta-doc b { display: block; color: #fff; font: 900 12px 'Nunito', sans-serif; line-height: 1.15; }
.tarjeta-doc span { display: block; color: #cbd5e1; font: 700 10.5px 'Nunito', sans-serif; line-height: 1.2; margin-top: 2px; }
@media (max-width: 1100px) { #escenario { left: 8px; right: 8px; top: 84px; bottom: auto; height: 46vh; } }
`;

export function crearEscenarioCap() {
  const estilo = document.createElement('style');
  estilo.textContent = CSS;
  document.head.appendChild(estilo);

  const raiz = document.createElement('div');
  raiz.id = 'escenario';
  raiz.innerHTML = `<div class="ajuste"><div class="mundo"><div class="fondo"></div><div class="vereda"></div><div class="ruta"></div></div><div class="capa-etq"></div></div>`;
  document.body.appendChild(raiz);
  const ajuste = raiz.querySelector('.ajuste');
  const mundo = raiz.querySelector('.mundo');
  const capa = raiz.querySelector('.capa-etq');

  // ---------- LAS COSAS ----------
  const els = {};
  const posX = {};
  Object.entries(COSAS).forEach(([nombre, c]) => {
    const el = document.createElement('div');
    el.className = 'cosa';
    el.style.left = c.x + 'px';
    el.style.top = c.abajo + 'px';
    el.style.height = c.alto + 'px';
    el.style.width = Math.round(c.alto * PROP[c.img]) + 'px';
    el.innerHTML = `<img src="${RUTA}${c.img}.png" alt="">` + '<div class="sombra"></div>';
    el.style.zIndex = String(c.abajo);
    mundo.appendChild(el);
    els[nombre] = el;
    posX[nombre] = c.x;
  });
  const imgVos = els.vos.querySelector('img');
  function cara(cual) { imgVos.src = RUTA + (cual === 'normal' ? 'damian' : 'damian-' + cual) + '.png'; }
  ['damian-contento'].forEach(n => { const i = new Image(); i.src = RUTA + n + '.png'; });

  // El calendario de los 5 años
  const calendario = document.createElement('div');
  calendario.className = 'calendario';
  calendario.style.left = CAL_IZQ + 'px';
  calendario.style.top = (CAL.y - CAL.alto) + 'px';
  calendario.innerHTML = [1, 2, 3, 4, 5].map(i => `<div class="cal-anio${i === 5 ? ' ultimo' : ''}">${i === 5 ? 'AÑO 5 · 35 h' : 'AÑO ' + i}</div>`).join('');
  mundo.appendChild(calendario);
  const bloques = [...calendario.querySelectorAll('.cal-anio')];

  // La tarjeta de cualificación (en la capa de carteles: siempre se lee bien)
  const tarjetas = {};
  Object.entries(TARJETAS).forEach(([nombre, t]) => {
    const el = document.createElement('div');
    el.className = 'tarjeta-doc';
    el.style.borderColor = t.color;
    el.innerHTML = `<img src="${RUTA}${t.img}.png" alt=""><div><b>${t.titulo}</b><span>${t.sub}</span></div>`;
    capa.appendChild(el);
    tarjetas[nombre] = el;
  });

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
  const aPantalla = (x, y) => [W / 2 + (x - vista.x) * vista.zoom, H / 2 + (y - vista.y) * vista.zoom];
  window.addEventListener('resize', ajustar);
  ajustar();
  aplicarVista();

  // ---------- ESTADO ----------
  const visibles = new Set();
  function ver(nombre, siNo, inmediato = false) {
    if (nombre === 'calendario') {
      if (inmediato) calendario.classList.add('ya');
      calendario.classList.toggle('ve', siNo);
      if (siNo) visibles.add(nombre); else visibles.delete(nombre);
      if (inmediato) { void calendario.offsetWidth; calendario.classList.remove('ya'); }
      return;
    }
    if (tarjetas[nombre]) {
      const t = tarjetas[nombre];
      if (siNo && !visibles.has(nombre) && !inmediato) { t.classList.remove('aparece'); void t.offsetWidth; t.classList.add('aparece'); }
      t.classList.toggle('ve', siNo);
      if (siNo) visibles.add(nombre); else visibles.delete(nombre);
      ubicarTarjetas();
      return;
    }
    const el = els[nombre];
    if (!el) return;
    if (inmediato) el.classList.add('ya');
    el.classList.toggle('ve', siNo);
    if (siNo) visibles.add(nombre); else visibles.delete(nombre);
    if (inmediato) { void el.offsetWidth; el.classList.remove('ya'); }
  }

  function mostrar(nombre, siNo = true) { ver(nombre, siNo); }
  function yaVisible(nombre) { ver(nombre, true, true); }

  function anclaMundo(nombre) {
    if (ANCLAS_FIJAS[nombre]) return ANCLAS_FIJAS[nombre];
    const n = nombre === 'globo' ? 'vos' : nombre;
    const c = COSAS[n];
    if (!c) return null;
    return [posX[n], c.abajo - c.alto - 12];
  }

  const etiquetas = {};
  function etiqueta(nombre, html = null, tipo = '') {
    if (etiquetas[nombre]) { etiquetas[nombre].remove(); delete etiquetas[nombre]; }
    if (html === null) return;
    if (tipo === 'globo') Object.entries(etiquetas).forEach(([otro, el]) => { if (el.classList.contains('globo')) { el.remove(); delete etiquetas[otro]; } });
    if (!anclaMundo(nombre)) return;
    if ((nombre === 'vos' || nombre === 'globo') && (tipo === 'precio' || tipo === 'globo') && /tarjeta|recupero|alcanza/i.test(html)) cara('contento');
    const el0 = els[nombre === 'globo' ? 'vos' : nombre];
    if (el0) { el0.classList.remove('brilla'); void el0.offsetWidth; el0.classList.add('brilla'); }
    const el = document.createElement('div');
    el.className = 'etiqueta3d aparece ve ' + tipo;
    el.dataset.nombre = nombre;
    el.innerHTML = `<div class="etq-in">${html}</div>`;
    capa.appendChild(el);
    etiquetas[nombre] = el;
    reacomodar(true);
  }

  // ---------- QUE LOS CARTELES NO TAPEN CARAS NI SE PISEN ENTRE ELLOS ----------
  const choca = (a, b) => a[0] < b[2] + 6 && a[2] > b[0] - 6 && a[1] < b[3] + 6 && a[3] > b[1] - 6;
  function rectPantalla(nombre, x0 = 0, x1 = 1, y0 = 0, y1 = 1) {
    const c = COSAS[nombre];
    const w = c.alto * PROP[c.img];
    const izq = posX[nombre] - w / 2, arr = c.abajo - c.alto;
    const [a, b] = aPantalla(izq + w * x0, arr + c.alto * y0);
    const [d, e] = aPantalla(izq + w * x1, arr + c.alto * y1);
    return [a, b, d, e];
  }
  function ubicarTarjetas() {
    Object.entries(TARJETAS).forEach(([nombre, t]) => {
      const c = COSAS[t.sobre];
      const [x, y] = aPantalla(posX[t.sobre], c.abajo - c.alto - 6);
      tarjetas[nombre].style.left = x + 'px';
      tarjetas[nombre].style.top = y + 'px';
      tarjetas[nombre].classList.toggle('fuera', x < -60 || x > W + 60);
    });
  }
  function reacomodar(alInstante = false) {
    ubicarTarjetas();
    const lista = Object.values(etiquetas);
    if (!lista.length) return;
    const ocupado = [];
    const cuerpos = [];
    visibles.forEach(n => {
      if (PERSONAS.includes(n)) {
        ocupado.push(rectPantalla(n, 0.18, 0.82, -0.02, 0.24));
        cuerpos.push(rectPantalla(n, 0.12, 0.88, 0, 1));
      } else if (tarjetas[n]) {
        const el = tarjetas[n];
        const x = parseFloat(el.style.left), y = parseFloat(el.style.top);
        ocupado.push([x - el.offsetWidth / 2, y - el.offsetHeight, x + el.offsetWidth / 2, y]);
      } else if (n === 'calendario') {
        const [a, b] = aPantalla(CAL_IZQ, CAL.y - CAL.alto);
        const [d, e] = aPantalla(CAL_IZQ + 5 * CAL.ancho + 4 * CAL.sep, CAL.y);
        ocupado.push([a, b, d, e]);
      } else if (COSAS[n] && COSAS[n].abajo >= RUTA_Y) {
        cuerpos.push(rectPantalla(n, 0.05, 0.95, 0.1, 1));
      }
    });
    const minX = 8, maxX = W - 8, techo = 10, suelo = H - 8;
    lista.forEach(el => {
      const am = anclaMundo(el.dataset.nombre);
      const [ax, ay] = aPantalla(am[0], am[1]);
      const fuera = ax < -40 || ax > W + 40;
      el.classList.toggle('fuera', fuera);
      if (fuera) return;
      const w = el.offsetWidth, h = el.offsetHeight;
      const caja = (x, y) => [x - w / 2, y - h, x + w / 2, y];
      const libre = (x, y) => !ocupado.some(o => choca(caja(x, y), o));
      let pos = null, mejor = Infinity;
      for (let dx = -520; dx <= 520; dx += 20) {
        const x = Math.max(minX + w / 2, Math.min(maxX - w / 2, ax + dx));
        const cx = Math.abs(x - ax) * 1.4;
        if (cx >= mejor) continue;
        for (let y = techo + h; y <= suelo; y += 8) {
          let c = cx + (y <= ay ? (ay - y) : (y - ay) * 1.8);
          if (c >= mejor) continue;
          const b = caja(x, y);
          c += cuerpos.filter(o => choca(b, o)).length * 90;
          if (c < mejor && libre(x, y)) { mejor = c; pos = [x, y]; }
        }
      }
      if (!pos) pos = [Math.max(minX + w / 2, Math.min(maxX - w / 2, ax)), Math.max(ay, techo + h)];
      if (alInstante) el.style.transition = 'none';
      el.style.left = pos[0] + 'px';
      el.style.top = pos[1] + 'px';
      if (alInstante) { void el.offsetWidth; el.style.transition = ''; }
      ocupado.push(caja(pos[0], pos[1]));
    });
  }
  setInterval(() => reacomodar(false), 150);

  // Enciende los primeros n años del calendario (0 = todos apagados)
  function anios(n) {
    bloques.forEach((b, i) => b.classList.toggle('on', i < n));
  }
  // Mueve el camión por la ruta (s = metros recorridos; 36 es donde está parado)
  function camionA(s, inmediato = false) {
    const x = COSAS.camion.x + (s - 36) * 10;
    posX.camion = x;
    const el = els.camion;
    if (inmediato) el.classList.add('ya');
    el.style.left = x + 'px';
    if (inmediato) { void el.offsetWidth; el.classList.remove('ya'); }
  }
  function tipo() {}
  function limpiar() {
    Object.keys(els).forEach(n => { ver(n, false, true); els[n].classList.remove('brilla'); });
    Object.keys(tarjetas).forEach(n => ver(n, false, true));
    ver('calendario', false, true);
    Object.keys(etiquetas).forEach(n => { etiquetas[n].remove(); delete etiquetas[n]; });
    camionA(36, true);
    anios(0);
    cara('normal');
  }
  function setVista(nombre) {
    vista = VISTAS[nombre] || VISTAS.general;
    aplicarVista();
    reacomodar(true);
  }

  return { mostrar, yaVisible, etiqueta, camionA, anios, tipo, limpiar, setVista, actualizar: () => {}, ubicarEtiquetas: () => {} };
}
