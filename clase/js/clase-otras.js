// ==========================================
// CAPÍTULO 6: OTRAS SOCIEDADES
// Colectiva, comanditaria simple, comanditaria por acciones y SGR.
// Información básica: en el examen solo aparecen como opción falsa.
// ==========================================

const TODOS = ['persona', 'socio2', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared'];

export const PASOS_OTRAS = [
  {
    tipo: 'otras',
    titulo: 'Otras sociedades: lo básico',
    texto: [
      'Hay otras clases de sociedades que casi no aparecen en el examen: la <b>colectiva</b>, la <b>comanditaria simple</b>, la <b>comanditaria por acciones</b> y la <b>sociedad de garantía recíproca</b> (SGR).',
      '<b>Dato real:</b> revisamos 378 exámenes oficiales de Mercancías, con 33.525 preguntas en total. Estas sociedades aparecen en 49, o sea el <b>0,15%</b>. Y <b>nunca</b> como pregunta: siempre como una <b>opción falsa</b> para confundir.',
      'Por eso acá va solo lo básico, para que las reconozcas cuando aparezcan entre las opciones y sepas que <b>no son la correcta</b>.'
    ],
    base: TODOS,
    vista: 'general',
    linea: [
      [0.6, e => e.etiqueta('deuda', 'En el examen: solo como opción falsa', 'aviso')]
    ]
  },
  {
    tipo: 'otras',
    titulo: 'La sociedad colectiva',
    texto: [
      'Hacen falta <b>al menos 2 socios</b>.',
      'Los socios responden por las deudas <b>con todo lo suyo</b>: su casa, su auto, sus ahorros. No hay pared entre lo de la empresa y lo de cada socio. En el examen: responsabilidad <b>ilimitada</b>.',
      '<b>Ejemplo:</b> vos y Pedro arman una colectiva. La empresa debe 50.000 € y no tiene con qué pagar. Entonces pagan ustedes con lo suyo. Y si Pedro no tiene nada, te pueden cobrar todo a vos.',
      'En el examen dicen que la responsabilidad es <b>personal, ilimitada, solidaria y subsidiaria</b>. Subsidiaria quiere decir que primero paga la empresa y, si no alcanza, pagan los socios.'
    ],
    base: ['persona', 'socio2', 'casa', 'auto', 'empresa', 'camion', 'linea'],
    vista: 'general',
    linea: [
      [0.6, e => e.etiqueta('pared', 'Sin pared: responden con todo lo suyo', 'deuda')],
      [2.8, e => e.etiqueta('casa', 'La casa también paga', 'aviso')]
    ]
  },
  {
    tipo: 'otras',
    titulo: 'La sociedad comanditaria simple',
    texto: [
      'Tiene <b>dos clases de socios</b>:',
      '<b>Socios colectivos:</b> manejan la empresa y responden con <b>todo lo suyo</b>, igual que en la colectiva.',
      '<b>Socios comanditarios:</b> solo ponen plata. No manejan la empresa y solo pueden perder <b>lo que pusieron</b>.',
      '<b>Ejemplo:</b> vos manejás la empresa: sos socio colectivo. Tu tío pone 20.000 € pero no se mete en nada: es socio comanditario. Si la empresa quiebra, tu tío pierde sus 20.000 € y nada más. Vos respondés con tu casa y tu auto.'
    ],
    base: TODOS,
    vista: 'general',
    linea: [
      [0.6, e => e.etiqueta('persona', 'Colectivo: manejo y respondo con todo', 'deuda')],
      [2.8, e => e.etiqueta('socio2', 'Comanditario: pongo plata, solo pierdo eso', 'ok')]
    ]
  },
  {
    tipo: 'otras',
    titulo: 'La sociedad comanditaria por acciones',
    texto: [
      'Es como la comanditaria simple, pero la plata de los socios está dividida en <b>acciones</b>, como en la Sociedad Anónima.',
      'Al menos uno de los socios maneja la empresa y responde con <b>todo lo suyo</b>. Los demás solo arriesgan lo que pusieron en acciones.',
      '<b>Ejemplo:</b> vos manejás la empresa y respondés con todo. Pedro y Ana compran acciones y solo pueden perder lo que pagaron por ellas.'
    ],
    base: TODOS,
    vista: 'general',
    linea: [
      [0.6, e => e.etiqueta('deuda', 'Capital en ACCIONES + un socio que responde con todo', 'precio')]
    ]
  },
  {
    tipo: 'otras',
    titulo: 'La sociedad de garantía recíproca (SGR)',
    texto: [
      'Sirve para que las empresas chicas consigan <b>préstamos</b>. La SGR le da al banco una garantía: si la empresa no paga, paga la SGR. Esa garantía se llama <b>aval</b>.',
      '<b>Ejemplo:</b> querés un préstamo para comprar un camión y el banco no te lo da porque tu empresa es chica. La SGR te avala y el banco te presta.',
      '<b>Truco:</b> SGR = avales.'
    ],
    base: TODOS,
    vista: 'empresa',
    linea: [
      [0.6, e => e.etiqueta('deuda', 'SGR: te avala para que el banco te preste', 'ok')]
    ]
  },
  {
    tipo: 'otras',
    titulo: 'Repaso: otras sociedades',
    texto: [
      '<b>Colectiva:</b> mínimo 2 socios, responden con todo lo suyo.',
      '<b>Comanditaria simple:</b> colectivos (manejan y responden con todo) y comanditarios (ponen plata y solo pierden eso).',
      '<b>Comanditaria por acciones:</b> igual, pero con el capital en acciones.',
      '<b>SGR:</b> da avales para que las empresas chicas consigan préstamos.',
      '<b>En el examen:</b> si una de estas aparece entre las opciones, casi seguro que es la falsa.'
    ],
    base: TODOS,
    vista: 'general',
    linea: []
  },
  {
    tipo: 'otras',
    titulo: 'Preguntas oficiales donde aparecen',
    texto: [],
    base: TODOS,
    vista: 'general',
    linea: [],
    quiz: true
  }
];
