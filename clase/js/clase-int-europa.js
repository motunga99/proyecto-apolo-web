// ==========================================
// INTERNACIONAL · CAPÍTULO 1: POR EUROPA
// Licencia comunitaria, cabotaje y certificado de conductor. Solo Mercancías.
// ==========================================

const BASE = ['camion', 'vos', 'apolo'];
const LYON = [...BASE, 'cliente', 'quesos'];

export const PASOS_EUROPA = [
  {
    tipo: 'europa',
    titulo: 'Un viaje a Francia',
    texto: [
      'Proyecto Apolo consigue un cliente en <b>Lyon</b>, Francia: tiene que llevarle una carga desde Madrid.',
      'Dentro de España alcanzaba con la autorización de transporte. Pero para trabajar <b>entre países de la Unión Europea</b> hace falta otro papel: la <b>licencia comunitaria</b>.',
      'En este tema los papeles tienen colores: <b>verde</b> para España, <b>azul</b> para la Unión Europea y <b>rojo</b> para los países de fuera de la Unión Europea.'
    ],
    base: BASE,
    vista: 'madrid',
    linea: [
      [0.6, e => e.etiqueta('apolo', 'Nuevo viaje: Madrid → Lyon', 'precio')],
      [2.8, e => e.etiqueta('vos', '¿Qué papeles necesito para salir de España?', 'globo')]
    ]
  },
  {
    tipo: 'europa',
    titulo: 'La licencia comunitaria',
    texto: [
      'Es el permiso para hacer <b>transporte internacional dentro de la Unión Europea</b>, llevando cosas de otros y cobrando.',
      'Se le da <b>al transportista</b>, o sea, a la empresa. No es de un camión concreto, no es un permiso para el conductor y no tiene nada que ver con las mercancías peligrosas.',
      '<b>¿Quién la da?</b> El país de la Unión Europea donde está la empresa. Proyecto Apolo está en Madrid, así que se la da <b>España</b>. No la da la Comisión Europea ni otro país donde trabajes.',
      '<b>¿Qué va en el camión?</b> Una <b>copia certificada</b> de la licencia en cada camión. Dentro de España no hacía falta ningún papel, pero un inspector de Francia no puede mirar el registro español.<br><b>Ejemplo:</b> Proyecto Apolo tiene 3 camiones. Tiene una licencia y 3 copias certificadas, una en cada camión.'
    ],
    base: BASE,
    vista: 'madrid',
    carpeta: ['licencia'],
    linea: [
      [0.6, e => e.mostrar('tarjetaLicencia')],
      [0.9, e => e.etiqueta('apolo', 'La licencia es de la empresa. La da España', 'ok')],
      [3.0, e => e.etiqueta('camion', 'Copia certificada en cada camión', 'aviso')]
    ]
  },
  {
    tipo: 'europa',
    titulo: '¿Qué te piden y cuánto dura?',
    texto: [
      '<b>El título de transportista</b>, que en el examen se llama competencia profesional, tiene que servir para el transporte <b>interior e internacional</b>. Uno que sirve solo para el interior no alcanza.',
      '<b>Camiones:</b> para pedir la licencia comunitaria alcanza con tener <b>un solo camión</b>.<br><b>Ejemplo:</b> si Proyecto Apolo tuviera un solo camión, igual podría pedirla. Si en el examen ves opciones que piden varios camiones, están mal.',
      '<b>Duración:</b> <b>hasta 10 años</b>. Después se renueva.'
    ],
    base: BASE,
    alArrancar: e => e.yaVisible('tarjetaLicencia'),
    vista: 'madrid',
    carpeta: ['licencia'],
    linea: [
      [0.6, e => e.etiqueta('apolo', 'Título para interior e internacional · 1 camión', 'precio')],
      [3.0, e => e.etiqueta('camion', 'Dura hasta 10 años', 'ok')]
    ]
  },
  {
    tipo: 'europa',
    titulo: 'De Madrid a Lyon: cruzás la frontera',
    texto: [
      'Salís de Madrid con la carga para el cliente de Lyon.',
      '<b>En la frontera con Francia no hay una aduana que te obligue a parar.</b> España y Francia están las dos en la Unión Europea, y además en Schengen, el grupo de países que sacó los controles fijos en sus fronteras. Pasás por donde antes estaba la aduana y seguís.',
      'Igual puede haber <b>policía</b> haciendo controles de vez en cuando. Por eso tenés que llevar tus papeles en regla, como en cualquier ruta.',
      'En el camión tiene que ir la <b>copia certificada de la licencia comunitaria</b>, por si te para un inspector en Francia.',
      '<b>¿Y si el conductor no es español?</b> Si es de otro país de la Unión Europea, con su documento de identidad alcanza. Si es de <b>fuera</b> de la Unión Europea, también lleva su <b>pasaporte</b>, su <b>permiso de residencia</b> y el <b>certificado de conductor</b>. El certificado lo explicamos más adelante en este mismo capítulo.',
      '<b>Ojo:</b> hay fronteras donde sí te paran, por ejemplo con Suiza o con Marruecos. Esas las vemos más adelante.'
    ],
    base: BASE,
    vista: 'frontera',
    carpeta: ['licencia'],
    linea: [
      [0.3, e => e.mostrar('tarjetaLicencia')],
      [0.6, e => e.camionA(-6)],
      [3.2, e => e.etiqueta('frontera', 'Frontera España → Francia: no hay que parar', 'ok')],
      [6.0, e => e.etiqueta('camion', 'Ya estás en Francia. Seguís hacia Lyon', 'precio')]
    ]
  },
  {
    tipo: 'europa',
    titulo: 'Cabotaje: trabajar dentro de otro país',
    texto: [
      'Llegás a Lyon y descargás. Antes de volver, una empresa de Lyon, <b>Quesos Dupont</b>, te pide llevar quesos de Lyon a Marsella. Los dos lugares están en Francia.',
      'Eso es <b>cabotaje</b>: un transporte hecho <b>entero dentro de un país extranjero</b>, por un transportista que <b>no es de ese país</b>.<br>Vos sos de España y hacés un viaje que empieza y termina en Francia: es cabotaje.',
      '<b>Truco para no confundirte:</b> mirá dónde <b>cargás</b> y dónde <b>descargás</b>. Si los dos lugares están en el mismo país, y ese país no es el tuyo, es cabotaje. Si el viaje cruza una frontera, no lo es.',
      '<b>Lo que NO es cabotaje:</b>',
      '<b>1) Un viaje de un país a otro.</b><br><b>Ejemplo:</b> Madrid → Lyon. Cargás en España y descargás en Francia: son dos países distintos. Eso es un <b>transporte internacional</b>, no cabotaje. Para ese viaje alcanza con la licencia comunitaria.',
      '<b>2) Pasar por un país sin cargar ni descargar nada en él.</b><br><b>Ejemplo:</b> llevás muebles de Madrid a Bruselas, en Bélgica. Para llegar tenés que atravesar toda Francia, pero en Francia no cargás ni descargás nada: solo manejás por sus rutas. Por Francia solo pasás, y eso no es cabotaje.',
      '<b>3) Un viaje dentro de Francia hecho por una empresa francesa.</b><br><b>Ejemplo:</b> un camionero de Lyon lleva quesos de Lyon a Marsella. Trabaja en su propio país: es un viaje normal, no cabotaje. Solo es cabotaje si el que lo hace es de <b>otro</b> país, como vos, que sos de España.',
      '<b>¿Dónde?</b> Dentro de un mismo país, y sobre todo en la <b>Unión Europea</b>.'
    ],
    base: LYON,
    alArrancar: e => { e.yaVisible('tarjetaLicencia'); e.camionA(-6, true); },
    vista: 'lyon',
    carpeta: ['licencia'],
    linea: [
      [0.4, e => e.camionA(18)],
      [3.5, e => e.etiqueta('cliente', 'Llegaste a Lyon: descargás acá', 'ok')],
      [6.0, e => e.etiqueta('quesos', '¿Me llevás estos quesos de Lyon a Marsella?', 'globo')],
      [8.5, e => e.camionA(33)],
      [9.5, e => e.etiqueta('camion', 'Lyon → Marsella, todo dentro de Francia = CABOTAJE', 'precio')]
    ]
  },
  {
    tipo: 'europa',
    titulo: '¿Quién puede hacer cabotaje y cuánto?',
    texto: [
      '<b>¿Quién?</b> Los transportistas de la Unión Europea que tienen <b>licencia comunitaria</b>. No cualquiera, no con la autorización CEMT (un permiso para viajar a países de fuera de la Unión Europea; lo explicamos más adelante) y sin un permiso especial aparte.',
      '<b>¿Es libre, sin límite?</b> No. Está limitado en <b>cantidad de viajes</b> y en <b>tiempo</b>.<br><b>Ejemplo:</b> después de descargar en Lyon podés hacer hasta 3 viajes dentro de Francia en 7 días. Después tenés que irte.',
      '<b>¿Y si entrás a Francia vacío?</b> También se puede hacer cabotaje. En el examen: tenés <b>7 días</b> para hacerlo.',
      '<b>¿Qué tenés que poder demostrar?</b> El viaje internacional con el que entraste <b>y todos</b> los viajes de cabotaje que hiciste. Por eso guardás los papeles de cada uno.',
      '<b>Una excepción:</b> llevar vehículos accidentados en cabotaje es <b>libre</b>. En el examen: es un transporte <b>liberalizado</b>.'
    ],
    base: LYON,
    alArrancar: e => { e.yaVisible('tarjetaLicencia'); e.camionA(33, true); },
    vista: 'lyon',
    carpeta: ['licencia'],
    linea: [
      [0.6, e => e.etiqueta('camion', 'Con licencia comunitaria · viajes y días limitados', 'aviso')],
      [3.0, e => e.etiqueta('quesos', 'Guardá los papeles de cada viaje', 'ok')]
    ]
  },
  {
    tipo: 'europa',
    titulo: 'El certificado de conductor',
    texto: [
      'Proyecto Apolo contrata a <b>Karim</b>, un conductor marroquí, para el viaje a Lyon.',
      'Karim necesita un <b>certificado de conductor</b>. Lo necesitan los conductores que <b>no son</b> de un país de la Unión Europea, Islandia, Noruega o Liechtenstein, salvo que tengan la residencia de larga duración en la Unión Europea.<br><b>Ejemplo:</b> un conductor portugués o noruego no lo necesita. Karim, sí.',
      'Con la licencia comunitaria sola no alcanza: si el conductor es de otro país, también hace falta su certificado.',
      '<b>¿Dónde se saca?</b> En la oficina de Transportes de la Comunidad Autónoma. No en Tráfico, ni en el ayuntamiento, ni en la Guardia Civil.',
      '<b>¿Cuánto dura?</b> <b>2 años</b>. Si el permiso de conducir de Karim vence antes, dura hasta que vence el permiso.',
      '<b>¿Y si Karim se va a otra empresa?</b> Proyecto Apolo tiene que <b>devolver</b> el certificado a la Administración enseguida. El certificado no se va con él.',
      '<b>¿Y si la empresa lo hace manejar sin certificado?</b> Comete una infracción <b>la empresa</b>.'
    ],
    base: [...BASE, 'conductorMA'],
    alArrancar: e => e.yaVisible('tarjetaLicencia'),
    vista: 'madrid',
    carpeta: ['licencia', 'certificado'],
    linea: [
      [0.6, e => e.mostrar('tarjetaCertificado')],
      [0.9, e => e.etiqueta('conductorMA', 'Soy Karim, de Marruecos', 'globo')],
      [3.0, e => e.etiqueta('apolo', 'Certificado de conductor: 2 años · lo da Transportes', 'ok')]
    ]
  },
  {
    tipo: 'europa',
    titulo: 'Repaso: por Europa',
    texto: [
      '<b>Licencia comunitaria:</b> para transporte internacional en la Unión Europea. Es de la empresa y la da el país donde está la empresa. Copia certificada en cada camión.',
      '<b>Te piden:</b> título de transportista interior e internacional y 1 camión. Dura hasta 10 años.',
      '<b>Cabotaje:</b> viaje entero dentro de otro país. Con licencia comunitaria, limitado en viajes y días. Se puede entrar vacío. Hay que demostrar todos los viajes.',
      '<b>Certificado de conductor:</b> para conductores de fuera de la Unión Europea, Islandia, Noruega y Liechtenstein. Lo da Transportes, dura 2 años y la empresa lo devuelve si el conductor se va.'
    ],
    base: [...LYON, 'conductorMA'],
    alArrancar: e => { e.yaVisible('tarjetaLicencia'); e.yaVisible('tarjetaCertificado'); },
    vista: 'general',
    carpeta: ['licencia', 'certificado'],
    linea: []
  },
  {
    tipo: 'europa',
    titulo: 'Preguntas oficiales: por Europa',
    texto: [],
    base: BASE,
    vista: 'general',
    linea: [],
    quiz: true
  }
];
