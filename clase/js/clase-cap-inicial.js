// ==========================================
// EL CAP · CAPÍTULO 2: CÓMO SE SACA (LA CUALIFICACIÓN INICIAL)
// ==========================================

const BASE = ['camion', 'vos', 'empresaCAP', 'sucursal', 'examen', 'profesor', 'examinador'];

export const PASOS_CAP_INICIAL = [
  {
    tipo: 'inicial',
    titulo: 'El curso: ordinario o acelerado',
    texto: [
      'El CAP se saca haciendo un <b>curso</b> y aprobando un <b>examen</b>. A esto se le llama <b>cualificación inicial</b>.',
      'Hay dos formas:<br>• <b>Ordinaria:</b> un curso de <b>280 horas</b> y después el examen.<br>• <b>Acelerada:</b> un curso de <b>140 horas</b> y después el examen.',
      'Dentro del curso hay horas de <b>manejo individual</b>, vos solo con el profesor: <b>20 horas</b> en la ordinaria y <b>10</b> en la acelerada.',
      '<b>¿Hace falta tener el permiso para hacer el curso y el examen?</b> <b>No.</b> Podés hacer el CAP antes de sacar el permiso C.',
      'Los cursos se hacen en <b>empresas CAP</b> autorizadas.'
    ],
    base: BASE,
    vista: 'centro',
    linea: [
      [0.6, e => e.etiqueta('profesor', 'Ordinario: 280 h · Acelerado: 140 h', 'globo')],
      [3.0, e => e.etiqueta('empresaCAP', 'Manejo individual: 20 h ordinario · 10 h acelerado', 'precio')]
    ]
  },
  {
    tipo: 'inicial',
    titulo: '¿Desde qué edad podés manejar?',
    texto: [
      'Depende de cómo sacaste el CAP:',
      '<b>Con el CAP ordinario</b> (280 horas): camiones C y C+E desde los <b>18 años</b>.',
      '<b>Con el CAP acelerado</b> (140 horas): camiones C y C+E desde los <b>21 años</b>, y siempre que tengas el permiso.',
      '<b>Truco:</b> más horas de curso, antes podés empezar.'
    ],
    base: BASE,
    vista: 'centro',
    linea: [
      [0.6, e => e.etiqueta('vos', 'Ordinario: desde 18 · Acelerado: desde 21', 'globo')]
    ]
  },
  {
    tipo: 'inicial',
    titulo: 'El examen',
    texto: [
      '<b>Plazo:</b> cuando terminás el curso tenés como mucho <b>1 año</b> para aprobar el examen.',
      '<b>Cuántas veces:</b> se convoca <b>como mínimo 6 veces al año</b>. Se avisa al menos con un mes de anticipación y el plazo para anotarse es de 15 días o más.',
      '<b>Quién lo organiza:</b> la oficina que da las autorizaciones de transporte en cada lugar, o sea, <b>Transportes</b>. No Tráfico.',
      '<b>Dónde te podés presentar:</b> donde hiciste el curso, donde vivís o donde está tu empresa. Las tres valen.',
      '<b>Si aprobás:</b> te dan la <b>tarjeta de cualificación del conductor</b>.'
    ],
    base: BASE,
    vista: 'examen',
    linea: [
      [0.6, e => e.etiqueta('examinador', 'Examen: al menos 6 veces al año', 'globo')],
      [3.0, e => e.mostrar('tarjetaCAP')],
      [3.3, e => e.etiqueta('examen', 'Aprobaste: tarjeta de cualificación', 'ok')]
    ]
  },
  {
    tipo: 'inicial',
    titulo: 'Formación que se puede descontar y puntos del carnet',
    texto: [
      '<b>Si ya hiciste otros cursos</b>, se pueden contar como parte del curso inicial del CAP:<br>• el de <b>mercancías peligrosas</b>;<br>• el de <b>transporte de animales</b>;<br>• el de <b>derechos de los viajeros con discapacidad</b>.<br>La condición: que los hayas hecho en los <b>12 meses anteriores</b> a empezar el curso CAP.',
      'En los cursos de formación continua también se pueden contar los de mercancías peligrosas y de animales.',
      '<b>Puntos del carnet:</b> con el curso CAP podés recuperar <b>hasta 6 puntos</b> perdidos. Para eso tenés que aprobar la parte de <b>sensibilización y educación vial</b> del curso, y tu permiso tiene que estar <b>vigente</b>.'
    ],
    base: BASE,
    vista: 'centro',
    linea: [
      [0.6, e => e.etiqueta('vos', 'Recupero hasta 6 puntos del carnet', 'globo')]
    ]
  },
  {
    tipo: 'inicial',
    titulo: 'Repaso: cómo se saca',
    texto: [
      '<b>Curso + examen.</b> Ordinario 280 h (20 de manejo). Acelerado 140 h (10 de manejo).',
      '<b>No hace falta el permiso</b> para hacer el curso ni el examen.',
      '<b>Edad:</b> ordinario desde 18; acelerado desde 21.',
      '<b>Examen:</b> como mucho 1 año después del curso. Al menos 6 veces al año. Lo organiza Transportes. Te presentás donde hiciste el curso, donde vivís o donde está tu empresa.',
      '<b>Otros cursos</b> de los últimos 12 meses se descuentan. <b>Hasta 6 puntos</b> del carnet.'
    ],
    base: BASE,
    vista: 'general',
    carpeta: ['cap', 'tarjeta'],
    linea: []
  },
  {
    tipo: 'inicial',
    titulo: 'Preguntas oficiales: cómo se saca',
    texto: [],
    base: BASE,
    vista: 'general',
    linea: [],
    quiz: true
  }
];
