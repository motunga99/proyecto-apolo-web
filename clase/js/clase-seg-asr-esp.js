// ==========================================
// SEGURIDAD · CAPÍTULO 5: EL ASR (CONTROL DE TRACCIÓN) Y EL ESP (ESTABILIDAD)
// ==========================================

export const PASOS_SEG_ASRESP = [
  {
    tipo: 'asresp',
    titulo: 'El ASR: que las ruedas no patinen al arrancar',
    texto: [
      '<b>ASR</b> y <b>TCS</b> son dos nombres del mismo sistema: el <b>control de tracción</b>. ASR viene del inglés Anti Slip Regulation ("regulación antipatinaje") y TCS de Traction Control System ("sistema de control de tracción"). En algunas preguntas lo llaman, mal, "automatic stability control": igual se refiere al ASR.',
      '<b>Qué hace:</b> evita que <b>patinen las ruedas motrices</b> (las que empujan) <b>cuando acelerás</b>. O sea, evita la <b>pérdida de tracción</b> cuando las ruedas no pueden pasarle al piso toda la fuerza del motor.',
      '<b>Mirá los dos camiones arrancando sobre hielo:</b><br>• <b>B, sin ASR:</b> las ruedas de atrás de la tractora (en <b>naranja</b>) giran locas, el camión casi no avanza y la cola se mueve.<br>• <b>A, con ASR:</b> arranca despacito y derecho. Se prende el testigo ASR en la cabina.',
      '<b>Para qué sirve:</b> para una <b>arrancada segura</b> cuando hay <b>poca adherencia</b>: hielo, nieve, barro o ruta mojada.',
      'Es de seguridad <b>activa</b>.',
      '<b>Trampa:</b> el ASR no evita que se traben las ruedas al frenar (eso es el ABS), no hace acelerar más rápido y no evita el vuelco.'
    ],
    sim: 'asr',
    vista: 'perspectiva',
    alEstado: {
      arrancan: e => { e.etiqueta('A', 'CON ASR: arranca sin patinar', 'ok'); e.etiqueta('B', 'SIN ASR: las motrices patinan', 'deuda'); }
    }
  },
  {
    tipo: 'asresp',
    titulo: '¿Cómo actúa el ASR?',
    texto: [
      '<b>1) Mira las ruedas:</b> recibe la información de <b>sensores en las ruedas</b> (los mismos del ABS). <b>Compara</b> cómo giran las <b>ruedas motrices</b> con las que <b>no son motrices</b>.',
      '<b>2) Si una motriz gira de más</b> (patina), hace dos cosas:<br>• <b>frena esa rueda</b>;<br>• <b>baja la fuerza del motor</b>.<br>Por eso el examen dice que actúa <b>sobre el motor y sobre las ruedas motrices</b> (sus frenos). No sobre las ruedas que doblan.',
      '<b>Si tiene ASR, tiene ABS:</b> la computadora del ABS es la que maneja también el ASR.',
      '<b>¿Cuándo no conviene usarlo?</b> Cuando llevás <b>cadenas</b> en las ruedas.',
      '<b>Ojo con una pregunta:</b> "¿Con qué elemento de seguridad activa está relacionado el TCS (o el ASR)?". En la mayoría de los exámenes la respuesta oficial es <b>"con la dirección"</b>, porque si las ruedas no patinan, el camión mantiene su trayectoria. En algún examen marcaron <b>"con los frenos"</b>. Fijate qué opciones te ponen.',
      '<b>Si el camión derrapa por acelerar de golpe o demasiado:</b> <b>soltá enseguida el acelerador</b>.',
      '<b>Dato:</b> el <b>EDS</b> (bloqueo electrónico del diferencial) también frena la rueda que patina, y está relacionado con los <b>frenos</b>.'
    ],
    sim: 'asr',
    vista: 'ruedas',
    alEstado: {
      arrancan: e => e.etiqueta('B', 'Rueda motriz que gira de más', 'aviso')
    }
  },
  {
    tipo: 'asresp',
    titulo: 'El ESP: el control de estabilidad',
    texto: [
      '<b>ESP</b> son las siglas de <b>Electronic Stability Program</b>: <b>programa electrónico de estabilidad</b>. También le dicen <b>control de estabilidad</b> o <b>dispositivo electrónico de estabilidad</b>.',
      '<b>Qué hace:</b> intenta que el camión <b>siga la trayectoria</b> que marcan las ruedas y el volante, <b>corrigiendo cuando se desvía</b>. Controla la estabilidad.',
      '<b>Mirá el camión SIN ESP</b> en la curva con hielo: la parte de atrás se va para afuera, el semirremolque empuja y el camión <b>se cruza</b>. Eso es la <b>tijera</b>: tractora y remolque quedan en forma de V.',
      '<b>Para qué sirve, según el examen:</b><br>• mejora activamente el seguimiento de la trayectoria y la dirección;<br>• corrige los efectos del <b>subviraje</b> (cuando el camión dobla de menos);<br>• baja el riesgo de <b>choque lateral</b> (de costado).',
      'Es de seguridad <b>activa</b>, y funciona <b>junto con el ABS</b>: es falso que sean incompatibles.',
      '<b>Trampa:</b> el ESP no es el antibloqueo, no aumenta la presión en una urgencia (eso es el BAS) y no reparte la frenada entre los ejes (eso es el EBV).'
    ],
    sim: 'espNo',
    vista: 'arriba',
    alEstado: {
      derrapa: e => e.etiqueta('A', 'SIN ESP: la cola se va y el camión se cruza', 'deuda')
    }
  },
  {
    tipo: 'asresp',
    titulo: '¿Cómo corrige el ESP?',
    texto: [
      '<b>1) Se da cuenta enseguida:</b> reconoce el <b>inicio de un derrape</b>, de las ruedas de adelante o de las de atrás.',
      '<b>2) Frena UNA sola rueda</b> para enderezar el camión. Mirá: la rueda en <b>verde</b> es la que frena el ESP.',
      '<b>Qué rueda frena:</b><br>• si se va la <b>cola</b> (derrapan las de <b>atrás</b>): frena la rueda <b>delantera de afuera</b> de la curva;<br>• si se va la <b>trompa</b> (derrapan las de <b>adelante</b>, subviraje): frena la rueda <b>trasera de adentro</b> de la curva.',
      '<b>La guiñada:</b> es el giro del camión <b>sobre su eje vertical</b>, como un trompo visto desde arriba. El ESP <b>aumenta o disminuye la guiñada</b> para que el camión siga la curva. Cuando subvira (dobla de menos), el ESP <b>aumenta</b> ese giro.',
      '<b>En el examen:</b> "¿Cómo se llama el sistema que aumenta o disminuye la guiñada para que el camión se mantenga en la trayectoria?" → el <b>ESP</b>. Es de las preguntas que más salen.'
    ],
    sim: 'espSi',
    vista: 'perspectiva',
    alEstado: {
      corrige: e => e.etiqueta('A', 'CON ESP: frena la rueda delantera de afuera y sigue la curva', 'ok')
    }
  },
  {
    tipo: 'asresp',
    titulo: 'Repaso: ASR y ESP',
    texto: [
      '<b>ASR = TCS = control de tracción:</b> evita que patinen las ruedas motrices al acelerar. Arrancada segura con poca adherencia. Sensores en las ruedas; actúa sobre el motor y los frenos de las motrices. Necesita el ABS. No con cadenas.',
      '<b>ESP = control de estabilidad:</b> mantiene la trayectoria corrigiendo desvíos; corrige el subviraje; baja el riesgo de choque lateral. Reconoce el inicio del derrape y frena una rueda.',
      '<b>Cola afuera:</b> frena la delantera de afuera. <b>Trompa afuera:</b> frena la trasera de adentro.',
      '<b>Guiñada:</b> giro sobre el eje vertical. El ESP la aumenta o la disminuye.',
      'Todos son de seguridad <b>activa</b>.'
    ],
    sim: 'quieto',
    vista: 'perspectiva'
  },
  {
    tipo: 'asresp',
    titulo: 'Preguntas oficiales: ASR y ESP',
    texto: [],
    sim: 'quieto',
    vista: 'perspectiva',
    quiz: true
  }
];
