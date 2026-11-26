// ==========================================
// MERCANCÍAS PELIGROSAS (ADR): los 9 capítulos
// La historia de Damian Motunga. Todo sale de las preguntas oficiales y de la norma vigente.
// ==========================================

export const PASOS_ADR_ADR = [
  {
    "tipo": "adr",
    "titulo": "Damian empieza a llevar gasoil",
    "texto": [
      "<b>Damian Motunga</b> consigue trabajo nuevo: va a manejar un <b>camión cisterna de gasoil</b>. El jefe le dice: \"Esto es <b>mercancía peligrosa</b>. Tenés que cumplir el <b>ADR</b>\".",
      "<b>¿Qué es el ADR?</b> Son las reglas para llevar cosas peligrosas. Las siglas quieren decir: <b>Acuerdo europeo sobre el transporte internacional de mercancías peligrosas por carretera</b>. Es el de la <b>carretera</b>: el tren, el barco y el avión tienen otras normas.",
      "<b>¿Cuándo se cumple?</b> <b>Siempre.</b> Si Damian va de España a Alemania, cumple el ADR. Y si va de Madrid a Toledo, sin salir de España, también.",
      "Las reglas del ADR se actualizan <b>cada dos años</b>.",
      "Para la ley, \"transportar\" no es solo manejar: también es <b>cargar, descargar, pasar la carga a otro medio (por ejemplo a un barco) y las paradas</b> del viaje.",
      "Las mercancías peligrosas pueden traer tres tipos de riesgo: <b>químicos, biológicos (microbios) y radiactivos</b>. Radiactivo = materiales que largan partículas que dañan a las personas.",
      "<b>Mercancía de alto riesgo:</b> la que alguien podría usar para un <b>atentado terrorista</b>. Con esa, el transportista tiene que tener y aplicar un <b>plan de protección</b>."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "intro",
      "titulo": "El ADR",
      "texto": "Las reglas para llevar mercancías peligrosas por carretera."
    }
  },
  {
    "tipo": "adr",
    "titulo": "¿Cuándo no hace falta el ADR?",
    "texto": [
      "Damian pregunta: \"¿Y si un vecino lleva una garrafa de gasolina en el auto?\". Hay casos en que el ADR <b>no se aplica</b> (exenciones):",
      "• Un <b>particular</b> que lleva cosas compradas en una tienda (<b>venta al por menor</b>) para <b>su uso personal</b>. Aunque sean tres bidones de 50 l.<br>• El <b>combustible del depósito</b> que usa el camión para andar, si es de menos de 1.500 l.<br>• Una empresa que lleva cosas <b>para su propio uso</b> en <b>envases de menos de 450 l</b> (con otras condiciones).<br>• Los traslados de emergencia tras un accidente, <b>controlados por las autoridades</b>.",
      "Hay transportes que están <b>exentos solo en parte</b>, en ciertas condiciones. Y el que va con una exención no tiene la restricción general de circulación.",
      "Algo que el ADR no permite solo se puede hacer con <b>autorización excepcional</b> de la Dirección General de Transportes. Si es algo muy nuevo (innovación tecnológica), los permisos se llaman <b>excepcionales</b>.",
      "<b>Residuos:</b> materias que se llevan para <b>tirar o eliminar</b> porque ya no sirven. Sí son ADR: en la carta de porte se pone la palabra <b>\"RESIDUO\"</b> delante del nombre.",
      "<b>Si el viaje sigue en barco o avión:</b> se aceptan las normas de ese medio para marcas, etiquetas y embalaje. La norma del <b>barco</b> se llama código <b>IMDG</b>. La carta de porte puede ser solo la del barco, y si llevás un contenedor al puerto te dan el <b>certificado de arrumazón</b>."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "exento",
      "titulo": "Cuándo no se aplica",
      "texto": "Uso personal, depósito del camión, envases chicos para uso propio, emergencias."
    }
  },
  {
    "tipo": "adr",
    "titulo": "Repaso: el ADR",
    "texto": [
      "<b>ADR</b> = acuerdo europeo para llevar mercancías peligrosas <b>por carretera</b>. Se cumple <b>siempre</b>, también dentro de España. Se actualiza cada 2 años.",
      "Transportar incluye <b>cargar, descargar y las paradas</b>. Riesgos: químicos, biológicos y radiactivos. <b>Alto riesgo</b> = terrorismo: plan de protección.",
      "<b>Sin ADR:</b> particular con compras para uso personal, depósito del camión, envases chicos para uso propio, emergencias. <b>Residuos:</b> sí, con la palabra \"RESIDUO\"."
    ],
    "sim": "quieto",
    "vista": "perspectiva"
  },
  {
    "tipo": "adr",
    "titulo": "Preguntas oficiales: el ADR",
    "texto": [],
    "sim": "quieto",
    "vista": "perspectiva",
    "quiz": true
  }
];

