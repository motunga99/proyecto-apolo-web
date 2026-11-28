import { PASOS_NEU_RUEDA, PASOS_NEU_CAMARA, PASOS_NEU_MEDIDAS, PASOS_NEU_PRESION, PASOS_NEU_DESGASTE } from './clase-neumaticos-temas.js';
import { PREGUNTAS_NEU_RUEDA, PREGUNTAS_NEU_CAMARA, PREGUNTAS_NEU_MEDIDAS, PREGUNTAS_NEU_PRESION, PREGUNTAS_NEU_DESGASTE } from './neumaticos-preguntas.js';

// ==========================================
// MODO CLASE: NEUMÁTICOS Y LLANTAS (mismo motor que Mercado y Sociedades)
// Los pasos de los 5 capítulos están en clase-neumaticos-temas.js
// ==========================================

const CAPITULOS = [
  { nombre: '1. La rueda y la llanta', pasos: PASOS_NEU_RUEDA, preguntas: PREGUNTAS_NEU_RUEDA },
  { nombre: '2. Con o sin cámara', pasos: PASOS_NEU_CAMARA, preguntas: PREGUNTAS_NEU_CAMARA },
  { nombre: '3. Leer las medidas', pasos: PASOS_NEU_MEDIDAS, preguntas: PREGUNTAS_NEU_MEDIDAS },
  { nombre: '4. La presión', pasos: PASOS_NEU_PRESION, preguntas: PREGUNTAS_NEU_PRESION },
  { nombre: '5. Desgaste y peligros', pasos: PASOS_NEU_DESGASTE, preguntas: PREGUNTAS_NEU_DESGASTE }
];

export function crearClaseNeumaticos({ escena, tiempo, setVista }) {
  const caja = document.getElementById('clase');
  const elPaso = document.getElementById('clase-paso');
  const elProgreso = document.getElementById('clase-progreso');
  const elTitulo = document.getElementById('clase-titulo');
  const elTexto = document.getElementById('clase-texto');
  const elTipo = document.getElementById('clase-tipo');
  const NOMBRES_TIPO = {
    rueda: 'Estás viendo: LA RUEDA Y LA LLANTA',
    camara: 'Estás viendo: CON O SIN CÁMARA',
    medidas: 'Estás viendo: LEER LAS MEDIDAS',
    presion: 'Estás viendo: LA PRESIÓN',
    desgaste: 'Estás viendo: DESGASTE Y PELIGROS'
  };
  const elCapitulos = document.getElementById('clase-capitulos');
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
    escena.preparar(paso.escena);
    paso.base.forEach(nombre => escena.yaVisible(nombre));
    if (paso.alArrancar) paso.alArrancar(escena);
    elTipo.textContent = paso.tipo ? NOMBRES_TIPO[paso.tipo] : '';
    elTipo.className = 'clase-tipo ' + (paso.tipo || '');
    elTipo.style.display = paso.tipo ? '' : 'none';
    setVista(paso.vista);

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
  }


  function entrar() { dibujarCapitulos(); irA(0); }

  return { entrar, actualizar };
}
