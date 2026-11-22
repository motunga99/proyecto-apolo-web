// ==========================================
// SEGURIDAD · CAPÍTULO 7: AYUDAS A LA CONDUCCIÓN (ADAS) E IVMS
// ==========================================

export const PASOS_SEG_AYUDAS = [
  {
    tipo: 'ayudas',
    titulo: 'Las ayudas a la conducción: ADAS',
    texto: [
      'Los camiones nuevos tienen "ojos" electrónicos que miran la ruta y te ayudan. Se llaman <b>sistemas avanzados de ayuda a la conducción</b>, y sus siglas son <b>ADAS</b>.',
      '<b>¿Cómo "ven"?</b> Con tres tecnologías, y pueden usar <b>todas</b>:<br>• <b>cámara</b>, que ve líneas, señales y objetos;<br>• <b>radar</b>, que manda <b>ondas electromagnéticas</b> que rebotan en los objetos y vuelven al camión. Así sabe a qué distancia están. Mirá el cono verde que sale adelante del camión;<br>• <b>láser</b>, que mide con luz.',
      '<b>El láser:</b> con él se obtienen los <b>límites de la vía</b>, el <b>espacio libre</b> para circular y la <b>posición de los objetos</b>. Si te ponen esas tres, es <b>todas</b>. En otra versión de la pregunta las opciones son distancia, velocidad y tamaño: ahí la correcta es <b>la distancia</b>.',
      '<b>Trampa:</b> el radar no "compara con una base de datos" ni "analiza vibraciones". Rebota y vuelve.'
    ],
    sim: 'aebs',
    vista: 'perspectiva',
    alEstado: {
      anda: e => e.etiqueta('A', 'El radar mira adelante', 'ok')
    }
  },
  {
    tipo: 'ayudas',
    titulo: 'Frenado de emergencia: AEBS, FCW y PCW',
    texto: [
      '<b>AEBS</b> = <b>sistema avanzado de frenado de emergencia</b>.',
      '<b>Mirá:</b> el camión se acerca a un auto parado. Primero el radar se pone <b>naranja</b> y <b>avisa</b>. Como el conductor no frena, se pone <b>rojo</b> y el camión <b>frena solo</b>, con la máxima presión de los frenos, y para antes de chocar.',
      '<b>Qué hace el AEBS:</b><br>• <b>detecta</b> solo una posible colisión de frente y <b>avisa</b> de los obstáculos;<br>• <b>reduce la velocidad automáticamente</b> si hay riesgo de chocar de frente;<br>• si el choque es inminente, hace una <b>frenada de emergencia</b> con la <b>máxima presión</b> de frenado.',
      '<b>FCW</b> = <b>alerta de colisión frontal</b>. Solo <b>avisa</b> al conductor de que puede chocar de frente; no frena.',
      '<b>PCW</b> = alerta de colisión con <b>peatones y ciclistas</b>. Actúa cuando el choque con un peatón es inminente, <b>a baja velocidad</b>.',
      '<b>Dato:</b> el <b>PCS</b> (sistema anticolisión) está relacionado con los <b>frenos</b>.',
      '<b>Trampa:</b> el AEBS no mantiene la distancia con el de adelante (eso es el ACC) y no reparte la frenada entre los ejes.'
    ],
    sim: 'aebs',
    vista: 'perspectiva',
    alEstado: {
      avisa: e => e.etiqueta('A', 'Aviso: ¡auto parado adelante!', 'aviso'),
      frena: e => e.etiqueta('A', 'AEBS: frena solo, a fondo', 'deuda'),
      fin: e => e.etiqueta('A', 'Paró antes de chocar', 'ok')
    }
  },
  {
    tipo: 'ayudas',
    titulo: 'La distancia con el de adelante: ACC y HMW',
    texto: [
      '<b>ACC</b> = <b>control de crucero adaptativo</b>. Es el "piloto automático" que <b>adapta tu velocidad a la del vehículo de adelante</b>.',
      '<b>Mirá:</b> el auto verde de adelante frena (se le prenden las luces) y el camión <b>baja la velocidad solo</b>. Cuando el auto vuelve a acelerar, el camión también, siempre guardando la distancia.',
      'O sea: el ACC <b>reduce automáticamente la velocidad</b> cuando hace falta.',
      '<b>HMW</b> = sistema que <b>mide la distancia de seguridad</b> con el vehículo de adelante y te <b>avisa si estás demasiado cerca</b>. Esa distancia la mide en <b>segundos</b>, no en metros.',
      '<b>Trampa:</b> el ACC no detecta cambios de carril, no reconoce señales y no hace la frenada de emergencia.'
    ],
    sim: 'acc',
    vista: 'perspectiva',
    alEstado: {
      sigue: e => { e.etiqueta('A', 'ACC: guarda la distancia', 'ok'); e.etiqueta('guia', 'El de adelante', 'globo'); },
      frena: e => e.etiqueta('A', 'El de adelante frena: el ACC baja la velocidad solo', 'aviso')
    }
  },
  {
    tipo: 'ayudas',
    titulo: 'El carril: LDW y LKA',
    texto: [
      '<b>LDW</b> = <b>alerta de salida de carril</b>. Te avisa cuando <b>te salís del carril sin poner el intermitente</b>. Mirá: el camión se va hacia la línea del medio, la línea se pone <b>roja</b> y se prende el testigo.',
      '<b>LKA</b> = <b>asistente de mantenimiento en el carril</b>. No solo avisa: <b>mueve la dirección</b> para que no te salgas. Sirve para <b>evitar la salida involuntaria de la vía</b>.',
      '<b>El avisador de cambio de carril involuntario</b> puede actuar de tres formas: con <b>avisos de luz o de sonido</b>, <b>frenando</b> o <b>moviendo la dirección</b>. Si las ponen juntas, es <b>todas</b>.',
      '<b>Truco:</b> LD<b>W</b> = <b>W</b>arning, avisa. L<b>K</b>A = <b>K</b>eep, mantiene en el carril.'
    ],
    sim: 'carril',
    vista: 'arriba',
    alEstado: {
      avisa: e => e.etiqueta('A', 'LDW: ¡te salís del carril sin intermitente!', 'aviso'),
      corrige: e => e.etiqueta('A', 'LKA: corrige la dirección', 'ok')
    }
  },
  {
    tipo: 'ayudas',
    titulo: 'Ángulo muerto, luces, señales y limitador',
    texto: [
      '<b>BSM</b> = <b>control del ángulo muerto</b>. El ángulo muerto es la zona al costado del camión que <b>no ves por los espejos</b>. El BSM <b>detecta un vehículo ahí</b> y te avisa. Mirá la luz naranja en el espejo cuando el auto amarillo entra en esa zona.',
      '<b>IHC</b> = <b>cambio automático de luces</b>. Prende o apaga solo las <b>luces largas</b> (de carretera) según los faros de los otros vehículos.',
      '<b>TSR</b> = <b>reconocimiento de señales de tráfico</b>: lee las señales y te informa.<br><b>SLI</b> = te informa de las señales de <b>límite de velocidad</b>, cuando detecta una.',
      '<b>Limitador de velocidad:</b> <b>corta la inyección de combustible</b> cuando el vehículo pasa una velocidad determinada.'
    ],
    sim: 'angulo',
    vista: 'perspectiva',
    alEstado: {
      avisa: e => e.etiqueta('costado', 'BSM: hay un auto en tu ángulo muerto', 'aviso')
    }
  },
  {
    tipo: 'ayudas',
    titulo: 'El IVMS: la empresa vigila el camión',
    texto: [
      '<b>IVMS</b> = <b>sistemas de vigilancia de los vehículos</b>. <b>Ojo:</b> no son de ayuda a la conducción. Son para que la <b>empresa</b> controle su flota.',
      '<b>Qué puede hacer un IVMS:</b><br>• <b>controlar la flota por geolocalización</b> (GPS): saber dónde está cada camión;<br>• <b>registrar el consumo</b> de combustible;<br>• ayudar a <b>calcular los tiempos de entrega</b> de la mercancía;<br>• hacer un <b>seguimiento del conductor</b>: velocidades, aceleraciones y frenadas bruscas;<br>• <b>grabar el interior</b> del vehículo, para ver si la carga está bien colocada, o dónde van sentados los pasajeros;<br>• llevar un <b>botón antipánico</b>, para la seguridad del conductor en zonas peligrosas.',
      '<b>Trampa:</b> el IVMS no frena, no avisa de la salida de carril y no mira la velocidad de cada rueda.'
    ],
    sim: 'quieto',
    vista: 'perspectiva'
  },
  {
    tipo: 'ayudas',
    titulo: 'Repaso: ayudas a la conducción',
    texto: [
      '<b>ADAS:</b> ayudas avanzadas. Usan cámara, radar (ondas que rebotan) y láser.',
      '<b>AEBS:</b> frena solo ante un choque de frente inminente. <b>FCW:</b> avisa de un choque de frente. <b>PCW:</b> peatones y ciclistas.',
      '<b>ACC:</b> adapta la velocidad a la del de adelante. <b>HMW:</b> distancia de seguridad, en segundos.',
      '<b>LDW:</b> avisa si salís del carril sin intermitente. <b>LKA:</b> corrige la dirección.',
      '<b>BSM:</b> ángulo muerto. <b>IHC:</b> luces largas automáticas. <b>TSR / SLI:</b> señales. <b>Limitador:</b> corta la inyección.',
      '<b>IVMS:</b> vigilancia de la flota: GPS, consumo, entregas, seguimiento del conductor, grabar el interior, botón antipánico.'
    ],
    sim: 'quieto',
    vista: 'perspectiva'
  },
  {
    tipo: 'ayudas',
    titulo: 'Preguntas oficiales: ayudas a la conducción',
    texto: [],
    sim: 'quieto',
    vista: 'perspectiva',
    quiz: true
  }
];
