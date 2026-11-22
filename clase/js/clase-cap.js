import { PASOS_CAP_QUE } from './clase-cap-que.js';
import { PREGUNTAS_CAP_QUE } from './cap-que-preguntas.js';
import { PASOS_CAP_INICIAL } from './clase-cap-inicial.js';
import { PREGUNTAS_CAP_INICIAL } from './cap-inicial-preguntas.js';
import { PASOS_CAP_CONTINUA } from './clase-cap-continua.js';
import { PREGUNTAS_CAP_CONTINUA } from './cap-continua-preguntas.js';
import { PASOS_CAP_EMPRESAS } from './clase-cap-empresas.js';
import { PREGUNTAS_CAP_EMPRESAS } from './cap-empresas-preguntas.js';

// ==========================================
// MODO CLASE: EL CAP (motor)
// Qué es, cómo se saca, la tarjeta y la formación continua, y las empresas CAP.
// ==========================================

const CAPITULOS = [
  { nombre: '1. Qué es y quién lo necesita', pasos: PASOS_CAP_QUE, preguntas: PREGUNTAS_CAP_QUE },
  { nombre: '2. Cómo se saca', pasos: PASOS_CAP_INICIAL, preguntas: PREGUNTAS_CAP_INICIAL },
  { nombre: '3. Tarjeta y formación continua', pasos: PASOS_CAP_CONTINUA, preguntas: PREGUNTAS_CAP_CONTINUA },
  { nombre: '4. Las empresas CAP', pasos: PASOS_CAP_EMPRESAS, preguntas: PREGUNTAS_CAP_EMPRESAS }
];

const DOCS = {
  permiso: { img: 'permiso-conducir', nombre: 'Permiso de conducir', nota: 'C1, C1+E, C o C+E: además hace falta el CAP' },
  cap: { img: 'diploma-cap', nombre: 'Certificado de Aptitud Profesional (CAP)', nota: 'Curso + examen · vale en toda la UE' },
  tarjeta: { img: 'tarjeta-cap', nombre: 'Tarjeta de cualificación del conductor', nota: 'Dura 5 años · se renueva con 35 horas' }
};

export function crearClaseCap({ escena, tiempo, setVista }) {
  const caja = document.getElementById('clase');
  const elPaso = document.getElementById('clase-paso');
  const elProgreso = document.getElementById('clase-progreso');
  const elTitulo = document.getElementById('clase-titulo');
  const elTexto = document.getElementById('clase-texto');
  const elTipo = document.getElementById('clase-tipo');
  const NOMBRES_TIPO = {
    que: 'Estás viendo: QUÉ ES EL CAP',
    inicial: 'Estás viendo: CÓMO SE SACA EL CAP',
    continua: 'Estás viendo: LA TARJETA Y LA FORMACIÓN CONTINUA',
    empresas: 'Estás viendo: LAS EMPRESAS CAP'
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
