// ==========================================
// MERCADO DEL TRANSPORTE: los 7 capítulos
// Escenas con muñequitos, igual que Sociedades. Personajes: Juan (dueño de una empresa de transporte),
// Pedro (otro camionero), Teresa (gerente), Pablo (jefe de tráfico), María (comercial), Luis (administrativo),
// el señor López (cliente), Antonio (el de la tienda), Ana, Ricardo, Sergio y Carmen (presidenta de la Junta).
// Todo sale de las preguntas oficiales y de la norma vigente.
// ==========================================


export const PASOS_MERCADO_CLASES = [
  {
    tipo: 'clases',
    titulo: "Trabajar para otros o para uno mismo",
    texto: [
      "<b>Juan</b> quiere armar su propia empresa de transporte. Lo primero que aprende: hay dos formas de mover mercancía.",
      "<b>Cuenta ajena</b> = Juan lleva <b>la carga de otros</b> y le pagan por eso (le presta el servicio a terceros). A esto se le llama <b>transporte público</b>.",
      "<b>Cuenta propia</b> = una fábrica lleva <b>sus propias cosas</b> con su propio camión. Es <b>transporte privado</b>.",
      "Dentro del privado está el <b>privado complementario</b>: la empresa usa su camión para sus cosas, con su gente, pero <b>su negocio principal no es el transporte</b> (por ejemplo, una fábrica de muebles).",
      "Público y privado es la clasificación según su <b>naturaleza</b>.",
      "Llevar tus propias cosas a otro país de la Unión Europea (UE) <b>no necesita ningún papel especial</b>."
  ],
    escena: { fabrica: ['fabrica', 190], lopez: ['lopez', 370], camionFabrica: ['camionFabrica', 530], juan: ['juan', 780], camion: ['camion', 960] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('¿PARA QUIÉN SE LLEVA LA CARGA?')],
  [0.5, e => { e.mostrar('fabrica'); e.mostrar('lopez'); }],
  [1.2, e => e.globo('lopez', 'Tengo una fábrica de muebles')],
  [3.0, e => { e.mostrar('camionFabrica'); e.globo('lopez', 'Llevo MIS muebles con MI camión') }],
  [5.0, e => { e.brilla('camionFabrica'); e.etiqueta('camionFabrica', 'CUENTA PROPIA = PRIVADO', 'ok'); }],
  [7.0, e => { e.brilla('camionFabrica', false); e.mostrar('juan'); e.mostrar('camion'); e.globo('juan', 'Yo llevo la carga de OTROS… y me pagan') }],
  [9.0, e => e.volar('monedas', 'lopez', 'juan')],
  [10.4, e => { e.brilla('camion'); e.etiqueta('camion', 'CUENTA AJENA = PÚBLICO', 'precio'); }],
  [12.6, e => { e.brilla('camion', false); e.globo('lopez', 'Pero mi negocio son los muebles, no el transporte') }],
  [14.4, e => e.etiqueta('fabrica', 'PRIVADO COMPLEMENTARIO', 'aviso')]
]
  },
  {
    tipo: 'clases',
    titulo: "Interior, internacional y las otras clases",
    texto: [
      "Hay más formas de ordenar los transportes. Cada una mira una cosa distinta:",
      "• Según su <b>objeto</b> (qué se lleva): <b>viajeros o mercancías</b>.<br>• Según su <b>ámbito</b> (dónde se hace): <b>interiores o internacionales</b>.<br>• Según su <b>naturaleza</b>: <b>públicos o privados</b>.<br>• Según la <b>especificidad de su objeto y su régimen jurídico</b>: <b>ordinarios o especiales</b>.",
      "<b>Interior</b> = el que <b>no sale de un país</b>. No importa si cruza comunidades autónomas: si no sale de España, es interior.",
      "<b>Internacional</b> = el que pasa, <b>aunque sea un poquito</b>, por <b>otro país</b>.",
      "<b>Truco:</b> objeto = <b>qué</b>; ámbito = <b>dónde</b>; naturaleza = <b>para quién</b>."
  ],
    escena: { almacen: ['almacen', 150], camion: ['camion', 330], barrera: ['barrera', 650], tienda: ['tienda', 960] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('¿DÓNDE SE HACE EL VIAJE?')],
  [0.5, e => { ['almacen', 'camion', 'barrera', 'tienda'].forEach(n => e.mostrar(n)); }],
  [1.0, e => { e.etiqueta('esp', 'ESPAÑA', 'ok', [330, 150]); e.etiqueta('fra', 'FRANCIA', 'aviso', [930, 150]); }],
  [2.4, e => { e.mover('camion', 520); }],
  [3.6, e => e.etiqueta('camion', 'No sale del país = INTERIOR', 'ok')],
  [6.0, e => { e.etiqueta('camion', null); e.brilla('barrera'); e.mover('camion', 770); }],
  [7.4, e => e.etiqueta('camion', 'Pasa a otro país = INTERNACIONAL', 'aviso')],
  [10.0, e => { e.brilla('barrera', false); e.etiqueta('camion', null); e.titulo('LAS FORMAS DE CLASIFICAR'); e.etiqueta('cl', '¿QUÉ lleva? = OBJETO<br><small>viajeros o mercancías</small>', 'grande', [560, 300]); }],
  [12.4, e => e.etiqueta('cl', '¿DÓNDE? = ÁMBITO<br><small>interior o internacional</small>', 'grande', [560, 300])],
  [14.8, e => e.etiqueta('cl', '¿PARA QUIÉN? = NATURALEZA<br><small>público o privado</small>', 'grande', [560, 300])],
  [17.2, e => e.etiqueta('cl', 'RÉGIMEN JURÍDICO<br><small>ordinarios o especiales</small>', 'grande', [560, 300])]
]
  },
  {
    tipo: 'clases',
    titulo: 'Preguntas de examen',
    texto: [],
    escena: { fabrica: ['fabrica', 190], lopez: ['lopez', 370], camionFabrica: ['camionFabrica', 530], juan: ['juan', 780], camion: ['camion', 960] },
    base: Object.keys({ fabrica: ['fabrica', 190], lopez: ['lopez', 370], camionFabrica: ['camionFabrica', 530], juan: ['juan', 780], camion: ['camion', 960] }).filter(n => !["inspector", "surtidor", "puerto", "sergio", "almacen", "ana", "oficina", "palets", "camionRojo", "escudo"].includes(n)),
    vista: 'general',
    quiz: true,
    linea: []
  }
];


