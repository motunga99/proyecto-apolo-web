// ==========================================
// PAPELES · CAPÍTULO 2: LA AUTORIZACIÓN DE TRANSPORTE
// Qué es, sus letras (MDPE, MDLE, MPCE), qué pide, cuánto dura,
// cómo se suman o cambian camiones y qué papel se lleva. Solo Mercancías.
// ==========================================

const BASE = ['camion', 'vos', 'apolo', 'frutas', 'fabrica', 'web', 'oficina'];
const CON_TODOS = [...BASE, 'ana', 'camionAna', 'furgoneta'];

export const PASOS_AUTORIZACION = [
  {
    tipo: 'autorizacion',
    titulo: 'El permiso de la empresa',
    texto: [
      'Si llevás cosas de otros y te pagan por eso (transporte público) con un camión de más de 2 t, necesitás una <b>autorización de transporte</b>. ¿Qué es y cómo se consigue?',
      'Es el <b>permiso del Estado para trabajar de transportista</b>. Lo da la oficina de Transportes. En el examen la llaman "el órgano competente".',
      '<b>Lo más importante:</b> la autorización es <b>de la empresa</b>, no de cada camión ni de cada viaje. Proyecto Apolo tiene <b>una sola</b> autorización, y a ella se le "pegan" todos sus camiones. En el examen dicen que los camiones se <b>vinculan</b> o se <b>adscriben</b> a la autorización.',
      '<b>En el examen:</b> se da <b>una por empresa</b>, como <b>autorización de empresa</b>. No por vehículo ni por viaje.'
    ],
    base: BASE,
    vista: 'oficina',
    linea: [
      [0.6, e => e.etiqueta('oficina', 'Acá se pide la autorización', 'ok')],
      [2.4, e => e.etiqueta('vos', 'Quiero trabajar legal con mi camión', 'globo')],
      [4.4, e => e.etiqueta('cieloOficina', 'UNA autorización por empresa · todos sus camiones vinculados', 'grande')]
    ]
  },
  {
    tipo: 'autorizacion',
    titulo: 'Las letras: MDPE, MDLE y MPCE',
    texto: [
      'Cada autorización tiene unas letras, como una matrícula. Son tres, y el examen las pregunta muchísimo:',
      '<b>MDPE</b> = transporte <b>público</b> con vehículos de <b>más de 3,5 t</b>. Es la de tu camión. <b>Truco: P de Pesado.</b>',
      '<b>MDLE</b> = transporte <b>público</b> solo con vehículos de <b>hasta 3,5 t</b>, como una furgoneta. <b>Truco: L de Ligero.</b>',
      '<b>MPCE</b> = transporte <b>privado complementario</b>, como el camión de Ana. Sirve para vehículos de <b>cualquier peso</b>. <b>Truco: PC de Privado Complementario.</b>',
      'Por eso en el transporte público hay <b>dos clases</b> de autorización: una para vehículos de hasta 3,5 t (MDLE) y otra para los de más (MDPE).'
    ],
    base: CON_TODOS,
    vista: 'general',
    linea: [
      [0.6, e => e.mostrar('tarjetaMDPE')],
      [0.9, e => e.etiqueta('camion', 'MDPE: público, más de 3,5 t (P de Pesado)', 'ok')],
      [2.8, e => e.mostrar('tarjetaMDLE')],
      [3.1, e => e.etiqueta('furgoneta', 'MDLE: público, hasta 3,5 t (L de Ligero)', 'ok')],
      [5.0, e => e.mostrar('tarjetaMPCE')],
      [5.3, e => e.etiqueta('camionAna', 'MPCE: privado complementario, cualquier peso', 'aviso')]
    ]
  },
  {
    tipo: 'autorizacion',
    titulo: '¿Qué vehículos se pegan a la autorización?',
    texto: [
      'A la autorización se le vinculan <b>los camiones</b>, o sea, los que tienen motor. <b>No</b> los remolques ni los semirremolques: esos no llevan motor.',
      '<b>¿Tienen que ser tuyos los camiones?</b> No hace falta comprarlos. Pueden ser:<br>• <b>tuyos</b> (en propiedad);<br>• <b>alquilados</b>;<br>• <b>en leasing</b>, que es alquilar con opción a compra.<br>Las tres formas valen.<br><b>Ejemplo:</b> Proyecto Apolo tiene 3 camiones: uno comprado, uno alquilado a otra empresa y uno en leasing. Los tres se pueden pegar a la autorización.',
      '<b>En el examen:</b> alquilar se dice <b>arrendamiento ordinario</b> y leasing, <b>arrendamiento financiero</b>. Como valen las tres formas, se marca la opción que dice <b>todas</b>.',
      '<b>¿Hay que pegarle al camión un cartel o distintivo de la autorización?</b> <b>No.</b> Los camiones no llevan ningún distintivo de la autorización. Las opciones con triángulos o rombos de tantos centímetros son trampa.'
    ],
    base: CON_TODOS,
    alArrancar: e => e.yaVisible('tarjetaMDPE'),
    vista: 'deposito',
    linea: [
      [0.6, e => e.etiqueta('camion', 'Se vincula el CAMIÓN (con motor), no el remolque', 'ok')],
      [2.6, e => e.etiqueta('vos', 'Mío, alquilado o en leasing: los tres valen', 'globo')],
      [4.6, e => e.etiqueta('apolo', 'Sin carteles ni distintivos en el camión', 'aviso')]
    ]
  },
  {
    tipo: 'autorizacion',
    titulo: 'Qué te piden para la autorización de transporte público',
    texto: [
      'Para que la oficina de Transportes te dé la autorización de transporte público para camiones de más de 3,5 t (la <b>MDPE</b>), tu empresa tiene que cumplir <b>6 cosas</b>. Vamos una por una, con un ejemplo en cada una.',
      '<b>1) Ser una persona o una empresa registrada.</b><br>La puede pedir <b>una persona sola</b> que trabaja por su cuenta, lo que se llama un autónomo. <b>Ejemplo:</b> vos, con tu nombre y tu DNI.<br>O la puede pedir <b>una empresa</b> que formaste con otros socios. <b>Ejemplo:</b> vos, Pedro y Ana arman "Proyecto Apolo S.L.". Esa empresa tiene que estar <b>registrada</b>: así tiene su propio nombre, sus propias cuentas y sus propias deudas, aparte de las de cada socio.<br>En el examen, la persona sola se llama <b>persona física</b>. La empresa registrada se llama <b>persona jurídica</b>, y dicen que tiene "personalidad jurídica propia e independiente de las personas que la integran".',
      '<b>2) Honorabilidad = ser honrado.</b><br>El que manda en la empresa no puede tener ciertas condenas o multas muy graves.<br><b>Ejemplo:</b> si a Pedro lo condenaron por estafa, o lo multaron varias veces por trucar el tacógrafo, pierde la honorabilidad. Mientras tanto, a la empresa no le dan la autorización.',
      '<b>3) Competencia profesional = saber llevar el negocio.</b><br>Alguien de la empresa tiene que tener el <b>título de transportista</b>. Se saca aprobando un examen, y no es lo mismo que el CAP: el CAP es para <b>manejar</b> el camión; el título de transportista es para <b>dirigir</b> la empresa (precios, papeles, viajes).<br><b>Ejemplo:</b> vos no tenés el título, pero Pedro sí lo sacó. Si Pedro dirige el transporte de la empresa, la empresa cumple.',
      '<b>4) Capacidad financiera = tener plata para responder.</b><br>La empresa tiene que demostrar que tiene dinero por si algo sale mal: pagar sueldos, arreglos o deudas. Se pide <b>9.000 € por el primer camión y 5.000 € más por cada camión que sumes</b>.<br><b>Ejemplos:</b><br>• 1 camión → <b>9.000 €</b><br>• 2 camiones → 9.000 + 5.000 = <b>14.000 €</b><br>• 3 camiones → 9.000 + 5.000 + 5.000 = <b>19.000 €</b>',
      '<b>5) Estar al día con los impuestos.</b><br>La empresa no puede deberle plata a Hacienda.<br><b>Ejemplo:</b> si Proyecto Apolo no pagó el IVA de los últimos meses, no le dan la autorización hasta que lo pague.<br>En el examen lo llaman "cumplir las obligaciones fiscales". Son <b>todas</b>, no solo "las principales".',
      '<b>6) Tener al menos UN camión con motor propio, matriculado en España.</b> Con uno solo alcanza, y lo mismo para la MDLE.<br><b>Ejemplos:</b><br>• Tu camión, con matrícula española → <b>sirve</b>.<br>• Un camión con matrícula de Francia → <b>no sirve</b>.<br>• Un remolque solo → <b>no sirve</b>: no tiene motor, no anda solo.',
      '<b>En el examen:</b> si preguntan cuáles son los requisitos, se marca la opción que dice <b>todas</b>. En la plata, ojo con la opción que da vuelta los números (5.000 € el primero y 9.000 € los demás): está mal.'
    ],
    base: BASE,
    alArrancar: e => e.yaVisible('tarjetaMDPE'),
    vista: 'oficina',
    linea: [
      [0.6, e => e.etiqueta('oficina', 'Honorabilidad · Título de transportista · Plata · Impuestos al día', 'ok')],
      [3.0, e => e.etiqueta('cieloOficina', '9.000 € el 1º camión + 5.000 € cada uno más', 'grande')],
      [5.0, e => e.etiqueta('camion', 'Mínimo UN camión matriculado en España', 'precio')]
    ]
  },
  {
    tipo: 'autorizacion',
    titulo: 'Para el privado complementario piden mucho menos',
    texto: [
      'Ana tiene una fábrica de muebles y un camión propio, pero no se dedica al transporte: con el camión solo lleva <b>sus</b> muebles a sus clientes. Eso es <b>transporte privado complementario</b>. Por eso, para su autorización <b>MPCE</b> le piden mucho menos que a vos:',
      '<b>No</b> le piden capacidad financiera (los 9.000 €).<br><b>No</b> le piden competencia profesional (el título de transportista).<br><b>No</b> le piden honorabilidad.<br><b>No</b> necesita tener antes una autorización de transporte público.',
      'Lo que sí tiene que cumplir son sus <b>obligaciones laborales y sociales</b>, como cualquier empresa con empleados.',
      '<b>¿Cuántos vehículos?</b> Mínimo <b>uno</b>. Y como máximo, <b>los que necesite y pueda justificar</b> para su trabajo. No "tres" ni "todos los que pida".',
      '<b>En el examen:</b> "¿Qué capacidad financiera se pide?" → <b>no se pide</b>. "¿Qué requisito hace falta?" (autorización pública, título o honorabilidad) → <b>ninguno</b>.'
    ],
    base: CON_TODOS,
    alArrancar: e => e.yaVisible('tarjetaMPCE'),
    vista: 'fabrica',
    linea: [
      [0.6, e => e.etiqueta('ana', 'Sin título, sin 9.000 €, sin honorabilidad', 'globo')],
      [2.8, e => e.etiqueta('camionAna', 'MPCE: mínimo 1 vehículo, máximo los que justifique', 'ok')]
    ]
  },
  {
    tipo: 'autorizacion',
    titulo: '¿Cuánto dura? Para siempre, pero con visado',
    texto: [
      'La autorización <b>no tiene fecha de vencimiento</b>. En el examen: "se otorga <b>sin plazo de duración prefijado</b>".',
      'Pero la Administración controla cada tanto que la empresa <b>siga cumpliendo</b> lo que le pidieron: que sigue siendo honrada, que tiene la plata, el título y los camiones.',
      'Ese control se llama <b>visado</b>, o visado periódico. Pensalo como <b>la ITV, pero de la empresa</b>: el camión pasa la ITV, y la empresa pasa el visado.',
      '<b>Trampa del examen:</b> te ponen nombres parecidos: "revisión periódica", "revista periódica", "constatación periódica", "certificación periódica". Ninguno. Es <b>visado</b>.'
    ],
    base: BASE,
    alArrancar: e => e.yaVisible('tarjetaMDPE'),
    vista: 'oficina',
    linea: [
      [0.6, e => e.etiqueta('cieloOficina', 'Sin fecha de vencimiento', 'ok')],
      [2.6, e => e.etiqueta('oficina', 'VISADO: el control cada tanto (la "ITV" de la empresa)', 'aviso')]
    ]
  },
  {
    tipo: 'autorizacion',
    titulo: 'Sumar camiones, cambiar uno o pasarle la autorización a otro',
    texto: [
      '<b>Sumar camiones:</b> te va bien y querés un camión más. Se puede si tu <b>capacidad financiera alcanza</b> para el total de camiones (5.000 € más por cada uno nuevo). Y la Administración <b>siempre</b> tiene que autorizarlo.',
      '<b>Cambiar un camión por otro:</b> vendés uno viejo y comprás otro. Lo tiene que autorizar la oficina, que lo anota en su registro, y tu capacidad financiera tiene que alcanzar. En el examen, esa anotación se llama <b>anotación registral</b>.',
      '<b>Ojo:</b> la antigüedad de los camiones no importa. Si una opción dice "si los camiones no pasan de tantos años", está mal. La correcta es la de la <b>capacidad financiera</b> o la de la <b>anotación registral</b>.',
      '<b>Pasarle la autorización a otro dueño.</b> Se puede, pero no de cualquier manera: el nuevo dueño tiene que cumplir los mismos requisitos que cumpliste vos, no puede tener ya una autorización igual, y se tiene que quedar con tus camiones o poner otros que sirvan.<br><b>Ejemplo:</b> te jubilás y querés pasarle la autorización a Pedro. Se puede si Pedro tiene el título de transportista, la plata y es honrado, si Pedro no tiene ya otra autorización igual, y si se queda con tus camiones o pone los suyos.',
      '<b>En el examen:</b> se puede pasar <b>solo si se cumplen determinadas condiciones</b>. Trampa: no alcanza con que los dos estén de acuerdo.',
      '<b>Conseguir viajes para otros transportistas.</b> En el examen esto se llama <b>intermediar</b>: vos conseguís el viaje con el cliente y se lo pasás a otro camionero.<br><b>Ejemplo:</b> Frutas López te pide 2 camiones y vos tenés uno. Le pasás el otro viaje a un compañero. Lo podés hacer en dos casos: si al sacar tu autorización cumpliste requisitos iguales o mayores que los de una agencia de transporte, o si es la colaboración normal entre transportistas que permite la ley. En el examen, a esa agencia la llaman <b>operador de transporte</b>.',
      '<b>En el examen:</b> si aparecen los dos casos, se marca la opción que junta <b>los dos</b>. Si no, la de <b>requisitos iguales o mayores que los del operador de transporte</b>. Nunca "siempre que quiera".'
    ],
    base: CON_TODOS,
    alArrancar: e => e.yaVisible('tarjetaMDPE'),
    vista: 'deposito',
    linea: [
      [0.6, e => e.etiqueta('vos', 'Quiero sumar un camión', 'globo')],
      [2.4, e => e.etiqueta('apolo', 'Se puede si la plata alcanza: 5.000 € más', 'ok')],
      [4.6, e => e.etiqueta('camion', 'Cambiarlo: lo anota la oficina en su registro', 'aviso')]
    ]
  },
  {
    tipo: 'autorizacion',
    titulo: '¿Qué papel de la autorización llevás en el camión?',
    texto: [
      'Te para un inspector en la ruta: ¿qué le mostrás para probar que tenés autorización?',
      '<b>Ningún papel.</b> El inspector busca tu camión por la <b>matrícula</b> en el registro de la Administración y ve si está vinculado a una autorización.',
      '<b>En el examen:</b> "¿Qué documento hay que llevar a bordo?" → <b>Ninguno</b>.',
      'Mirá la carpeta de la cabina: la autorización quedó anotada, pero sin papel.'
    ],
    base: BASE,
    alArrancar: e => e.yaVisible('tarjetaMDPE'),
    vista: 'deposito',
    carpeta: ['autorizacionRegistro'],
    linea: [
      [0.6, e => e.etiqueta('camion', 'NINGÚN papel. Se mira por la matrícula', 'ok')]
    ]
  },
  {
    tipo: 'autorizacion',
    titulo: 'Repaso: la autorización',
    texto: [
      '<b>Es de la empresa:</b> una por empresa, con sus camiones vinculados. No por vehículo ni por viaje.',
      '<b>Letras:</b> MDPE (público, más de 3,5 t) · MDLE (público, hasta 3,5 t) · MPCE (privado complementario, cualquier peso). Sirven en toda España.',
      '<b>Se vinculan los camiones</b> (no remolques): propios, alquilados o en leasing. Sin distintivos.',
      '<b>Público:</b> honorabilidad, título de transportista, 9.000 € + 5.000 € por camión, impuestos al día y 1 camión matriculado en España.',
      '<b>Privado:</b> nada de eso; cumplir lo laboral y social; de 1 vehículo a los que justifique.',
      '<b>Dura:</b> sin plazo, con <b>visado</b> periódico.',
      '<b>Sumar o cambiar camiones:</b> si alcanza la capacidad financiera, con permiso y anotación registral. <b>Pasarla a otro:</b> solo con condiciones.',
      '<b>A bordo:</b> ningún papel.'
    ],
    base: CON_TODOS,
    alArrancar: e => ['tarjetaMDPE', 'tarjetaMDLE', 'tarjetaMPCE'].forEach(n => e.yaVisible(n)),
    vista: 'general',
    carpeta: ['autorizacionRegistro'],
    linea: []
  },
  {
    tipo: 'autorizacion',
    titulo: 'Preguntas oficiales: la autorización',
    texto: [],
    base: CON_TODOS,
    vista: 'general',
    linea: [],
    quiz: true
  }
];
