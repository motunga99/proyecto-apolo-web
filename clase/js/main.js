// ==========================================
// ARRANQUE: escena, cámara, controles y animación
// ==========================================
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { crearMundo } from './mundo.js';
import { crearCamion } from './camion.js';
import { crearKamm } from './kamm.js';
import { crearClaseKamm } from './clase-kamm.js';
import { hacerMovible, hacerAchicable } from './ventana.js';

const contenedor = document.getElementById('lienzo');

// Escena y cámara
const escena = new THREE.Scene();
const camara = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 400);

// Renderizador con sombras suaves
const render = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
render.setSize(window.innerWidth, window.innerHeight);
render.setPixelRatio(Math.min(window.devicePixelRatio, 2));
render.shadowMap.enabled = true;
render.shadowMap.type = THREE.PCFSoftShadowMap;
render.toneMapping = THREE.ACESFilmicToneMapping;
render.toneMappingExposure = 1.05;
contenedor.appendChild(render.domElement);

// Mundo, camión y escena de Kamm
const mundo = crearMundo(escena);
const camion = crearCamion();
escena.add(camion.grupo);
const kamm = crearKamm({ escena, camion, mundo });

// ---------- CÁMARA QUE SIGUE AL CAMIÓN ----------
// Cada vista es una distancia desde el camión (la cámara lo acompaña)
const VISTAS = {
  perspectiva: { pos: [10, 8, 17], mira: [0, 1.5, 0] },
  costado: { pos: [0, 3, 19], mira: [0, 1.5, 0] },
  arriba: { pos: [0.1, 38, 0], mira: [0, 0, 0] },
  ruedas: { pos: [5, 2.2, 6], mira: [0, 0.6, 0] }
};

const posCamion = kamm.posicion();
const ultimaPos = posCamion.clone();

const destinoPos = new THREE.Vector3();
const destinoMira = new THREE.Vector3();
let vistaActual = 'perspectiva';
let moviendoCamara = false;

// La vista se guarda como distancia desde el camión; el destino se calcula en cada cuadro
const distanciaPos = new THREE.Vector3();
const distanciaMira = new THREE.Vector3();
function calcularDestino(nombre) {
  const vista = VISTAS[nombre];
  distanciaPos.set(...vista.pos);
  distanciaMira.set(...vista.mira);
  destinoPos.copy(posCamion).add(distanciaPos);
  destinoMira.copy(posCamion).add(distanciaMira);
}

calcularDestino(vistaActual);
camara.position.copy(destinoPos);

const controles = new OrbitControls(camara, render.domElement);
controles.enableDamping = true;
controles.dampingFactor = 0.06;
controles.maxPolarAngle = Math.PI / 2 - 0.04; // no bajar del suelo
controles.minDistance = 2.5;                  // acercarse a una rueda
controles.maxDistance = 70;
controles.target.copy(destinoMira);

// Si el usuario agarra la cámara, se corta el viaje automático
controles.addEventListener('start', () => { moviendoCamara = false; });

const botonesVista = document.querySelectorAll('[data-vista]');
function setVista(nombre) {
  vistaActual = nombre;
  calcularDestino(vistaActual);
  moviendoCamara = true;
  botonesVista.forEach(b => b.classList.toggle('activo', b.dataset.vista === nombre));
}
botonesVista.forEach(boton => {
  boton.addEventListener('click', () => setVista(boton.dataset.vista));
});

// ---------- TIEMPO: PAUSA Y CÁMARA LENTA ----------
const tiempo = { pausado: false, escala: 0.5 }; // 0.5 = cámara lenta