export const PASOS_MERCADO_SECTOR = [
  {
    tipo: 'sector',
    titulo: "La carretera es la reina",
    texto: [
      "Juan mira la autovía: camiones por todos lados. Al fondo pasan un tren, un barco y un avión.",
      "En España, el modo más importante para llevar mercancías es <b>la carretera</b>. También es el que <b>más empleo da</b>.",
      "La carretera es más o menos <b>la mitad (50 %)</b> de todo lo que produce el sector del transporte.",
      "El transporte entero es alrededor del <b>5 %</b> de la economía española (lo que se llama Valor Añadido Bruto).",
      "En el transporte por cuenta ajena hay más <b>asalariados</b> (gente con sueldo) que autónomos."
  ],
    escena: { avion: ['avion', 860, { abajo: 190 }], barco: ['barco', 260, { abajo: 300 }], tren: ['tren', 640, { abajo: 380 }], camion: ['camion', 230], camionArt: ['camionArt', 540], camionRojo: ['camionRojo', 860] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('¿CÓMO SE MUEVE LA MERCANCÍA?')],
  [0.5, e => { e.mostrar('avion'); e.mostrar('barco'); e.mostrar('tren'); }],
  [1.4, e => e.etiqueta('tren', 'Avión, barco, tren…', 'ok')],
  [3.4, e => { e.etiqueta('tren', null); ['camion', 'camionArt', 'camionRojo'].forEach(n => e.mostrar(n)); }],
  [4.6, e => { e.apagar('avion'); e.apagar('barco'); e.apagar('tren'); ['camion', 'camionArt', 'camionRojo'].forEach(n => e.brilla(n)); e.etiqueta('camionArt', 'Nº 1 EN ESPAÑA: LA CARRETERA', 'precio'); }],
  [7.4, e => e.etiqueta('emp', 'Es la que MÁS EMPLEO da', 'ok', [560, 260])],
  [10.0, e => e.etiqueta('emp', 'La carretera = la MITAD (50 %) del transporte', 'grande', [560, 260])],
  [12.8, e => e.etiqueta('emp', 'Todo el transporte = el 5 % de la economía de España', 'aviso', [560, 260])]
]
  },
  {
    tipo: 'sector',
    titulo: "Por qué importa y qué problemas tiene",
    texto: [
      "<b>Efecto arrastre:</b> cuando el transporte se mueve, \"arrastra\" a otros negocios: las fábricas de camiones, la venta de combustible, la venta de vehículos.",
      "Un transporte bueno y fiable <b>ayuda a que las empresas se queden</b> en un lugar.",
      "En las <b>crisis económicas</b> el transporte <b>sufre</b>: si se vende menos, se lleva menos.",
      "<b>Lo malo:</b> lo peor son <b>los accidentes</b>. Los atascos causan sobre todo <b>pérdidas de plata</b>.",
      "<b>Atomización</b> = muchísimas empresas chiquitas. Es <b>un problema siempre</b>: por ejemplo, cuesta <b>formar a los trabajadores</b>, porque el único camionero no puede dejar el camión para ir a un curso.",
      "En una empresa chica, el dueño casi siempre <b>maneja él mismo</b>. Una empresa grande consigue <b>préstamos más fáciles y baratos</b>."
  ],
    escena: { fabrica: ['fabrica', 180], camion: ['camion', 560], surtidor: ['surtidor', 900], camionRojo: ['camionRojo', 900], juan: ['juan', 360] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('EL EFECTO ARRASTRE')],
  [0.5, e => e.mostrar('camion')],
  [1.4, e => { e.mostrar('fabrica'); e.mostrar('surtidor'); }],
  [2.2, e => { e.flecha('a1', 'camion', 'fabrica', 'verde'); e.flecha('a2', 'camion', 'surtidor', 'verde'); }],
  [2.8, e => { e.etiqueta('fabrica', 'Fábricas de camiones', 'ok'); e.etiqueta('surtidor', 'Combustible', 'ok'); }],
  [4.6, e => e.etiqueta('camion', 'Si el transporte se mueve, ARRASTRA a otros negocios', 'precio')],
  [7.6, e => { e.titulo('EN LAS CRISIS'); e.flecha('a1'); e.flecha('a2'); e.etiqueta('fabrica', null); e.etiqueta('surtidor', null); e.apagar('fabrica'); e.apagar('surtidor'); e.etiqueta('camion', 'Se vende menos, se lleva menos: el transporte SUFRE', 'deuda'); }],
  [10.6, e => { e.titulo('LO PEOR'); e.ocultar('surtidor'); e.mostrar('camionRojo'); e.brilla('camionRojo', true, 'rojo'); e.etiqueta('camion', null); e.etiqueta('camionRojo', 'Los ACCIDENTES', 'deuda'); }],
  [13.4, e => { e.titulo('MUCHAS EMPRESAS CHIQUITAS'); e.brilla('camionRojo', false); e.ocultar('camionRojo'); e.etiqueta('camionRojo', null); e.ocultar('fabrica'); e.mostrar('juan'); e.globo('juan', 'Mi empresa es chica: el camión lo manejo yo') }],
  [16.0, e => e.etiqueta('chic', 'Atomización: cuesta FORMAR a la gente', 'deuda', [820, 250])],
  [18.4, e => e.etiqueta('chic', 'La empresa grande consigue préstamos más baratos', 'ok', [820, 250])]
]
  },
  {
    tipo: 'sector',
    titulo: 'Preguntas de examen',
    texto: [],
    escena: { avion: ['avion', 860, { abajo: 190 }], barco: ['barco', 260, { abajo: 300 }], tren: ['tren', 640, { abajo: 380 }], camion: ['camion', 230], camionArt: ['camionArt', 540], camionRojo: ['camionRojo', 860] },
    base: Object.keys({ avion: ['avion', 860, { abajo: 190 }], barco: ['barco', 260, { abajo: 300 }], tren: ['tren', 640, { abajo: 380 }], camion: ['camion', 230], camionArt: ['camionArt', 540], camionRojo: ['camionRojo', 860] }).filter(n => !["inspector", "surtidor", "puerto", "sergio", "almacen", "ana", "oficina", "palets", "camionRojo", "escudo"].includes(n)),
    vista: 'general',
    quiz: true,
    linea: []
  }
];


