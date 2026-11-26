import { PASOS_ADR_ADR, PASOS_ADR_CLASES1, PASOS_ADR_CLASES2, PASOS_ADR_PANEL, PASOS_ADR_ETIQ, PASOS_ADR_PAPELES, PASOS_ADR_QUIEN, PASOS_ADR_RUTA, PASOS_ADR_ACC } from './clase-adr-temas.js';
import { PREGUNTAS_ADR_ADR, PREGUNTAS_ADR_CLASES1, PREGUNTAS_ADR_CLASES2, PREGUNTAS_ADR_PANEL, PREGUNTAS_ADR_ETIQ, PREGUNTAS_ADR_PAPELES, PREGUNTAS_ADR_QUIEN, PREGUNTAS_ADR_RUTA, PREGUNTAS_ADR_ACC } from './adr-preguntas.js';

// ==========================================
// MODO CLASE: MERCANCÍAS PELIGROSAS (ADR) (mismo motor que mecánica)
// ==========================================

const CAPITULOS = [
  { nombre: '1. El ADR', pasos: PASOS_ADR_ADR, preguntas: PREGUNTAS_ADR_ADR },
  { nombre: '2. Clases 1 a 4', pasos: PASOS_ADR_CLASES1, preguntas: PREGUNTAS_ADR_CLASES1 },
  { nombre: '3. Clases 5 a 9', pasos: PASOS_ADR_CLASES2, preguntas: PREGUNTAS_ADR_CLASES2 },
  { nombre: '4. El panel naranja', pasos: PASOS_ADR_PANEL, preguntas: PREGUNTAS_ADR_PANEL },
  { nombre: '5. Las etiquetas', pasos: PASOS_ADR_ETIQ, preguntas: PREGUNTAS_ADR_ETIQ },
  { nombre: '6. Papeles y equipo', pasos: PASOS_ADR_PAPELES, preguntas: PREGUNTAS_ADR_PAPELES },
  { nombre: '7. Quién hace qué', pasos: PASOS_ADR_QUIEN, preguntas: PREGUNTAS_ADR_QUIEN },
  { nombre: '8. En la ruta', pasos: PASOS_ADR_RUTA, preguntas: PREGUNTAS_ADR_RUTA },
  { nombre: '9. Si pasa algo', pasos: PASOS_ADR_ACC, preguntas: PREGUNTAS_ADR_ACC }
];

const NOMBRES_TIPO = {
  adr: 'Estás viendo: EL ADR',
  clases1: 'Estás viendo: CLASES 1 A 4',
  clases2: 'Estás viendo: CLASES 5 A 9',
  panel: 'Estás viendo: EL PANEL NARANJA',
  etiq: 'Estás viendo: LAS ETIQUETAS',
  papeles: 'Estás viendo: PAPELES Y EQUIPO',
  quien: 'Estás viendo: QUIÉN HACE QUÉ',
  ruta: 'Estás viendo: EN LA RUTA',
  acc: 'Estás viendo: SI PASA ALGO'
};

