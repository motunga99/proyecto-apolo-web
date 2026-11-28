// ==========================================
// LABORAL: los 5 capítulos
// Escenas con muñequitos, igual que Sociedades. Personajes: Juan (camionero), Teresa (la jefa),
// Laura (la médica), Manolo (compañero mayor), el inspector y los compañeros del almacén.
// Todo sale de las preguntas oficiales y de la norma vigente.
// ==========================================


export const PASOS_TRABAJO_EMPRESA = [
  {
    tipo: 'empresa',
    titulo: "Juan firma su contrato",
    texto: [
      "<b>Juan</b> entra a trabajar de camionero en una empresa de transporte. Se sienta con el jefe en la oficina y firma el contrato.",
      "<b>¿Qué puede mandar el jefe?</b> La <b>dirección de la empresa</b> (el jefe) puede <b>darle tareas</b>, <b>cambiarle el trabajo</b> y <b>decidir cómo se hace</b>. Las tres cosas.",
      "Juan es un <b>trabajador móvil</b>: trabaja viajando, arriba del camión. También lo son los que viajan en un bus, como el <b>auxiliar de viaje</b>. El de la oficina que sale a hacer un trámite <b>no</b>.",
      "<b>Tiempo de presencia:</b> a veces Juan llega al almacén y tiene que <b>esperar que lo carguen</b>. No maneja ni descarga, pero <b>está a disposición del jefe</b>. Eso es tiempo de presencia: <b>a disposición, sin trabajo efectivo</b>.",
      "No es tiempo de presencia: descansar en casa, manejar ni hacerle mantenimiento al camión (eso es trabajar)."
  ],
    escena: { teresa: ['teresa', 250], juan: ['juan', 480], almacen: ['almacen', 900, { z: 100 }], camion: ['camion', 920], reloj: ['reloj', 330, { abajo: 320 }] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('JUAN ENTRA A TRABAJAR')],
  [0.5, e => { e.mostrar('teresa'); e.mostrar('juan'); }],
  [1.2, e => e.globo('teresa', 'Bienvenido, Juan. Firmá acá')],
  [2.6, e => e.volar('papel', 'teresa', 'juan')],
  [4.2, e => { e.etiqueta('teresa', 'LA DIRECCIÓN (la jefa)', 'ok'); e.globo('teresa', 'Yo te doy las tareas, te las puedo cambiar y decido cómo se hacen'); }],
  [7.6, e => { e.globo('teresa'); e.etiqueta('juan', 'TRABAJADOR MÓVIL: trabaja viajando', 'aviso'); }],
  [10.2, e => { e.titulo('TIEMPO DE PRESENCIA'); e.etiqueta('teresa', null); e.etiqueta('juan', null); e.ocultar('teresa'); e.mostrar('almacen'); e.mostrar('camion'); e.mover('juan', 640); }],
  [11.6, e => { e.mostrar('reloj'); e.reloj('reloj', 6); e.globo('juan', 'Espero que me carguen… no manejo ni descargo'); }],
  [14.4, e => e.etiqueta('reloj', 'A disposición del jefe, SIN trabajar', 'precio')]
]
  },
  {
    tipo: 'empresa',
    titulo: "Cómo le pagan a Juan",
    texto: [
      "Juan le pregunta al jefe: \"¿Me pagan más si hago más kilómetros?\".",
      "<b>La regla:</b> la empresa <b>no puede pagar primas</b> (plata extra) por <b>kilómetros, por carga o por volumen</b> si eso <b>pone en riesgo la seguridad</b> en la carretera. ¿Por qué? Porque te empuja a correr y a no descansar.",
      "Ojo: no está prohibido \"en ningún caso\". Está prohibido <b>si compromete la seguridad</b>. Esa es la respuesta del examen.",
      "<b>Si Juan trabaja para varias empresas</b>, le tiene que pasar a cada jefe las horas que trabajó en las otras, y <b>por escrito</b>. Así nadie lo hace trabajar de más."
  ],
    escena: { teresa: ['teresa', 250], juan: ['juan', 520], camion: ['camion', 820], empresa: ['empresa', 900, { z: 100 }] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('CÓMO LE PAGAN A JUAN')],
  [0.5, e => { e.mostrar('teresa'); e.mostrar('juan'); e.mostrar('camion'); }],
  [1.2, e => e.globo('juan', '¿Me pagan más si hago más kilómetros?')],
  [3.6, e => e.globo('teresa', 'No, si eso te hace correr y no descansar')],
  [6.0, e => { e.brilla('camion', true, 'rojo'); e.etiqueta('pr', 'Plata extra por kilómetros o por carga: PROHIBIDA si pone en riesgo la seguridad', 'deuda', [560, 150]); }],
  [10.0, e => { e.titulo('SI TRABAJA PARA VARIAS EMPRESAS'); e.brilla('camion', false); e.etiqueta('pr', null); e.ocultar('camion'); e.mostrar('empresa'); }],
  [11.2, e => e.globo('juan', 'También trabajo para otra empresa')],
  [13.0, e => { e.volar('papel', 'juan', 'teresa'); e.etiqueta('esc', 'Le pasa a cada jefe sus horas en las otras: POR ESCRITO', 'ok', [400, 150]); }]
]
  },
  {
    tipo: 'empresa',
    titulo: "El control en la carretera",
    texto: [
      "Juan va por la autovía y un agente lo para en un <b>control</b>.",
      "En ese momento, Juan es el <b>representante de la empresa</b>. Por eso tiene que <b>dar los papeles que le pidan</b> sobre ese transporte. No es \"secreto de la empresa\".",
      "<b>¿Quién paga las multas de circulación?</b> (velocidad, semáforo, adelantar mal…). <b>El conductor</b>: el que maneja.",
      "Si el camión es <b>alquilado</b> por una empresa extranjera y el que maneja no es el que lo alquiló, el conductor tiene que mostrar su <b>contrato de trabajo</b>. Es obligatorio.",
      "<b>Certificado de actividades:</b> ya <b>no se pide nunca</b>. Ni por vacaciones ni por baja de enfermedad. Después de vacaciones <b>no hace falta llevar ningún papel</b>.",
      "Lo que Juan sí lleva siempre encima: su <b>tarjeta de cualificación profesional</b> (la tarjeta CAP)."
  ],
    escena: { camion: ['camion', 220], juan: ['juan', 450], inspector: ['inspector', 720], tarjetaCap: ['tarjetaCap', 450, { abajo: 200 }] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('UN CONTROL EN LA CARRETERA')],
  [0.5, e => { e.mostrar('camion'); e.mostrar('juan'); e.mostrar('inspector'); }],
  [1.2, e => e.globo('inspector', 'Control. ¿Los papeles de este transporte?')],
  [3.2, e => { e.globo('juan', 'Acá están'); e.volar('papel', 'juan', 'inspector'); }],
  [4.8, e => e.etiqueta('juan', 'Ahora es el REPRESENTANTE DE LA EMPRESA', 'ok')],
  [7.4, e => { e.etiqueta('juan', null); e.globo('inspector', 'Ibas muy rápido: la multa es tuya'); e.volar('factura', 'inspector', 'juan'); }],
  [9.4, e => e.etiqueta('mul', 'Multas de circulación: las paga el CONDUCTOR', 'deuda', [600, 130])],
  [12.0, e => { e.etiqueta('mul', null); e.globo('inspector', '¿Y el certificado de actividades?'); }],
  [13.8, e => e.globo('juan', 'Ya no se pide nunca. Ni después de vacaciones')],
  [16.0, e => { e.mostrar('tarjetaCap'); e.etiqueta('tarjetaCap', 'Lo que SIEMPRE lleva: la tarjeta CAP', 'precio'); }],
  [18.6, e => e.etiqueta('alq', 'Camión alquilado por una empresa extranjera: CONTRATO DE TRABAJO', 'aviso', [600, 130])]
]
  },
  {
    tipo: 'empresa',
    titulo: 'Preguntas de examen',
    texto: [],
    escena: { teresa: ['teresa', 250], juan: ['juan', 480], almacen: ['almacen', 900, { z: 100 }], camion: ['camion', 920], reloj: ['reloj', 330, { abajo: 320 }] },
    base: Object.keys({ teresa: ['teresa', 250], juan: ['juan', 480], almacen: ['almacen', 900, { z: 100 }], camion: ['camion', 920], reloj: ['reloj', 330, { abajo: 320 }] }).filter(n => !["almacen", "camion", "reloj", "empresa", "tarjetaCap", "casa", "auto", "ambulancia", "dolorEspalda", "maniqui", "cabina", "juanHerido", "crema"].includes(n)),
    vista: 'general',
    quiz: true,
    linea: []
  }
];


