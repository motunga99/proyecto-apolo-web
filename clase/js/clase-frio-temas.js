// ==========================================
// FRIGORÍFICOS Y ATP: los 3 capítulos
// Todo sale de las preguntas oficiales de Mercancías. Una idea por pantalla.
// ==========================================

export const PASOS_FRIO_ATP = [
  {
    "tipo": "atp",
    "titulo": "Comida que se pudre y el ATP",
    "texto": [
      "<b>Mercancías perecederas</b> = comida que <b>se echa a perder</b> si se calienta. Por ejemplo: <b>carne, pescado, leche y congelados</b>. Mirá la foto.",
      "Para llevar esa comida hay reglas especiales. Se llaman <b>ATP</b>.",
      "El <b>ATP</b> es un <b>acuerdo entre países</b>. Dice <b>cómo hay que llevar la comida perecedera</b> y <b>cómo tienen que ser los camiones</b> que la llevan. <b>España lo firmó.</b>",
      "Su nombre largo (el examen lo pregunta así): <b>Acuerdo sobre transportes internacionales de mercancías perecederas y sobre vehículos especiales utilizados en esos transportes</b>. Los otros nombres que te ponen (ATAP, TITC, ATMA, ACP, ADP…) son <b>inventados</b>.",
      "<b>Trampa:</b> el ATP <b>no</b> es de personas con movilidad reducida, <b>no</b> es del transporte combinado con el tren y <b>no</b> es de la aduana. Es solo de <b>comida que se pudre</b>.",
      "<b>Llevar comida a temperatura regulada tiene una regulación especial</b>, y no solo para los congelados: para toda la comida perecedera."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "perecederas",
      "titulo": "Mercancías perecederas",
      "texto": "Carne, pescado, leche, congelados: se pudren si se calientan."
    }
  },
  {
    "tipo": "atp",
    "titulo": "¿Dónde se aplica el ATP?",
    "texto": [
      "El ATP se aplica <b>directamente</b> en los <b>viajes internacionales</b> de comida perecedera <b>entre países que firmaron</b> el acuerdo. No en cualquier viaje ni según cuántos kilómetros o cuántas horas dure.",
      "Vale para todo transporte por carretera, <b>por cuenta ajena o por cuenta propia</b>.<br>• <b>Por cuenta ajena:</b> llevás mercancía de otro y te pagan por eso.<br>• <b>Por cuenta propia:</b> llevás tu propia mercancía.",
      "<b>¿Y si el camión sube a un barco?</b> El ATP sigue valiendo si el trayecto en barco es de <b>menos de 150 km</b> y la mercancía <b>sigue adentro del camión</b>. Mirá la foto."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "donde",
      "titulo": "Dónde se aplica",
      "texto": "Viajes internacionales, cuenta propia o ajena, y barco de menos de 150 km."
    }
  },
  {
    "tipo": "atp",
    "titulo": "Congelados y el coeficiente K",
    "texto": [
      "<b>Congelados:</b> tienen que viajar como máximo <b>entre -20 °C y -10 °C</b>, según el producto. Mirá el termómetro.",
      "<b>Coeficiente K:</b> es un número que dice <b>cuánto calor se cuela por las paredes</b> de la caja.",
      "El examen le dice <b>coeficiente global de transmisión térmica</b>. No tiene nada que ver con caballos ni con la potencia de la máquina de frío.",
      "<b>K más chico = la caja aísla mejor</b>. Como una buena conservadora: casi no deja pasar el calor."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "congelados",
      "titulo": "Congelados y coeficiente K",
      "texto": "Congelados: de -20 a -10 °C. K: cuánto calor pasa por las paredes."
    }
  },
  {
    "tipo": "atp",
    "titulo": "Trabajar en una cámara de frío",
    "texto": [
      "Las <b>cámaras frigoríficas</b> son las habitaciones enfriadas de los almacenes, donde se carga y descarga la comida. Las cajas de los camiones frigoríficos también se ponen así.",
      "En el piso se forman <b>placas de hielo</b>. Mirá la foto.",
      "<b>El accidente más común ahí: resbalarse y caerse al mismo nivel.</b> \"Al mismo nivel\" quiere decir que te caés en el piso donde estás parado, <b>no desde una altura</b>.",
      "Por eso: caminá con cuidado y con calzado que no resbale."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "camara",
      "titulo": "Cámara de frío",
      "texto": "Placas de hielo en el piso: caídas al mismo nivel."
    }
  },
  {
    "tipo": "atp",
    "titulo": "Repaso: el ATP",
    "texto": [
      "<b>Perecederas</b> = comida que se pudre si se calienta. <b>ATP</b> = acuerdo entre países para llevarla y cómo son los camiones. España lo firmó.",
      "Se aplica a <b>viajes internacionales</b> entre países firmantes, <b>por cuenta ajena o propia</b>, y en <b>barco si es menos de 150 km</b>.",
      "<b>Congelados:</b> de -20 °C a -10 °C. <b>Coeficiente K:</b> cuánto calor pasa por las paredes (transmisión térmica).",
      "<b>Hielo en la cámara:</b> caídas al mismo nivel."
    ],
    "sim": "quieto",
    "vista": "perspectiva"
  },
  {
    "tipo": "atp",
    "titulo": "Preguntas oficiales: el ATP",
    "texto": [],
    "sim": "quieto",
    "vista": "perspectiva",
    "quiz": true
  }
];

