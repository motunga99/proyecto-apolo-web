// ==========================================
// ARRANQUE DE LA PÁGINA: SUBVIRAJE Y SOBREVIRAJE
// Usa el mismo mundo y el mismo camión que Kamm.
// ==========================================
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { crearMundo } from './mundo.js';
import { crearCamion } from './camion.js';
import { crearViraje } from './viraje.js';
import { crearClaseViraje } from './clase-viraje.js';
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
const camion = crearCamion();
escena.add(camion.grupo);
const viraje = crearViraje({ escena, camion, mundo });

// ---------- CÁMARA QUE SIGUE AL CAMIÓN ----------
const VISTAS = {
  perspectiva: { pos: [10, 8, 17], mira: [0, 1.5, 0] },
  costado: { pos: [-2.7, 3, 17], mira: [-2.7, 1.8, 0] },
  arriba: { pos: [0.1, 42, 0], mira: [0, 0, 0] },
  ruedas: { pos: [5, 2.2, 6], mira: [0, 0.6, 0] },
  frente: { pos: [13, 3.5, 0.01], mira: [-2.7, 1.8, 0] },
  arribaCerca: { pos: [-2.6, 22, 0.1], mira: [-2.7, 0, 0] }
};

const posCamion = viraje.posicion();
const ultimaPos = posCamion.clone();
const destinoPos = new THREE.Vector3();
const destinoMira = new THREE.Vector3();
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

calcularDestino('perspectiva');
camara.position.copy(destinoPos);

const controles = new OrbitControls(camara, render.domElement);
controles.enableDamping = true;
controles.dampingFactor = 0.06;
controles.maxPolarAngle = Math.PI / 2 - 0.04;
controles.minDistance = 2.5;
controles.maxDistance = 70;
controles.target.copy(destinoMira);
controles.addEventListener('start', () => { moviendoCamara = false; });

const botonesVista = document.querySelectorAll('[data-vista]');
function setVista(nombre) {
  calcularDestino(nombre);
  moviendoCamara = true;
  botonesVista.forEach(b => b.classList.toggle('activo', b.dataset.vista === nombre));
}
botonesVista.forEach(boton => {
  boton.addEventListener('click', () => setVista(boton.dataset.vista));
});

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

// ---------- TIEMPO Y MODO CLASE ----------
const tiempo = { pausado: false, escala: 0.5 }; // 0.5 = cámara lenta
const clase = crearClaseViraje({ viraje, tiempo, setVista });

// ---------- ANIMACIÓN ----------
const reloj = new THREE.Clock();
const desplazamiento = new THREE.Vector3();
let tSim = 0;

function animar() {
  requestAnimationFrame(animar);
  const delta = Math.min(reloj.getDelta(), 0.05);
  const dtSim = tiempo.pausado ? 0 : delta * tiempo.escala;
  tSim += dtSim;

  viraje.actualizar(dtSim);
  clase.actualizar(delta, dtSim);

  // La cámara acompaña al camión
  desplazamiento.subVectors(posCamion, ultimaPos);
  camara.position.add(desplazamiento);
  controles.target.add(desplazamiento);
  ultimaPos.copy(posCamion);

  if (moviendoCamara) {
    destinoPos.copy(posCamion).add(distanciaPos);
    destinoMira.copy(posCamion).add(distanciaMira);
    camara.position.lerp(destinoPos, 0.07);
    controles.target.lerp(destinoMira, 0.07);
    if (camara.position.distanceTo(destinoPos) < 0.05) moviendoCamara = false;
  }

  // Suspensión suave (solo con el camión andando)
  camion.cuerpoTractora.position.y = Math.sin(tSim * 16) * 0.015;
  camion.cuerpoRemolque.position.y = Math.sin(tSim * 14 + 1) * 0.012;

  mundo.moverNubes(delta);
  controles.update();
  render.render(escena, camara);
}

// ---------- VENTANAS QUE SE MUEVEN ----------
const tarjetaClase = document.getElementById('clase');
hacerMovible(tarjetaClase, tarjetaClase.querySelector('.clase-cabecera'), 'clase-viraje');
hacerAchicable(tarjetaClase, document.getElementById('clase-achicar'));
const panelCabina = document.querySelector('.panel-cabina');
hacerMovible(panelCabina, panelCabina.querySelector('.panel-titulo'), 'cabina-viraje');

clase.entrar();
animar();