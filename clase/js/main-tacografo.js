// ==========================================
// ARRANQUE DE LA PÁGINA: EL TACÓGRAFO
// Sin 3D: un tablero oscuro con el tacógrafo, el disco, la línea del día,
// los pictogramas, las tarjetas, quién lo lleva, las placas y las multas.
// ==========================================
import { crearTableroTacografo } from './tablero-tacografo.js';
import { crearClaseTacografo } from './clase-tacografo.js';
import { hacerMovible, hacerAchicable } from './ventana.js';

const escena = crearTableroTacografo();

// ---------- PESTAÑAS DE ARRIBA ----------
const botonesVista = document.querySelectorAll('[data-vista]');
function setVista(nombre) {
  escena.verPantalla(nombre);
  botonesVista.forEach(b => b.classList.toggle('activo', b.dataset.vista === nombre));
}
botonesVista.forEach(b => b.addEventListener('click', () => setVista(b.dataset.vista)));

// ---------- MODO CLASE ----------
const tiempo = { pausado: false };
const clase = crearClaseTacografo({ escena, tiempo, setVista });

// ---------- VENTANAS QUE SE MUEVEN ----------
const tarjetaClase = document.getElementById('clase');
hacerMovible(tarjetaClase, tarjetaClase.querySelector('.clase-cabecera'), 'clase-taco-v2');
hacerAchicable(tarjetaClase, document.getElementById('clase-achicar'));

// ---------- ANIMACIÓN ----------
let antes = performance.now();
function animar(ahora) {
  requestAnimationFrame(animar);
  const delta = Math.min((ahora - antes) / 1000, 0.05);
  antes = ahora;
  const dt = tiempo.pausado ? 0 : delta;
  clase.actualizar(dt);
  escena.actualizar(delta);
}

clase.entrar();
requestAnimationFrame(animar);
