// ==========================================
// CAPÍTULO 1: AUTÓNOMO (empresario individual)
// ==========================================

const P = {
  globo: t => e => e.etiqueta('globo', t, 'globo'),
  sinGlobo: e => e.etiqueta('globo', null)
};

export const PASOS_AUTONOMO = [
  {
    tipo: null,
    titulo: "Querés tu propia empresa",
    texto: [
      "Imaginá que querés tener <b>tu propia empresa de transporte</b>. Tenés tu casa, tu auto y una idea.",
      "Antes de arrancar tenés que elegir <b>qué tipo de empresa</b> armar. En el examen aparecen 5: <b>autónomo</b>, <b>sociedad anónima</b>, <b>sociedad limitada</b>, <b>sociedad laboral</b> y <b>cooperativa</b>.",
      "Cada una tiene sus reglas y su propio capítulo en los botones de arriba. Empezamos por la más simple: el <b>autónomo</b>."
    ],
    base: ['persona', 'casa', 'auto'],
    vista: 'general',
    linea: [
      [0.3, e => e.pensar(true)],
      [0.5, P.globo('Quiero mi propia empresa de transporte… ¿cómo la armo?')]
    ]
  },
  {
    tipo: 'autonomo',
    titulo: "AUTÓNOMO: ¿por qué alguien elige esto?",
    texto: [
      "Ser <b>autónomo</b> es trabajar por tu cuenta, solo.",
      "En el examen lo vas a ver con otro nombre: <b>empresario individual</b>. Es lo mismo.",
      "<b>¿Por qué alguien lo elegiría?</b> Es lo más fácil y barato para arrancar. No tenés jefe: decidís todo vos. No necesitás socios.",
      "Y la ley no te pide una plata mínima para empezar: arrancás con lo que tengas."
    ],
    base: ['persona', 'casa', 'auto'],
    vista: 'general',
    linea: [
      [0.2, e => e.pensar(true)],
      [0.3, P.globo('Quiero ser AUTÓNOMO: solo yo, sin jefes')],
      [1.0, e => e.mostrar('empresa')],
      [1.8, e => e.mostrar('camion')],
      [2.6, e => e.pensar(false)]
    ]
  },
  {
    tipo: 'autonomo',
    titulo: "Vos y tu empresa son LO MISMO",
    texto: [
      "Esto es lo más importante del autónomo: para la ley, <b>vos y tu negocio son la misma persona</b>.",
      "No hay nada que separe tu casa y tu auto de tu empresa. Lo tuyo y lo del negocio están juntos."
    ],
    base: ['persona', 'casa', 'auto', 'empresa', 'camion'],
    vista: 'general',
    linea: [
      [0.6, e => e.mostrar('linea')],
      [1.4, e => e.mostrar('linea', false)],
      [1.8, e => e.etiqueta('pared', 'Sin separación: lo tuyo y lo de la empresa es lo mismo', 'aviso')]
    ]
  },
  {
    tipo: 'autonomo',
    titulo: "¿Y si al negocio le va mal?",
    texto: [
      "Al negocio le va mal y queda debiendo <b>100.000 €</b> que no puede pagar.",
      "Como vos y tu negocio son lo mismo, respondés con <b>todo lo tuyo</b>: te pueden sacar la casa y el auto para pagar la deuda.",
      "Casa 80.000 € + auto 20.000 € = 100.000 €. Te quedás sin nada."
    ],
    base: ['persona', 'casa', 'auto', 'empresa', 'camion'],
    vista: 'general',
    linea: [
      [0.6, e => e.etiqueta('deuda', 'DEUDA: 100.000 €', 'deuda')],
      [1.8, e => e.etiqueta('casa', 'Casa: 80.000 €', 'precio')],
      [2.6, e => e.etiqueta('auto', 'Auto: 20.000 €', 'precio')],
      [3.6, P.globo('¡No! ¡Mi casa no!')],
      [4.6, e => { e.llevarse('casa'); e.etiqueta('casa', null); }],
      [5.2, e => { e.llevarse('auto'); e.etiqueta('auto', null); }],
      [6.4, e => e.etiqueta('deuda', 'Deuda pagada… con tu casa y tu auto', 'aviso')]
    ]
  },
  {
    tipo: 'autonomo',
    titulo: "Las palabras del examen: autónomo",
    texto: [
      "Responde de sus deudas con <b>todo su patrimonio</b>. Patrimonio = todo lo que tenés: lo del negocio y lo personal. Por eso el examen dice que responde con <b>el 100% de su patrimonio</b>.",
      "A eso se le llama responsabilidad <b>ilimitada</b>, o sea, sin límite.",
      "<b>Impuestos:</b> el autónomo paga el <b>IRPF</b>, el Impuesto sobre la Renta de las Personas Físicas. Es el impuesto que paga cualquier persona por lo que gana, como un trabajador por su sueldo. Lo paga porque para la ley el autónomo es una persona, no una sociedad. Las sociedades pagan otro: el Impuesto de Sociedades.",
      "<b>En el examen:</b> \"Un empresario individual responde de sus obligaciones con…\" → <b>el 100% de su patrimonio</b>. Y \"El empresario individual…\" → <b>debe tributar por el IRPF</b>. Tributar quiere decir pagar impuestos."
    ],
    base: ['persona', 'empresa', 'camion'],
    vista: 'general',
    linea: [
      [0.4, P.globo('Ahora entiendo: me juego todo lo mío')]
    ]
  },
  {
    tipo: 'autonomo',
    titulo: "Repaso: el autónomo",
    texto: [
      "<b>Autónomo</b> = empresario individual. Trabaja por su cuenta y no necesita plata mínima para arrancar.",
      "Para la ley, <b>vos y tu negocio son lo mismo</b>: respondés con el 100% de tu patrimonio. Responsabilidad <b>ilimitada</b>.",
      "Paga el <b>IRPF</b>, el impuesto de las personas.",
      "En el capítulo siguiente vas a ver cómo una sociedad protege tu casa: la <b>sociedad anónima</b>."
    ],
    base: ['persona', 'casa', 'auto', 'empresa', 'camion'],
    vista: 'general',
    linea: []
  },
  {
    tipo: 'autonomo',
    titulo: "Preguntas oficiales: autónomo",
    texto: [],
    base: ['persona', 'casa', 'auto', 'empresa', 'camion'],
    vista: 'general',
    linea: [],
    quiz: true
  }
];
