// ==========================================
// LABORAL: los 5 capítulos
// La historia de Damian Motunga en su empresa. Todo sale de las preguntas oficiales y de la norma vigente.
// ==========================================

export const PASOS_TRABAJO_EMPRESA = [
  {
    "tipo": "empresa",
    "titulo": "Damian firma su contrato",
    "texto": [
      "<b>Damian Motunga</b> entra a trabajar de camionero en una empresa de transporte. Se sienta con el jefe en la oficina y firma el contrato.",
      "<b>¿Qué puede mandar el jefe?</b> La <b>dirección de la empresa</b> (el jefe) puede <b>darle tareas</b>, <b>cambiarle el trabajo</b> y <b>decidir cómo se hace</b>. Las tres cosas.",
      "Damian es un <b>trabajador móvil</b>: trabaja viajando, arriba del camión. También lo son los que viajan en un bus, como el <b>auxiliar de viaje</b>. El de la oficina que sale a hacer un trámite <b>no</b>.",
      "<b>Tiempo de presencia:</b> a veces Damian llega al almacén y tiene que <b>esperar que lo carguen</b>. No maneja ni descarga, pero <b>está a disposición del jefe</b>. Eso es tiempo de presencia: <b>a disposición, sin trabajo efectivo</b>.",
      "No es tiempo de presencia: descansar en casa, manejar ni hacerle mantenimiento al camión (eso es trabajar)."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "contrato",
      "titulo": "El contrato",
      "texto": "Qué manda el jefe y qué es el tiempo de presencia."
    }
  },
  {
    "tipo": "empresa",
    "titulo": "Cómo le pagan a Damian",
    "texto": [
      "Damian le pregunta al jefe: \"¿Me pagan más si hago más kilómetros?\".",
      "<b>La regla:</b> la empresa <b>no puede pagar primas</b> (plata extra) por <b>kilómetros, por carga o por volumen</b> si eso <b>pone en riesgo la seguridad</b> en la carretera. ¿Por qué? Porque te empuja a correr y a no descansar.",
      "Ojo: no está prohibido \"en ningún caso\". Está prohibido <b>si compromete la seguridad</b>. Esa es la respuesta del examen.",
      "<b>Si Damian trabaja para varias empresas</b>, le tiene que pasar a cada jefe las horas que trabajó en las otras, y <b>por escrito</b>. Así nadie lo hace trabajar de más."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "sueldo",
      "titulo": "La plata",
      "texto": "No te pueden pagar para que corras."
    }
  },
  {
    "tipo": "empresa",
    "titulo": "El control en la carretera",
    "texto": [
      "Damian va por la autovía y un agente lo para en un <b>control</b>.",
      "En ese momento, Damian es el <b>representante de la empresa</b>. Por eso tiene que <b>dar los papeles que le pidan</b> sobre ese transporte. No es \"secreto de la empresa\".",
      "<b>¿Quién paga las multas de circulación?</b> (velocidad, semáforo, adelantar mal…). <b>El conductor</b>: el que maneja.",
      "Si el camión es <b>alquilado</b> por una empresa extranjera y el que maneja no es el que lo alquiló, el conductor tiene que mostrar su <b>contrato de trabajo</b>. Es obligatorio.",
      "<b>Certificado de actividades:</b> ya <b>no se pide nunca</b>. Ni por vacaciones ni por baja de enfermedad. Después de vacaciones <b>no hace falta llevar ningún papel</b>.",
      "Lo que Damian sí lleva siempre encima: su <b>tarjeta de cualificación profesional</b> (la tarjeta CAP)."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "control",
      "titulo": "El control",
      "texto": "En el control, Damian representa a la empresa."
    }
  },
  {
    "tipo": "empresa",
    "titulo": "Preguntas de examen",
    "texto": [],
    "sim": "quieto",
    "vista": "perspectiva",
    "quiz": true,
    "figura": {
      "anim": "contrato",
      "titulo": "A practicar",
      "texto": "Las preguntas oficiales de este capítulo."
    }
  }
];

