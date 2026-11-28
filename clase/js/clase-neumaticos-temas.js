// ==========================================
// NEUMÁTICOS: los 5 capítulos (escenas con muñequitos, igual que Mercado)
// Personajes: Juan (camionero) y Pedro (el mecánico del taller).
// Todo sale de las preguntas oficiales del CAP y de la norma vigente.
// ==========================================

export const PASOS_NEU_RUEDA = [
  {
    tipo: 'rueda',
    titulo: "La rueda: una parte de metal y otra de goma",
    texto: [
      "<b>Juan</b> lleva el camión al taller de <b>Pedro</b>, el mecánico, y le pregunta de qué está hecha una rueda.",
      "La <b>rueda</b> tiene dos partes:<br>• <b>Parte metálica</b>: el <b>cubo</b>, el <b>disco</b> y la <b>llanta</b> (el aro de metal).<br>• <b>Parte neumática</b>: la <b>cubierta</b> (la goma), la <b>cámara</b> si tiene, y <b>el aire</b>.",
      "Por fuera, la cubierta tiene:<br>• <b>Banda de rodamiento</b>: la que <b>toca el suelo</b>. Es la que <b>más se gasta</b>.<br>• <b>Hombros</b>: las esquinas, donde la banda se junta con el costado. Es lo que <b>más se calienta</b>.<br>• <b>Flancos</b>: los <b>costados</b>. Son los que más se doblan y la zona <b>más frágil</b>.<br>• <b>Talón</b>: el borde que se <b>agarra a la llanta</b>. Por dentro lleva un <b>aro de metal</b> para que no se salga.",
      "Por dentro: la <b>carcasa</b> (el esqueleto, hoy <b>radial</b>), el <b>cinturón</b> (una capa que la <b>estabiliza</b> para que la banda no se deforme) y una <b>capa de goma estanca</b> al aire.",
      "Las ruedas <b>llevan la frenada al suelo</b>: frenás con los frenos, pero el que agarra el asfalto es el neumático."
    ],
    escena: { juan: ['juan', 130], pedro: ['pedro', 320], rueda: ['rueda', 640], llanta: ['llantaAcero', 930], corte: ['corte', 600] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('EN EL TALLER DE PEDRO')],
  [0.5, e => { e.mostrar('juan'); e.mostrar('pedro'); }],
  [1.0, e => e.globo('juan', 'Pedro, ¿de qué está hecha una rueda?')],
  [3.0, e => { e.mostrar('rueda'); e.globo('pedro', 'La RUEDA tiene dos partes'); }],
  [5.2, e => { e.mostrar('llanta'); e.brilla('llanta'); e.etiqueta('llanta', 'PARTE METÁLICA: cubo, disco y LLANTA', 'ok'); }],
  [8.0, e => { e.brilla('llanta', false); e.brilla('rueda'); e.etiqueta('rueda', 'PARTE NEUMÁTICA: la CUBIERTA (y la cámara, si tiene) + el aire', 'aviso'); }],
  [11.2, e => { e.brilla('rueda', false); e.ocultar('rueda'); e.ocultar('llanta'); e.titulo('LA CUBIERTA POR DENTRO'); e.mostrar('corte'); }],
  [12.2, e => e.etiqueta('p1', 'BANDA DE RODAMIENTO: toca el suelo. La que MÁS se gasta', 'ok', [930, 220])],
  [14.8, e => e.etiqueta('p2', 'FLANCOS: los costados. HOMBROS: las esquinas, se calientan', 'aviso', [930, 320])],
  [17.4, e => e.etiqueta('p3', 'TALÓN: se agarra a la LLANTA (lleva un aro de metal)', 'precio', [930, 420])],
  [20.0, e => e.globo('pedro', 'Adentro: la CARCASA radial y el CINTURÓN, que la mantiene firme')],
  [23.0, e => e.globo('pedro', 'Y es la rueda la que lleva la FRENADA al suelo')]
]
  },
  {
    tipo: 'rueda',
    titulo: "La llanta: de acero o de aleación",
    texto: [
      "La <b>llanta</b> es el <b>aro de metal</b> de la rueda: la cubierta (la goma) va montada alrededor de ella.",
      "La de <b>acero</b> es la de siempre. Tiene <b>agujeros</b> alrededor: por ahí pasa el aire y <b>enfría los frenos</b>, que están justo detrás.",
      "La de <b>aleación</b> (aluminio) <b>pesa menos</b>, así que el camión vacío pesa menos. Está hecha de <b>una sola pieza</b>. Lo malo: se <b>corroe</b> más (se le hace una especie de óxido que se llama <b>corrosión electrolítica</b>). Hay que lavarla, sobre todo si anduviste <b>cerca del mar</b>, por la sal.",
      "<b>Equilibrar</b> la rueda = pegarle a la llanta unos <b>contrapesos de plomo</b> chiquitos para que el peso quede parejo en toda la vuelta. Si no está equilibrada, el <b>volante vibra</b>. Se desequilibra al cambiar la goma, si se cae un contrapeso o si se abolla la llanta."
    ],
    escena: { pedro: ['pedro', 140], acero: ['llantaAcero', 450], aleacion: ['llantaAleacion', 820] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('LA LLANTA')],
  [0.5, e => { e.mostrar('pedro'); e.mostrar('acero'); }],
  [1.0, e => e.globo('pedro', 'La LLANTA es el aro de metal. Esta es de ACERO')],
  [3.4, e => { e.brilla('acero'); e.etiqueta('acero', 'Los AGUJEROS: dejan pasar aire y ENFRÍAN LOS FRENOS', 'ok'); }],
  [6.6, e => { e.brilla('acero', false); e.mostrar('aleacion'); e.etiqueta('aleacion', 'ALEACIÓN: pesa MENOS y es de UNA SOLA PIEZA', 'ok'); }],
  [9.6, e => { e.brilla('aleacion', true, 'rojo'); e.etiqueta('aleacion', 'Lo malo: se CORROE. Lavala, sobre todo cerca del MAR', 'deuda'); }],
  [12.8, e => { e.brilla('aleacion', false, 'rojo'); e.brilla('acero'); e.globo('pedro', 'EQUILIBRAR: le pego contrapesos de plomo a la llanta. Si no, el volante VIBRA'); }]
]
  },
  {
    tipo: 'rueda',
    titulo: "Cómo se lee una llanta (desde cero)",
    texto: [
      "Imaginá que <b>cortás la rueda por la mitad</b> y la mirás de costado, como en el dibujo. Arriba está la goma; abajo, la llanta.",
      "La llanta tiene forma de <b>U muy ancha</b>. Los dos <b>bordes que suben</b> a los costados (en <b>amarillo</b>) se llaman <b>pestañas</b>. Contra ellas se apoya el <b>talón</b>, que es el borde de la goma (con su aro de metal adentro). La pestaña es como una <b>pared</b>: no deja que la goma <b>se salga</b> de la llanta.",
      "En la llanta viene grabado un código, por ejemplo <b>12,5 J x 22.5</b>. Se lee de a pedazos:",
      "• <b>12,5</b> = el <b>ancho</b> de la llanta, de pestaña a pestaña, en <b>pulgadas</b> (1 pulgada = 2,54 cm).",
      "• <b>J</b> = la <b>forma de la pestaña</b>. Las pestañas no son todas iguales: unas más altas, otras más curvas. Cada forma tiene <b>una letra</b>, y la <b>J</b> es una de esas formas. Así se sabe qué goma le va bien.",
      "• <b>x</b> = la llanta es de <b>una sola pieza</b>: todo el aro es un solo metal (también se dice <b>monopieza</b>).<br>• Si en vez de la x hay un <b>guion (-)</b>, es de <b>varias piezas</b>: una de las pestañas es un <b>aro suelto</b> (en naranja) que se saca para meter la goma y después se vuelve a poner. Lo llevaban los camiones antiguos.",
      "• <b>22.5</b> = el <b>diámetro</b>: lo que mide la llanta de punta a punta, en <b>pulgadas</b>. Es el mismo número que trae la goma (315/80 R <b>22.5</b>): tienen que coincidir para que la goma entre."
    ],
    escena: { corte: ['llantaCorte', 380, { abajo: 560 }], una: ['llantaUna', 290, { abajo: 540 }], varias: ['llantaVarias', 830, { abajo: 540 }] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('LA RUEDA CORTADA POR LA MITAD')],
  [0.5, e => e.mostrar('corte')],
  [1.4, e => e.etiqueta('g', 'Arriba: la GOMA (cubierta). Abajo: la LLANTA (metal)', 'ok', [870, 200])],
  [4.6, e => { e.etiqueta('g', 'Lo AMARILLO son las PESTAÑAS: los bordes de la llanta que suben', 'aviso', [870, 200]); e.etiqueta('pe1', 'PESTAÑA', 'aviso', [175, 375]); e.etiqueta('pe2', 'PESTAÑA', 'aviso', [600, 375]); }],
  [8.0, e => e.etiqueta('g', 'Contra la pestaña se apoya el TALÓN de la goma. La pestaña no deja que la goma se SALGA', 'aviso', [870, 200])],
  [12.0, e => { e.etiqueta('g', null); e.etiqueta('pe1', null); e.etiqueta('pe2', null); e.titulo('EL CÓDIGO DE LA LLANTA'); e.etiqueta('ll', '<b style="color:#fbbf24">12,5</b> J x 22.5<br><small>12,5 = el ANCHO, de pestaña a pestaña, en pulgadas</small>', 'grande', [870, 200]); }],
  [15.6, e => e.etiqueta('ll', '12,5 <b style="color:#fbbf24">J</b> x 22.5<br><small>J = la FORMA de la pestaña (cada forma tiene su letra)</small>', 'grande', [870, 200])],
  [19.2, e => e.etiqueta('ll', '12,5 J x <b style="color:#fbbf24">22.5</b><br><small>22.5 = el DIÁMETRO, en pulgadas (igual que en la goma)</small>', 'grande', [870, 200])],
  [22.8, e => { e.ocultar('corte'); e.titulo('¿Y LA x?'); e.mostrar('una'); e.etiqueta('una', 'x = UNA SOLA PIEZA: todo el aro es un metal', 'ok'); e.etiqueta('ll', '12,5 J <b style="color:#fbbf24">x</b> 22.5', 'grande', [560, 140]); }],
  [26.4, e => { e.mostrar('varias'); e.etiqueta('varias', 'guion (-) = VARIAS PIEZAS: este aro naranja se SACA para meter la goma', 'aviso'); e.etiqueta('ll', '12,5 J <b style="color:#fbbf24">-</b> 22.5', 'grande', [560, 140]); }]
]
  },
  {
    tipo: 'rueda',
    titulo: 'Preguntas de examen',
    texto: [],
    escena: { juan: ['juan', 130], pedro: ['pedro', 320], rueda: ['rueda', 640], llanta: ['llantaAcero', 930], corte: ['corte', 600] },
    base: ["juan", "pedro", "rueda", "llanta"],
    vista: 'general',
    quiz: true,
    linea: []
  }
];

