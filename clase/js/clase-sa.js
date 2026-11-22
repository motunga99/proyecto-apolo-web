// ==========================================
// CAPÍTULO 2: SOCIEDAD ANÓNIMA (SA)
// Números de toda la clase: vos 40.000 €, Pedro 10.000 €, Ana 10.000 €.
// ==========================================

const P = {
  globo: t => e => e.etiqueta('globo', t, 'globo'),
  sinGlobo: e => e.etiqueta('globo', null)
};

export const PASOS_SA = [
  {
    tipo: 'sa',
    titulo: "SOCIEDAD ANÓNIMA: ¿por qué alguien la elegiría?",
    texto: [
      "Ya viste el problema del autónomo: si le va mal, pierde la casa y el auto. Ahora pensás en otra opción: una <b>sociedad anónima</b>. En el examen la vas a ver escrita así o con su sigla: <b>SA</b>.",
      "<b>Ejemplo 1:</b> querés una empresa con 50 camiones. Eso cuesta millones y nadie tiene esa plata solo. Con una SA, muchas personas ponen plata y, a cambio, cada una se queda con un pedacito de la empresa.",
      "<b>Ejemplo 2:</b> si más adelante hace falta más plata para crecer, se venden pedacitos nuevos a gente que quiera entrar. Y si un socio se quiere ir, le vende su parte a otro y la empresa sigue igual.",
      "Por eso las empresas grandes de transporte suelen ser SA. Y lo más importante: <b>tu casa no corre peligro</b>. En el paso siguiente vas a ver por qué."
    ],
    base: ['persona', 'casa', 'auto'],
    vista: 'general',
    linea: [
      [0.2, e => e.pensar(true)],
      [0.3, P.globo('Quiero algo GRANDE… y no quiero arriesgar mi casa')],
      [1.4, e => e.mostrar('empresa')],
      [2.2, e => e.mostrar('camion')]
    ]
  },
  {
    tipo: 'sa',
    titulo: "La pared que protege tu casa",
    texto: [
      "Cuando creás una sociedad, para la ley aparece <b>alguien nuevo</b>: la empresa, como si fuera una persona aparte. Tiene sus propias cosas y sus propias deudas.",
      "Entonces entre lo tuyo y lo de la empresa aparece una <b>pared</b>. Si la empresa debe plata, la deuda es de la empresa, no tuya. Tu casa y tu auto quedan a salvo. Lo único que podés perder es lo que pusiste en la empresa.",
      "<b>En el examen</b> esto se dice así: \"los socios no responden personalmente de las deudas sociales\". Deudas sociales = las deudas de la sociedad."
    ],
    base: ['persona', 'casa', 'auto', 'empresa', 'camion'],
    vista: 'general',
    linea: [
      [0.5, e => e.mostrar('linea')],
      [1.0, e => e.mostrar('pared')],
      [1.6, e => e.etiqueta('pared', 'Pared: lo tuyo queda a salvo', 'ok')],
      [2.8, e => e.etiqueta('deuda', 'DEUDA: 100.000 €', 'deuda')],
      [3.8, e => { e.etiqueta('casa', 'A salvo ✔', 'ok'); e.etiqueta('auto', 'A salvo ✔', 'ok'); }],
      [4.4, P.globo('Mi casa no se toca')]
    ]
  },
  {
    tipo: 'sa',
    titulo: "Responsabilidad LIMITADA o ILIMITADA",
    texto: [
      "Hay una palabra que aparece muchísimo en el examen: <b>responsabilidad</b>. Responde a esta pregunta: si la empresa debe plata y no la puede pagar, <b>¿hasta dónde tenés que poner vos de tu bolsillo?</b>",
      "<b>Responsabilidad ILIMITADA</b> = sin límite. Respondés con todo lo tuyo: la casa, el auto, los ahorros. Es lo que le pasa al autónomo.",
      "<b>Responsabilidad LIMITADA</b> = con límite. Lo máximo que perdés es lo que pusiste en la empresa. <b>Ejemplo:</b> pusiste 10.000 € en la SA y la empresa quiebra debiendo 1 millón. Perdés tus 10.000 € y nada más. Tu casa no se toca.",
      "En la SA, los socios tienen responsabilidad <b>limitada</b>. Hay otra sociedad que lleva esa palabra en el nombre, la Sociedad de Responsabilidad Limitada, y la vemos en el capítulo siguiente.",
      "<b>Así lo pregunta el examen:</b> \"La sociedad anónima…\"<br>a) tiene un capital mínimo de 6.000 euros.<br>b) la forman accionistas con responsabilidad limitada.<br>c) debe inscribirse en el Registro Mercantil.<br>d) B y C son correctas.<br>→ Correcta: <b>d</b>. La b es lo que acabás de ver. La c también es cierta: el Registro Mercantil lo vemos más adelante. La a es falsa: el mínimo de la SA son 60.000 €, no 6.000 €."
    ],
    base: ['persona', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared'],
    vista: 'general',
    linea: [
      [0.6, e => e.etiqueta('deuda', 'La empresa quiebra: debe 1.000.000 €', 'deuda')],
      [2.0, e => e.etiqueta('persona', 'Yo puse 10.000 €: es lo máximo que puedo perder', 'globo')],
      [3.6, e => { e.etiqueta('casa', 'A salvo ✔', 'ok'); e.etiqueta('auto', 'A salvo ✔', 'ok'); }],
      [4.6, e => e.etiqueta('pared', 'LIMITADA: solo perdés lo que pusiste', 'ok')]
    ]
  },
  {
    tipo: 'sa',
    titulo: "¿Cuánta plata hace falta? 60.000 €",
    texto: [
      "Para crear una SA, la ley pide que los socios pongan entre todos <b>al menos 60.000 €</b>.",
      "A esa plata que ponen los socios para arrancar la empresa se le llama <b>capital</b>, o capital social.",
      "Con menos no se puede. <b>En el examen:</b> \"¿Se puede crear una SA con 30.000 €?\" → <b>No, en ningún caso</b>."
    ],
    base: ['persona', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared'],
    vista: 'empresa',
    linea: [
      [0.5, e => e.mostrar('monedas')],
      [1.2, e => e.etiqueta('monedas', 'Capital mínimo: 60.000 €', 'grande')]
    ]
  },
  {
    tipo: 'sa',
    titulo: "¿Necesito socios?",
    texto: [
      "Una SA la puede crear <b>una sola persona</b>. Cuando tiene un solo socio se llama <b>sociedad unipersonal</b>. O sea: el mínimo de socios es <b>uno</b>.",
      "Pero si no te alcanza la plata, buscás socios que pongan el resto. <b>Ejemplo:</b> vos tenés 40.000 €, te faltan 20.000 €, y se suman <b>Pedro y Ana</b>, que ponen 10.000 € cada uno.",
      "Esos son los números de toda la clase: <b>vos 40.000 €, Pedro 10.000 €, Ana 10.000 €</b>. Total: 60.000 €."
    ],
    base: ['persona', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared', 'monedas'],
    alArrancar: e => e.etiqueta('monedas', 'Capital mínimo: 60.000 €', 'grande'),
    vista: 'socios',
    linea: [
      [0.2, e => e.pensar(true)],
      [0.3, P.globo('Puedo hacerla solo… pero tengo 40.000 € y necesito 60.000 €')],
      [2.6, e => e.mostrar('socio2')],
      [3.1, e => e.etiqueta('socio2', 'Pedro pone 10.000 €', 'precio')],
      [3.7, e => e.mostrar('socio3')],
      [4.2, e => e.etiqueta('socio3', 'Ana pone 10.000 €', 'precio')],
      [4.9, e => { e.pensar(false); e.etiqueta('globo', null); e.etiqueta('persona', 'Vos ponés 40.000 €', 'precio'); }],
      [5.7, e => e.etiqueta('monedas', '40.000 + 10.000 + 10.000 = 60.000 €', 'grande')]
    ]
  },
  {
    tipo: 'sa',
    titulo: "El 25%: como la entrada de un piso",
    texto: [
      "No hace falta poner los 60.000 € el primer día.",
      "Al crearla alcanza con poner <b>el 25%</b>, que son <b>15.000 €</b>. El resto se pone después.",
      "En el examen, poner la plata se dice <b>desembolsar</b>. Por eso preguntan: \"¿qué parte del capital tiene que estar desembolsada?\" → <b>el 25%</b>.",
      "Es como comprar un piso: pagás la entrada y el resto más adelante."
    ],
    base: ['persona', 'socio2', 'socio3', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared', 'monedas'],
    alArrancar: e => e.etiqueta('monedas', 'Capital: 60.000 €', 'grande'),
    vista: 'socios',
    barra: true,
    linea: []
  },
  {
    tipo: 'sa',
    titulo: "Los 60.000 € se parten en ACCIONES",
    texto: [
      "El capital de la SA se parte en pedacitos iguales que se llaman <b>acciones</b>. Cada acción es un pedacito de la empresa.",
      "<b>Ejemplo:</b> 60.000 € = 60 acciones de 1.000 €. Vos pusiste 40.000 €: te llevás <b>40 acciones</b>. Pedro y Ana pusieron 10.000 € cada uno: <b>10 acciones</b> cada uno.",
      "Los dueños de la SA son los que tienen acciones. Por eso a los socios de una SA también se los llama <b>accionistas</b>.",
      "<b>Truco:</b> SA → <b>A</b>cciones. A con A."
    ],
    base: ['persona', 'socio2', 'socio3', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared', 'monedas'],
    alArrancar: e => { e.acciones('pila'); e.etiqueta('monedas', '60.000 €', 'grande'); },
    vista: 'socios',
    linea: [
      [0.6, e => e.etiqueta('monedas', '60.000 € = 60 acciones de 1.000 €', 'grande')],
      [1.8, e => { e.acciones('repartidas'); e.mostrar('monedas', false); e.etiqueta('monedas', null); }],
      [4.4, e => {
        e.etiqueta('persona', '40 acciones', 'precio');
        e.etiqueta('socio2', '10 acciones', 'precio');
        e.etiqueta('socio3', '10 acciones', 'precio');
      }]
    ]
  },
  {
    tipo: 'sa',
    titulo: "¿Por qué se llama \"anónima\"?",
    texto: [
      "\"Anónima\" <b>no</b> quiere decir que los dueños sean secretos. Cuando se crea la SA, en los papeles figuran los socios con nombre y apellido.",
      "Se llama anónima porque la empresa <b>no depende de quiénes son los dueños</b>. Su nombre no lleva el nombre de ninguna persona: no se llama \"Transportes Juan Pérez\".",
      "Y las acciones pueden pasar de mano en mano. Ana le vende sus acciones a otra persona y la empresa sigue igual. Hoy es de unos, mañana de otros. Lo que importa es la plata que se puso, no quién la puso.",
      "<b>Así lo pregunta el examen:</b> \"Respecto de la sociedad anónima se puede decir que…\"<br>a) no puede tener un único socio.<br>b) los administradores tienen el privilegio del anonimato.<br>c) los socios son los que tienen acciones.<br>d) Todas son correctas.<br>→ Correcta: <b>c</b>. La a es falsa: puede tener un solo socio. La b es falsa: \"anónima\" no quiere decir que alguien se esconda."
    ],
    base: ['persona', 'socio2', 'socio3', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared'],
    alArrancar: e => e.acciones('repartidas', true),
    vista: 'socios',
    linea: [
      [0.6, e => e.etiqueta('socio3', 'Me voy: vendo mis 10 acciones a otra persona', 'globo')],
      [2.6, e => e.etiqueta('registro', 'La empresa sigue igual: cambian los dueños, no la empresa', 'ok')]
    ]
  },
  {
    tipo: 'sa',
    titulo: "¿Quién manda? Se vota, y cada acción es un voto",
    texto: [
      "Los dueños deciden las cosas importantes <b>votando</b>: quién dirige la empresa, si compran camiones nuevos, cómo se reparten las ganancias.",
      "<b>Cada acción es un voto.</b> Vos tenés 40 acciones: 40 votos. Pedro y Ana tienen 10 cada uno: 10 votos. En total hay 60 votos.",
      "Gana lo que consiga <b>más de la mitad</b> de los votos. La mitad de 60 es 30, así que hacen falta <b>31 o más</b>.",
      "¿Y si Pedro y Ana se juntan contra vos? 10 + 10 = 20 votos. Vos tenés 40. Ganás igual, porque solo ya tenés más de la mitad.",
      "¿Por qué los demás lo aceptan? Porque vos pusiste más plata y arriesgaste más. El que pone más, decide más y también se lleva más ganancia."
    ],
    base: ['persona', 'socio2', 'socio3', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared', 'mesa'],
    alArrancar: e => e.acciones('repartidas', true),
    vista: 'socios',
    linea: [
      [0.6, e => e.etiqueta('persona', '40 votos', 'grande')],
      [1.4, e => e.etiqueta('socio2', '10 votos', 'precio')],
      [2.0, e => e.etiqueta('socio3', '10 votos', 'precio')],
      [3.2, e => e.etiqueta('mesa', 'Los dos juntos: 20 votos', 'aviso')],
      [5.0, e => e.etiqueta('mesa', '40 contra 20: ¡ganás vos!', 'ok')]
    ]
  },
  {
    tipo: 'sa',
    titulo: "¿Y si estuvieran más parejos?",
    texto: [
      "Imaginá otro reparto: vos tenés 30 acciones, y Pedro y Ana 15 cada uno. Siguen siendo 60 votos.",
      "Si Pedro y Ana se juntan: 15 + 15 = 30 votos. Vos tenés 30. <b>Empate</b>, 30 a 30.",
      "Nadie tiene más de la mitad, así que nadie puede imponer lo suyo. Ya no mandás solo: tenés que convencer al menos a uno de los dos.",
      "<b>Conclusión:</b> el que tiene más de la mitad de las acciones manda solo. Si nadie la tiene, hay que ponerse de acuerdo."
    ],
    base: ['persona', 'socio2', 'socio3', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared', 'mesa'],
    vista: 'socios',
    linea: [
      [0.6, e => e.etiqueta('persona', '30 votos', 'grande')],
      [1.4, e => e.etiqueta('socio2', '15 votos', 'precio')],
      [2.0, e => e.etiqueta('socio3', '15 votos', 'precio')],
      [3.2, e => e.etiqueta('mesa', 'Los dos juntos: 30 votos', 'aviso')],
      [5.0, e => e.etiqueta('mesa', '30 a 30: EMPATE, nadie manda solo', 'deuda')]
    ]
  },
  {
    tipo: 'sa',
    titulo: "La junta: la reunión de los dueños",
    texto: [
      "Una <b>junta</b> es la reunión de los dueños, donde votan.",
      "La <b>junta ordinaria</b> es la de todos los años. Sirve para ver cómo le fue a la empresa el año anterior: aprobar las cuentas, o sea, cuánto se ganó o se perdió, y decidir qué hacer con las ganancias.",
      "Se hace <b>en los primeros 6 meses</b> del año, para revisar pronto las cuentas del año que terminó. <b>Ejemplo:</b> las cuentas de 2025 se aprueban en una junta entre enero y junio de 2026. La siguiente, entre enero y junio de 2027.",
      "<b>Ojo:</b> no es una junta cada 6 meses. Es <b>una por año</b>, en la primera mitad del año.",
      "En el examen dicen \"dentro de los seis primeros meses de cada <b>ejercicio</b>\". Ejercicio es el año de cuentas de la empresa, que casi siempre va de enero a diciembre."
    ],
    base: ['persona', 'socio2', 'socio3', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared', 'mesa'],
    alArrancar: e => e.acciones('repartidas', true),
    vista: 'socios',
    linea: [
      [0.6, e => e.etiqueta('mesa', 'JUNTA ORDINARIA: 1 vez por año, entre enero y junio', 'ok')],
      [2.0, e => e.etiqueta('persona', '¿Cuánto ganamos el año pasado?', 'globo')],
      [3.2, e => e.etiqueta('socio2', 'Aprobamos las cuentas', 'globo')]
    ]
  },
  {
    tipo: 'sa',
    titulo: "¿Quién obliga a hacer la junta?",
    texto: [
      "La junta ordinaria es <b>obligatoria</b>: lo dice la ley. No depende de las ganas de nadie.",
      "<b>¿Quién manda el aviso?</b> No son los dueños. Lo mandan los <b>administradores</b>, que son los jefes que los dueños eligieron para dirigir la empresa. Los vas a ver en el paso siguiente.",
      "Es como en un edificio: el administrador de la finca manda el aviso de la reunión, y vos, que sos dueño de tu piso, recibís la invitación. <b>No te obligan a ir.</b> La junta es para que puedas votar y controlar qué se hace con tu plata. Si no vas, deciden los que van.",
      "<b>¿Y si los administradores no la convocan a tiempo?</b> Los socios pueden pedir que la convoque el <b>secretario judicial</b> o el <b>registrador mercantil</b> del domicilio de la empresa. El secretario judicial es un funcionario que trabaja en el juzgado. Así, aunque el que tiene más acciones no quiera, la junta se hace igual.",
      "<b>Así lo pregunta el examen:</b> \"Si la junta general ordinaria no fuere convocada dentro del plazo legal, se podrá convocar, a petición de los socios, por…\"<br>a) el registrador mercantil del domicilio social.<br>b) el secretario judicial del domicilio social.<br>c) el juez de lo mercantil del domicilio social.<br>d) Las respuestas A y B son correctas.<br>→ Correcta: <b>d</b>. Ojo con la c: el juez no. Si en otra versión de la pregunta no está el registrador, marcá <b>el secretario judicial</b>.",
      "<b>Junta extraordinaria</b> = cualquier otra junta, cuando hay que decidir algo fuera de la de todos los años. Si la piden socios que tengan <b>al menos el 5%</b> del capital, los administradores <b>tienen que convocarla</b>.",
      "<b>Junta constituyente</b> = la primera de todas, la que se hace para crear la sociedad. La vemos más adelante."
    ],
    base: ['persona', 'socio2', 'socio3', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared', 'mesa'],
    alArrancar: e => e.acciones('repartidas', true),
    vista: 'socios',
    linea: [
      [0.6, e => e.etiqueta('persona', 'No quiero hacer la junta', 'globo')],
      [2.0, e => e.etiqueta('socio3', 'Se la pedimos al secretario judicial o al registrador', 'globo')],
      [3.6, e => e.etiqueta('mesa', 'La junta se hace igual: lo dice la ley', 'ok')]
    ]
  },
  {
    tipo: 'sa',
    titulo: "Los jefes del día a día: el consejo de administración",
    texto: [
      "Los dueños no siempre manejan la empresa ellos mismos. En la junta eligen a quienes la van a dirigir todos los días: contratar choferes, comprar gasoil, mandar los camiones.",
      "Esos jefes se llaman <b>administradores</b>. Pueden ser socios o gente de afuera.",
      "Puede ser <b>una sola persona</b>, que se llama administrador único, o un grupo. Cuando la dirección se le da a <b>más de dos personas juntas</b>, ese grupo se llama <b>consejo de administración</b>, y tiene que tener <b>al menos 3</b>.",
      "<b>Ejemplo:</b> en la junta, los dueños eligen a Pedro, que es socio, y a Laura y Marcos, que son de afuera. Ellos tres forman el consejo de administración.",
      "<b>No confundas:</b> la junta son los dueños votando las cosas grandes. El consejo son los jefes del día a día."
    ],
    base: ['persona', 'socio2', 'socio3', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared'],
    alArrancar: e => e.acciones('repartidas', true),
    vista: 'empresa',
    linea: [
      [0.6, e => e.etiqueta('registro', 'CONSEJO DE ADMINISTRACIÓN: 3 o más jefes del día a día', 'ok')],
      [2.2, e => e.etiqueta('persona', 'Nosotros, los dueños, votamos en la junta', 'globo')]
    ]
  },
  {
    tipo: 'sa',
    titulo: "Cómo \"nace\" la SA: como un bebé",
    texto: [
      "Crear una SA tiene <b>2 pasos</b>, parecido a cuando nace un bebé.",
      "<b>Paso 1: firmar la escritura ante notario.</b> La escritura de constitución es el papel donde dice quiénes son los socios, cuánta plata pone cada uno y cómo se llama la empresa. El notario es un profesional que da fe de que lo que se firma es verdad. Es como el certificado de nacimiento. En el examen, a esta firma se le dice <b>otorgamiento</b> de la escritura.",
      "<b>Paso 2: anotarla en el Registro Mercantil.</b> Cuando nace un bebé, los padres lo anotan en el Registro Civil y desde ese momento existe oficialmente. Con las empresas es igual: el Registro Mercantil es la oficina donde se anotan todas las empresas.",
      "Desde que la anotan, la SA existe de verdad. En el examen se dice que <b>adquiere personalidad jurídica</b>: para la ley pasa a ser como una persona, con sus propias cosas y sus propias deudas. Por eso aparece la pared que protege tu casa.",
      "<b>Ejemplo:</b> firman ante notario el 1 de marzo de 2026 y la anotan en el Registro el 20 de marzo. Desde el 20 de marzo, la SA existe del todo.",
      "Como va al Registro Mercantil y es una empresa para hacer negocios, el examen dice que la SA tiene carácter <b>mercantil</b>."
    ],
    base: ['persona', 'socio2', 'socio3', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared'],
    alArrancar: e => e.acciones('repartidas', true),
    vista: 'empresa',
    linea: [
      [0.6, e => e.etiqueta('escritura', '1) Firman ante notario: 1 de marzo de 2026', 'aviso')],
      [2.6, e => e.etiqueta('registro', '2) Anotada en el Registro Mercantil: ¡NACIÓ! ✔', 'ok')]
    ]
  },
  {
    tipo: 'sa',
    titulo: "¿Y si firman pero nunca la inscriben?",
    texto: [
      "Firmaron ante notario, pero <b>nunca piden</b> que la anoten en el Registro.",
      "La ley les da <b>1 año</b> desde la firma. <b>Ejemplo:</b> firmaron el 1 de marzo de 2026, así que tienen hasta el 1 de marzo de 2027 para pedirlo.",
      "Si pasa ese año sin pedirlo, la sociedad queda <b>irregular</b>: existe a medias, como una empresa mal hecha. Y lo más grave: los socios pueden perder la pared y terminar respondiendo con sus cosas, como un autónomo.",
      "En el examen dicen que la SA \"<b>deviene irregular</b>\". Deviene quiere decir \"se vuelve\". No se vuelve nula ni inexistente: se vuelve <b>irregular</b>."
    ],
    base: ['persona', 'socio2', 'socio3', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared'],
    alArrancar: e => e.acciones('repartidas', true),
    vista: 'general',
    linea: [
      [0.6, e => e.etiqueta('escritura', 'Firmada el 1/3/2026… y nunca la inscribieron', 'aviso')],
      [2.2, e => e.etiqueta('registro', '1/3/2027: pasó 1 año → IRREGULAR', 'deuda')],
      [3.4, e => { e.mostrar('pared', false); e.mostrar('linea', false); }],
      [4.0, e => e.etiqueta('pared', 'Sin pared: los socios pueden responder con lo suyo', 'aviso')],
      [5.0, e => { e.etiqueta('casa', 'En riesgo', 'deuda'); e.etiqueta('auto', 'En riesgo', 'deuda'); }]
    ]
  },
  {
    tipo: 'sa',
    titulo: "La escritura: qué datos lleva",
    texto: [
      "La escritura de constitución tiene que decir, entre otras cosas: <b>quiénes son los socios</b>, cuánta plata pone cada uno, el nombre de la empresa, el capital y sus reglas, que se llaman <b>estatutos</b>.",
      "<b>Lo que no hace falta poner:</b> el estado civil de los que firman, o sea, si están casados o solteros. El examen lo pregunta mucho.",
      "<b>Y el 25%:</b> tiene que estar puesto <b>antes</b> de firmar la escritura. Primero se deposita la plata y después se firma.",
      "<b>En el examen:</b> \"¿Qué dato tiene que figurar en la escritura?\" → <b>la identidad de los socios</b>. \"¿Qué dato no hace falta?\" → <b>el estado civil</b>."
    ],
    base: ['persona', 'socio2', 'socio3', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared'],
    alArrancar: e => e.acciones('repartidas', true),
    vista: 'empresa',
    linea: [
      [0.6, e => e.etiqueta('escritura', 'ESCRITURA: socios ✔ · plata de cada uno ✔ · nombre ✔ · estatutos ✔', 'ok')],
      [2.6, e => e.etiqueta('registro', 'Estado civil: NO hace falta', 'aviso')]
    ]
  },
  {
    tipo: 'sa',
    titulo: "Otra forma de armarla: salir a buscar gente",
    texto: [
      "Hasta ahora vimos la forma fácil: los socios ya se conocían, tenían la plata y firmaron todos juntos. En el examen eso se llama fundar <b>en un solo acto</b>.",
      "Pero imaginá que tenés una gran idea y no conocés a nadie con plata. Salís a buscar gente que quiera poner plata, como cuando se hace una colecta.",
      "Al que tuvo la idea y sale a buscar gente se lo llama <b>promotor</b>, porque promueve la idea.",
      "Las personas que dicen \"me anoto, compro acciones\" se llaman <b>suscriptores</b>, como cuando te suscribís a algo.",
      "Armarla así, juntando gente de a poco, se llama fundar <b>en forma sucesiva</b>.",
      "<b>En el examen:</b> \"¿Cómo se pueden crear las sociedades anónimas?\" → <b>en un solo acto o en forma sucesiva</b>."
    ],
    base: ['persona', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared'],
    vista: 'socios',
    linea: [
      [0.2, e => e.pensar(true)],
      [0.4, e => e.etiqueta('persona', 'Tengo una idea, pero no tengo socios… ¡salgo a buscar!', 'globo')],
      [2.6, e => { e.pensar(false); e.mostrar('socio2'); }],
      [3.0, e => e.etiqueta('socio2', 'Me anoto: compro acciones', 'globo')],
      [4.4, e => e.mostrar('socio3')],
      [4.8, e => e.etiqueta('socio3', 'Yo también me anoto', 'globo')],
      [6.2, e => e.etiqueta('mesa', 'Promotor = el que busca gente · Suscriptores = los que se anotan', 'ok')]
    ]
  },
  {
    tipo: 'sa',
    titulo: "La lista y el premio del que tuvo la idea",
    texto: [
      "Cuando el promotor termina de juntar gente, tiene que dejar por escrito quiénes se anotaron. Para eso firma ante notario la <b>lista definitiva de suscriptores</b>, y tiene <b>1 mes</b> de plazo.",
      "<b>¿Para qué?</b> Para que quede claro y oficial quiénes son los dueños, y nadie diga después \"yo no me anoté\".",
      "El que tuvo la idea y trabajó para armar todo puede llevarse un <b>premio</b>: ventajas especiales, por ejemplo un poco más de ganancia que los demás. Pero no para siempre: <b>como máximo 10 años</b>.",
      "En el examen, a los que arman la sociedad también se los llama <b>fundadores</b>."
    ],
    base: ['persona', 'socio2', 'socio3', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared'],
    vista: 'socios',
    linea: [
      [0.6, e => e.etiqueta('escritura', 'Lista de los que se anotaron: ante notario, en 1 mes', 'aviso')],
      [2.6, e => e.etiqueta('persona', 'Mi premio por la idea: un extra de ganancia, máximo 10 años', 'precio')]
    ]
  },
  {
    tipo: 'sa',
    titulo: "La junta constituyente: la primera reunión",
    texto: [
      "Ya juntaron a todos. Antes de arrancar, hacen la <b>primera reunión</b> de todos los dueños para dejar la empresa armada. Se llama <b>junta constituyente</b>, porque \"constituir\" quiere decir armar, crear.",
      "<b>¿Qué deciden ahí?</b> Aprueban lo que hizo el promotor. Aprueban las reglas de la empresa, que se llaman <b>estatutos</b>. Deciden cuánto vale lo que alguien puso que no es plata, por ejemplo un camión. Y nombran a los que van a dirigir la empresa.",
      "Para que esa reunión valga, tienen que estar los dueños de <b>al menos la mitad</b> (50%) de la plata que se juntó.",
      "<b>Así lo pregunta el examen:</b> \"En una sociedad anónima, ¿qué se aprueba en la junta constituyente?\"<br>a) Los estatutos.<br>b) El valor de las aportaciones no dinerarias.<br>c) El nombramiento de las personas encargadas de la administración.<br>d) Todas son correctas.<br>→ Correcta: <b>d</b>. En esa reunión se aprueban las tres cosas. \"Aportaciones no dinerarias\" quiere decir lo que se puso que no es plata, como el camión."
    ],
    base: ['persona', 'socio2', 'socio3', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared', 'mesa'],
    alArrancar: e => e.acciones('repartidas', true),
    vista: 'socios',
    linea: [
      [0.6, e => e.etiqueta('mesa', 'PRIMERA REUNIÓN: junta constituyente · vale con el 50%', 'ok')],
      [2.4, e => e.etiqueta('persona', '¿Aprobamos las reglas de la empresa?', 'globo')],
      [4.2, e => e.etiqueta('socio3', 'Yo pongo mi camión: ¿cuánto vale?', 'globo')]
    ]
  },
  {
    tipo: 'sa',
    titulo: "Acciones con nombre o sin nombre",
    texto: [
      "<b>Acción nominativa</b> = lleva escrito el nombre del dueño, como un título a tu nombre.",
      "<b>Acción al portador</b> = no lleva nombre. Es de quien la tenga en la mano, como un billete.",
      "<b>¿Por qué importa?</b> Acordate de que al crearla alcanza con poner el 25%. Pedro tiene 10 acciones de 10.000 €, pero el primer día pone solo 2.500 €: todavía le <b>debe 7.500 €</b> a la empresa.",
      "Si esas acciones no tuvieran nombre, Pedro se las podría dar a un desconocido y desaparecer. ¿A quién le cobra la empresa los 7.500 € que faltan? A nadie.",
      "<b>La regla:</b> mientras la acción no esté pagada entera, tiene que ser <b>nominativa</b>, para saber a quién reclamarle. Solo puede ser <b>al portador</b> cuando ya está pagada del todo.",
      "<b>En el examen:</b> \"Las acciones pueden ser al portador cuando…\" → <b>estén totalmente desembolsadas</b>, o sea, pagadas del todo."
    ],
    base: ['persona', 'socio2', 'socio3', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared'],
    alArrancar: e => e.acciones('repartidas', true),
    vista: 'socios',
    linea: [
      [0.6, e => e.etiqueta('socio2', 'Todavía debo 7.500 €: mi acción lleva mi nombre', 'globo')],
      [3.0, e => e.etiqueta('socio3', 'Yo pagué todo: la mía puede ser al portador', 'globo')]
    ]
  },
  {
    tipo: 'sa',
    titulo: "¿Cuándo se paga lo que falta?",
    texto: [
      "Al crearla pusieron 15.000 €, el 25%. Todavía deben 45.000 €: vos debés 30.000 €, y Pedro y Ana 7.500 € cada uno.",
      "<b>¿Cuándo lo tienen que poner?</b> Lo dicen los <b>estatutos</b>, las reglas que firmaron al crear la empresa. <b>Ejemplo:</b> \"lo que falta se paga en 2 años\".",
      "<b>¿Quién lo pide?</b> Los <b>administradores</b>. Mandan el aviso: \"tenés que poner tus 7.500 € antes de tal fecha\".",
      "<b>¿Y si alguien no paga?</b> No puede votar en la junta, no cobra ganancias hasta que pague, y la empresa le puede reclamar por la justicia o vender sus acciones para cobrarse.",
      "Por eso la acción que no está pagada entera lleva el nombre del dueño: para saber a quién reclamarle."
    ],
    base: ['persona', 'socio2', 'socio3', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared', 'mesa'],
    alArrancar: e => e.acciones('repartidas', true),
    vista: 'socios',
    linea: [
      [0.6, e => e.etiqueta('persona', 'Puse 10.000 € · debo 30.000 €', 'precio')],
      [1.6, e => e.etiqueta('socio2', 'Puse 2.500 € · debo 7.500 €', 'precio')],
      [2.6, e => e.etiqueta('socio3', 'Puse 2.500 € · debo 7.500 €', 'precio')],
      [4.0, e => e.etiqueta('registro', 'Aviso de los administradores: pagá lo que falta antes de la fecha', 'aviso')],
      [6.0, e => e.etiqueta('socio3', 'No pago', 'globo')],
      [7.2, e => e.etiqueta('mesa', 'Si no paga: no vota, no cobra ganancias, le reclaman', 'deuda')]
    ]
  },
  {
    tipo: 'sa',
    titulo: "¿Cómo crece la empresa y cómo entran socios nuevos?",
    texto: [
      "Los 60.000 € son <b>el mínimo para arrancar</b>, no un techo. La empresa crece con lo que gana trabajando y con préstamos del banco, por ejemplo para comprar más camiones.",
      "<b>¿Y si quiere entrar alguien nuevo?</b> Hay dos formas.",
      "<b>1) Un socio vende sus acciones.</b> Ana le vende sus 10 acciones a otra persona. Entra uno y se va otro. La empresa no recibe plata nueva: el capital sigue en 60.000 €.",
      "<b>2) Ampliación de capital.</b> La junta vota hacer <b>acciones nuevas</b>. Llega alguien nuevo, compra 20 acciones y pone 20.000 €. Ahora la empresa tiene 80.000 € y 80 acciones.",
      "<b>Ojo con el control:</b> vos tenías 40 de 60 acciones y mandabas solo. Ahora tenés 40 de 80: justo la mitad. Ya no tenés <b>más</b> de la mitad, así que ya no mandás solo.",
      "Por eso los socios que ya estaban tienen <b>prioridad</b> para comprar las acciones nuevas antes que un desconocido. Se llama <b>derecho de suscripción preferente</b>. Así no pierden su parte."
    ],
    base: ['persona', 'socio2', 'socio3', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared', 'mesa'],
    alArrancar: e => e.acciones('repartidas', true),
    vista: 'socios',
    linea: [
      [0.6, e => e.etiqueta('deuda', '60.000 € es el mínimo para arrancar, no el techo', 'grande')],
      [2.4, e => e.etiqueta('registro', 'Crece con lo que gana y con préstamos del banco', 'ok')],
      [4.4, e => e.mostrar('socio4')],
      [4.9, e => e.etiqueta('socio4', 'Quiero entrar: pongo 20.000 €', 'globo')],
      [6.6, e => e.accionesNuevas('repartidas')],
      [7.2, e => e.etiqueta('mesa', 'Ampliación: 60.000 + 20.000 = 80.000 € · 80 acciones', 'grande')],
      [9.4, e => e.etiqueta('persona', 'Tengo 40 de 80: justo la mitad. ¡Ya no mando solo!', 'aviso')]
    ]
  },
  {
    tipo: 'sa',
    titulo: "Cómo se avisa una junta y cuándo vale",
    texto: [
      "Para hacer una junta, primero hay que avisar a los dueños. Eso se llama <b>convocar</b> la junta.",
      "<b>¿Dónde se avisa?</b> En el Boletín Oficial del Registro Mercantil, que es un diario oficial para empresas, y en la página web de la empresa. Si la empresa <b>no tiene web</b>, es obligatorio ponerlo en uno de los diarios más leídos de la provincia.",
      "<b>¿Con cuánto tiempo?</b> Al menos <b>1 mes antes</b>, para que todos se puedan organizar.",
      "<b>¿Cuántos tienen que ir para que la reunión valga?</b> La primera vez que se llama, que se dice <b>primera convocatoria</b>, tienen que ir los dueños de al menos el <b>25%</b> de las acciones.",
      "Si no van suficientes, se llama otra vez, en <b>segunda convocatoria</b>, y ahí vale con los que vayan, aunque sean pocos."
    ],
    base: ['persona', 'socio2', 'socio3', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared', 'mesa'],
    alArrancar: e => e.acciones('repartidas', true),
    vista: 'socios',
    linea: [
      [0.6, e => e.etiqueta('registro', 'AVISO en el Boletín del Registro Mercantil: 1 mes antes', 'aviso')],
      [2.6, e => e.etiqueta('mesa', '1ª vez: tienen que venir los dueños del 25%', 'ok')],
      [4.6, e => e.etiqueta('mesa', '2ª vez: vale con los que vengan', 'ok')]
    ]
  },
  {
    tipo: 'sa',
    titulo: "El domicilio de la empresa",
    texto: [
      "El <b>domicilio</b> es la dirección oficial de la empresa: la que está anotada en el Registro Mercantil.",
      "A veces la empresa trabaja de verdad en otro lado. <b>Ejemplo:</b> en el Registro figura una oficina en Madrid, pero los camiones y todo el trabajo están en una nave en Getafe.",
      "Si las dos direcciones no coinciden, los demás pueden tomar como válida <b>cualquiera de las dos</b>. \"Los demás\" son los clientes, los proveedores o cualquiera que trate con la empresa. En el examen los llaman <b>terceros</b>."
    ],
    base: ['persona', 'socio2', 'socio3', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared'],
    alArrancar: e => e.acciones('repartidas', true),
    vista: 'empresa',
    linea: [
      [0.6, e => e.etiqueta('registro', 'Anotada en el Registro: oficina en Madrid', 'aviso')],
      [2.2, e => e.etiqueta('escritura', 'Donde trabaja de verdad: nave en Getafe', 'aviso')],
      [3.8, e => e.etiqueta('deuda', 'Si no coinciden: vale cualquiera de las dos', 'ok')]
    ]
  },
  {
    tipo: 'sa',
    titulo: "Repaso: lo que preguntan de la SA",
    texto: [
      "<b>Capital mínimo:</b> 60.000 €. <b>Al crearla:</b> al menos el 25% puesto, antes de firmar la escritura.",
      "<b>Socios:</b> mínimo 1. <b>El capital se divide en:</b> acciones. Los socios son los que tienen acciones.",
      "<b>Responsabilidad:</b> limitada. Los socios no responden personalmente de las deudas de la sociedad.",
      "<b>Nace:</b> escritura ante notario + inscripción en el Registro Mercantil. Ahí adquiere personalidad jurídica. Si no se pide la inscripción en 1 año: irregular.",
      "<b>Junta ordinaria:</b> una por año, en los primeros 6 meses. <b>Extraordinaria:</b> obligatoria si la pide el 5% del capital.",
      "<b>Junta constituyente:</b> aprueba estatutos, aportaciones no dinerarias y administradores. Vale con el 50%.",
      "<b>Avisar una junta:</b> 1 mes antes. Vale con el 25% en primera convocatoria; en segunda, con los que vayan.",
      "<b>Consejo de administración:</b> más de dos administradores juntos, mínimo 3.",
      "<b>Acciones sin pagar del todo:</b> nominativas. <b>Al portador:</b> solo si están totalmente desembolsadas."
    ],
    base: ['persona', 'socio2', 'socio3', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared'],
    alArrancar: e => e.acciones('repartidas', true),
    vista: 'general',
    linea: []
  },
  {
    tipo: 'sa',
    titulo: "Preguntas oficiales: sociedad anónima",
    texto: [],
    base: ['persona', 'socio2', 'socio3', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared'],
    alArrancar: e => e.acciones('repartidas', true),
    vista: 'general',
    linea: [],
    quiz: true
  }
];