export const PASOS_ADR_CLASES1 = [
  {
    "tipo": "clases1",
    "titulo": "Las 9 clases y sus rombos",
    "texto": [
      "En la carga de Damian hay unos <b>rombos de colores</b> pegados. Se llaman <b>etiquetas de peligro</b>: muestran con un <b>dibujo</b> qué peligro tiene la carga.",
      "Hay <b>9 clases</b> de peligro, del 1 al 9. El número va <b>abajo</b> del rombo. Algunas clases se dividen en partes: por ejemplo 4.1, 4.2 y 4.3.",
      "Vamos a ver las clases de a una, como si Damian las fuera cargando."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "clases",
      "titulo": "Las 9 clases",
      "texto": "Cada peligro tiene su rombo, con dibujo y número."
    }
  },
  {
    "tipo": "clases1",
    "titulo": "Clase 1: explosivos",
    "texto": [
      "<b>Clase 1 = explosivos.</b> Rombo <b>naranja</b> con una explosión y un <b>1</b>.",
      "Tiene divisiones. La <b>1.1</b> es la más peligrosa: <b>explosión en masa</b> (explota todo junto, de golpe). El rombo naranja que tiene escrito <b>1.4</b> es la división 1.4.",
      "Los explosivos <b>no se cargan con otras mercancías peligrosas</b>.",
      "Algo que no es explosivo pero puede formar polvo o vapor explosivo <b>no es clase 1</b>.",
      "El <b>material de pirotecnia</b> (fuegos artificiales) puede tener una autorización especial para circular sin restricciones.",
      "Los camiones para explosivos se llaman <b>EX/II</b> y <b>EX/III</b> (EX de explosivo)."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "clase1",
      "titulo": "Clase 1",
      "texto": "Explosivos: rombo naranja."
    }
  },
  {
    "tipo": "clases1",
    "titulo": "Clase 2: gases",
    "texto": [
      "<b>Clase 2 = gases.</b> Hay tres rombos:<br>• <b>Rojo</b> con llama y un 2 = gas <b>inflamable</b> (se prende).<br>• <b>Verde</b> con una botella = gas <b>no inflamable y no tóxico</b>.<br>• <b>Blanco</b> con calavera = gas <b>tóxico</b>.",
      "Los gases también se marcan con <b>letras</b>:<br>• <b>F</b> = inflamable (se prende)<br>• <b>T</b> = tóxico<br>• <b>A</b> = asfixiante (te quita el aire)<br>• <b>O</b> = comburente (ayuda a que otras cosas ardan)",
      "Si tiene varios peligros, <b>se juntan las letras</b>: tóxico + inflamable = <b>TF</b>; tóxico + corrosivo = <b>TC</b>; tóxico + comburente = <b>TO</b>; tóxico + comburente + corrosivo = <b>TOC</b>; tóxico + inflamable + corrosivo = <b>TFC</b>.",
      "Las botellas a presión de menos de 150 l viajan <b>acostadas</b> (a lo largo o a lo ancho). Un contenedor cisterna para gases tiene que ser de <b>más de 450 l</b>."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "clase2",
      "titulo": "Clase 2",
      "texto": "Gases: rojo inflamable, verde no peligroso, blanco tóxico."
    }
  },
  {
    "tipo": "clases1",
    "titulo": "Clase 3: líquidos que se prenden",
    "texto": [
      "<b>Clase 3 = líquidos inflamables</b>, como la gasolina que lleva Damian. Rombo <b>rojo</b> con llama y un <b>3</b>.",
      "Un líquido es inflamable para el ADR si su <b>punto de inflamación</b> es de <b>menos de 60 °C</b>. Punto de inflamación = la temperatura más baja a la que el vapor del líquido se puede prender con el aire.",
      "Letras de la clase 3: líquido inflamable y tóxico = <b>FT1</b>. La letra <b>D</b> = explosivo desensibilizado (un explosivo \"calmado\" dentro de un líquido).",
      "Si el punto de inflamación está entre 23 y 61 °C, va en grupo de embalaje <b>III</b>.",
      "Si se derrama en un accidente, el peligro es el <b>incendio</b>.",
      "Las cisternas para líquidos y gases inflamables se llaman <b>FL</b>. Llevan <b>toma de tierra</b> (un cable que descarga la electricidad), y antes de cargar inflamables de menos de 60 °C conectarla es <b>obligatorio siempre</b>."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "clase3",
      "titulo": "Clase 3",
      "texto": "Líquidos inflamables: rombo rojo con 3."
    }
  },
  {
    "tipo": "clases1",
    "titulo": "Clase 4: sólidos que se prenden",
    "texto": [
      "La clase 4 tiene tres partes:",
      "• <b>4.1 = sólidos inflamables</b> (rayas rojas y blancas). Se pueden prender por <b>roce, golpe, impurezas</b> o con una cerilla, y largan humo tóxico al arder.",
      "• <b>4.2 = se prenden solos</b> (mitad blanco, mitad rojo): inflamación espontánea. Van en grupo de embalaje <b>I</b>. Grupos: líquida sin otro riesgo = <b>S3</b>; sólida y tóxica = <b>ST4</b>.",
      "• <b>4.3 = con agua largan gas que se prende</b> (rombo <b>azul</b> con llama y un 4). Por eso el contenedor tiene que ser <b>impermeable</b>: que no entre agua."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "clase4",
      "titulo": "Clase 4",
      "texto": "4.1 sólidos, 4.2 se prenden solos, 4.3 con agua."
    }
  },
  {
    "tipo": "clases1",
    "titulo": "Repaso: clases 1 a 4",
    "texto": [
      "<b>1</b> explosivos (naranja; 1.1 explota todo junto). Camiones EX/II y EX/III.",
      "<b>2</b> gases: rojo inflamable, verde no peligroso, blanco tóxico. Letras F, T, A, O que se juntan (TF, TC, TO, TOC, TFC).",
      "<b>3</b> líquidos inflamables (menos de 60 °C). Cisternas FL con toma de tierra.",
      "<b>4.1</b> sólidos inflamables · <b>4.2</b> se prenden solos · <b>4.3</b> con agua largan gas."
    ],
    "sim": "quieto",
    "vista": "perspectiva"
  },
  {
    "tipo": "clases1",
    "titulo": "Preguntas oficiales: clases 1 a 4",
    "texto": [],
    "sim": "quieto",
    "vista": "perspectiva",
    "quiz": true
  }
];

