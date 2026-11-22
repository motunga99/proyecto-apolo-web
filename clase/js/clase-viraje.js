// ==========================================
// MODO CLASE: SUBVIRAJE Y SOBREVIRAJE, PASO A PASO
// Para el que no sabe nada. Un paso por pantalla, botón "Siguiente".
// ==========================================
import { PREGUNTAS_VIRAJE } from './viraje-preguntas.js';

// visual: dibujo de la curva visto desde arriba
//   sub / sobre: 'no' (no se ve), 'anim' (se dibuja de a poco), 'fijo' (ya dibujado)
// camion: escena en la ruta, en cámara lenta, con pausa automática
// movimiento: camión quieto mostrando balanceo, cabeceo o guiñada
const PASOS = [
  {
    titulo: 'En la vida real',
    texto: [
      'Entrás a una curva, girás el volante… y el camión <b>no hace exactamente lo que vos querés</b>. Puede doblar de <b>menos</b> o doblar de <b>más</b>.',
      '<b>¿Por qué pasa?</b> Porque las ruedas le piden al asfalto <b>más agarre del que tienen</b> y patinan (es lo mismo que el círculo de Kamm: la flecha se sale).',
      'Si patinan las ruedas de <b>ADELANTE</b>, el camión dobla de menos. Si patinan las de <b>ATRÁS</b>, dobla de más.'
    ]
  },
  {
    titulo: 'La curva que querías',
    texto: [
      'Imaginá que en la curva hay una <b>línea punteada blanca</b> dibujada: es el camino que vos querés hacer con el volante.',
      'Ahora vamos a ver qué pasa cuando el camión <b>no</b> sigue esa línea.'
    ],
    visual: { sub: 'no', sobre: 'no' }
  },
  {
    titulo: 'SUBviraje: dobla de MENOS',
    texto: [
      'Girás el volante, pero el camión <b>dobla menos de lo que querías</b>. Se va <b>de trompa hacia afuera</b>.',
      '<b>¿Por qué?</b> Las ruedas de <b>ADELANTE</b> patinan: no tienen agarre suficiente para doblar, entonces el camión sigue medio derecho.',
      'La curva que hace de verdad (línea <b class="t-sub">naranja</b>) le sale <b>más ABIERTA</b> que la que querías.'
    ],
    visual: { sub: 'anim', sobre: 'no' }
  },
  {
    titulo: 'Truco para acordarte del SUB',
    texto: [
      '<b>SUB = le FALTA giro.</b> Dobla de menos, así que la curva le sale <b>más abierta, más grande</b>.',
      'El examen lo dice difícil: "trayectoria <b>más abierta</b>" o "de <b>mayor radio</b>". Mayor radio = curva más grande = <b>SUBviraje</b>.'
    ],
    visual: { sub: 'fijo', sobre: 'no' }
  },
  {
    titulo: 'SUBviraje en la ruta: ¿qué hizo mal?',
    texto: [
      'Mirá el cartel antes de la curva: dice <b>40</b>. Y mirá el velocímetro de la cabina: el camionero entra a <b>70 km/h</b>.',
      '<b>Error: entró a la curva demasiado rápido.</b> Las ruedas de adelante no aguantan y patinan.'
    ],
    camion: { modo: 'sub', velocidad: 70, pausarEn: 'sub', demora: 2.4, vista: 'arriba' },
    notaPausa: 'Pausado: el volante está girado a fondo (mirá la cabina), pero el camión se va para AFUERA. Las ruedas de adelante (naranjas) patinan. El camino naranja es más abierto que la línea blanca.'
  },
  {
    titulo: '¿Qué hace patinar las ruedas de adelante?',
    texto: [
      '<b>1. Entrar demasiado rápido a la curva</b> (la causa número uno). <b>2. Girar el volante de golpe</b> o de más. <b>3. Suelo resbaladizo:</b> mojado, hielo, gravilla. <b>4. Ruedas de adelante gastadas</b> o con poco aire.',
      '<b>¿Cómo se nota?</b> Como las ruedas de adelante patinan, el volante se pone <b>LIVIANO</b>: ofrece <b>menos resistencia</b> de lo normal. Girás y no "agarra".',
      'Dato que toman: <b>los camiones, al entrar a una curva, tienden a SUBvirar</b>, porque son pesados y largos.'
    ],
    camion: { modo: 'sub', velocidad: 70, pausarEn: 'sub', demora: 1.4, vista: 'perspectiva' },
    notaPausa: 'Pausado: mirá la cabina, dice "volante liviano". Así se siente el subviraje.'
  },
  {
    titulo: 'SOBREviraje: dobla de MÁS',
    texto: [
      'Ahora al revés: el camión <b>dobla más de lo que querías</b>. Se le <b>va la cola hacia afuera</b> y la trompa se mete para adentro.',
      '<b>¿Por qué?</b> Las ruedas de <b>ATRÁS</b> patinan: la cola pierde agarre y se va para afuera, como cuando se te va la cola de un auto en una curva mojada.',
      'La curva que hace de verdad (línea <b class="t-sobre">roja</b>) le sale <b>más CERRADA</b> que la que querías.'
    ],
    visual: { sub: 'no', sobre: 'anim' }
  },
  {
    titulo: 'Truco para acordarte del SOBRE',
    texto: [
      '<b>SOBRE = le SOBRA giro.</b> Dobla de más, así que la curva le sale <b>más cerrada, más chica</b>.',
      'El examen dice: "trayectoria <b>más cerrada</b>" o "de <b>menor radio</b>". Menor radio = curva más chica = <b>SOBREviraje</b>.',
      'Las dos juntas: <b class="t-sub">abierta = SUB</b>, <b class="t-sobre">cerrada = SOBRE</b>.'
    ],
    visual: { sub: 'fijo', sobre: 'fijo' }
  },
  {
    titulo: 'SOBREviraje en la ruta: ¿qué hizo mal?',
    texto: [
      'El camionero entra a la curva y, en plena curva, <b>clava el freno</b> (mirá el pedal rojo en la cabina).',
      '<b>Error: frenar fuerte dentro de la curva.</b> Al frenar, el peso se va para adelante, la cola queda liviana, las ruedas de atrás patinan y la cola se va.',
      '<b>Otras causas:</b> soltar el acelerador de golpe en plena curva; acelerar fuerte en la curva (las ruedas de atrás, que empujan, patinan); ir vacío o con poca carga (la cola liviana agarra menos); suelo resbaladizo.',
      '<b>Para evitar los dos:</b> frená ANTES de la curva, en la recta; entrá despacio y girá suave.'
    ],
    camion: { modo: 'sobre', velocidad: 50, pausarEn: 'sobre', demora: 2.6, vista: 'arriba' },
    notaPausa: 'Pausado: frenó en plena curva, las ruedas de atrás de la tractora (naranjas) patinaron, la cola se fue para afuera y el camión se cierra hacia ADENTRO. El camino rojo es más cerrado que la línea blanca.'
  },
  {
    titulo: 'Los movimientos del camión: BALANCEO',
    texto: [
      'La carrocería del camión se mueve de <b>3 maneras</b>, y cada una tiene un nombre que pregunta el examen.',
      '<b>BALANCEO</b> = como cuando <b>inclinás la cabeza hacia un hombro</b>. El camión se inclina <b>de costado</b>. Gira sobre el eje <b class="t-rojo">longitudinal</b> (la barra roja, de adelante hacia atrás).',
      '<b>¿Qué lo provoca?</b> Las <b>curvas</b> (la fuerza te tira hacia afuera), los <b>cambios bruscos de carril</b> y el <b>viento de costado</b>. Con la <b>carga alta</b>, se balancea más.'
    ],
    camion: { modo: 'balanceo', velocidad: 50, pausarEn: 'curva', demora: 2.2, vista: 'frente' },
    notaPausa: 'Pausado: en la curva, la carrocería se inclinó hacia AFUERA. Eso es balanceo.'
  },
  {
    titulo: 'CABECEO',
    texto: [
      '<b>CABECEO</b> = como cuando <b>movés la cabeza para decir "sí"</b>. La trompa <b>sube y baja</b>. Gira sobre el eje <b class="t-azul">transversal</b> (la barra azul, que cruza el camión de lado a lado).',
      '<b>¿Qué lo provoca?</b> <b>Frenar:</b> la trompa se va para abajo. <b>Acelerar:</b> la trompa se va para arriba. También los pozos y badenes.',
      'Mirá los pedales en la cabina: cuando acelera sube la trompa, cuando frena baja.'
    ],
    camion: { modo: 'cabeceo', velocidad: 20, pausarEn: 'frena', demora: 0.7, vista: 'costado' },
    notaPausa: 'Pausado: frenó fuerte (pedal rojo) y la trompa se fue para ABAJO. Eso es cabeceo.'
  },
  {
    titulo: 'GUIÑADA',
    texto: [
      '<b>GUIÑADA</b> = como cuando <b>movés la cabeza para decir "no"</b>. La trompa gira <b>hacia la izquierda y hacia la derecha</b>. Gira sobre el eje <b class="t-verde">vertical</b> (la barra verde, de arriba hacia abajo). No tiene que ser una vuelta entera: cualquier giro así, aunque sea chico, es guiñada.',
      '<b>¿Qué la provoca?</b> Un <b>volantazo</b> (por ejemplo, para esquivar algo), una <b>ráfaga fuerte de viento</b> de costado o un <b>derrape</b>.',
      'Si la guiñada es <b>demasiada para la velocidad</b> que llevás en la curva, el camión <b>SOBREvira</b>.'
    ],
    camion: { modo: 'guinada', velocidad: 50, pausarEn: 'volantazo', demora: 0.45, vista: 'arribaCerca' },
    notaPausa: 'Pausado: dio un volantazo y la trompa giró hacia un costado sobre la barra verde, como decir "no" con la cabeza. Eso es guiñada.'
  },
  {
    titulo: 'ESP y ABS: no los confundas',
    texto: [
      '<b>ESP</b> (control de estabilidad): <b>corrige el subviraje</b>. Cuando el camión dobla de menos, frena una rueda sola para ayudarlo a girar más sobre su eje vertical, y que doble lo que vos querés.',
      '<b>ABS</b>: <b>evita que las ruedas se bloqueen</b> cuando frenás. Si frenás de más en suelo resbaladizo, las ruedas se bloquean (lo viste en el círculo de Kamm).',
      'En el examen ponen las dos respuestas mezcladas: <b>ESP = subviraje</b>, <b>ABS = bloqueo</b>.'
    ]
  },
  {
    titulo: 'Preguntas oficiales',
    texto: [],
    quiz: true
  }
];

