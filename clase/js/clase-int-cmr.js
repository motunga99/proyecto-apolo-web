// ==========================================
// INTERNACIONAL · CAPÍTULO 2: LA CARTA DE PORTE CMR
// El Convenio CMR, la carta de porte (papel y electrónica),
// quién responde por la mercancía y cuánto se paga. Solo Mercancías.
// ==========================================

const BASE = ['camion', 'vos', 'apolo', 'remitente'];
const LYON = [...BASE, 'cliente', 'quesos'];

export const PASOS_CMR = [
  {
    tipo: 'cmr',
    titulo: '¿Qué es el CMR?',
    texto: [
      'La <b>Bodega Sol</b>, de Madrid, le vende vino a un cliente de Lyon y contrata a Proyecto Apolo para llevarlo.',
      'Como el viaje va de un país a otro, el contrato sigue las reglas del <b>Convenio CMR</b>. CMR son las siglas en francés de "Contrato de transporte internacional de Mercancías por carretera". <b>Truco:</b> C de Contrato, M de Mercancías, R de Ruta.',
      'Es un acuerdo entre muchos países, firmado en <b>Ginebra</b>. España se sumó en <b>1973</b>.',
      '<b>Es solo para:</b> mercancías, por carretera y entre países. No sirve para barcos, trenes ni viajeros, y no tiene nada que ver con los controles de la policía.'
    ],
    base: BASE,
    vista: 'madrid',
    linea: [
      [0.6, e => e.etiqueta('remitente', 'Bodega Sol: llevame este vino a Lyon', 'globo')],
      [3.0, e => e.etiqueta('camion', 'Madrid → Lyon: viaje con Convenio CMR', 'ok')]
    ]
  },
  {
    tipo: 'cmr',
    titulo: '¿Cuándo se aplica el CMR?',
    texto: [
      'Se aplica cuando la carga se hace en un país y la entrega en <b>otro país distinto</b>, y al menos uno de los dos firmó el Convenio.',
      '<b>Ejemplos:</b><br>• Madrid → Lyon: <b>sí</b> es CMR, porque son dos países.<br>• Madrid → Valencia: <b>no</b> es CMR, porque es un viaje dentro de España.',
      '<b>No importa</b> de qué país son el que manda, el transportista o el que recibe.',
      '<b>Tampoco importa la distancia.</b><br><b>Ejemplo:</b> un viaje cortito de 20 km que sale de un pueblo de España y entra a un pueblo de Francia también es CMR, porque cruza de un país a otro.',
      '<b>Viajes que quedan fuera del CMR:</b> las <b>mudanzas</b>, los <b>funerarios</b> y los que van por correo con los convenios postales internacionales.',
      '<b>¿Se puede pactar algo distinto a lo que dice el Convenio?</b> No. Si el que manda y el transportista firman algo en contra del CMR, eso no vale. En el examen dicen que es <b>nulo</b>. Solo hay unas pocas excepciones cuando el viaje lo hacen varios transportistas, uno detrás de otro. Y los países tampoco pueden hacer acuerdos entre ellos en contra del CMR.'
    ],
    base: BASE,
    vista: 'madrid',
    linea: [
      [0.6, e => e.etiqueta('camion', 'Carga en un país, entrega en otro → CMR', 'ok')],
      [3.0, e => e.etiqueta('apolo', 'Mudanzas y funerarios: fuera del CMR', 'aviso')]
    ]
  },
  {
    tipo: 'cmr',
    titulo: 'La carta de porte CMR: quién la firma y cuántas copias',
    texto: [
      'El papel del viaje se llama <b>carta de porte CMR</b>. Es la prueba del contrato.',
      '<b>¿Quién la firma?</b> Dos personas: el que manda la mercancía, que en el CMR se llama <b>remitente</b> (la Bodega Sol), y el <b>transportista</b> (vos). El que recibe en Lyon no la firma al salir.',
      '<b>¿Cuántas copias?</b> Se hacen <b>3</b>:<br>• una para el remitente, la Bodega Sol;<br>• una para el transportista, vos;<br>• una que <b>va con la mercancía</b> en el camión y llega al cliente de Lyon.<br>La aduana no se queda con ninguna.',
      '<b>Si la carga va en varios camiones</b>, o son varios lotes distintos, cualquiera de los dos, remitente o transportista, puede pedir una carta de porte para cada uno.',
      '<b>Si la Bodega Sol pone datos mal</b> en la carta de porte, ella responde de los perjuicios que te cause a vos.'
    ],
    base: BASE,
    vista: 'madrid',
    carpeta: ['cmr'],
    linea: [
      [0.6, e => e.mostrar('tarjetaCMR')],
      [0.9, e => e.etiqueta('remitente', 'Remitente: firmo y me quedo una copia', 'globo')],
      [3.0, e => e.etiqueta('camion', 'Otra copia viaja con el vino hasta Lyon', 'ok')]
    ]
  },
  {
    tipo: 'cmr',
    titulo: '¿Qué dice la carta de porte CMR?',
    texto: [
      '<b>Lo que tiene que decir:</b><br>• lugar y fecha en que se hizo;<br>• lugar y fecha de la carga, y dónde se entrega;<br>• nombre y domicilio del remitente, del transportista y del destinatario;<br>• qué mercancía es, cómo va embalada, cuántos bultos y el peso total;<br>• las instrucciones para la aduana, si hacen falta;<br>• que el viaje va con el Convenio CMR;<br>• si está prohibido pasar la carga a otro camión, cuando sea el caso. En el examen eso se llama <b>prohibición de transbordo</b>.',
      '<b>Lo que puede decir, si quieren:</b> qué gastos paga el remitente y el valor que declara para la mercancía.',
      '<b>Lo que no hace falta:</b> la matrícula, los kilómetros, la ruta, las aduanas por las que pasás, la compañía de seguros, quién carga y descarga, el peso de cada paquete, sus medidas o la tara del camión.<br><b>Truco:</b> se pone el <b>peso total</b> de la carga, no el de cada caja.'
    ],
    base: BASE,
    alArrancar: e => e.yaVisible('tarjetaCMR'),
    vista: 'madrid',
    carpeta: ['cmr'],
    linea: [
      [0.6, e => e.etiqueta('camion', 'Quién, qué, cuánto pesa, de dónde a dónde', 'precio')]
    ]
  },
  {
    tipo: 'cmr',
    titulo: 'La carta de porte electrónica',
    texto: [
      'La carta de porte CMR también se puede hacer <b>en el celular o la computadora</b>. Vale <b>lo mismo</b> que la de papel y tiene que decir <b>lo mismo</b>. No hace falta llevar además la de papel.',
      '<b>Para que valga</b>, las partes la firman con una <b>firma electrónica fiable</b>. Esa firma tiene que:<br>• identificar a quien firma;<br>• ser solo de esa persona;<br>• hacer que se note si alguien cambia algo después.<br>Si las tres opciones están bien, se marca <b>todas</b>. Si una está mal escrita, por ejemplo habla del cónyuge o dice "aunque no se note el cambio", se marca solo la de <b>identificar al firmante</b>.',
      'Tiene que proteger <b>todos</b> los datos, no solo los más importantes.',
      'Por medios electrónicos también se pueden mandar los pedidos, instrucciones y papeles del contrato, por ejemplo los de la aduana.',
      'El transportista le da al remitente un <b>recibo</b> de la mercancía y los datos para identificar el envío y para entrar a la carta de porte.'
    ],
    base: BASE,
    alArrancar: e => e.yaVisible('tarjetaCMR'),
    vista: 'madrid',
    carpeta: ['cmr'],
    linea: [
      [0.6, e => e.etiqueta('remitente', 'La firmamos con firma electrónica fiable', 'ok')]
    ]
  },
  {
    tipo: 'cmr',
    titulo: 'Cambios durante el viaje',
    texto: [
      '<b>El remitente puede cambiar de idea.</b> Mientras el viaje no terminó, la Bodega Sol puede parar el transporte, cambiar el lugar de entrega o cambiar el destinatario. En el examen esto se llama <b>derecho a disponer de la mercancía</b>. Eso sí: te tiene que pagar los gastos que te cause.<br><b>Ejemplo:</b> a mitad de camino te llama y te dice "no vayas a Lyon, llevalo a París". Podés hacerlo, y ella paga el gasto extra.',
      '<b>Si antes de llegar no podés cumplir</b> el viaje como estaba pactado, por ejemplo porque se cortó la ruta, pedís instrucciones a <b>quien tiene derecho a disponer</b> de la mercancía.',
      '<b>Si ya llegaste y no podés entregar</b>, por ejemplo porque el cliente no está, pedís instrucciones <b>al remitente</b>.',
      '<b>Mercancías peligrosas:</b> el remitente te tiene que avisar exactamente qué peligro tienen. Si no te avisó, podés descargarlas o destruirlas sin tener que pagar nada.'
    ],
    base: LYON,
    alArrancar: e => e.yaVisible('tarjetaCMR'),
    vista: 'frontera',
    carpeta: ['cmr'],
    linea: [
      [0.4, e => e.camionA(-10)],
      [3.0, e => e.etiqueta('camion', 'Remitente: "Cambio el destino". Puede, pagando los gastos', 'globo')]
    ]
  },
  {
    tipo: 'cmr',
    titulo: '¿De qué responde el transportista?',
    texto: [
      'Respondés por la mercancía <b>desde que la recibís hasta que la entregás</b>. No desde que arranca el camión.',
      'Respondés si se <b>pierde</b> toda o una parte, si se <b>rompe</b> o si llega <b>tarde</b>. Llega tarde si no se entrega en el plazo que se pactó.<br><b>Ejemplo:</b> pactaron entregar el lunes y llegás el miércoles: hay demora.',
      '<b>Si pasaron 30 días</b> del plazo de entrega y la mercancía no aparece, el dueño la puede dar por perdida sin tener que probar nada.',
      '<b>Cuándo no respondés:</b> si el daño vino de:<br>• un defecto de la propia mercancía, que en el examen se llama <b>vicio propio</b>;<br>• instrucciones del que manda;<br>• algo que no podías evitar;<br>• un embalaje malo, marcas de los bultos equivocadas o que el remitente manipuló la carga;<br>• usar un camión abierto, sin lona, si así se pactó en la carta de porte.',
      '<b>Pero lo tenés que probar vos</b>, el transportista. No el remitente ni el destinatario.',
      '<b>Animales vivos:</b> no respondés si probás que hiciste todo lo que te tocaba y seguiste las instrucciones.'
    ],
    base: LYON,
    alArrancar: e => { e.yaVisible('tarjetaCMR'); e.camionA(18, true); },
    vista: 'lyon',
    carpeta: ['cmr'],
    linea: [
      [0.6, e => e.etiqueta('camion', 'Respondo desde que recibo hasta que entrego', 'aviso')],
      [3.0, e => e.etiqueta('cliente', 'Si es por mal embalaje, lo tiene que probar el transportista', 'globo')]
    ]
  },
  {
    tipo: 'cmr',
    titulo: '¿Cuánto se paga si se pierde o se rompe?',
    texto: [
      'Se paga el <b>valor de la mercancía</b> más los <b>gastos del transporte</b>. Sin multas ni porcentajes extra.',
      '<b>Hay un límite:</b> 8,33 unidades de cuenta por cada kilo de peso bruto <b>que falte</b>. La unidad de cuenta es una moneda de referencia internacional que vale un poco más que un euro.<br><b>Ejemplo:</b> se perdieron 100 kilos de vino. Como mucho pagás 8,33 × 100 = 833 unidades de cuenta.',
      '<b>Cómo se puede subir el límite:</b><br>• el remitente <b>declara un valor mayor</b> en la carta de porte, y ese pasa a ser el nuevo límite;<br>• o pone una suma por <b>interés especial en la entrega</b>, que se agrega a la indemnización.',
      '<b>Si la mercancía llega tarde:</b> como mucho pagás el <b>precio del transporte</b>.',
      '<b>Si el transportista actuó de mala fe</b>, el límite no se aplica.',
      '<b>Intereses:</b> el 5% al año, desde el día en que te reclaman <b>por escrito</b>.'
    ],
    base: LYON,
    alArrancar: e => { e.yaVisible('tarjetaCMR'); e.camionA(18, true); },
    vista: 'lyon',
    carpeta: ['cmr'],
    linea: [
      [0.6, e => e.etiqueta('cliente', 'Valor de la mercancía + gastos · límite 8,33 por kilo', 'precio')],
      [3.0, e => e.etiqueta('camion', 'Si llega tarde: como mucho, el precio del viaje', 'aviso')]
    ]
  },
  {
    tipo: 'cmr',
    titulo: 'Reclamaciones y varios transportistas',
    texto: [
      '<b>Si al recibir se ve el daño</b>, por ejemplo una caja rota o que faltan cajas, el cliente de Lyon tiene que quejarse <b>en el mismo momento de la entrega</b>. En el examen: hacer <b>reservas</b> cuando hay pérdidas o averías que se ven.',
      '<b>Plazo para reclamar si hubo mala fe:</b> <b>3 años</b>.',
      '<b>Varios transportistas, uno detrás de otro:</b> a veces un viaje lo empieza uno y lo termina otro, con la misma carta de porte.<br><b>Ejemplo:</b> vos llevás el vino hasta Lyon y otro camionero lo lleva de Lyon a París.<br>• Cada uno responde por <b>todo</b> el viaje, no solo por su parte.<br>• Se puede reclamar al primero, al último o al que hizo la parte donde pasó el daño.<br>• Al final paga el que causó el daño. Si son varios, se reparte según la culpa de cada uno.'
    ],
    base: LYON,
    alArrancar: e => { e.yaVisible('tarjetaCMR'); e.camionA(18, true); },
    vista: 'lyon',
    carpeta: ['cmr'],
    linea: [
      [0.6, e => e.etiqueta('cliente', 'Falta una caja: lo anoto ahora, en la entrega', 'globo')]
    ]
  },
  {
    tipo: 'cmr',
    titulo: 'Repaso: la carta de porte CMR',
    texto: [
      '<b>CMR:</b> contrato de mercancías por carretera entre países. Ginebra; España desde 1973. Da igual la nacionalidad y la distancia. Fuera: mudanzas, funerarios y correo.',
      '<b>Carta de porte:</b> la firman remitente y transportista. 3 copias: remitente, transportista y una que va con la mercancía.',
      '<b>Dice:</b> lugares y fechas, quién manda, quién lleva, quién recibe, mercancía, bultos y peso total, aduana y que es CMR.',
      '<b>Electrónica:</b> vale lo mismo, con firma electrónica fiable.',
      '<b>El remitente</b> puede cambiar destino o destinatario pagando los gastos.',
      '<b>El transportista</b> responde desde que recibe hasta que entrega. Si quiere librarse, lo prueba él. 30 días de retraso = perdida.',
      '<b>Indemnización:</b> valor + gastos, límite 8,33 por kilo que falte. Por demora, como mucho el precio del viaje. Intereses 5% desde la reclamación escrita.',
      '<b>Reservas:</b> en el momento de la entrega. Mala fe: 3 años para reclamar.'
    ],
    base: LYON,
    alArrancar: e => e.yaVisible('tarjetaCMR'),
    vista: 'general',
    carpeta: ['licencia', 'cmr'],
    linea: []
  },
  {
    tipo: 'cmr',
    titulo: 'Preguntas oficiales: la carta de porte CMR',
    texto: [],
    base: BASE,
    vista: 'general',
    linea: [],
    quiz: true
  }
];
