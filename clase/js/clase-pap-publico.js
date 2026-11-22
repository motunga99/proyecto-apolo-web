// ==========================================
// PAPELES · CAPÍTULO 1: ¿PARA OTROS O PARA VOS?
// Transporte público (por cuenta ajena) y privado complementario (por cuenta propia),
// desde qué peso hace falta autorización y quién no la necesita nunca.
// Solo Mercancías.
// ==========================================

const TODO = ['camion', 'vos', 'apolo', 'frutas', 'fabrica', 'web'];
const CON_ANA = [...TODO, 'ana', 'camionAna'];

export const PASOS_PUBLICO = [
  {
    tipo: 'nacional',
    titulo: 'Dos formas de llevar mercadería',
    texto: [
      '<b>Vida real:</b> vos tenés tu empresa de camiones, <b>Proyecto Apolo</b>, en Madrid. A la vuelta hay una fábrica, <b>Muebles Ana</b>, que también tiene un camión.',
      'Los dos llevan mercadería por la ruta, pero hay una diferencia enorme:',
      '<b>Vos llevás cosas de OTROS</b>, y te pagan por llevarlas. Eso se llama transporte <b>por cuenta ajena</b>. Ajena = de otro.',
      '<b>Ana lleva SUS cosas</b>, sus propios muebles, y nadie le paga por el viaje. Eso se llama transporte <b>por cuenta propia</b>. Propia = tuya.',
      '<b>Así lo pregunta el examen:</b> "Son actividades de transporte de mercancías por carretera:"<br>a) las de transporte por cuenta ajena.<br>b) las de transporte por cuenta propia.<br>c) las de transitario.<br>d) Las respuestas A y B son correctas.<br>→ La correcta es <b>d)</b>. Cuenta ajena es llevar cosas de otros (público) y cuenta propia es llevar lo tuyo (privado): las dos son transporte. El transitario no maneja camiones: organiza envíos, así que la c) está mal.'
    ],
    base: [...TODO, 'ana', 'camionAna'],
    vista: 'general',
    linea: [
      [0.6, e => e.etiqueta('camion', 'Proyecto Apolo: lleva cosas de OTROS (por cuenta ajena)', 'ok')],
      [3.0, e => e.etiqueta('camionAna', 'Muebles Ana: lleva SUS cosas (por cuenta propia)', 'aviso')]
    ]
  },
  {
    tipo: 'publico',
    titulo: 'Transporte público: llevás cosas de otros y cobrás',
    texto: [
      '<b>Frutas López</b> tiene que mandar naranjas a Valencia, pero no tiene camión. Te llama a vos: "llevame las naranjas y te pago 600 €".',
      'Eso es transporte <b>público</b>, o <b>por cuenta ajena</b>: tu trabajo es llevar mercadería de otros, a cambio de plata.',
      '<b>Ojo con la palabra "público":</b> no quiere decir que sea del Estado ni gratis. Quiere decir que le ofrecés el servicio <b>a cualquiera</b> que te pague, como un taxi.',
      '<b>¿Y si tenés tanto trabajo que le pasás un viaje a otro camionero?</b> Eso se llama colaboración entre transportistas. El que te ayuda trabaja <b>por cuenta tuya</b>, del transportista principal que lo contrató, no por cuenta del cliente.',
      '<b>Dato del examen:</b> los <b>almacenistas-distribuidores</b>, empresas que guardan mercadería y la reparten, usan sus camiones con <b>autorización de transporte público</b>.'
    ],
    base: TODO,
    alArrancar: e => e.mostrar('lopez'),
    vista: 'deposito',
    linea: [
      [0.6, e => e.etiqueta('lopez', 'Llevame las naranjas a Valencia: te pago 600 €', 'globo')],
      [3.0, e => e.etiqueta('vos', '¡Dale! Es mi trabajo', 'precio')],
      [4.4, e => e.camionA(48)],
      [5.0, e => e.etiqueta('camion', 'TRANSPORTE PÚBLICO = por cuenta ajena', 'ok')]
    ]
  },
  {
    tipo: 'privado',
    titulo: 'Transporte privado complementario: lo tuyo, con tu camión',
    texto: [
      '<b>Muebles Ana</b> es una fábrica: su trabajo es <b>hacer muebles</b>, no llevar cosas. Pero tiene un camión propio para llevarle los muebles a sus clientes.',
      'Ese viaje es de la misma empresa, con su propia mercadería. Se llama transporte <b>privado complementario</b>.',
      '<b>¿Por qué ese nombre tan raro?</b> <b>Privado</b>, porque es para la propia empresa, no para cualquiera. <b>Complementario</b>, porque es un extra, una ayuda a su trabajo de verdad, que es fabricar muebles.',
      '<b>En el examen</b> lo vas a ver así: "el transporte por cuenta propia que hace una empresa cuya actividad principal <b>no es</b> el transporte" → <b>transporte privado complementario</b>. Las otras opciones (privado productivo, industrial, accesorio, mercantil…) son inventadas.'
    ],
    base: CON_ANA,
    vista: 'fabrica',
    linea: [
      [0.6, e => e.etiqueta('fabrica', 'Su trabajo: HACER MUEBLES', 'aviso')],
      [2.6, e => e.etiqueta('ana', 'Con mi camión llevo MIS muebles a mis clientes', 'globo')],
      [4.8, e => e.etiqueta('camionAna', 'PRIVADO COMPLEMENTARIO', 'ok')]
    ]
  },
  {
    tipo: 'privado',
    titulo: 'Las reglas del privado complementario',
    texto: [
      'Para que el viaje de Ana sea privado complementario, se tienen que cumplir <b>todas</b> estas reglas:',
      '<b>1) La empresa no se dedica al transporte.</b> Su trabajo principal es otro: fabricar, vender, construir.',
      '<b>2) La mercadería es de la empresa</b>, o tiene que ver con su trabajo: sale de donde trabaja la empresa o va hacia ahí. Ana lleva muebles desde su fábrica.',
      '<b>3) El camión es de la empresa.</b> En el examen dicen "integrado en la organización de la empresa". Y ojo: también los <b>remolques y semirremolques</b>, no solo el camión.',
      '<b>4) El conductor trabaja para la empresa.</b> Tiene que ser un empleado de Ana, no un camionero de afuera.',
      '<b>5) No se puede cobrar el viaje aparte.</b> Ana cobra los muebles, pero no puede hacerle al cliente una factura por el transporte. Si cobrara el viaje, ya sería transporte público.',
      '<b>Así lo pregunta el examen:</b> "Sobre el transporte privado complementario, ¿cuál de estas frases es <b>incorrecta</b>?"<br>a) Los camiones con motor tienen que ser de la empresa.<br>b) La actividad principal de la empresa no puede ser el transporte.<br>c) Si usa semirremolques, no hace falta que sean de la empresa.<br>d) Los conductores tienen que trabajar para la empresa.<br>→ La correcta es <b>c)</b>, porque es la frase falsa: los semirremolques <b>también</b> tienen que ser de la empresa (la regla 3). Las otras tres frases son ciertas.'
    ],
    base: CON_ANA,
    vista: 'fabrica',
    linea: [
      [0.6, e => e.etiqueta('fabrica', '1) Su trabajo NO es el transporte', 'aviso')],
      [2.0, e => e.etiqueta('camionAna', '2) Mercadería suya · 3) Camión de la empresa', 'ok')],
      [3.6, e => e.etiqueta('ana', '4) El conductor es empleado mío', 'precio')],
      [5.2, e => e.etiqueta('cielo', '5) Prohibido cobrar el viaje aparte', 'deuda')]
    ]
  },
  {
    tipo: 'privado',
    titulo: 'Qué papeles lleva el camión de Ana',
    texto: [
      'Si a Ana la para un inspector, tiene que poder demostrar las reglas que acabás de ver. Por eso en el camión lleva papeles que prueban que:',
      '<b>la mercadería es de la empresa</b>: por ejemplo, la <b>factura de compra</b> de las mercancías;',
      '<b>el conductor trabaja para la empresa</b>: su contrato o su alta;',
      '<b>el camión es de la empresa</b>.',
      'Mirá la <b>carpeta de la cabina</b>: ahí se van guardando.',
      '<b>Así lo pregunta el examen:</b> "¿Qué documentación hay que llevar en un transporte privado complementario?"<br>a) La que acredite que las mercancías son de la empresa.<br>b) La que acredite que el vehículo está integrado en la empresa.<br>c) La que acredite que el conductor está integrado en la empresa.<br>d) Todas son correctas.<br>→ Correcta: <b>d</b>.',
      '<b>Otra trampa:</b> "La factura de compra de la mercancía se lleva a bordo en…" → <b>un transporte privado complementario</b>. No en el público: ahí la mercadería es del cliente.'
    ],
    base: CON_ANA,
    vista: 'fabrica',
    carpeta: ['factura', 'conductor', 'vehiculo'],
    linea: [
      [0.6, e => e.etiqueta('camionAna', 'En la carpeta: factura + conductor + camión de la empresa', 'ok')]
    ]
  },
  {
    tipo: 'nacional',
    titulo: '¿Desde qué peso hace falta autorización?',
    texto: [
      'Para trabajar con un camión hace falta un permiso del Estado: la <b>autorización de transporte</b>. La vemos entera en el capítulo 2. Acá solo una pregunta: <b>¿la necesitan todos?</b> No: depende del <b>peso</b> del vehículo.',
      '<b>MMA</b> = Masa Máxima Autorizada: lo máximo que puede pesar el vehículo <b>cargado</b>, contando el vehículo más la carga.',
      '<b>Transporte público</b> (por cuenta ajena): necesita autorización si el vehículo pasa de <b>2 toneladas</b> de MMA.',
      '<b>Privado complementario</b> (por cuenta propia): necesita autorización si pasa de <b>3,5 toneladas</b> de MMA.',
      '<b>Ejemplos:</b> una furgoneta de <b>1,5 t</b> que hace repartos cobrando → <b>no</b> necesita (no pasa de 2 t). Ana con una furgoneta de <b>2,5 t</b> llevando sus muebles → <b>no</b> necesita (no pasa de 3,5 t). Tu camión de 40 t → <b>sí</b>, claro.',
      '<b>Truco:</b> el que cobra por llevar cosas de otros tiene la regla más dura: <b>2</b>. El que lleva lo suyo tiene más margen: <b>3,5</b>.',
      '<b>En el examen:</b> "¿El privado complementario necesita autorización?" → <b>depende de la MMA del vehículo</b>.'
    ],
    base: CON_ANA,
    alArrancar: e => e.mostrar('furgoneta'),
    vista: 'general',
    carpeta: ['autorizacion'],
    linea: [
      [0.6, e => e.etiqueta('furgoneta', 'Pública de 1,5 t: NO necesita (no pasa de 2 t)', 'precio')],
      [2.6, e => e.etiqueta('camionAna', 'Privado: necesita solo si pasa de 3,5 t', 'aviso')],
      [4.6, e => e.etiqueta('camion', 'Público: necesita si pasa de 2 t', 'ok')]
    ]
  },
  {
    tipo: 'exento',
    titulo: 'Los que NO necesitan autorización nunca',
    texto: [
      'Hay transportes que <b>nunca</b> necesitan autorización, pesen lo que pesen. En el examen se dice que están <b>exentos</b>. Exento = libre de esa obligación.',
      '<b>Los vehículos oficiales</b>: los del Ayuntamiento, la Comunidad o el Estado haciendo su trabajo.',
      '<b>El transporte privado particular</b>: una persona que lleva sus propias cosas, no una empresa. Por ejemplo, vos mudándote con tus muebles.',
      '<b>El transporte funerario</b>: los coches de la funeraria.',
      '<b>Los vehículos de menos de tres ruedas</b>: o sea, de dos ruedas, como una moto de reparto.',
      '<b>Los transportes dentro de un recinto cerrado</b> que no se dedica al transporte. Por ejemplo, dentro de una fábrica o un puerto, sin salir a la calle.',
      '<b>Los tractores agrícolas</b> en privado complementario: el agricultor llevando lo suyo.',
      '<b>Trampa del examen:</b> te inventan permisos que no existen, como "autorización de transporte oficial" o "tarjeta VF" para la funeraria. La respuesta es siempre: <b>están exentos de autorización</b>.'
    ],
    base: ['camion', 'apolo', 'frutas', 'fabrica', 'web'],
    alArrancar: e => ['oficial', 'funebre', 'moto', 'tractor'].forEach(n => e.mostrar(n)),
    vista: 'exentos',
    linea: [
      [0.6, e => e.etiqueta('oficial', 'Oficial: exento', 'ok')],
      [1.6, e => e.etiqueta('funebre', 'Funerario: exento', 'ok')],
      [2.6, e => e.etiqueta('moto', 'Menos de 3 ruedas: exento', 'ok')],
      [3.6, e => e.etiqueta('tractor', 'Tractor agrícola (lo suyo): exento', 'ok')]
    ]
  },
  {
    tipo: 'exento',
    titulo: 'Los que no la necesitan, pero con una condición',
    texto: [
      'Estos también están exentos, pero <b>solo si se cumple algo</b>. El examen pone trampas con "siempre":',
      '<b>Transporte de dinero:</b> no necesita autorización si va en un <b>vehículo especialmente preparado</b>, como un camión blindado. Si va en un vehículo común, sí la necesita.',
      '<b>En el examen:</b> "El transporte de dinero…" → <b>está exento si se hace en vehículos especialmente acondicionados</b>. Si la opción dice "siempre exento", es falsa. Y si preguntan "¿un blindado necesita autorización?" → <b>no, en ningún caso</b>: el blindado nunca la necesita.',
      '<b>Grúa:</b> un camión que tiene una grúa pegada para siempre está exento <b>solo si se dedica a llevar la grúa</b>. Si además carga mercadería, ya necesita autorización.',
      '<b>Medicamentos:</b> exentos <b>solo en ayudas urgentes</b>, como una catástrofe. Un reparto normal de medicamentos a farmacias sí necesita autorización.',
      '<b>Regla fácil:</b> en estas tres, si la opción dice <b>"siempre"</b>, desconfiá. La correcta es la que tiene la condición.'
    ],
    base: ['camion', 'apolo', 'frutas', 'fabrica', 'web'],
    alArrancar: e => ['blindado', 'grua', 'ambulancia'].forEach(n => e.mostrar(n)),
    vista: 'exentos',
    linea: [
      [0.6, e => e.etiqueta('blindado', 'Dinero: exento SI va en blindado', 'aviso')],
      [2.0, e => e.etiqueta('grua', 'Grúa: exenta SI solo lleva la grúa', 'aviso')],
      [3.4, e => e.etiqueta('ambulancia', 'Medicamentos: exento SOLO en urgencias', 'aviso')]
    ]
  },
  {
    tipo: 'nacional',
    titulo: 'Repaso: público o privado',
    texto: [
      '<b>Público</b> = por cuenta ajena: llevás cosas de otros y cobrás.',
      '<b>Privado complementario</b> = por cuenta propia: una empresa que no se dedica al transporte lleva lo suyo. El camión y el conductor son de la empresa, la mercadería tiene que ver con su trabajo y no puede cobrar el viaje aparte.',
      '<b>Papeles del privado:</b> la factura de compra de la mercancía y las pruebas de que el conductor y el camión son de la empresa.',
      '<b>¿Cuándo hace falta autorización?</b> Público: más de <b>2 t</b> de MMA. Privado: más de <b>3,5 t</b>.',
      '<b>Exentos siempre:</b> oficiales, privado particular, funerario, menos de 3 ruedas, recintos cerrados, tractores agrícolas.',
      '<b>Exentos con condición:</b> dinero (en blindado), grúa (solo la grúa), medicamentos (solo urgencias).'
    ],
    base: CON_ANA,
    vista: 'general',
    carpeta: ['factura', 'conductor', 'vehiculo', 'autorizacion'],
    linea: []
  },
  {
    tipo: 'nacional',
    titulo: 'Preguntas oficiales: público o privado',
    texto: [],
    base: CON_ANA,
    vista: 'general',
    linea: [],
    quiz: true
  }
];
