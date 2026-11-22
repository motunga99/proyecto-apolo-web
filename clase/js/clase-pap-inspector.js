// ==========================================
// PAPELES · CAPÍTULO 4: EL INSPECTOR TE PARA
// Qué papeles van en el camión (conductor, vehículo, carga),
// qué permiso hace falta y qué puede hacer el inspector. Solo Mercancías.
// ==========================================

const BASE = ['camion', 'vos', 'apolo', 'frutas', 'fabrica', 'web', 'oficina', 'inspector'];

export const PASOS_INSPECTOR = [
  {
    tipo: 'inspector',
    titulo: 'Un inspector te para en la ruta',
    texto: [
      'Vas con las naranjas de López camino a Valencia y un inspector de transporte te hace señas para que pares.',
      '<b>¿Quién responde por la empresa en ese momento?</b> Vos, el conductor. Para el inspector, el conductor es el <b>representante de la empresa</b> con los papeles que van en el camión. No el dueño ni otro empleado.',
      '<b>¿Qué tenés que hacer?</b> Dejarlo revisar todo:<br>• el camión y sus aparatos de control, como el tacógrafo;<br>• la carga;<br>• los papeles del transporte.',
      '<b>Ojo:</b> los papeles <b>del transporte</b>, sí. Las facturas y papeles de la empresa que no tienen que ver con ese viaje, no.',
      '<b>En el examen:</b> "¿quién representa a la empresa en la inspección?" → <b>el conductor</b>.'
    ],
    base: BASE,
    vista: 'deposito',
    linea: [
      [0.6, e => e.etiqueta('inspector', 'Inspección de transporte: pare, por favor', 'aviso')],
      [2.8, e => e.etiqueta('vos', 'Soy el conductor: represento a la empresa', 'globo')]
    ]
  },
  {
    tipo: 'inspector',
    titulo: 'Los papeles del conductor',
    texto: [
      'El inspector te pide primero <b>tus</b> papeles. Son dos:',
      '<b>1) El permiso de conducir.</b> Siempre, en cualquier vehículo.',
      '<b>2) La tarjeta de cualificación del conductor.</b> Es la tarjeta que te dan cuando aprobás el CAP. Se lleva <b>cuando conducís</b>, no todo el día: si estás en tu casa o en la empresa, no hace falta tenerla encima.',
      '<b>Lo que no hace falta llevar:</b> el DNI o el pasaporte como papel del transporte, una copia del certificado CAP, la nómina ni la licencia comunitaria.',
      '<b>Un caso especial:</b> si el conductor es de un país de fuera de la Unión Europea y hace transporte internacional, también lleva el <b>certificado de conductor</b>.<br><b>Ejemplo:</b> un conductor marroquí que trabaja para Proyecto Apolo y va a Francia lleva su certificado de conductor.',
      '<b>Permisos de otros países:</b> los de la Unión Europea, Islandia, Liechtenstein y Noruega valen igual que uno español.'
    ],
    base: BASE,
    alArrancar: e => e.yaVisible('inspector'),
    vista: 'deposito',
    carpeta: ['permiso', 'tarjetaCAP'],
    linea: [
      [0.6, e => e.etiqueta('inspector', 'Permiso de conducir y tarjeta de cualificación', 'globo')],
      [2.8, e => e.etiqueta('vos', 'Acá están los dos', 'ok')]
    ]
  },
  {
    tipo: 'inspector',
    titulo: '¿Qué permiso necesitás? ¿Y el CAP?',
    texto: [
      'El permiso depende de cuánto pesa el camión cargado al máximo. En el examen eso se llama <b>MMA</b>, masa máxima autorizada.',
      '<b>C1:</b> camiones de más de 3.500 kg y hasta 7.500 kg.<br><b>C:</b> camiones de más de 3.500 kg, sin límite. Si tenés el C, también podés manejar lo del C1.<br><b>+E:</b> se suma cuando llevás un <b>remolque de más de 750 kg</b>.',
      '<b>Ejemplos:</b><br>• Camión de 6.000 kg → <b>C1</b>.<br>• Camión de 13.000 kg con un remolque de 500 kg → <b>C</b>. El remolque no pasa de 750 kg, así que no hace falta la E.<br>• Camión de 8.000 kg con un remolque de 900 kg → <b>C+E</b>. El camión pasa de 7.500 kg (C) y el remolque pasa de 750 kg (+E).',
      '<b>Para sacar el C1+E</b> primero tenés que tener el C1 o el C. Con el B solo no alcanza.',
      '<b>¿Y el CAP?</b> Para trabajar con C1, C1+E, C o C+E necesitás <b>el permiso y además el CAP</b>.',
      '<b>Trampa:</b> el CAP no es el título de competencia profesional. El CAP es para <b>manejar</b>; el título es para <b>dirigir</b> una empresa de transporte.'
    ],
    base: BASE,
    alArrancar: e => e.yaVisible('inspector'),
    vista: 'deposito',
    carpeta: ['permiso', 'tarjetaCAP'],
    linea: [
      [0.6, e => e.etiqueta('camion', 'Más de 7.500 kg → permiso C · con remolque de más de 750 kg → C+E', 'precio')],
      [3.0, e => e.etiqueta('vos', 'Permiso + CAP', 'ok')]
    ]
  },
  {
    tipo: 'inspector',
    titulo: 'Los papeles del camión',
    texto: [
      'Después te pide los papeles <b>del camión</b>. Son dos, y van <b>siempre</b>:',
      '<b>1) El permiso de circulación.</b> Es como el DNI del camión: dice de quién es y su matrícula.',
      '<b>2) La tarjeta de inspección técnica</b>, que en el examen también llaman <b>ficha técnica</b>. Dice cómo es el camión y cuándo pasó la ITV.',
      '<b>Lo que no hace falta llevar:</b><br>• la <b>póliza del seguro</b>: el seguro se comprueba por la matrícula;<br>• los <b>albaranes</b> o la <b>declaración de porte</b> del viaje anterior.',
      '<b>Dato del seguro obligatorio:</b> cubre hasta <b>70 millones de euros</b> por accidente si hay daños a personas, y hasta <b>15 millones</b> si son daños a cosas.'
    ],
    base: BASE,
    alArrancar: e => e.yaVisible('inspector'),
    vista: 'deposito',
    carpeta: ['permiso', 'tarjetaCAP', 'circulacion', 'itv'],
    linea: [
      [0.6, e => e.etiqueta('camion', 'Permiso de circulación + tarjeta ITV: siempre', 'ok')],
      [3.0, e => e.etiqueta('vos', 'La póliza del seguro no hace falta', 'globo')]
    ]
  },
  {
    tipo: 'inspector',
    titulo: '¿Cada cuánto pasa la ITV un camión?',
    texto: [
      '<b>Camiones de más de 3,5 t:</b> cada año hasta que cumplen 10 años. Después, cada 6 meses.<br><b>Ejemplo:</b> tu camión tiene 4 años → ITV cada año. Cuando tenga 11 → cada 6 meses.',
      '<b>Furgonetas de hasta 3,5 t:</b> van más espaciadas.<br><b>Ejemplo:</b> una furgoneta de 2,5 t con 4 años pasa la ITV cada 2 años. En el examen: <b>bienal</b>.',
      '<b>Si cambiás el uso del camión</b>, tenés que pasar la ITV solo si el nuevo uso pide revisiones más seguidas. En el examen, cambiar el uso se llama <b>cambio de destino</b>.'
    ],
    base: [...BASE, 'furgoneta'],
    alArrancar: e => e.yaVisible('inspector'),
    vista: 'general',
    carpeta: ['permiso', 'tarjetaCAP', 'circulacion', 'itv'],
    linea: [
      [0.6, e => e.etiqueta('camion', 'Más de 3,5 t: cada año · después de 10 años, cada 6 meses', 'precio')],
      [3.0, e => e.etiqueta('furgoneta', '2,5 t con 4 años: cada 2 años', 'ok')]
    ]
  },
  {
    tipo: 'inspector',
    titulo: 'Los papeles de la carga y de la empresa',
    texto: [
      'Por último, los papeles <b>de este viaje</b>:',
      '<b>El documento de control</b>, porque es transporte público. Solo en una mudanza no hace falta.',
      '<b>La autorización de transporte:</b> ningún papel. El inspector la ve en el registro por la matrícula.',
      '<b>Si fuera el camión de Ana</b>, que es privado complementario, llevaría las pruebas de que la mercancía, el camión y el conductor son de su empresa. Por ejemplo, la factura de compra de los muebles.',
      'Mirá la carpeta de la cabina: ahí está todo lo que llevás en un viaje dentro de España.'
    ],
    base: BASE,
    alArrancar: e => e.yaVisible('inspector'),
    vista: 'deposito',
    carpeta: ['permiso', 'tarjetaCAP', 'circulacion', 'itv', 'control', 'autorizacionRegistro'],
    linea: [
      [0.6, e => e.etiqueta('inspector', 'Documento de control, ¿lo tiene?', 'globo')],
      [2.8, e => e.etiqueta('vos', 'Sí. Y la autorización mírela por la matrícula', 'ok')]
    ]
  },
  {
    tipo: 'inspector',
    titulo: '¿Qué puede hacer el inspector?',
    texto: [
      '<b>Mandarte a un taller:</b> solo si sospecha con motivos que el tacógrafo o los aparatos de control están <b>trucados</b>. En el examen: "indicios fundados de manipulación".<br><b>Ejemplo:</b> ve un imán pegado cerca del tacógrafo. Te puede mandar a un taller autorizado para revisarlo.',
      '<b>Trampa:</b> no te puede mandar al taller por tener la ITV vencida ni por pasarte en las horas de manejo.',
      '<b>Hacerte desviar para pesar o revisar el camión:</b> si tenés que volver para atrás, como máximo <b>30 km</b>.<br><b>Ejemplo:</b> la báscula está 20 km atrás. Te puede hacer volver. Si estuviera a 50 km, no.'
    ],
    base: BASE,
    alArrancar: e => e.yaVisible('inspector'),
    vista: 'deposito',
    linea: [
      [0.6, e => e.etiqueta('inspector', 'Tacógrafo trucado → al taller', 'deuda')],
      [3.0, e => e.etiqueta('camion', 'Para pesar: hasta 30 km para atrás', 'aviso')]
    ]
  },
  {
    tipo: 'inspector',
    titulo: 'Repaso: el inspector te para',
    texto: [
      '<b>El conductor</b> representa a la empresa y deja revisar camión, carga y papeles del transporte.',
      '<b>Del conductor:</b> permiso de conducir y tarjeta de cualificación (cuando conduce).',
      '<b>Permiso:</b> C1 hasta 7.500 kg · C más de 3.500 kg · +E con remolque de más de 750 kg. Y además, el CAP.',
      '<b>Del camión:</b> permiso de circulación y tarjeta ITV. La póliza del seguro no.',
      '<b>ITV:</b> más de 3,5 t, cada año y después de 10 años cada 6 meses.',
      '<b>Del viaje:</b> documento de control (menos mudanzas). La autorización, sin papel.',
      '<b>Inspector:</b> al taller solo por tacógrafo trucado. Desvío para pesar: hasta 30 km.'
    ],
    base: BASE,
    vista: 'general',
    carpeta: ['permiso', 'tarjetaCAP', 'circulacion', 'itv', 'control', 'autorizacionRegistro'],
    linea: []
  },
  {
    tipo: 'inspector',
    titulo: 'Preguntas oficiales: el inspector te para',
    texto: [],
    base: BASE,
    vista: 'general',
    linea: [],
    quiz: true
  }
];