export const PASOS_MERCADO_EMPRESA = [
  {
    tipo: 'empresa',
    titulo: "El gerente y el jefe de tráfico",
    texto: [
      "La empresa de Juan crece y contrata gente. Cada uno tiene su trabajo.",
      "<b>Gerente</b> (el director): <b>planifica, coordina y representa</b> a la empresa y toma las <b>decisiones importantes</b> (estratégicas), por ejemplo comprar más camiones.",
      "<b>Jefe de tráfico</b>: el que mueve los camiones. <b>Planifica los servicios y las rutas</b>, <b>reparte las órdenes de ruta</b> a los conductores, <b>gestiona la flota</b> y <b>vigila que se cumplan las normas</b> del transporte.",
      "<b>Truco:</b> si la respuesta habla de <b>rutas o camiones</b>, es el jefe de tráfico. Si habla de <b>decisiones grandes</b>, es el gerente."
  ],
    escena: { empresa: ['empresa', 560, { z: 100 }], juan: ['juan', 560], teresa: ['teresa', 230], pablo: ['pablo', 850], camion: ['camion', 1040, { alto: 100 }] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('LA EMPRESA DE JUAN CRECE')],
  [0.5, e => { e.mostrar('empresa'); e.mostrar('juan'); }],
  [1.2, e => e.globo('juan', 'Tengo mucho trabajo: voy a contratar gente')],
  [3.4, e => { e.mostrar('teresa'); e.etiqueta('teresa', 'GERENTE', 'ok'); }],
  [4.4, e => e.globo('teresa', 'Yo tomo las decisiones grandes: ¿compramos 3 camiones más?')],
  [7.0, e => e.globo('teresa', 'Planifico, coordino y represento a la empresa')],
  [9.6, e => { e.ocultar('juan'); e.globo('teresa'); e.mostrar('pablo'); e.etiqueta('pablo', 'JEFE DE TRÁFICO', 'aviso'); e.mostrar('camion'); }],
  [10.6, e => { e.flecha('r1', 'pablo', 'camion', 'amarilla'); e.globo('pablo', 'Yo armo las rutas: vos a Valencia, vos a Bilbao'); }],
  [13.4, e => e.globo('pablo', 'Reparto las órdenes de ruta, cuido la flota y que se cumplan las normas')]
]
  },
  {
    tipo: 'empresa',
    titulo: "El comercial, el administrativo y el conductor",
    texto: [
      "<b>Comercial</b>: el de los clientes. <b>Busca trabajos</b>, hace <b>ofertas y presupuestos</b>, <b>contrata los servicios</b>, hace el <b>seguimiento</b> y las <b>estadísticas comerciales</b>, y <b>da la cara</b> si hubo un problema con el cliente.",
      "<b>Administrativo</b>: el de los papeles. Hace <b>la contabilidad</b>, <b>las nóminas</b> (recibos de sueldo) y <b>archiva</b> la documentación.",
      "<b>Conductor</b>: además de manejar, <b>vigila que el camión funcione bien</b> y <b>controla cómo se coloca la carga</b>.",
      "En una empresa grande hay departamentos <b>comercial, de tráfico y de personal</b>. Uno \"de inversión\" es raro."
  ],
    escena: { maria: ['maria', 170], lopez: ['lopez', 360], luis: ['luis', 620], juan: ['juan', 860], camion: ['camion', 1020] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('LOS DEMÁS DEL EQUIPO')],
  [0.5, e => { e.mostrar('maria'); e.mostrar('lopez'); e.etiqueta('maria', 'COMERCIAL', 'precio'); }],
  [1.4, e => e.globo('maria', 'Señor López, le hago un presupuesto: 900 € el viaje')],
  [3.4, e => e.volar('papel', 'maria', 'lopez')],
  [4.6, e => e.globo('lopez', '¡Trato hecho!')],
  [6.2, e => e.globo('maria', 'Si algo sale mal, yo le doy la cara al cliente')],
  [8.6, e => { e.mostrar('luis'); e.etiqueta('luis', 'ADMINISTRATIVO', 'ok'); e.globo('luis', 'Yo hago la contabilidad, las nóminas y archivo los papeles'); }],
  [11.6, e => { e.mostrar('juan'); e.mostrar('camion'); e.etiqueta('juan', 'CONDUCTOR', 'aviso'); }],
  [12.4, e => e.globo('juan', 'Manejo, cuido el camión y miro cómo va la carga')]
]
  },
  {
    tipo: 'empresa',
    titulo: 'Preguntas de examen',
    texto: [],
    escena: { empresa: ['empresa', 560, { z: 100 }], juan: ['juan', 560], teresa: ['teresa', 230], pablo: ['pablo', 850], camion: ['camion', 1040, { alto: 100 }] },
    base: Object.keys({ empresa: ['empresa', 560, { z: 100 }], juan: ['juan', 560], teresa: ['teresa', 230], pablo: ['pablo', 850], camion: ['camion', 1040, { alto: 100 }] }).filter(n => !["inspector", "surtidor", "puerto", "sergio", "almacen", "ana", "oficina", "palets", "camionRojo", "escudo"].includes(n)),
    vista: 'general',
    quiz: true,
    linea: []
  }
];


