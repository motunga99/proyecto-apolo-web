// ==========================================
// ARRANQUE DE LA PÁGINA: MECÁNICA, CONSUMO Y MARCHAS
// Usa el mismo mundo y el mismo camión 3D que Kamm y subviraje.
// ==========================================
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { crearMundo } from './mundo.js';
import { crearEscenaMecanica, VERDE, ROJA, RPM_MAX } from './escena-mecanica.js';
import { montarAnim } from './anim-adr.js';
import { crearClaseMecanica } from './clase-adr.js';
import { crearEscenarioMercado } from './escenario-mercado.js';
import { hacerMovible, hacerAchicable } from './ventana.js';

const contenedor = document.getElementById('lienzo');
const escena = new THREE.Scene();
const camara = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 400);
const render = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
render.setSize(window.innerWidth, window.innerHeight);
render.setPixelRatio(Math.min(window.devicePixelRatio, 2));
render.shadowMap.enabled = true;
render.shadowMap.type = THREE.PCFSoftShadowMap;
render.toneMapping = THREE.ACESFilmicToneMapping;
render.toneMappingExposure = 1.05;
contenedor.appendChild(render.domElement);

const mundo = crearMundo(escena);
dibujarCuentavueltas();
const sim = crearEscenaMecanica({ escena, mundo });

// ---------- CÁMARA QUE SIGUE A LOS CAMIONES ----------
const VISTAS = {
  perspectiva: { pos: [12, 10, 22], mira: [0, 1.5, 0] },
  arriba: { pos: [2, 40, 9], mira: [2, 0, 0] },
  costado: { pos: [2, 4, 24], mira: [2, 1.8, 0] },
  ruedas: { pos: [6, 2.2, 9], mira: [1, 0.6, 0] }
};
const posSim = sim.posicion();
const ultimaPos = posSim.clone();
const destinoPos = new THREE.Vector3();
const destinoMira = new THREE.Vector3();
const distanciaPos = new THREE.Vector3();
const distanciaMira = new THREE.Vector3();
let moviendoCamara = false;
function calcularDestino(nombre) {
  const v = VISTAS[nombre] || VISTAS.perspectiva;
  distanciaPos.set(...v.pos);
  distanciaMira.set(...v.mira);
  destinoPos.copy(posSim).add(distanciaPos);
  destinoMira.copy(posSim).add(distanciaMira);
}
calcularDestino('perspectiva');
camara.position.copy(destinoPos);

const controles = new OrbitControls(camara, render.domElement);
controles.enableDamping = true;
controles.dampingFactor = 0.06;
controles.maxPolarAngle = Math.PI / 2 - 0.04;
controles.minDistance = 2.5;
controles.maxDistance = 90;
controles.target.copy(destinoMira);
controles.addEventListener('start', () => { moviendoCamara = false; });

const botonesVista = document.querySelectorAll('[data-vista]');
function setVista(nombre) {
  calcularDestino(nombre);
  moviendoCamara = true;
  botonesVista.forEach(b => b.classList.toggle('activo', b.dataset.vista === nombre));
}
botonesVista.forEach(b => b.addEventListener('click', () => setVista(b.dataset.vista)));

// Cuando la simulación vuelve a empezar, la cámara salta con los camiones (sin viajar)
let saltoPendiente = false;

// ---------- DÍA / NOCHE ----------
let noche = false;
const botonNoche = document.getElementById('boton-noche');
botonNoche.addEventListener('click', () => {
  noche = !noche;
  mundo.setNoche(noche);
  sim.camiones.A.setNoche(noche);
  sim.camiones.B.setNoche(noche);
  botonNoche.textContent = noche ? 'Día' : 'Noche';
  botonNoche.classList.toggle('noche', noche);
});

// En el celular parado: se ve más ancho y el camión queda arriba (abajo va la explicación)
function ajustarCamara() {
  const w = window.innerWidth, h = window.innerHeight;
  camara.aspect = w / h;
  if (w < h && w <= 700) { camara.fov = 68; camara.setViewOffset(w, h, 0, Math.round(h * 0.12), w, h); }
  else if (w > h && h <= 520) { camara.fov = 42; camara.setViewOffset(w, h, Math.round(w * 0.21), 0, w, h); }
  else { camara.fov = 42; camara.clearViewOffset(); }
  camara.updateProjectionMatrix();
  render.setSize(w, h);
}
window.addEventListener('resize', ajustarCamara);
ajustarCamara();

