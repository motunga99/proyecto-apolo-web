// ==========================================
// PAPELES · CAPÍTULO 3: EL DOCUMENTO DE CONTROL
// Qué es, quién lo hace, qué dice, cuándo hace falta y la carta de porte.
// Solo Mercancías.
// ==========================================

const BASE = ['camion', 'vos', 'apolo', 'frutas', 'fabrica', 'web', 'oficina'];

export const PASOS_CONTROL = [
  {
    tipo: 'control',
    titulo: 'El papel de cada viaje',
    texto: [
      'Frutas López te contrata para llevar naranjas desde su almacén hasta Valencia. Te paga 600 €. Es <b>transporte público</b>: llevás cosas de otro y cobrás.',
      'Para ese viaje hace falta un papel que diga <b>quién te contrató, quién hace el viaje, qué se lleva y de dónde a dónde</b>. Ese papel es el <b>documento de control</b>.',
      'La autorización es una sola para toda la empresa. El documento de control, en cambio, es <b>uno por cada viaje</b>.',
      'En el examen lo llaman <b>documento de control administrativo</b> o <b>documento de control de los envíos</b>. Es lo mismo.'
    ],
    base: BASE,
    alArrancar: e => e.mostrar('lopez'),
    vista: 'deposito',
    linea: [
      [0.6, e => e.etiqueta('lopez', 'Llevame las naranjas a Valencia: te pago 600 €', 'globo')],
      [2.8, e => e.etiqueta('vos', '¡Dale! Hacemos el documento de control', 'precio')],
      [5.0, e => e.etiqueta('camion', 'Un documento de control por cada viaje', 'ok')]
    ]
  },
  {
    tipo: 'control',
    titulo: '¿Quién es quién?',
    texto: [
      'En un viaje hay varias personas, y el examen las llama con palabras raras. Vamos con el viaje de las naranjas: López te paga para llevarlas desde su almacén hasta el Supermercado Sol, en Valencia.',
      '<b>1) El cargador: López.</b><br>Es el que <b>contrata</b> el viaje y lo paga. Es dueño de las naranjas y quiere que lleguen a Valencia.<br>En el examen lo vas a ver como <b>cargador</b> o <b>cargador contractual</b>. Contractual quiere decir "el que firmó el contrato".',
      '<b>2) El expedidor o remitente: el que te entrega la mercancía.</b><br>Casi siempre es el mismo López: él te carga las naranjas en su almacén.<br><b>Ejemplo de cuándo es otro:</b> López contrata el viaje, pero las naranjas las tiene guardadas en un almacén de otra empresa. El que te las entrega ahí es el expedidor.',
      '<b>3) El transportista: vos.</b><br>Es el que se compromete a llevar la mercancía. En el examen también lo llaman <b>porteador</b>: porteador y transportista son lo mismo.<br>Hay dos clases:<br>• <b>porteador contractual</b>: el que firmó el contrato con López;<br>• <b>transportista efectivo</b>: el que hace el viaje de verdad, con su camión.<br>Casi siempre sos vos las dos cosas.<br><b>Ejemplo de cuándo son distintos:</b> firmás con López, pero tenés mucho trabajo y le pasás el viaje a Juan, otro camionero. Vos seguís siendo el porteador contractual y Juan es el transportista efectivo.',
      '<b>4) El consignatario o destinatario: el Supermercado Sol.</b><br>Es el que <b>recibe</b> la mercancía al final del viaje.<br><b>Truco:</b> consignatario = el que la recibe. Destinatario = el destino.',
      '<b>5) El conductor: el que maneja.</b><br>Puede ser el mismo transportista, o sea vos, o un empleado tuyo. El conductor no firma contratos: solo maneja y lleva los papeles.<br><b>Ejemplo:</b> Proyecto Apolo hace el viaje, pero el camión lo maneja Pedro, tu empleado. Pedro es el conductor.',
      '<b>En una frase:</b> López <b>contrata</b>, López o su almacén <b>entrega</b>, vos <b>llevás</b>, Pedro <b>maneja</b> y el Supermercado Sol <b>recibe</b>.'
    ],
    base: BASE,
    alArrancar: e => e.yaVisible('lopez'),
    vista: 'deposito',
    linea: [
      [0.6, e => e.etiqueta('lopez', 'Cargador: contrato y pago el viaje', 'globo')],
      [2.6, e => e.etiqueta('vos', 'Transportista o porteador: yo la llevo', 'precio')],
      [4.6, e => e.etiqueta('camion', 'Destino: Supermercado Sol, el consignatario', 'ok')]
    ]
  },
  {
    tipo: 'control',
    titulo: '¿Quién lo hace y quién se queda con una copia?',
    texto: [
      'Lo tienen que hacer <b>los dos</b>:<br>• <b>López</b>, porque te contrató. En el examen: <b>cargador contractual</b>.<br>• <b>Vos</b>, porque hacés el viaje con tu camión. En el examen: <b>transportista efectivo</b>.',
      'Se hacen <b>dos copias</b>: una para López y otra para vos. La tuya va en el camión durante el viaje.',
      '<b>¿Y el conductor?</b> No tiene que hacer <b>nada</b> con ese papel: no firma, no pone sus datos, no anota la matrícula. Solo lo lleva.<br><b>Ejemplo:</b> si el camión lo maneja Pedro, tu empleado, Pedro no completa nada. Lo completaron López y vos.',
      '<b>En el examen:</b> "¿quién está obligado a hacerlo?" → <b>el cargador contractual y el transportista efectivo</b>, los dos. "¿Qué hace el conductor?" → <b>nada</b>.'
    ],
    base: BASE,
    alArrancar: e => e.yaVisible('lopez'),
    vista: 'deposito',
    carpeta: ['control'],
    linea: [
      [0.6, e => e.etiqueta('lopez', 'Cargador contractual: me quedo una copia', 'globo')],
      [2.8, e => e.etiqueta('vos', 'Transportista efectivo: la otra copia va en el camión', 'ok')],
      [5.0, e => e.etiqueta('camion', 'El conductor no completa nada', 'aviso')]
    ]
  },
  {
    tipo: 'control',
    titulo: '¿Qué dice el papel?',
    texto: [
      '<b>Lo que sí tiene que decir:</b><br>• el nombre del <b>cargador contractual</b> (López) y del <b>transportista efectivo</b> (vos);<br>• de dónde sale y adónde va;<br>• qué se lleva y cuánto pesa;<br>• la <b>matrícula</b> del camión.',
      '<b>La matrícula en un camión articulado</b>, o sea, tractora con semirremolque: van <b>las dos</b>, la de la tractora y la del semirremolque.<br><b>Ejemplo:</b> salís con tu tractora y a mitad de camino cambiás el semirremolque. Ese cambio <b>se anota</b> en el papel.',
      '<b>Si es un transporte especial</b>, como una pieza enorme que necesita un permiso para circular: también va el número de ese permiso. En el examen: <b>autorización especial de circulación</b>.',
      '<b>Lo que no hace falta que diga:</b> el que recibe la mercancía, los datos del libro de ruta ni dónde reclamar. En el examen, al que recibe la mercancía lo llaman <b>el consignatario</b>.',
      '<b>¿Y el precio del viaje?</b> No es obligatorio ponerlo. Se puede poner <b>si López y vos quieren</b>.'
    ],
    base: BASE,
    alArrancar: e => e.yaVisible('lopez'),
    vista: 'general',
    carpeta: ['control'],
    linea: [
      [0.6, e => e.etiqueta('camion', 'Matrículas: tractora + semirremolque', 'ok')],
      [3.0, e => e.etiqueta('frutas', 'López y vos · origen y destino · qué y cuánto pesa', 'precio')]
    ]
  },
  {
    tipo: 'control',
    titulo: '¿Hay un modelo oficial? ¿Cuánto se guarda?',
    texto: [
      '<b>No hay modelo oficial.</b> Cada uno lo puede hacer en el formato que quiera, en papel o en el celular, mientras tenga los datos que vimos.',
      'En el examen: <b>es de libre edición</b>. No lo hace el Ministerio, ni Hacienda, ni el Comité Nacional del Transporte, ni las asociaciones.',
      '<b>¿Cuánto tiempo hay que guardarlo?</b> <b>1 año</b>.<br><b>Ejemplo:</b> el viaje de las naranjas fue en marzo de este año. Tenés que guardar el papel hasta marzo del año que viene.'
    ],
    base: BASE,
    vista: 'deposito',
    carpeta: ['control'],
    linea: [
      [0.6, e => e.etiqueta('apolo', 'Sin modelo oficial: libre edición', 'ok')],
      [2.8, e => e.etiqueta('vos', 'Lo guardo 1 año', 'globo')]
    ]
  },
  {
    tipo: 'control',
    titulo: '¿Cuándo hace falta? Siempre, menos en las mudanzas',
    texto: [
      'El documento de control hace falta en <b>todos los transportes públicos</b>: leche en cisterna, vacas, bloques de hormigón, obras de arte, medicamentos, mercancías que se pudren… todos.',
      '<b>La única excepción: las mudanzas.</b><br><b>Ejemplo:</b> una familia te contrata para llevar los muebles de su casa a otra ciudad. Para ese viaje <b>no hace falta</b> documento de control. Da igual si van uno, dos o tres camiones, y da igual cuánto pesen.',
      '<b>En el examen:</b> si preguntan en cuál no hace falta, se marca <b>la mudanza</b>. Si la mudanza no está entre las opciones, se marca <b>todos necesitan documento de control</b>.'
    ],
    base: [...BASE, 'furgoneta'],
    vista: 'general',
    carpeta: ['control'],
    linea: [
      [0.6, e => e.etiqueta('camion', 'Todo transporte público: CON documento de control', 'ok')],
      [3.0, e => e.etiqueta('furgoneta', 'Mudanza: SIN documento de control', 'aviso')]
    ]
  },
  {
    tipo: 'control',
    titulo: 'La carta de porte',
    texto: [
      'Hay otro papel que el examen también pregunta: la <b>carta de porte</b>. Es el <b>contrato del viaje</b>: dice qué se lleva, para quién y en qué condiciones.',
      '<b>¿Quién la hace?</b> El que manda la mercancía, López. En el examen: <b>el expedidor</b>. La hace y se la da <b>al conductor</b>.',
      '<b>¿Y si López no quiere hacerla?</b> Entonces vos podés <b>negarte a hacer el viaje</b>. Sin condiciones.',
      '<b>Si la carta de porte es electrónica</b>, tiene que cumplir dos cosas: que no se puedan cambiar los datos sin que se note y que lleve <b>firmas electrónicas</b>. En el examen, lo primero se dice <b>que garantice la integridad</b>. Si están las dos, se marca la opción que junta <b>las dos</b>.',
      '<b>Si llevás líquido en una cisterna</b>, por ejemplo leche, la carta de porte también tiene que decir <b>cuánto llenaste la cisterna</b>: por ejemplo, "llena al 90%". En el examen a eso lo llaman <b>el grado de llenado</b>.'
    ],
    base: BASE,
    alArrancar: e => e.yaVisible('lopez'),
    vista: 'deposito',
    carpeta: ['control', 'cartaPorte'],
    linea: [
      [0.6, e => e.etiqueta('lopez', 'La carta de porte la hago yo y se la doy al conductor', 'globo')],
      [3.0, e => e.etiqueta('vos', 'Si no la hace, no hago el viaje', 'aviso')]
    ]
  },
  {
    tipo: 'control',
    titulo: 'Repaso: el documento de control',
    texto: [
      '<b>Uno por cada viaje</b> de transporte público.',
      '<b>Lo hacen</b> el cargador contractual (López) y el transportista efectivo (vos). <b>Dos copias</b>, una para cada uno. El conductor no hace nada.',
      '<b>Dice:</b> López y vos, origen y destino, qué y cuánto pesa, matrículas (tractora y semirremolque, y los cambios). El precio es optativo. El consignatario no va.',
      '<b>Libre edición</b>, sin modelo oficial. Se guarda <b>1 año</b>.',
      '<b>Hace falta siempre</b>, menos en las <b>mudanzas</b>.',
      '<b>Carta de porte:</b> la hace el expedidor y se la da al conductor. Si no la hace, podés negarte al viaje.'
    ],
    base: BASE,
    vista: 'general',
    carpeta: ['control', 'cartaPorte'],
    linea: []
  },
  {
    tipo: 'control',
    titulo: 'Preguntas oficiales: el documento de control',
    texto: [],
    base: BASE,
    vista: 'general',
    linea: [],
    quiz: true
  }
];