const btnPausa = document.getElementById('btn-pausa');
const btnRitmo = document.getElementById('btn-ritmo');
function actualizarReproductor() {
  btnPausa.textContent = tiempo.pausado ? 'Play' : 'Pausa';
  btnRitmo.textContent = tiempo.escala < 1 ? 'Cámara lenta' : 'Velocidad real';
}
btnPausa.addEventListener('click', () => {
  tiempo.pausado = !tiempo.pausado;
  actualizarReproductor();
});
btnRitmo.addEventListener('click', () => {
  tiempo.escala = tiempo.escala < 1 ? 1 : 0.5;
  actualizarReproductor();
});
document.getElementById('btn-repetir').addEventListener('click', () => {
  tiempo.pausado = false;
  actualizarReproductor();
});

// ---------- MODO CLASE / MODO LIBRE ----------
const clase = crearClaseKamm({ kamm, tiempo, setVista });
const botonesModo = document.querySelectorAll('[data-modo]');
function setModo(modo) {
  document.body.classList.toggle('modo-clase', modo === 'clase');
  document.body.classList.toggle('modo-libre', modo === 'libre');
  botonesModo.forEach(b => b.classList.toggle('activo', b.dataset.modo === modo));
  if (modo === 'clase') {
    clase.entrar();
  } else {
    clase.salir();
    tiempo.pausado = false;
    tiempo.escala = 0.5;
    kamm.reiniciar();
    setVista('perspectiva');
    actualizarReproductor();
  }
}
botonesModo.forEach(b => b.addEventListener('click', () => setModo(b.dataset.modo)));

// ---------- DÍA / NOCHE ----------
let noche = false;
const botonNoche = document.getElementById('boton-noche');
botonNoche.addEventListener('click', () => {
  noche = !noche;
  mundo.setNoche(noche);
  camion.setNoche(noche);
  botonNoche.textContent = noche ? 'Día' : 'Noche';
  botonNoche.classList.toggle('noche', noche);
});

// ---------- TAMAÑO DE VENTANA ----------
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

// ---------- ANIMACIÓN ----------
const reloj = new THREE.Clock();
const desplazamiento = new THREE.Vector3();
let tSim = 0;

function animar() {
  requestAnimationFrame(animar);
  const delta = Math.min(reloj.getDelta(), 0.05);
  const dtSim = tiempo.pausado ? 0 : delta * tiempo.escala;
  tSim += dtSim;
  const t = tSim;

  kamm.actualizar(dtSim);
  clase.actualizar(delta, dtSim);

  // La cámara acompaña al camión (mantiene la distancia que eligió el usuario)
  desplazamiento.subVectors(posCamion, ultimaPos);
  camara.position.add(desplazamiento);
  controles.target.add(desplazamiento);
  ultimaPos.copy(posCamion);

  // Viaje suave de la cámara a la vista elegida
  if (moviendoCamara) {
    destinoPos.copy(posCamion).add(distanciaPos);
    destinoMira.copy(posCamion).add(distanciaMira);
    camara.position.lerp(destinoPos, 0.07);
    controles.target.lerp(destinoMira, 0.07);
    if (camara.position.distanceTo(destinoPos) < 0.05) moviendoCamara = false;
  }

  // Suspensión suave
  camion.cuerpoTractora.position.y = Math.sin(t * 16) * 0.015;
  camion.cuerpoRemolque.position.y = Math.sin(t * 14 + 1) * 0.012;

  mundo.moverNubes(delta);

  controles.update();
  render.render(escena, camara);
}

// ---------- VENTANAS QUE SE MUEVEN ----------
const tarjetaClase = document.getElementById('clase');
hacerMovible(tarjetaClase, tarjetaClase.querySelector('.clase-cabecera'), 'clase-kamm');
hacerAchicable(tarjetaClase, document.getElementById('clase-achicar'));
const panelKamm = document.querySelector('.panel-kamm');
hacerMovible(panelKamm, panelKamm.querySelector('.panel-titulo'), 'panel-kamm');
const panelCabina = document.querySelector('.panel-cabina');
hacerMovible(panelCabina, panelCabina.querySelector('.panel-titulo'), 'cabina-kamm');
const mensaje = document.getElementById('mensaje');
hacerMovible(mensaje, mensaje, 'mensaje-kamm');

setModo('clase');
animar();