// ---------- CARTELES QUE SIGUEN A LOS CAMIONES ----------
const capa = document.getElementById('etiquetas');
const carteles = {};
function etiqueta(nombre, html = null, tipo = '') {
  if (carteles[nombre]) { carteles[nombre].el.remove(); delete carteles[nombre]; }
  if (html === null) return;
  if (tipo === 'globo') Object.keys(carteles).forEach(n => { if (carteles[n].el.classList.contains('globo')) { carteles[n].el.remove(); delete carteles[n]; } });
  const el = document.createElement('div');
  el.className = 'etiqueta3d aparece ' + tipo;
  el.innerHTML = `<div class="etq-in">${html}</div>`;
  capa.appendChild(el);
  carteles[nombre] = { el, nombre };
}
function limpiarCarteles() { Object.keys(carteles).forEach(n => etiqueta(n, null)); }
const v3 = new THREE.Vector3();
function ubicarCarteles() {
  const cajas = [];
  Object.values(carteles).forEach(c => {
    const a = sim.anclaDe(c.nombre);
    if (!a) { c.el.style.opacity = 0; return; }
    v3.copy(a).project(camara);
    if (v3.z > 1) { c.el.style.opacity = 0; return; }
    let x = (v3.x + 1) / 2 * window.innerWidth;
    let y = (1 - v3.y) / 2 * window.innerHeight;
    const w = c.el.offsetWidth, h = c.el.offsetHeight;
    // si se pisa con otro cartel, sube
    for (let i = 0; i < 12; i++) {
      const caja = [x - w / 2, y - h, x + w / 2, y];
      const pisa = cajas.some(o => caja[0] < o[2] + 6 && caja[2] > o[0] - 6 && caja[1] < o[3] + 6 && caja[3] > o[1] - 6);
      if (!pisa) break;
      y -= 22;
    }
    y = Math.max(h + 70, y);
    cajas.push([x - w / 2, y - h, x + w / 2, y]);
    c.el.style.opacity = 1;
    c.el.style.left = x + 'px';
    c.el.style.top = y + 'px';
  });
}

// ---------- DIBUJO O ANIMACIÓN QUE ACOMPAÑA EL PASO ----------
const elFigura = document.getElementById('figura');
const elImg = document.getElementById('figura-img');
const elAnim = document.getElementById('figura-anim');
let detenerAnim = null;
let enEscenario = false;
const escAnim = document.getElementById('esc-anim');
const escImg = document.getElementById('esc-img');
const escCaja = document.getElementById('esc-caja');
// Si el paso no usa el camión ("quieto"), se saca el mundo y se muestra el fondo oscuro
function ponerEscenario(si) {
  enEscenario = si;
  document.body.classList.toggle('en-escenario', si);
}
function figura(f) {
  if (detenerAnim) { detenerAnim(); detenerAnim = null; }
  elAnim.innerHTML = ''; escAnim.innerHTML = '';
  if (enEscenario) {
    elFigura.style.display = 'none';
    escImg.style.display = 'none'; escAnim.style.display = 'none';
    document.getElementById('esc-titulo').innerHTML = f ? (f.titulo || '') : '';
    document.getElementById('esc-texto').innerHTML = f ? (f.texto || '') : '';
    if (!f) return;
    if (f.anim) { escAnim.style.display = ''; detenerAnim = montarAnim(escAnim, f.anim, { pausado: () => tiempo.pausado }); }
    else { escImg.src = 'ilustraciones/' + f.img + '.png'; escImg.style.display = ''; }
    escCaja.classList.remove('aparece'); void escCaja.offsetWidth; escCaja.classList.add('aparece');
    return;
  }
  if (!f) { elFigura.style.display = 'none'; return; }
  if (f.anim) {
    elImg.style.display = 'none'; elAnim.style.display = '';
    elFigura.classList.add('con-anim');
    detenerAnim = montarAnim(elAnim, f.anim, { pausado: () => tiempo.pausado });
  } else {
    elAnim.style.display = 'none'; elImg.style.display = '';
    elFigura.classList.remove('con-anim');
    elImg.src = 'ilustraciones/' + f.img + '.png';
  }
  document.getElementById('figura-titulo').innerHTML = f.titulo || '';
  document.getElementById('figura-texto').innerHTML = f.texto || '';
  elFigura.style.display = '';
  elFigura.classList.remove('aparece'); void elFigura.offsetWidth; elFigura.classList.add('aparece');
}