export const PASOS_NEU_CAMARA = [
  {
    tipo: 'camara',
    titulo: "¿Con cámara o sin cámara?",
    texto: [
      "Juan pregunta qué es mejor. Pedro le muestra las dos.",
      "<b>Con cámara</b>: adentro de la cubierta va un <b>globo de goma</b> con el aire (la <b>cámara</b>). En el flanco dice <b>\"Tube type\"</b>. A un neumático con cámara <b>no se le puede quitar</b>: se escaparía el aire (no es estanco).",
      "<b>Sin cámara = \"Tubeless\"</b>: la cubierta tiene por dentro una <b>capa de goma impermeable</b> y el aire lo cierran <b>la goma y la llanta juntas</b>. Necesita una <b>llanta especial</b> y la <b>válvula va en la llanta</b>.",
      "A uno <b>sin cámara</b>, en cambio, <b>sí se le puede poner</b> una cámara.",
      "<b>¿Cuál es mejor?</b> El <b>sin cámara</b>: si se pincha, pierde el aire <b>despacio</b>, así que tiene <b>menos riesgo de reventón</b>. Hoy casi todos los camiones lo usan."
    ],
    escena: { juan: ['juan', 120], pedro: ['pedro', 300], camara: ['camara', 600], rueda: ['rueda', 900] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('¿CON CÁMARA O SIN CÁMARA?')],
  [0.5, e => { e.mostrar('juan'); e.mostrar('pedro'); }],
  [1.0, e => e.globo('juan', '¿Qué es mejor: con cámara o sin cámara?')],
  [3.2, e => { e.mostrar('camara'); e.etiqueta('camara', 'CÁMARA: un globo de goma adentro. Dice TUBE TYPE', 'aviso'); }],
  [6.2, e => e.globo('pedro', 'A uno CON cámara no se la podés sacar: se escaparía el aire')],
  [9.0, e => { e.mostrar('rueda'); e.brilla('rueda'); e.etiqueta('rueda', 'SIN CÁMARA = TUBELESS: goma estanca por dentro', 'ok'); }],
  [12.0, e => e.etiqueta('rueda', 'LLANTA ESPECIAL y la VÁLVULA va en la LLANTA', 'ok')],
  [14.8, e => e.globo('pedro', 'A uno SIN cámara sí le podés poner una cámara')],
  [17.6, e => { e.apagar('camara'); e.etiqueta('camara', null); e.etiqueta('mejor', 'MEJOR: SIN CÁMARA<br><small>si se pincha pierde el aire despacio: menos riesgo de reventón</small>', 'grande', [600, 160]); }]
]
  },
  {
    tipo: 'camara',
    titulo: "El peligro del sin cámara: los golpes",
    texto: [
      "En el <b>sin cámara</b>, el aire lo cierran <b>la goma y la llanta juntas</b>, pegadas.",
      "Si la llanta recibe un <b>golpe contra un bordillo o una piedra</b> y se <b>deforma</b>, deja de cerrar bien: <b>pierde aire por la unión</b> entre la llanta y el neumático.",
      "Por eso, con tubeless hay que <b>cuidar la llanta de los golpes</b>.",
      "Y aunque no tenga cámara, la presión <b>se comprueba igual</b>, cada tanto."
    ],
    escena: { juan: ['juan', 140], rueda: ['rueda', 420], bordillo: ['bordillo', 780], mano: ['manometro', 1010] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('OJO CON LOS GOLPES')],
  [0.5, e => e.mostrar('rueda')],
  [1.2, e => e.etiqueta('rueda', 'El aire lo cierran la GOMA y la LLANTA juntas', 'ok')],
  [4.0, e => { e.mostrar('bordillo'); e.brilla('bordillo', true, 'rojo'); e.etiqueta('bordillo', '¡PUM! Un golpe contra el BORDILLO', 'deuda'); }],
  [7.0, e => e.etiqueta('bordillo', 'La llanta se DEFORMA: deja de cerrar y PIERDE AIRE', 'deuda')],
  [10.4, e => { e.brilla('bordillo', false, 'rojo'); e.mostrar('juan'); e.globo('juan', 'Entonces, ¿igual tengo que mirar la presión?'); }],
  [13.0, e => { e.mostrar('mano'); e.etiqueta('mano', 'SÍ: la presión se controla IGUAL, cada tanto', 'ok'); }]
]
  },
  {
    tipo: 'camara',
    titulo: 'Preguntas de examen',
    texto: [],
    escena: { juan: ['juan', 120], pedro: ['pedro', 300], camara: ['camara', 600], rueda: ['rueda', 900] },
    base: ["juan", "pedro", "camara", "rueda"],
    vista: 'general',
    quiz: true,
    linea: []
  }
];

