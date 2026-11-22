// ==========================================
// SEGURIDAD · CAPÍTULO 6: EL EBS Y EL BAS
// ==========================================

export const PASOS_SEG_EBSBAS = [
  {
    tipo: 'ebsbas',
    titulo: 'El EBS: todos los frenos a la vez',
    texto: [
      '<b>EBS</b> es el <b>control electrónico del sistema de frenado</b> (en inglés, Electronic Braking System o Electronically controlled Brake System). Es una mejora del sistema de <b>frenos</b>.',
      '<b>El problema que resuelve:</b> en un camión largo con frenos de aire, el aire tarda en llegar hasta las ruedas del fondo del remolque. Unas ruedas empiezan a frenar antes que otras.',
      '<b>Mirá los dos camiones:</b> frenan en el mismo lugar (la bandera amarilla).<br>• <b>B, sin EBS:</b> primero frenan las de adelante, después las del medio y al final las del remolque. Para más lejos (bandera <b>roja</b>).<br>• <b>A, con EBS:</b> se iluminan <b>todas las ruedas a la vez</b>. Para antes (bandera <b>verde</b>).',
      '<b>Qué hace el EBS:</b> cuando <b>pisás el pedal</b>, activa los frenos de <b>todos los ejes</b> al mismo tiempo, de forma <b>inmediata, simultánea y pareja</b>. Si el examen pregunta cómo actúa y aparecen esas tres, es <b>todas</b>.',
      '<b>Lo que se consigue:</b> sincroniza y reparte la frenada entre todas las ruedas, frena y suelta al instante, y <b>acorta la distancia de frenado</b>.',
      '<b>¿Cuándo entra en acción?</b> <b>Al pisar el pedal del freno</b>. No cuando detecta un obstáculo: ese es el AEBS, que lo ves en el capítulo 7.',
      'Es de seguridad <b>activa</b>.'
    ],
    sim: 'ebs',
    vista: 'perspectiva',
    alEstado: {
      frenan: e => { e.etiqueta('A', 'CON EBS: todas las ruedas a la vez', 'ok'); e.etiqueta('B', 'SIN EBS: el remolque frena tarde', 'deuda'); }
    }
  },
  {
    tipo: 'ebsbas',
    titulo: 'El BAS: aprieta más fuerte en una urgencia',
    texto: [
      '<b>BAS</b> son las siglas de <b>Brake Assist System</b>: <b>asistente a la frenada de urgencia</b>.',
      '<b>El problema:</b> en un susto, mucha gente pisa el freno <b>rápido pero no a fondo</b>.',
      '<b>Qué hace el BAS:</b> se da cuenta de que es una emergencia por la <b>rapidez o la fuerza</b> con que pisaste el pedal, y <b>aumenta la presión de frenado</b> hasta el máximo.',
      '<b>Mirá la cabina:</b> el conductor pisa solo la mitad (barra roja, 50%), pero el BAS frena a fondo (barra violeta). <b>A, con BAS,</b> para antes del auto. <b>B, sin BAS,</b> frena con lo que pisó el conductor y choca.',
      '<b>Ojo con una respuesta rara del examen:</b> a "¿cómo actúa el BAS?", la respuesta oficial es <b>"como un freno neumático convencional que lleva acoplado un sistema de mando electrónico"</b>. Quiere decir que son los frenos de aire de siempre, con una electrónica que los aprieta más.',
      'Es de seguridad <b>activa</b>.'
    ],
    sim: 'bas',
    vista: 'perspectiva',
    alEstado: {
      frenan: e => { e.etiqueta('A', 'CON BAS: pisó a medias, pero frena a fondo', 'ok'); e.etiqueta('B', 'SIN BAS: frena solo lo que pisó', 'deuda'); }
    }
  },
  {
    tipo: 'ebsbas',
    titulo: 'Las siglas que se confunden',
    texto: [
      'El examen mezcla todas las siglas en las opciones. Esta tabla es para no confundirte:',
      '• <b>ABS</b> = antibloqueo: que no se traben las ruedas al <b>frenar</b>.<br>• <b>ASR / TCS</b> = control de tracción: que no patinen al <b>acelerar</b>.<br>• <b>ESP</b> = estabilidad: que siga la <b>curva</b>, frenando una rueda.<br>• <b>EBV</b> = reparte la frenada entre el eje de <b>adelante y el de atrás</b> según el peso.<br>• <b>EBS</b> = frena <b>todos los ejes a la vez</b>, al instante, al pisar el pedal.<br>• <b>BAS</b> = en una <b>urgencia</b>, aprieta más fuerte que vos.<br>• <b>AEBS</b> = frena <b>solo</b> si va a chocar de frente (capítulo 7).',
      '<b>Pregunta que sale:</b> "¿Qué sistemas electrónicos hacen más eficiente y segura la frenada?", con opciones "ESP y BAS", "AEBS y BAS", "EBS y BAS". Todos ayudan a frenar mejor: la correcta es <b>todas son correctas</b>.',
      '<b>Otra:</b> "ABS, ESP o BAS son elementos…" → <b>electrónicos que aumentan la seguridad activa</b>.'
    ],
    sim: 'ebs',
    vista: 'perspectiva'
  },
  {
    tipo: 'ebsbas',
    titulo: 'Repaso: EBS y BAS',
    texto: [
      '<b>EBS:</b> control electrónico de los frenos. Al pisar el pedal, frenan todos los ejes de forma inmediata, simultánea y pareja. Acorta la distancia. Seguridad activa.',
      '<b>BAS:</b> asistente a la frenada de urgencia. Detecta la emergencia por la rapidez o la fuerza del pedal y aumenta la presión de frenado. Seguridad activa.',
      '<b>Frenada más eficiente y segura:</b> ESP, BAS, AEBS y EBS → todas.'
    ],
    sim: 'quieto',
    vista: 'perspectiva'
  },
  {
    tipo: 'ebsbas',
    titulo: 'Preguntas oficiales: EBS y BAS',
    texto: [],
    sim: 'quieto',
    vista: 'perspectiva',
    quiz: true
  }
];