export function crearClaseViraje({ viraje, tiempo, setVista }) {
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

  const trazoSub = document.getElementById('vv-sub');
  const trazoSobre = document.getElementById('vv-sobre');
  const etiquetaSub = document.getElementById('vv-lbl-sub');
  const etiquetaSobre = document.getElementById('vv-lbl-sobre');

  let indice = 0;
  let activo = false;
  let animPausada = false;
  let repaso = null;
  let tAnim = 0;
  const ESPERA = 0.6, DURACION = 2.4;

  let esperandoEstado = null;
  let cuentaPausa = null;

  viraje.alCambiarEstado(clave => {
    if (!activo || !esperandoEstado) return;
    if (clave === esperandoEstado) {
      cuentaPausa = PASOS[indice].camion.demora;
      esperandoEstado = null;
    }
  });

  // ---------- DIBUJO DE LA CURVA ----------
  function prepararTrazo(trazo, etiqueta, estado) {
    const largo = trazo.getTotalLength();
    trazo.style.strokeDasharray = largo;
    trazo.style.display = estado === 'no' ? 'none' : '';
    etiqueta.style.opacity = estado === 'fijo' ? 1 : 0;
    trazo.style.strokeDashoffset = estado === 'fijo' ? 0 : largo;
    trazo.dataset.largo = largo;
  }

  function animarTrazo(trazo, etiqueta, k) {
    const largo = Number(trazo.dataset.largo);
    trazo.style.strokeDashoffset = largo * (1 - k);
    etiqueta.style.opacity = k >= 1 ? 1 : 0;
  }

  // ---------- PREGUNTAS ----------
  let pregunta = 0;
  let aciertos = 0;

  function mostrarPregunta() {
    if (pregunta >= PREGUNTAS_VIRAJE.length) {
      elQuiz.innerHTML = `
        <div class="quiz-final">
          <p class="quiz-enunciado">Terminaste: acertaste <b>${aciertos} de ${PREGUNTAS_VIRAJE.length}</b>.</p>
          <button class="boton principal" id="quiz-otra-vez">Volver a empezar las preguntas</button>
        </div>`;
      document.getElementById('quiz-otra-vez').onclick = () => { pregunta = 0; aciertos = 0; mostrarPregunta(); };
      return;
    }
    const p = PREGUNTAS_VIRAJE[pregunta];
    const letras = ['a', 'b', 'c', 'd'];
    elQuiz.innerHTML = `
      <div class="quiz-meta">Pregunta ${pregunta + 1} de ${PREGUNTAS_VIRAJE.length} · salió ${p.veces} ${p.veces === 1 ? 'vez' : 'veces'} en exámenes oficiales · aciertos: ${aciertos}</div>
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
    const p = PREGUNTAS_VIRAJE[pregunta];
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

    // Dibujo de la curva
    elVisual.style.display = paso.visual ? 'block' : 'none';
    tAnim = 0;
    if (paso.visual) {
      prepararTrazo(trazoSub, etiquetaSub, paso.visual.sub);
      prepararTrazo(trazoSobre, etiquetaSobre, paso.visual.sobre);
    }

    // Camión
    const enRuta = !!(paso.camion || paso.movimiento);
    document.body.classList.toggle('clase-camion', enRuta);
    esperandoEstado = null;
    cuentaPausa = null;
    if (paso.camion) {
      viraje.configurar({ modo: paso.camion.modo, velocidad: paso.camion.velocidad });
      viraje.reiniciar();
      esperandoEstado = paso.camion.pausarEn;
      tiempo.pausado = false;
      setVista(paso.camion.vista);
    } else if (paso.movimiento) {
      viraje.configurar({ modo: paso.movimiento.modo });
      viraje.reiniciar();
      tiempo.pausado = false;
      setVista(paso.movimiento.vista);
    } else {
      viraje.configurar({ modo: 'quieto' });
      viraje.reiniciar();
      tiempo.pausado = true;
      setVista('perspectiva');
    }

    // Preguntas
    elQuiz.hidden = !paso.quiz;
    if (paso.quiz) {
      if (repaso === null) { pregunta = 0; aciertos = 0; }
      else { pregunta = repaso; repaso = null; }
      mostrarPregunta();
    }

    // Botones
    btnAnterior.disabled = indice === 0;
    btnSiguiente.style.display = indice === PASOS.length - 1 ? 'none' : '';
    const conAnimacion = paso.camion || paso.movimiento || paso.visual;
    btnPlay.style.display = conAnimacion ? '' : 'none';
    btnRepetir.style.display = conAnimacion ? '' : 'none';
    animPausada = false;
    btnVolver.style.display = (repaso !== null && !paso.quiz) ? '' : 'none';
    if (repaso !== null) btnVolver.textContent = `Volver a la pregunta ${repaso + 1}`;
    actualizarBotonPlay();
    caja.scrollTop = 0;
  }

  function enRuta() {
    const paso = PASOS[indice];
    return !!(paso.camion || paso.movimiento);
  }

  function actualizarBotonPlay() {
    const pausado = enRuta() ? tiempo.pausado : animPausada;
    btnPlay.textContent = pausado ? 'Play' : 'Pausa';
  }

  btnAnterior.onclick = () => irA(indice - 1);
  btnSiguiente.onclick = () => irA(indice + 1);
  btnRepetir.onclick = () => irA(indice);
  btnVolver.onclick = () => irA(PASOS.length - 1);
  btnPlay.onclick = () => {
    if (enRuta()) {
      tiempo.pausado = !tiempo.pausado;
      esperandoEstado = null;
      cuentaPausa = null;
    } else {
      animPausada = !animPausada;
    }
    actualizarBotonPlay();
  };

  // ---------- CADA CUADRO ----------
  function actualizar(dtReal, dtSim) {
    if (!activo) return;
    const paso = PASOS[indice];

    // Dibujo de la curva que se va trazando
    if (paso.visual && !animPausada) {
      tAnim += dtReal;
      const k = Math.max(0, Math.min(1, (tAnim - ESPERA) / DURACION));
      if (paso.visual.sub === 'anim') animarTrazo(trazoSub, etiquetaSub, k);
      if (paso.visual.sobre === 'anim') animarTrazo(trazoSobre, etiquetaSobre, k);
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

  return { entrar, actualizar };
}