// ==========================================
// TACÓGRAFO · CAPÍTULO 1: CUÁNTO PODÉS MANEJAR (CONDUCCIÓN Y PAUSAS)
// ==========================================

export const PASOS_TACO_CONDUCCION = [
  {
    tipo: 'conduccion',
    titulo: 'Las reglas de los tiempos',
    texto: [
      'Un conductor cansado es un peligro. Por eso hay reglas que dicen <b>cuánto podés manejar</b> y <b>cuánto tenés que descansar</b>. El tacógrafo es el aparato que lo anota todo para que se pueda controlar.',
      '<b>La norma europea:</b> el <b>Reglamento (CE) 561/2006</b>. Vale en toda la Unión Europea y en el Espacio Económico Europeo (la UE más Noruega, Islandia y Liechtenstein).<br><b>Ejemplo:</b> un camión de 25 toneladas que va de España a Noruega usa el Reglamento 561/2006.',
      '<b>¿Qué es el AETR?</b> Es el <b>Acuerdo Europeo sobre el Trabajo de los Transportes por Carretera</b>: un acuerdo con reglas de tiempos muy parecidas, firmado por países de Europa y de alrededor que <b>no son de la UE</b>, como Rusia, Turquía, Ucrania o Serbia.<br>Si el viaje pasa por uno de esos países, se aplica el AETR en todo el viaje.<br><b>Ejemplo:</b> un camión español de 25 toneladas que va de España a Rusia usa el AETR.',
      '<b>Palabras que hay que saber:</b><br>• <b>Semana:</b> del lunes a las 00:00 al domingo a las 24:00.<br>• <b>Tiempo diario de conducción:</b> todo lo que manejaste entre el final de un descanso diario y el comienzo del siguiente (o de un descanso semanal). No es de 0 a 24 horas.<br>• <b>Pausa:</b> un rato en el que no manejás ni hacés otro trabajo, solo para reponerte.<br>• <b>Descanso:</b> tiempo seguido en el que hacés lo que quieras con tu tiempo.',
      '<b>Las horas fuera de la UE también cuentan.</b> Si manejaste 3 horas en Marruecos, se suman a tu conducción del día y de la semana.'
    ],
    base: [],
    alArrancar: e => e.dia([['d', 9, 'DESCANSO'], ['c', 4.5, 'CONDUCE'], ['p', 0.75, ''], ['c', 4.5, 'CONDUCE'], ['d', 5.25, 'DESCANSO']], 'Tiempo diario de conducción: entre dos descansos', 24),
    vista: 'dia',
    linea: [
      [0.4, e => e.diaHasta(1)],
      [1.2, e => e.diaHasta(4)],
      [2.4, e => e.diaHasta(5)],
      [2.6, e => e.etiqueta('dia', 'Lo que manejás entre un descanso y el otro', 'ok')]
    ]
  },
  {
    tipo: 'conduccion',
    titulo: '¿Cuánto podés manejar en un día?',
    texto: [
      '<b>Regla:</b> como mucho <b>9 horas</b> de conducción por día.',
      '<b>Excepción:</b> <b>2 veces por semana</b> podés llegar a <b>10 horas</b>. Nunca más de 10, en ningún caso.',
      '<b>Ejemplo:</b> el lunes manejás 10 horas y el miércoles 10. Ya usaste las dos veces: el resto de esa semana, máximo 9 por día.',
      '<b>Trampa:</b> pasarse un poquito también cuenta. Si un día hiciste 9 h 15 y otro 9 h 20, ya gastaste las dos veces. No podés pasar de 9 ni una vez más esa semana.',
      '<b>¿Cómo se cuenta si venís de un descanso semanal?</b> Se suma todo lo que manejás desde que termina el descanso semanal hasta el siguiente descanso diario.',
      'Hacer 10 horas más de dos veces en la semana es una infracción.'
    ],
    base: [],
    alArrancar: e => e.dia([['c', 4.5, 'CONDUCE 4 h 30'], ['p', 0.75, 'PAUSA'], ['c', 4.5, 'CONDUCE 4 h 30'], ['d', 11, 'DESCANSO DIARIO']], 'Un día normal: 9 horas de conducción', 24),
    vista: 'dia',
    linea: [
      [0.5, e => e.diaHasta(1)],
      [1.5, e => e.diaHasta(2)],
      [2.3, e => e.diaHasta(3)],
      [3.3, e => e.diaHasta(4)],
      [3.6, e => e.etiqueta('dia', '4 h 30 + 4 h 30 = 9 horas', 'ok')]
    ]
  },
  {
    tipo: 'conduccion',
    titulo: 'Por semana y cada dos semanas',
    texto: [
      '<b>Por semana:</b> como mucho <b>56 horas</b> de conducción.',
      '<b>En dos semanas seguidas:</b> como mucho <b>90 horas</b> sumadas.',
      '<b>Ejemplo:</b> si esta semana manejaste 56 horas, la que viene solo podés manejar 34, porque 56 + 34 = 90.',
      '<b>¿Por qué existen las dos reglas?</b> Para que no hagas 56 horas todas las semanas. Una semana fuerte obliga a que la siguiente sea más tranquila.'
    ],
    base: [],
    alArrancar: e => e.dia([['c', 56, 'SEMANA 1: 56 h'], ['c', 34, 'SEMANA 2: 34 h']], 'Dos semanas seguidas: como mucho 90 horas', null, 'nada'),
    vista: 'dia',
    linea: [
      [0.6, e => e.diaHasta(1)],
      [2.0, e => e.diaHasta(2)],
      [2.4, e => e.etiqueta('dia', '56 + 34 = 90 horas', 'ok')]
    ]
  },
  {
    tipo: 'conduccion',
    titulo: 'La pausa',
    texto: [
      '<b>Regla:</b> después de <b>4 horas y media</b> de conducción, una <b>pausa de 45 minutos</b>. Es lo máximo que podés manejar seguido.',
      '<b>Se puede partir en dos:</b> una de <b>15 minutos</b> como mínimo y después otra de <b>30 minutos</b> como mínimo, repartidas dentro de esas 4 horas y media. Primero la de 15 y después la de 30, en ese orden.',
      '<b>Bien:</b> manejás 2 horas, pausa de 15 min, manejás 2 h 30, pausa de 30 min. Correcto.',
      '<b>Mal:</b> manejás 3 horas, pausa de 30 min y otras 3 horas. En 6 horas de manejo hiciste solo 30 minutos de pausa.',
      '<b>Mal:</b> manejar 5 h 15 sin parar es una infracción grave.',
      '<b>Si cambiás de camión</b> con digital, el nuevo tacógrafo sigue sumando tu conducción, porque la lee de tu tarjeta. Así te avisa igual cuándo toca la pausa.'
    ],
    base: [],
    alArrancar: e => e.dia([['c', 2, 'CONDUCE 2 h'], ['p', 0.25, '15'], ['c', 2.5, 'CONDUCE 2 h 30'], ['p', 0.5, 'PAUSA 30'], ['c', 3, 'SIGUE']], 'La pausa partida: 15 + 30 minutos'),
    vista: 'dia',
    linea: [
      [0.5, e => e.diaHasta(1)],
      [1.5, e => { e.diaHasta(2); e.etiqueta('dia', 'Primero 15 minutos…', 'globo'); }],
      [2.6, e => e.diaHasta(3)],
      [3.6, e => { e.diaHasta(4); e.etiqueta('dia', '…después 30 minutos', 'globo'); }],
      [4.6, e => e.diaHasta(5)]
    ]
  },
  {
    tipo: 'conduccion',
    titulo: 'Pasarse para llegar a casa',
    texto: [
      'A veces te falta poco para llegar y se te acaba el tiempo. La norma permite pasarse, si no se pone en peligro la seguridad:',
      '<b>Hasta 1 hora más</b> de conducción, del día o de la semana, para llegar a <b>tu casa</b> o al <b>centro de la empresa</b> a hacer el descanso semanal.',
      '<b>Hasta 2 horas más</b> si es para hacer allá un <b>descanso semanal normal</b>, el de 45 horas. En este caso, antes de esas horas de más tenés que hacer una <b>pausa de 30 minutos</b>.',
      '<b>Ejemplo:</b> ya hiciste tus 9 horas y estás a una hora y media de casa, donde vas a hacer el descanso semanal de 45 horas. Parás 30 minutos y seguís hasta casa.'
    ],
    base: [],
    alArrancar: e => e.dia([['c', 4.5, 'CONDUCE 4 h 30'], ['p', 0.75, 'PAUSA'], ['c', 4.5, 'CONDUCE 4 h 30'], ['p', 0.5, '30'], ['c', 1.5, '+1 h 30'], ['d', 12.25, 'EN CASA: SEMANAL']], 'Pasarse para llegar a casa', 24),
    vista: 'dia',
    linea: [
      [0.4, e => e.diaHasta(3)],
      [1.4, e => e.diaHasta(4)],
      [2.2, e => e.diaHasta(5)],
      [3.0, e => e.diaHasta(6)],
      [3.2, e => e.etiqueta('dia', 'Hasta 2 horas más, con pausa de 30 minutos antes', 'precio')]
    ]
  },
  {
    tipo: 'conduccion',
    titulo: 'La empresa también responde',
    texto: [
      '<b>La empresa</b> tiene que organizar el trabajo para que sus conductores <b>cumplan los tiempos</b>, y tiene que <b>controlar</b> que los cumplan.',
      '<b>Prohibido:</b> pagar extras o subir el sueldo por kilómetros recorridos o por carga llevada si eso empuja al conductor a no respetar los tiempos.',
      '<b>No solo la empresa:</b> también responden los que contratan el transporte: los que mandan la carga (expedidores), los intermediarios (transitarios), los operadores turísticos, los contratistas y subcontratistas, y las agencias que ponen conductores.',
      '<b>Si trabajás para dos empresas de transporte</b>, tenés que informar a las dos de lo que hacés, para que puedan cumplir las normas.',
      '<b>Al planificar la ruta</b> hay que tener en cuenta que no te pases de los tiempos de conducción.'
    ],
    base: [],
    vista: 'general',
    linea: []
  },
  {
    tipo: 'conduccion',
    titulo: 'Repaso: conducción y pausas',
    texto: [
      '<b>Norma:</b> Reglamento (CE) 561/2006 en la UE y el EEE. Con países de afuera que lo firmaron (Rusia, Turquía…): AETR.',
      '<b>Por día:</b> 9 horas. Dos veces por semana, 10. Nunca más de 10.',
      '<b>Por semana:</b> 56 horas. <b>En dos semanas:</b> 90.',
      '<b>Pausa:</b> 45 minutos cada 4 h 30, o 15 + 30 en ese orden.',
      '<b>Para llegar a casa:</b> 1 hora más; 2 horas más para el descanso semanal de 45 horas, con pausa de 30 antes.',
      '<b>Las horas fuera de la UE</b> también cuentan.'
    ],
    base: [],
    vista: 'general',
    linea: []
  },
  { tipo: 'conduccion', titulo: 'Preguntas oficiales: conducción y pausas', texto: [], base: [], vista: 'general', linea: [], quiz: true }
];
