// ==========================================
// ARRANQUE DE LA PÁGINA: SOCIEDADES
// Sin 3D: un escenario con ilustraciones (Damian, los socios, la caja fuerte,
// la casa, la plata...) que acompaña cada paso de la clase.
// ==========================================
import { crearEscenarioSociedades } from './escenario-sociedades.js';
import { crearClaseSociedades } from './clase-sociedades.js';
import { hacerMovible, hacerAchicable } from './ventana.js';

const escena = crearEscenarioSociedades();

// ---------- VISTAS (botones de arriba) ----------
const botonesVista = document.querySelectorAll('[data-vista]');
function setVista(nombre) {
  escena.setVista(nombre);
  botonesVista.forEach(b => b.classList.toggle('activo', b.dataset.vista === nombre));
}
botonesVista.forEach(b => b.addEventListener('click', () => setVista(b.dataset.vista)));

// ---------- MODO CLASE ----------
const tiempo = { pausado: false };
const clase = crearClaseSociedades({ escena, tiempo, setVista });

// ---------- VENTANAS QUE SE MUEVEN ----------
const tarjetaClase = document.getElementById('clase');
hacerMovible(tarjetaClase, tarjetaClase.querySelector('.clase-cabecera'), 'clase-sociedades-v3');
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
