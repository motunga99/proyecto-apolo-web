// ==========================================
// EL CAP · CAPÍTULO 4: LAS EMPRESAS CAP
// ==========================================

const BASE = ['camion', 'vos', 'empresaCAP', 'sucursal', 'examen', 'profesor', 'aulaMovil'];

export const PASOS_CAP_EMPRESAS = [
  {
    tipo: 'empresas',
    titulo: 'Las empresas CAP y sus cursos',
    texto: [
      'Las empresas autorizadas para dar los cursos del CAP se llaman <b>empresas CAP</b>.',
      '<b>Antes de dar un curso</b>, lo tienen que hacer <b>homologar</b>, o sea, aprobar, por la Administración que les dio la autorización. Siempre.',
      '<b>Esa homologación</b> no vence mientras no cambien el curso, y sirve para dar ese curso en <b>todos sus centros</b>, también en las sucursales y aulas móviles.',
      '<b>Por cada curso</b> tienen que <b>avisar</b> a la Administración que lo van a dar, y avisar si después algo cambia. No tienen que pedir permiso para cada uno.',
      '<b>Si piden la autorización</b> para ser empresa CAP y en <b>3 meses</b> no les contestan, se entiende que se la <b>negaron</b>. A eso se le dice silencio administrativo.'
    ],
    base: BASE,
    vista: 'centro',
    linea: [
      [0.6, e => e.etiqueta('empresaCAP', 'Cursos homologados · aviso de cada curso', 'ok')]
    ]
  },
  {
    tipo: 'empresas',
    titulo: 'Sucursales y aulas móviles',
    texto: [
      '<b>Sucursal en otra Comunidad Autónoma:</b> si la empresa quiere abrir un segundo centro en otra comunidad, tiene que <b>avisar</b> a esa comunidad que abre una sucursal. No necesita otra autorización.',
      '<b>Curso en esa sucursal:</b> se avisa a la Administración del lugar donde está la sucursal.',
      '<b>Aula móvil:</b> es un camión o remolque preparado como aula. Para usarla, la empresa tiene que <b>avisar</b> que la va a usar. Si da un curso con el aula móvil en otra comunidad, avisa a la Administración del lugar donde se da el curso.',
      '<b>Controles:</b> la Administración revisa <b>al menos cada 5 años</b> que la empresa, sus sucursales y sus aulas móviles sigan cumpliendo todo. No solo cuando hay denuncias.'
    ],
    base: BASE,
    vista: 'centro',
    linea: [
      [0.6, e => e.etiqueta('sucursal', 'Sucursal en otra comunidad: se avisa', 'precio')],
      [3.0, e => e.etiqueta('aulaMovil', 'Aula móvil: se avisa que se va a usar', 'aviso')]
    ]
  },
  {
    tipo: 'empresas',
    titulo: 'Durante y después del curso',
    texto: [
      '<b>Faltas:</b> un alumno queda <b>afuera del curso</b> si falta al <b>5% o más</b> de las horas, sean de teoría o de práctica.<br><b>Ejemplo:</b> en un curso de 140 horas, faltar 7 horas ya es el 5%.',
      '<b>Al terminar</b>, la empresa:<br>• le da a <b>cada alumno que lo aprobó</b> un certificado de que hizo la formación;<br>• le manda a la Administración la <b>lista de los que lo aprobaron</b>.<br>La empresa no da el CAP: el CAP lo da Transportes con el examen.',
      '<b>Suspensión de 6 meses</b> de la autorización de la empresa, si en una inspección se ve que:<br>• el <b>profesor</b> no es el que se avisó;<br>• la <b>materia</b> que se da no es la que se avisó;<br>• falta sin justificar entre el <b>25% y el 50%</b> de los alumnos.'
    ],
    base: BASE,
    vista: 'centro',
    linea: [
      [0.6, e => e.etiqueta('profesor', 'Si faltás al 5% de las horas, quedás afuera', 'deuda')]
    ]
  },
  {
    tipo: 'empresas',
    titulo: 'Repaso: las empresas CAP',
    texto: [
      '<b>Empresas CAP:</b> dan los cursos. Cursos homologados siempre, sin vencimiento, válidos en todos sus centros.',
      '<b>Por cada curso:</b> avisar y avisar los cambios. <b>Sin respuesta en 3 meses:</b> negada.',
      '<b>Sucursal o aula móvil en otra comunidad:</b> se avisa a esa comunidad.',
      '<b>Controles:</b> al menos cada 5 años, empresa, sucursales y aulas.',
      '<b>Alumno:</b> afuera si falta al 5%. <b>Al terminar:</b> certificado a cada uno y lista a la Administración.',
      '<b>Suspensión 6 meses:</b> profesor o materia distintos, o 25-50% de faltas sin justificar.'
    ],
    base: BASE,
    vista: 'general',
    linea: []
  },
  {
    tipo: 'empresas',
    titulo: 'Preguntas oficiales: las empresas CAP',
    texto: [],
    base: BASE,
    vista: 'general',
    linea: [],
    quiz: true
  }
];
