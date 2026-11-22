// ==========================================
// SEGURIDAD · CAPÍTULO 1: SEGURIDAD ACTIVA Y PASIVA
// ==========================================

export const PASOS_SEG_ACTIVA = [
  {
    tipo: 'activa',
    titulo: 'Dos clases de seguridad',
    texto: [
      'Todo lo que tiene el camión para cuidarte se divide en <b>dos grupos</b>, según <b>cuándo</b> te ayuda:',
      '<b>Seguridad ACTIVA = evita el accidente.</b> Trabaja <b>antes</b> de que pase: te ayuda a frenar, a doblar, a ver y a no perder el control. Mirá el camión: frena y esquiva el auto parado. No hubo choque.',
      '<b>Seguridad PASIVA = baja el daño cuando el choque ya pasó.</b> No evita el golpe: protege a las <b>personas</b> durante y después del accidente. Por ejemplo, el cinturón y el airbag.',
      '<b>Truco:</b> ACTIVA = actúa para que no choques. PASIVA = se queda "quieta" esperando el golpe, y cuando llega, te protege.',
      '<b>Otros nombres que usa el examen:</b> a la activa también se la llama <b>seguridad primaria</b>, porque es la primera barrera. A la pasiva, <b>seguridad secundaria</b>. Los nombres "dinámica" o "estática" son trampa.',
      '<b>¿Son obligatorias?</b> Sí: todos los vehículos tienen que tener elementos de seguridad <b>activa y también pasiva</b>.'
    ],
    sim: 'esquiva',
    vista: 'perspectiva',
    alEstado: {
      esquiva: e => e.etiqueta('A', 'Seguridad ACTIVA: frena y esquiva, no hay choque', 'ok')
    }
  },
  {
    tipo: 'activa',
    titulo: '¿Qué cosas son de seguridad activa?',
    texto: [
      'Son las piezas que te ayudan a <b>no tener el accidente</b>:',
      '• <b>los frenos</b> y <b>las ruedas</b>, que son <b>los más importantes</b>;<br>• <b>la dirección</b>, para poder esquivar;<br>• <b>la suspensión</b>, que mantiene el camión estable y las ruedas pegadas al piso;<br>• <b>las luces</b> (el alumbrado), para ver y que te vean.',
      'También los <b>sistemas electrónicos</b> que vas a ver en este tema: el <b>ABS</b>, el <b>ESP</b>, el <b>ASR</b>, el <b>EBS</b> y el <b>BAS</b>. Todos son de <b>seguridad activa</b>.',
      '<b>Algunos necesitan que el conductor haga algo:</b> por ejemplo, los frenos solo frenan si pisás el pedal. En cambio, los de seguridad pasiva actúan <b>solos</b>.',
      '<b>Trampa del examen:</b> te ponen "el ABS no es elemento de seguridad porque no es obligatorio". Es falso: el ABS es de seguridad <b>activa</b>.'
    ],
    sim: 'esquiva',
    vista: 'ruedas',
    alEstado: {
      esquiva: e => e.etiqueta('A', 'Frenos + ruedas + dirección = no choca', 'ok')
    }
  },
  {
    tipo: 'activa',
    titulo: 'La seguridad pasiva: cuando el golpe ya pasó',
    texto: [
      'Ahora el camión <b>no llega a frenar</b> y choca. Acá ya no hay nada que evitar: lo que importa es que las personas salgan lo menos lastimadas posible.',
      '<b>Los elementos de seguridad pasiva más comunes son tres:</b> el <b>cinturón de seguridad</b>, el <b>airbag</b> y el <b>reposacabezas</b>.',
      '<b>¿Cuándo actúan?</b> <b>Durante y después</b> del accidente. Y actúan <b>solos</b>, automáticamente, cuando pasa el golpe que los pone en marcha. No hace falta que el conductor los active.',
      '<b>¿Para qué sirven?</b> Para <b>disminuir los daños a las personas</b> en un accidente. No para cuidar el camión.',
      '<b>Trampa:</b> el ABS, el freno motor, los espejos o las ruedas <b>no</b> son de seguridad pasiva.'
    ],
    sim: 'choque',
    vista: 'perspectiva',
    figura: { img: 'asiento', titulo: 'Seguridad pasiva', texto: 'Cinturón, airbag y reposacabezas: te protegen cuando el choque ya pasó.' },
    alEstado: {
      choque: e => e.etiqueta('A', 'Seguridad PASIVA: cinturón, airbag y reposacabezas', 'deuda')
    }
  },
  {
    tipo: 'activa',
    titulo: 'El cinturón de seguridad',
    texto: [
      'El cinturón es de seguridad <b>pasiva</b>. Lo tenés que llevar <b>siempre</b>: en ciudad y en ruta, o sea en vías <b>urbanas e interurbanas</b>.',
      '<b>Cómo va puesto:</b><br>• la parte de <b>arriba</b> cruza por el <b>hombro</b>, nunca por el cuello;<br>• la parte de <b>abajo</b> va por la <b>pelvis</b> (los huesos de la cadera), no por la panza;<br>• <b>ajustado al cuerpo, sin holgura</b>: ni apretado ni flojo, y bien abrochado.',
      '<b>Nunca le pongas pinzas</b> ni reguladores para aflojarlo: le sacan eficacia.<br><b>Si queda flojo</b>, en un choque el cuerpo se puede deslizar por debajo del cinturón.<br><b>La altura del cinturón se regula:</b> si está mal regulada, o mal puesto, en un accidente puede lastimar mucho.',
      '<b>Sin cinturón</b>, en un choque de frente salís <b>proyectado hacia adelante</b>, casi a la misma velocidad que iba el vehículo. Y en un vuelco quedás a merced de los movimientos del vehículo.',
      '<b>Con cinturón</b>, en un choque de frente el cuerpo se va <b>hacia arriba</b>, la cabeza se va hacia adelante, y la columna absorbe la mayor parte del golpe.'
    ],
    sim: 'choque',
    vista: 'costado',
    figura: { img: 'asiento', titulo: 'Cinturón bien puesto', texto: 'Por el hombro y por la pelvis, ajustado al cuerpo, sin holgura y sin pinzas.' },
    alEstado: {
      choque: e => e.etiqueta('A', 'Sin cinturón: salís proyectado hacia ADELANTE', 'aviso')
    }
  },
  {
    tipo: 'activa',
    titulo: 'El airbag y el reposacabezas',
    texto: [
      '<b>El airbag</b> es de seguridad <b>pasiva</b>. Es un almohadón que se infla en un golpe fuerte para <b>frenar tu cuerpo lo más suave posible</b>.',
      '<b>Tiene tres partes:</b> un <b>cojín inflable</b>, un <b>detector de impacto</b> y un <b>sistema de inflado</b>. El gas que lo infla es <b>nitrógeno</b>.',
      '<b>Funciona bien solo con el cinturón abrochado</b>, siempre. Se calcula que baja el riesgo de muerte en <b>más de un 30%</b>.',
      '<b>Si ayudás en un accidente</b> y hay un airbag que no saltó, no te apoyes sobre él, no pongas nada delante y <b>no toques la columna de la dirección</b>: puede saltar de golpe.',
      '<b>El reposacabezas</b> también es de seguridad <b>pasiva</b>. Sirve para bajar las <b>lesiones del cuello y de las vértebras</b> cuando la cabeza se va para atrás de golpe, por ejemplo cuando te chocan de atrás. El asiento del camión tiene que tenerlo.',
      '<b>Cómo se ajusta:</b> la parte de <b>arriba</b> del reposacabezas tiene que quedar a la <b>misma altura que la parte de arriba de tu cabeza</b>, más o menos a la altura de las <b>orejas</b>. <b>Si queda por debajo de la nuca</b>, en un golpe <b>aumentan las lesiones cervicales</b>.',
      '<b>Dato:</b> un choque de costado lastima más que uno de frente, porque el cuerpo está más cerca de las partes del vehículo que se deforman.'
    ],
    sim: 'choque',
    vista: 'costado',
    figura: { img: 'volante-airbag', titulo: 'El airbag', texto: 'Cojín + detector de impacto + inflado con nitrógeno. Siempre junto con el cinturón.' }
  },
  {
    tipo: 'activa',
    titulo: 'Repaso: activa y pasiva',
    texto: [
      '<b>Activa (primaria):</b> evita el accidente. Las más importantes: <b>frenos y ruedas</b>. También dirección, suspensión, luces, ABS, ESP, ASR, EBS y BAS. Algunas necesitan que el conductor actúe.',
      '<b>Pasiva (secundaria):</b> baja los daños a las personas, durante y después del choque, y actúa sola. <b>Cinturón, airbag y reposacabezas.</b>',
      '<b>Cinturón:</b> hombro y pelvis, sin holgura, sin pinzas, siempre (urbano e interurbano).',
      '<b>Airbag:</b> cojín + detector + inflado con nitrógeno; con cinturón; más de un 30% menos de riesgo de muerte.',
      '<b>Reposacabezas:</b> arriba, a la altura de la parte de arriba de la cabeza; por debajo de la nuca agrava las lesiones cervicales.'
    ],
    sim: 'quieto',
    vista: 'perspectiva'
  },
  {
    tipo: 'activa',
    titulo: 'Preguntas oficiales: activa y pasiva',
    texto: [],
    sim: 'quieto',
    vista: 'perspectiva',
    quiz: true
  }
];
