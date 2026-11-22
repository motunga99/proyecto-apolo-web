import { PASOS_PUBLICO } from './clase-pap-publico.js';
import { PREGUNTAS_PUBLICO } from './pap-publico-preguntas.js';
import { PASOS_AUTORIZACION } from './clase-pap-autorizacion.js';
import { PREGUNTAS_AUTORIZACION } from './pap-autorizacion-preguntas.js';
import { PASOS_CONTROL } from './clase-pap-control.js';
import { PREGUNTAS_CONTROL } from './pap-control-preguntas.js';
import { PASOS_INSPECTOR } from './clase-pap-inspector.js';
import { PREGUNTAS_INSPECTOR } from './pap-inspector-preguntas.js';

// ==========================================
// MODO CLASE: PAPELES DEL TRANSPORTE (motor) · solo Mercancías
// Parte 1: viaje dentro de España. Cada capítulo en su propio archivo.
// ==========================================

const CAPITULOS = [
  { nombre: '1. Público o privado', pasos: PASOS_PUBLICO, preguntas: PREGUNTAS_PUBLICO },
  { nombre: '2. La autorización', pasos: PASOS_AUTORIZACION, preguntas: PREGUNTAS_AUTORIZACION },
  { nombre: '3. Documento de control', pasos: PASOS_CONTROL, preguntas: PREGUNTAS_CONTROL },
  { nombre: '4. El inspector te para', pasos: PASOS_INSPECTOR, preguntas: PREGUNTAS_INSPECTOR }
];

// Los papeles que se van guardando en la carpeta de la cabina
const DOCS = {
  factura: { img: 'factura', nombre: 'Factura de compra de la mercancía', nota: 'Privado complementario: la mercancía es de la empresa' },
  conductor: { nombre: 'Prueba de que el conductor es de la empresa', nota: 'Contrato o alta: trabaja para la empresa' },
  vehiculo: { nombre: 'Prueba de que el camión es de la empresa', nota: 'El vehículo está integrado en la empresa' },
  autorizacion: { img: 'autorizacion', nombre: 'Autorización de transporte', nota: 'Solo si el vehículo pasa del peso: 2 t público · 3,5 t privado' },
  autorizacionRegistro: { nombre: 'Autorización: no hace falta llevar papel', nota: 'El inspector la comprueba en el registro, por la matrícula' },
  control: { img: 'doc-control', nombre: 'Documento de control', nota: 'Uno por viaje · lo hacen el cargador y el transportista · se guarda 1 año' },
  cartaPorte: { img: 'carta-porte', nombre: 'Carta de porte', nota: 'El contrato del viaje: la hace el expedidor y se la da al conductor' },
  permiso: { img: 'permiso-conducir', nombre: 'Permiso de conducir', nota: 'Siempre · C1, C o C+E según el camión' },
  tarjetaCAP: { img: 'tarjeta-cap', nombre: 'Tarjeta de cualificación (CAP)', nota: 'Se lleva cuando conducís' },
  circulacion: { img: 'permiso-circ', nombre: 'Permiso de circulación', nota: 'El DNI del camión: siempre a bordo' },
  itv: { img: 'tarjeta-itv', nombre: 'Tarjeta de inspección técnica (ITV)', nota: 'Siempre a bordo · la póliza del seguro no hace falta' }
};