export const PASOS_FRIO_TIPOS = [
  {
    "tipo": "tipos",
    "titulo": "Los 4 tipos de caja",
    "texto": [
      "Los camiones para comida se llaman <b>de temperatura controlada</b>. Hay <b>4 tipos</b>, mirá la foto, van pasando:",
      "<b>1. Isotermo</b> · <b>2. Refrigerante</b> · <b>3. Frigorífico</b> · <b>4. Calorífico</b>. También hay cajas que son <b>frigoríficas y caloríficas a la vez</b>.",
      "Los mismos 4 tipos valen para <b>cajas</b>, para <b>unidades de transporte</b> y para <b>cisternas</b>.",
      "<b>Trampa:</b> <b>cisterna NO es un tipo</b>. Cisterna es la <b>forma</b> de la caja: un tanque redondo. Una cisterna puede ser isoterma, refrigerante, frigorífica o calorífica."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "tipos",
      "titulo": "Los 4 tipos",
      "texto": "Isotermo, refrigerante, frigorífico y calorífico. Cisterna no es un tipo."
    }
  },
  {
    "tipo": "tipos",
    "titulo": "El isotermo",
    "texto": [
      "<b>Isotermo = una conservadora de playa gigante.</b>",
      "Tiene <b>paredes gruesas que aíslan</b> (lo amarillo de la foto). El calor de afuera choca contra la pared y casi no entra; el frío de adentro casi no sale.",
      "<b>No tiene ninguna máquina.</b> No enfría ni calienta: solo <b>mantiene</b> la temperatura que ya tenía la carga.",
      "Si te preguntan por una cisterna con <b>paredes aislantes que limitan el paso del calor</b>, es una cisterna <b>isoterma</b>.",
      "<b>Los otros 3 tipos son un isotermo + algo más:</b> hielo, una máquina de frío o una calefacción."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "isotermo",
      "titulo": "Isotermo",
      "texto": "Paredes que aíslan. Sin máquina: solo mantiene."
    }
  },
  {
    "tipo": "tipos",
    "titulo": "El refrigerante: frío sin máquina",
    "texto": [
      "<b>Refrigerante = isotermo + algo frío adentro que NO es una máquina.</b> En la foto: bloques de hielo y placas de frío colgadas.",
      "El examen lo dice así: una <b>fuente de frío distinta de un equipo mecánico o de absorción</b>. O sea: <b>no hay máquina</b>.",
      "Tiene <b>4 clases</b>: A, B, C y D, según cuánto enfría.",
      "<b>Clase A:</b> con <b>+30 °C afuera</b> (un día de verano), adentro tiene que bajar y quedar como máximo a <b>+7 °C</b>. Mirá el termómetro."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "refrigerante",
      "titulo": "Refrigerante",
      "texto": "Frío sin máquina. Clase A: máximo +7 °C con +30 °C afuera."
    }
  },
  {
    "tipo": "tipos",
    "titulo": "El frigorífico: frío con máquina",
    "texto": [
      "<b>Frigorífico = isotermo + su propia máquina de frío</b>, como una heladera enchufada. En la foto: la máquina arriba, soplando aire frío.",
      "La máquina puede ser <b>mecánica</b> o de las llamadas <b>de \"absorción\"</b>. Igual es <b>frigorífico</b>.",
      "Tiene <b>6 clases</b>: A, B, C, D, E y F.",
      "<b>Clase C:</b> tiene que poder bajar la temperatura y dejarla <b>donde se elija entre +12 °C y -20 °C</b>. Mirá cómo la máquina la va bajando."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "frigorifico",
      "titulo": "Frigorífico",
      "texto": "Frío con su propia máquina. Clase C: de +12 °C a -20 °C."
    }
  },
  {
    "tipo": "tipos",
    "titulo": "El calorífico: da calor",
    "texto": [
      "<b>Calorífico = isotermo + calefacción.</b> En la foto: el calefactor naranja adentro y nieve afuera.",
      "Sirve para que la carga (por ejemplo frutas y verduras) <b>no se congele</b> cuando afuera hace mucho frío.",
      "Tiene <b>2 clases</b>: A y B.",
      "<b>Clase A:</b> con <b>-10 °C afuera</b>, adentro tiene que subir y quedar <b>a +12 °C o más</b>. Mirá el termómetro."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "calorifico",
      "titulo": "Calorífico",
      "texto": "Da calor. Clase A: +12 °C o más con -10 °C afuera."
    }
  },
  {
    "tipo": "tipos",
    "titulo": "Refrigerante contra frigorífico",
    "texto": [
      "Es la trampa que <b>más sale</b> en el examen. Mirá los dos lado a lado.",
      "<b>Refrigerante:</b> frío <b>SIN máquina</b> (hielo, placas de frío). <b>4 clases</b> (A a D).",
      "<b>Frigorífico:</b> frío <b>CON máquina</b> (mecánica o de absorción). <b>6 clases</b> (A a F).",
      "<b>Truco:</b> ¿tiene máquina? → <b>frigorífico</b>. ¿No tiene? → <b>refrigerante</b>.",
      "Si te preguntan qué caracteriza a un refrigerante y te dan \"su frío es un equipo mecánico\", \"su frío es un equipo de absorción\" o \"siempre aísla como un isotermo normal\", <b>ninguna es correcta</b>: el refrigerante no tiene máquina y puede ser normal o reforzado."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "compara",
      "titulo": "Refrigerante o frigorífico",
      "texto": "Sin máquina = refrigerante. Con máquina = frigorífico."
    }
  },
  {
    "tipo": "tipos",
    "titulo": "Repaso: los tipos",
    "texto": [
      "<b>4 tipos:</b> isotermo, refrigerante, frigorífico y calorífico. <b>Cisterna no es un tipo.</b>",
      "<b>Isotermo:</b> paredes que aíslan, sin máquina.",
      "<b>Refrigerante:</b> frío <b>sin</b> máquina. <b>4 clases</b>. Clase A: máximo +7 °C con +30 °C afuera.",
      "<b>Frigorífico:</b> frío <b>con</b> máquina. <b>6 clases</b>. Clase C: de +12 °C a -20 °C.",
      "<b>Calorífico:</b> da calor. <b>2 clases</b>. Clase A: +12 °C o más con -10 °C afuera."
    ],
    "sim": "quieto",
    "vista": "perspectiva"
  },
  {
    "tipo": "tipos",
    "titulo": "Preguntas oficiales: los tipos",
    "texto": [],
    "sim": "quieto",
    "vista": "perspectiva",
    "quiz": true
  }
];