export const PASOS_ADR_CLASES2 = [
  {
    "tipo": "clases2",
    "titulo": "Clase 5: comburentes y peróxidos",
    "texto": [
      "<b>5.1 = comburentes.</b> Rombo <b>amarillo</b> con una bola en llamas. No hace falta que ardan ellos: <b>largan oxígeno y hacen que otras cosas ardan más</b>. Su peligro: <b>aceleran el fuego</b>.",
      "Por eso, para rellenar huecos de la carga <b>nunca se usan comburentes</b>. Sí madera, espuma o bolsas de aire.",
      "Los camiones para la 5.1 se llaman <b>OX</b> (de oxidante).",
      "<b>5.2 = peróxidos orgánicos.</b> Se dividen en dos grupos: <b>P1 y P2</b>.",
      "Con las clases <b>4.1 y 5.2</b> tiene que haber <b>refrigeración de emergencia</b>, y el frío tiene que <b>funcionar aunque el motor esté apagado</b>."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "clase5",
      "titulo": "Clase 5",
      "texto": "5.1 comburentes (amarillo), 5.2 peróxidos."
    }
  },
  {
    "tipo": "clases2",
    "titulo": "Clase 6: tóxicos e infecciosos",
    "texto": [
      "<b>6.1 = tóxicos</b> (venenos). Rombo blanco con <b>calavera</b>. Hacen daño al <b>tragarlos, respirarlos o tocarlos</b>.",
      "Los <b>plaguicidas</b> (venenos para bichos) son tóxicos. Plaguicidas sólidos = grupo <b>T7</b>. Líquido tóxico que con agua larga gas inflamable = <b>TW1</b>.",
      "Las tóxicas <b>no se cargan dentro de un pueblo o ciudad</b> sin autorización.",
      "<b>6.2 = infecciosos</b>: llevan microbios que contagian enfermedades a personas o animales. Se dividen en cuatro grupos: <b>I1, I2, I3 e I4</b>.",
      "La materia infecciosa ONU 2814 en un contenedor con toldo solo se puede llevar si <b>no se llena al máximo</b>, para que no toque el toldo."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "clase6",
      "titulo": "Clase 6",
      "texto": "6.1 tóxicos (calavera), 6.2 infecciosos."
    }
  },
  {
    "tipo": "clases2",
    "titulo": "Clases 7, 8 y 9",
    "texto": [
      "<b>7 = radiactivos.</b> Largan partículas que dañan a las personas.",
      "<b>8 = corrosivos.</b> <b>Queman la piel</b> por reacción química (como un ácido). Con la <b>humedad</b> pueden largar vapores corrosivos, y al arder largan humo <b>tóxico e irritante</b>. El que se calienta solo = grupo <b>CS</b>.",
      "<b>9 = peligrosos diversos:</b> los que no entran en otra clase. Por ejemplo, los que contaminan el medio ambiente. El que contamina el agua, líquido = grupo <b>M6</b>."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "clase789",
      "titulo": "Clases 7, 8 y 9",
      "texto": "Radiactivos, corrosivos y diversos."
    }
  },
  {
    "tipo": "clases2",
    "titulo": "Los grupos de embalaje",
    "texto": [
      "Según qué tan peligrosa es la mercancía, el envase tiene que ser más o menos fuerte. Eso es el <b>grupo de embalaje</b>:",
      "• <b>Grupo I</b> = para las mercancías <b>muy peligrosas</b> (por ejemplo, líquidos muy tóxicos).<br>• <b>Grupo II</b> = peligro medio.<br>• <b>Grupo III</b> = para las de <b>menos peligro</b>.",
      "Truco: <b>el I es el primero y el más fuerte</b>."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "embalaje",
      "titulo": "Grupos de embalaje",
      "texto": "I muy peligrosas · III menos peligro."
    }
  },
  {
    "tipo": "clases2",
    "titulo": "Repaso: clases 5 a 9",
    "texto": [
      "<b>5.1</b> comburentes (aceleran el fuego, camión OX) · <b>5.2</b> peróxidos (P1, P2; frío de emergencia).",
      "<b>6.1</b> tóxicos (plaguicidas; no se cargan en la ciudad) · <b>6.2</b> infecciosos (I1 a I4).",
      "<b>7</b> radiactivos · <b>8</b> corrosivos (piel) · <b>9</b> diversos (medio ambiente).",
      "Embalaje <b>I</b> = muy peligrosas · <b>III</b> = menos peligro."
    ],
    "sim": "quieto",
    "vista": "perspectiva"
  },
  {
    "tipo": "clases2",
    "titulo": "Preguntas oficiales: clases 5 a 9",
    "texto": [],
    "sim": "quieto",
    "vista": "perspectiva",
    "quiz": true
  }
];

