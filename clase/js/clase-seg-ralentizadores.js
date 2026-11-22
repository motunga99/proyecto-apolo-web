// ==========================================
// SEGURIDAD · CAPÍTULO 3: LOS RALENTIZADORES
// ==========================================

export const PASOS_SEG_RALENT = [
  {
    tipo: 'ralent',
    titulo: '¿Qué es un ralentizador?',
    texto: [
      'Un <b>ralentizador</b> (también le dicen <b>retardador</b> o <b>decelerador</b>) es un <b>freno extra</b> que tienen los camiones para bajar la velocidad <b>sin usar las pastillas ni las zapatas</b>.',
      '<b>Lo importante:</b> frena <b>sin rozamiento</b> entre las piezas del freno de servicio. Por eso no se calienta como los frenos normales y <b>evita el fading</b>.',
      '<b>¿Para qué sirve?</b><br>• para <b>usar menos el freno de servicio</b> y que no se canse ni se caliente;<br>• para <b>evitar el fading</b>;<br>• para dar un <b>frenado adicional</b> de los ejes.<br>Si el examen pregunta por sus ventajas, son <b>todas</b>.',
      '<b>¿Sobre qué actúa?</b> Sobre la <b>transmisión</b> (las piezas que llevan la fuerza del motor a las ruedas). Por eso, cuando lo accionás, frena <b>solo las ruedas motrices</b>. Mirá: se iluminan en azul las ruedas de atrás de la tractora.',
      '<b>Hay tres clases:</b> el <b>freno motor</b>, el <b>hidrodinámico</b> (con aceite) y el <b>eléctrico</b> (con imanes).',
      '<b>Trampa del examen:</b> el ABS, el ASR, el BAS, los frenos de disco y de tambor, el freno de estacionamiento y el calderín <b>no</b> son ralentizadores. Y "ralentizador termodinámico" no existe. Tampoco tiene nada que ver con el ralentí del motor.'
    ],
    sim: 'ralentizador',
    vista: 'ruedas',
    alEstado: {
      retiene: e => e.etiqueta('A', 'El ralentizador frena las ruedas MOTRICES, sin rozar', 'ok')
    }
  },
  {
    tipo: 'ralent',
    titulo: 'El freno motor: en el escape y Veb',
    texto: [
      '<b>Freno motor</b> es cuando el propio motor frena el camión. Pasa solo cuando <b>dejás de acelerar</b> con una marcha puesta: el motor retiene. Para que retenga más, se pone una <b>marcha más corta</b>.',
      'Actúa sobre las <b>ruedas motrices</b>, igual que los otros ralentizadores.',
      'Hay <b>dos tipos</b> de freno motor:',
      '<b>1) Freno en el escape:</b> tiene una <b>válvula</b> (una mariposa) que <b>cierra en parte el caño de salida del escape</b>. Los gases no salen, empujan contra los pistones y el motor frena. Su función es <b>evitar el fading</b>, porque así usás menos el freno de servicio. No sirve para contaminar menos ni para ahorrar combustible.',
      '<b>2) Freno motor Veb:</b> actúa directamente sobre las <b>válvulas de escape de los cilindros</b>.',
      '<b>Trampa:</b> retárder e intárder <b>no</b> son freno motor: son hidrodinámicos.'
    ],
    sim: 'ralentizador',
    vista: 'perspectiva',
    alEstado: {
      retiene: e => e.etiqueta('A', 'Freno motor: marcha corta y sin acelerar', 'precio')
    }
  },
  {
    tipo: 'ralent',
    titulo: 'El hidrodinámico: retárder e intárder',
    texto: [
      'El ralentizador <b>hidrodinámico</b> o <b>hidráulico</b> frena con la <b>energía de un aceite</b> que circula adentro. El aceite es espeso y se resiste a moverse: eso frena.',
      '<b>Sus piezas:</b> un <b>rotor</b>, que gira, y un <b>estátor fijo</b>, que no gira. El aceite queda entre los dos. Mirá el dibujo: es como una turbina cortada a la mitad.',
      '<b>Hay dos tipos:</b><br>• <b>retárder:</b> va en la <b>transmisión</b>, a la <b>salida</b> de la caja de cambios;<br>• <b>intárder:</b> va <b>dentro</b> de la caja de cambios.<br><b>Truco:</b> IN-tárder = va IN (adentro) de la caja.',
      'Se usan en <b>vehículos pesados</b>, y rinden más en los camiones de <b>carretera</b> (viajes largos). Sirven para <b>usar menos el freno de servicio</b> y que no se canse.',
      '<b>Cómo se usa:</b> de forma <b>progresiva</b>, nunca de golpe. Se acciona con un mando de puntos y, en algunos camiones, también con el <b>pedal del freno</b>.',
      '<b>Datos del examen:</b> es <b>compatible con el ABS</b>. Hay que <b>cambiarle el aceite</b> cada tanto. Y no tiene nada que ver con el compresor de aire de los frenos.'
    ],
    sim: 'ralentizador',
    vista: 'ruedas',
    figura: { img: 'ralentizador', titulo: 'Ralentizador hidrodinámico', texto: 'Adentro, un ROTOR que gira y un ESTÁTOR fijo. El aceite entre los dos frena.' }
  },
  {
    tipo: 'ralent',
    titulo: 'El ralentizador eléctrico',
    texto: [
      'El <b>ralentizador eléctrico</b> o <b>electromagnético</b> (también le dicen <b>freno eléctrico</b>) frena con <b>imanes</b>: crea un <b>campo magnético</b> con corriente eléctrica.',
      '<b>¿De dónde saca la energía?</b> De la <b>batería</b> del camión. Cuanta <b>más electricidad</b> le da la batería, más frena.',
      '<b>¿Dónde va?</b> En el <b>árbol de transmisión</b> (el eje largo que va de la caja de cambios a las ruedas), a la salida del eje secundario de la caja.',
      '<b>¿Qué hace?</b> Mantiene las <b>vueltas de la transmisión</b> en un régimen fijo, <b>sin que se rocen piezas</b>. Así bajan las vueltas del árbol de transmisión y de las <b>ruedas motrices</b>.',
      '<b>Sirve para</b> evitar el fading y usar menos el freno de servicio.',
      '<b>Ojo:</b> si se abusa, el ralentizador eléctrico <b>también se calienta</b>. Y hoy casi no se usa, porque es muy pesado y levanta mucha temperatura.'
    ],
    sim: 'ralentizador',
    vista: 'ruedas',
    alEstado: {
      retiene: e => e.etiqueta('A', 'Eléctrico: campo magnético con la batería', 'precio')
    }
  },
  {
    tipo: 'ralent',
    titulo: 'Bajar un puerto de montaña',
    texto: [
      'Esta es la regla que más pregunta el examen:',
      '<b>Primero el ralentizador, y después, si hace falta, el freno de servicio.</b>',
      'En una bajada larga se usa <b>preferentemente el ralentizador</b>: el freno eléctrico o el hidrodinámico. Así el freno de servicio queda frío para cuando de verdad lo necesites.',
      'El ralentizador también se puede usar <b>alternando con el freno de servicio</b>, para que este no se canse.',
      'Junto con el ralentizador: <b>marcha corta</b>, y <b>nunca punto muerto</b>.',
      '<b>Compará con el capítulo 2:</b> con solo el freno de servicio, los frenos se ponían rojos (fading). Con el ralentizador, el termómetro de la cabina se queda en verde.'
    ],
    sim: 'ralentizador',
    vista: 'perspectiva',
    alEstado: {
      retiene: e => e.etiqueta('A', '1º ralentizador · 2º freno de servicio (si hace falta)', 'ok')
    }
  },
  {
    tipo: 'ralent',
    titulo: 'Repaso: los ralentizadores',
    texto: [
      '<b>Qué son:</b> frenos extra que frenan sin rozamiento, sobre la transmisión → solo las <b>ruedas motrices</b>. Evitan el fading y que se canse el freno de servicio.',
      '<b>Freno motor:</b> al dejar de acelerar, con marcha corta. Tipos: <b>en el escape</b> (válvula que cierra el caño de escape) y <b>Veb</b> (válvulas de escape de los cilindros).',
      '<b>Hidrodinámico:</b> aceite, rotor y estátor. <b>Retárder</b> a la salida de la caja; <b>intárder</b> dentro de la caja. Progresivo. Compatible con el ABS. Se le cambia el aceite.',
      '<b>Eléctrico:</b> campo magnético con la batería; en el árbol de transmisión; se calienta si se abusa; casi no se usa por pesado.',
      '<b>Bajada:</b> 1º ralentizador, 2º freno de servicio.'
    ],
    sim: 'quieto',
    vista: 'ruedas'
  },
  {
    tipo: 'ralent',
    titulo: 'Preguntas oficiales: los ralentizadores',
    texto: [],
    sim: 'quieto',
    vista: 'perspectiva',
    quiz: true
  }
];