export const PASOS_MERCADO_INTERM = [
  {
    tipo: 'interm',
    titulo: "Agencias, transitarios y operadores",
    texto: [
      "A veces el cliente no llama a Juan directo: llama a un <b>intermediario</b>, que busca el camión.",
      "Los únicos que pueden hacer de intermediarios entre el cargador (el que manda la carga) y el transportista son las <b>agencias de transporte autorizadas</b>. Contratan <b>siempre en nombre propio</b>.",
      "<b>Transitarios</b> = especialistas en organizar transportes <b>internacionales</b> (por ejemplo, un contenedor que llega al puerto).",
      "<b>Operador logístico</b> = gestiona <b>todo</b>: el aprovisionamiento, el transporte y la distribución. Usa camiones <b>propios y ajenos</b>.",
      "Para ser transitario u operador logístico hace falta la <b>autorización de operador de transporte</b>. Sirve para intermediar en transportes <b>nacionales e internacionales</b>."
  ],
    escena: { lopez: ['lopez', 130], agencia: ['agencia', 420, { z: 100 }], ricardo: ['ricardo', 420], juan: ['juan', 720], camion: ['camion', 920], puerto: ['puerto', 800, { z: 100 }], sergio: ['sergio', 450], almacen: ['almacen', 800, { z: 100 }], ana: ['ana', 450] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('LA AGENCIA')],
  [0.5, e => { ['lopez', 'agencia', 'ricardo', 'juan', 'camion'].forEach(n => e.mostrar(n)); }],
  [1.2, e => e.globo('lopez', 'Necesito un camión para mañana')],
  [3.0, e => { e.flecha('f1', 'lopez', 'ricardo'); e.globo('ricardo', 'Yo te lo consigo: soy de una AGENCIA'); }],
  [5.2, e => { e.flecha('f2', 'ricardo', 'juan'); e.globo('juan', 'Y yo hago el viaje'); }],
  [7.2, e => e.etiqueta('ricardo', 'Intermedia. Contrata EN NOMBRE PROPIO', 'ok')],
  [9.8, e => { e.titulo('EL TRANSITARIO'); e.flecha('f1'); e.flecha('f2'); e.etiqueta('ricardo', null); ['lopez', 'agencia', 'ricardo', 'camion'].forEach(n => e.ocultar(n)); e.ocultar('juan'); e.mostrar('puerto'); e.mostrar('sergio'); }],
  [10.8, e => e.globo('sergio', 'Organizo transportes INTERNACIONALES: del barco al camión')],
  [13.4, e => { e.titulo('EL OPERADOR LOGÍSTICO'); e.ocultar('puerto'); e.ocultar('sergio'); e.mostrar('almacen'); e.mostrar('ana'); }],
  [14.4, e => e.globo('ana', 'Yo lo gestiono TODO: guardar, llevar y repartir')],
  [17.0, e => e.etiqueta('aut', 'Transitario y operador: autorización de OPERADOR DE TRANSPORTE', 'grande', [560, 160])]
]
  },
  {
    tipo: 'interm',
    titulo: "Almacenes y centros de transporte",
    texto: [
      "<b>Almacenista-distribuidor</b> = guarda mercancía de otros en su almacén y después la reparte. Es una actividad <b>auxiliar y complementaria</b> del transporte, y también cuenta como <b>operador de transporte</b>.",
      "Reparte con <b>sus camiones o contratando transportistas</b>, y contrata <b>siempre en nombre propio</b>.",
      "<b>Centro de transporte y logística</b> = un lugar pensado para el transporte, la logística y la distribución. Tiene <b>un solo gestor</b> y <b>muchos servicios juntos</b>.",
      "Un terreno que <b>solo</b> sirve para estacionar camiones <b>no</b> es un centro de transporte."
  ],
    escena: { almacen: ['almacen', 560, { z: 100 }], operarios: ['operarios', 330], palets: ['palets', 760], camionArt: ['camionArt', -100], camion: ['camion', 920] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('EL ALMACENISTA-DISTRIBUIDOR')],
  [0.5, e => { e.mostrar('almacen'); e.mostrar('operarios'); e.mostrar('camionArt'); }],
  [1.0, e => e.mover('camionArt', 200)],
  [2.8, e => { e.mostrar('palets'); e.globo('operarios', 'Guardamos la mercancía de otros'); }],
  [5.4, e => { e.mostrar('camion'); e.globo('operarios', 'Y después la repartimos'); }],
  [6.4, e => e.mover('camion', 1060)],
  [7.6, e => e.etiqueta('camion', 'Con sus camiones o contratando transportistas', 'ok')],
  [10.0, e => { e.etiqueta('camion', null); e.etiqueta('almacen', 'Actividad AUXILIAR del transporte', 'aviso'); }],
  [12.6, e => { e.titulo('CENTRO DE TRANSPORTE'); e.etiqueta('almacen', 'UN solo gestor + MUCHOS servicios juntos', 'precio'); }],
  [15.4, e => e.etiqueta('est', 'Un terreno que SOLO sirve para estacionar: NO es un centro', 'deuda', [560, 160])]
]
  },
  {
    tipo: 'interm',
    titulo: "Cuando Juan le pasa un viaje a otro",
    texto: [
      "Un cliente le pide un viaje a Juan, pero él no tiene camión libre. Se lo pasa a su compañero <b>Pedro</b>: eso es trabajar <b>en colaboración</b>.",
      "<b>Frente al cliente</b>, Juan responde <b>como transportista</b>, y de <b>todo el viaje</b>, aunque lo haga Pedro.",
      "<b>Frente a Pedro</b>, Juan es <b>el cargador</b> (el que le encarga el viaje).",
      "<b>Frente a la Administración</b>, Juan responde <b>como operador de transportes</b>.",
      "Si no tiene los requisitos de operador, puede pasarle a otros hasta el <b>100 % de sus camiones</b>, nunca más.",
      "Un contrato con <b>varios transportistas uno detrás del otro</b> = <b>transporte sucesivo</b>. Un contrato con <b>varios modos</b> (camión + tren) = <b>multimodal</b>."
  ],
    escena: { lopez: ['lopez', 150], inspector: ['inspector', 150], juan: ['juan', 480], pedro: ['pedro', 800], camionArt: ['camionArt', 990] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('TRABAJAR EN COLABORACIÓN')],
  [0.5, e => { e.mostrar('lopez'); e.mostrar('juan'); }],
  [1.2, e => e.globo('lopez', 'Juan, llevame esto a Sevilla')],
  [3.2, e => e.globo('juan', 'No tengo camión libre… ¡Pedro, hacelo vos!')],
  [4.2, e => { e.mostrar('pedro'); e.mostrar('camionArt'); }],
  [5.8, e => { e.flecha('f1', 'lopez', 'juan', 'verde'); e.etiqueta('r1', 'Frente a López:<br>Juan es el TRANSPORTISTA', 'ok', [300, 140]); }],
  [8.4, e => { e.flecha('f2', 'juan', 'pedro', 'amarilla'); e.etiqueta('r2', 'Frente a Pedro:<br>Juan es el CARGADOR', 'aviso', [650, 140]); }],
  [11.0, e => { e.mover('camionArt', 1250); e.globo('lopez', 'Si algo sale mal, ¿a quién le reclamo?'); }],
  [13.2, e => e.globo('juan', 'A mí: respondo de TODO el viaje')],
  [15.6, e => { e.flecha('f1'); e.etiqueta('r1', null); e.ocultar('lopez'); e.mostrar('inspector'); e.flecha('f3', 'inspector', 'juan', 'roja'); e.etiqueta('r3', 'Frente a la Administración:<br>OPERADOR', 'deuda', [300, 140]); }],
  [18.4, e => e.etiqueta('r4', 'Sin requisitos de operador: hasta el 100 % de sus camiones', 'grande', [560, 120])]
]
  },
  {
    tipo: 'interm',
    titulo: 'Preguntas de examen',
    texto: [],
    escena: { lopez: ['lopez', 130], agencia: ['agencia', 420, { z: 100 }], ricardo: ['ricardo', 420], juan: ['juan', 720], camion: ['camion', 920], puerto: ['puerto', 800, { z: 100 }], sergio: ['sergio', 450], almacen: ['almacen', 800, { z: 100 }], ana: ['ana', 450] },
    base: Object.keys({ lopez: ['lopez', 130], agencia: ['agencia', 420, { z: 100 }], ricardo: ['ricardo', 420], juan: ['juan', 720], camion: ['camion', 920], puerto: ['puerto', 800, { z: 100 }], sergio: ['sergio', 450], almacen: ['almacen', 800, { z: 100 }], ana: ['ana', 450] }).filter(n => !["inspector", "surtidor", "puerto", "sergio", "almacen", "ana", "oficina", "palets", "camionRojo", "escudo"].includes(n)),
    vista: 'general',
    quiz: true,
    linea: []
  }
];