export const PASOS_ADR_PANEL = [
  {
    "tipo": "panel",
    "titulo": "El panel naranja",
    "texto": [
      "En la cisterna de Damian hay dos carteles <b>naranjas con borde negro</b>. Son los <b>paneles naranja</b>: dicen que ese camión <b>lleva mercancías peligrosas</b>.",
      "Miden <b>40 cm de ancho y 30 cm de alto</b>, y brillan con la luz (retrorreflectantes).",
      "Van <b>uno adelante y otro atrás</b>. Si lleva una sola mercancía, la cisterna y el camión caja llevan <b>el mismo número de paneles</b>."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "panel1",
      "titulo": "El panel naranja",
      "texto": "Naranja con borde negro, 40 × 30, adelante y atrás."
    }
  },
  {
    "tipo": "panel",
    "titulo": "Los dos números del panel",
    "texto": [
      "A veces el panel tiene <b>dos números</b>, uno arriba y otro abajo:",
      "• <b>Arriba: el número de peligro</b>, con <b>al menos dos cifras</b>. Dice qué peligro tiene.<br>• <b>Abajo: el número ONU</b>. Dice <b>exactamente qué mercancía es</b> (por ejemplo, 1203 = gasolina).",
      "<b>¿Cuándo lleva números?</b> No siempre: en las <b>cisternas</b> y en la carga <b>a granel</b> (suelta). Por ejemplo, un camión caja con mercancía a granel lleva los dos números."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "panel2",
      "titulo": "Los números",
      "texto": "Arriba el peligro, abajo el número ONU."
    }
  },
  {
    "tipo": "panel",
    "titulo": "Qué quiere decir cada cifra",
    "texto": [
      "Las cifras del número de peligro (el de arriba) quieren decir:",
      "• <b>2</b> gas que sale por presión o reacción · <b>3</b> líquido o gas que se prende · <b>4</b> sólido que se prende · <b>5</b> comburente<br>• <b>6</b> tóxico o infeccioso · <b>7</b> radiactivo · <b>8</b> corrosivo · <b>9</b> reacción violenta espontánea",
      "• Si una sola cifra alcanza, se completa con un <b>0</b> (30).<br>• Una cifra <b>repetida</b> = ese peligro es <b>más fuerte</b> (33 = muy inflamable).<br>• Una <b>X</b> delante = <b>reacciona peligrosamente con el agua</b>.",
      "Los que más salen: <b>22</b> = gas licuado refrigerado, asfixiante · <b>23</b> = gas inflamable · <b>90</b> = medio ambiente · <b>606</b> = materia infecciosa."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "panel3",
      "titulo": "Las cifras",
      "texto": "2 gas · 3 se prende · 5 comburente · 6 tóxico · 8 corrosivo…"
    }
  },
  {
    "tipo": "panel",
    "titulo": "Cisternas con compartimentos y vacías",
    "texto": [
      "Una cisterna puede estar dividida en <b>compartimentos</b>, con una mercancía distinta en cada uno. Entonces lleva un panel <b>en los costados de cada compartimento</b>, más el de adelante y el de atrás. Con 4 compartimentos: <b>1 adelante, 1 atrás y 4 por cada lado</b>.",
      "<b>Cisterna vacía pero sin limpiar:</b> sigue llevando paneles, <b>siempre</b>. Adentro quedan restos peligrosos.",
      "<b>Cisterna limpia</b>, o camión sin mercancía peligrosa: los paneles se <b>sacan o se tapan por completo</b>."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "panel4",
      "titulo": "Compartimentos",
      "texto": "Un panel por compartimento. Vacía sin limpiar: siguen."
    }
  },
  {
    "tipo": "panel",
    "titulo": "Repaso: el panel naranja",
    "texto": [
      "Naranja con borde negro, <b>40 × 30 cm</b>, <b>adelante y atrás</b>.",
      "<b>Arriba</b> el peligro (mínimo 2 cifras) · <b>abajo</b> el número ONU (qué mercancía es). Números en cisternas y a granel.",
      "Cifra repetida = más fuerte · 0 completa · <b>X = agua</b>.",
      "Vacía sin limpiar: <b>con paneles</b>. Limpia: <b>tapados</b>."
    ],
    "sim": "quieto",
    "vista": "perspectiva"
  },
  {
    "tipo": "panel",
    "titulo": "Preguntas oficiales: el panel naranja",
    "texto": [],
    "sim": "quieto",
    "vista": "perspectiva",
    "quiz": true
  }
];

