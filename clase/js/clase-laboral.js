// ==========================================
// CAPÍTULO 3: SOCIEDAD LABORAL
// Una SA o una SL donde los dueños son los trabajadores.
// Lo que es DISTINTO a la SA y a la SL va marcado en naranja.
// ==========================================

const DIF = '<span class="badge-dif">≠ DISTINTO A LA SA Y LA SL</span> ';
const IGUAL = '<span class="badge-igual">= IGUAL QUE LA SA Y LA SL</span> ';
const d = t => `<span class="distinto">${t}</span>`;

const TODOS = ['persona', 'socio2', 'socio3', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared'];
const TODOS_MESA = [...TODOS, 'mesa'];
const repartidas = e => e.acciones('repartidas', true);
const conductores = e => e.etiqueta('mesa', 'Los 3 son conductores y socios', 'precio');

export const PASOS_LABORAL = [
  {
    tipo: 'laboral',
    titulo: 'Ahora: la SOCIEDAD LABORAL',
    texto: [
      '<b>Vida real:</b> vos y dos compañeros son <b>conductores</b> en una empresa de camiones. El dueño se jubila y quiere cerrar. Ustedes dicen: "¿y si la compramos <b>nosotros</b> y seguimos trabajando?".',
      'Así nace una <b>sociedad laboral</b>: una empresa donde <b>los dueños son los mismos que trabajan</b> en ella.',
      '<b>¿Por qué alguien la elegiría?</b> Para no perder el trabajo, para ser su propio jefe entre compañeros, y porque la ley la promueve: puede tener ayudas.',
      '<b>Ojo, no es un tipo nuevo:</b> una sociedad laboral es una <b>SA</b> o una <b>SL</b> que además cumple unas reglas extra. Las reglas extra te las marco <b>en naranja</b>.',
      '<b>En el examen:</b> "¿Cómo tienen que ser las sociedades laborales?" → <b>anónimas o de responsabilidad limitada</b>. Y una empresa de transporte de mercancías puede ser SA, SL o laboral: <b>todas son correctas</b>.'
    ],
    base: ['persona', 'socio2', 'socio3', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared'],
    vista: 'general',
    linea: [
      [0.6, e => e.etiqueta('globo', 'Si el dueño cierra, ¿y si la compramos nosotros?', 'globo')],
      [3.0, e => { e.etiqueta('globo', null); conductores(e); }],
      [4.4, e => e.etiqueta('deuda', 'SOCIEDAD LABORAL = SA o SL de sus trabajadores', 'ok')]
    ]
  },
  {
    tipo: 'laboral',
    titulo: 'El sello de "laboral": la calificación',
    texto: [
      IGUAL + 'Se arma igual que una SA o una SL: notario, escritura, <b>Registro Mercantil</b>, responsabilidad <b>limitada</b>. Todo lo que viste sigue valiendo.',
      DIF + 'Pero para ser laboral necesita ' + d('un sello extra') + '. En el examen se llama <b>calificación</b>: alguien tiene que revisar que cumple las reglas y decir "sí, esta es laboral".',
      '<b>¿Quién pone el sello?</b> La <b>Comunidad Autónoma</b> (Madrid, Cataluña, Andalucía…). La ley dice que lo pone el Ministerio de empleo o la Comunidad Autónoma que tenga ese trabajo a su cargo. Hoy casi todas las comunidades lo tienen, por eso en la práctica lo pone la Comunidad Autónoma.',
      '<b>Trampas del examen:</b> el sello <b>no</b> lo da el Registro Mercantil ni el Ministerio de Justicia. Y es falso "el Ministerio de empleo <b>en todos los casos</b>".',
      '<b>Regla fácil:</b> si está la opción "Ministerio de empleo <b>o</b> Comunidad Autónoma", marcá esa. Si no está, marcá <b>Comunidad Autónoma</b>.'
    ],
    base: TODOS,
    alArrancar: conductores,
    vista: 'empresa',
    linea: [
      [0.6, e => e.etiqueta('escritura', 'Escritura + Registro Mercantil (como SA o SL)', 'aviso')],
      [2.6, e => e.etiqueta('registro', 'SELLO de LABORAL: lo pone la Comunidad Autónoma', 'ok')]
    ]
  },
  {
    tipo: 'laboral',
    titulo: 'Más de la mitad del capital es de los trabajadores',
    texto: [
      DIF + 'La regla más importante: ' + d('más de la mitad (más del 50%) del capital tiene que ser de los trabajadores') + ' de la empresa. Por eso se llama <b>laboral</b>: de los que trabajan.',
      '<b>Trabajadores</b> quiere decir socios que trabajan ahí con <b>contrato indefinido</b>: un contrato fijo, sin fecha de fin. <b>Ejemplo:</b> un chofer que contrataron solo para el verano tiene contrato temporal, así que no cuenta.',
      '<b>¿Puede haber un socio que no trabaje ahí?</b> Sí. <b>Ejemplo:</b> tu tío pone plata pero no maneja camiones.',
      '<b>Hagamos la cuenta:</b> vos, Pedro y Ana (los 3 conductores) ponen 20.000 € cada uno = <b>60.000 €</b>. El tío pone <b>20.000 €</b>. Total: 80.000 €. Los trabajadores tienen 60.000 de 80.000: <b>más de la mitad ✔</b>.',
      '<b>¿Y si el tío quisiera poner 60.000 € o más?</b> Ahí los trabajadores ya <b>no</b> tendrían más de la mitad ✘. No se puede: la plata de los que no trabajan siempre tiene que ser <b>menos</b> que la de los trabajadores.',
      '<b>En el examen:</b> "¿En qué sociedad más del 50% del capital es de los trabajadores?" → en las <b>sociedades laborales</b>.'
    ],
    base: ['persona', 'socio2', 'socio3', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared', 'monedas'],
    alArrancar: conductores,
    vista: 'socios',
    linea: [
      [0.6, e => e.etiqueta('monedas', 'Conductores: 20.000 + 20.000 + 20.000 = 60.000 €', 'grande')],
      [2.8, e => e.mostrar('socio4')],
      [3.2, e => e.etiqueta('socio4', 'Soy el tío: pongo 20.000 € pero no trabajo acá', 'globo')],
      [5.4, e => e.etiqueta('monedas', 'Trabajadores 60.000 de 80.000 = más de la mitad ✔', 'grande')]
    ]
  },
  {
    tipo: 'laboral',
    titulo: 'Mínimo 3 socios',
    texto: [
      DIF + 'La SA y la SL se pueden hacer con <b>un solo socio</b>. La laboral, no: necesita ' + d('como mínimo 3 socios') + '.',
      '<b>¿Por qué?</b> Porque la idea es que sea una empresa <b>de varios compañeros</b>, no de una sola persona.',
      '<b>En el examen:</b> "¿Número mínimo de socios de una sociedad laboral?" → <b>3</b>. Y "¿Qué sociedad necesita normalmente como mínimo tres socios?" → las <b>sociedades laborales</b>.'
    ],
    base: ['persona', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared'],
    vista: 'socios',
    linea: [
      [0.6, e => e.etiqueta('persona', 'Yo solo no puedo: hacen falta 3', 'globo')],
      [2.4, e => { e.mostrar('socio2'); e.mostrar('socio3'); }],
      [3.2, e => e.etiqueta('mesa', 'Sociedad laboral: mínimo 3 socios', 'ok')]
    ]
  },
  {
    tipo: 'laboral',
    titulo: 'Nadie puede tener más de un tercio',
    texto: [
      DIF + 'Normalmente ' + d('ningún socio puede tener más de la tercera parte del capital') + '. Un tercio es lo que te toca si dividís en 3 partes iguales.',
      '<b>Con los números de siempre no se puede:</b> en la SA, uno puso 40.000 € de 60.000 €. Eso es <b>más de un tercio</b> (un tercio de 60.000 € son 20.000 €). Como laboral, <b>no vale</b>.',
      '<b>¿Cómo sí?</b> Por ejemplo, <b>20.000 € cada uno</b>: 20.000 + 20.000 + 20.000 = 60.000 €. Nadie pasa del tercio.',
      '<b>¿Por qué esta regla?</b> Para que <b>nadie se convierta en el patrón</b> que manda solo. La empresa es de los compañeros, parejo.',
      '<b>La única excepción:</b> las <b>entidades públicas</b> (el Estado, las Comunidades Autónomas y los ayuntamientos) sí pueden tener más. Y la regla vale para todos los socios, trabajen ahí o no.'
    ],
    base: ['persona', 'socio2', 'socio3', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared', 'monedas'],
    vista: 'socios',
    linea: [
      [0.6, e => e.etiqueta('persona', 'Pongo 40.000 €', 'precio')],
      [1.8, e => e.etiqueta('monedas', '40.000 € de 60.000 € = más de un tercio ✘', 'deuda')],
      [4.0, e => {
        e.etiqueta('persona', '20.000 €', 'precio');
        e.etiqueta('socio2', '20.000 €', 'precio');
        e.etiqueta('socio3', '20.000 €', 'precio');
      }],
      [5.2, e => e.etiqueta('monedas', '20.000 € cada uno: nadie pasa del tercio ✔', 'grande')]
    ]
  },
  {
    tipo: 'laboral',
    titulo: 'Si alguien pasa el tercio, pierde el sello',
    texto: [
      '¿Qué pasa si después un socio compra más y pasa a tener <b>más de la tercera parte</b>?',
      'La empresa <b>pierde el sello de laboral</b>. En el examen se dice que <b>pierde la calificación</b>. No desaparece: sigue siendo una SA o una SL común, pero ya no es laboral.',
      '<b>Ejemplo:</b> una laboral de 5 socios trabajadores. Uno le compra su parte a otro y queda con más de un tercio → <b>deja de ser laboral</b>.',
      '<b>Trampas del examen:</b> no pierde el sello por tener muchos socios ni por tener mucho capital. Solo por esto: <b>un socio (que no sea entidad pública) con más de un tercio</b>.'
    ],
    base: TODOS,
    alArrancar: conductores,
    vista: 'socios',
    linea: [
      [0.6, e => e.etiqueta('socio2', 'Le compro su parte: ahora tengo más de un tercio', 'globo')],
      [2.8, e => e.etiqueta('registro', 'Pierde el sello: ya NO es laboral', 'deuda')]
    ]
  },
  {
    tipo: 'laboral',
    titulo: 'Acciones de clase laboral y de clase general',
    texto: [
      'En la laboral, las acciones se separan en <b>dos clases</b>, según quién las tiene:',
      '<b>Clase laboral</b> = las de los <b>socios que trabajan</b> en la empresa, como ustedes tres.<br><b>Clase general</b> = las de los <b>socios que no trabajan</b> ahí, como el tío.',
      '<b>¿Para qué?</b> Para saber siempre cuánto capital tienen los trabajadores y controlar que sea <b>más de la mitad</b>.',
      '<b>Trampa del examen:</b> "¿En qué sociedad las <b>acciones</b> pueden ser de clase laboral y de clase general?" → en las <b>sociedades anónimas laborales</b>. ¿Por qué anónima? Porque dice <b>acciones</b>, y las acciones son de la SA. La limitada laboral tiene participaciones.',
      '<b>Y otra regla:</b> en la sociedad anónima laboral, las acciones son <b>siempre nominativas</b>, o sea, con el nombre del dueño. ¿Por qué? Porque hay que saber siempre quién es trabajador y quién no, para controlar que nadie pase del tercio y que los trabajadores tengan más del 50%.',
      '<b>En el examen:</b> "¿Cómo <b>pueden</b> ser las acciones de una sociedad anónima laboral?" → <b>de clase laboral y de clase general</b>. Y "¿Cómo <b>podrán</b> ser?", con opciones de nominativas o al portador → <b>nominativas, siempre</b>.'
    ],
    base: TODOS,
    alArrancar: e => { repartidas(e); e.mostrar('socio4'); },
    vista: 'socios',
    linea: [
      [0.6, conductores],
      [1.2, e => e.etiqueta('mesa', 'Conductores: clase LABORAL', 'ok')],
      [2.8, e => e.etiqueta('socio4', 'Yo no trabajo acá: clase GENERAL', 'aviso')]
    ]
  },
  {
    tipo: 'laboral',
    titulo: 'Si un socio vende: primero los trabajadores',
    texto: [
      DIF + 'En la SA se vende libre; en la SL, libre entre socios. En la laboral hay ' + d('una fila para comprar') + ':',
      '<b>1º</b> los <b>trabajadores con contrato indefinido que todavía no son socios</b>.<br><b>2º</b> los <b>socios trabajadores</b>.',
      '<b>¿Por qué primero los que no son socios?</b> Porque la idea es que <b>cada vez más trabajadores pasen a ser dueños</b>.',
      '<b>Ejemplo:</b> Ana se jubila y vende sus acciones. Hay un mecánico fijo que trabaja ahí pero no es socio: <b>él tiene prioridad</b> para comprarlas.',
      '<b>¿Y si el mecánico no quiere?</b> Le toca a los <b>socios trabajadores</b>: vos y Pedro. Si tampoco quieren, recién ahí Ana se las puede vender a otra persona.',
      '<b>En el examen:</b> "¿Quién tiene preferencia para comprar?" → <b>primero los trabajadores no socios con contrato indefinido y, en segundo lugar, los socios trabajadores</b>.',
      'En esas preguntas aparece "transmisión <b>inter vivos</b>": quiere decir vender en vida, no dejarlo en herencia.'
    ],
    base: TODOS_MESA,
    alArrancar: e => { repartidas(e); conductores(e); },
    vista: 'socios',
    linea: [
      [0.6, e => e.etiqueta('socio3', 'Me jubilo: vendo mis acciones', 'globo')],
      [2.4, e => e.mostrar('socio4')],
      [2.8, e => e.etiqueta('socio4', 'Soy mecánico fijo y no soy socio: ¡compro yo primero!', 'ok')],
      [5.0, e => e.etiqueta('mesa', '1º trabajadores fijos no socios · 2º socios trabajadores', 'aviso')]
    ]
  },
  {
    tipo: 'laboral',
    titulo: 'Si se hacen acciones nuevas',
    texto: [
      'Acordate de la <b>ampliación de capital</b>: la empresa hace acciones nuevas para juntar más plata.',
      'En la laboral, para comprar esas acciones nuevas tienen preferencia ' + d('los socios que ya tienen acciones de la misma clase') + '. Si las nuevas son de clase laboral, primero los socios de clase laboral.',
      '<b>¿Por qué?</b> Para que cada grupo mantenga su parte y los trabajadores no pierdan la mayoría.',
      '<b>En el examen:</b> "¿En qué sociedad los socios trabajadores tienen derecho de <b>suscripción preferente</b> de nuevas acciones?" → en las <b>sociedades laborales</b>. Suscripción preferente = comprar primero las acciones nuevas.'
    ],
    base: TODOS,
    alArrancar: e => { repartidas(e); conductores(e); },
    vista: 'socios',
    linea: [
      [0.6, e => e.etiqueta('registro', 'Acciones nuevas de clase LABORAL', 'ok')],
      [2.4, e => e.etiqueta('persona', 'Yo ya tengo de clase laboral: compro primero', 'globo')]
    ]
  },
  {
    tipo: 'laboral',
    titulo: 'Trabajadores que no son socios: hasta el 49% de las horas',
    texto: [
      'La empresa crece y contrata más gente. ¿Puede tener trabajadores fijos que <b>no</b> sean socios? <b>Sí, pero con un tope.</b>',
      'Las horas que trabajan los fijos <b>no socios</b> no pueden pasar del ' + d('49% de las horas que trabajan los socios trabajadores') + '.',
      '<b>Ejemplo:</b> vos, Pedro y Ana manejan <b>40 horas por semana</b> cada uno: entre los tres, <b>120 horas</b>. El 49% de 120 son unas <b>58 horas</b>. Eso es lo máximo que pueden trabajar, entre todos, los fijos que no son socios.',
      '<b>¿Qué quiere decir en la vida real?</b> Pueden tener <b>un empleado a jornada completa</b> (40 horas) y otro a media jornada (unas 18 horas). Si contratan <b>dos a jornada completa</b> (80 horas), se pasan ✘.',
      '<b>¿Por qué?</b> Para que la mayor parte del trabajo la hagan <b>los dueños</b>. Si no, sería una empresa común con empleados.',
      '<b>En el examen:</b> no importa cuántos socios tenga (30 o los que sean): el tope es el <b>49%</b>.'
    ],
    base: TODOS,
    alArrancar: e => { repartidas(e); conductores(e); e.mostrar('socio4'); },
    vista: 'socios',
    linea: [
      [0.6, e => e.etiqueta('mesa', 'Socios: 40 + 40 + 40 = 120 horas por semana', 'ok')],
      [2.4, e => e.etiqueta('socio4', 'Fijos no socios: como mucho 58 horas (49%)', 'aviso')]
    ]
  },
  {
    tipo: 'laboral',
    titulo: 'Repaso: la sociedad laboral',
    texto: [
      '<b>Qué es:</b> una <b>SA o una SL</b> donde los dueños son sus trabajadores. El sello de laboral lo pone la <b>Comunidad Autónoma</b>.',
      '<b>Las tres reglas que siempre preguntan:</b> más del <b>50%</b> del capital de los trabajadores · mínimo <b>3 socios</b> · nadie con más de <b>un tercio</b> (salvo entidades públicas). Si las tres juntas son opciones: <b>todas son correctas</b>.',
      '<b>Si alguien pasa el tercio:</b> pierde el sello de laboral.',
      '<b>Acciones:</b> clase <b>laboral</b> (trabajadores) y clase <b>general</b> (los demás) → sociedad <b>anónima</b> laboral.',
      '<b>Si un socio vende:</b> 1º trabajadores fijos no socios, 2º socios trabajadores. <b>Acciones nuevas:</b> primero los de la misma clase.',
      '<b>Fijos no socios:</b> hasta el <b>49%</b> de las horas de los socios trabajadores.'
    ],
    base: TODOS,
    alArrancar: e => { repartidas(e); conductores(e); },
    vista: 'general',
    linea: []
  },
  {
    tipo: 'laboral',
    titulo: 'Preguntas oficiales: sociedad laboral',
    texto: [],
    base: TODOS,
    alArrancar: repartidas,
    vista: 'general',
    linea: [],
    quiz: true
  }
];