export const PASOS_MERCADO_CONTRATO = [
  {
    tipo: 'contrato',
    titulo: "Quién es quién en el contrato",
    texto: [
      "Juan firma su primer contrato de transporte. Aparecen varios nombres:",
      "• <b>Cargador</b>: el que <b>contrata</b> el transporte.<br>• <b>Expedidor</b>: el que <b>entrega la mercancía</b> al camión por cuenta del cargador.<br>• <b>Porteador</b>: el que <b>lleva</b> la carga (la empresa de Juan).<br>• <b>Destinatario</b> o consignatario: el que <b>recibe</b>.",
      "El contrato es <b>consensual</b>: vale con que se pongan de acuerdo. En la <b>carta de porte</b> van el nombre y la dirección del expedidor y del destinatario.",
      "Juan no necesita saber <b>para qué</b> van a usar la mercancía.",
      "<b>El precio:</b> si no se pactó, vale el <b>coste medio del Observatorio de Costes</b> del Ministerio. Si sube el combustible, el precio <b>se revisa con las fórmulas de la Administración</b> (es obligatorio desde 2022).",
      "<b>La ruta:</b> Juan sigue la que <b>le fijaron</b>. Si no le fijaron ninguna, la más adecuada es <b>la más corta</b>.",
      "Para terminar un contrato de transporte continuado (uno que se repite), se avisa con <b>30 días</b>."
  ],
    escena: { lopez: ['lopez', 120], ana: ['ana', 330], surtidor: ['surtidor', 330], camion: ['camion', 580], juan: ['juan', 760], tienda: ['tienda', 990, { z: 100 }], antonio: ['antonio', 960] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('QUIÉN ES QUIÉN EN EL CONTRATO')],
  [0.5, e => e.mostrar('lopez')],
  [1.0, e => e.globo('lopez', 'Yo CONTRATO el transporte: soy el CARGADOR')],
  [3.4, e => { e.mostrar('ana'); e.globo('ana', 'Yo entrego la carga al camión: soy la EXPEDIDORA'); }],
  [5.8, e => { e.mostrar('camion'); e.mostrar('juan'); e.volar('papel', 'ana', 'juan'); }],
  [6.6, e => e.globo('juan', 'Yo la llevo: soy el PORTEADOR')],
  [9.0, e => { e.mostrar('tienda'); e.mostrar('antonio'); e.globo('antonio', 'Y yo la recibo: soy el DESTINATARIO'); }],
  [11.6, e => { e.titulo('EL PRECIO'); e.ocultar('ana'); e.mostrar('surtidor'); e.globo('juan', '¿Y si sube el gasoil?'); }],
  [13.4, e => e.etiqueta('surtidor', 'El precio SE REVISA (es obligatorio)', 'precio')],
  [15.8, e => e.etiqueta('pr', 'Sin precio pactado: el del Observatorio de Costes', 'ok', [560, 140])]
]
  },
  {
    tipo: 'contrato',
    titulo: "La carga y la descarga",
    texto: [
      "Si se pactó el día pero no la hora, el camión tiene que estar antes de las <b>seis de la tarde</b>.",
      "<b>Carga: una hora.</b> <b>Descarga: una hora.</b> Si tarda más, Juan puede cobrar la espera (paralización).",
      "El transportista \"recibe\" la carga cuando está <b>cargada y estibada</b> (salvo que cargar le toque a él).",
      "La empresa de transporte <b>sí</b> puede dar instrucciones al cargar. En <b>paquetería</b>, colocar la carga es cosa <b>del porteador</b>. Poner y sacar <b>el toldo</b>, también. Con <b>combustible para casas</b>, la descarga la hace <b>el porteador</b>.",
      "<b>Los palets</b> del cargador son <b>parte del envío</b> y no se le alquilan al porteador. Devolverlos es <b>otro transporte aparte</b>.",
      "Si sospecha que mienten sobre lo que hay adentro, puede <b>revisar los bultos delante del cargador</b>. Y el cargador es responsable de <b>formar a su gente</b> que carga."
  ],
    escena: { almacen: ['almacen', 200, { z: 100 }], operarios: ['operarios', 330], palets: ['palets', 470], camion: ['camion', 640], juan: ['juan', 820], reloj: ['reloj', 990, { abajo: 330 }] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('¿A QUÉ HORA LLEGO?')],
  [0.5, e => { ['almacen', 'operarios', 'palets', 'camion', 'juan'].forEach(n => e.mostrar(n)); }],
  [1.2, e => e.globo('juan', 'Me dijeron el día pero no la hora: llego antes de las 6 de la tarde')],
  [4.0, e => { e.titulo('UNA HORA PARA CARGAR'); e.mostrar('reloj'); e.reloj('reloj', 5); }],
  [4.6, e => { e.mover('palets', 600); e.etiqueta('reloj', '1 HORA', 'ok'); }],
  [6.6, e => e.ocultar('palets')],
  [9.4, e => e.globo('juan', 'Si tardan más de una hora, cobro la espera')],
  [11.8, e => e.etiqueta('camion', 'Cargada y estibada = recibida', 'precio')],
  [14.2, e => { e.titulo('Y UNA HORA PARA DESCARGAR'); e.etiqueta('camion', null); e.reloj('reloj', 5); }],
  [17.0, e => e.etiqueta('pal', 'Los palets del cargador son parte del envío', 'aviso', [470, 260])]
]
  },
  {
    tipo: 'contrato',
    titulo: "La entrega y si algo sale mal",
    texto: [
      "<b>¿Cuándo entrega?</b> Si no se pactó, en el tiempo que tardaría <b>un transportista cuidadoso</b> (diligente). En paquetería que junta envíos: <b>24 horas más</b>.",
      "Si el plazo termina después de las seis de la tarde, entrega <b>a las nueve de la mañana siguiente</b> (o cuando abra el local).",
      "Si no está el que recibe y nadie le dice qué hacer, puede <b>dejar la carga en depósito en la Junta Arbitral</b>. Si pide instrucciones y no le contestan en <b>2 horas</b>, se entiende que no hay instrucciones.",
      "Si era <b>a porte debido</b> (paga el que recibe) y no le pagan, pide el <b>depósito y la venta</b> de parte de la carga para cobrar.",
      "Si el retraso es por <b>caso fortuito</b> (algo que nadie podía evitar), el porteador <b>no responde</b>.",
      "Si la carga se daña sin mala fe, paga como máximo <b>un tercio del IPREM diario por kilo</b> (IPREM = Indicador Público de Renta de Efectos Múltiples, un valor que fija el Gobierno)."
  ],
    escena: { camion: ['camion', 200], juan: ['juan', 380], tienda: ['tienda', 900, { z: 100 }], antonio: ['antonio', 720], oficina: ['oficinaPublica', 900, { z: 100 }], palets: ['palets', 800] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('LA ENTREGA')],
  [0.5, e => { e.mostrar('camion'); e.mostrar('juan'); e.mostrar('tienda'); }],
  [1.2, e => { e.mover('camion', 420); e.mover('juan', 600); }],
  [3.0, e => e.globo('juan', '¿El plazo? El de un transportista CUIDADOSO')],
  [5.6, e => { e.mostrar('antonio'); e.globo('antonio', 'Llegaste a las 7 de la tarde: entregá mañana a las 9'); }],
  [8.6, e => { e.ocultar('antonio'); e.titulo('NO HAY NADIE'); e.globo('juan', 'No está nadie y nadie me dice qué hacer…'); }],
  [11.0, e => { e.ocultar('tienda'); e.mostrar('oficina'); e.etiqueta('oficina', 'Depósito en la JUNTA ARBITRAL', 'aviso'); }],
  [13.8, e => { e.titulo('SI SE ROMPE LA CARGA'); e.ocultar('oficina'); e.etiqueta('oficina', null); e.mostrar('palets'); e.brilla('palets', true, 'rojo'); e.etiqueta('palets', 'Paga como máximo 1/3 del IPREM por kilo', 'deuda'); }],
  [17.0, e => e.etiqueta('cf', 'Caso fortuito (nadie podía evitarlo): NO responde', 'ok', [860, 200])]
]
  },
  {
    tipo: 'contrato',
    titulo: 'Preguntas de examen',
    texto: [],
    escena: { lopez: ['lopez', 120], ana: ['ana', 330], surtidor: ['surtidor', 330], camion: ['camion', 580], juan: ['juan', 760], tienda: ['tienda', 990, { z: 100 }], antonio: ['antonio', 960] },
    base: Object.keys({ lopez: ['lopez', 120], ana: ['ana', 330], surtidor: ['surtidor', 330], camion: ['camion', 580], juan: ['juan', 760], tienda: ['tienda', 990, { z: 100 }], antonio: ['antonio', 960] }).filter(n => !["inspector", "surtidor", "puerto", "sergio", "almacen", "ana", "oficina", "palets", "camionRojo", "escudo"].includes(n)),
    vista: 'general',
    quiz: true,
    linea: []
  }
];