export const PASOS_ADR_ETIQ = [
  {
    "tipo": "etiq",
    "titulo": "Las etiquetas en los bultos",
    "texto": [
      "Cada bulto (caja, bidón) lleva sus rombos: <b>una etiqueta por cada peligro</b>. Se pone el peligro <b>principal</b> y el <b>secundario</b> que diga el ADR. Dos etiquetas iguales no se repiten: eso es un error.",
      "Cada bulto lleva el número ONU con las letras <b>UN</b> delante (por ejemplo, UN 1203).",
      "<b>¿Se pueden cargar juntas mercancías peligrosas distintas?</b> Solo si el <b>ADR lo autoriza</b> expresamente, o si las etiquetas son iguales. Si van en <b>contenedores cerrados</b> de paredes macizas, no se aplica esa prohibición."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "etiq1",
      "titulo": "Etiquetas en bultos",
      "texto": "Una por cada peligro, y UN + número."
    }
  },
  {
    "tipo": "etiq",
    "titulo": "Dónde van las placas-etiqueta",
    "texto": [
      "En cisternas, granel y contenedores, los rombos son grandes y se llaman <b>placas-etiqueta</b>.",
      "• <b>Cisterna y granel:</b> tres, <b>dos a los costados y una atrás</b>.<br>• <b>Contenedor y cisterna portátil:</b> en los <b>dos costados y en cada extremo</b>. Si no se ven desde afuera, se ponen en el camión, atrás y a los costados.<br>• Con <b>compartimentos</b>: en los costados de cada compartimento y en los extremos.",
      "<b>Vacía sin limpiar:</b> lleva <b>las mismas</b> etiquetas que cuando iba llena."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "etiq2",
      "titulo": "Placas-etiqueta",
      "texto": "Cisterna: 2 costados + atrás. Contenedor: 2 costados + extremos."
    }
  },
  {
    "tipo": "etiq",
    "titulo": "Los envases",
    "texto": [
      "Damian aprende los nombres de los envases:",
      "• <b>Bidón:</b> envase redondo (cilíndrico).<br>• <b>Jerricán:</b> de metal o plástico, cuadrado o de varias caras, con uno o varios agujeros.<br>• <b>Saco:</b> blando, de papel, plástico o tela.",
      "• <b>Sobreembalaje:</b> envoltorio que junta varios bultos para manejarlos mejor. Lleva el UN + número y las etiquetas de lo que tiene adentro.<br>• <b>Embalaje de socorro:</b> donde se meten los bultos rotos o que pierden.<br>• <b>Cantidades limitadas:</b> se marcan con un rombo con franjas <b>negras arriba y abajo</b> y blanco en el medio.",
      "Los bultos van <b>sin restos por fuera</b>, sin pérdidas y <b>atados para que no se muevan</b>. Ni Damian ni nadie de la tripulación puede <b>abrir</b> un bulto."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "envases",
      "titulo": "Envases",
      "texto": "Bidón redondo, jerricán cuadrado, saco blando."
    }
  },
  {
    "tipo": "etiq",
    "titulo": "Repaso: las etiquetas",
    "texto": [
      "Bultos: <b>una etiqueta por peligro</b> (principal + secundario), sin repetir, y <b>UN + número</b>.",
      "Cisterna y granel: <b>2 costados + atrás</b>. Contenedor: <b>2 costados + cada extremo</b>. Vacía sin limpiar: las mismas.",
      "Bidón redondo · jerricán cuadrado · saco blando · sobreembalaje junta bultos · embalaje de socorro para los rotos."
    ],
    "sim": "quieto",
    "vista": "perspectiva"
  },
  {
    "tipo": "etiq",
    "titulo": "Preguntas oficiales: las etiquetas",
    "texto": [],
    "sim": "quieto",
    "vista": "perspectiva",
    "quiz": true
  }
];

