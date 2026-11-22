// ==========================================
// MODO CLASE: CÍRCULO DE KAMM, PASO A PASO
// Para el que no sabe nada. Un paso por pantalla, botón "Siguiente".
// ==========================================
import { PREGUNTAS_KAMM } from './kamm-preguntas.js';

// ---------- LOS PASOS ----------
// visual: qué se dibuja en la tarjeta (barra del 100%, círculo, o los dos)
// animacion: valores a los que van las flechas (b = frenar, l = doblar; 1 = 100%)
// camion: escena en la ruta, en cámara lenta, con pausa automática
const PASOS = [
  {
    titulo: 'En la vida real',
    texto: [
      'Seguro te pasó o lo viste: si entrás rápido a una curva y encima <b>clavás el freno</b>, el camión <b>no dobla y se va derecho</b>.',
      'Eso es <b>todo</b> el círculo de Kamm. Nada más.'
    ]
  },
  {
    titulo: '¿Qué es y qué no es?',
    texto: [
      '<b>No es una pieza del camión.</b> No está en la rueda ni en el tablero.',
      'Es un <b>dibujo</b> que inventó un ingeniero alemán, Wunibald Kamm, para explicar en un papel lo que todo chofer sabe por instinto.',
      'Ningún camionero piensa en el círculo cuando maneja. Pero lo toman en el examen, así que vamos a entenderlo.'
    ]
  },
  {
    titulo: 'El agarre de la rueda',
    texto: [
      'La goma de la rueda se agarra al asfalto, pero <b>solo hasta cierto punto</b>.',
      'Imaginate que la rueda tiene <b>100% de agarre</b>. Ese agarre se usa para dos cosas: <b class="t-frenar">FRENAR</b> y <b class="t-doblar">DOBLAR</b>.'
    ],
    visual: { barra: true, circulo: false },
    animacion: [{ b: 0, l: 0 }]
  },
  {
    titulo: 'Frenar usa agarre',
    texto: [
      'Si usás el <b class="t-frenar">80% para frenar</b>, te queda el <b>20% para doblar</b>.',
      'Más freno = menos agarre para doblar.'
    ],
    visual: { barra: true, circulo: false },
    animacion: [{ b: 0, l: 0 }, { b: 0.8, l: 0 }]
  },
  {
    titulo: 'Doblar también usa agarre',
    texto: [
      'Si usás el <b class="t-doblar">50% para doblar</b>, te queda el <b>50% para frenar</b>.',
      'Lo que gastás en una cosa, no lo tenés para la otra.'
    ],
    visual: { barra: true, circulo: false },
    animacion: [{ b: 0, l: 0 }, { b: 0, l: 0.5 }]
  },
  {
    titulo: 'Todo para frenar',
    texto: [
      'Si usás el <b class="t-frenar">100% para frenar</b>, no te queda <b>NADA</b> para doblar.',
      'La rueda se <b>bloquea</b>: aunque gires el volante, el camión sigue derecho.'
    ],
    visual: { barra: true, circulo: false },
    animacion: [{ b: 0, l: 0 }, { b: 1, l: 0 }]
  },
  {
    titulo: '¿Por qué un círculo y no una barra?',
    texto: [
      'En la realidad sobra <b>un poquito más</b> que con la resta. Por eso Kamm lo dibujó como un círculo.',
      'Frenando al 80%, la barra dice que quedan 20% para doblar. El círculo, que es lo real, dice que quedan <b>60%</b>.',
      'Pero la idea es <b>la misma</b>: más freno, menos para doblar. Y 100% de freno, nada para doblar.'
    ],
    visual: { barra: true, circulo: true },
    animacion: [{ b: 0, l: 0 }, { b: 0.8, l: 0 }]
  },
  {
    titulo: 'Cómo se lee el círculo',
    texto: [
      '<b>El círculo azul</b> = todo el agarre que tiene la rueda (el 100%).',
      '<b class="t-frenar">Flecha naranja</b> = cuánto frenás. <b class="t-doblar">Flecha violeta</b> = cuánto doblás.',
      '<b class="t-suma">Flecha verde</b> = las dos juntas: es TODO lo que le estás pidiendo a la rueda.',
      'Si la verde queda <b>adentro</b> del círculo, el agarre alcanza: la rueda agarra. Si se sale <b>afuera</b> (se pone roja), le pediste más agarre del que tiene: la rueda patina.'
    ],
    visual: { barra: false, circulo: true },
    animacion: [{ b: 0, l: 0 }, { b: 0.5, l: 0 }, { b: 0.5, l: 0.5 }, { b: 0.5, l: 0.5 }, { b: 0.8, l: 0.8 }]
  },
  {
    titulo: 'Las palabras del examen',
    texto: [
      '<b class="t-frenar">Fuerza de frenado</b> = frenar.',
      '<b class="t-doblar">Fuerza de guiado lateral</b> = la fuerza que te deja doblar.',
      '<b class="t-suma">Resultante</b> = la suma de las dos (la flecha verde). <b>Adherencia</b> = agarre.',
      'Los <b>ejes</b> del círculo: el de arriba-abajo es frenar y acelerar (<b>fuerzas longitudinales</b>). El de los costados es doblar (<b>fuerzas laterales o centrífugas</b>).'
    ],
    visual: { barra: false, circulo: true },
    animacion: [{ b: 0, l: 0 }, { b: 0.5, l: 0.5 }]
  },
  {
    titulo: 'En la ruta: curva bien tomada',
    texto: [
      'El camión entra a la curva a 40 km/h, sin frenar, con suelo seco. Mirá el círculo de abajo a la izquierda.',
      'Se va a pausar solo en el momento justo.'
    ],
    camion: { velocidad: 40, freno: 0, suelo: 'seco', pausarEn: 'curva', demora: 1.5, vista: 'perspectiva' },
    notaPausa: 'Pausado: la flecha está ADENTRO del círculo. El camión dobla bien. Tocá Play para seguir mirando o Siguiente para avanzar.'
  },
  {
    titulo: 'En la ruta: frenar a fondo en la curva',
    texto: [
      'Ahora el mismo camión entra a la curva y <b>clava el freno al 100%</b>. Lo miramos desde arriba.'
    ],
    camion: { velocidad: 40, freno: 100, suelo: 'seco', pausarEn: 'bloqueo', demora: 1.4, vista: 'arriba' },
    notaPausa: 'Pausado: todo el agarre se fue a frenar. Ruedas ROJAS = bloqueadas. El volante está girado (mirá la cabina), pero el camión sigue derecho.'
  },
  {
    titulo: 'Suelo mojado: el agarre se achica',
    texto: [
      'En seco, frenar al 70% en esta curva andaba bien. Ahora el suelo está <b>mojado</b>.',
      'Con suelo mojado el círculo es <b>más chico</b> (la línea punteada es el tamaño en seco). Mirá qué pasa con el mismo freno.'
    ],
    camion: { velocidad: 40, freno: 70, suelo: 'mojado', pausarEn: 'bloqueo', demora: 1.4, vista: 'arriba' },
    notaPausa: 'Pausado: el círculo se achicó y la flecha llegó al borde con menos freno. Las ruedas se bloquearon.'
  },
  {
    titulo: 'La regla para manejar',
    texto: [
      '<b>Frená ANTES de la curva</b>, en la recta.',
      'Dentro de la curva <b>no frenes fuerte</b>. Con suelo mojado o con hielo, <b>menos todavía</b>.',
      '<b>Dato:</b> el ABS existe justamente para esto. Cuando clavás el freno, suelta y agarra la rueda muchas veces por segundo para que no se bloquee y te quede agarre para doblar.'
    ]
  },
  {
    titulo: 'Preguntas oficiales',
    texto: [],
    quiz: true
  }
];