export const PASOS_NEU_MEDIDAS = [
  {
    tipo: 'medidas',
    titulo: "Leer el costado: 315/80 R 22.5",
    texto: [
      "En el <b>flanco</b> (el costado) va escrito todo: medidas y datos. A eso se le llama la <b>nomenclatura</b>. Un camión puede llevar: <b>315/80 R 22.5 156/150 L</b>.",
      "• <b>315</b> = el <b>ancho</b> del neumático, en <b>milímetros</b> (de flanco a flanco).",
      "• <b>80</b> = el <b>perfil</b>: la <b>altura del flanco</b> es el <b>80 % del ancho</b>. Si el ancho es 300 mm, el flanco mide 240 mm.",
      "• <b>R</b> = <b>radial</b>, el tipo de carcasa que se usa hoy.",
      "• <b>22.5</b> = el <b>diámetro de la llanta</b>, en <b>pulgadas</b>. Si cambia este número, no entra en la misma llanta.",
      "<b>Truco:</b> milímetros, después %, después R, después pulgadas."
    ],
    escena: { juan: ['juan', 130], flanco: ['flanco', 650, { abajo: 520 }] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('LO QUE DICE EL COSTADO (FLANCO)')],
  [0.5, e => { e.mostrar('juan'); e.mostrar('flanco'); }],
  [1.0, e => e.globo('juan', '¿Y estos números qué quieren decir?')],
  [3.2, e => e.etiqueta('cod', '<span style="white-space:nowrap">315 / 80 R 22.5 &nbsp; 156/150 L</span>', 'grande', [650, 200])],
  [5.0, e => { e.etiqueta('cod', '<span style="white-space:nowrap"><span style="color:#fbbf24">315</span> / 80 R 22.5 &nbsp; 156/150 L</span>', 'grande', [650, 200]); e.etiqueta('ex', '315 = el ANCHO, en MILÍMETROS', 'ok', [650, 590]); }],
  [8.0, e => { e.etiqueta('cod', '<span style="white-space:nowrap">315 / <span style="color:#fbbf24">80</span> R 22.5 &nbsp; 156/150 L</span>', 'grande', [650, 200]); e.etiqueta('ex', '80 = PERFIL: el costado mide el 80 % del ancho', 'ok', [650, 590]); }],
  [11.0, e => { e.etiqueta('cod', '<span style="white-space:nowrap">315 / 80 <span style="color:#fbbf24">R</span> 22.5 &nbsp; 156/150 L</span>', 'grande', [650, 200]); e.etiqueta('ex', 'R = RADIAL (la carcasa de hoy)', 'ok', [650, 590]); }],
  [14.0, e => { e.etiqueta('cod', '<span style="white-space:nowrap">315 / 80 R <span style="color:#fbbf24">22.5</span> &nbsp; 156/150 L</span>', 'grande', [650, 200]); e.etiqueta('ex', '22.5 = el DIÁMETRO de la LLANTA, en PULGADAS', 'ok', [650, 590]); }],
  [17.0, e => e.globo('juan', 'Milímetros, por ciento, R y pulgadas. ¡Fácil!')]
]
  },
  {
    tipo: 'medidas',
    titulo: "156/150 L: cuánto peso y qué velocidad",
    texto: [
      "Después de las medidas vienen dos datos más: <b>156/150 L</b>.",
      "<b>Índice de carga</b> = el <b>peso máximo</b> que aguanta el neumático. En camiones van <b>dos números</b>:<br>• El primero (<b>156</b>), montado <b>en sencillo</b> (solo): 4.000 kg.<br>• El segundo (<b>150</b>), montado <b>en gemelo</b>: 3.350 kg cada uno.",
      "<b>Gemelas</b> = <b>dos ruedas juntas</b> en cada punta del eje. Por eso cada una aguanta <b>un poco menos</b>.",
      "<b>L</b> = el <b>índice de velocidad</b>: la velocidad máxima del neumático (L = 120 km/h).",
      "Si cambiás neumáticos: se puede poner uno con índice de carga o de velocidad distinto <b>solo si es más alto</b> que el del fabricante. Y <b>nunca más anchos</b> que los de la <b>tarjeta ITV</b>: menos seguridad y más consumo.",
      "<b>DOT 4107</b> = la <b>fecha</b> de fabricación: <b>semana 41</b> del año <b>2007</b>."
    ],
    escena: { sola: ['rueda', 300, { alto: 230 }], g1: ['rueda', 740, { alto: 230, z: 1 }], g2: ['rueda', 830, { alto: 230, z: 2 }] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('CUÁNTO PESO Y QUÉ VELOCIDAD')],
  [0.5, e => e.etiqueta('cod', '<span style="white-space:nowrap">315 / 80 R 22.5 &nbsp; <span style="color:#fbbf24">156/150</span> L</span>', 'grande', [560, 125])],
  [2.6, e => { e.mostrar('sola'); e.etiqueta('sola', 'SOLA (en sencillo): 156 = 4.000 kg', 'ok'); }],
  [5.8, e => { e.mostrar('g1'); e.mostrar('g2'); e.etiqueta('g2', 'GEMELAS (dos juntas): 150 = 3.350 kg cada una', 'aviso'); }],
  [9.0, e => e.etiqueta('ex', 'En gemelo, cada una aguanta UN POCO MENOS', 'precio', [560, 205])],
  [12.0, e => { e.etiqueta('sola', null); e.etiqueta('g2', null); e.etiqueta('cod', '<span style="white-space:nowrap">315 / 80 R 22.5 &nbsp; 156/150 <span style="color:#fbbf24">L</span></span>', 'grande', [560, 125]); e.etiqueta('ex', 'L = ÍNDICE DE VELOCIDAD: hasta 120 km/h', 'ok', [560, 205]); }],
  [15.2, e => e.etiqueta('ex', 'Para cambiar: índices IGUALES o MÁS ALTOS. Nunca más ancho que la tarjeta ITV', 'aviso', [560, 205])],
  [18.6, e => { e.etiqueta('cod', 'DOT <b style="color:#fbbf24">41</b><b style="color:#38bdf8">07</b>', 'grande', [560, 125]); e.etiqueta('ex', 'FECHA: semana 41 del año 2007', 'ok', [560, 205]); }]
]
  },
  {
    tipo: 'medidas',
    titulo: "Las otras palabras del flanco",
    texto: [
      "• <b>Tubeless</b> = sin cámara. <b>Tube type</b> = necesita cámara.",
      "• <b>Reinforced</b> = <b>flancos reforzados</b>. Los <b>alvéolos</b> (agujeritos ciegos en el costado) también lo indican y sirven para que los golpes queden marcados.",
      "• <b>Regroovable</b> (o una <b>U</b>) = se puede <b>volver a grabar el dibujo</b>.",
      "• <b>Recauchutado</b> = a una <b>carcasa usada</b> se le pegó una <b>banda de rodadura nueva</b>.",
      "• <b>MS</b> = barro y nieve. <b>TWI</b> = el <b>testigo de desgaste</b>: un taquito en la ranura que avisa cuándo cambiar.",
      "• Una <b>\"e\" minúscula con un número</b> = <b>homologado en la UE</b>. Hay 3 clases: <b>C1</b> turismos (vehículos M1, N1, O1 y O2), <b>C2</b> furgonetas y <b>C3</b> camiones (índice de carga en sencillo de <b>122 o más</b>). Un neumático puede estar en varias clases si cumple todo.",
      "• En la tienda, cada neumático lleva una <b>etiqueta</b>: <b>consumo</b>, <b>ruido</b> y <b>agarre en mojado</b> (obligatoria desde el <b>1 de noviembre de 2012</b>). No la llevan, por ejemplo, los recauchutados o las ruedas de repuesto provisionales (tipo T)."
    ],
    escena: { pedro: ['pedro', 140], flanco: ['flanco', 660, { abajo: 520 }] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('LAS OTRAS PALABRAS DEL COSTADO')],
  [0.5, e => { e.mostrar('pedro'); e.mostrar('flanco'); }],
  [1.0, e => e.globo('pedro', 'Además de las medidas, el costado tiene palabras')],
  [3.0, e => e.etiqueta('w', 'TUBELESS = sin cámara · TUBE TYPE = con cámara', 'grande', [660, 200])],
  [6.0, e => e.etiqueta('w', 'REINFORCED = flancos REFORZADOS', 'grande', [660, 200])],
  [9.0, e => e.etiqueta('w', 'REGROOVABLE (o U) = se puede REGRABAR el dibujo', 'grande', [660, 200])],
  [12.0, e => e.etiqueta('w', 'RECAUCHUTADO = carcasa usada + banda NUEVA pegada', 'grande', [660, 200])],
  [15.0, e => e.etiqueta('w', 'MS = barro y nieve · TWI = testigo de desgaste', 'grande', [660, 200])],
  [18.0, e => e.etiqueta('w', 'e4 = homologado en la UE · C3 = de camión', 'grande', [660, 200])],
  [21.0, e => e.globo('pedro', 'Y en la tienda: etiqueta con consumo, ruido y agarre en mojado')]
]
  },
  {
    tipo: 'medidas',
    titulo: 'Preguntas de examen',
    texto: [],
    escena: { juan: ['juan', 130], flanco: ['flanco', 650, { abajo: 520 }] },
    base: ["juan", "flanco"],
    vista: 'general',
    quiz: true,
    linea: []
  }
];