export const PASOS_TRABAJO_PREV = [
  {
    tipo: 'prevencion',
    titulo: "Prevenir es cosa de los dos",
    texto: [
      "El primer día, el jefe le muestra el almacén a Juan: pasillos pintados de amarillo, carteles, todos con casco y chaleco. Eso es <b>prevención de riesgos laborales</b>: cuidar que nadie se lastime trabajando.",
      "<b>¿De quién es la obligación?</b> <b>De los dos: del empresario y del trabajador.</b> No solo del jefe, no solo de Juan, no de las autoridades.",
      "<b>¿Para qué sirve?</b> Para <b>evitar los riesgos que se pueden evitar</b> y <b>evaluar (medir) los que no se pueden evitar</b>.",
      "Donde peor se cumple: en las empresas <b>más chiquitas, de 1 a 5 trabajadores</b>."
  ],
    escena: { almacen: ['almacen', 560, { z: 100 }], teresa: ['teresa', 260], juan: ['juan', 860], operarios: ['operarios', 560] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('PREVENIR RIESGOS')],
  [0.5, e => { e.mostrar('almacen'); e.mostrar('operarios'); }],
  [1.2, e => e.etiqueta('operarios', 'Cuidar que nadie se lastime trabajando', 'ok')],
  [3.6, e => { e.etiqueta('operarios', null); e.mostrar('teresa'); e.globo('teresa', 'Yo, como jefa, tengo que prevenir'); }],
  [5.8, e => { e.mostrar('juan'); e.globo('juan', '¡Y yo también!'); }],
  [7.6, e => e.etiqueta('dos', 'Obligación de LOS DOS: empresario y trabajador', 'precio', [560, 120])],
  [10.6, e => e.etiqueta('dos', '¿Para qué? EVITAR lo que se puede evitar y EVALUAR lo que no', 'ok', [560, 120])],
  [13.6, e => e.etiqueta('dos', 'Donde peor se cumple: empresas de 1 a 5 trabajadores', 'deuda', [560, 120])]
]
  },
  {
    tipo: 'prevencion',
    titulo: "Lo que tiene que hacer el jefe",
    texto: [
      "Las obligaciones del <b>empresario</b>:",
      "• <b>Evitar los riesgos evitables.</b><br>• <b>Adoptar medidas de protección.</b><br>• <b>Formar e informar</b> a los trabajadores de los riesgos de su tarea.<br>• <b>Darles la ropa y los equipos de protección</b>.",
      "Con los equipos de protección, el jefe <b>decide qué puestos los necesitan</b>, <b>dice cuál hace falta</b> y <b>se encarga de mantenerlos</b>.",
      "<b>Truco:</b> si la respuesta es <b>evitar, adoptar o formar</b>, es del <b>jefe</b>. <b>Usar</b> los equipos <b>no</b> es del jefe: es de Juan."
  ],
    escena: { teresa: ['teresa', 300], maniqui: ['maniqui', 800], juan: ['juan', 560] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('LO QUE TIENE QUE HACER LA JEFA')],
  [0.5, e => e.mostrar('teresa')],
  [1.2, e => e.globo('teresa', '1. EVITO los riesgos que se pueden evitar')],
  [3.6, e => e.globo('teresa', '2. ADOPTO medidas de protección')],
  [6.0, e => { e.mostrar('juan'); e.globo('teresa', '3. Te FORMO e INFORMO de los riesgos'); }],
  [8.8, e => { e.mostrar('maniqui'); e.globo('teresa', '4. Te DOY la ropa y los equipos de protección'); }],
  [11.6, e => e.globo('teresa', 'Y decido qué puestos los necesitan, cuál hace falta y los mantengo')],
  [14.6, e => { e.globo('teresa'); e.brilla('maniqui', true, 'rojo'); e.etiqueta('maniqui', 'USAR los equipos NO es de la jefa: es de Juan', 'deuda'); }]
]
  },
  {
    tipo: 'prevencion',
    titulo: "Lo que tiene que hacer Juan",
    texto: [
      "Las obligaciones del <b>trabajador</b> son dos cosas fáciles:",
      "• <b>Usar los equipos de protección.</b><br>• <b>Respetar los métodos de trabajo</b>: hacer las cosas como se las enseñaron.",
      "<b>Truco:</b> si la respuesta es <b>usar o respetar</b>, es de <b>Juan</b>.",
      "Pregunta trampa: \"utilizar las <b>medidas de salud</b>\". Eso <b>no existe</b> como obligación. Es la respuesta que la ley <b>no</b> impone."
  ],
    escena: { juan: ['juan', 380], maniqui: ['maniqui', 720] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('LO QUE TIENE QUE HACER JUAN')],
  [0.5, e => e.mostrar('juan')],
  [1.2, e => { e.mostrar('maniqui'); e.globo('juan', 'Me pongo los equipos que me dieron'); }],
  [3.2, e => e.etiqueta('maniqui', '1. USAR los equipos de protección', 'ok')],
  [6.0, e => e.globo('juan', 'Y hago las cosas como me enseñaron')],
  [7.6, e => e.etiqueta('juan', '2. RESPETAR los métodos de trabajo', 'ok')],
  [10.6, e => { e.globo('juan'); e.etiqueta('tr', 'Pregunta trampa: "utilizar las medidas de salud" NO existe', 'deuda', [560, 130]); }]
]
  },
  {
    tipo: 'prevencion',
    titulo: "Cuánto cuesta un accidente",
    texto: [
      "Un accidente no solo duele: también cuesta mucha plata. Es un <b>gran coste económico</b>.",
      "¿A quién le cuesta? <b>Al trabajador, a la empresa y a toda la sociedad.</b> A todos.",
      "Y prevenir bien trae cosas buenas: trabajadores <b>más motivados</b>, <b>mejores relaciones</b> en la empresa y <b>más contentos</b> en su puesto. Todas."
  ],
    escena: { juanHerido: ['juanHerido', 200], empresa: ['empresa', 560, { z: 100 }], ana: ['ana', 870], ricardo: ['ricardo', 990], juan: ['juan', 200] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('CUÁNTO CUESTA UN ACCIDENTE')],
  [0.5, e => e.mostrar('juanHerido')],
  [1.2, e => e.etiqueta('juanHerido', 'Al trabajador: −€', 'deuda')],
  [3.0, e => { e.mostrar('empresa'); e.etiqueta('empresa', 'A la empresa: −€', 'deuda'); }],
  [4.8, e => { e.mostrar('ana'); e.mostrar('ricardo'); e.etiqueta('ana', 'A toda la sociedad: −€', 'deuda'); }],
  [7.4, e => e.etiqueta('tot', 'Un GRAN COSTE ECONÓMICO', 'grande', [560, 120])],
  [10.4, e => { e.titulo('PREVENIR TRAE COSAS BUENAS'); ['juanHerido', 'empresa', 'ana', 'tot'].forEach(n => e.etiqueta(n, null)); e.ocultar('juanHerido'); e.mostrar('juan'); }],
  [11.4, e => e.globo('juan', 'Trabajo más contento y tranquilo')],
  [13.0, e => e.etiqueta('tot', 'Más motivación, mejores relaciones, más satisfacción', 'precio', [560, 120])]
]
  },
  {
    tipo: 'prevencion',
    titulo: 'Preguntas de examen',
    texto: [],
    escena: { almacen: ['almacen', 560, { z: 100 }], teresa: ['teresa', 260], juan: ['juan', 860], operarios: ['operarios', 560] },
    base: Object.keys({ almacen: ['almacen', 560, { z: 100 }], teresa: ['teresa', 260], juan: ['juan', 860], operarios: ['operarios', 560] }).filter(n => !["almacen", "camion", "reloj", "empresa", "tarjetaCap", "casa", "auto", "ambulancia", "dolorEspalda", "maniqui", "cabina", "juanHerido", "crema"].includes(n)),
    vista: 'general',
    quiz: true,
    linea: []
  }
];