export function crearClaseKamm({ kamm, tiempo, setVista }) {
  const caja = document.getElementById('clase');
  const elPaso = document.getElementById('clase-paso');
  const elProgreso = document.getElementById('clase-progreso');
  const elTitulo = document.getElementById('clase-titulo');
  const elTexto = document.getElementById('clase-texto');
  const elNota = document.getElementById('clase-nota');
  const elVisual = document.getElementById('clase-visual');
  const elQuiz = document.getElementById('clase-quiz');
  const btnAnterior = document.getElementById('clase-anterior');
  const btnSiguiente = document.getElementById('clase-siguiente');
  const btnPlay = document.getElementById('clase-play');
  const btnRepetir = document.getElementById('clase-repetir');
  const btnVolver = document.getElementById('clase-volver');

  // Partes del dibujo
  const grupoBarra = document.getElementById('vis-barra');
  const grupoCirculo = document.getElementById('vis-circulo');
  const vbFrenar = document.getElementById('vb-frenar');
  const vbDoblar = document.getElementById('vb-doblar');
  const vbTxtFrenar = document.getElementById('vb-txt-frenar');
  const vbTxtDoblar = document.getElementById('vb-txt-doblar');
  const vbTxtQueda = document.getElementById('vb-txt-queda');
  const vbBadge = document.getElementById('vb-badge');
  const vcCirculo = document.getElementById('vc-circulo');
  const vcQueda = document.getElementById('vc-queda');
  const vcFreno = document.getElementById('vc-freno');
  const vcDoblar = document.getElementById('vc-doblar');
  const vcSuma = document.getElementById('vc-suma');
  const vcTxt = document.getElementById('vc-txt');
  const vcBadge = document.getElementById('vc-badge');
  const vcLblFreno = document.getElementById('vc-lbl-freno');
  const vcLblDoblar = document.getElementById('vc-lbl-doblar');
  const vcLblSuma = document.getElementById('vc-lbl-suma');

  let indice = 0;
  let activo = false;
  let animPausada = false;   // pausa de la animación de barra y círculo
  let repaso = null;         // pregunta a la que hay que volver después de repasar

  // Animación de las flechas
  let actual = { b: 0, l: 0 };
  let desde = { b: 0, l: 0 };
  let cuadros = [];
  let cuadro = 0;
  let tAnim = 0;
  const DURACION = 1.3; // segundos por movimiento
  const ESPERA = 0.8;   // pausa entre movimientos

  // Pausa automática del camión
  let esperandoEstado = null;
  let cuentaPausa = null;

  kamm.alCambiarEstado(clave => {
    if (!activo || !esperandoEstado) return;
    if (clave === esperandoEstado) {
      cuentaPausa = PASOS[indice].camion.demora;
      esperandoEstado = null;
    }
  });

  // ---------- DIBUJO DE BARRA Y CÍRCULO ----------
  const BX = 20, BW = 220;          // barra
  const CX = 390, CY = 120, CR = 85; // círculo

  function pct(x) { return Math.round(x * 100); }

  function dibujarVisual(b, l) {
    // Barra del 100%
    const fb = Math.min(b, 1);
    const fl = Math.min(l, 1 - fb);
    vbFrenar.setAttribute('width', BW * fb);
    vbDoblar.setAttribute('x', BX + BW * fb);
    vbDoblar.setAttribute('width', BW * fl);
    vbTxtFrenar.textContent = `Frenar: ${pct(b)}%`;
    vbTxtDoblar.textContent = `Doblar: ${pct(l)}%`;
    const libre = Math.max(0, 1 - b - l);
    if (b + l > 1.001) vbTxtQueda.textContent = '¡Te pasaste del 100%!';
    else if (l < 0.005 && b > 0.005) vbTxtQueda.textContent = `Queda ${pct(libre)}% para doblar`;
    else if (b < 0.005 && l > 0.005) vbTxtQueda.textContent = `Queda ${pct(libre)}% para frenar`;
    else vbTxtQueda.textContent = `Libre: ${pct(libre)}%`;
    vbBadge.style.opacity = (b >= 0.995 && l < 0.01) ? 1 : 0;

    // Círculo de Kamm
    const res = Math.hypot(b, l);
    const fuera = res > 1.001;
    const lim = 1.4;
    const fx = -CR * Math.min(l, lim);
    const fy = CR * Math.min(b, lim);
    linea(vcFreno, 0, fy);
    linea(vcDoblar, fx, 0);
    linea(vcSuma, fx, fy);
    vcSuma.setAttribute('stroke', fuera ? '#ef4444' : '#10b981');
    vcSuma.setAttribute('marker-end', fuera ? 'url(#vpunta-roja)' : 'url(#vpunta-verde)');
    vcCirculo.setAttribute('stroke', fuera ? '#ef4444' : '#0ea5e9');

    // Nombre en la punta de cada flecha
    etiqueta(vcLblFreno, CX + 10, CY + fy, b > 0.005);
    etiqueta(vcLblDoblar, CX + fx, CY - 12, l > 0.005);
    etiqueta(vcLblSuma, CX + fx - 6, Math.min(CY + fy + 18, 248), b > 0.005 && l > 0.005);
    vcLblSuma.setAttribute('fill', fuera ? '#b91c1c' : '#047857');

    // Lo que queda (solo cuando se usa una sola cosa)
    if (l < 0.005) {
      const q = Math.sqrt(Math.max(0, 1 - b * b));
      vcQueda.setAttribute('x2', CX - CR * q);
      vcQueda.setAttribute('y2', CY);
      vcQueda.style.opacity = 1;
      vcTxt.textContent = b > 0.005 ? `Queda ${pct(q)}% para doblar` : 'Todo el agarre libre';
    } else if (b < 0.005) {
      const q = Math.sqrt(Math.max(0, 1 - l * l));
      vcQueda.setAttribute('x2', CX);
      vcQueda.setAttribute('y2', CY + CR * q);
      vcQueda.style.opacity = 1;
      vcTxt.textContent = `Queda ${pct(q)}% para frenar`;
    } else {
      vcQueda.style.opacity = 0;
      vcTxt.textContent = fuera ? 'Flecha AFUERA: la rueda patina' : 'Flecha ADENTRO: la rueda agarra';
    }
    vcTxt.setAttribute('fill', fuera ? '#b91c1c' : '#0f172a');
    vcBadge.style.opacity = (b >= 0.995 && l < 0.01) ? 1 : 0;
  }

  function etiqueta(el, x, y, visible) {
    el.setAttribute('x', x);
    el.setAttribute('y', y);
    el.style.opacity = visible ? 1 : 0;
  }

  function linea(el, dx, dy) {
    el.setAttribute('x2', CX + dx);
    el.setAttribute('y2', CY + dy);
    el.style.opacity = Math.hypot(dx, dy) < 2 ? 0 : 1;
  }

  // ---------- PREGUNTAS ----------
  let pregunta = 0;
  let aciertos = 0;

  function mostrarPregunta() {
    if (pregunta >= PREGUNTAS_KAMM.length) {
      elQuiz.innerHTML = `
        <div class="quiz-final">
          <p class="quiz-enunciado">Terminaste: acertaste <b>${aciertos} de ${PREGUNTAS_KAMM.length}</b>.</p>
          <button class="boton principal" id="quiz-otra-vez">Volver a empezar las preguntas</button>
        </div>`;
      document.getElementById('quiz-otra-vez').onclick = () => { pregunta = 0; aciertos = 0; mostrarPregunta(); };
      return;
    }
    const p = PREGUNTAS_KAMM[pregunta];
    const letras = ['a', 'b', 'c', 'd'];
    elQuiz.innerHTML = `
      <div class="quiz-meta">Pregunta ${pregunta + 1} de ${PREGUNTAS_KAMM.length} · salió ${p.veces} ${p.veces === 1 ? 'vez' : 'veces'} en exámenes oficiales · aciertos: ${aciertos}</div>
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
    const p = PREGUNTAS_KAMM[pregunta];
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

  // ---------- PASOS ----------
  function irA(n) {
    indice = Math.max(0, Math.min(PASOS.length - 1, n));
    const paso = PASOS[indice];

    elPaso.textContent = `Paso ${indice + 1} de ${PASOS.length}`;
    elProgreso.style.width = `${((indice + 1) / PASOS.length) * 100}%`;
    elTitulo.textContent = paso.titulo;
    elTexto.innerHTML = paso.texto.map(t => `<p>${t}</p>`).join('');
    elNota.hidden = true;
    caja.classList.remove('destello');
    void caja.offsetWidth;
    caja.classList.add('destello');

    // Dibujo de barra y círculo
    elVisual.style.display = paso.visual ? 'block' : 'none';
    if (paso.visual) {
      grupoBarra.style.display = paso.visual.barra ? 'block' : 'none';
      grupoCirculo.style.display = paso.visual.circulo ? 'block' : 'none';
      // Si se muestra uno solo, se centra
      const soloUno = paso.visual.barra !== paso.visual.circulo;
      grupoBarra.setAttribute('transform', soloUno ? 'translate(130 0)' : '');
      grupoCirculo.setAttribute('transform', soloUno ? 'translate(-130 0)' : '');
      cuadros = paso.animacion;
      cuadro = 0;
      tAnim = 0;
      actual = { ...cuadros[0] };
      desde = { ...cuadros[0] };
      dibujarVisual(actual.b, actual.l);
    }

    // Camión en la ruta
    document.body.classList.toggle('clase-camion', !!paso.camion);
    esperandoEstado = null;
    cuentaPausa = null;
    if (paso.camion) {
      const c = paso.camion;
      kamm.configurar({ velocidad: c.velocidad, freno: c.freno, tipoSuelo: c.suelo });
      kamm.reiniciar(kamm.inicioCurva - 22);
      esperandoEstado = c.pausarEn;
      tiempo.pausado = false;
      setVista(c.vista);
    } else {
      // Camión quieto esperando en la recta
      kamm.configurar({ velocidad: 40, freno: 0, tipoSuelo: 'seco' });
      kamm.reiniciar(kamm.inicioCurva - 22);
      tiempo.pausado = true;
      setVista('perspectiva');
    }

    // Preguntas
    elQuiz.hidden = !paso.quiz;
    if (paso.quiz) {
      // Si viene de repasar, vuelve a la misma pregunta sin perder lo hecho
      if (repaso === null) { pregunta = 0; aciertos = 0; }
      else { pregunta = repaso; repaso = null; }
      mostrarPregunta();
    }

    // Botones
    btnAnterior.disabled = indice === 0;
    btnSiguiente.style.display = indice === PASOS.length - 1 ? 'none' : '';
    btnPlay.style.display = (paso.camion || paso.visual) ? '' : 'none';
    animPausada = false;
    btnVolver.style.display = (repaso !== null && !paso.quiz) ? '' : 'none';
    if (repaso !== null) btnVolver.textContent = `Volver a la pregunta ${repaso + 1}`;
    btnRepetir.style.display = (paso.camion || paso.visual) ? '' : 'none';
    actualizarBotonPlay();
    caja.scrollTop = 0;
  }

  function actualizarBotonPlay() {
    const pausado = PASOS[indice].camion ? tiempo.pausado : animPausada;
    btnPlay.textContent = pausado ? 'Play' : 'Pausa';
  }

  btnAnterior.onclick = () => irA(indice - 1);
  btnSiguiente.onclick = () => irA(indice + 1);
  btnRepetir.onclick = () => irA(indice);
  btnPlay.onclick = () => {
    if (PASOS[indice].camion) {
      tiempo.pausado = !tiempo.pausado;
      esperandoEstado = null;
      cuentaPausa = null;
    } else {
      animPausada = !animPausada;
    }
    actualizarBotonPlay();
  };
  btnVolver.onclick = () => irA(PASOS.length - 1);

  // ---------- CADA CUADRO ----------
  // dtReal: tiempo real (para animar la tarjeta). dtSim: tiempo del camión.
  function actualizar(dtReal, dtSim) {
    if (!activo) return;

    // Animación de las flechas
    const paso = PASOS[indice];
    if (paso.visual && !animPausada && cuadro < cuadros.length - 1) {
      tAnim += dtReal;
      if (tAnim > ESPERA) {
        const k = Math.min(1, (tAnim - ESPERA) / DURACION);
        const suave = k * k * (3 - 2 * k);
        const hacia = cuadros[cuadro + 1];
        actual.b = desde.b + (hacia.b - desde.b) * suave;
        actual.l = desde.l + (hacia.l - desde.l) * suave;
        dibujarVisual(actual.b, actual.l);
        if (k >= 1) {
          cuadro++;
          tAnim = 0;
          desde = { ...actual };
        }
      }
    }

    // Pausa automática en el momento justo
    if (cuentaPausa !== null) {
      cuentaPausa -= dtSim;
      if (cuentaPausa <= 0) {
        cuentaPausa = null;
        tiempo.pausado = true;
        elNota.textContent = paso.notaPausa;
        elNota.hidden = false;
        actualizarBotonPlay();
      }
    }
  }

  function entrar() {
    activo = true;
    irA(indice);
  }

  function salir() {
    activo = false;
    document.body.classList.remove('clase-camion');
    esperandoEstado = null;
    cuentaPausa = null;
  }

  return { entrar, salir, actualizar };
}