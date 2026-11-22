// ==========================================
// EL CAP · CAPÍTULO 3: LA TARJETA Y LA FORMACIÓN CONTINUA
// ==========================================

const BASE = ['camion', 'vos', 'empresaCAP', 'sucursal', 'examen', 'calendario'];

export const PASOS_CAP_CONTINUA = [
  {
    tipo: 'continua',
    titulo: 'La tarjeta de cualificación',
    texto: [
      'La <b>tarjeta de cualificación del conductor</b> se da en dos momentos:<br>• cuando <b>aprobás el examen</b> del CAP inicial;<br>• cuando <b>terminás el curso de formación continua</b>, para renovarla.',
      'Dura <b>como mucho 5 años</b>. Mirá el calendario: a los 5 años hay que renovarla.'
    ],
    base: BASE,
    vista: 'general',
    linea: [
      [0.4, e => e.mostrar('tarjetaCAP')],
      [0.8, e => e.anios(1)], [1.6, e => e.anios(2)], [2.4, e => e.anios(3)], [3.2, e => e.anios(4)], [4.0, e => e.anios(5)],
      [4.4, e => e.etiqueta('calendario', 'La tarjeta dura 5 años', 'precio')]
    ]
  },
  {
    tipo: 'continua',
    titulo: 'La formación continua: 35 horas cada 5 años',
    texto: [
      'Para renovar la tarjeta hay que hacer un curso de <b>formación continua</b> de <b>35 horas</b>, <b>al menos cada 5 años</b>. Los 5 años se cuentan desde que sacaste el CAP inicial.',
      '<b>¿Para qué sirve?</b> Para <b>actualizar y repasar</b> lo que aprendiste, poniendo el foco en la seguridad en la ruta, la salud y la seguridad en el trabajo, y en contaminar menos. No es para sacar el permiso ni para cuidar el camión.',
      '<b>¿Hay examen al final?</b> <b>No.</b> La formación continua no tiene examen.',
      '<b>¿Cómo es el curso?</b> Tiene que tener <b>clases presenciales</b> y formación práctica. Usar camiones en el curso no es obligatorio.',
      '<b>¿Dónde?</b> En los centros de las <b>empresas CAP</b> autorizadas.'
    ],
    base: BASE,
    alArrancar: e => { e.yaVisible('tarjetaCAP'); e.anios(5); },
    vista: 'general',
    linea: [
      [0.6, e => e.etiqueta('calendario', 'Año 5: curso de 35 horas, sin examen', 'aviso')]
    ]
  },
  {
    tipo: 'continua',
    titulo: '¿Se puede hacer en partes?',
    texto: [
      '<b>Sí</b>, las 35 horas se pueden hacer en varias partes, si:<br>• las da <b>la misma empresa</b>;<br>• se hacen dentro del <b>mismo año</b> (de enero a diciembre);<br>• ninguna parte dura <b>menos de 7 horas</b>. Una parte de 7 horas se puede repartir en dos días seguidos.',
      '<b>Ejemplo:</b> hacés 7 horas en marzo, 14 en junio y 14 en octubre, todo en la misma empresa y el mismo año. Vale.',
      'También se puede hacer todo junto, en un solo período de 35 horas.',
      '<b>Trampa:</b> no vale hacerlo en partes repartidas en varios años.'
    ],
    base: BASE,
    alArrancar: e => e.anios(5),
    vista: 'centro',
    linea: [
      [0.6, e => e.etiqueta('empresaCAP', 'Partes de 7 horas o más · misma empresa · mismo año', 'precio')]
    ]
  },
  {
    tipo: 'continua',
    titulo: '¿Quién la tiene que hacer?',
    texto: [
      'Es obligatoria para los que tienen los permisos <b>C1, C1+E, C y C+E</b>, y también <b>D1, D1+E, D y D+E</b>.',
      '<b>¿Y si manejás camión y también autobús?</b> Con <b>un solo curso</b> alcanza, para una de las dos clases.',
      '<b>En España la hacen</b> los que <b>viven</b> en España y los que <b>trabajan</b> en España. No depende de la nacionalidad.',
      '<b>Si dejaste de trabajar</b> y tu tarjeta ya venció, antes de volver tenés que hacer un curso de <b>formación continua</b>.'
    ],
    base: BASE,
    alArrancar: e => e.anios(5),
    vista: 'general',
    linea: [
      [0.6, e => e.etiqueta('vos', 'Camión y autobús: con un curso alcanza', 'globo')]
    ]
  },
  {
    tipo: 'continua',
    titulo: '¿Desde cuándo cuenta la tarjeta nueva?',
    texto: [
      'Cuando hacés el curso te dan una tarjeta nueva. ¿Desde cuándo se cuentan sus 5 años?',
      '<b>Si hacés el curso en los 12 meses antes de que venza</b> la tarjeta vieja: los 5 años empiezan cuando <b>vence la vieja</b>. No perdés tiempo.<br><b>Ejemplo:</b> tu tarjeta vence en diciembre de 2027 y hacés el curso en junio de 2027. La nueva vale hasta diciembre de 2032.',
      '<b>Si lo hacés antes de esos 12 meses:</b> los 5 años empiezan el día que <b>aprobás el curso</b>.',
      'Por eso, en el examen, la respuesta es la que junta esas dos: <b>A y C</b>.'
    ],
    base: BASE,
    alArrancar: e => { e.yaVisible('tarjetaCAP'); e.anios(5); },
    vista: 'general',
    linea: [
      [0.6, e => e.etiqueta('calendario', 'Curso en el último año: la nueva cuenta desde que vence la vieja', 'ok')]
    ]
  },
  {
    tipo: 'continua',
    titulo: 'Repaso: tarjeta y formación continua',
    texto: [
      '<b>Tarjeta:</b> al aprobar el examen inicial o al terminar la formación continua. Dura como mucho 5 años.',
      '<b>Formación continua:</b> 35 horas al menos cada 5 años, desde el CAP inicial. Sin examen. Clases presenciales. En empresas CAP.',
      '<b>En partes:</b> misma empresa, mismo año, partes de 7 horas o más.',
      '<b>Quién:</b> C y D. Camión y autobús: un solo curso. En España: los que viven o trabajan acá.',
      '<b>Tarjeta nueva:</b> si el curso fue en el último año, cuenta desde que vence la vieja; si no, desde el curso.'
    ],
    base: BASE,
    alArrancar: e => { e.yaVisible('tarjetaCAP'); e.anios(5); },
    vista: 'general',
    carpeta: ['cap', 'tarjeta'],
    linea: []
  },
  {
    tipo: 'continua',
    titulo: 'Preguntas oficiales: tarjeta y formación continua',
    texto: [],
    base: ['camion', 'vos', 'empresaCAP'],
    vista: 'general',
    linea: [],
    quiz: true
  }
];
