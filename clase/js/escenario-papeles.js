// ==========================================
// ESCENARIO DE PAPELES (2D, con ilustraciones)
// Reemplaza al mundo 3D: la oficina de Transportes, Proyecto Apolo, Damian, el camión,
// el inspector, Frutas López, la fábrica de Ana y los vehículos exentos, sobre fondo oscuro.
// Tiene las mismas funciones que la escena 3D vieja, así los capítulos no cambian.
// ==========================================

const W = 1120;
const H = 600;
const PISO = 520;      // donde apoyan las personas y los edificios
const RUTA_Y = 552;    // donde apoyan los vehículos (más adelante)
const RUTA = 'ilustraciones/';

// Dónde va cada cosa en el mundo: x = centro, abajo = dónde apoya, alto = tamaño
const COSAS = {
  oficina: { img: 'edif-oficina', x: 170, abajo: PISO, alto: 250 },
  apolo: { img: 'edif-apolo', x: 570, abajo: PISO, alto: 220 },
  vos: { img: 'damian', x: 830, abajo: PISO, alto: 290 },
  camion: { img: 'camion', x: 1000, abajo: RUTA_Y, alto: 135 },
  inspector: { img: 'inspector', x: 1185, abajo: PISO, alto: 290 },
  lopez: { img: 'lopez', x: 1185, abajo: PISO, alto: 290 },
  frutas: { img: 'edif-frutas', x: 1430, abajo: PISO, alto: 210 },
  furgoneta: { img: 'furgoneta', x: 1700, abajo: RUTA_Y, alto: 100 },
  fabrica: { img: 'edif-fabrica', x: 1990, abajo: PISO, alto: 200 },
  ana: { img: 'ana', x: 2240, abajo: PISO, alto: 280 },
  camionAna: { img: 'camion-ana', x: 2430, abajo: RUTA_Y, alto: 140 },
  // Exentos: los de "nunca" y los de "con condición" no salen juntos, comparten la zona
  oficial: { img: 'furgoneta-ayto', x: 2850, abajo: RUTA_Y, alto: 105 },
  funebre: { img: 'funebre', x: 3075, abajo: RUTA_Y, alto: 72 },
  moto: { img: 'moto', x: 3290, abajo: RUTA_Y, alto: 98 },
  tractor: { img: 'tractor', x: 3510, abajo: RUTA_Y, alto: 140 },
  blindado: { img: 'blindado', x: 2900, abajo: RUTA_Y, alto: 115 },
  grua: { img: 'grua', x: 3180, abajo: RUTA_Y, alto: 118 },
  ambulancia: { img: 'ambulancia', x: 3460, abajo: RUTA_Y, alto: 112 }
};
// Ancho de cada imagen dividido su alto (para calcular sin esperar a que cargue)
const PROP = {
  'edif-oficina': 700 / 531, 'edif-apolo': 700 / 371, damian: 248 / 700, camion: 700 / 422, inspector: 268 / 700,
  lopez: 366 / 700, 'edif-frutas': 700 / 439, furgoneta: 700 / 366, 'edif-fabrica': 700 / 368, ana: 195 / 500,
  'camion-ana': 700 / 422, 'furgoneta-ayto': 700 / 384, funebre: 700 / 229, moto: 700 / 415, tractor: 700 / 546,
  blindado: 700 / 373, grua: 700 / 395, ambulancia: 700 / 364
};
// Las personas: su cara no se puede tapar con un cartel
const PERSONAS = ['vos', 'inspector', 'lopez', 'ana'];

// Lugares fijos de algunos carteles (en el aire)
const ANCLAS_FIJAS = {
  cielo: [2090, 150],
  cieloOficina: [560, 150]
};