// ---------- CUENTARREVOLUCIONES DE LA CABINA (zona verde y roja) ----------
function dibujarCuentavueltas() {
  const cx = 70, cy = 72, r = 50;
  const ang = rpm => (-135 + rpm / RPM_MAX * 270 - 90) * Math.PI / 180;
  const arco = (a, b) => {
    const p1 = [cx + r * Math.cos(ang(a)), cy + r * Math.sin(ang(a))];
    const p2 = [cx + r * Math.cos(ang(b)), cy + r * Math.sin(ang(b))];
    const grande = (b - a) / RPM_MAX * 270 > 180 ? 1 : 0;
    return `M${p1[0].toFixed(1)} ${p1[1].toFixed(1)} A${r} ${r} 0 ${grande} 1 ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  };
  document.getElementById('cab-arco').setAttribute('d', arco(0, RPM_MAX));
  document.getElementById('cab-verde').setAttribute('d', arco(VERDE[0], VERDE[1]));
  document.getElementById('cab-roja').setAttribute('d', arco(ROJA, RPM_MAX));
  const marcas = [];
  for (let k = 0; k <= 3; k++) {
    const a = ang(k * 1000);
    marcas.push(`<text x="${(cx + (r - 14) * Math.cos(a)).toFixed(1)}" y="${(cy + (r - 14) * Math.sin(a) + 4).toFixed(1)}" text-anchor="middle" font-size="10" fill="#94a3b8">${k}</text>`);
  }
  document.getElementById('cab-marcas').innerHTML = marcas.join('');
}

// ---------- MODO CLASE ----------
const tiempo = { pausado: false, escala: 0.5 }; // 0.5 = cámara lenta
const fachada = {
  configurar: m => { sim.configurar(m); saltoPendiente = true; ponerEscenario(!m || m === 'quieto'); },
  etiqueta, limpiarCarteles, figura,
  alCambiarEstado: fn => sim.alCambiarEstado(fn)
};
// ---------- ESCENAS CON MUÑEQUITOS (Papeles y Quién hace qué) ----------
const historia = crearEscenarioMercado({ id: 'historia', z: 8 });
const raizHistoria = document.getElementById('historia');
raizHistoria.style.display = 'none';
fachada.historia = {
  ...historia,
  activar(esc, base) {
    historia.limpiar();
    if (!esc) { raizHistoria.style.display = 'none'; escCaja.style.visibility = ''; historia.preparar({}); return; }
    raizHistoria.style.display = '';
    escCaja.style.visibility = 'hidden';
    historia.preparar(esc);
    base.forEach(n => historia.yaVisible(n));
  }
};
const clase = crearClaseMecanica({ escena: fachada, tiempo, setVista });

// ---------- VENTANAS QUE SE MUEVEN ----------
const tarjetaClase = document.getElementById('clase');
hacerMovible(tarjetaClase, tarjetaClase.querySelector('.clase-cabecera'), 'clase-mecanica-v1');
hacerAchicable(tarjetaClase, document.getElementById('clase-achicar'));
const cabina = document.getElementById('cabina');
hacerMovible(cabina, cabina.querySelector('.cabina-cabecera'), 'cabina-mecanica-v1');
hacerAchicable(cabina, document.getElementById('cabina-achicar'));

// ---------- ANIMACIÓN ----------
const reloj = new THREE.Clock();
const desplazamiento = new THREE.Vector3();
function animar() {
  requestAnimationFrame(animar);
  const delta = Math.min(reloj.getDelta(), 0.05);
  const dtSim = tiempo.pausado ? 0 : delta * tiempo.escala;
  sim.actualizar(dtSim);
  clase.actualizar(tiempo.pausado ? 0 : delta);

  // La cámara acompaña a los camiones
  desplazamiento.subVectors(posSim, ultimaPos);
  if (saltoPendiente || desplazamiento.length() > 8) {
    camara.position.add(desplazamiento);
    controles.target.add(desplazamiento);
    saltoPendiente = false;
  } else {
    camara.position.add(desplazamiento);
    controles.target.add(desplazamiento);
  }
  ultimaPos.copy(posSim);
  if (moviendoCamara) {
    destinoPos.copy(posSim).add(distanciaPos);
    destinoMira.copy(posSim).add(distanciaMira);
    camara.position.lerp(destinoPos, 0.07);
    controles.target.lerp(destinoMira, 0.07);
    if (camara.position.distanceTo(destinoPos) < 0.05) moviendoCamara = false;
  }
  mundo.moverNubes(delta);
  controles.update();
  if (!enEscenario) render.render(escena, camara);
  // carteles con datos en vivo (vueltas, consumo, litros, cambios)
  document.querySelectorAll('[data-vivo]').forEach(el => {
    const e = sim.datos()[el.dataset.vivo];
    if (!e) return;
    const partes = [`${e.marcha}ª · ${Math.round(e.rpm / 10) * 10} vueltas`, `${Math.round(e.cons)} L/100 km`, `gastó ${e.litros.toFixed(2).replace('.', ',')} L`];
    if (el.dataset.cambios) partes.push(`${e.cambios} cambios`);
    el.textContent = partes.join(' · ');
  });
  ubicarCarteles();
}

clase.entrar();
animar();
