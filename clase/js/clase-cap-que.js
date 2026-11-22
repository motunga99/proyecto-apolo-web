// ==========================================
// EL CAP · CAPÍTULO 1: ¿QUÉ ES Y QUIÉN LO NECESITA?
// ==========================================

const BASE = ['camion', 'vos', 'empresaCAP', 'sucursal', 'examen'];
const EXENTOS = ['bomberos', 'militar', 'policia', 'emergencia', 'tractor', 'taller'];

export const PASOS_CAP_QUE = [
  {
    tipo: 'que',
    titulo: '¿Qué es el CAP?',
    texto: [
      'CAP son las siglas de <b>Certificado de Aptitud Profesional</b>. Es la prueba de que estás preparado para <b>trabajar de conductor profesional</b>.',
      'No reemplaza al permiso de conducir: hacen falta <b>los dos</b>. El permiso dice que sabés manejar el camión; el CAP, que sabés hacer el trabajo.',
      'Cuando lo aprobás te dan la <b>tarjeta de cualificación del conductor</b>, que es la que llevás encima cuando manejás.',
      '<b>¿Para qué existe?</b> Para mejorar la <b>seguridad vial</b> y la <b>seguridad del conductor</b>, también cuando el camión está parado, por ejemplo al cargar o descargar.',
      '<b>Dónde vale:</b> en <b>toda la Unión Europea</b>.'
    ],
    base: BASE,
    vista: 'general',
    linea: [
      [0.6, e => e.etiqueta('empresaCAP', 'Acá se hace el curso del CAP', 'ok')],
      [2.6, e => e.mostrar('tarjetaCAP')],
      [3.0, e => e.etiqueta('vos', 'Con el CAP me dan la tarjeta de cualificación', 'globo')]
    ]
  },
  {
    tipo: 'que',
    titulo: 'Las normas y el registro',
    texto: [
      '<b>¿Cuándo nació el CAP?</b> Es bastante nuevo. Pasó en tres momentos:<br>• <b>2003:</b> la Unión Europea saca una regla para todos sus países, que se llama <b>Directiva</b>. Dice que los conductores profesionales se tienen que formar.<br>• <b>2007:</b> España pasa esa regla europea a una ley propia, con un <b>Real Decreto</b>.<br>• <b>11 de septiembre de 2009:</b> desde ese día, en España el CAP es <b>obligatorio</b> para manejar camiones como trabajo.<br><b>Ejemplo:</b> Pedro tiene el permiso C+E desde 2005. Ya manejaba antes de que existiera la obligación, así que no tuvo que hacer el curso inicial. Vos sacaste el permiso en 2025: vos sí lo tenés que hacer.',
      'Ese Real Decreto de 2007 ya se cambió por uno nuevo, que es el que vale hoy:',
      '<b>La norma española</b> que regula el CAP es el <b>Real Decreto 284/2021</b>, del 20 de abril.',
      'Viene de una <b>Directiva europea</b> que se cambió en <b>2018</b> para:<br>• dejar algunas reglas más claras;<br>• igualar las edades mínimas de los permisos;<br>• permitir partes del curso por internet. En el examen eso se llama <b>aprendizaje electrónico</b>.<br>Si preguntan el objetivo de ese cambio, son las tres: <b>todas</b>.',
      'Ese cambio de 2018 también le dio más importancia en los cursos a la seguridad vial y a la salud y seguridad del conductor.',
      '<b>¿Dónde queda anotado tu CAP?</b> En el <b>Registro de Empresas y Actividades de Transporte</b>, el mismo registro de las autorizaciones. No en Tráfico.'
    ],
    base: BASE,
    vista: 'general',
    linea: [
      [0.6, e => e.etiqueta('examen', 'Tu CAP queda anotado en el Registro de Empresas y Actividades de Transporte', 'precio')]
    ]
  },
  {
    tipo: 'que',
    titulo: '¿Quién necesita el CAP?',
    texto: [
      'Lo necesitan los que manejan como trabajo vehículos que piden estos permisos:<br>• camiones: <b>C1, C1+E, C y C+E</b>;<br>• autobuses: <b>D1, D1+E, D y D+E</b>.<br>O sea, sirve tanto para <b>mercancías</b> como para <b>viajeros</b>. Con los permisos A o B no hace falta.',
      '<b>¿Quién lo tiene que sacar en España?</b><br>• los de la Unión Europea que viven acá;<br>• los de otros países que trabajan en una empresa española;<br>• los de otros países con residencia permanente.<br>Los tres casos.',
      '<b>Una excepción importante:</b> los que ya tenían el permiso <b>C+E antes del 11 de septiembre de 2009</b> no tienen que hacer el curso inicial. Eso sí, la formación continua cada 5 años la hacen igual.'
    ],
    base: BASE,
    vista: 'general',
    linea: [
      [0.6, e => e.etiqueta('camion', 'C1, C1+E, C y C+E: necesitan CAP', 'ok')]
    ]
  },
  {
    tipo: 'que',
    titulo: '¿Quién no necesita el CAP?',
    texto: [
      '<b>Los que no lo necesitan:</b><br>• vehículos que van como mucho a <b>45 km/h</b>, como un tractor;<br>• <b>bomberos</b>, <b>Fuerzas Armadas</b>, <b>protección civil</b> y <b>policía</b>;<br>• vehículos de <b>emergencias</b> o de <b>salvamento</b>;<br>• vehículos que se están <b>probando en la ruta</b> por una reparación o una mejora, y los <b>nuevos o transformados</b> que todavía no circulan;<br>• vehículos de las <b>clases prácticas y exámenes</b> del permiso o del CAP, si no llevan carga;<br>• el transporte <b>privado particular</b>, el de tus propias cosas sin que sea un trabajo;<br>• el transporte <b>privado complementario</b> que lleva solo el material para el propio trabajo del conductor, si manejar no es su trabajo principal.<br><b>Ejemplo:</b> un albañil que lleva sus herramientas y su hormigonera en un camión de su empresa.',
      '<b>Trampa:</b> el examen pone opciones como "camiones de más de 10.000 kg", "autobuses de más de 45 plazas" o "vehículos que van a 90 km/h". Esos <b>sí</b> necesitan CAP.'
    ],
    base: [...BASE, ...EXENTOS],
    vista: 'exentos',
    linea: [
      [0.6, e => e.etiqueta('bomberos', 'Bomberos: sin CAP', 'ok')],
      [1.8, e => e.etiqueta('militar', 'Ejército: sin CAP', 'ok')],
      [3.0, e => e.etiqueta('tractor', 'Hasta 45 km/h: sin CAP', 'ok')],
      [4.2, e => e.etiqueta('taller', 'Prueba de taller: sin CAP', 'ok')]
    ]
  },
  {
    tipo: 'que',
    titulo: 'Repaso: qué es el CAP',
    texto: [
      '<b>CAP:</b> Certificado de Aptitud Profesional. Hace falta además del permiso. Vale en toda la UE.',
      '<b>Objetivo:</b> seguridad vial y del conductor, también con el vehículo parado.',
      '<b>Norma:</b> Real Decreto 284/2021. Directiva europea cambiada en 2018. Se anota en el Registro de Empresas y Actividades de Transporte.',
      '<b>Lo necesitan:</b> C1, C1+E, C, C+E y D1, D1+E, D, D+E.',
      '<b>Sin curso inicial:</b> C+E de antes del 11-09-2009.',
      '<b>No lo necesitan:</b> hasta 45 km/h, bomberos, ejército, policía, emergencias, pruebas de taller, clases prácticas, privado particular.'
    ],
    base: [...BASE, ...EXENTOS],
    vista: 'general',
    carpeta: ['permiso', 'cap'],
    linea: []
  },
  {
    tipo: 'que',
    titulo: 'Preguntas oficiales: qué es el CAP',
    texto: [],
    base: BASE,
    vista: 'general',
    linea: [],
    quiz: true
  }
];