export function crearClasePapeles({ escena, tiempo, setVista }) {
  const caja = document.getElementById('clase');
  const elPaso = document.getElementById('clase-paso');
  const elProgreso = document.getElementById('clase-progreso');
  const elTitulo = document.getElementById('clase-titulo');
  const elTexto = document.getElementById('clase-texto');
  const elTipo = document.getElementById('clase-tipo');
  const NOMBRES_TIPO = {
    nacional: 'Viaje dentro de España · Mercancías',
    publico: 'Estás viendo: TRANSPORTE PÚBLICO (para otros)',
    privado: 'Estás viendo: TRANSPORTE PRIVADO COMPLEMENTARIO (lo tuyo)',
    exento: 'Estás viendo: NO NECESITAN AUTORIZACIÓN',
    autorizacion: 'Estás viendo: LA AUTORIZACIÓN DE TRANSPORTE',
    control: 'Estás viendo: EL DOCUMENTO DE CONTROL',
    inspector: 'Estás viendo: LA INSPECCIÓN EN CARRETERA'
  };
  const elCarpeta = document.getElementById('carpeta-lista');
  let carpetaAnterior = [];
  function dibujarCarpeta(lista = []) {
    if (!elCarpeta) return;
    if (!lista.length) {
      elCarpeta.innerHTML = '<p class="carpeta-vacia">Todavía no hay papeles. Se van a ir sumando en el viaje.</p>';
    } else {
      elCarpeta.innerHTML = lista.map(k => `
        <div class="doc verde${carpetaAnterior.includes(k) ? '' : ' nuevo'}${DOCS[k].img ? ' con-img' : ''}">
          ${DOCS[k].img ? `<img src="ilustraciones/${DOCS[k].img}.png" alt="">` : ''}
          <div><b>${DOCS[k].nombre}</b><span>${DOCS[k].nota}</span></div>
        </div>`).join('');
    }
    carpetaAnterior = lista;
  }
  const elCapitulos = document.getElementById('clase-capitulos');
  const barraIzq = document.getElementById('barra-izq');
  const barraDer = document.getElementById('barra-der');
  let cap = 0;
  let PASOS_ACT = CAPITULOS[0].pasos;
  let PREGUNTAS = CAPITULOS[0].preguntas;

  function dibujarCapitulos() {
    elCapitulos.innerHTML = CAPITULOS.map((c, i) =>
      `<button class="capitulo${i === cap ? ' activo' : ''}" data-cap="${i}" ${c.pronto ? 'disabled' : ''}>${c.nombre}${c.pronto ? ' <small>(pronto)</small>' : ''}</button>`
    ).join('');
    elCapitulos.querySelectorAll('.capitulo').forEach(b => {
      b.onclick = () => irACapitulo(Number(b.dataset.cap));
    });
  }

  function irACapitulo(n) {
    if (!CAPITULOS[n] || CAPITULOS[n].pronto) return;
    cap = n;
    PASOS_ACT = CAPITULOS[n].pasos;
    PREGUNTAS = CAPITULOS[n].preguntas;
    repaso = null;
    dibujarCapitulos();
    irA(0);
  }
  const elBarra = document.getElementById('clase-barra');
  const barraRelleno = document.getElementById('barra-relleno');
  const barraTexto = document.getElementById('barra-texto');
  const btnAnterior = document.getElementById('clase-anterior');
  const btnSiguiente = document.getElementById('clase-siguiente');
  const btnPlay = document.getElementById('clase-play');
  const btnRepetir = document.getElementById('clase-repetir');
  const btnVolver = document.getElementById('clase-volver');
  const elQuiz = document.getElementById('clase-quiz');

  // ---------- PREGUNTAS ----------
  let pregunta = 0;
  let aciertos = 0;
  let repaso = null;

  function mostrarPregunta() {
    if (pregunta >= PREGUNTAS.length) {
      elQuiz.innerHTML = `
        <div class="quiz-final">
          <p class="quiz-enunciado">Terminaste: acertaste <b>${aciertos} de ${PREGUNTAS.length}</b>.</p>
          <div class="fila">
            <button class="boton" id="quiz-otra-vez">Volver a empezar las preguntas</button>
            ${siguienteCap() !== null ? `<button class="boton principal" id="quiz-sig-cap">Seguir con: ${CAPITULOS[siguienteCap()].nombre}</button>` : ''}
          </div>
        </div>`;
      document.getElementById('quiz-otra-vez').onclick = () => { pregunta = 0; aciertos = 0; mostrarPregunta(); };
      const sig = document.getElementById('quiz-sig-cap');
      if (sig) sig.onclick = () => irACapitulo(siguienteCap());
      return;
    }
    const p = PREGUNTAS[pregunta];
    const letras = ['a', 'b', 'c', 'd'];
    elQuiz.innerHTML = `
      <div class="quiz-meta">Pregunta ${pregunta + 1} de ${PREGUNTAS.length} · salió ${p.veces} ${p.veces === 1 ? 'vez' : 'veces'} en exámenes oficiales · aciertos: ${aciertos}</div>
      <p class="quiz-enunciado">${p.enunciado}</p>
      <div class="quiz-opciones">
        ${p.opciones.map((o, i) => `<button class="opcion" data-i="${i}"><b>${letras[i]})</b> ${o}</button>`).join('')}
      </div>
      <div class="quiz-explica" id="quiz-explica" hidden></div>`;
    elQuiz.querySelectorAll('.opcion').forEach(boton => {
      boton.onclick = () => responder(Number(boton.dataset.i));
    });
  }

  function responder(elegida) {
    const p = PREGUNTAS[pregunta];
    const bien = elegida === p.correcta;
    if (bien) aciertos++;
    elQuiz.querySelectorAll('.opcion').forEach(boton => {
      const i = Number(boton.dataset.i);
      boton.disabled = true;
      if (i === p.correcta) boton.classList.add('correcta');
      else if (i === elegida) boton.classList.add('incorrecta');
    });
    const explica = document.getElementById('quiz-explica');
    explica.hidden = false;
    explica.innerHTML = `
      <p class="${bien ? 'quiz-bien' : 'quiz-mal'}">${bien ? '¡Bien!' : 'No. La correcta es la marcada en verde.'}</p>
      <p>${p.explicacion}</p>
      ${p.ojo ? `<p class="quiz-ojo"><b>Ojo:</b> ${p.ojo}</p>` : ''}
      <div class="fila">
        <button class="boton" id="quiz-repaso">Repasar el paso ${p.paso}</button>
        <button class="boton principal" id="quiz-siguiente">Siguiente pregunta</button>
      </div>`;
    document.getElementById('quiz-siguiente').onclick = () => { pregunta++; mostrarPregunta(); };
    document.getElementById('quiz-repaso').onclick = () => {
      repaso = pregunta;
      irA(p.paso - 1);
    };
  }

  function siguienteCap() {
    const n = cap + 1;
    return CAPITULOS[n] && !CAPITULOS[n].pronto ? n : null;
  }

  let indice = 0;
  let tLinea = 0;
  let proximo = 0;

  function irA(n) {
    indice = Math.max(0, Math.min(PASOS_ACT.length - 1, n));
    const paso = PASOS_ACT[indice];

    elPaso.textContent = `Paso ${indice + 1} de ${PASOS_ACT.length}`;
    elProgreso.style.width = `${((indice + 1) / PASOS_ACT.length) * 100}%`;
    elTitulo.textContent = paso.titulo;
    elTexto.innerHTML = paso.texto.map(t => `<p>${t}</p>`).join('');
    caja.classList.remove('destello');
    void caja.offsetWidth;
    caja.classList.add('destello');

    // Armar la escena como arranca este paso
    escena.limpiar();
    paso.base.forEach(nombre => escena.yaVisible(nombre));
    if (paso.alArrancar) paso.alArrancar(escena);
    escena.tipo(paso.tipo);
    elTipo.textContent = paso.tipo ? NOMBRES_TIPO[paso.tipo] : '';
    elTipo.className = 'clase-tipo ' + (paso.tipo || '');
    elTipo.style.display = paso.tipo ? '' : 'none';
    setVista(paso.vista);
    dibujarCarpeta(paso.carpeta);

    elBarra.style.display = paso.barra ? 'block' : 'none';
    if (paso.barra) {
      // barra: true = la del 25% de la SA; o un objeto { parte, izq, der, color }
      const b = paso.barra === true ? {} : paso.barra;
      barraParte = b.parte ?? 0.25;
      barraIzq.textContent = b.izq ?? 'Día 1: 15.000 € (25%)';
      barraDer.textContent = b.der ?? 'El resto (45.000 €): después';
      barraRelleno.setAttribute('fill', b.color ?? '#22c55e');
      barraIzq.setAttribute('fill', b.color ? '#c2410c' : '#15803d');
      barraRelleno.setAttribute('width', 0);
    }

    tLinea = 0;
    proximo = 0;
    tiempo.pausado = false;

    // Preguntas (si viene de repasar, vuelve a la misma pregunta)
    elQuiz.hidden = !paso.quiz;
    if (paso.quiz) {
      if (repaso === null) { pregunta = 0; aciertos = 0; }
      else { pregunta = repaso; repaso = null; }
      mostrarPregunta();
    }
    btnVolver.style.display = (repaso !== null && !paso.quiz) ? '' : 'none';
    if (repaso !== null) btnVolver.textContent = `Volver a la pregunta ${repaso + 1}`;

    btnAnterior.disabled = indice === 0;
    btnSiguiente.style.display = indice === PASOS_ACT.length - 1 ? 'none' : '';
    actualizarBotonPlay();
    caja.scrollTop = 0;
  }

  function actualizarBotonPlay() {
    btnPlay.textContent = tiempo.pausado ? 'Play' : 'Pausa';
  }

  btnAnterior.onclick = () => irA(indice - 1);
  btnSiguiente.onclick = () => irA(indice + 1);
  btnRepetir.onclick = () => irA(indice);
  btnVolver.onclick = () => irA(PASOS_ACT.length - 1);
  btnPlay.onclick = () => {
    tiempo.pausado = !tiempo.pausado;
    actualizarBotonPlay();
  };

  function actualizar(dt) {
    const paso = PASOS_ACT[indice];
    tLinea += dt;

    // Lo que va pasando en este paso
    while (proximo < paso.linea.length && tLinea >= paso.linea[proximo][0]) {
      paso.linea[proximo][1](escena);
      proximo++;
    }

    // Barra del 25%
    if (paso.barra) {
      const k = Math.max(0, Math.min(1, (tLinea - 0.6) / 2));
      const suave = k * k * (3 - 2 * k);
      barraRelleno.setAttribute('width', 460 * barraParte * suave);
      barraTexto.style.opacity = k >= 1 ? 1 : 0;
    }
  }

  let barraParte = 0.25;

  function entrar() { dibujarCapitulos(); irA(0); }

  return { entrar, actualizar };
}