export const PASOS_TRABAJO_PREV = [
  {
    "tipo": "prevencion",
    "titulo": "Prevenir es cosa de los dos",
    "texto": [
      "El primer día, el jefe le muestra el almacén a Damian: pasillos pintados de amarillo, carteles, todos con casco y chaleco. Eso es <b>prevención de riesgos laborales</b>: cuidar que nadie se lastime trabajando.",
      "<b>¿De quién es la obligación?</b> <b>De los dos: del empresario y del trabajador.</b> No solo del jefe, no solo de Damian, no de las autoridades.",
      "<b>¿Para qué sirve?</b> Para <b>evitar los riesgos que se pueden evitar</b> y <b>evaluar (medir) los que no se pueden evitar</b>.",
      "Donde peor se cumple: en las empresas <b>más chiquitas, de 1 a 5 trabajadores</b>."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "prevenir",
      "titulo": "La prevención",
      "texto": "Empresario y trabajador, los dos."
    }
  },
  {
    "tipo": "prevencion",
    "titulo": "Lo que tiene que hacer el jefe",
    "texto": [
      "Las obligaciones del <b>empresario</b>:",
      "• <b>Evitar los riesgos evitables.</b><br>• <b>Adoptar medidas de protección.</b><br>• <b>Formar e informar</b> a los trabajadores de los riesgos de su tarea.<br>• <b>Darles la ropa y los equipos de protección</b>.",
      "Con los equipos de protección, el jefe <b>decide qué puestos los necesitan</b>, <b>dice cuál hace falta</b> y <b>se encarga de mantenerlos</b>.",
      "<b>Truco:</b> si la respuesta es <b>evitar, adoptar o formar</b>, es del <b>jefe</b>. <b>Usar</b> los equipos <b>no</b> es del jefe: es de Damian."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "empresario",
      "titulo": "El jefe",
      "texto": "Evitar, proteger, formar y dar los equipos."
    }
  },
  {
    "tipo": "prevencion",
    "titulo": "Lo que tiene que hacer Damian",
    "texto": [
      "Las obligaciones del <b>trabajador</b> son dos cosas fáciles:",
      "• <b>Usar los equipos de protección.</b><br>• <b>Respetar los métodos de trabajo</b>: hacer las cosas como se las enseñaron.",
      "<b>Truco:</b> si la respuesta es <b>usar o respetar</b>, es de <b>Damian</b>.",
      "Pregunta trampa: \"utilizar las <b>medidas de salud</b>\". Eso <b>no existe</b> como obligación. Es la respuesta que la ley <b>no</b> impone."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "trabajador",
      "titulo": "Damian",
      "texto": "Usar los equipos y respetar los métodos."
    }
  },
  {
    "tipo": "prevencion",
    "titulo": "Cuánto cuesta un accidente",
    "texto": [
      "Un accidente no solo duele: también cuesta mucha plata. Es un <b>gran coste económico</b>.",
      "¿A quién le cuesta? <b>Al trabajador, a la empresa y a toda la sociedad.</b> A todos.",
      "Y prevenir bien trae cosas buenas: trabajadores <b>más motivados</b>, <b>mejores relaciones</b> en la empresa y <b>más contentos</b> en su puesto. Todas."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "coste",
      "titulo": "El coste",
      "texto": "Un accidente nos cuesta a todos."
    }
  },
  {
    "tipo": "prevencion",
    "titulo": "Preguntas de examen",
    "texto": [],
    "sim": "quieto",
    "vista": "perspectiva",
    "quiz": true,
    "figura": {
      "anim": "prevenir",
      "titulo": "A practicar",
      "texto": "Las preguntas oficiales de este capítulo."
    }
  }
];