export const PASOS_TRABAJO_ACC = [
  {
    tipo: 'accidente',
    titulo: "¿Qué es un accidente de trabajo?",
    texto: [
      "Un día Juan se corta el brazo descargando y termina en el médico.",
      "<b>Accidente de trabajo</b> = una <b>lesión en el cuerpo</b> que el trabajador <b>sufre</b> por el trabajo. Tiene que haber lesión en el cuerpo. Si solo se rompe una caja, no es accidente de trabajo.",
      "No hace falta contrato fijo, ni máquinas, ni que pase justo en el puesto.",
      "<b>¿Dónde?</b> En el trabajo <b>o in itinere</b>. <b>In itinere</b> es latín y quiere decir \"en el camino\": <b>yendo o volviendo del trabajo</b>.",
      "Si Juan ya tenía una enfermedad y el accidente la <b>empeora</b>, eso también <b>cuenta como accidente de trabajo</b>."
  ],
    escena: { juanHerido: ['juanHerido', 460], laura: ['laura', 720], casa: ['casa', 140], auto: ['auto', 330], empresa: ['empresa', 960, { z: 100 }] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('¿QUÉ ES UN ACCIDENTE DE TRABAJO?')],
  [0.5, e => { e.mostrar('juanHerido'); e.mostrar('laura'); }],
  [1.2, e => e.globo('laura', '¿Qué te pasó, Juan?')],
  [2.8, e => e.globo('juanHerido', 'Me corté el brazo descargando')],
  [4.8, e => e.etiqueta('les', 'LESIÓN EN EL CUERPO por el trabajo = ACCIDENTE DE TRABAJO', 'deuda', [560, 130])],
  [8.4, e => { e.titulo('IN ITINERE = EN EL CAMINO'); e.etiqueta('les', null); e.globo('laura'); e.ocultar('juanHerido'); e.ocultar('laura'); e.mostrar('casa'); e.mostrar('auto'); e.mostrar('empresa'); }],
  [9.6, e => e.mover('auto', 790)],
  [11.0, e => e.etiqueta('auto', 'Yendo o volviendo del trabajo: también cuenta', 'aviso')],
  [14.0, e => { e.etiqueta('auto', null); e.etiqueta('enf', 'Si ya estaba enfermo y el accidente lo EMPEORA: también cuenta', 'ok', [560, 130]); }]
]
  },
  {
    tipo: 'accidente',
    titulo: "La enfermedad profesional",
    texto: [
      "La médica le cuenta a Juan que hay otra cosa: la <b>enfermedad profesional</b>.",
      "Es la que te agarrás <b>por el trabajo que hacés</b>. Tiene <b>relación con un tipo de trabajo</b> y la tienen <b>muchos</b> de los que hacen ese trabajo.",
      "Para que sea enfermedad profesional, la tienen que <b>reconocer las autoridades sanitarias</b>. No alcanza con que lo diga el trabajador, ni la mutua, ni la empresa.",
      "Un trabajador puede tener las tres cosas: <b>enfermedad profesional, accidente de trabajo y enfermedad común</b>."
  ],
    escena: { dolorEspalda: ['dolorEspalda', 330], operarios: ['operarios', 640], laura: ['laura', 930] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('LA ENFERMEDAD PROFESIONAL')],
  [0.5, e => e.mostrar('dolorEspalda')],
  [1.2, e => e.globo('dolorEspalda', 'Me duele siempre… ¿será por mi trabajo?')],
  [3.4, e => e.etiqueta('dolorEspalda', 'La que te agarrás POR EL TRABAJO que hacés', 'aviso')],
  [6.0, e => { e.mostrar('operarios'); e.etiqueta('operarios', 'Y la tienen MUCHOS de ese trabajo', 'aviso'); }],
  [9.0, e => { e.mostrar('laura'); e.globo('laura', 'Para que sea enfermedad profesional, la reconocen las AUTORIDADES SANITARIAS'); }],
  [13.0, e => e.etiqueta('tres', 'Se puede tener: enfermedad profesional, accidente de trabajo y enfermedad común', 'ok', [560, 120])]
]
  },
  {
    tipo: 'accidente',
    titulo: "El accidente sin golpe (no traumático)",
    texto: [
      "<b>Traumático</b> = con golpe o corte. <b>No traumático</b> = <b>sin golpe</b>.",
      "Accidente <b>no traumático</b> = una <b>enfermedad que aparece de golpe</b> y <b>sin violencia</b>. Por ejemplo: a un compañero de Juan le da un infarto manejando.",
      "Lo que lo marca: <b>aparece o empeora de repente</b>.",
      "Son los que dan las <b>bajas más largas</b>.",
      "De los muertos en el trabajo en España, <b>del 36 al 45 %</b> son por accidentes no traumáticos."
  ],
    escena: { camion: ['camion', 200], manolo: ['manolo', 450], laura: ['laura', 720], ambulancia: ['ambulancia', 950] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('EL ACCIDENTE SIN GOLPE')],
  [0.5, e => { e.mostrar('camion'); e.mostrar('manolo'); }],
  [1.2, e => { e.brilla('manolo', true, 'rojo'); e.globo('manolo', 'Ay… me duele el pecho de repente'); }],
  [3.6, e => e.etiqueta('nt', 'NO TRAUMÁTICO = sin golpe, aparece DE REPENTE (ej: un infarto)', 'deuda', [560, 130])],
  [7.6, e => { e.mostrar('ambulancia'); e.mostrar('laura'); e.etiqueta('nt', null); }],
  [8.6, e => e.globo('laura', 'Estas son las bajas MÁS LARGAS')],
  [11.6, e => e.etiqueta('nt', 'Del 36 al 45 % de los muertos en el trabajo en España', 'aviso', [560, 130])]
]
  },
  {
    tipo: 'accidente',
    titulo: "El transporte, en números",
    texto: [
      "Lo que más accidentes laborales causa en el transporte: <b>los accidentes de tráfico</b>.",
      "En muertos en el trabajo, el transporte por carretera (y por tubería) está <b>primero</b> de todos los sectores. Los conductores profesionales son los que más mueren: <b>ninguna otra ocupación los supera</b>.",
      "Las bajas en el transporte duran <b>más que la media</b> de los otros trabajos.",
      "<b>¿Por qué pasan los accidentes?</b> Casi nunca por una sola cosa: son la <b>suma de varias causas</b> (herramientas rotas, mala organización, el trabajador que hace algo mal…).",
      "Lo que <b>no</b> causa accidentes: un <b>ritmo de trabajo tranquilo</b>."
  ],
    escena: { camion: ['camion', 230], camionArt: ['camionArt', 560], camionRojo: ['camionRojo', 890], operarios: ['operarios', 560] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('EL TRANSPORTE, EN NÚMEROS')],
  [0.5, e => { e.mostrar('camion'); e.mostrar('camionArt'); e.mostrar('camionRojo'); }],
  [1.4, e => { e.brilla('camionRojo', true, 'rojo'); e.etiqueta('n', 'Causa nº 1 de accidentes laborales: los ACCIDENTES DE TRÁFICO', 'deuda', [560, 140]); }],
  [5.0, e => e.etiqueta('n', 'Primero en muertos: ninguna ocupación supera a los conductores', 'deuda', [560, 140])],
  [8.6, e => e.etiqueta('n', 'Las bajas duran MÁS que la media', 'aviso', [560, 140])],
  [11.6, e => { e.brilla('camionRojo', false); e.etiqueta('n', 'Casi nunca hay una sola causa: es la SUMA DE VARIAS', 'ok', [560, 140]); }],
  [14.6, e => e.etiqueta('n', 'Un ritmo de trabajo TRANQUILO no causa accidentes', 'precio', [560, 140])]
]
  },
  {
    tipo: 'accidente',
    titulo: 'Preguntas de examen',
    texto: [],
    escena: { juanHerido: ['juanHerido', 460], laura: ['laura', 720], casa: ['casa', 140], auto: ['auto', 330], empresa: ['empresa', 960, { z: 100 }] },
    base: Object.keys({ juanHerido: ['juanHerido', 460], laura: ['laura', 720], casa: ['casa', 140], auto: ['auto', 330], empresa: ['empresa', 960, { z: 100 }] }).filter(n => !["almacen", "camion", "reloj", "empresa", "tarjetaCap", "casa", "auto", "ambulancia", "dolorEspalda", "maniqui", "cabina", "juanHerido", "crema"].includes(n)),
    vista: 'general',
    quiz: true,
    linea: []
  }
];


