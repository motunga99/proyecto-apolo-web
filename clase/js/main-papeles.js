// ==========================================
// ARRANQUE DE LA PÁGINA: PAPELES DEL TRANSPORTE
// Sin 3D: un escenario con ilustraciones (la oficina de Transportes, Proyecto Apolo,
// Damian, el camión, el inspector, Frutas López, la fábrica de Ana y los exentos)
// que acompaña cada paso de la clase.
// ==========================================
import { crearEscenarioPapeles } from './escenario-papeles.js';
import { crearClasePapeles } from './clase-papeles.js';
import { hacerMovible, hacerAchicable } from './ventana.js';

const escena = crearEscenarioPapeles();

// ---------- VISTAS (botones de arriba) ----------
const botonesVista = document.querySelectorAll('[data-vista]');
function setVista(nombre) {
  escena.setVista(nombre);
  botonesVista.forEach(b => b.classList.toggle('activo', b.dataset.vista === nombre));
}
botonesVista.forEach(b => b.addEventListener('click', () => setVista(b.dataset.vista)));

// ---------- MODO CLASE ----------
const tiempo = { pausado: false };
const clase = crearClasePapeles({ escena, tiempo, setVista });

// ---------- VENTANAS QUE SE MUEVEN ----------
const tarjetaClase = document.getElementById('clase');
hacerMovible(tarjetaClase, tarjetaClase.querySelector('.clase-cabecera'), 'clase-papeles-v2');
const carpeta = document.getElementById('carpeta');
hacerMovible(carpeta, carpeta.querySelector('.carpeta-cabecera'), 'carpeta-papeles-v2');
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