export const PASOS_TRABAJO_ACC = [
  {
    "tipo": "accidente",
    "titulo": "¿Qué es un accidente de trabajo?",
    "texto": [
      "Un día Damian se corta el brazo descargando y termina en el médico.",
      "<b>Accidente de trabajo</b> = una <b>lesión en el cuerpo</b> que el trabajador <b>sufre</b> por el trabajo. Tiene que haber lesión en el cuerpo. Si solo se rompe una caja, no es accidente de trabajo.",
      "No hace falta contrato fijo, ni máquinas, ni que pase justo en el puesto.",
      "<b>¿Dónde?</b> En el trabajo <b>o in itinere</b>. <b>In itinere</b> es latín y quiere decir \"en el camino\": <b>yendo o volviendo del trabajo</b>.",
      "Si Damian ya tenía una enfermedad y el accidente la <b>empeora</b>, eso también <b>cuenta como accidente de trabajo</b>."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "accidente",
      "titulo": "El accidente",
      "texto": "Lesión en el cuerpo, en el trabajo o en el camino."
    }
  },
  {
    "tipo": "accidente",
    "titulo": "La enfermedad profesional",
    "texto": [
      "La médica le cuenta a Damian que hay otra cosa: la <b>enfermedad profesional</b>.",
      "Es la que te agarrás <b>por el trabajo que hacés</b>. Tiene <b>relación con un tipo de trabajo</b> y la tienen <b>muchos</b> de los que hacen ese trabajo.",
      "Para que sea enfermedad profesional, la tienen que <b>reconocer las autoridades sanitarias</b>. No alcanza con que lo diga el trabajador, ni la mutua, ni la empresa.",
      "Un trabajador puede tener las tres cosas: <b>enfermedad profesional, accidente de trabajo y enfermedad común</b>."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "enfermedad",
      "titulo": "La enfermedad profesional",
      "texto": "La que viene del trabajo. La reconoce Sanidad."
    }
  },
  {
    "tipo": "accidente",
    "titulo": "El accidente sin golpe (no traumático)",
    "texto": [
      "<b>Traumático</b> = con golpe o corte. <b>No traumático</b> = <b>sin golpe</b>.",
      "Accidente <b>no traumático</b> = una <b>enfermedad que aparece de golpe</b> y <b>sin violencia</b>. Por ejemplo: a un compañero de Damian le da un infarto manejando.",
      "Lo que lo marca: <b>aparece o empeora de repente</b>.",
      "Son los que dan las <b>bajas más largas</b>.",
      "De los muertos en el trabajo en España, <b>del 36 al 45 %</b> son por accidentes no traumáticos."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "notraum",
      "titulo": "Sin golpe",
      "texto": "Aparece de repente. Las bajas más largas."
    }
  },
  {
    "tipo": "accidente",
    "titulo": "El transporte, en números",
    "texto": [
      "Lo que más accidentes laborales causa en el transporte: <b>los accidentes de tráfico</b>.",
      "En muertos en el trabajo, el transporte por carretera (y por tubería) está <b>primero</b> de todos los sectores. Los conductores profesionales son los que más mueren: <b>ninguna otra ocupación los supera</b>.",
      "Las bajas en el transporte duran <b>más que la media</b> de los otros trabajos.",
      "<b>¿Por qué pasan los accidentes?</b> Casi nunca por una sola cosa: son la <b>suma de varias causas</b> (herramientas rotas, mala organización, el trabajador que hace algo mal…).",
      "Lo que <b>no</b> causa accidentes: un <b>ritmo de trabajo tranquilo</b>."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "numeros",
      "titulo": "Los números",
      "texto": "El transporte es el primero en muertos."
    }
  },
  {
    "tipo": "accidente",
    "titulo": "Preguntas de examen",
    "texto": [],
    "sim": "quieto",
    "vista": "perspectiva",
    "quiz": true,
    "figura": {
      "anim": "accidente",
      "titulo": "A practicar",
      "texto": "Las preguntas oficiales de este capítulo."
    }
  }
];

