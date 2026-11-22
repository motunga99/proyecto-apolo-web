// ==========================================
// TACÓGRAFO · CAPÍTULO 3: EL TIEMPO DE TRABAJO (NORMA LABORAL ESPAÑOLA)
// ==========================================

export const PASOS_TACO_TRABAJO = [
  {
    tipo: 'trabajo',
    titulo: 'Trabajo efectivo y tiempo de presencia',
    texto: [
      'Además de las reglas europeas de conducción, en España hay una <b>norma laboral</b> que cuenta <b>todo</b> tu trabajo, no solo el manejo. Para los asalariados hay dos clases de tiempo:',
      '<b>Trabajo efectivo:</b> cuando estás trabajando de verdad.<br>• manejar;<br>• <b>cargar y descargar</b>;<br>• <b>limpiar y hacer el mantenimiento</b> del camión;<br>• en autobuses, ayudar a los pasajeros a subir y bajar.',
      '<b>Tiempo de presencia:</b> cuando esperás, sin trabajar, pero a disposición de la empresa.<br>• esperar en una <b>frontera</b> o por una <b>prohibición de circular</b>;<br>• ir con el camión en un <b>barco</b>;<br>• las <b>2 primeras horas</b> de espera para cargar o descargar;<br>• ir de acompañante en conducción en equipo.<br>En los casos de esperas, siempre que te hayan dicho antes cuánto van a durar. En exámenes viejos este tiempo aparece como "tiempo de disponibilidad".',
      '<b>Espera de carga o descarga:</b> si pasa de 2 horas y no sabías de antemano cuánto iba a durar, ese tiempo es <b>trabajo efectivo</b>.',
      '<b>Ir de tu casa al trabajo y volver</b> no cuenta en la jornada.',
      '<b>En el tacógrafo:</b> el trabajo efectivo que no es manejar se marca con los <b>martillos</b> (otros trabajos) y las esperas con el <b>cuadrado con raya</b> (disponibilidad).'
    ],
    base: [],
    alArrancar: e => e.dia([['t', 1, 'CARGA'], ['c', 4.5, 'CONDUCE'], ['p', 0.75, ''], ['c', 3, 'CONDUCE'], ['x', 2, 'ESPERA'], ['t', 1, 'DESCARGA']], 'TRABAJO EFECTIVO Y TIEMPO DE PRESENCIA'),
    vista: 'general',
    linea: [
      [0.4, e => { e.diaHasta(1); e.etiqueta('dia', 'Cargar es trabajo efectivo', 'globo'); }],
      [1.4, e => e.diaHasta(3)],
      [2.6, e => e.diaHasta(4)],
      [3.4, e => { e.diaHasta(5); e.etiqueta('dia', 'Esperar 2 horas para descargar: tiempo de presencia', 'precio'); }],
      [4.6, e => e.diaHasta(6)]
    ]
  },
  {
    tipo: 'trabajo',
    titulo: 'Los límites de la jornada',
    texto: [
      '<b>Por día:</b> la jornada no puede pasar de <b>12 horas</b> de trabajo efectivo.',
      '<b>Por semana:</b> como mucho <b>60 horas</b> de trabajo efectivo. Nunca más.',
      '<b>De noche:</b> si trabajás de noche sin ser trabajador nocturno, la jornada no pasa de <b>10 horas</b> cada 24.',
      '<b>Paradas obligatorias:</b><br>• si la jornada pasa de <b>6 horas</b>: parada de <b>30 minutos</b> como mínimo;<br>• si pasa de <b>9 horas</b>: <b>45 minutos</b>.',
      '<b>En la ciudad:</b> los conductores asalariados de reparto urbano descansan al menos <b>10 horas</b> entre una jornada y la siguiente.',
      '<b>Dos empresas:</b> si trabajás para dos, se <b>suman</b> las horas de las dos.',
      '<b>Registro:</b> la empresa anota el tiempo de trabajo de sus conductores y lo guarda <b>3 años</b>.'
    ],
    base: [],
    alArrancar: e => e.dia([['t', 12, 'JORNADA: COMO MUCHO 12 h'], ['d', 12, '']], 'POR DÍA 12 HORAS · POR SEMANA 60', 24),
    vista: 'general',
    linea: [
      [0.6, e => e.diaHasta(1)],
      [1.2, e => e.etiqueta('dia', 'La empresa guarda el registro 3 años', 'precio')]
    ]
  },
  {
    tipo: 'trabajo',
    titulo: 'Los autónomos',
    texto: [
      'Los <b>autónomos</b> tienen su propia norma de tiempo de trabajo.',
      '<b>¿A quién se aplica?</b> A los autónomos que están dentro del Reglamento 561/2006 o del AETR. No se aplica a los que están fuera.<br>También se aplica al autónomo que trabaja siempre para el mismo cliente, aunque pueda trabajar para otros.',
      '<b>Dos clases de tiempo:</b> tiempo de <b>trabajo</b> y tiempo de <b>disponibilidad</b>.',
      '<b>Espera para cargar o descargar:</b> las <b>4 primeras horas</b> son tiempo de disponibilidad.',
      '<b>Trabajo nocturno:</b> el que se hace entre las <b>00:00 y las 04:00</b>.',
      '<b>Descansos:</b> los del Reglamento 561/2006 o del AETR, según el caso.',
      '<b>Registro:</b> el autónomo anota <b>cada día</b> su tiempo de trabajo y guarda esos registros <b>2 años</b>.'
    ],
    base: [],
    vista: 'pictogramas',
    linea: [[0.5, e => e.resaltar('disponibilidad')]]
  },
  {
    tipo: 'trabajo',
    titulo: 'Repaso: tiempo de trabajo',
    texto: [
      '<b>Trabajo efectivo:</b> manejar, cargar, descargar, limpiar, mantenimiento.',
      '<b>Tiempo de presencia:</b> esperas conocidas de antemano (frontera, barco, prohibición de circular), 2 primeras horas de espera de carga, acompañante en equipo.',
      '<b>Límites:</b> 12 horas por día, 60 por semana, 10 si es de noche.',
      '<b>Paradas:</b> 30 minutos si pasa de 6 horas; 45 si pasa de 9.',
      '<b>Dos empresas:</b> se suman. <b>Registro:</b> la empresa, 3 años; el autónomo, 2 años.',
      '<b>Autónomos:</b> nocturno de 00:00 a 04:00; 4 primeras horas de espera, disponibilidad.'
    ],
    base: [],
    vista: 'general',
    linea: []
  },
  {
    tipo: 'trabajo',
    titulo: 'Preguntas oficiales: tiempo de trabajo',
    texto: [],
    base: [],
    vista: 'general',
    linea: [],
    quiz: true
  }
];