export function crearClaseMecanica({ escena, tiempo, setVista }) {
  const caja = document.getElementById('clase');
  const elPaso = document.getElementById('clase-paso');
  const elProgreso = document.getElementById('clase-progreso');
  const elTitulo = document.getElementById('clase-titulo');
  const elTexto = document.getElementById('clase-texto');
  const elTipo = document.getElementById('clase-tipo');
  const elCapitulos = document.getElementById('clase-capitulos');
  const elBarra = document.getElementById('clase-barra');
  const btnAnterior = document.getElementById('clase-anterior');
  const btnSiguiente = document.getElementById('clase-siguiente');
  const btnPlay = document.getElementById('clase-play');
  const btnRepetir = document.getElementById('clase-repetir');
  const btnVolver = document.getElementById('clase-volver');
  const elQuiz = document.getElementById('clase-quiz');
  if (elBarra) elBarra.style.display = 'none';

  let cap = 0;
  let PASOS_ACT = CAPITULOS[0].pasos;
  let PREGUNTAS = CAPITULOS[0].preguntas;
  let indice = 0;
  let tLinea = 0;
  let proximo = 0;

  // Cuando la simulación llega a un momento, el paso puede mostrar un cartel
  escena.alCambiarEstado(clave => {
    const paso = PASOS_ACT[indice];
    if (paso && paso.alEstado && paso.alEstado[clave]) paso.alEstado[clave](escena);
  });

  function dibujarCapitulos() {
    elCapitulos.innerHTML = CAPITULOS.map((c, i) =>
      `<button class="capitulo${i === cap ? ' activo' : ''}" data-cap="${i}">${c.nombre}</button>`
    ).join('');
    elCapitulos.querySelectorAll('.capitulo').forEach(b => { b.onclick = () => irACapitulo(Number(b.dataset.cap)); });
  }
  function irACapitulo(n) {
    if (!CAPITULOS[n]) return;
    cap = n;
    PASOS_ACT = CAPITULOS[n].pasos;
    PREGUNTAS = CAPITULOS[n].preguntas;
    repaso = null;
    dibujarCapitulos();
    irA(0);
  }

  // ---------- PREGUNTAS ----------
  let pregunta = 0;
  let aciertos = 0;
  let repaso = null;
  function siguienteCap() { return CAPITULOS[cap + 1] ? cap + 1 : null; }
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
    elQuiz.querySelectorAll('.opcion').forEach(b => { b.onclick = () => responder(Number(b.dataset.i)); });
  }
  function responder(elegida) {
    const p = PREGUNTAS[pregunta];
    const bien = elegida === p.correcta;
    if (bien) aciertos++;
    elQuiz.querySelectorAll('.opcion').forEach(b => {
      const i = Number(b.dataset.i);
      b.disabled = true;
      if (i === p.correcta) b.classList.add('correcta');
      else if (i === elegida) b.classList.add('incorrecta');
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
    document.getElementById('quiz-repaso').onclick = () => { repaso = pregunta; irA(p.paso - 1); };
  }

  // ---------- PASOS ----------
  function irA(n) {
    indice = Math.max(0, Math.min(PASOS_ACT.length - 1, n));
    const paso = PASOS_ACT[indice];
    elPaso.textContent = `Paso ${indice + 1} de ${PASOS_ACT.length}`;
    elProgreso.style.width = `${((indice + 1) / PASOS_ACT.length) * 100}%`;
    elTitulo.textContent = paso.titulo;
    elTexto.innerHTML = paso.texto.map(t => `<p>${t}</p>`).join('');
    caja.classList.remove('destello'); void caja.offsetWidth; caja.classList.add('destello');
    elTipo.textContent = paso.tipo ? NOMBRES_TIPO[paso.tipo] : '';
    elTipo.className = 'clase-tipo ' + (paso.tipo || '');
    elTipo.style.display = paso.tipo ? '' : 'none';

    escena.limpiarCarteles();
    escena.configurar(paso.sim || 'quieto');
    setVista(paso.vista || 'perspectiva');
    escena.figura(paso.figura || null);
    tLinea = 0; proximo = 0;
    tiempo.pausado = false;

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
  function actualizarBotonPlay() { btnPlay.textContent = tiempo.pausado ? 'Play' : 'Pausa'; }
  btnAnterior.onclick = () => irA(indice - 1);
  btnSiguiente.onclick = () => irA(indice + 1);
  btnRepetir.onclick = () => irA(indice);
  btnVolver.onclick = () => irA(PASOS_ACT.length - 1);
  btnPlay.onclick = () => { tiempo.pausado = !tiempo.pausado; actualizarBotonPlay(); };

  function actualizar(dt) {
    const paso = PASOS_ACT[indice];
    tLinea += dt;
    const linea = paso.linea || [];
    while (proximo < linea.length && tLinea >= linea[proximo][0]) {
      linea[proximo][1](escena);
      proximo++;
    }
  }

  function entrar() { dibujarCapitulos(); irA(0); }
  return { entrar, actualizar };
}