export const PASOS_MERCADO_SEGUROS = [
  {
    tipo: 'seguros',
    titulo: "Las palabras del seguro",
    texto: [
      "Un día le dan un golpe al camión de Juan. Llega el perito del seguro y Juan aprende las palabras:",
      "• <b>Tomador</b>: el que <b>firma y paga</b> el seguro.<br>• <b>Asegurado</b>: la persona <b>a la que cubre</b>.<br>• <b>Beneficiario</b>: el que <b>cobra</b>.<br>• <b>Prima</b>: lo que se <b>paga</b> por el seguro.<br>• <b>Siniestro</b>: <b>lo que pasó</b> (el accidente).<br>• <b>Daño</b>: la pérdida que dejó.<br>• <b>Póliza</b>: el <b>papel</b> del seguro.",
      "Hay que avisar a la aseguradora en <b>7 días</b>.",
      "La póliza se escribe en <b>cualquier lengua oficial</b> del lugar. Si no dice dónde pagar la prima, se paga en <b>la casa del tomador</b>.",
      "Si un consumidor quiere asegurar su mercancía, ese seguro lo paga <b>el consumidor</b>."
  ],
    escena: { camionRojo: ['camionRojo', 270], juan: ['juan', 520], perito: ['perito', 760], poliza: ['poliza', 960, { abajo: 400 }] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('UN GOLPE')],
  [0.5, e => { e.mostrar('camionRojo'); e.mostrar('juan'); }],
  [1.2, e => { e.globo('juan', '¡Me chocaron el camión!'); e.brilla('camionRojo', true, 'rojo'); }],
  [2.8, e => e.etiqueta('camionRojo', 'SINIESTRO = lo que pasó', 'deuda')],
  [5.0, e => { e.mostrar('perito'); e.globo('perito', 'Soy de la aseguradora. Hay que avisar en 7 DÍAS'); }],
  [7.8, e => { e.mostrar('poliza'); e.etiqueta('poliza', 'PÓLIZA = el papel del seguro', 'ok'); }],
  [10.2, e => { e.volar('monedas', 'juan', 'perito'); e.etiqueta('tom', 'TOMADOR: firma y paga la PRIMA', 'precio', [400, 160]); }],
  [13.0, e => { e.volar('monedas', 'perito', 'juan'); e.etiqueta('tom', 'BENEFICIARIO: el que COBRA', 'aviso', [400, 160]); }],
  [15.8, e => e.etiqueta('tom', 'ASEGURADO: la persona a la que CUBRE', 'ok', [400, 160])]
]
  },
  {
    tipo: 'seguros',
    titulo: "El seguro obligatorio del camión",
    texto: [
      "Todo vehículo tiene que tener <b>seguro obligatorio</b>. El obligado es <b>el propietario</b>, pero lo puede contratar <b>cualquier interesado</b>.",
      "<b>Hasta cuánto paga:</b> daños a personas, <b>70 millones de euros</b> por siniestro; daños a cosas, <b>15 millones</b>.",
      "<b>Lo que NO cubre:</b> al <b>conductor que tuvo la culpa</b> (ni sus lesiones ni si muere), el vehículo culpable, <b>las cosas del dueño</b>, del tomador y de los parientes del conductor, ni <b>la mercancía</b> que llevaba el camión culpable.",
      "El conductor responde si el daño fue por <b>defectos de su vehículo</b>. Un alud o un terremoto no.",
      "<b>Sin seguro:</b> el camión <b>no puede circular</b>: depósito y <b>precinto de un mes</b> (tres meses la segunda vez, un año la tercera) y <b>multa de 601 a 3.005 euros</b>.",
      "Un vehículo \"vive\" en España cuando tiene <b>matrícula española</b>."
  ],
    escena: { camion: ['camion', 190], juan: ['juan', 380], pedro: ['pedro', 680], camionRojo: ['camionRojo', 890], escudo: ['escudo', 790, { abajo: 290 }], inspector: ['inspector', 560] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('EL SEGURO OBLIGATORIO')],
  [0.5, e => { ['camion', 'juan', 'pedro', 'camionRojo'].forEach(n => e.mostrar(n)); }],
  [1.2, e => e.globo('juan', 'Fue mi culpa: choqué el camión de Pedro')],
  [3.4, e => { e.mostrar('escudo'); e.etiqueta('pedro', 'A Pedro y su camión: SÍ cubre', 'ok'); }],
  [6.0, e => e.etiqueta('lim', 'Personas: hasta 70 millones · Cosas: hasta 15 millones', 'precio', [560, 120])],
  [9.0, e => { e.brilla('juan', true, 'rojo'); e.etiqueta('juan', 'Al conductor CULPABLE: NO cubre', 'deuda'); }],
  [11.6, e => e.etiqueta('camion', 'Su carga y las cosas del dueño: NO', 'deuda')],
  [14.4, e => { e.titulo('SIN SEGURO'); ['juan', 'pedro', 'camionRojo', 'escudo'].forEach(n => e.ocultar(n)); ['juan', 'pedro', 'camion', 'lim'].forEach(n => e.etiqueta(n, null)); e.mostrar('inspector'); }],
  [15.2, e => e.globo('inspector', 'Sin seguro no circula: precinto de 1 mes y multa de 601 a 3.005 €')]
]
  },
  {
    tipo: 'seguros',
    titulo: 'Preguntas de examen',
    texto: [],
    escena: { camionRojo: ['camionRojo', 270], juan: ['juan', 520], perito: ['perito', 760], poliza: ['poliza', 960, { abajo: 400 }] },
    base: Object.keys({ camionRojo: ['camionRojo', 270], juan: ['juan', 520], perito: ['perito', 760], poliza: ['poliza', 960, { abajo: 400 }] }).filter(n => !["inspector", "surtidor", "puerto", "sergio", "almacen", "ana", "oficina", "palets", "camionRojo", "escudo"].includes(n)),
    vista: 'general',
    quiz: true,
    linea: []
  }
];


