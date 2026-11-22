// ==========================================
// CAPÍTULO 2: SOCIEDAD LIMITADA (SL)
// Misma historia, mismos socios y mismos números que la SA.
// Lo que es DISTINTO a la SA va marcado en naranja.
// ==========================================

const P = {
  globo: t => e => e.etiqueta('globo', t, 'globo')
};

// Marcas de color
const DIF = '<span class="badge-dif">≠ DISTINTO A LA SA</span> ';
const DIF_SL = '<span class="badge-dif slne">≠ DISTINTO A LA SL NORMAL</span> ';
const IGUAL = '<span class="badge-igual">= IGUAL QUE LA SA</span> ';
const d = t => `<span class="distinto">${t}</span>`;

const TODOS = ['persona', 'socio2', 'socio3', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared'];
const TODOS_MESA = [...TODOS, 'mesa'];
const repartidas = e => e.acciones('repartidas', true);

export const PASOS_SL = [
  {
    tipo: 'sl',
    titulo: 'Ahora: la SOCIEDAD LIMITADA (SL)',
    texto: [
      'Misma historia: vos, Pedro y Ana quieren armar una empresa de camiones. Pero en vez de una SA, arman una <b>Sociedad Limitada</b>.',
      '<b>Su nombre completo, el que usa la ley, es más largo: Sociedad de Responsabilidad Limitada.</b> Como es largo, todo el mundo le dice <b>Sociedad Limitada</b>, o <b>SL</b>. Es la misma cosa con dos nombres, y el examen usa casi siempre el largo. En el paso que viene te explico qué quiere decir eso de "responsabilidad limitada".',
      'Es la forma <b>más común</b> de las empresas chicas y medianas de transporte en España.',
      '<b>¿Por qué alguien la elegiría en vez de la SA?</b> Porque <b>no hacen falta 60.000 €</b> para arrancar, y porque es más <b>cerrada</b>: los socios controlan quién entra. Ideal para una empresa familiar o de amigos.',
      'Se parece mucho a la SA. Para que no te mezcles, todo lo que es ' + d('distinto a la SA') + ' te lo marco <b>en naranja</b>.'
    ],
    base: ['persona', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared'],
    vista: 'general',
    linea: [
      [0.2, e => e.pensar(true)],
      [0.4, P.globo('¿SA o SL? Quiero algo más simple, con mis socios de confianza')],
      [2.8, e => { e.mostrar('socio2'); e.mostrar('socio3'); }],
      [3.6, e => { e.pensar(false); e.etiqueta('deuda', 'Ahora es una SOCIEDAD LIMITADA', 'ok'); }]
    ]
  },
  {
    tipo: 'sl',
    titulo: 'El nombre lo dice: responsabilidad LIMITADA',
    texto: [
      '<b>¿Qué es "responsabilidad"?</b> Es la respuesta a esta pregunta: <b>si la empresa debe plata y no la puede pagar, ¿hasta dónde tenés que poner vos de tu bolsillo?</b>',
      '<b>Responsabilidad ILIMITADA</b> = sin límite: ponés todo lo tuyo, la casa, el auto, los ahorros. Es lo que le pasa al autónomo.',
      '<b>Responsabilidad LIMITADA</b> = con límite: lo máximo que perdés es <b>lo que pusiste en la empresa</b>. Pusiste 10.000 €: perdés esos 10.000 € y nada más. La casa y el auto no se tocan.',
      IGUAL + 'En la SL los socios tienen responsabilidad <b>limitada</b>, como en la SA: hay una <b>pared</b> entre lo tuyo y lo de la empresa. <b>Y de eso sale su nombre:</b> Sociedad de <b>Responsabilidad Limitada</b>.',
      '<b>En el examen:</b> "¿Cómo responden los socios de las deudas de una SL?" → <b>No responderán personalmente</b>.'
    ],
    base: ['persona', 'socio2', 'socio3', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared'],
    vista: 'general',
    linea: [
      [0.6, e => e.etiqueta('deuda', 'La empresa debe 100.000 €', 'deuda')],
      [2.2, e => { e.etiqueta('casa', 'A salvo ✔', 'ok'); e.etiqueta('auto', 'A salvo ✔', 'ok'); }],
      [3.4, e => e.etiqueta('pared', 'LIMITADA: solo perdés lo que pusiste', 'ok')]
    ]
  },
  {
    tipo: 'sl',
    titulo: 'Nace igual que la SA: notario y Registro Mercantil',
    texto: [
      IGUAL + 'Se firma una <b>escritura pública</b> ante el <b>notario</b> y se inscribe en el <b>Registro Mercantil</b>. Ahí "nace", como el bebé que viste en la SA.',
      'Es una sociedad <b>mercantil</b> (una empresa para hacer negocios), igual que la SA.',
      '<b>Trampa del examen:</b> te dicen "se inscribe en el <b>Registro de la Propiedad</b>". <b>FALSO</b>: ese registro es para casas y terrenos. La SL va al <b>Registro Mercantil</b>.',
      '<b>Otra pregunta que sale mucho:</b> "La sociedad de responsabilidad limitada…"<br>a) tiene un capital <b>máximo</b> de 3.000 €.<br>b) tiene socios con responsabilidad <b>ilimitada</b>.<br>c) se inscribe en el <b>Registro de la Propiedad</b>.<br>d) Todas las respuestas anteriores son incorrectas.<br>→ La correcta es <b>d)</b>. Los 3.000 € no son un máximo, la responsabilidad es limitada y se inscribe en el Registro Mercantil: las tres primeras son mentira.'
    ],
    base: TODOS,
    vista: 'empresa',
    linea: [
      [0.6, e => e.etiqueta('escritura', 'Escritura pública ante notario', 'aviso')],
      [2.2, e => e.etiqueta('registro', 'Registro MERCANTIL ✔ (el de la Propiedad es para casas)', 'ok')]
    ]
  },
  {
    tipo: 'sl',
    titulo: '¿Cuánta plata hace falta? 1 euro',
    texto: [
      DIF + 'En la SA el mínimo es <b>60.000 €</b>. En la SL, ' + d('el mínimo es 1 euro') + '.',
      '<b>¿Por qué?</b> Para que cualquiera pueda empezar su empresa sin tener mucha plata. <b>Ojo:</b> que el mínimo sea 1 € no quiere decir que alcance para trabajar. Ustedes igual ponen 40.000 + 10.000 + 10.000 = 60.000 €, porque necesitan comprar camiones.',
      '<b>De dónde sale el lío del examen:</b> hasta 2022 el mínimo de la SL eran <b>3.000 €</b>. La ley cambió y ahora es 1 €. Pero en los exámenes todavía aparecen las dos preguntas.',
      '<b>Regla fácil:</b> si entre las opciones está <b>1 euro</b>, marcá 1 euro. Si <b>no está</b>, es una pregunta de antes del cambio: marcá <b>3.000 €</b>. Esas preguntas viejas suelen decir "normalmente".',
      'Y ojo: 3.000 € <b>no es un máximo</b>. Una SL puede tener todo el capital que quiera.'
    ],
    base: ['persona', 'socio2', 'socio3', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared', 'monedas'],
    vista: 'socios',
    linea: [
      [0.6, e => e.etiqueta('monedas', 'SA: mínimo 60.000 €', 'grande')],
      [2.4, e => e.etiqueta('monedas', 'SL: mínimo 1 €', 'grande')],
      [4.2, e => e.etiqueta('persona', 'Igual ponemos 60.000 €: necesitamos camiones', 'globo')]
    ]
  },
  {
    tipo: 'sl',
    titulo: 'La trampa del euro: si cierra con menos de 3.000 €',
    texto: [
      'Si la SL arranca con <b>menos de 3.000 €</b>, la ley le pone una condición. <b>Ejemplo:</b> otros tres amigos arman una SL poniendo <b>100 € cada uno</b>: capital <b>300 €</b>.',
      'Les va mal y la cierran. Cerrar la empresa, pagar lo que se debe y repartir lo que queda se llama <b>liquidación</b>. Puede ser <b>voluntaria</b>, cuando deciden ellos, o <b>forzosa</b>, cuando los obligan. Para esta regla da lo mismo cuál de las dos sea.',
      'Si la plata de la empresa no alcanza para pagar las deudas, los socios tienen que poner ' + d('lo que falta para llegar a 3.000 €') + ': 3.000 − 300 = <b>2.700 €</b>.',
      '<b>¿Y quién lo pone?</b> <b>Solidariamente</b>: le pueden pedir los 2.700 € a <b>cualquiera</b> de los tres, aunque sea uno solo. Después ese se arregla con los otros.',
      '<b>No confundas:</b> <b>mancomunadamente</b> sería que cada uno paga solo su parte, 900 € cada uno. En el examen la respuesta es <b>solidariamente</b>.'
    ],
    base: ['persona', 'socio2', 'socio3', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared', 'monedas'],
    vista: 'socios',
    linea: [
      [0.6, e => e.etiqueta('monedas', 'Capital: 300 € (100 € cada uno)', 'grande')],
      [2.4, e => e.etiqueta('deuda', 'Cierra: faltan 2.700 € para llegar a 3.000 €', 'deuda')],
      [4.4, e => e.etiqueta('socio3', '¡Me piden los 2.700 € a mí solo!', 'globo')],
      [6.0, e => e.etiqueta('mesa', 'SOLIDARIAMENTE: le pueden pedir todo a cualquiera', 'aviso')]
    ]
  },
  {
    tipo: 'sl',
    titulo: 'Todo el primer día: el 100%',
    texto: [
      DIF + 'En la SA, al crearla alcanzaba con poner el <b>25%</b> (15.000 €), y el resto después.',
      'En la SL, ' + d('el día que se crea hay que poner el 100%') + ': los <b>60.000 € enteros</b>. No queda nada para después.',
      '<b>¿Por qué?</b> Como el mínimo es chico, la ley quiere que la plata que dicen tener <b>esté de verdad</b> desde el primer día.',
      '<b>Trampa del examen:</b> "¿En qué sociedad hay que poner al menos el 25% al crearla?" → en la <b>sociedad anónima</b>. No en la limitada.'
    ],
    base: ['persona', 'socio2', 'socio3', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared', 'monedas'],
    vista: 'socios',
    barra: { parte: 1, izq: 'Día 1: 60.000 € (100%)', der: 'Para después: nada', color: '#f97316' },
    linea: [
      [0.6, e => e.etiqueta('monedas', 'SA: 25% el día 1 · SL: 100% el día 1', 'grande')]
    ]
  },
  {
    tipo: 'sl',
    titulo: 'No son acciones: son PARTICIPACIONES',
    texto: [
      DIF + 'En la SA el capital se parte en <b>acciones</b>. En la SL se parte en ' + d('participaciones') + '. Mirá: ahora los pedacitos son <b>naranjas</b>.',
      'Mismo ejemplo: 60.000 € = <b>60 participaciones de 1.000 €</b>. Vos tenés <b>40</b>, y Pedro y Ana <b>10</b> cada uno.',
      '<b>Palabras del examen:</b> las participaciones son partes <b>iguales</b>, <b>indivisibles</b> y <b>acumulables</b>. Indivisible quiere decir que una participación no se parte: no existe media participación. Acumulable quiere decir que podés tener muchas.',
      '<b>Truco:</b> SA → <b>A</b>cciones. SL → participaciones.'
    ],
    base: ['persona', 'socio2', 'socio3', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared', 'monedas'],
    alArrancar: e => { e.acciones('pila'); e.etiqueta('monedas', '60.000 €', 'grande'); },
    vista: 'socios',
    linea: [
      [0.6, e => e.etiqueta('monedas', '60.000 € = 60 PARTICIPACIONES de 1.000 €', 'grande')],
      [1.8, e => { e.acciones('repartidas'); e.mostrar('monedas', false); e.etiqueta('monedas', null); }],
      [4.4, e => {
        e.etiqueta('persona', '40 participaciones', 'precio');
        e.etiqueta('socio2', '10 participaciones', 'precio');
        e.etiqueta('socio3', '10 participaciones', 'precio');
      }]
    ]
  },
  {
    tipo: 'sl',
    titulo: '¿Cuántos socios? Desde 1, sin máximo',
    texto: [
      IGUAL + 'La SL se puede crear con <b>un solo socio</b>. No hacen falta 3 ni 4: <b>con 1 alcanza</b>.',
      'Y <b>no hay máximo</b>: pueden entrar todos los socios que quieran.',
      '<b>En el examen:</b> "¿Número mínimo de socios de una SL?" → <b>Uno</b>. "¿Número máximo?" → <b>No hay limitación</b>.'
    ],
    base: ['persona', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared'],
    vista: 'socios',
    linea: [
      [0.6, e => e.etiqueta('persona', 'Puedo hacer la SL yo solo', 'globo')],
      [2.4, e => { e.mostrar('socio2'); e.mostrar('socio3'); }],
      [3.0, e => e.mostrar('socio4')],
      [3.6, e => e.etiqueta('mesa', 'Mínimo 1 socio · Máximo: no hay', 'ok')]
    ]
  },
  {
    tipo: 'sl',
    titulo: 'Vender tu parte: libre entre socios',
    texto: [
      DIF + 'En la SA, las acciones pasan de mano en mano <b>libremente</b>: le vendés a quien quieras.',
      'En la SL, ' + d('vender es libre solo entre socios') + '. Si querés vendérselas a alguien <b>de afuera</b>, no es libre: los demás socios tienen algo que decir.',
      '<b>¿Por qué?</b> Porque la SL es <b>cerrada</b>: si armaste la empresa con tu hermano y un amigo, no querés que mañana se meta un desconocido.',
      '<b>En el examen:</b> "Salvo que los estatutos digan otra cosa, ¿cómo se pueden transmitir las participaciones?" → <b>Libremente entre socios</b>.'
    ],
    base: TODOS_MESA,
    alArrancar: repartidas,
    vista: 'socios',
    linea: [
      [0.6, e => e.etiqueta('socio3', 'Me voy: le vendo mis 10 participaciones a Pedro', 'globo')],
      [2.4, e => e.etiqueta('socio2', 'Dale, te las compro: entre socios es libre', 'ok')],
      [4.4, e => e.mostrar('socio4')],
      [4.9, e => e.etiqueta('socio4', '¿Y a mí, que soy de afuera?', 'globo')],
      [6.4, e => e.etiqueta('mesa', 'A uno de afuera: no es libre, los socios opinan', 'aviso')]
    ]
  },
  {
    tipo: 'sl',
    titulo: 'El libro de socios: la lista de los dueños',
    texto: [
      'Vos tenés 40 participaciones y tus socios 10 cada uno. <b>¿Cómo sabe la empresa quiénes son sus dueños?</b> Porque los anota en un cuaderno oficial: el <b>libro registro de socios</b>.',
      'Es como la lista de vecinos de un edificio: <b>quién es cada dueño y dónde vive</b>. Nada más.',
      '<b>¿Para qué sirve?</b> Para saber a quién mandarle el aviso de la junta y a quién pagarle las ganancias.',
      '<b>Así lo pregunta el examen:</b> "¿Qué se anota en el libro registro de socios?" a) Los que fueron a la junta. b) <b>La identidad y el domicilio de los dueños de las participaciones</b>. c) La identidad y el tipo de responsabilidad de cada socio. d) Las delegaciones de voto (cuando un socio le da permiso a otro para votar por él).',
      'La correcta es la <b>b</b>: quién es y dónde vive. ¿Por qué no la c? Porque en la SL no hace falta anotar la responsabilidad: <b>todos tienen la misma, limitada</b>.'
    ],
    base: TODOS,
    alArrancar: repartidas,
    vista: 'empresa',
    linea: [
      [0.6, e => e.etiqueta('escritura', 'LIBRO DE SOCIOS: quién es cada dueño y dónde vive', 'ok')]
    ]
  },
  {
    tipo: 'sl',
    titulo: 'La junta: van todos los socios',
    texto: [
      'Igual que en la SA, los dueños se juntan a decidir las cosas importantes: si compran otro camión, qué hacen con las ganancias. Esa reunión es la <b>junta general</b>.',
      '<b>¿Quién puede ir?</b> <b>TODOS</b> los socios: el que tiene 40 participaciones y el que tiene una sola. Nadie se queda afuera.',
      '<b>Ahora algo raro: participaciones que no votan.</b> ¿Para qué querría alguien eso? Ejemplo: tu tío te dice "te pongo plata para la empresa y quiero mi parte de las ganancias, pero no quiero ir a reuniones ni decidir nada". Le dan participaciones <b>sin voto</b>: cobra ganancias, pero no vota.',
      '<b>Pero no puede haber demasiadas:</b> como mucho <b>la mitad (50%)</b> del capital puede ser sin voto. Con 60.000 €, como mucho 30.000 € sin voto. Si no, terminarían decidiendo unos pocos que pusieron poca plata.',
      '<b>En el examen:</b> "¿Qué socios pueden ir a la junta?" → <b>Todos</b>. "¿Hasta cuánto puede haber sin voto?" → <b>hasta el 50%</b>.'
    ],
    base: TODOS_MESA,
    alArrancar: repartidas,
    vista: 'socios',
    linea: [
      [0.6, e => e.etiqueta('mesa', 'JUNTA GENERAL: pueden venir TODOS los socios', 'ok')],
      [2.6, e => e.etiqueta('socio3', 'Tengo pocas participaciones… ¡y vengo igual!', 'globo')],
      [4.6, e => e.mostrar('socio4')],
      [5.0, e => e.etiqueta('socio4', 'Soy el tío: pongo plata, cobro ganancias, no voto', 'globo')],
      [7.0, e => e.etiqueta('deuda', 'Sin voto: como mucho la mitad del capital', 'aviso')]
    ]
  },
  {
    tipo: 'sl',
    titulo: 'Los administradores y los préstamos',
    texto: [
      'Los <b>administradores</b> son los jefes del día a día, igual que en la SA.',
      '<b>¿Cuánto tiempo duran?</b> Si los estatutos no ponen un plazo, <b>de forma indefinida</b>: siguen hasta que los cambien.',
      '<b>¿La empresa le puede prestar plata a un socio o a un administrador?</b> Sí, pero solo si la <b>junta general</b> lo aprueba con un <b>acuerdo concreto</b> para ese préstamo.',
      '<b>¿Por qué?</b> Para que nadie se lleve plata de la empresa sin que los demás dueños se enteren y voten.'
    ],
    base: TODOS_MESA,
    alArrancar: repartidas,
    vista: 'socios',
    linea: [
      [0.6, e => e.etiqueta('socio2', '¿Me prestan 5.000 € de la empresa?', 'globo')],
      [2.6, e => e.etiqueta('mesa', 'Solo si la junta lo vota', 'aviso')]
    ]
  },
  {
    tipo: 'sl',
    titulo: 'La empresa no puede comprarse a sí misma',
    texto: [
      '<b>Acordate:</b> la empresa tiene <b>60.000 €</b> de capital. El banco, el taller y el que le vende combustible <b>le fían</b> porque saben que esa plata está.',
      '<b>Ahora imaginá:</b> un socio se quiere ir y dice "que la empresa me compre mis 10 participaciones". La empresa le da <b>10.000 € de su propia caja</b>.',
      '<b>¿Qué pasó?</b> El socio se fue con plata de la empresa. En la caja quedan <b>50.000 €</b>, pero los papeles siguen diciendo 60.000 €. Los que le fían creen que hay más plata de la que hay: <b>es como engañarlos</b>.',
      '<b>Por eso la ley lo prohíbe.</b> Si la empresa compra igual sus participaciones, esa compra es <b>nula de pleno derecho</b>: no vale nada, se deshace como si nunca hubiera pasado.',
      '<b>Por lo mismo, tampoco puede:</b> prestarle plata a alguien para que compre esas participaciones, ni aceptarlas como garantía de una deuda. Es la misma trampa por otro camino.',
      '<b>¿Y cómo se va el socio, entonces?</b> Le vende sus participaciones a otro socio, como viste antes.',
      '<b>Así lo pregunta el examen:</b> "Con sus propias participaciones, ¿qué <b>NO</b> puede hacer una SL?"<br>a) Aceptarlas como garantía.<br>b) Prestar plata para que alguien las compre.<br>c) Comprarlas directamente.<br>d) Todas son correctas.<br>→ La correcta es <b>d)</b>. La SL no puede hacer ninguna de las tres, así que las tres frases son ciertas.',
      '<b>Y al revés:</b> "Con sus propias participaciones, ¿qué <b>SÍ</b> puede hacer una SL?"<br>a) Aceptarlas como garantía.<br>b) Prestar plata para que alguien las compre.<br>c) Comprarlas directamente.<br>d) Todas son incorrectas.<br>→ La correcta es <b>d)</b>. Como no puede hacer ninguna, ninguna opción vale.'
    ],
    base: [...TODOS, 'monedas'],
    alArrancar: e => { repartidas(e); e.etiqueta('monedas', 'Caja: 60.000 €', 'grande'); },
    vista: 'socios',
    linea: [
      [0.8, e => e.etiqueta('socio3', 'Que la empresa me compre mis 10 participaciones', 'globo')],
      [2.8, e => e.etiqueta('monedas', 'Caja: 50.000 € · Papeles: 60.000 € ✘', 'deuda')],
      [4.8, e => e.etiqueta('registro', 'PROHIBIDO: la compra es nula de pleno derecho', 'deuda')],
      [6.8, e => e.etiqueta('socio2', 'Te las compro yo, que soy socio', 'ok')]
    ]
  },
  {
    tipo: 'sl',
    titulo: 'El nombre de la empresa: S.L. o S.R.L.',
    texto: [
      '<b>Acordate del primer paso:</b> esta sociedad tiene un nombre corto y uno largo, y los dos quieren decir lo mismo. Las letras salen de ahí:',
      '<b>S.L.</b> = <b>S</b>ociedad <b>L</b>imitada (el nombre corto).<br><b>S.R.L.</b> = <b>S</b>ociedad de <b>R</b>esponsabilidad <b>L</b>imitada (el nombre largo). <b>La R es de "Responsabilidad".</b>',
      '<b>¿Para qué van en el nombre?</b> Para que cualquiera sepa qué tipo de empresa es. Si un cliente lee "Proyecto Apolo, <b>S.L.</b>", ya sabe que los socios tienen responsabilidad limitada. Por eso <b>toda SL tiene que llevar</b> "Sociedad Limitada", "S.L." o "S.R.L.".',
      '<b>Y el nombre tiene que ser único en toda España.</b> ¿Por qué? Para que nadie se confunda de empresa. Si ya existe "Proyecto Apolo, S.L." en Galicia, vos en Madrid no podés usar ese nombre. No importa la provincia ni la comunidad.',
      'En el examen, al nombre de la empresa lo llaman <b>denominación</b>.<br><b>Así lo preguntan:</b> "¿Qué tiene que figurar sí o sí en la denominación de una SL?"<br>a) La indicación "Sociedad Limitada".<br>b) Las letras "S.L.".<br>c) Las letras "S.R.L.".<br>d) Todas son correctas.<br>→ La correcta es <b>d)</b>. Cualquiera de las tres formas sirve.',
      '<b>Y esta otra:</b> "La denominación de una SL:"<br>a) podrá ser igual al nombre de otra sociedad.<br>b) no podrá ser igual al nombre de otra sociedad.<br>c) no podrá ser igual a otra de su provincia, pero sí a una de otra provincia.<br>d) no podrá ser igual a otra de su comunidad, pero sí a una de otra comunidad.<br>→ La correcta es <b>b)</b>. No puede haber dos empresas con el mismo nombre en toda España.'
    ],
    base: TODOS,
    vista: 'empresa',
    linea: [
      [0.6, e => e.etiqueta('registro', 'S.L. = Sociedad Limitada · S.R.L. = Sociedad de Responsabilidad Limitada', 'ok')],
      [3.0, e => e.etiqueta('escritura', 'Proyecto Apolo, S.L. ✔ Nadie más en España puede llamarse así', 'aviso')]
    ]
  },
  {
    tipo: 'sl',
    titulo: 'La SL Nueva Empresa (SLNE): ¿quiénes pueden ser socios?',
    texto: [
      'Hay una versión <b>más simple y rápida</b> de la SL para negocios chicos que recién empiezan: la <b>Sociedad Limitada Nueva Empresa</b> (SLNE).',
      DIF_SL + 'Arranca con ' + d('un máximo de 5 socios') + ' (mínimo 1).',
      'Solo pueden ser socios las ' + d('personas físicas') + '. <b>Persona física</b> = una persona de carne y hueso, como vos. <b>Persona jurídica</b> = una empresa. Una empresa no puede ser socia de una SLNE.',
      'Si un socio vende sus participaciones, solo se las puede vender a <b>personas físicas</b>, no a una empresa. Y si por algún motivo una empresa termina quedándose con participaciones, tiene <b>3 meses</b> para vendérselas a una persona.'
    ],
    base: ['persona', 'socio2', 'socio3', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared', 'mesa'],
    alArrancar: e => e.mostrar('socio4'),
    vista: 'socios',
    linea: [
      [0.6, e => e.etiqueta('mesa', 'SLNE: de 1 a 5 socios al empezar', 'ok')],
      [2.6, e => e.etiqueta('socio4', 'Solo personas: ninguna empresa puede ser socia', 'aviso')]
    ]
  },
  {
    tipo: 'sl',
    titulo: 'SLNE: la plata, el nombre y a qué se dedica',
    texto: [
      DIF_SL + '<b>Capital:</b> ' + d('como mínimo 3.000 € y como máximo 120.000 €') + '.',
      'Y se pone ' + d('solo con dinero') + '. No vale poner un camión ni trabajo: plata.',
      '<b>¿A qué se puede dedicar?</b> A las actividades que dice la ley, y entre ellas está el <b>transporte</b> (también agrícola y forestal). Lo que <b>no</b> puede: <b>seguros</b>.',
      '<b>Nombre:</b> tiene que llevar "<b>Sociedad Limitada Nueva Empresa</b>" o <b>SLNE</b>.',
      '<b>Libro de socios:</b> en la SLNE <b>no hace falta</b>.'
    ],
    base: ['persona', 'socio2', 'socio3', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared', 'monedas'],
    vista: 'empresa',
    linea: [
      [0.6, e => e.etiqueta('monedas', 'SLNE: de 3.000 € a 120.000 €, solo en dinero', 'grande')],
      [2.6, e => e.etiqueta('registro', 'Transporte ✔ · Seguros ✘', 'ok')],
      [4.4, e => e.etiqueta('escritura', 'Nombre: "…, SLNE"', 'aviso')]
    ]
  },
  {
    tipo: 'sl',
    titulo: 'Repaso: SA y SL, una al lado de la otra',
    texto: [
      '<b>Responsabilidad:</b> limitada en las dos. <b>Registro:</b> Mercantil en las dos. <b>Socios:</b> mínimo 1 en las dos.',
      '<b>Capital mínimo:</b> SA 60.000 € · SL ' + d('1 €') + '. En una pregunta vieja sin la opción 1 €: 3.000 €.',
      '<b>El día que se crea:</b> SA el 25% · SL ' + d('el 100%') + '.',
      '<b>Pedacitos del capital:</b> SA acciones · SL ' + d('participaciones') + ' (iguales, indivisibles y acumulables).',
      '<b>Vender:</b> SA libre · SL ' + d('libre solo entre socios') + '.',
      '<b>Máximo de socios en la SL:</b> no hay. <b>Junta:</b> van todos. <b>Sin voto:</b> hasta el 50%.',
      '<b>SL con menos de 3.000 € que se liquida:</b> los socios ponen lo que falta hasta 3.000 €, <b>solidariamente</b>.',
      '<b>SLNE:</b> de 1 a 5 socios, solo personas físicas, de 3.000 € a 120.000 € solo en dinero, nada de seguros.'
    ],
    base: TODOS,
    alArrancar: repartidas,
    vista: 'general',
    linea: []
  },
  {
    tipo: 'sl',
    titulo: 'Preguntas oficiales: sociedad limitada',
    texto: [],
    base: TODOS,
    alArrancar: repartidas,
    vista: 'general',
    linea: [],
    quiz: true
  }
];