export const PASOS_NEU_PRESION = [
  {
    tipo: 'presion',
    titulo: "Medir la presión",
    texto: [
      "La presión se mide con un <b>manómetro</b>. La correcta es <b>la que dice el fabricante</b>: influye en la <b>seguridad</b> y en el consumo.",
      "Se mide <b>en frío</b>: con el camión parado <b>al menos 3 horas</b>. Al rodar, el neumático se calienta y el manómetro <b>marca más</b>.",
      "Si la ajustaste antes de salir y a los <b>200 km</b> marca más: es normal. <b>No le saques aire</b>: seguí el viaje.",
      "La presión es <b>la misma en verano y en invierno</b>. Cambiarla no ahorra combustible.",
      "En <b>gemelas</b>: la de adentro y la de afuera, con <b>la misma presión</b>.",
      "Cada cuánto: <b>mirarlas todos los días</b> y <b>medir</b> con el manómetro cada <b>15 días</b> más o menos (o cada 5.000 km)."
    ],
    escena: { juan: ['juan', 130], mano: ['manometro', 360], rueda: ['rueda', 610], reloj: ['reloj', 920, { abajo: 330 }] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('MEDIR LA PRESIÓN')],
  [0.5, e => { e.mostrar('juan'); e.mostrar('rueda'); e.mostrar('mano'); }],
  [1.0, e => e.globo('juan', 'La presión la mido con el MANÓMETRO')],
  [3.4, e => { e.mostrar('reloj'); e.reloj('reloj', 3); e.etiqueta('reloj', 'Siempre EN FRÍO: parado 3 horas', 'ok'); }],
  [7.0, e => { e.brilla('rueda', true, 'rojo'); e.etiqueta('rueda', 'En caliente marca MÁS. A los 200 km subió: ¡NO le saques aire!', 'aviso'); }],
  [10.6, e => { e.brilla('rueda', false, 'rojo'); e.etiqueta('rueda', null); e.etiqueta('reloj', null); e.etiqueta('ex', 'La del FABRICANTE: igual en VERANO y en INVIERNO', 'grande', [620, 170]); }],
  [13.8, e => e.etiqueta('ex', 'En GEMELAS: las dos con la MISMA presión', 'grande', [620, 170])],
  [16.8, e => e.etiqueta('ex', 'Mirarlas TODOS LOS DÍAS · medirlas cada 15 DÍAS (o 5.000 km)', 'grande', [620, 170])]
]
  },
  {
    tipo: 'presion',
    titulo: "Poca o mucha presión: la resistencia a la rodadura",
    texto: [
      "<b>Resistencia a la rodadura</b> = lo que cuesta hacer rodar la rueda. Cuanta <b>más rodadura</b>, <b>más combustible</b> gasta el camión.",
      "<b>Con poca presión</b> la goma <b>se dobla más</b> (más <b>trabajo de flexión</b>): sube la rodadura y sube el consumo. <b>2 bares de menos</b> = cerca de un <b>2 % más</b> de combustible.",
      "Además, poco inflado: se <b>calienta</b> más (puede <b>reventar</b>), <b>agarra menos</b> (patina con lluvia), tiene <b>menos firmeza de costado</b>, la <b>dirección se pone dura</b> y se gasta en los <b>bordes</b>.",
      "<b>Con demasiada presión</b>: toca <b>menos suelo</b>, <b>agarra y frena peor</b>, absorbe mal los baches y se gasta en el <b>centro</b>.",
      "La rodadura también sube con <b>más ruedas</b>, y cuenta el roce del aire en la rueda.",
      "<b>Truco:</b> si el camión gasta más de lo normal, mirá si las ruedas están <b>bajas</b>."
    ],
    escena: { poca: ['desinflada', 230], bien: ['rueda', 570], mucha: ['rueda', 900, { alto: 260 }] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('LA RESISTENCIA A LA RODADURA')],
  [0.5, e => { e.mostrar('bien'); e.etiqueta('bien', 'BIEN INFLADA: la del fabricante', 'ok'); }],
  [2.4, e => e.etiqueta('ex', 'RODADURA = lo que cuesta hacerla rodar.<br><small>Más rodadura = MÁS COMBUSTIBLE</small>', 'grande', [570, 140])],
  [5.6, e => { e.mostrar('poca'); e.brilla('poca', true, 'rojo'); e.etiqueta('poca', 'POCO INFLADA: se DOBLA más y rueda peor', 'deuda'); }],
  [8.8, e => e.etiqueta('ex', '2 bares de menos = cerca de un 2 % MÁS de combustible', 'grande', [570, 140])],
  [12.0, e => e.etiqueta('poca', 'Se CALIENTA (puede REVENTAR), agarra MENOS y la dirección se pone DURA', 'deuda')],
  [15.6, e => { e.brilla('poca', false, 'rojo'); e.mostrar('mucha'); e.brilla('mucha', true, 'rojo'); e.etiqueta('mucha', 'DEMASIADO INFLADA: toca MENOS suelo, agarra y frena PEOR', 'aviso'); }],
  [19.0, e => { e.brilla('mucha', false, 'rojo'); e.etiqueta('ex', 'Más ruedas = más rodadura. ¿Gasta más de lo normal? Mirá si están BAJAS', 'grande', [570, 140]); }]
]
  },
  {
    tipo: 'presion',
    titulo: 'Preguntas de examen',
    texto: [],
    escena: { juan: ['juan', 130], mano: ['manometro', 360], rueda: ['rueda', 610], reloj: ['reloj', 920, { abajo: 330 }] },
    base: ["juan", "mano", "rueda", "reloj"],
    vista: 'general',
    quiz: true,
    linea: []
  }
];

