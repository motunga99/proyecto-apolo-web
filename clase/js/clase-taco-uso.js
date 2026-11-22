// ==========================================
// TACÓGRAFO · CAPÍTULO 8: USAR EL DIGITAL (PICTOGRAMAS, TARJETA, MODOS, IMPRIMIR)
// ==========================================

export const PASOS_TACO_USO = [
  {
    tipo: 'uso',
    titulo: 'Los pictogramas',
    texto: [
      'El tacógrafo habla con dibujitos que se llaman <b>pictogramas</b>. Aparecen en la pantalla y en los papeles impresos, y se pueden <b>combinar</b> entre sí para decir más cosas.<br><b>Ejemplo:</b> conductor + tarjeta = la tarjeta del conductor.',
      'Hay cuatro que tenés que conocer sí o sí, porque son las <b>4 actividades</b>:',
      '<b>Volante: conducción.</b> No lo elegís vos: lo marca solo cuando el camión anda, para el de la ranura 1.',
      '<b>Martillos cruzados: otros trabajos.</b> Todo trabajo que no es manejar: cargar, descargar, limpiar o revisar el camión, hacer trámites para la empresa, o manejar un vehículo que no lleva tacógrafo.',
      '<b>Cuadrado con una raya: disponibilidad.</b> Estás esperando, sin trabajar, pero a disposición: en una frontera o un turno de carga, sabiendo cuánto va a durar; o de acompañante en conducción en equipo.',
      '<b>Cama: pausa y descanso.</b> Las pausas y los descansos. También el viaje en barco o tren con litera.'
    ],
    base: [],
    vista: 'pictogramas',
    linea: [
      [0.6, e => e.resaltar('conduccion')],
      [1.8, e => e.resaltar('trabajo')],
      [3.0, e => e.resaltar('disponibilidad')],
      [4.2, e => e.resaltar('descanso')]
    ]
  },
  {
    tipo: 'uso',
    titulo: 'Meter la tarjeta',
    texto: [
      '<b>¿Cuándo?</b> Cuando <b>te hacés cargo del camión</b>, antes de manejar. Todos los días que manejes.',
      '<b>En qué ranura:</b> la <b>1</b> para el que maneja, la <b>2</b> para el segundo conductor. En equipo, cada uno revisa que su tarjeta esté en su ranura.',
      '<b>Al meterla</b>, la pantalla muestra tu <b>nombre</b>. Si la lectura falla, lo intenta 3 veces y después avisa.',
      '<b>Entradas manuales:</b> justo al meter la tarjeta, el tacógrafo te deja cargar a mano lo que hiciste desde que la sacaste. Es el único momento para hacerlo.<br><b>Ejemplo:</b> si antes manejaste un vehículo que no lleva tacógrafo, eso lo cargás como <b>otros trabajos</b> (martillos).',
      '<b>Al empezar y al terminar el día</b> indicás el país; en España, también la comunidad autónoma. En el tacógrafo de la derecha: contestá SÍ con OK, elegí el país con las flechas y confirmá.',
      '<b>El contador:</b> abajo en la pantalla va la conducción seguida contra el máximo de 4h30. A las 4h15 avisa, y al llegar a 4h30 pide la pausa. Meté tu tarjeta, poné el camión andando y miralo. El reloj va rápido: a 60x, 1 segundo es 1 minuto; a 300x, 5 minutos.',
      '<b>Trampa:</b> meter la tarjeta con el camión andando se puede, pero queda un <b>incidente</b>. Probalo en el tacógrafo.'
    ],
    base: [],
    alArrancar: e => e.reiniciarAparato(),
    vista: 'aparato',
    linea: [
      [0.6, e => e.insertar('conductor', 1, true)],
      [1.2, e => e.etiqueta('ranura1', 'Ranura 1: el que maneja', 'ok')],
      [2.6, e => e.etiqueta('lcd', 'Te pregunta: ¿entrada manual? Probá OK y las flechas', 'globo')]
    ]
  },
  {
    tipo: 'uso',
    titulo: 'Andando y parado: qué marca solo',
    texto: [
      '<b>Camión andando:</b> marca solo <b>conducción</b> (volante) para el de la ranura 1, y <b>disponibilidad</b> (cuadrado) para el de la ranura 2.',
      '<b>Camión parado:</b> marca solo <b>otros trabajos</b> (martillos) para el de la ranura 1.',
      '<b>Los botones 1 y 2:</b> con el camión parado, cambiás tu actividad apretando el botón de tu ranura: martillos, cuadrado o cama.<br><b>Ejemplo:</b> llegás al cliente y paras: marca martillos y descargás. Terminás y vas a comer: apretás el 1 hasta la cama.',
      '<b>Trampa:</b> el segundo conductor no puede marcar descanso con el camión andando. Es mal uso del selector, falta muy grave.',
      '<b>Sacar la tarjeta:</b> solo con el camión <b>parado</b>, apretando el <b>botón de expulsión</b>. Andando no sale. Al terminar la jornada la podés sacar: solo es obligatorio tenerla puesta mientras trabajás con el camión.'
    ],
    base: [],
    vista: 'aparato',
    linea: [
      [0.4, e => { e.insertar('conductor', 1); }],
      [1.4, e => e.andar(true)],
      [2.0, e => e.etiqueta('lcd', 'Andando: volante solo', 'ok')],
      [5.0, e => { e.andar(false); e.etiqueta('lcd', 'Parado: martillos', 'ok'); }],
      [7.5, e => { e.actividad(1, 'descanso'); e.etiqueta('b1', 'Botón 1: elegís la cama', 'globo'); }]
    ]
  },
  {
    tipo: 'uso',
    titulo: 'Dos tarjetas y los 4 modos',
    texto: [
      'El tacógrafo tiene <b>4 modos de funcionamiento</b>. Cambia de modo solo, según las tarjetas que tenga puestas, y lo muestra en la pantalla con un pictograma:',
      '<b>Operativo:</b> sin tarjeta, o con una o <b>dos tarjetas de conductor</b>. Es el modo de trabajo normal.<br><b>Ejemplo:</b> Pedro en la ranura 1 y Juan en la 2: modo operativo.',
      '<b>Empresa:</b> con la tarjeta de <b>empresa</b>, aunque haya una de conductor puesta.',
      '<b>Control:</b> cuando el agente mete su tarjeta de <b>control</b> en un control en carretera.',
      '<b>Calibrado:</b> con la tarjeta de <b>taller</b>.',
      'Mirá cómo cambia la pantalla según la tarjeta que entra.'
    ],
    base: [],
    alArrancar: e => e.reiniciarAparato(),
    vista: 'aparato',
    linea: [
      [0.5, e => e.insertar('conductor', 1)],
      [1.6, e => e.pantalla('MODO OPERATIVO', 2)],
      [2.6, e => e.insertar('empresa', 2)],
      [4.6, e => e.insertar('control', 2)],
      [6.6, e => e.insertar('taller', 2)]
    ]
  },
  {
    tipo: 'uso',
    titulo: 'Sin tarjeta, incidentes y fallos',
    texto: [
      '<b>Si tu tarjeta se rompe, anda mal, se pierde o te la roban</b>, podés manejar sin ella hasta <b>15 días naturales</b>, o más si es para volver el camión a la empresa.',
      'En ese caso <b>imprimís</b> un papel al empezar y otro al terminar el viaje. En los dos ponés tus datos para identificarte (nombre, número de tarjeta o de permiso) y <b>firmás</b>.',
      '<b>Incidente</b> (pictograma del triángulo con "!"): algo raro que puede ser un <b>intento de trampa</b>. Por ejemplo: abrir la carcasa del aparato, poner la tarjeta con el camión andando, un sensor desconectado, o cambiar de camión cuando el segundo tiene la hora atrasada (se superponen las horas).',
      '<b>Fallo</b> (triángulo con "×"): algo que <b>funciona mal</b>, como la impresora o una descarga de datos cortada.',
      'El tacógrafo <b>avisa</b> con una señal y un <b>mensaje en la pantalla</b>. Una tarjeta que no es válida no deja incidente: solo dice que no vale.',
      '<b>Si se rompe el tacógrafo:</b> anotás tus actividades en una hoja y se repara tan pronto como se pueda. Si el camión no vuelve a la empresa en <b>una semana</b>, se repara en el camino.'
    ],
    base: [],
    alArrancar: e => e.reiniciarAparato(),
    vista: 'aparato',
    linea: [
      [0.6, e => e.andar(true)],
      [1.4, e => e.insertar('conductor', 1)],
      [2.0, e => e.etiqueta('lcd', 'Tarjeta puesta andando: incidente', 'deuda')]
    ]
  },
  {
    tipo: 'uso',
    titulo: 'Imprimir y descargar',
    texto: [
      '<b>Imprimir:</b> se imprime lo del aparato y lo de la tarjeta (si está puesta). Hay al menos <b>6 tipos de impresiones</b>: las actividades del día de la tarjeta y del aparato, los incidentes y fallos de cada uno, los <b>datos técnicos</b> y los <b>excesos de velocidad</b>.',
      '<b>Cómo es el papel:</b> arriba de todo, la <b>fecha y hora UTC</b> de la impresión; debajo, el <b>pictograma</b> del tipo de impresión. Las actividades salen por días, de <b>0 a 24 horas</b>, en <b>hora UTC</b>. Apretá «Imprimir 24 h» arriba del tacógrafo, o entrá por OK → IMPRESIÓN, para verlo.',
      '<b>Trampa:</b> no existe la impresión semanal.',
      '<b>Descargar</b> es pasar los datos a un ordenador:<br>• los del aparato, al menos cada <b>90 días</b>;<br>• los de tu tarjeta, al menos cada <b>28 días</b> con actividad. Se descargan desde el tacógrafo con la tarjeta puesta, o con un lector de tarjetas.',
      '<b>Tu tarjeta también se descarga</b> cuando te vas de la empresa, cuando vence, y en una inspección. La empresa puede ver los datos de sus tacógrafos en todo momento, y las autoridades también.',
      '<b>En un control mostrás:</b> la tarjeta, las impresiones y anotaciones que hayas hecho, y los discos de los <b>56 días anteriores</b> si en ese tiempo manejaste un camión con analógico.'
    ],
    base: [],
    alArrancar: e => e.andar(false),
    vista: 'aparato',
    linea: [
      [0.5, e => e.insertar('conductor', 1)],
      [1.6, e => e.imprimir()],
      [2.2, e => e.etiqueta('impresora', 'Fecha y hora UTC arriba', 'ok')]
    ]
  },
  {
    tipo: 'uso',
    titulo: 'Repaso: usar el digital',
    texto: [
      '<b>Pictogramas:</b> volante conducción, martillos otros trabajos, cuadrado disponibilidad, cama pausa y descanso. Se combinan.',
      '<b>Tarjeta:</b> al hacerte cargo del camión. Ranura 1 el que maneja. Entradas manuales al meterla. Sacarla solo parado.',
      '<b>Solo:</b> andando, volante (1) y disponibilidad (2). Parado, martillos.',
      '<b>Modos:</b> operativo (con 1 o 2 de conductor), empresa, control, calibrado.',
      '<b>Sin tarjeta:</b> 15 días, imprimir al empezar y al terminar, y firmar.',
      '<b>Imprimir:</b> en UTC, de 0 a 24. <b>Descargar:</b> aparato 90 días, tarjeta 28.'
    ],
    base: [],
    vista: 'pictogramas',
    linea: []
  },
  { tipo: 'uso', titulo: 'Preguntas oficiales: usar el digital', texto: [], base: [], vista: 'aparato', linea: [], quiz: true }
];
