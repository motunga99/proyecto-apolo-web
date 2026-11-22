// ==========================================
// TACÓGRAFO · CAPÍTULO 2: LOS DESCANSOS
// ==========================================

export const PASOS_TACO_DESCANSO = [
  {
    tipo: 'descanso',
    titulo: 'El descanso diario',
    texto: [
      '<b>Normal:</b> <b>11 horas seguidas</b>. Este lo podés hacer todas las veces que quieras.',
      '<b>Normal partido en dos:</b> primero <b>3 horas</b> como mínimo y después <b>9 horas</b> como mínimo, en ese orden. En total, 12 horas.<br><b>Ejemplo:</b> al mediodía parás en un área de servicio, comés tranquilo y dormís la siesta en la litera. Son 3 horas libres: marcás la cama. A la noche te alcanza con 9 horas en vez de 11.<br><b>Ojo:</b> esas 3 horas tienen que ser tuyas, libres. Si te están cargando o esperás atento a que te llamen, no es descanso: son los martillos (otros trabajos) o el cuadrado (disponibilidad).<br><b>Trampa:</b> 4 + 8 no vale, porque el segundo tramo tiene que ser de 9 horas o más.',
      '<b>Reducido:</b> de <b>9 horas</b> a menos de 11. Como mucho <b>3 veces</b> entre un descanso semanal y el siguiente.<br><b>Ejemplo:</b> descansar 10 horas seguidas, o 9 h 30, vale como descanso reducido.',
      '<b>¿Cuándo?</b> Dentro de las <b>24 horas</b> desde que terminó el descanso anterior.',
      '<b>¿En el camión?</b> Sí, si está <b>parado</b> y tiene una <b>litera</b> para cada conductor. Con el camión andando, nunca.'
    ],
    base: [],
    alArrancar: e => e.dia([['c', 4.5, 'CONDUCE'], ['d', 3, '3 h SIESTA'], ['c', 4.5, 'CONDUCE'], ['d', 9, 'DESCANSO 9 h']], 'Descanso diario partido: primero 3 horas, después 9', 24),
    vista: 'dia',
    linea: [
      [0.4, e => e.diaHasta(1)],
      [1.4, e => e.diaHasta(3)],
      [2.6, e => { e.diaHasta(4); e.etiqueta('dia', '3 + 9 = 12 horas, en ese orden', 'ok'); }]
    ]
  },
  {
    tipo: 'descanso',
    titulo: 'Manejar en equipo',
    texto: [
      '<b>Conducción en equipo:</b> cuando hay <b>al menos dos conductores</b> en el camión que se turnan para manejar. La primera hora puede ir uno solo y sigue siendo en equipo.',
      '<b>La ventaja:</b> en vez de 24 horas, tienen <b>30 horas</b> para hacer el descanso diario. En ese plazo, cada uno descansa al menos <b>9 horas</b>.',
      '<b>Ejemplo:</b> Pedro y Juan salen juntos. Mientras uno maneja, el otro va al lado. Dentro de las 30 horas, los dos tienen que parar y descansar 9 horas o más.',
      '<b>Trampa:</b> si en equipo descansan solo 8 horas, es una infracción leve.'
    ],
    base: [],
    alArrancar: e => e.dia([['c', 4.5, 'PEDRO'], ['c', 4.5, 'JUAN'], ['c', 4.5, 'PEDRO'], ['c', 4.5, 'JUAN'], ['d', 9, 'LOS DOS: 9 h'], ['x', 3, '']], 'En equipo: 9 horas de descanso cada 30', 30),
    vista: 'dia',
    linea: [
      [0.4, e => e.diaHasta(4)],
      [1.6, e => e.diaHasta(5)],
      [1.8, e => e.etiqueta('dia', 'Dentro de 30 horas, 9 de descanso', 'ok')]
    ]
  },
  {
    tipo: 'descanso',
    titulo: 'El descanso semanal: 45 horas',
    texto: [
      'Cada semana hay que hacer un descanso largo:',
      '<b>Descanso semanal normal: 45 horas seguidas</b> como mínimo.',
      '<b>Descanso semanal reducido: 24 horas seguidas</b> como mínimo. Menos de 24 no existe.',
      '<b>¿Cuándo?</b> Antes de que se cumplan <b>6 períodos de 24 horas</b>, o sea 6 días, desde que terminó el descanso semanal anterior.<br><b>Ejemplo:</b> empezarlo a los 5 días vale. A los 7 días, no: te pasaste.',
      '<b>Si empieza una semana y termina en la otra</b>, se cuenta en cualquiera de las dos, pero no en las dos a la vez.',
      '<b>Solo en viajeros:</b> en un único viaje discrecional internacional (una excursión), el descanso semanal se puede atrasar hasta 12 días, y después se hacen dos descansos normales, o uno normal y uno reducido. En mercancías, no.'
    ],
    base: [],
    alArrancar: e => e.dia([['j', 24, 'LUN'], ['j', 24, 'MAR'], ['j', 24, 'MIÉ'], ['j', 24, 'JUE'], ['j', 24, 'VIE'], ['j', 24, 'SÁB'], ['d', 45, 'DESCANSO 45 h']], 'Antes de 6 días: descanso semanal de 45 horas', null, 'nada'),
    vista: 'dia',
    linea: [
      [0.3, e => e.diaHasta(1)], [0.7, e => e.diaHasta(2)], [1.1, e => e.diaHasta(3)],
      [1.5, e => e.diaHasta(4)], [1.9, e => e.diaHasta(5)], [2.3, e => e.diaHasta(6)],
      [2.8, e => { e.diaHasta(7); e.etiqueta('dia', 'Normal 45 horas · reducido 24 horas', 'ok'); }]
    ]
  },
  {
    tipo: 'descanso',
    titulo: 'El reducido se devuelve',
    texto: [
      '<b>En dos semanas seguidas</b> tenés que hacer:<br>• dos descansos normales de 45 horas, o<br>• uno normal de 45 horas y uno reducido de 24 horas o más.<br>Por eso no podés hacer dos reducidos seguidos.',
      '<b>Ejemplo de infracción:</b> una semana descansás 35 horas y la siguiente 38. Son dos reducidos seguidos: infracción grave en la segunda semana.',
      '<b>Lo que te faltó para llegar a 45 se devuelve:</b><br>• todo junto, de una sola vez;<br>• <b>antes de que termine la tercera semana</b> siguiente;<br>• pegado a otro descanso de <b>9 horas o más</b>.',
      '<b>Ejemplo:</b> descansás 30 horas una semana. Te faltaron 15 para llegar a 45. Las devolvés de una vez en las 3 semanas siguientes, pegadas a otro descanso.',
      '<b>Una excepción en internacional:</b> si hacés transporte internacional, podés hacer dos reducidos seguidos si los empezás <b>fuera de España y fuera de tu casa</b>. Después los devolvés igual.'
    ],
    base: [],
    alArrancar: e => e.dia([['d', 30, 'SEMANA 1: 30 h'], ['r', 15, 'FALTAN 15'], ['d', 45, 'SEMANA 2: 45 h'], ['d', 15, '+15 DEVUELTAS']], 'El descanso reducido se devuelve', null, 'nada'),
    vista: 'dia',
    linea: [
      [0.4, e => e.diaHasta(1)],
      [1.4, e => e.diaHasta(2)],
      [2.4, e => e.diaHasta(3)],
      [3.4, e => { e.diaHasta(4); e.etiqueta('dia', 'Las 15 horas, de una vez, en 3 semanas', 'ok'); }]
    ]
  },
  {
    tipo: 'descanso',
    titulo: 'Dónde se hace el descanso semanal',
    texto: [
      '<b>El descanso semanal normal de 45 horas nunca se hace en el camión.</b> Tampoco el de más de 45 horas que devuelve horas que faltaron.',
      'Va en un <b>alojamiento apropiado</b>, con <b>baños adecuados</b>, lugar para dormir, y preparado para hombres y mujeres. No hace falta que tenga estrellas.',
      '<b>Volver a casa:</b> la empresa tiene que organizar el trabajo para que, <b>cada 4 semanas</b>, puedas hacer al menos un descanso semanal normal <b>en tu casa</b> o en el centro de la empresa.'
    ],
    base: [],
    vista: 'pictogramas',
    linea: [[0.5, e => e.resaltar('descanso')]]
  },
  {
    tipo: 'descanso',
    titulo: 'En barco o en tren',
    texto: [
      'A veces el camión viaja en un <b>barco</b> o en un <b>tren</b>, y vos con él.',
      '<b>Si tenés litera o cama</b>, el descanso diario normal, o el semanal reducido, se puede cortar para subir o bajar el camión, o para los trámites.',
      '<b>Límite:</b> como mucho <b>2 veces</b>, y en total no más de <b>1 hora</b>.',
      '<b>Si viajás en barco o tren con litera para ir a buscar un camión</b>, ese viaje cuenta como <b>descanso o pausa</b>.'
    ],
    base: [],
    vista: 'pictogramas',
    linea: [[0.5, e => e.resaltar('barco')]]
  },
  {
    tipo: 'descanso',
    titulo: 'Repaso: los descansos',
    texto: [
      '<b>Diario:</b> 11 horas, o 3 + 9 en ese orden. Reducido: 9 horas, 3 veces entre descansos semanales. Dentro de las 24 horas.',
      '<b>En equipo:</b> 9 horas cada 30.',
      '<b>Semanal:</b> normal <b>45 horas</b>, reducido <b>24 horas</b>. Antes de que pasen 6 días.',
      '<b>En dos semanas:</b> dos de 45, o uno de 45 y uno de 24. Lo que falta se devuelve de una vez, en 3 semanas, pegado a un descanso de 9 horas.',
      '<b>Semanal normal:</b> nunca en el camión. A casa cada 4 semanas.',
      '<b>Barco o tren con litera:</b> cortar 2 veces, 1 hora en total.'
    ],
    base: [],
    vista: 'general',
    linea: []
  },
  { tipo: 'descanso', titulo: 'Preguntas oficiales: los descansos', texto: [], base: [], vista: 'general', linea: [], quiz: true }
];
