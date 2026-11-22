// ==========================================
// SEGURIDAD · CAPÍTULO 2: LOS FRENOS Y EL FADING
// ==========================================

export const PASOS_SEG_FRENOS = [
  {
    tipo: 'frenos',
    titulo: 'El freno de servicio y el de estacionamiento',
    texto: [
      '<b>Freno de servicio:</b> es el freno normal, el que accionás al <b>pisar el pedal</b>. Frena todas las ruedas.',
      '<b>En el camión los frenos son de aire</b> (sistema neumático). Cuanto más fuerte pisás, <b>más aire</b> pasa por los caños hasta los frenos. Por eso el conductor tiene que comprobar que hay <b>suficiente presión de aire</b> en el circuito.',
      '<b>Cómo se frena bien:</b> <b>con tiempo, de forma suave y progresiva</b>, sin golpes. Es lo que más pregunta el examen.',
      '<b>La forma exacta que pide una pregunta:</b> hacés presión en el pedal <b>al empezar a frenar</b> y la vas <b>aflojando de a poco</b> a medida que baja la velocidad. Así la carga no se va para adelante y el camión queda <b>más estable</b>.<br><b>Trampa:</b> no es "suave al principio y cada vez más fuerte". Y pisar <b>a fondo</b> es solo para una emergencia con ABS (capítulo 4).',
      '<b>Freno de estacionamiento</b> (el de mano): en el camión lo aprieta un <b>resorte</b> (un muelle) cuando se saca el aire del pulmón del freno. <b>No lo pongas con los frenos calientes</b>: la fuerza del resorte puede deformar las piezas.',
      '<b>Freno de socorro:</b> el camión tiene <b>tres circuitos de aire separados</b>, controlados por la <b>válvula de cuatro vías</b>. Si un circuito pierde aire, esa válvula mantiene la presión en los otros.'
    ],
    sim: 'quieto',
    vista: 'ruedas'
  },
  {
    tipo: 'frenos',
    titulo: 'Freno de disco y freno de tambor',
    texto: [
      '<b>¿Cómo frena una rueda?</b> Frotando. Detrás de cada rueda hay una pieza que <b>gira junto con la rueda</b> y otra que <b>no se mueve</b>. Al pisar el freno, la que no se mueve <b>roza</b> a la que gira y la va parando. Como cuando frenás una bici apretando la rueda con la mano.',
      'Hay <b>dos clases</b> de freno: el de <b>disco</b> y el de <b>tambor</b>. Mirá el dibujo de la derecha.',
      '<b>1) Freno de DISCO</b><br>• El <b>disco</b> es un plato de metal redondo pegado a la rueda. <b>Gira</b> con ella.<br>• La <b>pinza</b> es una pieza fija que abraza el disco, como una pinza de colgar ropa. Es la parte roja del dibujo.<br>• Adentro de la pinza van las <b>pastillas</b>: dos tacos que rozan, uno de cada lado del disco. <b>No giran.</b><br>• Al pisar el freno, las pastillas <b>se juntan y aprietan el disco</b>, como cuando apretás una moneda entre dos dedos.',
      '<b>Datos del disco:</b> las pastillas <b>nunca se ajustan a mano</b>, se acercan solas a medida que se gastan. Los <b>discos ventilados</b> tienen canales por dentro por donde pasa el aire, y así se enfrían mejor.',
      '<b>2) Freno de TAMBOR</b><br>• El <b>tambor</b> es como una <b>olla</b> de metal pegada a la rueda. <b>Gira</b> con ella.<br>• Adentro de la olla van las <b>zapatas</b>: dos piezas curvas, con forma de media luna. <b>No giran.</b> Se llaman así, zapatas; no tienen nada que ver con el calzado.<br>• Al pisar el freno, las zapatas <b>se abren hacia afuera</b> y rozan la olla por dentro.<br>• Al soltar el pedal, un resorte llamado <b>muelle recuperador</b> las vuelve a cerrar.',
      '<b>Truco para no confundirte:</b><br>• <b>Disco</b> → <b>pastillas</b> que <b>aprietan desde afuera</b>.<br>• <b>Tambor</b> → <b>zapatas</b> que <b>empujan desde adentro</b>.',
      '<b>El roce da calor.</b> Frotá rápido tus manos: se calientan. Con los frenos pasa lo mismo. La rueda ayuda a sacar parte de ese calor al aire. Los discos y tambores se cambian cuando están <b>rayados o gastados de forma rara</b> (desparejos).',
      '<b>Dato:</b> los camiones grandes frenan en menos distancia gracias a los <b>frenos de disco</b> y al <b>ABS</b>.'
    ],
    sim: 'quieto',
    vista: 'ruedas',
    figura: { img: 'freno-disco', titulo: 'Freno de disco', texto: 'El DISCO gira con la rueda. La PINZA roja no gira: adentro tiene las PASTILLAS, que aprietan el disco.' },
    linea: [
      [16, e => e.figura({ img: 'freno-tambor', titulo: 'Freno de tambor', texto: 'El TAMBOR (la olla) gira con la rueda. Las ZAPATAS (medias lunas) no giran: se abren y lo rozan por dentro.' })]
    ]
  },
  {
    tipo: 'frenos',
    titulo: 'El fading: los frenos se calientan y dejan de frenar',
    texto: [
      'Mirá el camión bajando la montaña con <b>solo el freno de servicio</b>. Al principio aguanta… pero los frenos se van poniendo <b>naranjas</b>, después <b>rojos</b>, y el camión <b>empieza a acelerar solo</b>.',
      '<b>Eso es el fading</b> (se dice "féiding"): cuando por usar mucho el freno de servicio, las pastillas o zapatas se <b>calientan demasiado</b> y <b>pierden eficacia</b>. Frenan cada vez menos.',
      '<b>¿Por qué pasa?</b> Por <b>abusar del freno de servicio</b>. El examen también lo describe como la <b>cristalización de los elementos frenantes</b>.',
      '<b>¿Dónde pasa más?</b> En las <b>bajadas largas</b> (pendientes descendentes).',
      '<b>Dato:</b> un camión en movimiento lleva una energía que depende de su <b>masa</b> y de su <b>velocidad</b>. Más peso y más velocidad = más calor en los frenos para pararlo.',
      '<b>Trampa:</b> te ponen nombres inventados: "efecto tubeless", "reinforced", "aquaplaning", "shipping", "folding". El que se calienta y deja de frenar es el <b>fading</b>.'
    ],
    sim: 'fading',
    vista: 'perspectiva',
    alEstado: {
      calienta: e => e.etiqueta('A', 'Los frenos se calientan…', 'aviso'),
      fading: e => e.etiqueta('A', 'FADING: ya casi no frenan y el camión acelera', 'deuda')
    }
  },
  {
    tipo: 'frenos',
    titulo: 'Cómo evitar el fading en una bajada',
    texto: [
      '<b>Antes de empezar la bajada:</b> <b>bajá la velocidad</b>. Una buena medida es ir unos <b>20 km/h por debajo</b> de la que te parece segura.',
      '<b>Durante la bajada:</b><br>• poné una <b>marcha más corta</b>, así el motor retiene;<br>• usá los <b>ralentizadores</b> antes que el freno de servicio (los ves en el capítulo 3);<br>• el freno de servicio, solo si hace falta.',
      '<b>Si igual el camión agarra velocidad:</b> pisá el freno de servicio <b>de forma progresiva</b>.',
      '<b>Lo que NUNCA hay que hacer:</b> bajar en <b>punto muerto</b> ni con el <b>motor apagado</b>. Te quedás sin el freno del motor y los frenos se calientan.',
      '<b>Si frenás de golpe en una bajada:</b> la carga se puede ir para adelante. En una cisterna, el líquido se mueve adentro.'
    ],
    sim: 'ralentizador',
    vista: 'perspectiva',
    alEstado: {
      retiene: e => e.etiqueta('A', 'Con ralentizador y marcha corta: los frenos quedan fríos', 'ok')
    }
  },
  {
    tipo: 'frenos',
    titulo: 'Repaso: los frenos',
    texto: [
      '<b>Freno de servicio:</b> el pedal. Con tiempo, suave y progresivo: presión al empezar y aflojando de a poco. Es de aire: comprobar la presión.',
      '<b>Estacionamiento:</b> lo aprieta un resorte; no ponerlo con los frenos calientes. <b>Socorro:</b> tres circuitos y válvula de cuatro vías.',
      '<b>Disco:</b> gira el disco, frotan las pastillas. <b>Tambor:</b> gira el tambor, las zapatas se abren; el muelle recuperador las devuelve.',
      '<b>Fading:</b> calentamiento de los frenos por abusar del freno de servicio → pierden eficacia. Más en bajadas.',
      '<b>Para evitarlo:</b> bajar la velocidad antes, marcha corta, ralentizador primero. Nunca punto muerto.'
    ],
    sim: 'quieto',
    vista: 'ruedas'
  },
  {
    tipo: 'frenos',
    titulo: 'Preguntas oficiales: los frenos',
    texto: [],
    sim: 'quieto',
    vista: 'perspectiva',
    quiz: true
  }
];
