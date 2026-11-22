// ==========================================
// ARRANQUE DE LA PÁGINA: EL CAP
// Sin 3D: un escenario con ilustraciones (el centro de formación, el profesor, Damian, el camión,
// la sucursal, el aula móvil, los exámenes y los vehículos sin CAP)
// que acompaña cada paso de la clase.
// ==========================================
import { crearEscenarioCap } from './escenario-cap.js';
import { crearClaseCap } from './clase-cap.js';
import { hacerMovible, hacerAchicable } from './ventana.js';

const escena = crearEscenarioCap();

// ---------- VISTAS (botones de arriba) ----------
const botonesVista = document.querySelectorAll('[data-vista]');
function setVista(nombre) {
  escena.setVista(nombre);
  botonesVista.forEach(b => b.classList.toggle('activo', b.dataset.vista === nombre));
}
botonesVista.forEach(b => b.addEventListener('click', () => setVista(b.dataset.vista)));

// ---------- MODO CLASE ----------
const tiempo = { pausado: false };
const clase = crearClaseCap({ escena, tiempo, setVista });

// ---------- VENTANAS QUE SE MUEVEN ----------
const tarjetaClase = document.getElementById('clase');
hacerMovible(tarjetaClase, tarjetaClase.querySelector('.clase-cabecera'), 'clase-cap-v2');
const carpeta = document.getElementById('carpeta');
hacerMovible(carpeta, carpeta.querySelector('.carpeta-cabecera'), 'carpeta-cap-v2');
hacerAchicable(carpeta, document.getElementById('carpeta-achicar'));
hacerAchicable(tarjetaClase, document.getElementById('clase-achicar'));

// ---------- ANIMACIÓN ----------
let antes = performance.now();
function animar(ahora) {
  requestAnimationFrame(animar);
  const delta = Math.min((ahora - antes) / 1000, 0.05);
  antes = ahora;
  clase.actualizar(tiempo.pausado ? 0 : delta);
}

clase.entrar();
requestAnimationFrame(animar);
