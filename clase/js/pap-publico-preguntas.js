// Preguntas oficiales de Mercancías: transporte público, privado complementario y exentos.
// paso = número de paso del capítulo 1 de Papeles que la explica.
export const PREGUNTAS_PUBLICO = [
  {
    "enunciado": "Son actividades de transporte de mercancías por carretera:",
    "opciones": [
      "las actividades de transporte por cuenta ajena.",
      "las actividades de transporte por cuenta propia.",
      "las actividades de transitario.",
      "Las respuestas A y B son correctas."
    ],
    "correcta": 3,
    "veces": 14,
    "explicacion": "Son transporte las dos: <b>por cuenta ajena</b> (llevar cosas de otros cobrando) y <b>por cuenta propia</b> (llevar lo tuyo). El transitario es otra actividad. Por eso: <b>A y B son correctas</b>.",
    "paso": 1
  },
  {
    "enunciado": "¿Qué tipo de actividad realizan las empresas que prestan servicios de transporte de mercancías a terceros?",
    "opciones": [
      "Transporte por cuenta propia.",
      "Transporte por cuenta ajena.",
      "Una actividad auxiliar y complementaria.",
      "Las respuestas B y C son correctas."
    ],
    "correcta": 1,
    "veces": 20,
    "explicacion": "Llevar mercadería de otros a cambio de plata es transporte <b>por cuenta ajena</b>, o transporte público.",
    "paso": 2
  },
  {
    "enunciado": "Para la distribución de mercancías, los almacenistas-distribuidores pueden emplear:",
    "opciones": [
      "vehículos propios amparados en autorización de transporte público.",
      "vehículos propios amparados en autorización de transporte privado complementario.",
      "vehículos propios sin necesidad de autorización de transporte, siempre que su masa máxima autorizada no exceda de 3.500 kilogramos.",
      "Nunca podrán utilizar vehículos propios."
    ],
    "correcta": 0,
    "veces": 3,
    "explicacion": "Los almacenistas-distribuidores usan sus camiones con <b>autorización de transporte público</b>.",
    "paso": 2
  },
  {
    "enunciado": "En el supuesto de colaboración entre dos transportistas de mercancías, el transportista colaborador presta sus servicios:",
    "opciones": [
      "por cuenta propia.",
      "por cuenta del transportista principal que lo ha contratado.",
      "por cuenta del cliente.",
      "por cuenta de una agencia de transportes."
    ],
    "correcta": 1,
    "veces": 3,
    "explicacion": "En la colaboración, el transportista que ayuda trabaja <b>por cuenta del transportista principal</b> que lo contrató.",
    "paso": 2
  },
  {
    "enunciado": "¿Cómo se llama también al transporte de mercancías por cuenta propia que realiza una empresa cuya actividad principal no es la de transporte?",
    "opciones": [
      "Transporte privado productivo.",
      "Transporte empresarial privado.",
      "Transporte privado complementario.",
      "Transporte mercantil."
    ],
    "correcta": 2,
    "veces": 19,
    "explicacion": "El transporte por cuenta propia que hace una empresa cuyo trabajo principal no es el transporte se llama <b>transporte privado complementario</b>.",
    "paso": 3
  },
  {
    "enunciado": "¿Cómo se denomina al transporte que realizan las empresas que, dedicándose a una actividad distinta del transporte, mantienen vehículos propios para trasladar sus mercancías?",
    "opciones": [
      "Transporte privado complementario.",
      "Transporte privado particular.",
      "Transporte accesorio.",
      "Transporte ocasional."
    ],
    "correcta": 0,
    "veces": 11,
    "explicacion": "El transporte por cuenta propia que hace una empresa cuyo trabajo principal no es el transporte se llama <b>transporte privado complementario</b>.",
    "paso": 3
  },
  {
    "enunciado": "¿Cómo se denomina el transporte de mercancías que realiza una empresa cuya actividad principal es distinta del transporte, pero que dispone de vehículos propios para atender sus necesidades?",
    "opciones": [
      "Transporte industrial.",
      "Transporte privado complementario.",
      "Transporte privado regulado.",
      "Transporte privado exclusivo."
    ],
    "correcta": 1,
    "veces": 8,
    "explicacion": "El transporte por cuenta propia que hace una empresa cuyo trabajo principal no es el transporte se llama <b>transporte privado complementario</b>.",
    "paso": 3
  },
  {
    "enunciado": "¿Cómo se llama también al transporte de mercancías por cuenta propia que realiza una empresa cuya actividad principal no es la de transporte?",
    "opciones": [
      "Transporte privado.",
      "Transporte público.",
      "Transporte privado complementario.",
      "Ninguna de las respuestas anteriores es correcta."
    ],
    "correcta": 2,
    "veces": 2,
    "explicacion": "El transporte por cuenta propia que hace una empresa cuyo trabajo principal no es el transporte se llama <b>transporte privado complementario</b>.",
    "paso": 3
  },
  {
    "enunciado": "En el transporte privado complementario de mercancías, ¿debe estar el conductor integrado en la organización de la empresa?",
    "opciones": [
      "Sí.",
      "No.",
      "Solo si es un vehículo ligero.",
      "Solo si es un vehículo pesado."
    ],
    "correcta": 0,
    "veces": 22,
    "explicacion": "El conductor y los vehículos tienen que estar <b>integrados en la organización de la empresa</b>: ser de la empresa.",
    "paso": 4
  },
  {
    "enunciado": "En el caso de transporte privado complementario de mercancías:",
    "opciones": [
      "la empresa debe dedicarse, como actividad principal, al transporte de mercancías.",
      "las mercancías tendrán su origen o destino en un lugar en el que la empresa desarrolle trabajos relacionados con su actividad principal.",
      "el conductor puede tener una relación mercantil con la empresa.",
      "la vinculación del vehículo con la empresa no puede basarse en un contrato de alquiler."
    ],
    "correcta": 1,
    "veces": 8,
    "explicacion": "En el privado complementario, la empresa <b>no</b> se dedica al transporte, la mercadería tiene que ver con su trabajo (sale de donde trabaja o va hacia ahí), y el camión y el conductor son de la empresa.",
    "paso": 4
  },
  {
    "enunciado": "Cuando se realice un transporte privado complementario de mercancías, ¿se podrá facturar a los clientes dicho transporte de modo independiente?",
    "opciones": [
      "Sí.",
      "Solo si el volumen transportado supera los 1.000 kg.",
      "No.",
      "Solo cuando el recorrido sea superior a 100 km."
    ],
    "correcta": 2,
    "veces": 7,
    "explicacion": "<b>No</b>: en el privado complementario no se puede cobrar el transporte aparte. Si se cobrara, sería transporte público.",
    "paso": 4
  },
  {
    "enunciado": "Una de las condiciones que debe cumplir el transporte privado complementario de mercancías es que:",
    "opciones": [
      "los vehículos utilizados han de hallarse integrados en la organización de la empresa.",
      "se podrá facturar a los clientes por este concepto de modo independiente.",
      "los conductores no pertenecerán a la plantilla de la empresa.",
      "Las respuestas A y B son correctas."
    ],
    "correcta": 0,
    "veces": 5,
    "explicacion": "El conductor y los vehículos tienen que estar <b>integrados en la organización de la empresa</b>: ser de la empresa.",
    "paso": 4
  },
  {
    "enunciado": "En el caso de transporte privado complementario de mercancías en España:",
    "opciones": [
      "la empresa debe dedicarse a la actividad principal de transporte de mercancías.",
      "las mercancías tendrán su origen o destino en un lugar en el que la empresa desarrolle trabajos relacionados con su actividad principal.",
      "el conductor debe hallarse integrado en la organización de la empresa.",
      "Las respuestas B y C son correctas."
    ],
    "correcta": 3,
    "veces": 4,
    "explicacion": "En el privado complementario, la empresa <b>no</b> se dedica al transporte, la mercadería tiene que ver con su trabajo (sale de donde trabaja o va hacia ahí), y el camión y el conductor son de la empresa.",
    "paso": 4
  },
  {
    "enunciado": "Cuando se realice un transporte privado complementario de mercancías, ¿se podrá facturar a los clientes por este concepto de modo independiente?",
    "opciones": [
      "Sí.",
      "Sólo si el volumen transportado supera los 1.000 kg.",
      "No.",
      "Sólo cuando el recorrido sea superior a 100 km."
    ],
    "correcta": 2,
    "veces": 4,
    "explicacion": "<b>No</b>: en el privado complementario no se puede cobrar el transporte aparte. Si se cobrara, sería transporte público.",
    "paso": 4
  },
  {
    "enunciado": "En el caso de transporte privado complementario de mercancías:",
    "opciones": [
      "la empresa debe dedicarse, como actividad principal, al transporte de mercancías.",
      "las mercancías tendrán su origen o destino en un lugar en el que la empresa desarrolle trabajos relacionados con su actividad principal.",
      "el vehículo debe ser de propiedad del conductor",
      "la vinculación del vehículo con la empresa no puede basarse en un contrato de alquiler."
    ],
    "correcta": 1,
    "veces": 4,
    "explicacion": "En el privado complementario, la empresa <b>no</b> se dedica al transporte, la mercadería tiene que ver con su trabajo (sale de donde trabaja o va hacia ahí), y el camión y el conductor son de la empresa.",
    "paso": 4
  },
  {
    "enunciado": "Una de las condiciones que debe cumplir el transporte privado complementario de mercancías es que:",
    "opciones": [
      "los vehículos utilizados han de hallarse integrados en la organización de la empresa.",
      "se podrá facturar a los clientes por este concepto de modo independiente.",
      "los conductores no pueden pertenecer a la plantilla de la empresa.",
      "Las respuestas A y B son correctas."
    ],
    "correcta": 0,
    "veces": 3,
    "explicacion": "El conductor y los vehículos tienen que estar <b>integrados en la organización de la empresa</b>: ser de la empresa.",
    "paso": 4
  },
  {
    "enunciado": "¿Cuál de las siguientes afirmaciones, referida a las condiciones de realización del transporte privado complementario, es incorrecta?",
    "opciones": [
      "Es necesario que los vehículos con tracción propia estén integrados en la organización de la empresa.",
      "La actividad principal de la empresa no puede ser la de transporte.",
      "En caso de usar semirremolques, no es necesario que estén integrados en la organización de la empresa.",
      "Los conductores deben estar integrados en la organización de la empresa."
    ],
    "correcta": 2,
    "veces": 3,
    "explicacion": "Es falso que los semirremolques puedan no ser de la empresa: <b>también tienen que estar integrados</b> en la organización de la empresa, igual que el camión y el conductor.",
    "paso": 4
  },
  {
    "enunciado": "En el caso de transporte privado complementario de mercancías:",
    "opciones": [
      "la empresa debe dedicarse, como actividad principal, al transporte de mercancías.",
      "las mercancías tendrán su origen o destino en un lugar en el que la empresa desarrolle trabajos relacionados con su actividad principal.",
      "el conductor debe hallarse integrado en la organización de la empresa.",
      "Las respuestas B y C son correctas"
    ],
    "correcta": 1,
    "veces": 2,
    "explicacion": "En el privado complementario, la empresa <b>no</b> se dedica al transporte, la mercadería tiene que ver con su trabajo (sale de donde trabaja o va hacia ahí), y el camión y el conductor son de la empresa.",
    "paso": 4
  },
  {
    "enunciado": "Cuando se realice un transporte privado complementario de mercancías, ¿se podrá facturar a los clientes por este concepto de modo independiente?",
    "opciones": [
      "Sí.",
      "Solo si el volumen transportado supera los 1.000 kg.",
      "No.",
      "Solo cuando el recorrido sea superior a 100 km."
    ],
    "correcta": 2,
    "veces": 2,
    "explicacion": "<b>No</b>: en el privado complementario no se puede cobrar el transporte aparte. Si se cobrara, sería transporte público.",
    "paso": 4
  },
  {
    "enunciado": "¿Cuál de las siguientes afirmaciones, referida a las condiciones de realización del transporte privado complementario, es incorrecta?",
    "opciones": [
      "Es necesario que los vehículos con tracción propia estén integrados en la organización de la empresa.",
      "La actividad principal de la empresa no tiene que ser la actividad de transporte.",
      "En caso de usar semirremolques, no es necesario que estén integrados en la organización de la empresa.",
      "Los conductores deben estar integrados en la organización de la empresa."
    ],
    "correcta": 2,
    "veces": 1,
    "explicacion": "Es falso que los semirremolques puedan no ser de la empresa: <b>también tienen que estar integrados</b> en la organización de la empresa, igual que el camión y el conductor.",
    "paso": 4
  },
  {
    "enunciado": "Una de las condiciones que debe cumplir el transporte privado complementario de mercancías es que:",
    "opciones": [
      "los vehículos utilizados han de hallarse integrados en la organización de la empresa.",
      "se podrá facturar a los clientes por este concepto de modo independiente con un descuento de, al menos, el 50%.",
      "los conductores pueden no pertenecer a la plantilla de la empresa.",
      "los remolques y semirremolques utilizados pueden no hallarse integrados en la organización de la empresa."
    ],
    "correcta": 0,
    "veces": 1,
    "explicacion": "El conductor y los vehículos tienen que estar <b>integrados en la organización de la empresa</b>: ser de la empresa.",
    "paso": 4
  },
  {
    "enunciado": "En el caso del transporte privado complementario de mercancías, ¿qué documentación es necesario llevar a bordo del vehículo en relación con el transporte?",
    "opciones": [
      "Ninguna en especial.",
      "La que acredite qué mercancías, vehículo y conductor tienen relación con la empresa.",
      "La justificativa de la contratación del servicio en el que está incluido el transporte.",
      "Únicamente la factura de venta de las mercancías."
    ],
    "correcta": 1,
    "veces": 9,
    "explicacion": "Hay que llevar papeles que prueben que la mercancía, el vehículo y el conductor tienen que ver con la empresa: <b>todo eso junto</b>.",
    "paso": 5
  },
  {
    "enunciado": "En el caso del transporte privado complementario de mercancías, ¿qué documentación es necesario llevar a bordo del vehículo en relación con el transporte?",
    "opciones": [
      "La que acredite que las mercancías pertenecen o han sido vendidas por la empresa.",
      "La que acredite que el vehículo se encuentra integrado en la organización de la empresa.",
      "La que acredite que el conductor se encuentra integrado en la organización de la empresa.",
      "Todas las respuestas son correctas."
    ],
    "correcta": 3,
    "veces": 8,
    "explicacion": "Hay que llevar papeles que prueben que la mercancía, el vehículo y el conductor tienen que ver con la empresa: <b>todo eso junto</b>.",
    "paso": 5
  },
  {
    "enunciado": "De los siguientes, ¿qué documento debería llevarse a bordo en el caso de un transporte privado complementario de mercancías?",
    "opciones": [
      "Factura de compra de las mercancías.",
      "CIF de la empresa.",
      "Documento administrativo de control.",
      "Carta de porte."
    ],
    "correcta": 0,
    "veces": 7,
    "explicacion": "La <b>factura de compra</b> de la mercancía se lleva en el transporte <b>privado complementario</b>, para probar que la mercancía es de la empresa.",
    "paso": 5
  },
  {
    "enunciado": "De los siguientes, ¿qué documento debería llevarse a bordo en el caso de un transporte privado complementario de mercancías?",
    "opciones": [
      "CIF de la empresa.",
      "Documento administrativo de control.",
      "Acreditación de que el conductor trabaja para le empresa propietaria del vehículo.",
      "La justificativa de la contratación del servicio en el que está incluido el transporte."
    ],
    "correcta": 2,
    "veces": 6,
    "explicacion": "Hay que poder demostrar que <b>el conductor trabaja para la empresa</b> dueña del camión.",
    "paso": 5
  },
  {
    "enunciado": "La factura de la compra de las mercancías es un documento que debe llevarse a bordo del vehículo en el caso de...",
    "opciones": [
      "un transporte privado complementario.",
      "un transporte público.",
      "un transporte mixto.",
      "Debe llevarse siempre a bordo en todo tipo de transporte de mercancías."
    ],
    "correcta": 0,
    "veces": 6,
    "explicacion": "La <b>factura de compra</b> de la mercancía se lleva en el transporte <b>privado complementario</b>, para probar que la mercancía es de la empresa.",
    "paso": 5
  },
  {
    "enunciado": "Según la normativa, ¿qué vehículo de los siguientes necesita autorización administrativa para efectuar un transporte privado complementario de mercancías?",
    "opciones": [
      "Los de más de 1.500 kg de MMA.",
      "Los de más de 3.500 kg de MMA.",
      "Los de más de 2.000 kg de MMA.",
      "Los de más de 3.000 kg de MMA."
    ],
    "correcta": 1,
    "veces": 14,
    "explicacion": "En el privado complementario hace falta autorización si el vehículo pasa de <b>3,5 toneladas</b> de MMA.",
    "paso": 6
  },
  {
    "enunciado": "Para realizar transporte de mercancías de carácter privado complementario, ¿se necesita una autorización administrativa?",
    "opciones": [
      "No.",
      "Depende de cuál sea la Masa Máxima Autorizada del vehículo.",
      "Sí, pero solo si se dispone de más de un vehículo.",
      "Sí, pero solo cuando el vehículo que se utiliza es articulado."
    ],
    "correcta": 1,
    "veces": 13,
    "explicacion": "<b>Depende de la MMA</b>: en el privado complementario hace falta autorización solo si el vehículo pasa de 3,5 toneladas.",
    "paso": 6
  },
  {
    "enunciado": "En el transporte de mercancías por cuenta ajena la autorización administrativa es necesaria cuando la MMA del vehículo sea superior a:",
    "opciones": [
      "3 toneladas.",
      "1 toneladas.",
      "4 toneladas.",
      "2 toneladas."
    ],
    "correcta": 3,
    "veces": 12,
    "explicacion": "En el transporte público hace falta autorización si el vehículo pasa de <b>2 toneladas</b> de MMA.",
    "paso": 6
  },
  {
    "enunciado": "Están exentos de autorización administrativa los transportes de mercancías de carácter privado complementario realizados en vehículos de:",
    "opciones": [
      "hasta 8 toneladas de Masa Máxima Autorizada.",
      "hasta 4,5 toneladas de Masa Máxima Autorizada.",
      "hasta 3,5 toneladas de Masa Máxima Autorizada.",
      "hasta 7 toneladas de Masa Máxima Autorizada."
    ],
    "correcta": 2,
    "veces": 8,
    "explicacion": "En el privado complementario hace falta autorización si el vehículo pasa de <b>3,5 toneladas</b> de MMA.",
    "paso": 6
  },
  {
    "enunciado": "Están exentos de autorización administrativa los transportes públicos de mercancías realizados en vehículos de:",
    "opciones": [
      "hasta 2 toneladas de Masa Máxima Autorizada.",
      "hasta 3,5 toneladas de Masa Máxima Autorizada.",
      "hasta 8 toneladas de Masa Máxima Autorizada.",
      "hasta 12 toneladas de Masa Máxima Autorizada."
    ],
    "correcta": 0,
    "veces": 7,
    "explicacion": "En el transporte público hace falta autorización si el vehículo pasa de <b>2 toneladas</b> de MMA.",
    "paso": 6
  },
  {
    "enunciado": "Están exentos de autorización administrativa los transportes públicos de mercancías realizados en vehículos de:",
    "opciones": [
      "hasta 2 toneladas de Masa Máxima Autorizada.",
      "hasta 3,5 toneladas de Masa Máxima Autorizada.",
      "hasta 2 toneladas de Carga útil.",
      "hasta 2.5 toneladas de Carga útil."
    ],
    "correcta": 0,
    "veces": 7,
    "explicacion": "En el transporte público hace falta autorización si el vehículo pasa de <b>2 toneladas</b> de MMA.",
    "paso": 6
  },
  {
    "enunciado": "Están exentos de autorización administrativa los transportes de mercancías de carácter privado complementario realizados en vehículos de:",
    "opciones": [
      "hasta 8 toneladas de Masa Máxima Autorizada.",
      "hasta 4,5 toneladas de Masa Máxima Autorizada.",
      "hasta 3,5 toneladas de Masa Máxima Autorizada.",
      "hasta 2 toneladas de Carga útil."
    ],
    "correcta": 2,
    "veces": 5,
    "explicacion": "En el privado complementario hace falta autorización si el vehículo pasa de <b>3,5 toneladas</b> de MMA.",
    "paso": 6
  },
  {
    "enunciado": "En el transporte privado complementario de mercancías no es necesaria la autorización administrativa si el vehículo no supera una MMA de:",
    "opciones": [
      "2 toneladas.",
      "3 toneladas.",
      "3,5 toneladas.",
      "4 toneladas."
    ],
    "correcta": 2,
    "veces": 4,
    "explicacion": "En el privado complementario hace falta autorización si el vehículo pasa de <b>3,5 toneladas</b> de MMA.",
    "paso": 6
  },
  {
    "enunciado": "Para realizar transporte de mercancías de carácter privado complementario, ¿se necesita una autorización administrativa?",
    "opciones": [
      "No.",
      "Depende de cuál sea la masa máxima autorizada del vehículo.",
      "Sí, pero sólo si se dispone de más de un vehículo.",
      "Sí, pero sólo cuando el vehículo que se utiliza es articulado."
    ],
    "correcta": 1,
    "veces": 2,
    "explicacion": "<b>Depende de la MMA</b>: en el privado complementario hace falta autorización solo si el vehículo pasa de 3,5 toneladas.",
    "paso": 6
  },
  {
    "enunciado": "Para realizar transporte público de mercancías en un vehículo de 1,5 toneladas de MMA, ¿se necesita autorización administrativa?",
    "opciones": [
      "No.",
      "Sí.",
      "Sí, pero sólo si el vehículo es refrigerado.",
      "Sólo si el transporte es de mercancías perecederas."
    ],
    "correcta": 0,
    "veces": 2,
    "explicacion": "<b>No</b>: en el transporte público hace falta autorización recién cuando el vehículo pasa de 2 toneladas, y este pesa 1,5.",
    "paso": 6
  },
  {
    "enunciado": "En el transporte de mercancías por cuenta ajena, la autorización administrativa es necesaria cuando la MMA del vehículo sea superior a:",
    "opciones": [
      "3,5 toneladas.",
      "3 toneladas.",
      "2,5 toneladas.",
      "2 toneladas."
    ],
    "correcta": 3,
    "veces": 2,
    "explicacion": "En el transporte público hace falta autorización si el vehículo pasa de <b>2 toneladas</b> de MMA.",
    "paso": 6
  },
  {
    "enunciado": "¿Cuál de estas afirmaciones es correcta?",
    "opciones": [
      "La capacidad de carga de la flota de transporte privado complementario sujeta a autorización administrativa es inferior a la del transporte por cuenta ajena.",
      "En el transporte por cuenta propia no se requiere autorización administrativa si el vehículo no supera 3,5 toneladas de masa máxima autorizada.",
      "En el transporte por cuenta ajena la autorización es necesaria para vehículos de más de 2 toneladas de masa máxima autorizada.",
      "Todas las respuestas anteriores son correctas."
    ],
    "correcta": 3,
    "veces": 1,
    "explicacion": "Las tres son ciertas: el privado no necesita autorización hasta 3,5 t, el público la necesita desde más de 2 t, y la flota privada con autorización es menor. Por eso: <b>todas son correctas</b>.",
    "paso": 6
  },
  {
    "enunciado": "Están exentos de autorización administrativa los transportes de mercancías de carácter privado complementario de:",
    "opciones": [
      "hasta 8 toneladas de masa máxima autorizada.",
      "hasta 4,5 toneladas de masa máxima autorizada.",
      "hasta 3,5 toneladas de masa máxima autorizada.",
      "hasta 7 toneladas de masa máxima autorizada."
    ],
    "correcta": 2,
    "veces": 1,
    "explicacion": "En el privado complementario hace falta autorización si el vehículo pasa de <b>3,5 toneladas</b> de MMA.",
    "paso": 6
  },
  {
    "enunciado": "¿Se necesita autorización para realizar transporte privado complementario de mercancías con un vehículo de 2,5 toneladas de MMA?",
    "opciones": [
      "No.",
      "Sí.",
      "No, solo si el vehículo es refrigerado.",
      "Solo si el transporte es de mercancías perecederas."
    ],
    "correcta": 0,
    "veces": 1,
    "explicacion": "<b>No</b>: en el privado complementario hace falta autorización recién cuando el vehículo pasa de 3,5 toneladas, y este pesa 2,5.",
    "paso": 6
  },
  {
    "enunciado": "Según la normativa, ¿qué vehículo de los siguientes necesita autorización administrativa para efectuar un transporte privado complementario de mercancías?",
    "opciones": [
      "Los de más de 4.000 kg de MMA.",
      "Los de más de 3.500 kg de MMA.",
      "Los de más de 3.000 kg de MMA.",
      "Los de más de 2.500 kg de MMA."
    ],
    "correcta": 1,
    "veces": 1,
    "explicacion": "En el privado complementario hace falta autorización si el vehículo pasa de <b>3,5 toneladas</b> de MMA.",
    "paso": 6
  },
  {
    "enunciado": "Los vehículos oficiales de transporte de mercancías que utilizan los órganos de la Administración:",
    "opciones": [
      "necesitan autorización de transporte público.",
      "necesitan autorización de transporte privado particular.",
      "necesitan autorización de transporte privado complementario.",
      "están exentos de autorización de transporte."
    ],
    "correcta": 3,
    "veces": 26,
    "explicacion": "Los vehículos oficiales de la Administración están <b>exentos</b> de autorización.",
    "paso": 7
  },
  {
    "enunciado": "Los transportes de mercancías realizados en vehículos de menos de tres ruedas:",
    "opciones": [
      "necesitan una autorización de transporte privado complementario.",
      "necesitan una autorización de transporte público.",
      "necesitan una autorización de vehículo especial.",
      "están exentos de autorización."
    ],
    "correcta": 3,
    "veces": 22,
    "explicacion": "Los vehículos de <b>menos de tres ruedas</b> están exentos de autorización.",
    "paso": 7
  },
  {
    "enunciado": "Los transportes de mercancías que se realicen en recintos cerrados dedicados a actividades distintas del transporte terrestre:",
    "opciones": [
      "están exentos de autorización.",
      "están exentos de autorización en algunos casos, dependiendo de la capacidad de carga del vehículo.",
      "necesitan autorización de transporte complementario.",
      "necesitan autorización de transporte especial."
    ],
    "correcta": 0,
    "veces": 18,
    "explicacion": "Los transportes dentro de recintos cerrados que no se dedican al transporte están <b>exentos</b>, pesen lo que pesen.",
    "paso": 7
  },
  {
    "enunciado": "Los transportes de mercancías de carácter privado particular:",
    "opciones": [
      "necesitan una autorización de transporte privado.",
      "necesitan una autorización de transporte privado complementario.",
      "necesitan una autorización de transporte público.",
      "están exentos de autorización."
    ],
    "correcta": 3,
    "veces": 17,
    "explicacion": "El transporte <b>privado particular</b> (una persona con sus cosas) está exento de autorización.",
    "paso": 7
  },
  {
    "enunciado": "Los transportes de mercancías de carácter oficial:",
    "opciones": [
      "necesitan una autorización de transporte privado complementario.",
      "necesitan una autorización de transporte público.",
      "necesitan una autorización de transporte oficial.",
      "están exentos de autorización."
    ],
    "correcta": 3,
    "veces": 16,
    "explicacion": "Los vehículos oficiales de la Administración están <b>exentos</b> de autorización.",
    "paso": 7
  },
  {
    "enunciado": "El transporte funerario realizado por prestadores de servicios funerarios:",
    "opciones": [
      "necesita autorización de transporte funerario (tarjeta VF).",
      "necesita autorización de transporte privado complementario de mercancías (tarjeta MPCE).",
      "necesita autorización de transporte público de mercancías (tarjeta MDLE).",
      "está exento de autorización."
    ],
    "correcta": 3,
    "veces": 12,
    "explicacion": "El transporte funerario está <b>exento</b> de autorización. No existe ninguna \"tarjeta VF\".",
    "paso": 7
  },
  {
    "enunciado": "Los vehículos oficiales de transporte de mercancías que utilizan los órganos de la Administración:",
    "opciones": [
      "necesitan tarjeta de transporte público.",
      "necesitan tarjeta de transporte privado particular.",
      "necesitan tarjeta de transporte privado complementario.",
      "están exentos de la autorización de transporte."
    ],
    "correcta": 3,
    "veces": 4,
    "explicacion": "Los vehículos oficiales de la Administración están <b>exentos</b> de autorización.",
    "paso": 7
  },
  {
    "enunciado": "Los transportes funerarios en vehículos especialmente acondicionados:",
    "opciones": [
      "necesitan autorización de transporte funerario (tarjeta VF).",
      "necesitan autorización de transporte privado complementario de mercancías (tarjeta MPCE).",
      "necesitan autorización de transporte público de mercancías (tarjeta MDLE).",
      "están exentos de autorización."
    ],
    "correcta": 3,
    "veces": 4,
    "explicacion": "El transporte funerario está <b>exento</b> de autorización. No existe ninguna \"tarjeta VF\".",
    "paso": 7
  },
  {
    "enunciado": "El transporte funerario realizado por prestadores de servicios funerarios:",
    "opciones": [
      "necesita autorización de transporte funerario (clave VF).",
      "necesita autorización de transporte privado complementario de mercancías (clave MPCE).",
      "necesita autorización de transporte público de mercancías (clave MDLE).",
      "está exento de autorización."
    ],
    "correcta": 3,
    "veces": 4,
    "explicacion": "El transporte funerario está <b>exento</b> de autorización. No existe ninguna \"tarjeta VF\".",
    "paso": 7
  },
  {
    "enunciado": "Los transportes de mercancías de carácter privado complementario realizados en tractores agrícolas:",
    "opciones": [
      "están siempre exentos de autorización.",
      "están exentos de autorización en determinados casos, dependiendo de la carga transportada.",
      "necesitan siempre autorización de transporte privado complementario.",
      "necesitan siempre autorización de transporte agrícola."
    ],
    "correcta": 0,
    "veces": 2,
    "explicacion": "El privado complementario en tractores agrícolas está <b>siempre exento</b> de autorización.",
    "paso": 7
  },
  {
    "enunciado": "¿En qué documento oficial se recogen las características constructivas de un vehículo?",
    "opciones": [
      "En el permiso de circulación.",
      "En la tarjeta de transporte.",
      "En el permiso de conducción.",
      "En la tarjeta de inspección técnica."
    ],
    "correcta": 3,
    "veces": 2,
    "explicacion": "Los vehículos oficiales de la Administración están <b>exentos</b> de autorización.",
    "paso": 7
  },
  {
    "enunciado": "Los vehículos de transporte de mercancías que utilizan los órganos de la Administración para efectuar transportes oficiales:",
    "opciones": [
      "necesitan autorización de transporte público.",
      "necesitan autorización de transporte privado particular.",
      "necesitan autorización de transporte privado complementario.",
      "están exentos de autorización de transporte."
    ],
    "correcta": 3,
    "veces": 1,
    "explicacion": "Los vehículos oficiales de la Administración están <b>exentos</b> de autorización.",
    "paso": 7
  },
  {
    "enunciado": "Los transportes de dinero:",
    "opciones": [
      "están siempre exentos de autorización.",
      "están exentos de autorización si se realizan en vehículos especialmente acondicionados.",
      "necesitan siempre autorización de transporte público de mercancías.",
      "necesitan siempre autorización de transporte público o privado complementario de mercancías, según quién sea el propietario del vehículo."
    ],
    "correcta": 1,
    "veces": 16,
    "explicacion": "El transporte de dinero está exento <b>si va en un vehículo especialmente preparado</b> (blindado). No \"siempre\".",
    "paso": 8
  },
  {
    "enunciado": "Los transportes de medicamentos:",
    "opciones": [
      "están exentos de autorización en caso de ayudas urgentes.",
      "están siempre exentos de autorización.",
      "necesitan siempre autorización de transporte privado complementario.",
      "necesitan siempre autorización de transporte sanitario."
    ],
    "correcta": 0,
    "veces": 9,
    "explicacion": "Los medicamentos están exentos <b>solo en ayudas urgentes</b> (y catástrofes). No \"siempre\".",
    "paso": 8
  },
  {
    "enunciado": "Los transportes de medicamentos:",
    "opciones": [
      "están exentos de autorización en caso de ayudas urgentes y catástrofes naturales.",
      "están siempre exentos de autorización.",
      "necesitan siempre autorización de transporte privado complementario.",
      "necesitan siempre autorización de transporte sanitario."
    ],
    "correcta": 0,
    "veces": 9,
    "explicacion": "Los medicamentos están exentos <b>solo en ayudas urgentes</b> (y catástrofes). No \"siempre\".",
    "paso": 8
  },
  {
    "enunciado": "Los vehículos que lleven unidos de modo permanente una grúa de elevación:",
    "opciones": [
      "están siempre exentos de autorización de transporte.",
      "están exentos de autorización de transporte cuando se dedican exclusivamente a dar soporte a dicho instrumento.",
      "necesitan siempre autorización de transporte.",
      "necesitan autorización de transporte si el vehículo tiene una tara superior a 3,5 toneladas."
    ],
    "correcta": 1,
    "veces": 9,
    "explicacion": "Un vehículo con grúa fija está exento <b>solo si se dedica a llevar la grúa</b>. No \"siempre\".",
    "paso": 8
  },
  {
    "enunciado": "Los vehículos que lleven unidos de modo permanente una grúa de elevación:",
    "opciones": [
      "están siempre exentos de autorización de transporte.",
      "están exentos de autorización de transporte cuando se dedican exclusivamente a dar soporte a dicho instrumento.",
      "necesitan siempre autorización de transporte.",
      "necesitan siempre autorización de transporte si el vehículo tiene una tara superior a 3,5 toneladas."
    ],
    "correcta": 1,
    "veces": 5,
    "explicacion": "Un vehículo con grúa fija está exento <b>solo si se dedica a llevar la grúa</b>. No \"siempre\".",
    "paso": 8
  },
  {
    "enunciado": "¿Es necesaria autorización de transporte para la realización de un transporte de dinero en un vehículo blindado especialmente acondicionado para ello?",
    "opciones": [
      "Sí, siempre.",
      "No, en ningún caso.",
      "Sí, cuando el transporte supere el ámbito de una comunidad autónoma.",
      "Sí, excepto si se trata de transporte urbano."
    ],
    "correcta": 1,
    "veces": 5,
    "explicacion": "En un blindado especialmente preparado, el transporte de dinero <b>no</b> necesita autorización <b>en ningún caso</b>.",
    "paso": 8
  },
  {
    "enunciado": "¿Es necesaria tarjeta de transporte para la realización de un transporte de dinero y mercancías preciosas en un vehículo blindado especialmente acondicionado para ello?",
    "opciones": [
      "Sí, siempre.",
      "No, en ningún caso.",
      "Sí, cuando el transporte sea intracomunitario.",
      "Ninguna de las respuestas es correcta."
    ],
    "correcta": 1,
    "veces": 2,
    "explicacion": "En un blindado especialmente preparado, el transporte de dinero <b>no</b> necesita autorización <b>en ningún caso</b>.",
    "paso": 8
  }
];