export const PASOS_ADR_PAPELES = [
  {
    "tipo": "papeles",
    "titulo": "Los papeles a bordo",
    "texto": [
      "Antes de salir, Damian revisa la carpeta. Tienen que ir <b>a bordo</b>:",
      "• <b>Carta de porte:</b> dice qué mercancía es (<b>UN + número ONU</b>), <b>cuánta</b> y quién la manda (<b>expedidor</b>, con nombre y dirección). No hace falta que diga que va en cisterna.<br>• Cisterna vacía: la carta de porte dice <b>\"vehículo cisterna vacío\"</b> y los datos de la <b>última mercancía</b>.",
      "• <b>Instrucciones escritas:</b> qué hacer en una <b>emergencia</b>. Van en la <b>cabina</b>, en un idioma que la <b>tripulación pueda leer y entender</b> (como mínimo, el del conductor).",
      "• Un <b>documento con foto</b> (DNI) de cada persona del camión.<br>• El <b>certificado de aprobación</b>, cuando el ADR lo pide.",
      "No alcanza con llevarlos: Damian revisa que estén <b>vigentes</b>. La <b>póliza del seguro</b> no es obligatorio llevarla."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "papeles",
      "titulo": "Los papeles",
      "texto": "Carta de porte, instrucciones escritas, DNI y certificado."
    }
  },
  {
    "tipo": "papeles",
    "titulo": "El certificado del camión",
    "texto": [
      "El <b>certificado de aprobación ADR</b> dice que el <b>vehículo</b> cumple el ADR. Lo da la <b>autoridad competente</b>. Tiene la <b>matrícula, el chasis, el dueño, las materias que puede llevar y la validez</b>.",
      "Lo necesitan las <b>cisternas de más de 1.000 l</b> (cisterna fija = depósito de más de 1.000 l, pegado al chasis), y los camiones con contenedores cisterna de <b>más de 3.000 l</b>. Una cisterna solo carga las materias para las que <b>está autorizada</b>.",
      "Las cisternas de más de 1.000 l pasan <b>revisión todos los años</b>. Cada <b>3 años</b> se prueba que no pierda. La primera vez se revisa que sea igual al prototipo aprobado.",
      "La placa de la cisterna dice el <b>número de aprobación y el año</b>; y su panel, el <b>dueño, el peso vacío y el peso máximo</b>. Cargada, aguanta <b>dos veces su peso</b> hacia adelante, y los <b>rompeolas</b> tapan al menos el <b>70%</b>.",
      "Para el ADR, el <b>contenedor</b> es un elemento de transporte: permanente, fácil de llenar y vaciar, y hecho para llevar la carga sin descargarla en el medio. Lleva el nombre del dueño y del usuario."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "certificado",
      "titulo": "El certificado",
      "texto": "Dice que el camión cumple el ADR. Cisternas de más de 1.000 l."
    }
  },
  {
    "tipo": "papeles",
    "titulo": "Damian y su autorización",
    "texto": [
      "Damian también necesita su papel: la <b>autorización especial ADR del conductor</b>. Se la da la <b>DGT</b> y dura <b>cinco años</b>.",
      "Para mercancías que no son explosivos ni radiactivos alcanza con la <b>básica</b>, aunque el camión sea chico (3 t).",
      "<b>Sin esa autorización no se puede ni empezar a cargar.</b> Al cargador se le muestra la autorización y, si hace falta, el certificado del camión. En un camión <b>furgón</b> (caja), el cargador no tiene que pedir esos papeles.",
      "<b>Alcohol:</b> con mercancías peligrosas, máximo <b>0,3 gramos por litro en sangre</b> o <b>0,15 mg por litro</b> en el soplido.",
      "El curso ADR <b>cuenta para el CAP</b>: en el inicial, si lo hiciste en los <b>12 meses anteriores</b>."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "conductor",
      "titulo": "La autorización",
      "texto": "DGT, 5 años. Alcohol: 0,3 g/l en sangre."
    }
  },
  {
    "tipo": "papeles",
    "titulo": "El equipo del camión",
    "texto": [
      "En el camión de Damian tiene que haber:",
      "• Para <b>cada persona</b>: una <b>linterna</b> y un <b>chaleco fluorescente</b>.<br>• <b>Protección para los ojos</b>.<br>• Un <b>calzo</b> del tamaño justo para el peso y la rueda.<br>• <b>Dos señales autoportantes</b> que no dependan de la electricidad del camión (por ejemplo, <b>conos</b>).",
      "<b>Extintores:</b> siempre, al menos uno. Camión de 2,5 t: 4 kg de polvo. De 5 t o 10 t: mínimo <b>2 extintores</b>. De 6,5 t: 8 kg de polvo en total. Se revisan (retimbrado) <b>cada 5 años</b>."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "equipo",
      "titulo": "El equipo",
      "texto": "Linterna y chaleco por persona, calzo, gafas, conos, extintores."
    }
  },
  {
    "tipo": "papeles",
    "titulo": "Repaso: papeles y equipo",
    "texto": [
      "A bordo: <b>carta de porte</b>, <b>instrucciones escritas</b> (cabina, tu idioma), <b>DNI con foto</b> y <b>certificado</b> si hace falta. Todo vigente.",
      "<b>Certificado de aprobación</b>: el camión cumple el ADR. Cisternas de más de 1.000 l, revisión anual.",
      "<b>Autorización del conductor</b>: DGT, 5 años. Alcohol: 0,3 g/l sangre / 0,15 mg/l aire.",
      "<b>Equipo:</b> linterna y chaleco por persona, calzo, gafas, 2 señales autoportantes, extintores."
    ],
    "sim": "quieto",
    "vista": "perspectiva"
  },
  {
    "tipo": "papeles",
    "titulo": "Preguntas oficiales: papeles y equipo",
    "texto": [],
    "sim": "quieto",
    "vista": "perspectiva",
    "quiz": true
  }
];