export const PASOS_FRIO_SIGLAS = [
  {
    "tipo": "siglas",
    "titulo": "La 1ª letra: el tipo",
    "texto": [
      "Cada camión del ATP lleva <b>letras</b> pintadas que dicen qué tipo de caja es. Son <b>letras</b>: no números ni colores.",
      "<b>La 1ª letra dice el tipo</b>. Mirá cómo se prenden:<br>• <b>I</b> = isotermo<br>• <b>R</b> = refrigerante<br>• <b>F</b> = frigorífico<br>• <b>C</b> = calorífico"
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "letra1",
      "titulo": "1ª letra",
      "texto": "I isotermo · R refrigerante · F frigorífico · C calorífico."
    }
  },
  {
    "tipo": "siglas",
    "titulo": "La 2ª letra: normal o reforzado",
    "texto": [
      "<b>La 2ª letra dice cuánto aísla la caja</b>:<br>• <b>N</b> = normal<br>• <b>R</b> = reforzado",
      "<b>Trampa de la R:</b> si la R está <b>primera</b>, es <b>refrigerante</b>. Si está <b>en el medio</b>, es <b>reforzado</b>. No es \"reforma\", ni \"rehabilitado\", ni \"recalificado\".",
      "<b>Trampa de la N:</b> la N del medio es <b>normal</b>. No quiere decir \"anual\" ni \"nacional\".",
      "<b>El isotermo lleva solo 2 letras</b>, porque no tiene clase:<br>• <b>IN</b> = isotermo normal<br>• <b>IR</b> = isotermo reforzado"
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "letra2",
      "titulo": "2ª letra",
      "texto": "N normal · R reforzado. Isotermo: IN o IR."
    }
  },
  {
    "tipo": "siglas",
    "titulo": "La 3ª letra: la clase",
    "texto": [
      "<b>La 3ª letra es la clase</b>: dice cuánto puede enfriar o calentar.",
      "• <b>Refrigerante:</b> 4 clases, de la <b>A a la D</b>.<br>• <b>Frigorífico:</b> 6 clases, de la <b>A a la F</b>.<br>• <b>Calorífico:</b> 2 clases, <b>A y B</b>.<br>• <b>Isotermo:</b> no tiene clase.",
      "Así que <b>FRF sí existe</b> (frigorífico reforzado de la clase F), porque el frigorífico llega hasta la F."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "letra3",
      "titulo": "3ª letra",
      "texto": "La clase: refrigerante A–D, frigorífico A–F, calorífico A–B."
    }
  },
  {
    "tipo": "siglas",
    "titulo": "Practicá: leé las letras",
    "texto": [
      "Ahora juntamos las 3. En la animación, el camión va mostrando <b>todas las siglas que salen en el examen</b>, de a una. Antes de que aparezca la respuesta, probá leerla vos.",
      "• <b>FNA</b> = frigorífico normal de la clase A<br>• <b>FRA</b> = frigorífico reforzado de la clase A<br>• <b>FRC</b> = frigorífico reforzado de la clase C<br>• <b>FND</b> = frigorífico normal de la clase D<br>• <b>FRF</b> = frigorífico reforzado de la clase F",
      "• <b>RNA</b> = refrigerante normal de la clase A<br>• <b>RRA</b> = refrigerante reforzado de la clase A<br>• <b>RND</b> = refrigerante normal de la clase D",
      "• <b>CRA</b> = calorífico reforzado de la clase A<br>• <b>IN</b> = isotermo normal · <b>IR</b> = isotermo reforzado",
      "<b>Al revés también:</b> si te dicen \"frigorífico normal de la clase D\", armás <b>F + N + D = FND</b>. Siempre 3 letras, sin agregar nada."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "practica",
      "titulo": "Practicá",
      "texto": "Tipo + normal o reforzado + clase."
    }
  },
  {
    "tipo": "siglas",
    "titulo": "Dónde van las letras, la fecha y la X",
    "texto": [
      "<b>¿Dónde van?</b> En las <b>esquinas de arriba</b> de la caja, <b>cerca de la parte de adelante</b>, en <b>los dos costados</b>. Mirá el camión. No van al lado de la matrícula ni atrás.",
      "<b>Debajo de las letras</b> va la <b>fecha en que vence el certificado</b> del camión: <b>solo mes y año</b>. Por ejemplo, 06-2028 = vence en junio de 2028. No es la fecha en que lo dieron ni la de la última revisión.",
      "<b>Letra X:</b> si el equipo de frío o calor <b>se puede sacar</b> (el examen dice \"amovible\") o <b>no funciona solo</b> (\"no autónomo\"), a las letras se les agrega una <b>X</b>."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "placa",
      "titulo": "Dónde van",
      "texto": "Esquinas de arriba, cerca de adelante, en los dos costados."
    }
  },
  {
    "tipo": "siglas",
    "titulo": "El distintivo y la placa",
    "texto": [
      "<b>Distintivo de mercancías perecederas:</b> un <b>cuadrado blanco</b> con las letras en <b>azul oscuro</b>. Mirá la foto.",
      "No lo confundas con la placa de vehículo lento, el distintivo de nacionalidad, la placa de servicio público ni el de <b>mercancías peligrosas (ADR)</b>.",
      "<b>Placa de certificación de conformidad:</b> es la plaquita que dice que el camión cumple el ATP. Mide como mínimo <b>160 × 100 mm</b>."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "distintivo",
      "titulo": "Distintivo y placa",
      "texto": "Cuadrado blanco con letras azul oscuro. Placa: mínimo 160 × 100 mm."
    }
  },
  {
    "tipo": "siglas",
    "titulo": "Repaso: las letras",
    "texto": [
      "<b>1ª letra</b> = tipo (I, R, F, C). <b>2ª</b> = N normal o R reforzado. <b>3ª</b> = clase. Isotermo: solo 2 letras (IN, IR).",
      "<b>R primera</b> = refrigerante. <b>R en el medio</b> = reforzado. <b>N</b> = normal.",
      "<b>Lugar:</b> esquinas de arriba, cerca de adelante, en los dos costados. <b>Debajo:</b> mes y año en que vence el certificado. <b>X:</b> equipo que se puede sacar o no autónomo.",
      "<b>Distintivo:</b> cuadrado blanco con letras azul oscuro. <b>Placa:</b> mínimo 160 × 100 mm."
    ],
    "sim": "quieto",
    "vista": "perspectiva"
  },
  {
    "tipo": "siglas",
    "titulo": "Preguntas oficiales: las letras",
    "texto": [],
    "sim": "quieto",
    "vista": "perspectiva",
    "quiz": true
  }
];

