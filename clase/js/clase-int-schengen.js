// ==========================================
// INTERNACIONAL · CAPÍTULO 3: SCHENGEN
// Qué es, qué países están, fronteras interiores y exteriores,
// el SIS y las obligaciones de los transportistas. Solo Mercancías.
// ==========================================

const BASE = ['camion', 'vos', 'apolo'];

export const PASOS_SCHENGEN = [
  {
    tipo: 'schengen',
    titulo: '¿Qué es Schengen?',
    texto: [
      'Cuando cruzaste de España a Francia no paraste en ninguna frontera. Eso es gracias a <b>Schengen</b>.',
      'El <b>Espacio Schengen</b> es un grupo de países de Europa que sacaron los controles de personas en las fronteras <b>entre ellos</b>. En el examen: "un territorio sin controles fronterizos internos dentro de Europa".',
      'Se llama así por <b>Schengen</b>, un pueblo de Luxemburgo donde se firmó el acuerdo.',
      '<b>Fechas que pregunta el examen:</b><br>• <b>1995</b>: el acuerdo empieza a funcionar y cruzar las fronteras se hace más fácil.<br>• <b>1997</b>: con el <b>Tratado de Ámsterdam</b>, las reglas de Schengen pasan a ser parte de la Unión Europea.'
    ],
    base: BASE,
    vista: 'frontera',
    linea: [
      [0.4, e => e.camionA(-6)],
      [3.0, e => e.etiqueta('frontera', 'Schengen: sin control de personas entre estos países', 'ok')]
    ]
  },
  {
    tipo: 'schengen',
    titulo: '¿Qué países están en Schengen?',
    texto: [
      'Schengen es <b>solo de Europa</b>. No tiene países de África ni de América.',
      '<b>Ojo: Schengen no es lo mismo que la Unión Europea.</b><br>• Casi todos los países de la Unión Europea están en Schengen: España, Francia, Portugal, Italia, Suecia, Finlandia, Bélgica, Luxemburgo…<br>• Pero hay dos que no: <b>Irlanda</b> y <b>Chipre</b>.<br>• Y hay países que no son de la Unión Europea pero sí están en Schengen: <b>Suiza, Noruega, Islandia y Liechtenstein</b>.',
      '<b>No están en Schengen:</b> Reino Unido, Irlanda, Chipre, Marruecos, Turquía, Rusia y Georgia.',
      'Mirá el mapa: en <b>verde</b> los de la Unión Europea que están en Schengen, en <b>celeste</b> los que están en Schengen sin ser de la UE, en <b>amarillo</b> los de la UE que no están, y en <b>gris</b> los que no están en ninguno.',
      '<b>Truco para el examen:</b> si te preguntan cuál <b>no</b> está, buscá Reino Unido o Marruecos. Si te preguntan cuál <b>sí</b> está, buscá Portugal o Finlandia.',
      '<b>Cooperación Schengen y Espacio Schengen no son lo mismo.</b> La cooperación es el grupo de países que trabajan juntos con estas reglas. El Espacio es más chico: solo los que además sacaron los controles en sus fronteras. Por eso no todos los de la cooperación están en el Espacio.'
    ],
    base: [...BASE, 'aduanaCH', 'aduanaMA'],
    vista: 'general',
    mapa: 'schengen',
    linea: [
      [0.6, e => e.etiqueta('aduanaCH', 'Suiza: no es de la UE, pero sí de Schengen', 'ok')],
      [3.0, e => e.etiqueta('aduanaMA', 'Marruecos: fuera de Schengen', 'deuda')]
    ]
  },
  {
    tipo: 'schengen',
    titulo: 'Fronteras interiores y exteriores',
    texto: [
      'Las reglas de Schengen separan dos clases de fronteras:',
      '<b>Fronteras interiores:</b> las que hay entre dos países de Schengen. No hay control de personas.<br><b>Ejemplo:</b> España → Francia. Pasás sin parar.',
      '<b>Fronteras exteriores:</b> las que hay entre un país de Schengen y uno de afuera. Ahí <b>sí</b> hay control.<br><b>Ejemplo:</b> el ferry que llega de Marruecos a Algeciras. Te controlan al entrar.',
      '<b>¿Qué es un control fronterizo?</b> Es el control que te hacen <b>solo porque querés cruzar la frontera</b>, sin otro motivo. Si un policía te para dentro de Francia por otra razón, eso no es un control fronterizo.',
      '<b>Un caso que confunde: Suiza.</b> Está en Schengen, así que no te controlan a las personas. Pero no es de la Unión Europea, así que la <b>aduana</b> sí revisa la <b>mercancía</b>. Por eso hay barrera. La aduana la vemos más adelante.'
    ],
    base: [...BASE, 'aduanaCH', 'barrera'],
    alArrancar: e => e.camionA(40, true),
    vista: 'suiza',
    linea: [
      [0.4, e => e.camionA(56)],
      [3.0, e => e.etiqueta('aduanaCH', 'Suiza: no controlan personas, pero la aduana revisa la carga', 'aviso')]
    ]
  },
  {
    tipo: 'schengen',
    titulo: '¿Cómo se cuidan si no hay controles?',
    texto: [
      'Si entre los países no hay controles, ¿cómo evitan que entren delincuentes o personas sin papeles? Con tres cosas:',
      '<b>1) Reglas comunes en las fronteras de afuera:</b> todos los países usan las mismas reglas de <b>visados</b>, de <b>asilo</b> y de control en las fronteras exteriores.',
      '<b>2) Policías y jueces trabajan juntos</b> entre países para luchar contra la delincuencia organizada.',
      '<b>3) El SIS</b> (Sistema de Información de Schengen). Es una base de datos que comparten todos los países, donde la policía busca <b>personas y objetos</b>: alguien buscado por la justicia, un camión robado. Sirve para cuidar la seguridad y, a la vez, que la gente pueda circular libre.',
      '<b>Trampa del examen:</b> en las opciones te ponen que el SIS sirve para guardar el ADN de las personas o para hacer un mapa genético de los europeos. Es falso. También te ponen que anota todas las entradas y salidas de Schengen: también es falso. El SIS solo sirve para que la policía <b>busque personas y objetos</b>.'
    ],
    base: [...BASE, 'aduanaCH'],
    vista: 'general',
    linea: [
      [0.6, e => e.etiqueta('camion', 'SIS: la policía busca personas y objetos, como un camión robado', 'precio')]
    ]
  },
  {
    tipo: 'schengen',
    titulo: 'Lo que tiene que hacer el transportista',
    texto: [
      'Cuando entrás a Schengen desde afuera, por ejemplo con el ferry desde Marruecos, el transportista también ayuda a controlar.',
      '<b>Si llevás a alguien de un país de afuera</b>, tenés que asegurarte de que tenga su documento de viaje y, si lo necesita, su visado. Es una obligación del transportista, no solo de la policía.<br><b>Ejemplo:</b> si en tu camión viaja un acompañante marroquí, tiene que tener pasaporte y visado en regla.',
      '<b>Si a esa persona no la dejan entrar</b>, el transportista tiene que llevarla de vuelta al país que le dio el documento de viaje. Y si no se puede enseguida, paga los gastos de su estadía y de su regreso.',
      '<b>Si no comprobás los papeles</b>, la multa es de <b>5.000 a 10.000 euros por cada persona</b> que llevabas, o de al menos <b>750.000 euros</b> en total, sin importar cuántas eran. El examen pregunta las dos formas.'
    ],
    base: ['camion', 'puerto', 'ferry', 'aduanaMA', 'barreraES', 'policia'],
    alArrancar: e => { e.camionA(-132, true, 0.02); e.ferryA(-104, true); },
    vista: 'estrecho',
    linea: [
      [0.5, e => e.etiqueta('camion', 'Salís de Marruecos hacia España', 'precio')],
      [1.0, e => e.camionA(-104, false, 1.95)],
      [5.0, e => e.etiqueta('ferry', 'El camión sube al ferry y cruza el Estrecho', 'globo')],
      [5.5, e => { e.ferryA(-90); e.camionA(-90, false, 1.95); }],
      [11.0, e => { e.etiqueta('camion', null); e.etiqueta('ferry', null); e.camionA(-76, false, 0.02); }],
      [14.5, e => e.etiqueta('barreraES', 'Frontera exterior de Schengen: control de pasaportes y aduana', 'aviso')],
      [17.5, e => e.etiqueta('policia', '¿Las personas que lleva tienen pasaporte y visado?', 'globo')]
    ]
  },
  {
    tipo: 'schengen',
    titulo: 'Si llevás pasajeros desde fuera de Schengen',
    texto: [
      'Esto es para las empresas que llevan <b>personas</b>, como barcos, aviones, trenes o autobuses. Aunque es de pasajeros, sale en el examen de Mercancías.',
      '<b>Antes de salir</b>, tienen que mandar a la policía los datos de los pasajeros. Vale para viajes por aire, por mar y por tierra.',
      '<b>¿Qué datos?</b> El nombre y los apellidos, la fecha de nacimiento, el número total de pasajeros y por qué paso de la frontera van a entrar.',
      '<b>¿Cuánto se guardan?</b> La policía los borra a las <b>24 horas</b>.',
      '<b>¿Y si no los mandan?</b> Les pueden <b>quitar el vehículo</b>. En el examen: incautar o decomisar.',
      'Además tienen que revisar que los pasaportes y documentos de cada pasajero sean válidos y estén vigentes.'
    ],
    base: ['puerto', 'ferry', 'aduanaMA', 'policiaFr', 'barreraES'],
    vista: 'estrecho',
    linea: [
      [0.5, e => e.etiqueta('ferry', 'Antes de salir, el barco manda los datos de los pasajeros', 'globo')],
      [1.2, e => e.enviarDatos(true)],
      [4.5, e => e.etiqueta('policiaFr', 'Llegan: nombre, fecha de nacimiento, cuántos son y por dónde entran', 'precio')],
      [9.0, e => { e.enviarDatos(false); e.etiqueta('ferry', null); }],
      [9.5, e => e.etiqueta('policiaFr', 'A las 24 horas, la policía borra los datos', 'aviso')],
      [11.0, e => e.ferryA(-90)],
      [12.5, e => e.etiqueta('ferry', 'Si no los manda, le pueden quitar el vehículo', 'deuda')]
    ]
  },
  {
    tipo: 'schengen',
    titulo: 'Repaso: Schengen',
    texto: [
      '<b>Schengen:</b> países de Europa sin control de personas en las fronteras entre ellos. Empezó en 1995 y entró a la UE con el Tratado de Ámsterdam en 1997.',
      '<b>No es la UE:</b> Suiza, Noruega, Islandia y Liechtenstein están sin ser de la UE. Irlanda y Chipre son de la UE y no están. Reino Unido, Marruecos y Turquía, afuera.',
      '<b>Fronteras:</b> interiores sin control, exteriores con control. Control fronterizo es el que te hacen solo por cruzar.',
      '<b>Para cuidarse:</b> reglas comunes de visados y asilo, policías y jueces juntos, y el SIS para buscar personas y objetos.',
      '<b>El transportista:</b> revisa los papeles de quien lleva; si no lo dejan entrar, lo devuelve y paga; multa de 5.000 a 10.000 € por persona, o al menos 750.000 € en total.',
      '<b>Pasajeros:</b> datos antes de salir, se borran en 24 h; si no los mandan, les quitan el vehículo.'
    ],
    base: [...BASE, 'aduanaCH', 'aduanaMA', 'ferry', 'puerto'],
    vista: 'general',
    linea: []
  },
  {
    tipo: 'schengen',
    titulo: 'Preguntas oficiales: Schengen',
    texto: [],
    base: BASE,
    vista: 'general',
    linea: [],
    quiz: true
  }
];