export const PASOS_ADR_QUIEN = [
  {
    "tipo": "quien",
    "titulo": "Quién hace qué",
    "texto": [
      "En el viaje de Damian participan varias personas, y cada una tiene su tarea:",
      "• <b>Expedidor:</b> por cuya cuenta se hace el transporte (el dueño del envío). <b>Prepara</b> el transporte, <b>elige y marca los envases</b>, da la información a todos y le dice al cargador el <b>grado de llenado</b> de la cisterna.",
      "• <b>Cargador:</b> el responsable de la <b>carga</b>. No empieza si el camión no tiene <b>calzo</b>, y no lo deja salir hasta ver que <b>no hay fugas</b>.",
      "• <b>Transportista:</b> el que asume hacer el transporte. <b>Elige el camión y el conductor</b>, pone los <b>paneles</b>, revisa las <b>etiquetas</b>, pone los <b>papeles</b> y el <b>equipo</b>. Durante el viaje es el responsable administrativo.",
      "• <b>Destinatario:</b> acepta la mercancía y revisa que después de descargar se cumpla la norma. El <b>descargador</b> hace la carta de porte en vacío.",
      "• <b>Damian, el conductor:</b> se informa de la materia, <b>lee la carta de porte y las instrucciones antes de cargar</b>, se asegura de que estén a bordo (si no se las dieron, <b>las pide</b>), revisa la cisterna al terminar de cargar y le dice al cargador cuál fue la <b>última mercancía</b>.",
      "Si no le avisaron que la mercancía era peligrosa, el transportista puede <b>negarse a seguir y descargarla, o devolverla</b>."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "quien",
      "titulo": "Quién hace qué",
      "texto": "Expedidor, cargador, transportista, destinatario y conductor."
    }
  },
  {
    "tipo": "quien",
    "titulo": "Al cargar la cisterna",
    "texto": [
      "Durante la carga, el camión tiene que estar <b>bien inmovilizado</b>, y al estacionar, siempre con el <b>freno de estacionamiento</b>.",
      "Lo que quedó adentro de la cisterna tiene que ser <b>compatible</b> con lo nuevo. Si no, se <b>limpia antes</b>. Si carga lo mismo o algo compatible, no hace falta certificado de lavado.",
      "A una cisterna sin limpiar <b>no se entra nunca</b>. Y por fuera no puede quedar <b>ningún resto</b>.",
      "En cisterna se llevan solo las materias que el <b>ADR dice</b> (pueden ser líquidas, en polvo o en granitos). Si dos materias reaccionan entre sí, no van en compartimentos pegados, salvo con tabique grueso o un espacio vacío en el medio.",
      "Comida en una cisterna que llevó mercancías peligrosas: solo con <b>medidas para cuidar la salud</b>.",
      "Con mercancías peligrosas se lleva <b>un solo remolque</b>. El líquido que se mueve adentro produce el <b>efecto ola</b> y afecta el control del camión. Si se pasa la temperatura máxima, puede hacer falta un procedimiento de emergencia."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "carga",
      "titulo": "La carga",
      "texto": "Inmovilizado, compatible, sin restos, un solo remolque."
    }
  },
  {
    "tipo": "quien",
    "titulo": "Repaso: quién hace qué",
    "texto": [
      "<b>Expedidor</b> prepara y elige envases · <b>cargador</b> responde de la carga (calzo, fugas) · <b>transportista</b> elige camión y conductor, paneles, papeles y equipo.",
      "<b>Conductor</b>: lee los papeles antes de cargar, los pide si faltan, revisa la cisterna.",
      "Carga: inmovilizado, residuo compatible, nunca entrar sin limpiar, <b>un solo remolque</b>, efecto ola."
    ],
    "sim": "quieto",
    "vista": "perspectiva"
  },
  {
    "tipo": "quien",
    "titulo": "Preguntas oficiales: quién hace qué",
    "texto": [],
    "sim": "quieto",
    "vista": "perspectiva",
    "quiz": true
  }
];

export const PASOS_ADR_RUTA = [
  {
    "tipo": "ruta",
    "titulo": "La RIMP: los caminos permitidos",
    "texto": [
      "Damian no puede ir por cualquier camino. Tiene que usar la <b>RIMP</b>: la <b>Red de Itinerarios para Mercancías Peligrosas</b>.",
      "Si coinciden con su ruta, tiene que usar <b>autopistas o autovías</b>. Entra a la RIMP por la entrada <b>más cercana a la base</b> de la empresa.",
      "Puede salir de la RIMP para <b>cargar o descargar, reparar, descansar, ir a su casa, lavar la cisterna o ir a un aparcamiento habilitado</b>. Si tiene que usar otra vía, lo <b>avisa al Centro de Gestión de Tráfico</b>.",
      "No necesitan la RIMP el <b>gas de uso doméstico</b> para repartir a las casas y los <b>combustibles para puertos y aeropuertos</b>. Con autorización especial pueden salir los productos de <b>centros sanitarios</b>."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "rimp",
      "titulo": "La RIMP",
      "texto": "Red de caminos para mercancías peligrosas: autopistas y autovías."
    }
  },
  {
    "tipo": "ruta",
    "titulo": "Entrar a una ciudad",
    "texto": [
      "A un pueblo o ciudad, Damian entra <b>solo para cargar o descargar</b>. Por ser un camión chico o llevar algo \"poco peligroso\", no.",
      "Entra por el <b>acceso más cercano</b> al lugar de entrega.",
      "Si no tiene que entrar, <b>la rodea</b> por las variantes o la circunvalación <b>más de afuera</b>."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "ciudad",
      "titulo": "La ciudad",
      "texto": "Solo para cargar o descargar. Si no, rodearla por afuera."
    }
  },
  {
    "tipo": "ruta",
    "titulo": "Velocidad, días y controles",
    "texto": [
      "Con mercancías peligrosas, Damian va como máximo a <b>40 km/h en ciudad y travesías</b>, y a <b>80 km/h en autopista y autovía</b>.",
      "<b>Domingos y festivos</b> hay restricciones. Puede circular solo si está dentro de las <b>excepciones</b> o con permiso. No tienen restricciones, por ejemplo: combustible para <b>gasolineras</b>, <b>gas para casas</b>, <b>gasóleo de calefacción</b>, gases para <b>hospitales</b> o para enfermos en casa.",
      "Los permisos para pasar por tramos con restricciones se llaman <b>especiales</b>.",
      "En un control, llevar más de un remolque o etiquetas mal puestas es categoría de riesgo <b>II</b>. La copia de la lista de control se le da al <b>conductor</b>."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "velocidad",
      "titulo": "Velocidad",
      "texto": "40 en ciudad, 80 en autopista. Domingos: solo con excepción."
    }
  },
  {
    "tipo": "ruta",
    "titulo": "Repaso: en la ruta",
    "texto": [
      "<b>RIMP</b>: autopistas y autovías si coinciden. Se sale para cargar, descargar, reparar, descansar o ir a casa.",
      "Ciudad: <b>solo para cargar o descargar</b>, por el acceso más cercano. Si no, la circunvalación <b>más de afuera</b>.",
      "<b>40 km/h</b> en ciudad · <b>80 km/h</b> en autopista. Domingos: solo con excepción o permiso."
    ],
    "sim": "quieto",
    "vista": "perspectiva"
  },
  {
    "tipo": "ruta",
    "titulo": "Preguntas oficiales: en la ruta",
    "texto": [],
    "sim": "quieto",
    "vista": "perspectiva",
    "quiz": true
  }
];

