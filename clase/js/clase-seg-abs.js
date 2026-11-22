// ==========================================
// SEGURIDAD · CAPÍTULO 4: EL ABS (y el EBV)
// Dos camiones frenan fuerte con la ruta mojada:
// A (azul, con ABS) y B (gris, sin ABS).
// ==========================================

export const PASOS_SEG_ABS = [
  {
    tipo: 'abs',
    titulo: '¿Qué es el ABS?',
    texto: [
      '<b>ABS</b> son las siglas en inglés de <b>"sistema de frenos antibloqueo"</b> (Antilock Braking System; a veces escriben "antiblock brake system"). En castellano: <b>antibloqueo de frenos</b> o <b>antibloqueo de ruedas</b>.',
      '<b>Qué hace:</b> cuando frenás fuerte, <b>evita que las ruedas se traben</b> (que se bloqueen y dejen de girar).',
      '<b>Mirá los dos camiones</b> frenando a fondo con la ruta mojada:<br>• <b>B, el gris, sin ABS:</b> las ruedas se traban (en <b>rojo</b>), deja marcas negras, sigue <b>derecho</b> aunque gire el volante, y choca.<br>• <b>A, el azul, con ABS:</b> las ruedas siguen girando (titilan en <b>naranja</b>: el ABS suelta y aprieta muchas veces por segundo). <b>Puede doblar</b> y esquiva el auto.',
      'Es un sistema <b>electrónico</b> de seguridad <b>activa</b>, como el ESP y el BAS.',
      '<b>Siglas trampa:</b> EBV, ABF, ABP, ATP, ADR o BAS no son el antibloqueo. El antibloqueo es el <b>ABS</b>.'
    ],
    sim: 'abs',
    vista: 'perspectiva',
    alEstado: {
      frenan: e => { e.etiqueta('A', 'CON ABS: las ruedas giran y puede esquivar', 'ok'); e.etiqueta('B', 'SIN ABS: ruedas trabadas, sigue derecho', 'deuda'); }
    }
  },
  {
    tipo: 'abs',
    titulo: '¿Por qué es tan importante?',
    texto: [
      '<b>Una rueda trabada es peligrosa:</b> el camión se vuelve <b>inestable</b>, derrapa y <b>no obedece al volante</b>. Una rueda que patina no dobla.',
      '<b>El ABS es una gran mejora de la seguridad activa porque:</b><br>• <b>mantiene el control de la dirección</b>: podés esquivar mientras frenás;<br>• <b>reduce la distancia de frenado</b>;<br>• baja el riesgo de <b>derrape</b>.',
      '<b>¿Funciona siempre?</b> Sí: evita el bloqueo <b>sea cual sea el estado de la ruta</b>: seca, mojada, con nieve o con hielo.',
      '<b>Ojo con la distancia de frenado:</b> con <b>mojado</b> la acorta; con <b>seco</b> casi no la cambia; y con <b>grava o nieve</b> puede ser <b>mayor</b>. Por eso es falso que el ABS "siempre reduce la distancia" o que "frena a la mitad".',
      '<b>Trampa:</b> el ABS no detiene el camión de golpe ni frena solo. Vos seguís frenando; el ABS solo evita que se traben las ruedas.'
    ],
    sim: 'abs',
    vista: 'perspectiva',
    alEstado: {
      frenan: e => { e.etiqueta('A', 'Mantiene la dirección', 'ok'); e.etiqueta('B', 'Rueda bloqueada = inestable', 'deuda'); }
    }
  },
  {
    tipo: 'abs',
    titulo: '¿Cómo funciona por dentro?',
    texto: [
      '<b>1) Sensores en TODAS las ruedas:</b> miden la <b>velocidad de giro</b> de cada rueda mientras frenás.',
      '<b>2) La computadora compara:</b> la velocidad de cada rueda con la del camión. Si una rueda <b>frena de golpe</b> mucho más que el camión, es que se va a trabar.',
      '<b>3) Afloja esa rueda:</b> <b>baja la presión de frenado</b> (de aire o de líquido) que llega a esa rueda, la deja girar y vuelve a apretar. Lo repite muchas veces por segundo.',
      'Por eso el examen dice que el ABS <b>regula la presión</b> que llega a los elementos frenantes, sobre una o varias ruedas. No regula lo que vos hacés con el pie, ni el servofreno.',
      '<b>¿Hasta cuándo?</b> Mantiene las ruedas girando hasta unos <b>6 o 7 km/h</b>. Ahí deja que se frenen del todo.',
      '<b>¿Se siente?</b> Sí: cuando el ABS trabaja, el <b>pedal del freno vibra</b>. Mirá el pedal de la cabina: tiembla. Es normal.'
    ],
    sim: 'abs',
    vista: 'ruedas',
    alEstado: {
      frenan: e => e.etiqueta('A', 'El ABS suelta y aprieta: el pedal vibra', 'aviso')
    }
  },
  {
    tipo: 'abs',
    titulo: 'Cómo frenar, con ABS y sin ABS',
    texto: [
      '<b>Con ABS, en una emergencia:</b> <b>pisá el freno a fondo</b> y no lo sueltes, aunque vibre. Y esquivá con el volante.',
      '<b>Sin ABS:</b> frená <b>con fuerza, pero sin que se traben</b> las ruedas. Si igual se traban, <b>levantá un poco el pie del pedal</b> hasta que las ruedas vuelvan a girar, y volvé a frenar.',
      '<b>Si el camión derrapa por pisar demasiado el freno:</b> <b>soltá enseguida</b> la presión del pedal.',
      '<b>Trampas:</b> "esperar a que el ABS desbloquee las ruedas", "pisar el embrague y el freno a la vez", "usar el freno de mano junto con el pedal" o "dar volantazos": todas están mal.',
      '<b>Dato:</b> si la <b>suspensión</b> está en mal estado, el ABS <b>pierde efectividad</b>, porque las ruedas rebotan y no apoyan bien.'
    ],
    sim: 'abs',
    vista: 'perspectiva',
    alEstado: {
      frenan: e => { e.etiqueta('A', 'Con ABS: freno A FONDO', 'ok'); e.etiqueta('B', 'Sin ABS: aflojar hasta que giren', 'aviso'); }
    }
  },
  {
    tipo: 'abs',
    titulo: 'El EBV: reparte la frenada entre adelante y atrás',
    texto: [
      'Hay otro sistema que trabaja junto con el ABS: el <b>EBV</b>, la <b>distribución electrónica de la fuerza de frenado</b> (en inglés, Electronic Brake Variation).',
      '<b>Qué hace:</b> <b>reparte la frenada entre el eje de adelante y el de atrás</b>, según el <b>peso</b> que carga cada uno.',
      '<b>Ejemplo:</b> si el camión va vacío, atrás hay poco peso y esas ruedas se traban fácil: el EBV les manda <b>menos</b> fuerza. Cargado, les manda más.',
      '<b>Trampa:</b> el EBV reparte entre adelante y atrás, no entre derecha e izquierda. Y no es el BAS: el BAS aprieta más fuerte en una urgencia (lo ves en el capítulo 6).'
    ],
    sim: 'abs',
    vista: 'ruedas'
  },
  {
    tipo: 'abs',
    titulo: 'Repaso: el ABS',
    texto: [
      '<b>ABS = antibloqueo:</b> evita que las ruedas se traben al frenar, en cualquier estado de la ruta. Seguridad activa, electrónico.',
      '<b>Por qué importa:</b> mantiene la dirección y reduce la distancia de frenado (en mojado; con grava o nieve puede ser mayor).',
      '<b>Cómo:</b> sensores en todas las ruedas, compara con la velocidad del camión y regula la presión de frenado. Hasta 6 o 7 km/h. Vibra el pedal.',
      '<b>Frenar:</b> con ABS a fondo; sin ABS fuerte sin trabar, y si se traban, aflojar hasta que giren.',
      '<b>EBV:</b> reparte la frenada entre adelante y atrás según el peso.'
    ],
    sim: 'quieto',
    vista: 'perspectiva'
  },
  {
    tipo: 'abs',
    titulo: 'Preguntas oficiales: el ABS',
    texto: [],
    sim: 'quieto',
    vista: 'perspectiva',
    quiz: true
  }
];
