// ==========================================
// CAPÍTULO 4: COOPERATIVA
// Personas que se juntan para ayudarse y trabajar en común.
// Lo que es DISTINTO a la SA y a la SL va marcado en naranja.
// ==========================================

const DIF = '<span class="badge-dif">≠ DISTINTO A LA SA Y LA SL</span> ';
const d = t => `<span class="distinto">${t}</span>`;

const TODOS = ['persona', 'socio2', 'socio3', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared'];
const TODOS_MESA = [...TODOS, 'mesa'];
const socios = e => e.etiqueta('mesa', 'Vos, Pedro y Ana: socios de la cooperativa', 'precio');

export const PASOS_COOPERATIVA = [
  {
    tipo: 'cooperativa',
    titulo: 'Ahora: la COOPERATIVA',
    texto: [
      '<b>Vida real:</b> vos, Pedro y Ana tienen <b>cada uno su camión</b> y trabajan solos. Solos consiguen pocos clientes y pagan caro el combustible.',
      'Entonces se juntan: "armemos algo <b>entre los tres</b> para conseguir más cargas, comprar el combustible juntos más barato y tener una sola oficina". Eso es una <b>cooperativa</b>: personas que se juntan para <b>ayudarse</b> y hacer algo en común.',
      '<b>¿Por qué alguien la elegiría?</b> Porque sola, una persona es chica; juntos son más fuertes, y cada uno sigue siendo socio con los mismos derechos.',
      'En el examen vas a ver dos clases. La <b>cooperativa de transportistas</b> es esta: cada uno tiene su camión y se ayudan entre todos. La <b>cooperativa de trabajo asociado</b> es otra, donde trabajan juntos para la cooperativa; la vemos más adelante.',
      '<b>En el examen:</b> "¿Puede una cooperativa hacer transporte público de mercancías?" → <b>Sí</b>, sin límite de lugar. "¿A qué se puede dedicar?" → a <b>cualquier actividad económica lícita</b>, o sea, legal.'
    ],
    base: ['persona', 'socio2', 'socio3', 'casa', 'auto', 'empresa', 'camion', 'linea', 'pared'],
    vista: 'general',
    linea: [
      [0.6, e => e.etiqueta('globo', 'Solos somos chicos: ¡juntémonos!', 'globo')],
      [3.0, e => { e.etiqueta('globo', null); socios(e); }],
      [4.4, e => e.etiqueta('deuda', 'COOPERATIVA = personas que se juntan para ayudarse', 'ok')]
    ]
  },
  {
    tipo: 'cooperativa',
    titulo: 'Tiene su propia ley y su propio registro',
    texto: [
      DIF + 'La SA y la SL se inscriben en el <b>Registro Mercantil</b>. La cooperativa no: va al ' + d('Registro de Sociedades Cooperativas') + '.',
      '<b>¿Por qué otro registro?</b> Porque la cooperativa tiene <b>su propia ley</b> (la Ley de Cooperativas), con reglas distintas a las de la SA y la SL.',
      '<b>Así lo pregunta el examen:</b> "¿Dónde se tienen que inscribir las cooperativas de transportistas?" a) En el Registro Mercantil. b) En el Registro de Sociedades Cooperativas. c) En el Registro de Empresas y Actividades de Transporte. d) En el mismo registro que cualquier sociedad mercantil.',
      'La correcta es la <b>b</b>. La a y la d son el Registro Mercantil, el de la SA y la SL. La c es el registro de las empresas de transporte, que sirve para los permisos de transporte, pero no es donde se crea la cooperativa.',
      '<b>Otra pregunta:</b> "Las cooperativas de transportistas siguen las reglas de las…" → de las <b>sociedades cooperativas</b>, que tienen su propia ley. No las de la SA ni la SL.'
    ],
    base: TODOS,
    alArrancar: socios,
    vista: 'empresa',
    linea: [
      [0.6, e => e.etiqueta('registro', 'Registro de Sociedades COOPERATIVAS (no el Mercantil)', 'ok')]
    ]
  },
  {
    tipo: 'cooperativa',
    titulo: 'Primer grado y segundo grado',
    texto: [
      'Las cooperativas pueden ser de dos formas, y <b>solo de dos</b>:',
      '<b>De primer grado</b> = la forman <b>personas</b>. Hacen falta como mínimo <b>3 socios</b>. Es la de vos, Pedro y Ana.',
      '<b>De segundo grado</b> = la forman <b>cooperativas</b>. Por ejemplo, tu cooperativa de Madrid se junta con otra de Valencia para ser más grandes. Hacen falta como mínimo <b>2 cooperativas</b>.',
      '<b>Truco:</b> 1º grado → personas, mínimo 3. 2º grado → cooperativas, mínimo 2.',
      '<b>Trampas del examen:</b> no existe cooperativa de tercer ni de cuarto grado. Y con 3 personas solo se puede formar una de <b>primer grado</b>.'
    ],
    base: TODOS_MESA,
    alArrancar: socios,
    vista: 'socios',
    linea: [
      [0.6, e => e.etiqueta('mesa', '1º grado: personas (mínimo 3 socios)', 'ok')],
      [2.6, e => e.etiqueta('registro', '2º grado: cooperativas (mínimo 2 cooperativas)', 'aviso')]
    ]
  },
  {
    tipo: 'cooperativa',
    titulo: 'Un socio, un voto',
    texto: [
      '<b>Acordate de la SA:</b> se votaba por acciones. El que puso 40.000 € tenía 40 votos y mandaba solo.',
      DIF + 'En la cooperativa, en general, ' + d('cada socio tiene un voto') + ', sin importar cuánta plata puso.',
      '<b>Ejemplo:</b> vos ponés más plata que Pedro y que Ana. Igual: <b>vos 1 voto, Pedro 1 voto, Ana 1 voto</b>. Nadie manda solo por tener más plata.',
      '<b>¿Por qué?</b> Porque la cooperativa es de <b>personas que se ayudan</b>, no de plata. Todos valen lo mismo.',
      'Por eso en el examen se habla de <b>votos sociales</b>: los votos de los socios.'
    ],
    base: TODOS_MESA,
    vista: 'socios',
    linea: [
      [0.6, e => e.etiqueta('persona', '1 voto', 'precio')],
      [1.2, e => e.etiqueta('socio2', '1 voto', 'precio')],
      [1.8, e => e.etiqueta('socio3', '1 voto', 'precio')],
      [3.0, e => e.etiqueta('mesa', 'Un socio = un voto, aunque haya puesto más plata', 'ok')]
    ]
  },
  {
    tipo: 'cooperativa',
    titulo: 'Las partes de la cooperativa: asamblea, consejo rector e intervención',
    texto: [
      '<b>Pensalo como un edificio de vecinos.</b> Están todos los vecinos, unos pocos que se encargan de las cosas, y alguien que revisa que las cuentas estén bien. La cooperativa tiene esas mismas tres partes:',
      '<b>1) Asamblea general</b> = la reunión de <b>todos los socios</b>, como la reunión de todos los vecinos. Ahí se decide lo importante y <b>se elige a los demás</b>. En la SA se llamaba junta general.',
      '<b>2) Consejo rector</b> = los que <b>dirigen</b> la cooperativa en el día a día, como el presidente y los que se encargan del edificio. <b>¿Quién los pone?</b> La <b>asamblea general los elige</b> votando, entre los socios. En la SA se llamaba consejo de administración. <b>Dato del examen:</b> en una cooperativa de 10 socios, el consejo rector tiene que tener <b>al menos 3</b>.',
      '<b>3) Intervención</b> = los que <b>revisan las cuentas</b>, como el vecino que controla que el administrador no se quede con plata. A cada uno se le llama <b>interventor</b>. <b>¿Quién los pone?</b> También los <b>elige la asamblea general</b> votando, y en general son socios. Cuántos hay lo dicen los estatutos.',
      '<b>Ejemplo:</b> en la asamblea votan y queda así: <b>vos y Pedro</b> en el consejo rector, que dirigen. <b>Ana</b> es la interventora: antes de la asamblea de cada año revisa las facturas y la plata, y les dice a todos "las cuentas están bien" o "acá falta plata".',
      '<b>¿Por qué el que revisa no es el mismo que dirige?</b> Porque nadie puede controlarse a sí mismo. El que maneja la plata no puede ser el que revisa si la manejó bien.',
      '<b>Trampa del examen:</b> te preguntan "¿cuál es un órgano de la cooperativa?" y en las opciones ponen palabras de la SA: <b>junta general de accionistas</b>, <b>consejo de administración</b>, <b>junta constituyente</b>. Esas no. Las de la cooperativa son: <b>asamblea general, consejo rector e intervención</b>.'
    ],
    base: TODOS_MESA,
    alArrancar: socios,
    vista: 'socios',
    linea: [
      [0.6, e => e.etiqueta('mesa', 'ASAMBLEA GENERAL: todos los socios votan y eligen', 'ok')],
      [3.0, e => e.etiqueta('persona', 'Consejo rector: dirijo', 'precio')],
      [3.6, e => e.etiqueta('socio2', 'Consejo rector: dirijo', 'precio')],
      [4.8, e => e.etiqueta('socio3', 'Interventora: reviso las cuentas', 'aviso')]
    ]
  },
  {
    tipo: 'cooperativa',
    titulo: 'La asamblea general: cuándo y cuándo vale',
    texto: [
      'Una vez por año los socios se reúnen para ver <b>cómo fue el año</b>: cuánto se ganó y cuánto se gastó. Esa reunión es la <b>asamblea general ordinaria</b>.',
      '<b>Una palabra que vas a ver en el examen: "ejercicio económico".</b> Es el <b>año de cuentas</b> de la empresa. Casi siempre va del 1 de enero al 31 de diciembre. Cuando termina, se dice que "cierra el ejercicio".',
      '<b>¿Cuándo hay que hacer la asamblea?</b> El <b>consejo rector</b> la tiene que convocar dentro de los <b>6 meses</b> después de que cierra el ejercicio. <b>Ejemplo:</b> el ejercicio cierra el 31 de diciembre, así que la asamblea se hace como tarde a fines de junio.',
      '<b>Así lo pregunta el examen:</b> "La asamblea general ordinaria la tiene que convocar el consejo rector dentro de los… siguientes al cierre del ejercicio económico:"<br>a) 6 meses<br>b) 4 meses<br>c) 3 meses<br>d) 2 meses<br>→ La correcta es <b>a) 6 meses</b>.',
      '<b>¿Con cuánto tiempo se avisa?</b> Como <b>máximo 2 meses</b> antes. <b>Ejemplo:</b> si la asamblea es el 20 de junio, el aviso no puede salir antes del 20 de abril. <b>No te mezcles:</b> 6 meses es el plazo para hacerla; 2 meses es lo máximo que se puede avisar antes.',
      '<b>¿Cuándo vale la reunión?</b> La primera vez que se llama (primera convocatoria), tienen que estar presentes o representados <b>más del 50% de los votos</b>. <b>Ejemplo:</b> en una cooperativa de 10 socios, tienen que estar <b>al menos 6</b>. "Representado" = un socio que no puede ir le da permiso a otro para que vote por él.'
    ],
    base: TODOS_MESA,
    alArrancar: socios,
    vista: 'socios',
    linea: [
      [0.6, e => e.etiqueta('registro', 'Asamblea ordinaria: dentro de los 6 meses', 'ok')],
      [2.6, e => e.etiqueta('mesa', '1ª convocatoria: más del 50% de los votos', 'aviso')]
    ]
  },
  {
    tipo: 'cooperativa',
    titulo: 'La asamblea extraordinaria y las grandes decisiones',
    texto: [
      '<b>Extraordinaria</b> = una asamblea fuera de la de todos los años, para algo urgente.',
      '<b>¿Quién la puede pedir?</b> Socios que tengan al menos el <b>20% de los votos</b>. <b>Ejemplo:</b> en una de 10 socios, alcanza con que la pidan 2.',
      '<b>¿Y si el consejo rector no les hace caso?</b> Si en <b>un mes</b> no la convoca, los socios pueden pedirle al <b>juez</b> que la convoque.',
      '<b>Las grandes decisiones</b> son tres: cambiar los estatutos, que son las reglas; transformar la cooperativa en otro tipo de empresa; o cerrarla. Para eso hacen falta <b>dos tercios</b> de los votos presentes o representados. <b>Ejemplo:</b> si votan 9, hacen falta 6 a favor.'
    ],
    base: TODOS_MESA,
    alArrancar: socios,
    vista: 'socios',
    linea: [
      [0.6, e => e.etiqueta('socio3', 'Pedimos asamblea: tenemos el 20% de los votos', 'globo')],
      [2.6, e => e.etiqueta('registro', 'Si en 1 mes no la convocan: al juez', 'aviso')],
      [4.6, e => e.etiqueta('mesa', 'Cambiar estatutos o cerrar: 2/3 de los votos', 'ok')]
    ]
  },
  {
    tipo: 'cooperativa',
    titulo: 'La cooperativa de trabajo asociado',
    texto: [
      'Hasta ahora, cada uno tenía su camión y se ayudaban. Ahora, otra idea: vos, Pedro y Ana <b>trabajan juntos para la cooperativa</b>. La cooperativa es su trabajo. Eso es una <b>cooperativa de trabajo asociado</b>.',
      '<b>¿Qué aportan los socios?</b> <b>Tanto capital como trabajo</b>: ponen plata y además trabajan ahí. No solo plata, no solo trabajo.',
      '<b>Mínimo de socios:</b> <b>3</b>.',
      '<b>Responsabilidad:</b> <b>limitada a lo que aportaron</b>. Si la cooperativa debe plata, la casa no se toca.',
      DIF + '<b>Capital mínimo:</b> ' + d('lo dicen los estatutos') + ', no la ley. En la SA, en cambio, la ley pide 60.000 €.',
      '<b>Trampas del examen:</b> no tiene <b>acciones</b>, no va al <b>Registro Mercantil</b> y no paga el <b>IRPF</b>, que es el impuesto del autónomo.'
    ],
    base: TODOS,
    alArrancar: socios,
    vista: 'socios',
    linea: [
      [0.6, e => e.etiqueta('persona', 'Pongo plata y además trabajo acá', 'globo')],
      [2.6, e => e.etiqueta('pared', 'Responsabilidad limitada a lo que aportaron', 'ok')]
    ]
  },
  {
    tipo: 'cooperativa',
    titulo: 'Empleados que no son socios: hasta el 30% de las horas',
    texto: [
      '¿La cooperativa de trabajo asociado puede contratar empleados que <b>no</b> sean socios? <b>Sí, pero con un tope.</b>',
      'Sus horas no pueden pasar del ' + d('30% de las horas que trabajan los socios') + ' en el año.',
      '<b>Ejemplo:</b> vos, Pedro y Ana trabajan 40 horas por semana cada uno: <b>120 horas</b>. El 30% de 120 son <b>36 horas</b>. Eso es lo máximo para todos los empleados no socios juntos: menos que un empleado a jornada completa.',
      '<b>¿Por qué?</b> Porque la idea es que el trabajo lo hagan <b>los socios</b>.',
      '<b>No confundas:</b> cooperativa de trabajo asociado = <b>30%</b>. Sociedad laboral = <b>49%</b>.'
    ],
    base: TODOS,
    alArrancar: e => { socios(e); e.mostrar('socio4'); },
    vista: 'socios',
    linea: [
      [0.6, e => e.etiqueta('mesa', 'Socios: 40 + 40 + 40 = 120 horas por semana', 'ok')],
      [2.4, e => e.etiqueta('socio4', 'Empleado no socio: como mucho 36 horas (30%)', 'aviso')]
    ]
  },
  {
    tipo: 'cooperativa',
    titulo: 'No la confundas con la laboral',
    texto: [
      'Las dos son "de los que trabajan", y por eso el examen las mezcla. La diferencia:',
      '<b>Sociedad laboral</b> = es una <b>SA o SL</b>. Se mira <b>la plata</b>: más del 50% del capital tiene que ser de los trabajadores. Se vota por capital.',
      '<b>Cooperativa</b> = es <b>otra cosa</b>, con su propia ley y su propio registro. Se mira <b>a las personas</b>: un socio, un voto.',
      '<b>En el examen:</b> "¿En qué sociedad más del 50% del capital tiene que ser de los trabajadores?" → en las <b>sociedades laborales</b>, no en las cooperativas.'
    ],
    base: TODOS,
    alArrancar: socios,
    vista: 'general',
    linea: [
      [0.6, e => e.etiqueta('deuda', 'Laboral: más del 50% de la PLATA es de los trabajadores', 'aviso')],
      [2.8, e => e.etiqueta('registro', 'Cooperativa: un socio, un voto', 'ok')]
    ]
  },
  {
    tipo: 'cooperativa',
    titulo: 'Repaso: la cooperativa',
    texto: [
      '<b>Qué es:</b> personas que se juntan para ayudarse. Puede hacer transporte de mercancías y cualquier actividad legal.',
      '<b>Registro:</b> el de <b>Sociedades Cooperativas</b>, no el Mercantil.',
      '<b>Formas:</b> <b>1º grado</b>, de personas, mínimo 3 socios. <b>2º grado</b>, de cooperativas, mínimo 2. No hay más.',
      '<b>Votos:</b> un socio, un voto.',
      '<b>Órganos:</b> <b>asamblea general</b>, <b>consejo rector</b> e <b>intervención</b>. Con 10 socios, el consejo rector tiene como mínimo 3.',
      '<b>Asamblea:</b> ordinaria dentro de los <b>6 meses</b> · aviso como máximo <b>2 meses</b> antes · vale con <b>más del 50%</b> · extraordinaria si la pide el <b>20%</b>, y si no la convocan en <b>1 mes</b>, el juez · cambiar estatutos o cerrar: <b>2/3</b>.',
      '<b>Trabajo asociado:</b> ponen <b>capital y trabajo</b> · mínimo 3 · responsabilidad limitada · capital mínimo en los estatutos · no socios hasta el <b>30%</b> de las horas.'
    ],
    base: TODOS,
    alArrancar: socios,
    vista: 'general',
    linea: []
  },
  {
    tipo: 'cooperativa',
    titulo: 'Preguntas oficiales: cooperativa',
    texto: [],
    base: TODOS,
    vista: 'general',
    linea: [],
    quiz: true
  }
];