export const PASOS_ADR_ACC = [
  {
    "tipo": "acc",
    "titulo": "Si pasa algo en el camino",
    "texto": [
      "Damian tiene una avería y pierde un poco de líquido. ¿Qué hace?",
      "<b>1. Lo primero:</b> mirar qué dicen las <b>instrucciones escritas</b> y hacerlo.",
      "<b>2. Avisar:</b> pone la <b>baliza V-16</b> en el techo, se pone el <b>chaleco</b>, coloca las <b>señales autoportantes</b> si hace falta y <b>llama a emergencias</b>. Al avisar dice dónde está, qué lleva y cómo está el tiempo (el DNI no hace falta).",
      "<b>3. Lo que NO se hace:</b> <b>fumar</b>, hacer chispas, prender aparatos eléctricos, <b>pisar lo derramado</b> o respirar los gases. Y la tripulación <b>no apaga los incendios de la carga</b>: eso es para los bomberos.",
      "<b>4. Protegerse:</b> antes de acercarse a una fuga, se pone el <b>equipo de protección</b>. Hay que evitar que lo derramado llegue al agua o a las alcantarillas.",
      "Se evacúa el camión si hay <b>fuego, derrame o cables caídos</b>. Por una tormenta, no."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "accidente",
      "titulo": "Si pasa algo",
      "texto": "Instrucciones escritas, baliza V-16, chaleco, no fumar."
    }
  },
  {
    "tipo": "acc",
    "titulo": "El triángulo del fuego",
    "texto": [
      "Para que haya fuego hacen falta <b>tres cosas juntas</b>: <b>combustible</b> (lo que arde), <b>comburente</b> (el oxígeno del aire) y <b>calor</b>. Eso es el <b>triángulo del fuego</b>.",
      "Si se suma la <b>reacción en cadena</b>, son cuatro: el <b>tetraedro del fuego</b>.",
      "Arder es una reacción que <b>da calor</b> entre un combustible y un <b>comburente u oxidante</b>, casi siempre el <b>oxígeno</b>. En un fuego del camión, el comburente es el oxígeno del aire. Un freno recalentado que prende la rueda es la <b>fuente de calor</b>.",
      "<b>Clases de fuego:</b> <b>A</b> = sólidos (madera, cartón) · <b>B</b> = líquidos que se prenden (gasolina) · <b>C</b> = gases. En un autobús, el fuego menos frecuente es el de gases."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "fuego",
      "titulo": "El fuego",
      "texto": "Combustible + comburente + calor. A sólidos, B líquidos, C gases."
    }
  },
  {
    "tipo": "acc",
    "titulo": "Cuidarse al trabajar",
    "texto": [
      "Limpiar cisternas sin cuidado (sobre todo las que llevaron mercancías peligrosas) causa <b>lesiones en los ojos y en la piel</b>.",
      "Las <b>malas posturas</b> al trabajar causan <b>hernias de disco</b>.",
      "Los riesgos del trabajo son los <b>accidentes de tráfico</b>, los de <b>mercancías peligrosas</b> y los de <b>carga y descarga</b>. Además de manejar, hay que tener mucho cuidado al <b>cargar y descargar</b>."
    ],
    "sim": "quieto",
    "vista": "perspectiva",
    "figura": {
      "anim": "salud",
      "titulo": "Cuidarse",
      "texto": "Ojos y piel al limpiar cisternas. Posturas: hernias."
    }
  },
  {
    "tipo": "acc",
    "titulo": "Repaso: si pasa algo",
    "texto": [
      "Primero: <b>instrucciones escritas</b>. Baliza V-16, chaleco, avisar. No fumar, no pisar lo derramado, la carga no la apagás vos.",
      "Fuego = <b>combustible + comburente + calor</b> (+ reacción en cadena = tetraedro). <b>A</b> sólidos · <b>B</b> líquidos · <b>C</b> gases.",
      "Limpiar cisternas: ojos y piel. Malas posturas: hernias."
    ],
    "sim": "quieto",
    "vista": "perspectiva"
  },
  {
    "tipo": "acc",
    "titulo": "Preguntas oficiales: si pasa algo",
    "texto": [],
    "sim": "quieto",
    "vista": "perspectiva",
    "quiz": true
  }
];

