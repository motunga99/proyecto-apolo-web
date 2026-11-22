// ==========================================
// INTERNACIONAL · CAPÍTULO 4: FUERA DE LA UE
// Autorizaciones CEMT, acuerdos y autorizaciones bilaterales y
// transporte triangular. Solo Mercancías.
// ==========================================

const BASE = ['camion', 'vos', 'apolo'];
const ESTRECHO = ['camion', 'puerto', 'ferry', 'aduanaMA', 'barreraES'];

export const PASOS_FUERA = [
  {
    tipo: 'fuera',
    titulo: 'Salir de la Unión Europea',
    texto: [
      'La licencia comunitaria sirve para trabajar <b>dentro de la Unión Europea</b>. ¿Y si Proyecto Apolo consigue un viaje a un país de afuera, como Marruecos o Turquía?',
      'Para esos países hay <b>dos caminos</b>:',
      '<b>1) La autorización CEMT.</b> CEMT son las siglas de Conferencia Europea de Ministros de Transportes, un grupo de muchos países. Con una sola autorización CEMT podés trabajar entre <b>todos</b> esos países.',
      '<b>2) La autorización bilateral.</b> Sirve para <b>un solo país</b>, el que firmó un acuerdo con España. Por ejemplo, Marruecos.',
      '<b>Truco:</b> CEMT = muchos países. Bilateral = bi, dos: España y el otro país.'
    ],
    base: BASE,
    vista: 'madrid',
    linea: [
      [0.6, e => e.etiqueta('apolo', 'Nuevo viaje fuera de la UE: ¿qué papel necesito?', 'globo')],
      [3.0, e => e.etiqueta('camion', 'CEMT: muchos países · Bilateral: un país', 'precio')]
    ]
  },
  {
    tipo: 'fuera',
    titulo: '¿Qué permite la autorización CEMT?',
    texto: [
      'Permite hacer transporte internacional <b>entre los países que forman la CEMT</b>, y pasar por ellos.<br><b>Ejemplo:</b> llevar una carga de España a Turquía, cruzando otros países de la CEMT.',
      'Mirá el mapa: son <b>43 países</b>. Están casi todos los de Europa, y también algunos de afuera de la Unión Europea, como Turquía, Ucrania, Serbia, Georgia o el Reino Unido. <b>Marruecos no está</b>: con Marruecos se usa la autorización bilateral.',
      'Sirve para los transportes que <b>no son libres</b>, o sea, los que necesitan un permiso. En el examen dicen <b>no liberalizados</b>. Los liberalizados son los que se pueden hacer sin permiso; los vemos en un paso más adelante.',
      '<b>Lo que la CEMT no permite:</b><br>• viajar entre un país de la CEMT y uno que <b>no</b> es de la CEMT;<br>• hacer <b>cabotaje</b>, o sea, un viaje entero dentro de otro país. Ninguno, ni uno solo.',
      '<b>Trampa:</b> no vale para "todos los países del mundo" ni "solo España y Marruecos".'
    ],
    base: BASE,
    vista: 'madrid',
    carpeta: ['cemt'],
    mapa: 'cemt',
    linea: [
      [0.6, e => e.mostrar('tarjetaCEMT')],
      [0.9, e => e.etiqueta('camion', 'Entre países de la CEMT · sin cabotaje', 'ok')]
    ]
  },
  {
    tipo: 'fuera',
    titulo: 'Cómo es la autorización CEMT',
    texto: [
      '<b>Es de la empresa</b> y no se le puede pasar a otra empresa. En el examen: es <b>intransferible</b>.',
      '<b>En el camión va el original</b>, no una copia ni una fotocopia. Por eso una CEMT sirve para <b>un solo camión a la vez</b>.',
      '<b>Clases:</b> de <b>carga general</b> y <b>de mudanzas</b>. Las de carga general se dan en número limitado; las de mudanzas, no.',
      '<b>Duración:</b> la de larga duración vale <b>1 año</b>. La de corta duración, que es de color <b>amarillo</b>, vale <b>30 días</b>.',
      '<b>Viajes:</b> todos los que quieras, pero cada <b>3 transportes</b> tenés que volver al país donde está matriculado el camión.<br><b>Ejemplo:</b> España → Turquía, Turquía → Serbia, Serbia → Grecia. Ahí ya hiciste 3: tenés que volver a España.',
      '<b>Cuaderno de ruta:</b> la de carga general va con un cuaderno donde anotás los viajes <b>con carga y en vacío</b>.',
      '<b>Restricciones:</b> algunas CEMT no se pueden usar en ciertos países, por ejemplo en <b>Austria</b>, o con ciertos camiones.',
      '<b>Sello con un camión verde y un número III, IV o V:</b> quiere decir que esa CEMT solo se usa con camiones <b>EURO III, IV o V seguros</b>, que contaminan menos. No tiene nada que ver con cantidad de viajes ni de países.'
    ],
    base: BASE,
    alArrancar: e => e.yaVisible('tarjetaCEMT'),
    vista: 'madrid',
    carpeta: ['cemt'],
    linea: [
      [0.6, e => e.etiqueta('camion', 'Original a bordo · cada 3 viajes, volver a España', 'aviso')]
    ]
  },
  {
    tipo: 'fuera',
    titulo: 'Transportes que no necesitan CEMT',
    texto: [
      'Entre países de la CEMT hay transportes que son <b>libres</b>: no necesitan autorización. En el examen se llaman <b>liberalizados</b>.',
      '<b>Son libres:</b><br>• los camiones que llevan como mucho <b>3,5 t de carga</b>;<br>• el material, sin fines comerciales, para conciertos, partidos o circos;<br>• las obras de arte para exposiciones;<br>• lo médico para catástrofes o ayuda humanitaria;<br>• los vehículos accidentados o averiados;<br>• los animales vivos en camiones preparados para siempre para eso;<br>• <b>todos</b> los funerarios;<br>• el transporte <b>por cuenta propia</b>, o sea, el que lleva lo suyo;<br>• un camión vacío que va a reemplazar a otro que se rompió en el extranjero;<br>• los viajes de vez en cuando a aeropuertos, cuando se desvían vuelos.',
      '<b>Las mudanzas sí necesitan autorización</b>: para eso existe la CEMT de mudanzas.',
      '<b>Truco:</b> si la opción dice "todos los animales" o "toda la carne", está mal. Tiene que decir que el camión está preparado para eso.'
    ],
    base: BASE,
    vista: 'madrid',
    linea: [
      [0.6, e => e.etiqueta('apolo', 'Accidentados, funerarios, circos, arte, cuenta propia… sin CEMT', 'ok')]
    ]
  },
  {
    tipo: 'fuera',
    titulo: 'Los acuerdos bilaterales: España y Marruecos',
    texto: [
      'Un <b>acuerdo bilateral</b> es un acuerdo <b>entre dos países</b> para poner las reglas del transporte entre ellos. No es un acuerdo entre empresas.',
      'Marruecos no está en la Unión Europea, así que para ir hace falta una <b>autorización bilateral</b> España–Marruecos. Sirve para viajes que <b>salen o llegan</b> a ese país, o para <b>pasar</b> por él.',
      '<b>Clases que pregunta el examen:</b><br>• <b>de tránsito</b>: solo para pasar por el país, sin cargar ni descargar;<br>• <b>de entrada en vacío</b>: entrás vacío y salís cargado;<br>• <b>universales</b>: para cualquier viaje que salga, llegue o pase por ese país;<br>• <b>de cooperación</b>: para los acuerdos entre empresas de transporte de los dos países.',
      'Pueden ser <b>temporales</b> o <b>de un viaje</b>.',
      '<b>¿Quién las reparte?</b> La Administración española, según el convenio firmado con ese país.<br><b>¿Cuántas a la vez?</b> Como mucho, una por camión. <b>Ejemplo:</b> una empresa con 7 camiones puede tener 7.'
    ],
    base: ESTRECHO,
    alArrancar: e => { e.camionA(-76, true, 0.02); e.ferryA(-90, true); },
    vista: 'estrecho',
    carpeta: ['bilateral'],
    linea: [
      [0.4, e => e.mostrar('tarjetaBilateral')],
      [0.8, e => e.camionA(-90, false, 1.95)],
      [4.5, e => { e.ferryA(-104); e.camionA(-104, false, 1.95); }],
      [10.0, e => e.camionA(-125, false, 0.02)],
      [13.0, e => e.etiqueta('aduanaMA', 'Entrás a Marruecos con la autorización bilateral', 'ok')]
    ]
  },
  {
    tipo: 'fuera',
    titulo: 'El transporte triangular',
    texto: [
      'Es un viaje <b>entre dos países</b> hecho con un camión <b>matriculado en un tercer país</b>, distinto de esos dos.<br><b>Ejemplo:</b> tu camión es español y llevás una carga de Francia a Marruecos. Los países del viaje son Francia y Marruecos, y el camión es de España: es triangular.',
      '<b>Triangular puro:</b> cuando ese viaje <b>pasa por el país del camión</b>.<br><b>Ejemplo:</b> de Francia a Marruecos pasando por España, que es donde está matriculado tu camión.',
      '<b>Trampa:</b> no es "un viaje entre tres países" ni "un viaje con tres transportistas".'
    ],
    base: [...ESTRECHO, 'apolo', 'cliente'],
    vista: 'general',
    linea: [
      [0.6, e => e.etiqueta('camion', 'Francia → Marruecos con camión español = TRIANGULAR', 'precio')]
    ]
  },
  {
    tipo: 'fuera',
    titulo: 'Todo junto: ¿qué papel uso según adónde voy?',
    texto: [
      'La pregunta clave es siempre: <b>¿adónde va el viaje?</b>',
      '<b>Dentro de España</b> (Madrid → Valencia)<br>→ <b>Autorización de transporte</b> (MDPE). En el camión no va ningún papel de la autorización.<br>→ El papel del viaje: <b>documento de control</b>.',
      '<b>A otro país de la Unión Europea</b> (Madrid → Lyon)<br>→ <b>Licencia comunitaria</b>, con la copia certificada en el camión.<br>→ El papel del viaje: <b>carta de porte CMR</b>.',
      '<b>A un país de fuera de la UE que está en la CEMT</b> (Madrid → Estambul, en Turquía)<br>→ <b>Autorización CEMT</b>, con el original en el camión.<br>→ El papel del viaje: <b>carta de porte CMR</b>.',
      '<b>A un país de fuera de la UE que no está en la CEMT</b> (Madrid → Tánger, en Marruecos)<br>→ <b>Autorización bilateral</b> con ese país.<br>→ El papel del viaje: <b>carta de porte CMR</b>.',
      '<b>¿Y Schengen?</b> No es un permiso ni un papel. Solo quiere decir que entre esos países <b>no te controlan el pasaporte</b>. No reemplaza a ninguno de los permisos de arriba.',
      '<b>¿Y el conductor?</b> Si es de fuera de la UE, además lleva su <b>certificado de conductor</b>.'
    ],
    base: [...BASE, 'cliente', 'aduanaMA', 'aduanaCH'],
    vista: 'general',
    carpeta: ['licencia', 'cmr', 'cemt', 'bilateral'],
    linea: [
      [0.6, e => e.etiqueta('apolo', 'España: autorización de transporte', 'ok')],
      [2.6, e => e.etiqueta('cliente', 'Unión Europea: licencia comunitaria', 'precio')],
      [4.6, e => e.etiqueta('aduanaMA', 'Marruecos: autorización bilateral', 'aviso')]
    ]
  },
  {
    tipo: 'fuera',
    titulo: 'Repaso: fuera de la UE',
    texto: [
      '<b>CEMT:</b> para viajar entre los países de la CEMT. No sirve con países de afuera ni para cabotaje.',
      '<b>Cómo es:</b> de la empresa, intransferible, el original en el camión. Carga general (limitadas) o mudanzas. 1 año o 30 días (amarilla). Viajes sin límite, pero cada 3 volver al país del camión.',
      '<b>Libres sin CEMT:</b> hasta 3,5 t de carga, accidentados, funerarios, circos y conciertos, arte, ayuda médica, cuenta propia. Las mudanzas no.',
      '<b>Bilateral:</b> acuerdo entre dos países. De tránsito, de entrada en vacío, universales y de cooperación. Una por camión.',
      '<b>Triangular:</b> entre dos países con un camión de un tercero. Puro: pasa por el país del camión.'
    ],
    base: BASE,
    vista: 'general',
    carpeta: ['cemt', 'bilateral'],
    linea: []
  },
  {
    tipo: 'fuera',
    titulo: 'Preguntas oficiales: fuera de la UE',
    texto: [],
    base: BASE,
    vista: 'general',
    linea: [],
    quiz: true
  }
];