export const PASOS_TRABAJO_RIES = [
  {
    tipo: 'riesgos',
    titulo: "El sobreesfuerzo",
    texto: [
      "Juan carga cajas todo el día. El accidente que más les pasa a los camioneros es el <b>sobreesfuerzo</b>: <b>forzar el cuerpo de más</b>.",
      "No es \"levantar pesos excesivos\" ni \"manipular mal la carga\": la palabra del examen es <b>sobreesfuerzos</b>. También es el más común entre los que <b>no matan</b>.",
      "Un sobreesfuerzo puede terminar en una <b>hernia de disco</b> (un problema en la columna).",
      "Los riesgos principales del trabajo: <b>al cargar y descargar</b> y al hacer el <b>mantenimiento</b> del camión."
  ],
    escena: { levantaMal: ['levantaMal', 360], dolorEspalda: ['dolorEspalda', 720], camion: ['camion', 980] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('EL SOBREESFUERZO')],
  [0.5, e => e.mostrar('levantaMal')],
  [1.4, e => { e.brilla('levantaMal', true, 'rojo'); e.etiqueta('levantaMal', 'Forzar el cuerpo de más = SOBREESFUERZO', 'deuda'); }],
  [4.6, e => e.etiqueta('n1', 'El accidente Nº 1 del camionero', 'grande', [560, 120])],
  [7.4, e => { e.mostrar('dolorEspalda'); e.globo('dolorEspalda', 'Ahora tengo una hernia de disco'); }],
  [10.4, e => { e.mostrar('camion'); e.etiqueta('n1', 'Los riesgos: al CARGAR, DESCARGAR y en el MANTENIMIENTO', 'aviso', [560, 120]); }]
]
  },
  {
    tipo: 'riesgos',
    titulo: "Vibraciones y caídas",
    texto: [
      "Si los <b>amortiguadores</b> del camión están mal cuidados, Juan tiene <b>vibraciones todo el día</b> en el cuerpo. Eso es <b>exposición continuada a vibraciones</b>.",
      "Las vibraciones pueden traer <b>artrosis en el codo</b>.",
      "Si la <b>escalera</b> del camión o del almacén está rota, el riesgo es la <b>caída a distinto nivel</b>: caerse <b>de arriba hacia abajo</b>.",
      "<b>Mismo nivel</b> = tropezar en el piso. <b>Distinto nivel</b> = caer desde una altura."
  ],
    escena: { camion: ['camion', 280], juan: ['juan', 520], cabina: ['cabina', 850] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('VIBRACIONES')],
  [0.5, e => { e.mostrar('camion'); e.mostrar('juan'); }],
  [1.2, e => { e.brilla('camion', true, 'rojo'); e.globo('juan', 'Los amortiguadores están rotos: todo el día vibro'); }],
  [4.0, e => e.etiqueta('camion', 'Amortiguadores mal = VIBRACIONES', 'aviso')],
  [6.6, e => e.etiqueta('v', 'Las vibraciones pueden dar ARTROSIS DE CODO', 'deuda', [560, 130])],
  [9.6, e => { e.titulo('CAÍDAS'); e.brilla('camion', false); e.etiqueta('camion', null); e.etiqueta('v', null); e.mostrar('cabina'); e.brilla('cabina', true, 'rojo'); }],
  [10.6, e => e.etiqueta('cabina', 'Escalera rota = caída a DISTINTO NIVEL', 'deuda')],
  [13.6, e => e.etiqueta('v', 'Mismo nivel = tropezar en el piso · Distinto nivel = caer desde arriba', 'ok', [400, 130])]
]
  },
  {
    tipo: 'riesgos',
    titulo: "Atropellos en el muelle",
    texto: [
      "En el muelle de carga anda una <b>carretilla elevadora</b> (el toro). Juan camina por el <b>pasillo pintado</b>, lejos de ella.",
      "Los atropellos pasan cuando alguien <b>se mete en una zona de trabajo prohibida</b>.",
      "Otras causas: usar una <b>máquina que no sirve</b> para ese lugar y <b>dejar el camión sin inmovilizar</b> (sin freno). Todas son causas.",
      "<b>Los que más matan</b> en el transporte: <b>los atropellos</b> y <b>las caídas a distinto nivel</b>."
  ],
    escena: { almacen: ['almacen', 180, { z: 100 }], toro: ['toro', 480], juan: ['juan', 900] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('ATROPELLOS EN EL MUELLE')],
  [0.5, e => { e.mostrar('almacen'); e.mostrar('toro'); e.mostrar('juan'); }],
  [1.2, e => e.mover('toro', 560)],
  [2.4, e => e.etiqueta('z', 'Cada uno en SU ZONA', 'ok', [560, 120])],
  [5.0, e => { e.mover('juan', 700); e.globo('juan', 'Corto por acá, total…'); }],
  [6.8, e => { e.brilla('toro', true, 'rojo'); e.etiqueta('z', 'Meterse en una zona PROHIBIDA = ATROPELLO', 'deuda', [560, 120]); }],
  [10.0, e => { e.globo('juan'); e.mover('juan', 960); e.brilla('toro', false); e.etiqueta('z', 'También: máquina que no sirve o camión sin frenar bien', 'aviso', [560, 120]); }],
  [13.4, e => e.etiqueta('z', 'Los que MÁS MATAN: atropellos y caídas a distinto nivel', 'deuda', [560, 120])]
]
  },
  {
    tipo: 'riesgos',
    titulo: "Los otros peligros",
    texto: [
      "<b>Electricidad:</b> una descarga viene de <b>conexiones mal hechas</b>, <b>cables o enchufes rotos</b> o de que <b>la carga toque los cables de luz</b>. Todas.",
      "<b>Productos tóxicos:</b> te dañan cuando los tocás <b>sin el equipo de protección</b>.",
      "Al camionero le pasan: sobreesfuerzos, caídas, vibraciones, atropellos, golpes con herramientas. <b>Todos.</b>",
      "El que <b>menos</b> pasa: que te <b>aplaste una máquina que vuelca</b>.",
      "Un choque con <b>tu auto particular</b> <b>no</b> es un accidente propio del transporte."
  ],
    escena: { bidon: ['bidon', 260], operarios: ['operarios', 560], maniqui: ['maniqui', 560], camion: ['camion', 870], auto: ['auto', 900] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('OTROS PELIGROS')],
  [0.5, e => { e.mostrar('camion'); e.etiqueta('camion', 'ELECTRICIDAD: cables rotos, malas conexiones o la carga tocando cables de luz', 'aviso'); }],
  [4.4, e => { e.etiqueta('camion', null); e.mostrar('bidon'); e.etiqueta('bidon', 'TÓXICOS: dañan si los tocás SIN el equipo de protección', 'deuda'); }],
  [8.0, e => { e.etiqueta('bidon', null); e.mostrar('operarios'); e.etiqueta('operarios', 'Le pasan TODOS: caídas, golpes, vibraciones, atropellos', 'ok'); }],
  [11.6, e => e.etiqueta('operarios', 'El que MENOS pasa: que te aplaste una máquina que vuelca', 'precio')],
  [15.0, e => { e.ocultar('camion'); e.mostrar('auto'); e.etiqueta('auto', 'Un choque con TU AUTO: NO es del transporte', 'deuda'); }]
]
  },
  {
    tipo: 'riesgos',
    titulo: "Subir y bajar de la cabina",
    texto: [
      "Juan sube y baja de la cabina muchísimas veces por día. Hacerlo mal puede traer <b>lesiones y accidentes</b>.",
      "<b>Cómo se hace:</b> <b>de frente a la cabina</b>, <b>agarrado de los asideros</b> (las manijas) y <b>pisando los escalones</b>.",
      "<b>Nunca saltar.</b> Saltar daña <b>la columna, las rodillas y los tobillos</b>.",
      "Y si saltás después de manejar mucho rato, te podés hacer una <b>distensión muscular</b> (un músculo estirado de más)."
  ],
    escena: { cabina: ['cabina', 700, { alto: 340 }], juan: ['juan', 380] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('SUBIR Y BAJAR DE LA CABINA')],
  [0.5, e => { e.mostrar('cabina'); e.mostrar('juan'); }],
  [1.2, e => e.globo('juan', 'Subo y bajo mil veces por día')],
  [3.4, e => { e.globo('juan'); e.mover('juan', 600); e.etiqueta('m', '1. De FRENTE a la cabina', 'ok', [400, 140]); }],
  [6.0, e => e.etiqueta('m', '2. Agarrado de los ASIDEROS (las manijas)', 'ok', [400, 140])],
  [8.6, e => e.etiqueta('m', '3. Pisando los ESCALONES', 'ok', [400, 140])],
  [11.2, e => { e.brilla('juan', true, 'rojo'); e.etiqueta('m', 'NUNCA SALTAR: columna, rodillas y tobillos', 'deuda', [400, 140]); }],
  [14.4, e => e.etiqueta('m', 'Saltar después de manejar mucho: DISTENSIÓN MUSCULAR', 'deuda', [400, 140])]
]
  },
  {
    tipo: 'riesgos',
    titulo: "Cuánto peso se puede levantar",
    texto: [
      "<b>Manipular cargas</b> = <b>cualquier acción de mover o sujetar</b> una carga.",
      "La ley obliga al empresario a <b>evitar, si se puede, que la carga se mueva a mano</b> (usar máquinas).",
      "Lo que aconseja el <b>INSST</b> (Instituto Nacional de Seguridad y Salud en el Trabajo) para levantar de pie:<br>• <b>25 kg</b> máximo.<br>• <b>15 kg</b> para mujeres, jóvenes y mayores.<br>• <b>40 kg</b> solo si es <b>de vez en cuando</b> y el trabajador <b>está entrenado</b>.",
      "En un día, no más de <b>10.000 kg</b> llevados a mano, si la distancia es de <b>menos de 10 metros</b>.",
      "<b>Cómo levantar del suelo:</b> <b>rodillas dobladas, espalda derecha</b> y la caja <b>pegada al cuerpo</b>."
  ],
    escena: { levantaMal: ['levantaMal', 300], levantaBien: ['levantaBien', 700], caja: ['caja', 950] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('CUÁNTO PESO SE PUEDE LEVANTAR')],
  [0.5, e => { e.mostrar('levantaMal'); e.brilla('levantaMal', true, 'rojo'); e.etiqueta('levantaMal', 'MAL: espalda doblada', 'deuda'); }],
  [3.0, e => { e.mostrar('levantaBien'); e.brilla('levantaBien'); e.etiqueta('levantaBien', 'BIEN: rodillas dobladas, espalda derecha', 'ok'); }],
  [6.4, e => { e.mostrar('caja'); e.etiqueta('caja', '25 kg máximo', 'precio'); }],
  [9.0, e => e.etiqueta('caja', '15 kg: mujeres, jóvenes y mayores', 'aviso')],
  [11.6, e => e.etiqueta('caja', '40 kg: solo de vez en cuando y entrenado', 'deuda')],
  [14.2, e => e.etiqueta('caja', 'En un día: no más de 10.000 kg, a menos de 10 metros', 'grande')]
]
  },
  {
    tipo: 'riesgos',
    titulo: 'Preguntas de examen',
    texto: [],
    escena: { levantaMal: ['levantaMal', 360], dolorEspalda: ['dolorEspalda', 720], camion: ['camion', 980] },
    base: Object.keys({ levantaMal: ['levantaMal', 360], dolorEspalda: ['dolorEspalda', 720], camion: ['camion', 980] }).filter(n => !["almacen", "camion", "reloj", "empresa", "tarjetaCap", "casa", "auto", "ambulancia", "dolorEspalda", "maniqui", "cabina", "juanHerido", "crema"].includes(n)),
    vista: 'general',
    quiz: true,
    linea: []
  }
];


