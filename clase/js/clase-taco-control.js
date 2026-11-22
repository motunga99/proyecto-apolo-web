// ==========================================
// TACÓGRAFO · CAPÍTULO 9: REVISIONES, CONTROLES Y SANCIONES
// ==========================================

export const PASOS_TACO_CONTROL = [
  {
    tipo: 'control',
    titulo: 'Homologado y revisado',
    texto: [
      '<b>Homologado:</b> todo tacógrafo tiene que estar aprobado por un país de la Unión Europea. Usar uno no homologado es como no tener tacógrafo.',
      '<b>La marca de homologación:</b> una <b>"e" minúscula</b> y el <b>número del país</b> que lo aprobó, dentro de un rectángulo, con el número de homologación al lado. Por el número sabés qué país lo aprobó. Se aprueba en un solo país.',
      '<b>Dos placas:</b><br>• la <b>placa descriptiva</b>: la pone el fabricante <b>en el aparato</b>, con sus datos y la marca de homologación;<br>• la <b>placa de instalación</b>: va en el tacógrafo o al lado, a la vista.',
      '<b>Revisión:</b> en un <b>taller autorizado</b>, al menos <b>cada 2 años</b>. Se revisan los precintos y la instalación. Si la hora UTC tiene más de 20 minutos de diferencia, también toca revisión. En el analógico, además, se controlan los errores de medición al menos cada 6 años.',
      '<b>¿Quién responde</b> de que funcione y se use bien? La empresa y el conductor, los dos.'
    ],
    base: [],
    vista: 'placas',
    linea: [[0.5, e => e.resaltar('marca')], [2.0, e => e.resaltar('revision')]]
  },
  {
    tipo: 'control',
    titulo: 'El control en la ruta',
    texto: [
      '<b>Tenés que dejar</b> que revisen el tacógrafo y entregar los papeles que te pidan. Si te negás, es <b>obstrucción a la inspección</b>, falta muy grave.',
      '<b>Si sospechan una trampa</b> en el tacógrafo, te pueden mandar a un <b>taller autorizado</b>, no a uno cualquiera. Vos manejás el camión hasta ahí, acompañado por los agentes.',
      '<b>Inmovilizar</b> es dejar el camión parado. Lo hacen, por ejemplo, si falta la autorización de transporte o si encuentran el tacógrafo o el limitador manipulados.',
      '<b>Por tiempos:</b> si te pasaste de conducción o te faltó descanso de forma grave, te denuncian y el camión queda parado <b>hasta que hagas el descanso</b>. Si fue por la pausa, hasta que hagas la pausa.<br><b>Ejemplo:</b> manejaste 14 horas. Con 45 minutos de pausa no alcanza: tenés que hacer el descanso.',
      '<b>Mientras está parado</b>, cuidar el camión le toca a la empresa. Tu tarjeta de conductor no te la quitan.',
      '<b>Los agentes no ponen la multa</b> ahí mismo: denuncian y la multa viene después.'
    ],
    base: [],
    alArrancar: e => e.reiniciarAparato(),
    vista: 'aparato',
    linea: [
      [0.5, e => e.insertar('conductor', 1)],
      [1.6, e => e.insertar('control', 2)],
      [2.4, e => e.etiqueta('ranura2', 'El agente mete su tarjeta de control', 'globo')]
    ]
  },
  {
    tipo: 'control',
    titulo: 'Las trampas al tacógrafo',
    texto: [
      '<b>Manipular</b> es cambiar cómo funciona el tacógrafo para que anote algo que no es verdad.<br><b>Ejemplos:</b> poner un aparato que hace marcar descanso cuando estás manejando, o andar con la tapa del analógico abierta para que no grabe.',
      'Es <b>falta muy grave</b>, aunque en el momento del control el aparato de trampa esté apagado.',
      '<b>¿Quién responde?</b> La empresa, el que hizo la trampa y todos los que ayudaron a instalarla o venderla. El conductor que participó pierde puntos del carnet.',
      '<b>Otras faltas muy graves:</b><br>• no tener tacógrafo, o tener uno analógico cuando debería ser digital;<br>• no poner la tarjeta o el disco;<br>• usar mal el selector de actividad, por ejemplo marcar descanso mientras trabajás;<br>• usar la tarjeta de otro;<br>• llevar el disco mal puesto, de forma que no se pueda leer.',
      '<b>Otras:</b> cambiar lo que anotaste en el disco es <b>falsificación</b>; usar discos no homologados es <b>grave</b>; y no pasar la revisión cuenta como que el tacógrafo <b>funciona mal</b>.'
    ],
    base: [],
    vista: 'aparato',
    linea: [
      [0.4, e => e.pantalla('! INCIDENTE\nVIOLACIÓN DE SEGURIDAD', 6, true)],
      [0.6, e => e.etiqueta('lcd', 'Manipular: falta muy grave', 'deuda')]
    ]
  },
  {
    tipo: 'control',
    titulo: 'Qué tan grave es pasarse',
    texto: [
      'Algunos ejemplos que toma el examen:',
      '<b>Conducción:</b><br>• 1 hora y media de más en el día: <b>grave</b>;<br>• más de 2 horas de más en el día, o más del 50%: <b>muy grave</b>;<br>• 58 horas en la semana: <b>leve</b>; 65 horas: <b>muy grave</b>;<br>• 5 h 15 sin pausa: <b>grave</b>.',
      '<b>Descanso diario:</b><br>• descansar 10 h 30 en vez de 11: <b>leve</b>;<br>• descansar 1 h 20 menos: <b>grave</b>;<br>• descansar 6 h 30 cuando tocaban 9, o menos de la mitad: <b>muy grave</b>.',
      '<b>Descanso semanal:</b><br>• 2 horas menos que el normal: <b>leve</b>;<br>• 3 horas y media menos, o un reducido de 21 horas: <b>grave</b>;<br>• menos de la mitad: <b>muy grave</b>.'
    ],
    base: [],
    alArrancar: e => e.dia([['c', 4.5, 'CONDUCE 4 h 30'], ['p', 0.75, 'PAUSA'], ['c', 4.5, 'CONDUCE 4 h 30'], ['r', 1.5, '+1 h 30']], 'Manejar 1 hora y media de más: grave', 24),
    vista: 'dia',
    linea: [
      [0.4, e => e.diaHasta(3)],
      [1.4, e => e.diaHasta(4)]
    ]
  },
  {
    tipo: 'control',
    titulo: 'Multas, plazos y puntos',
    texto: [
      '<b>Multas:</b><br>• leve: de <b>100 a 400 €</b>;<br>• grave: de <b>401 a 1.000 €</b>;<br>• muy grave: de <b>1.001 a 6.000 €</b>;<br>• manipular el tacógrafo cuando ya te sancionaron por otra muy grave en los 12 meses anteriores: de <b>6.001 a 18.000 €</b>.',
      '<b>Cuánto tardan en prescribir</b> (dejar de poder cobrarse):<br>• las infracciones leves y graves: <b>1 año</b>;<br>• las sanciones: leves <b>1 año</b>, graves <b>2 años</b>, muy graves <b>3 años</b>.',
      '<b>Puntos del carnet:</b> pasarte de conducción o quedarte corto de descanso en <b>más del 50%</b> te saca <b>6 puntos</b>. Entre el 25% y el 50%, ninguno. Manipular el tacógrafo también saca puntos.'
    ],
    base: [],
    vista: 'sanciones',
    linea: [[0.6, e => e.resaltar('leve')], [1.6, e => e.resaltar('grave')], [2.6, e => e.resaltar('muygrave')], [3.8, e => e.resaltar('puntos')]]
  },
  {
    tipo: 'control',
    titulo: '¿Quién paga la multa?',
    texto: [
      '<b>Por los tiempos responde la empresa</b>, salvo que demuestre que fue una indisciplina muy grave del conductor, que la empresa lo <b>castigó</b> por eso y que ese castigo quedó firme.<br><b>Ojo:</b> si el castigo fue solo no dejarlo ascender, sigue respondiendo la empresa.',
      '<b>Ejemplo:</b> el conductor no hizo el descanso contra las órdenes de la empresa, lo suspendieron de empleo y sueldo y no lo recurrió. La multa es para el conductor.',
      '<b>Si te multan</b>, te dan por escrito las pruebas. Guardalas, para que no te multen dos veces por lo mismo, y mostralas si te las piden.',
      '<b>Otros países:</b> un país de la UE puede multarte por algo que hiciste en otro país, si lo descubre en su territorio y nadie te multó antes.',
      '<b>A la empresa</b> le pueden suspender la autorización por incumplir los tiempos, si es de ese país.'
    ],
    base: [],
    vista: 'sanciones',
    linea: []
  },
  {
    tipo: 'control',
    titulo: 'Repaso: controles y sanciones',
    texto: [
      '<b>Tacógrafo:</b> homologado ("e" + número del país). Revisión cada 2 años en taller autorizado.',
      '<b>Control:</b> dejar revisar y entregar papeles. Si sospechan, al taller autorizado. Por tiempos: parado hasta descansar.',
      '<b>Manipular:</b> muy grave. Responden la empresa, el que lo hizo y los que ayudaron.',
      '<b>Multas:</b> leve 100-400 €, grave 401-1.000 €, muy grave 1.001-6.000 €.',
      '<b>Puntos:</b> más del 50%: 6 puntos.',
      '<b>Responde la empresa,</b> salvo indisciplina castigada y firme.'
    ],
    base: [],
    vista: 'general',
    linea: []
  },
  {
    tipo: 'control',
    titulo: 'Preguntas oficiales: controles y sanciones',
    texto: [],
    base: [],
    vista: 'general',
    linea: [],
    quiz: true
  }
];