export const PASOS_TRABAJO_RIES = [
  {
    "tipo": "riesgos",
    "titulo": "El sobreesfuerzo",
    "texto": [
      "Damian carga cajas todo el día. El accidente que más les pasa a los camioneros es el <b>sobreesfuerzo</b>: <b>forzar el cuerpo de más</b>.",
      "No es \"levantar pesos excesivos\" ni \"manipular mal la carga\": la palabra del examen es <b>sobreesfuerzos</b>. También es el más común entre los que <b>no matan</b>.",
      "Un sobreesfuerzo puede terminar en una <b>hernia de disco</b> (un problema en la columna).",
      "Los riesgos principales del trabajo: <b>al cargar y descargar</b> y al hacer el <b>mantenimiento</b> del camión."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "sobre",
      "titulo": "Sobreesfuerzo",
      "texto": "El accidente más común del camionero."
    }
  },
  {
    "tipo": "riesgos",
    "titulo": "Vibraciones y caídas",
    "texto": [
      "Si los <b>amortiguadores</b> del camión están mal cuidados, Damian tiene <b>vibraciones todo el día</b> en el cuerpo. Eso es <b>exposición continuada a vibraciones</b>.",
      "Las vibraciones pueden traer <b>artrosis en el codo</b>.",
      "Si la <b>escalera</b> del camión o del almacén está rota, el riesgo es la <b>caída a distinto nivel</b>: caerse <b>de arriba hacia abajo</b>.",
      "<b>Mismo nivel</b> = tropezar en el piso. <b>Distinto nivel</b> = caer desde una altura."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "vibra",
      "titulo": "Vibraciones y caídas",
      "texto": "Amortiguadores y escaleras en mal estado."
    }
  },
  {
    "tipo": "riesgos",
    "titulo": "Atropellos en el muelle",
    "texto": [
      "En el muelle de carga anda una <b>carretilla elevadora</b> (el toro). Damian camina por el <b>pasillo pintado</b>, lejos de ella.",
      "Los atropellos pasan cuando alguien <b>se mete en una zona de trabajo prohibida</b>.",
      "Otras causas: usar una <b>máquina que no sirve</b> para ese lugar y <b>dejar el camión sin inmovilizar</b> (sin freno). Todas son causas.",
      "<b>Los que más matan</b> en el transporte: <b>los atropellos</b> y <b>las caídas a distinto nivel</b>."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "muelle",
      "titulo": "El muelle",
      "texto": "Cada uno en su zona."
    }
  },
  {
    "tipo": "riesgos",
    "titulo": "Los otros peligros",
    "texto": [
      "<b>Electricidad:</b> una descarga viene de <b>conexiones mal hechas</b>, <b>cables o enchufes rotos</b> o de que <b>la carga toque los cables de luz</b>. Todas.",
      "<b>Productos tóxicos:</b> te dañan cuando los tocás <b>sin el equipo de protección</b>.",
      "Al camionero le pasan: sobreesfuerzos, caídas, vibraciones, atropellos, golpes con herramientas. <b>Todos.</b>",
      "El que <b>menos</b> pasa: que te <b>aplaste una máquina que vuelca</b>.",
      "Un choque con <b>tu auto particular</b> <b>no</b> es un accidente propio del transporte."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "lista",
      "titulo": "Los peligros",
      "texto": "Electricidad, tóxicos y la lista de accidentes."
    }
  },
  {
    "tipo": "riesgos",
    "titulo": "Subir y bajar de la cabina",
    "texto": [
      "Damian sube y baja de la cabina muchísimas veces por día. Hacerlo mal puede traer <b>lesiones y accidentes</b>.",
      "<b>Cómo se hace:</b> <b>de frente a la cabina</b>, <b>agarrado de los asideros</b> (las manijas) y <b>pisando los escalones</b>.",
      "<b>Nunca saltar.</b> Saltar daña <b>la columna, las rodillas y los tobillos</b>.",
      "Y si saltás después de manejar mucho rato, te podés hacer una <b>distensión muscular</b> (un músculo estirado de más)."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "cabina",
      "titulo": "La cabina",
      "texto": "Asideros y escalones. Nunca saltar."
    }
  },
  {
    "tipo": "riesgos",
    "titulo": "Cuánto peso se puede levantar",
    "texto": [
      "<b>Manipular cargas</b> = <b>cualquier acción de mover o sujetar</b> una carga.",
      "La ley obliga al empresario a <b>evitar, si se puede, que la carga se mueva a mano</b> (usar máquinas).",
      "Lo que aconseja el <b>INSST</b> (Instituto Nacional de Seguridad y Salud en el Trabajo) para levantar de pie:<br>• <b>25 kg</b> máximo.<br>• <b>15 kg</b> para mujeres, jóvenes y mayores.<br>• <b>40 kg</b> solo si es <b>de vez en cuando</b> y el trabajador <b>está entrenado</b>.",
      "En un día, no más de <b>10.000 kg</b> llevados a mano, si la distancia es de <b>menos de 10 metros</b>.",
      "<b>Cómo levantar del suelo:</b> <b>rodillas dobladas, espalda derecha</b> y la caja <b>pegada al cuerpo</b>."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "levantar",
      "titulo": "Levantar peso",
      "texto": "25 kg, 15 kg y 40 kg."
    }
  },
  {
    "tipo": "riesgos",
    "titulo": "Preguntas de examen",
    "texto": [],
    "sim": "quieto",
    "vista": "perspectiva",
    "quiz": true,
    "figura": {
      "anim": "sobre",
      "titulo": "A practicar",
      "texto": "Las preguntas oficiales de este capítulo."
    }
  }
];

