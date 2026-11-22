// ==========================================
// INTERNACIONAL · CAPÍTULO 5: ADUANA, TRÁNSITO Y TIR
// Territorio aduanero, mercancías de la Unión, declaraciones y DUA,
// tránsito aduanero, operador económico autorizado, contrabando,
// TIR y cuaderno ATA. Solo Mercancías.
// ==========================================

const BASE = ['camion', 'vos', 'apolo'];
const SUIZA = ['camion', 'cliente', 'quesos', 'aduanaCH', 'barrera'];

export const PASOS_ADUANA = [
  {
    tipo: 'aduana',
    titulo: '¿Qué es la aduana?',
    texto: [
      'La <b>aduana</b> es la oficina que controla las <b>mercancías</b> que entran o salen de un territorio, y cobra los impuestos que correspondan. No controla a las personas: eso es la policía de fronteras.',
      'Toda la Unión Europea es <b>un solo territorio aduanero</b>. Por eso, entre España y Francia no hay aduana: la mercancía circula libre.',
      '<b>España entera está dentro, menos Ceuta y Melilla.</b> Por eso, si traés mercancía de Ceuta o Melilla a la Península, hay que hacer declaración en aduana. Y algo fabricado totalmente en Melilla se considera mercancía <b>de afuera</b> de la Unión.',
      'Suiza y Marruecos están fuera del territorio aduanero de la Unión. Ahí sí hay aduana.'
    ],
    base: SUIZA,
    alArrancar: e => e.camionA(36, true),
    vista: 'suiza',
    linea: [
      [0.4, e => e.camionA(56)],
      [3.5, e => e.etiqueta('aduanaCH', 'Aduana: controla la MERCANCÍA, no a las personas', 'aviso')]
    ]
  },
  {
    tipo: 'aduana',
    titulo: 'Mercancías de la Unión y de afuera',
    texto: [
      '<b>Mercancías de la Unión:</b><br>• las hechas totalmente dentro de la Unión, sin piezas importadas;<br>• las que vinieron de afuera y ya pasaron la aduana para venderse acá. Eso se llama <b>despacho a libre práctica</b>;<br>• las hechas en la Unión mezclando las dos anteriores.',
      'Si una mercancía está dentro de la Unión, se considera <b>de la Unión, salvo que se demuestre lo contrario</b>.',
      '<b>Cuando una mercancía de la Unión sale</b> del territorio, pasa a ser <b>de afuera</b>. Y si después vuelve a entrar, ya no se considera de la Unión: tiene que volver a hacer el trámite.<br><b>Ejemplo:</b> vendés vino de la Bodega Sol a Marruecos. Si te lo devuelven, entra como mercancía de afuera.'
    ],
    base: [...BASE, 'remitente'],
    vista: 'madrid',
    linea: [
      [0.6, e => e.etiqueta('remitente', 'Vino hecho en España: mercancía de la Unión', 'ok')]
    ]
  },
  {
    tipo: 'aduana',
    titulo: 'Palabras de la aduana',
    texto: [
      '<b>Exportación:</b> sacar mercancía de la Unión <b>fuera</b> del territorio aduanero de la Unión. No es mandarla de España a Francia.',
      '<b>Despacho a libre práctica:</b> lo que se hace con mercancía de afuera para venderla dentro de la Unión. Después de eso, pasa a ser mercancía de la Unión.',
      '<b>Depósito temporal:</b> cuando la mercancía de afuera llega a la aduana, queda guardada ahí hasta que se le hace el trámite. Como mucho, <b>90 días</b>.',
      '<b>Levante:</b> cuando la aduana la libera para que se use en el régimen que se pidió.',
      '<b>Vigilancia aduanera:</b> mientras la aduana la vigila, no se puede descargar sin permiso, salvo <b>peligro inminente</b>. Deja de estar vigilada cuando cambia su situación aduanera o sale del territorio.',
      '<b>Destrucción:</b> la aduana puede ordenar destruir una mercancía, y el gasto lo paga el dueño.'
    ],
    base: SUIZA,
    alArrancar: e => e.camionA(56, true),
    vista: 'suiza',
    linea: [
      [0.6, e => e.etiqueta('aduanaCH', 'Depósito temporal: hasta 90 días', 'precio')]
    ]
  },
  {
    tipo: 'aduana',
    titulo: 'Las declaraciones y el DUA',
    texto: [
      'Para hacer cualquier trámite en la aduana se presenta una <b>declaración en aduana</b>. Puede ser <b>normal</b> o <b>simplificada</b>.',
      '<b>El DUA</b> (Documento Administrativo Único) es el formulario oficial para hacer la declaración cuando <b>no se hace por computadora</b>. Se puede presentar en papel o por transmisión electrónica.',
      '<b>¿Para qué mercancías?</b> Para las de la Unión, por ejemplo al exportar, y para las de afuera, al importarlas, al meterlas en otro régimen o al volver a sacarlas.',
      '<b>Al entrar a la Unión:</b> el <b>transportista</b> presenta la <b>declaración sumaria de entrada</b>. Por carretera, como mínimo <b>1 hora antes</b> de entrar.',
      '<b>Al salir de la Unión:</b> hay que hacer antes una declaración: en aduana, de reexportación o sumaria de salida. La sumaria de salida también la presenta <b>el transportista</b>.',
      '<b>Lo que puede hacer la aduana:</b> pedir más papeles, revisar la mercancía, y fijar la ruta y el plazo de salida.',
      '<b>Otros datos:</b> para presentar declaraciones hay que estar establecido en la Unión, salvo excepciones. Los papeles de la aduana se guardan <b>3 años</b>.'
    ],
    base: SUIZA,
    alArrancar: e => e.camionA(56, true),
    vista: 'suiza',
    carpeta: ['dua'],
    linea: [
      [0.6, e => e.etiqueta('camion', 'Declaración sumaria: la presenta el transportista, 1 hora antes', 'globo')]
    ]
  },
  {
    tipo: 'aduana',
    titulo: 'El tránsito aduanero',
    texto: [
      '<b>Tránsito aduanero</b> es llevar mercancías <b>de una aduana a otra bajo control de la aduana</b>, sin pagar los impuestos en el medio.',
      '<b>Las tres aduanas del viaje:</b><br>• <b>de partida</b>: donde se acepta la declaración y empieza el tránsito;<br>• <b>de tránsito</b>: la del punto por donde la mercancía entra o sale del territorio de la Unión;<br>• <b>de destino</b>: donde se presenta la mercancía para terminar el tránsito.',
      'En cada aduana de paso se muestra el <b>MRN</b>, el número que la aduana le dio a la declaración. La mercancía viaja con el <b>documento de acompañamiento de tránsito</b>.',
      '<b>Sistemas de tránsito:</b><br>• <b>tránsito de la Unión</b>: entre dos puntos de la Unión;<br>• <b>tránsito común</b>: entre la Unión y Suiza, Noruega, Islandia y Liechtenstein;<br>• además, el <b>TIR</b>, el <b>ATA</b>, el Manifiesto Renano (para los barcos del río Rin) y los envíos postales. Todos son sistemas de tránsito.'
    ],
    base: SUIZA,
    alArrancar: e => e.camionA(18, true),
    vista: 'suiza',
    carpeta: ['dua'],
    linea: [
      [0.4, e => e.camionA(56)],
      [3.5, e => e.etiqueta('aduanaCH', 'Aduana de tránsito: muestro el MRN', 'globo')]
    ]
  },
  {
    tipo: 'aduana',
    titulo: 'El tránsito de la Unión: obligaciones y garantía',
    texto: [
      '<b>¿Quién tiene que presentar la mercancía en la aduana de destino?</b> El titular del tránsito, y también el <b>transportista</b> y el <b>destinatario</b> que la aceptan sabiendo que va en tránsito. Los tres.',
      '<b>Plazo:</b> el que fije la <b>aduana de partida</b>, según el itinerario, el medio de transporte y las normas.',
      '<b>Itinerario:</b> lo elegís vos, salvo que la aduana de partida fije uno. Igual tiene que ser un camino lógico.',
      '<b>Si pasa algo en el viaje:</b> presentás la mercancía en la aduana más cercana del país donde estés.',
      '<b>La garantía:</b> como no se pagan los impuestos en el viaje, hay que dejar una garantía por si algo sale mal.<br>• <b>Individual</b>: para un solo viaje, y cubre todo lo que se podría deber. Se deja en dinero o con alguien que sale de fiador. Si son títulos de un fiador, cada uno vale <b>10.000 €</b>.<br>• <b>Global</b>: cubre <b>varios viajes</b>. Hace falta permiso de la aduana, que se da a quien no tiene infracciones graves. Puede tener rebajas o exenciones.',
      '<b>Al llegar</b>, la aduana de destino avisa a la de partida que la mercancía llegó y le manda el resultado del control.'
    ],
    base: SUIZA,
    alArrancar: e => e.camionA(56, true),
    vista: 'suiza',
    carpeta: ['dua'],
    linea: [
      [0.6, e => e.etiqueta('camion', 'Garantía global: cubre varios viajes', 'precio')]
    ]
  },
  {
    tipo: 'aduana',
    titulo: 'Operador económico autorizado, transitarios y contrabando',
    texto: [
      '<b>Operador económico autorizado:</b> es una empresa a la que la aduana le da un trato especial: le hace los controles más fácil. Lo reconocen las <b>autoridades aduaneras</b> de los países de la Unión. Hay que no tener infracciones graves, llevar bien los registros y tener solvencia. Se pueden tener varias modalidades a la vez.',
      '<b>Transitarios:</b> son los profesionales que <b>organizan transportes internacionales y hacen los trámites de aduana</b>.',
      '<b>Contrabando:</b> pasar mercancía sin cumplir con la aduana. Con mercancías legales es <b>delito</b> si valen <b>150.000 € o más</b>.<br><b>Ejemplo:</b> mercancía legal de 5.000 € → no es delito. Pero con <b>drogas</b>, aunque valgan 12.000 €, sí es delito.'
    ],
    base: SUIZA,
    alArrancar: e => e.camionA(56, true),
    vista: 'suiza',
    linea: [
      [0.6, e => e.etiqueta('aduanaCH', 'Contrabando: delito desde 150.000 €', 'deuda')]
    ]
  },
  {
    tipo: 'aduana',
    titulo: 'El TIR',
    texto: [
      'El <b>TIR</b> (siglas en francés de Transporte Internacional por Carretera) es un convenio de <b>1975</b> para pasar varias fronteras con la mercancía <b>precintada</b>, sin revisarla en cada aduana.',
      '<b>Cuándo se usa:</b> en viajes con origen o destino en un país del Convenio TIR que <b>no es de la Unión</b>, con parte del viaje por carretera. Dentro de la Unión solo se usa si el camino pasa por un país de afuera, como Suiza.',
      '<b>El cuaderno TIR:</b> el papel que acompaña a la mercancía y que controlan las aduanas. Sirve para <b>un solo viaje</b>, con hasta <b>4</b> aduanas de salida y de destino. Lo reparten las <b>asociaciones garantes</b> autorizadas por la aduana. Esas asociaciones responden hasta 60.000 € por cuaderno.',
      '<b>Cómo funciona:</b><br>• en la aduana de partida presentás la mercancía, el camión y el cuaderno;<br>• la <b>aduana de salida</b> pone el precinto;<br>• las aduanas de tránsito, por regla general, <b>no revisan</b> la carga.',
      '<b>El camión:</b> tiene que estar aprobado y tener un certificado. Se tiene que poder precintar, no puede tener escondites y no se puede sacar carga sin romper el precinto. Lleva una <b>placa azul con las letras TIR</b>, adelante y atrás.',
      '<b>Pueden hacerlo</b> los transportistas que autorizó la aduana. Para el TIR, toda la Unión cuenta como <b>un solo territorio</b>.'
    ],
    base: SUIZA,
    alArrancar: e => e.camionA(30, true),
    vista: 'suiza',
    carpeta: ['tir'],
    linea: [
      [0.4, e => e.mostrar('tarjetaTIR')],
      [0.8, e => e.camionA(56)],
      [3.5, e => e.etiqueta('aduanaCH', 'Precinto TIR: las aduanas de paso no revisan', 'ok')]
    ]
  },
  {
    tipo: 'aduana',
    titulo: 'El cuaderno ATA',
    texto: [
      'El <b>ATA</b> (siglas de Admisión Temporal) sirve para la <b>importación temporal</b>: llevar cosas a otro país por un tiempo y traerlas de vuelta, sin pagar impuestos.<br><b>Ejemplo:</b> Proyecto Apolo lleva un camión de muestra a una <b>feria</b> en Suiza y después lo trae de vuelta.',
      '<b>No sirve</b> para vender: ni vehículos nuevos ni usados.',
      'El <b>cuaderno ATA</b> también vale como papel de tránsito aduanero. Dura como mucho <b>1 año</b>, y la mercancía tiene que <b>volver a salir</b> del país antes de que venza.',
      'Su garantía cubre los <b>impuestos de importación</b> si la mercancía no vuelve. Para el ATA, la Unión también cuenta como un solo territorio.'
    ],
    base: SUIZA,
    alArrancar: e => e.camionA(56, true),
    vista: 'suiza',
    carpeta: ['ata'],
    linea: [
      [0.4, e => e.mostrar('tarjetaATA')],
      [0.8, e => e.etiqueta('aduanaCH', 'ATA: entra para la feria y vuelve a salir', 'ok')]
    ]
  },
  {
    tipo: 'aduana',
    titulo: 'Repaso: aduana, tránsito y TIR',
    texto: [
      '<b>Territorio aduanero:</b> toda la UE es uno solo. España entra, menos Ceuta y Melilla.',
      '<b>Mercancía de la Unión:</b> hecha en la UE o despachada a libre práctica. Si sale, deja de serlo.',
      '<b>Exportación:</b> salir de la UE. <b>Depósito temporal:</b> hasta 90 días.',
      '<b>DUA:</b> declaración cuando no es por computadora. Sumaria de entrada y de salida: el transportista, 1 hora antes por carretera.',
      '<b>Tránsito:</b> de una aduana a otra bajo control. Aduana de partida, de tránsito y de destino. Plazo e itinerario: la de partida. Garantía individual o global.',
      '<b>Operador económico autorizado:</b> trato especial de la aduana. <b>Transitarios:</b> organizan y hacen trámites. <b>Contrabando:</b> delito desde 150.000 € (drogas, siempre).',
      '<b>TIR:</b> cuaderno de un viaje, precinto de la aduana de salida, placa azul adelante y atrás.',
      '<b>ATA:</b> importación temporal para ferias, hasta 1 año, hay que reexportar.'
    ],
    base: SUIZA,
    alArrancar: e => e.camionA(56, true),
    vista: 'suiza',
    carpeta: ['dua', 'tir', 'ata'],
    linea: []
  },
  {
    tipo: 'aduana',
    titulo: 'Preguntas oficiales: aduana, tránsito y TIR',
    texto: [],
    base: BASE,
    vista: 'general',
    linea: [],
    quiz: true
  }
];