// Las tarjetas de la autorización que aparecen sobre cada vehículo
const TARJETAS = {
  tarjetaMDPE: { sobre: 'camion', letras: 'MDPE', sub: 'Público · más de 3,5 t', filtro: 'none', color: '#16a34a' },
  tarjetaMDLE: { sobre: 'furgoneta', letras: 'MDLE', sub: 'Público · hasta 3,5 t', filtro: 'hue-rotate(80deg)', color: '#0284c7' },
  tarjetaMPCE: { sobre: 'camionAna', letras: 'MPCE', sub: 'Privado complementario', filtro: 'hue-rotate(-115deg) saturate(1.3)', color: '#ea580c' }
};

// Vistas (botones de arriba). x, y = centro de lo que se mira; zoom = cuánto se acerca
const ver540 = z => RUTA_Y - 240 / z;
const VISTAS = {
  general: { x: 1665, y: ver540(0.62), zoom: 0.62 },
  deposito: { x: 985, y: ver540(0.9), zoom: 0.9 },
  fabrica: { x: 2090, y: ver540(1.1), zoom: 1.1 },
  exentos: { x: 3180, y: ver540(1.15), zoom: 1.15 },
  oficina: { x: 560, y: ver540(1), zoom: 1 }
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
#escenario .ruta { position: absolute; left: -2000px; width: 7000px; top: ${PISO + 22}px; height: 120px;
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
.cartel-web { position: absolute; transform: translate(-50%, -100%); padding: 5px 12px; border-radius: 10px; white-space: nowrap;
  background: #0f172a; color: #22d3ee; font: 700 14px 'Rajdhani', sans-serif; letter-spacing: 0.05em; border: 1px solid rgba(34, 211, 238, 0.45);
  box-shadow: 0 0 16px rgba(34, 211, 238, 0.35); opacity: 0; transition: opacity 0.7s ease; }
.cartel-web.ve { opacity: 1; }
#escenario .capa-etq { position: absolute; left: 0; top: 0; width: ${W}px; height: ${H}px; pointer-events: none; z-index: 5000; }
#escenario .etiqueta3d { width: max-content; opacity: 0; transition: opacity 0.45s ease, left 0.6s cubic-bezier(0.22, 1, 0.36, 1), top 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
#escenario .etiqueta3d.ve { opacity: 1; }
#escenario .etiqueta3d.fuera { opacity: 0 !important; }
.tarjeta-aut { position: absolute; width: 132px; transform: translate(-50%, -100%); opacity: 0; transition: opacity 0.6s ease, left 0.6s ease, top 0.6s ease; }
.tarjeta-aut.ve { opacity: 1; }
.tarjeta-aut.aparece { animation: tarjLuz 2s ease-out; }
@keyframes tarjLuz { 0% { filter: brightness(1.5); } 30% { filter: brightness(1.2) drop-shadow(0 0 22px rgba(255, 255, 255, 0.7)); } 100% { filter: none; } }
.tarjeta-aut .tarj { position: relative; }
.tarjeta-aut img { display: block; width: 100%; height: auto; filter: drop-shadow(0 8px 14px rgba(0, 0, 0, 0.6)); }
.tarjeta-aut .letras { position: absolute; left: 0; right: 0; top: 50%; transform: translateY(-50%) rotate(-12deg); text-align: center;
  font: 900 30px 'Nunito', sans-serif; color: #ffffff; letter-spacing: 0.04em; text-shadow: 0 2px 0 rgba(0, 0, 0, 0.45), 0 0 10px rgba(0, 0, 0, 0.5); }
.tarjeta-aut .sub { margin-top: 2px; padding: 3px 8px; border-radius: 8px; background: #0f172a; color: #e2e8f0; text-align: center;
  font: 800 12px 'Nunito', sans-serif; white-space: nowrap; }
@media (max-width: 1100px) { #escenario { left: 8px; right: 8px; top: 84px; bottom: auto; height: 46vh; } }
`;

export function crearEscenarioPapeles() {
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
    // lo que apoya más abajo va adelante
    el.style.zIndex = String(c.abajo);
    mundo.appendChild(el);
    els[nombre] = el;
    posX[nombre] = c.x;
  });
  const imgVos = els.vos.querySelector('img');
  function cara(cual) { imgVos.src = RUTA + (cual === 'normal' ? 'damian' : 'damian-' + cual) + '.png'; }
  ['damian-contento', 'damian-preocupado'].forEach(n => { const i = new Image(); i.src = RUTA + n + '.png'; });

  // El cartel de la web, arriba del edificio de Proyecto Apolo
  const web = document.createElement('div');
  web.className = 'cartel-web';
  web.textContent = 'www.proyectoapolo.com.ar';
  web.style.left = COSAS.apolo.x + 'px';
  web.style.top = (PISO - COSAS.apolo.alto - 8) + 'px';
  web.style.zIndex = '400';
  mundo.appendChild(web);

  // Las tarjetas de la autorización (van en la capa de carteles: siempre se leen bien)
  const tarjetas = {};
  Object.entries(TARJETAS).forEach(([nombre, t]) => {
    const el = document.createElement('div');
    el.className = 'tarjeta-aut';
    el.innerHTML = `<div class="tarj"><img src="${RUTA}autorizacion.png" alt="" style="filter:${t.filtro} drop-shadow(0 8px 14px rgba(0,0,0,0.6))"><div class="letras">${t.letras}</div></div><div class="sub" style="border:2px solid ${t.color}">${t.sub}</div>`;
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
  // del mundo a la pantalla (con la vista actual)
  const aPantalla = (x, y) => [W / 2 + (x - vista.x) * vista.zoom, H / 2 + (y - vista.y) * vista.zoom];
  window.addEventListener('resize', ajustar);
  ajustar();
  aplicarVista();

  // ---------- ESTADO ----------
  const visibles = new Set();
  function ver(nombre, siNo, inmediato = false) {
    if (nombre === 'web') {
      web.classList.toggle('ve', siNo);
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

  // ---------- LO QUE PIDEN LOS CAPÍTULOS ----------
  function mostrar(nombre, siNo = true) { ver(nombre, siNo); }
  function yaVisible(nombre) { ver(nombre, true, true); }

  // Lugar de un cartel en el mundo: arriba de la cosa (o en el aire)
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
    // Damian cambia de cara según lo que pasa
    if ((nombre === 'vos' || nombre === 'globo') && tipo === 'precio') cara('contento');
    if (nombre === 'inspector' && tipo === 'deuda') cara('preocupado');
    // la cosa del cartel se ilumina un momento
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
  // Rectángulo en pantalla de una cosa (parte = de qué alto a qué alto, 0 = arriba, 1 = abajo)
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
      } else if (COSAS[n] && COSAS[n].abajo === RUTA_Y) {
        cuerpos.push(rectPantalla(n, 0.05, 0.95, 0.1, 1));
      }
    });
    const minX = 8, maxX = W - 8, techo = 10, suelo = H - 8;
    lista.forEach(el => {
      const am = anclaMundo(el.dataset.nombre);
      const [ax, ay] = aPantalla(am[0], am[1]);
      // si lo que señala quedó fuera de lo que se ve (otra vista), el cartel no se muestra
      const fuera = ax < -40 || ax > W + 40;
      el.classList.toggle('fuera', fuera);
      if (fuera) return;
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
      if (!pos) pos = [Math.max(minX + w / 2, Math.min(maxX - w / 2, ax)), Math.max(ay, techo + h)];
      if (alInstante) el.style.transition = 'none';
      el.style.left = pos[0] + 'px';
      el.style.top = pos[1] + 'px';
      if (alInstante) { void el.offsetWidth; el.style.transition = ''; }
      ocupado.push(caja(pos[0], pos[1]));
    });
  }
  setInterval(() => reacomodar(false), 150);

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
    ver('web', false);
    Object.keys(etiquetas).forEach(n => { etiquetas[n].remove(); delete etiquetas[n]; });
    camionA(36, true);
    cara('normal');
  }
  function setVista(nombre) {
    vista = VISTAS[nombre] || VISTAS.general;
    aplicarVista();
    reacomodar(true);
  }

  return { mostrar, yaVisible, etiqueta, camionA, tipo, limpiar, setVista, actualizar: () => {}, ubicarEtiquetas: () => {} };
}