export const PASOS_TRABAJO_EPI = [
  {
    tipo: 'epi',
    titulo: "¿Qué es un EPI?",
    texto: [
      "El jefe le da a Juan una bolsa con cosas: casco, guantes, botas… Son sus <b>EPI</b>.",
      "<b>EPI</b> = <b>Equipo de Protección Individual</b>. Lo que se pone cada uno en el cuerpo para cuidarse.",
      "<b>¿Para qué sirven?</b> Para <b>evitar o achicar las lesiones</b>.",
      "Se pueden ordenar por el <b>riesgo</b> que frenan o por la <b>parte del cuerpo</b> que protegen.",
      "<b>Las 3 categorías:</b><br>• <b>I</b>: riesgos chiquitos.<br>• <b>II</b>: riesgos medios.<br>• <b>III</b>: riesgos que te pueden <b>matar o dejar daño para siempre</b> (por ejemplo, el arnés para no caerte de altura)."
  ],
    escena: { teresa: ['teresa', 280], maniqui: ['maniqui', 640, { alto: 340 }] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('LOS EPI')],
  [0.5, e => e.mostrar('teresa')],
  [1.2, e => { e.mostrar('maniqui'); e.globo('teresa', 'Juan, estos son tus EPI'); }],
  [3.4, e => e.etiqueta('maniqui', 'EPI = Equipo de Protección Individual', 'ok')],
  [6.4, e => e.etiqueta('c', 'Sirven para EVITAR o ACHICAR las lesiones', 'precio', [920, 200])],
  [9.4, e => e.etiqueta('c', 'Categoría I: riesgos chicos · II: riesgos medios', 'aviso', [920, 200])],
  [12.4, e => e.etiqueta('c', 'Categoría III: riesgos que pueden MATAR o dejar daño para siempre', 'deuda', [920, 200])]
]
  },
  {
    tipo: 'epi',
    titulo: "La marca CE y cómo cuidarlos",
    texto: [
      "Un EPI aprobado lleva la marca <b>CE</b> (de Conformidad Europea).",
      "Si es de <b>categoría III</b>, al lado de la CE va un <b>número de cuatro cifras</b>: es el del organismo que lo revisó. Solo la III.",
      "Se vende siempre con un <b>folleto informativo</b> con las <b>instrucciones de uso</b>.",
      "Lo que tiene que hacer Juan con su EPI: <b>usarlo y cuidarlo</b>, <b>guardarlo en su lugar</b> después de usarlo y <b>avisar si está roto</b>. Todo."
  ],
    escena: { poliza: ['poliza', 330, { abajo: 400, alto: 130 }], juan: ['juan', 700] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('LA MARCA CE')],
  [0.5, e => { e.mostrar('poliza'); e.etiqueta('ce', 'CE', 'grande', [330, 200]); }],
  [2.4, e => e.etiqueta('poliza', 'Todo EPI aprobado lleva la marca CE', 'ok')],
  [5.4, e => e.etiqueta('poliza', 'Categoría III: al lado, un número de 4 CIFRAS', 'aviso')],
  [8.4, e => e.etiqueta('poliza', 'Siempre con su FOLLETO de instrucciones', 'precio')],
  [11.4, e => { e.mostrar('juan'); e.globo('juan', 'Lo uso, lo cuido, lo guardo en su lugar y aviso si se rompe'); }]
]
  },
  {
    tipo: 'epi',
    titulo: "Cada parte del cuerpo, su EPI",
    texto: [
      "• <b>Cabeza</b>: el casco.<br>• <b>Oídos</b>: los tapones.<br>• <b>Ojos y cara</b>: las gafas de montura integral (cerradas alrededor del ojo).<br>• <b>Manos y brazos</b>: los guantes (por ejemplo contra el calor).<br>• <b>Pies y piernas</b>: el calzado de protección (por ejemplo contra el frío).",
      "• <b>Piel</b>: las cremas de protección.<br>• <b>Tronco y abdomen</b>: la faja.<br>• <b>Para respirar</b>: mascarillas y equipos de respiración.<br>• <b>Todo el cuerpo</b>: el arnés contra caídas y la ropa de protección.",
      "<b>Truco del examen:</b> si te ofrecen algo que no es del lugar (pantallas faciales para los pies, equipos filtrantes para las piernas), la respuesta es <b>\"todas incorrectas\"</b>."
  ],
    escena: { maniqui: ['maniqui', 560, { alto: 440, abajo: 560 }], crema: ['crema', 900] },
    base: [],
    vista: 'general',
    linea: [
  [0.2, e => e.titulo('CADA PARTE DEL CUERPO, SU EPI')],
  [0.5, e => e.mostrar('maniqui')],
  [1.2, e => e.etiqueta('p1', 'CABEZA: el casco', 'ok', [330, 150])],
  [3.2, e => e.etiqueta('p2', 'OÍDOS: los tapones', 'ok', [800, 175])],
  [5.2, e => e.etiqueta('p3', 'OJOS Y CARA: las gafas', 'ok', [330, 215])],
  [7.2, e => e.etiqueta('p4', 'PARA RESPIRAR: la mascarilla', 'ok', [800, 240])],
  [9.2, e => e.etiqueta('p5', 'TRONCO: la faja', 'aviso', [330, 330])],
  [11.2, e => e.etiqueta('p6', 'MANOS: los guantes', 'aviso', [800, 380])],
  [13.2, e => e.etiqueta('p7', 'PIES: el calzado de protección', 'aviso', [330, 520])],
  [15.2, e => e.etiqueta('p8', 'TODO EL CUERPO: el arnés', 'precio', [800, 470])],
  [17.2, e => { e.mostrar('crema'); e.etiqueta('crema', 'PIEL: la crema', 'precio'); }]
]
  },
  {
    tipo: 'epi',
    titulo: 'Preguntas de examen',
    texto: [],
    escena: { teresa: ['teresa', 280], maniqui: ['maniqui', 640, { alto: 340 }] },
    base: Object.keys({ teresa: ['teresa', 280], maniqui: ['maniqui', 640, { alto: 340 }] }).filter(n => !["almacen", "camion", "reloj", "empresa", "tarjetaCap", "casa", "auto", "ambulancia", "dolorEspalda", "maniqui", "cabina", "juanHerido", "crema"].includes(n)),
    vista: 'general',
    quiz: true,
    linea: []
  }
];
