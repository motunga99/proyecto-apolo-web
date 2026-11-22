// ==========================================
// ARRANQUE DE LA PÁGINA: PAPELES INTERNACIONALES
// Sin 3D: un escenario con ilustraciones (Marruecos, el ferry, Algeciras, Madrid,
// la frontera con Francia, Lyon y la aduana de Suiza) que acompaña cada paso de la clase.
// El mapa de Europa sigue igual (lo abre la clase en los pasos que lo usan).
// ==========================================
import { crearEscenarioInternacional } from './escenario-internacional.js';
import { crearClaseInternacional } from './clase-internacional.js';
import { hacerMovible, hacerAchicable } from './ventana.js';

const escena = crearEscenarioInternacional();

// ---------- VISTAS (botones de arriba) ----------
const botonesVista = document.querySelectorAll('[data-vista]');
function setVista(nombre) {
  escena.setVista(nombre);
  botonesVista.forEach(b => b.classList.toggle('activo', b.dataset.vista === nombre));
}
botonesVista.forEach(b => b.addEventListener('click', () => setVista(b.dataset.vista)));

// ---------- MODO CLASE ----------
const tiempo = { pausado: false };
const clase = crearClaseInternacional({ escena, tiempo, setVista });

// ---------- VENTANAS QUE SE MUEVEN ----------
const tarjetaClase = document.getElementById('clase');
hacerMovible(tarjetaClase, tarjetaClase.querySelector('.clase-cabecera'), 'clase-internacional-v2');
const carpeta = document.getElementById('carpeta');
hacerMovible(carpeta, carpeta.querySelector('.carpeta-cabecera'), 'carpeta-internacional-v2');
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
