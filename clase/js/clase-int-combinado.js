// ==========================================
// INTERNACIONAL · CAPÍTULO 6: TRANSPORTE COMBINADO
// Transporte intermodal, acompañado y no acompañado, barco (Ro-Ro),
// tren (canguro, piggy back) y contenedores. Solo Mercancías.
// ==========================================

const ESTRECHO = ['camion', 'puerto', 'ferry', 'aduanaMA', 'barreraES'];

export const PASOS_COMBINADO = [
  {
    tipo: 'combinado',
    titulo: '¿Qué es el transporte combinado?',
    texto: [
      'A veces la mercancía no hace todo el viaje en camión: una parte va en <b>barco</b> o en <b>tren</b>. Eso se llama transporte <b>intermodal</b> o <b>combinado</b>. "Modo" quiere decir manera de transportar: carretera, tren, barco o avión.',
      'En el examen la definición es: varios modos de transporte <b>uno detrás de otro</b>, <b>sin tocar la mercancía</b> en los cambios. La carga va siempre dentro del mismo semirremolque o del mismo contenedor.',
      '<b>Ejemplo:</b> llevás muebles de Madrid a Tánger. El camión va por carretera hasta Algeciras, sube al ferry y del otro lado sigue por carretera. Las cajas de muebles nunca se bajaron.',
      '<b>Trampa:</b> no es "al mismo tiempo", es <b>uno después del otro</b>. Y si en los cambios se descarga la mercancía, ya no es intermodal.'
    ],
    base: ESTRECHO,
    alArrancar: e => { e.camionA(-76, true, 0.02); e.ferryA(-90, true); },
    vista: 'estrecho',
    linea: [
      [0.6, e => e.camionA(-90, false, 1.95)],
      [4.0, e => e.etiqueta('camion', 'Carretera → barco → carretera, sin tocar la carga', 'ok')],
      [4.5, e => { e.ferryA(-104); e.camionA(-104, false, 1.95); }],
      [10.0, e => e.camionA(-125, false, 0.02)]
    ]
  },
  {
    tipo: 'combinado',
    titulo: 'Acompañado y no acompañado',
    texto: [
      '<b>Acompañado:</b> sube al barco o al tren el <b>camión entero</b>, con su conductor.<br><b>Ejemplo:</b> lo que viste en el paso anterior. Vos cruzás el Estrecho con tu camión.',
      '<b>No acompañado:</b> sube <b>solo el semirremolque</b>, la caja de atrás. La tractora y el conductor no viajan.<br><b>Ejemplo:</b> en Algeciras dejás el semirremolque en el ferry y te volvés a Madrid con la tractora. En Tánger, otra tractora lo engancha y lo lleva a destino.',
      '<b>¿Por qué conviene?</b> Porque la tractora y el conductor no pierden horas esperando el barco: siguen trabajando.',
      '<b>Trampa:</b> no tiene nada que ver con ir sin carta de porte, ni con dos conductores que se separan.'
    ],
    base: ESTRECHO,
    alArrancar: e => { e.camionA(-76, true, 0.02); e.ferryA(-90, true); e.soloRemolque(true); },
    vista: 'estrecho',
    linea: [
      [0.6, e => e.etiqueta('camion', 'Solo viaja el semirremolque: NO ACOMPAÑADO', 'precio')],
      [1.0, e => e.camionA(-90, false, 1.95)],
      [5.0, e => { e.ferryA(-104); e.camionA(-104, false, 1.95); }],
      [9.5, e => e.etiqueta('aduanaMA', 'Del otro lado lo engancha otra tractora', 'globo')]
    ]
  },
  {
    tipo: 'combinado',
    titulo: 'Con barco: el Ro-Ro',
    texto: [
      '<b>Ro-Ro</b> viene del inglés <b>Roll on - Roll off</b>: "subir rodando, bajar rodando". Es el transporte <b>carretera - barco</b> donde los camiones o los semirremolques entran y salen del barco <b>sobre sus ruedas</b>, sin grúas.',
      'Al conjunto de técnicas para subir y bajar vehículos rodando a un barco se le dice <b>transroulage</b>. <b>Truco:</b> roulage = rodar.',
      '<b>Trampa:</b> el Ro-Ro no es carretera - tren ni carretera - avión.'
    ],
    base: ESTRECHO,
    alArrancar: e => { e.camionA(-76, true, 0.02); e.ferryA(-90, true); },
    vista: 'estrecho',
    linea: [
      [0.6, e => e.camionA(-90, false, 1.95)],
      [3.5, e => e.etiqueta('ferry', 'RO-RO: el camión sube y baja rodando', 'ok')]
    ]
  },
  {
    tipo: 'combinado',
    titulo: 'Con tren: canguro y piggy back',
    texto: [
      'Los semirremolques también pueden viajar arriba de un tren.',
      '<b>Técnica canguro:</b> el semirremolque va en un <b>vagón de tren</b> que tiene una parte más baja, como una bolsa, donde se meten sus ruedas. <b>Truco:</b> como la cría del canguro dentro de la bolsa.',
      '<b>Piggy back:</b> es la que se usa en <b>Estados Unidos</b>, porque allá los túneles y puentes del tren son más altos. A esa altura máxima se le dice <b>gálibo</b>. Con más gálibo, el semirremolque entra sin tener que bajarlo.',
      '<b>Trampa:</b> canguro no es un camión en un barco que va a Australia, ni un vagón arriba de un camión.'
    ],
    base: ['apolo', 'vias', 'tren'],
    alArrancar: e => e.trenA(-125, true),
    vista: 'madrid',
    linea: [
      [0.5, e => e.trenA(-60)],
      [4.5, e => e.etiqueta('tren', 'Canguro: el semirremolque va en el vagón, con las ruedas en la bolsa', 'precio')]
    ]
  },
  {
    tipo: 'combinado',
    titulo: 'Los contenedores',
    texto: [
      'Un <b>contenedor</b> es una caja de metal de medidas fijas, que pasa del barco al tren y al camión <b>sin abrirla</b>. Su gran ventaja: la mercancía viaja <b>sin ruptura de carga</b>, o sea, sin descargarla en cada cambio.',
      '<b>Datos que pregunta el examen:</b><br>• un contenedor de <b>20 pies</b> tiene unos <b>30 metros cúbicos</b> de lugar;<br>• todos llevan escrita una combinación de <b>4 letras y 7 números</b> para identificarlos;<br>• el contenedor <b>IGLOO</b> es el de los <b>aviones</b>, con forma redondeada para la panza del avión.',
      '<b>Si llevás un contenedor grande que viene de un barco</b>, junto con la carta de porte te dan un <b>certificado de arrumazón</b>: el papel que dice cómo se cargó y se sujetó la mercancía dentro del contenedor.'
    ],
    base: ['camion', 'puerto', 'ferry'],
    vista: 'estrecho',
    linea: [
      [0.6, e => e.etiqueta('puerto', 'Contenedor: sin ruptura de carga', 'ok')]
    ]
  },
  {
    tipo: 'combinado',
    titulo: 'Repaso: transporte combinado',
    texto: [
      '<b>Intermodal:</b> varios modos de transporte, uno detrás de otro, sin tocar la mercancía en los cambios.',
      '<b>Acompañado:</b> viaja el camión entero con el conductor. <b>No acompañado:</b> solo el semirremolque.',
      '<b>Ro-Ro:</b> carretera - barco, subiendo y bajando rodando. Eso se llama transroulage.',
      '<b>Canguro:</b> semirremolque en un vagón con zona baja. <b>Piggy back:</b> Estados Unidos, por el gálibo más alto.',
      '<b>Contenedor:</b> sin ruptura de carga. 20 pies = unos 30 m³. 4 letras y 7 números. IGLOO = avión. Certificado de arrumazón.'
    ],
    base: ESTRECHO,
    vista: 'estrecho',
    linea: []
  },
  {
    tipo: 'combinado',
    titulo: 'Preguntas oficiales: transporte combinado',
    texto: [],
    base: ['camion', 'apolo'],
    vista: 'general',
    linea: [],
    quiz: true
  }
];