export const PASOS_MERCADO_JUNTAS = [
  {
    tipo: 'juntas',
    titulo: "¿Qué es una Junta Arbitral?",
    texto: [
      "Un cliente no le quiere pagar a Juan. En vez de ir a un juicio, van a la <b>Junta Arbitral del Transporte</b>: una mesa que escucha a los dos y decide.",
      "Resuelve peleas <b>mercantiles</b> (de plata y contratos) del <b>transporte terrestre</b>: carretera y tren. También si hay varios modos en un contrato, con uno terrestre.",
      "También ordena el <b>depósito de la mercancía</b> (cuando el transportista no puede entregar o no le pagan) y hace <b>peritajes</b>.",
      "<b>¿Hace falta acuerdo para ir?</b> Sí, pero <b>hasta 15.000 euros se supone</b> que los dos aceptan, salvo que alguno diga que no <b>antes de que empiece el transporte</b>. También se puede pactar una Junta concreta."
  ],
    escena: { juan: ['juan', 170], lopez: ['lopez', 390], oficina: ['oficinaPublica', 940, { z: 100 }], carmen: ['carmen', 720] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('NO ME QUIERE PAGAR')],
  [0.5, e => { e.mostrar('juan'); e.mostrar('lopez'); }],
  [1.2, e => e.globo('juan', 'López, me debés 900 € del viaje')],
  [3.2, e => e.globo('lopez', 'No te pago: llegaste tarde')],
  [5.4, e => { e.mostrar('oficina'); e.etiqueta('oficina', 'JUNTA ARBITRAL DEL TRANSPORTE', 'ok'); }],
  [6.4, e => { e.mover('juan', 330); e.mover('lopez', 500); }],
  [8.4, e => { e.etiqueta('oficina', null); e.mostrar('carmen'); e.globo('carmen', 'Acá resolvemos peleas de PLATA del transporte por carretera y tren'); }],
  [11.6, e => e.etiqueta('q', 'Hasta 15.000 €: se supone que los dos aceptan', 'precio', [400, 140])],
  [14.4, e => e.etiqueta('q', 'También guarda la carga (depósito) y hace peritajes', 'aviso', [400, 140])]
]
  },
  {
    tipo: 'juntas',
    titulo: "Cómo funciona la Junta",
    texto: [
      "<b>Es gratis</b> (solo se pagan los gastos de las pruebas). <b>No hace falta abogado ni procurador.</b> Se reclama con un <b>escrito firmado</b>: quién reclama, contra quién y por qué.",
      "Se pueden pedir <b>pruebas</b> y generalmente hay una <b>vista</b> (una reunión cara a cara). Si falta el reclamado o un vocal, se hace igual. Si falta el que reclamó, se entiende que <b>desistió</b>.",
      "<b>Quiénes la forman:</b> un <b>presidente</b> (funcionario y licenciado en Derecho) y de <b>2 a 4 vocales</b>. Hay gente de la Administración (el presidente y hasta dos vocales), de los cargadores y de los transportistas.",
      "La decisión se llama <b>laudo</b>. Sale en <b>6 meses</b> como máximo, por <b>mayoría simple</b>; si hay empate, decide <b>el presidente</b>. Si no lo cumplen, se va al juez a los <b>20 días</b>.",
      "<b>¿Qué Junta?</b> La del <b>origen, el destino o el domicilio</b> de la empresa de transporte. Elige <b>el demandante</b> (si es consumidor, puede ser la de su casa). El demandado <b>nunca</b> elige. Si se reclamó en varias, decide <b>la primera</b>."
  ],
    escena: { mesa: ['mesa', 560, { abajo: 595, alto: 210, z: 600 }], carmen: ['carmen', 560, { abajo: 470, alto: 270 }], vocal: ['vocal', 380, { abajo: 505, alto: 270 }], sergio: ['sergio', 740, { abajo: 505, alto: 280 }], juan: ['juan', 140], lopez: ['lopez', 990], mazo: ['mazo', 650, { abajo: 500, z: 700 }], laudo: ['laudo', 868, { abajo: 330, z: 800 }] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('CÓMO FUNCIONA LA JUNTA')],
  [0.5, e => { ['mesa', 'carmen', 'vocal', 'sergio'].forEach(n => e.mostrar(n)); }],
  [1.2, e => { e.etiqueta('carmen', 'PRESIDENTA: funcionaria y abogada', 'ok'); e.etiqueta('vocal', 'VOCALES: de 2 a 4', 'aviso'); }],
  [4.0, e => { e.mostrar('juan'); e.mostrar('lopez'); e.etiqueta('carmen', null); e.etiqueta('vocal', null); }],
  [4.8, e => e.globo('juan', 'Reclamo por escrito. ¡Es gratis y sin abogado!')],
  [7.4, e => e.globo('lopez', 'Yo traigo mis pruebas')],
  [9.8, e => { e.mostrar('mazo'); e.globo('carmen', 'Votamos: gana la mayoría. Si hay empate, decido yo'); }],
  [12.8, e => { e.mostrar('laudo'); e.etiqueta('laudo', 'LAUDO: en 6 meses como máximo', 'precio'); }],
  [15.6, e => e.etiqueta('jz', 'Si no lo cumple: al juez a los 20 días', 'deuda', [300, 170])],
  [18.2, e => e.etiqueta('jz', '¿Qué Junta? La elige el que reclama', 'grande', [300, 170])]
]
  },
  {
    tipo: 'juntas',
    titulo: 'Preguntas de examen',
    texto: [],
    escena: { juan: ['juan', 170], lopez: ['lopez', 390], oficina: ['oficinaPublica', 940, { z: 100 }], carmen: ['carmen', 720] },
    base: Object.keys({ juan: ['juan', 170], lopez: ['lopez', 390], oficina: ['oficinaPublica', 940, { z: 100 }], carmen: ['carmen', 720] }).filter(n => !["inspector", "surtidor", "puerto", "sergio", "almacen", "ana", "oficina", "palets", "camionRojo", "escudo"].includes(n)),
    vista: 'general',
    quiz: true,
    linea: []
  }
];