export const PASOS_TRABAJO_EPI = [
  {
    "tipo": "epi",
    "titulo": "¿Qué es un EPI?",
    "texto": [
      "El jefe le da a Damian una bolsa con cosas: casco, guantes, botas… Son sus <b>EPI</b>.",
      "<b>EPI</b> = <b>Equipo de Protección Individual</b>. Lo que se pone cada uno en el cuerpo para cuidarse.",
      "<b>¿Para qué sirven?</b> Para <b>evitar o achicar las lesiones</b>.",
      "Se pueden ordenar por el <b>riesgo</b> que frenan o por la <b>parte del cuerpo</b> que protegen.",
      "<b>Las 3 categorías:</b><br>• <b>I</b>: riesgos chiquitos.<br>• <b>II</b>: riesgos medios.<br>• <b>III</b>: riesgos que te pueden <b>matar o dejar daño para siempre</b> (por ejemplo, el arnés para no caerte de altura)."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "epi",
      "titulo": "Los EPI",
      "texto": "Equipo de Protección Individual. Categorías I, II y III."
    }
  },
  {
    "tipo": "epi",
    "titulo": "La marca CE y cómo cuidarlos",
    "texto": [
      "Un EPI aprobado lleva la marca <b>CE</b> (de Conformidad Europea).",
      "Si es de <b>categoría III</b>, al lado de la CE va un <b>número de cuatro cifras</b>: es el del organismo que lo revisó. Solo la III.",
      "Se vende siempre con un <b>folleto informativo</b> con las <b>instrucciones de uso</b>.",
      "Lo que tiene que hacer Damian con su EPI: <b>usarlo y cuidarlo</b>, <b>guardarlo en su lugar</b> después de usarlo y <b>avisar si está roto</b>. Todo."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "ce",
      "titulo": "La marca CE",
      "texto": "CE, y en categoría III, un número de 4 cifras."
    }
  },
  {
    "tipo": "epi",
    "titulo": "Cada parte del cuerpo, su EPI",
    "texto": [
      "• <b>Cabeza</b>: el casco.<br>• <b>Oídos</b>: los tapones.<br>• <b>Ojos y cara</b>: las gafas de montura integral (cerradas alrededor del ojo).<br>• <b>Manos y brazos</b>: los guantes (por ejemplo contra el calor).<br>• <b>Pies y piernas</b>: el calzado de protección (por ejemplo contra el frío).",
      "• <b>Piel</b>: las cremas de protección.<br>• <b>Tronco y abdomen</b>: la faja.<br>• <b>Para respirar</b>: mascarillas y equipos de respiración.<br>• <b>Todo el cuerpo</b>: el arnés contra caídas y la ropa de protección.",
      "<b>Truco del examen:</b> si te ofrecen algo que no es del lugar (pantallas faciales para los pies, equipos filtrantes para las piernas), la respuesta es <b>\"todas incorrectas\"</b>."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "cuerpo",
      "titulo": "De la cabeza a los pies",
      "texto": "Cada EPI protege una parte."
    }
  },
  {
    "tipo": "epi",
    "titulo": "Preguntas de examen",
    "texto": [],
    "sim": "quieto",
    "vista": "perspectiva",
    "quiz": true,
    "figura": {
      "anim": "epi",
      "titulo": "A practicar",
      "texto": "Las preguntas oficiales de este capítulo."
    }
  }
];