export const PASOS_NEU_DESGASTE = [
  {
    tipo: 'desgaste',
    titulo: "Cómo se gasta y qué te está diciendo",
    texto: [
      "Mirá la <b>banda de rodamiento</b>: según dónde se gasta, te dice qué pasa.",
      "• Gastado en los <b>bordes (hombros)</b> = <b>poca presión</b>.<br>• Gastado en el <b>centro</b> = <b>demasiada presión</b>.<br>• Gastado de <b>un solo lado</b> (adentro o afuera) = ruedas <b>mal alineadas</b>: la <b>convergencia</b> o el <b>ángulo de caída</b> (las cotas de dirección). Si es el <b>borde exterior</b>, la caída es excesiva.",
      "• Gastado en <b>un solo punto</b> = un <b>frenazo</b> que bloqueó la rueda.<br>• Gastado <b>desparejo</b> = presión mal, <b>amortiguadores</b> en mal estado o rueda <b>desequilibrada</b>.",
      "Se gastan antes con <b>velocidad</b>, <b>sobrecarga</b>, <b>frenazos</b> y con <b>calor</b> (en verano).",
      "Se cambian por <b>viejos</b> más o menos cada <b>5 años</b>, aunque tengan dibujo. Si un flanco está <b>deformado</b>, se cambia: puede reventar. En gemelas, si van <b>muy juntas</b>, los flancos se rozan.",
      "<b>Dibujo mínimo</b>: en camiones de más de 3,5 t, <b>1 mm</b> (desde mayo de 2026; en turismos, 1,6 mm)."
    ],
    escena: { bordes: ['desgBordes', 230], centro: ['desgCentro', 560], lado: ['desgLado', 890] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('MIRÁ DÓNDE SE GASTA')],
  [0.5, e => { e.mostrar('bordes'); e.mostrar('centro'); e.mostrar('lado'); }],
  [1.6, e => { e.brilla('bordes'); e.etiqueta('bordes', 'En los BORDES = POCA presión', 'deuda'); }],
  [4.8, e => { e.brilla('bordes', false); e.brilla('centro'); e.etiqueta('centro', 'En el CENTRO = DEMASIADA presión', 'aviso'); }],
  [8.0, e => { e.brilla('centro', false); e.brilla('lado'); e.etiqueta('lado', 'De UN LADO = mal ALINEADAS (convergencia o caída)', 'precio'); }],
  [11.4, e => { e.brilla('lado', false); e.etiqueta('ex', 'En UN SOLO PUNTO = un FRENAZO que bloqueó la rueda', 'grande', [560, 120]); }],
  [14.6, e => e.etiqueta('ex', 'Desparejo: amortiguadores o rueda DESEQUILIBRADA · con CALOR se gastan más', 'grande', [560, 120])],
  [17.8, e => e.etiqueta('ex', 'Cambiarlos cada 5 AÑOS aunque tengan dibujo · flanco deformado: ¡CAMBIAR!', 'grande', [560, 120])],
  [21.0, e => e.etiqueta('ex', 'Dibujo mínimo en camiones: 1 mm', 'grande', [560, 120])]
]
  },
  {
    tipo: 'desgaste',
    titulo: "Pinchazo, reventón y aquaplaning",
    texto: [
      "<b>Pinchazo</b>: se oye <b>más ruido de rodadura</b> y el camión <b>tira un poco</b> hacia un lado. <b>Bajá la velocidad</b> y buscá dónde parar.",
      "<b>Reventón</b>: un <b>estallido</b> y un <b>tirón fuerte</b> del volante hacia un lado. En una rueda <b>delantera</b> (la que dirige) es lo peor: <b>menos control</b>.",
      "<b>Aquaplaning</b>: hay más agua de la que el <b>dibujo</b> puede sacar y la rueda <b>flota</b>: pierde contacto con el suelo. Lo provoca la <b>velocidad excesiva</b>.",
      "El dibujo tiene <b>ranuras</b> justamente para <b>sacar el agua</b>. Con lluvia, el dibujo cuenta para agarrar.",
      "Si pasa: <b>no frenes</b>. Levantá un poco el pie del acelerador y sujetá el volante.",
      "Al camión también le pasa, aunque menos que a un coche. Cuidado con las <b>primeras gotas</b>: la ruta resbala más."
    ],
    escena: { juan: ['juan', 120], pinchada: ['desinflada', 400], reventada: ['reventada', 720], charco: ['charco', 880, { abajo: 565, alto: 130, sinSombra: true }], camion: ['camion', 880, { abajo: 535, alto: 170, z: 5 }] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('SI PASA ALGO EN LA RUTA')],
  [0.5, e => { e.mostrar('juan'); e.mostrar('pinchada'); }],
  [1.2, e => e.etiqueta('pinchada', 'PINCHAZO: más RUIDO y tira un POCO hacia un lado', 'aviso')],
  [4.2, e => e.globo('juan', 'Bajo la velocidad y busco dónde parar')],
  [7.0, e => { e.mostrar('reventada'); e.brilla('reventada', true, 'rojo'); e.etiqueta('reventada', '¡PUM! REVENTÓN: un TIRÓN FUERTE del volante', 'deuda'); }],
  [10.2, e => e.etiqueta('reventada', 'En una rueda DELANTERA es lo peor: MENOS CONTROL', 'deuda')],
  [13.4, e => { e.brilla('reventada', false, 'rojo'); e.ocultar('pinchada'); e.ocultar('reventada'); e.titulo('AQUAPLANING'); e.mostrar('charco'); e.mostrar('camion'); }],
  [14.4, e => e.etiqueta('camion', 'Mucha agua + VELOCIDAD: el dibujo no la saca y la rueda FLOTA', 'aviso')],
  [17.6, e => e.globo('juan', '¡No freno! Levanto el pie y sujeto el volante')],
  [20.6, e => e.etiqueta('ex', 'El dibujo saca el agua. Ojo con las PRIMERAS GOTAS', 'grande', [520, 150])]
]
  },
  {
    tipo: 'desgaste',
    titulo: "Cómo agarra: rozamiento, histéresis y deriva",
    texto: [
      "<b>Rozamiento</b> = la fuerza que <b>frena el resbalón</b> entre el neumático y el asfalto. Depende de la <b>presión</b>, del <b>tipo</b> y del <b>perfil</b> del neumático.",
      "<b>Histéresis</b> = la goma se <b>deforma un poquito y agarra</b> las rugosidades del suelo: así el neumático consigue su <b>adherencia</b>.",
      "<b>Deriva</b> = en una curva, el <b>flanco se deforma</b> y el camión se va un poco de la línea que marca el volante. Depende de la <b>presión</b>, la <b>carga</b>, la <b>velocidad</b>, el <b>perfil</b> y el <b>ancho de la llanta</b>. <b>No es</b> lo mismo que perder el agarre.",
      "<b>Deslizamiento</b> = la rueda <b>gira a otra velocidad</b> que la que lleva el camión (en un acelerón o una frenada fuerte)."
    ],
    escena: { rueda: ['rueda', 280], camion: ['camion', 820] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('CÓMO AGARRA EL NEUMÁTICO')],
  [0.5, e => e.mostrar('rueda')],
  [1.2, e => { e.brilla('rueda'); e.etiqueta('rueda', 'ROZAMIENTO: la fuerza que FRENA EL RESBALÓN', 'ok'); }],
  [4.4, e => e.etiqueta('ex', 'Depende de la PRESIÓN, del TIPO y del PERFIL', 'grande', [700, 170])],
  [7.6, e => e.etiqueta('rueda', 'HISTÉRESIS: la goma se deforma y AGARRA', 'ok')],
  [10.8, e => { e.brilla('rueda', false); e.mostrar('camion'); e.mover('camion', 900); e.etiqueta('camion', 'DERIVA: en la curva el FLANCO se deforma y se va de la línea', 'aviso'); }],
  [14.4, e => e.etiqueta('ex', 'Deriva: presión, carga, velocidad, perfil, ancho de llanta. NO es perder agarre', 'grande', [700, 170])],
  [18.0, e => e.etiqueta('ex', 'DESLIZAMIENTO: la rueda gira a otra velocidad que el camión', 'grande', [700, 170])]
]
  },
  {
    tipo: 'desgaste',
    titulo: 'Preguntas de examen',
    texto: [],
    escena: { bordes: ['desgBordes', 230], centro: ['desgCentro', 560], lado: ['desgLado', 890] },
    base: ["bordes", "centro", "lado"],
    vista: 'general',
    quiz: true,
    linea: []
  }
];
