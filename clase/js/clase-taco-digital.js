// ==========================================
// TACÓGRAFO · CAPÍTULO 6: EL TACÓGRAFO DIGITAL (EL APARATO)
// ==========================================

export const PASOS_TACO_DIGITAL = [
  {
    tipo: 'digital',
    titulo: 'Las partes del digital',
    texto: [
      'El digital tiene dos partes:',
      '<b>1. La unidad intravehicular</b> (en inglés VU): es el aparato que ves en la cabina. Por dentro tiene una <b>memoria</b> y un <b>procesador</b>. Por fuera:<br>• una <b>pantalla</b>;<br>• una <b>impresora</b>;<br>• <b>dos ranuras</b> para tarjetas, cada una con su botón (1 y 2);<br>• botones para moverse por el menú.<br>Ella registra, guarda y manda los datos.',
      '<b>2. El sensor de movimiento:</b> va en la <b>caja de cambios</b> y le manda a la unidad la velocidad y la distancia. No es parte de la unidad intravehicular. Lo conecta un <b>taller autorizado</b>; si está mal conectado, el aparato anota un incidente.',
      '<b>Precintos:</b> todas las conexiones que, si se soltaran, permitirían hacer trampa, van precintadas.',
      'El tacógrafo de la derecha <b>lo podés usar</b>: girá la llave de contacto, meté tarjetas, apretá los botones 1 y 2, mové el acelerador y entrá al menú con OK, ▲ y ▼. También lo podés girar arrastrándolo.'
    ],
    base: [],
    alArrancar: e => e.reiniciarAparato(),
    vista: 'aparato',
    linea: [
      [0.5, e => e.etiqueta('lcd', 'Pantalla', 'ok')],
      [1.5, e => e.etiqueta('ranura1', 'Ranura 1', 'ok')],
      [2.3, e => e.etiqueta('ranura2', 'Ranura 2', 'ok')],
      [3.1, e => e.etiqueta('impresora', 'Impresora', 'ok')]
    ]
  },
  {
    tipo: 'digital',
    titulo: 'La hora: UTC',
    texto: [
      'El digital graba todo en <b>hora UTC</b>: el tiempo universal coordinado, una hora que es igual en todo el mundo.',
      '<b>En España</b>, nuestra hora es la UTC <b>más 1 hora en invierno</b> y <b>más 2 horas en verano</b>.<br><b>Ejemplo:</b> en verano, si en tu reloj son las 14:00, el tacógrafo marca 12:00 UTC.',
      '<b>La hora local</b> también se puede ver en la pantalla, pero es <b>solo informativa</b>: lo que se graba es la UTC. Miralo en el tacógrafo: OK → VISUALIZACIÓN → HORA UTC / LOCAL.',
      'La hora no se pierde aunque le corten la corriente: aguanta hasta un año.',
      '<b>Si la hora UTC tiene un desfase:</b> si es de más de 20 minutos, es obligatorio ir a revisión. Si es menor, conviene ir al taller igual: el conductor solo puede corregir 1 minuto por semana.'
    ],
    base: [],
    vista: 'aparato',
    linea: [
      [0.8, e => e.etiqueta('lcd', 'Graba en hora UTC', 'precio')]
    ]
  },
  {
    tipo: 'digital',
    titulo: 'Qué graba y cuánto guarda',
    texto: [
      '<b>Graba solo:</b><br>• las <b>actividades</b> de los conductores;<br>• la <b>velocidad</b>: mide de 0 a 220 km/h, y guarda la de cada segundo de las últimas 24 horas de marcha;<br>• la <b>distancia</b>, de 100 en 100 metros (0,1 km);<br>• el <b>cuentakilómetros</b>: lo anota todos los días a medianoche;<br>• los <b>incidentes</b> y los <b>fallos</b>;<br>• los <b>controles</b> de los agentes: los últimos 20;<br>• de qué vehículo viene cada conductor, porque lo lee de su tarjeta.',
      '<b>Resolución:</b> las actividades se anotan <b>minuto a minuto</b>.',
      '<b>Memoria:</b> guarda al menos <b>365 días</b>. Cuando se llena, los datos nuevos reemplazan a los más viejos.',
      '<b>Además graba en la tarjeta</b> del conductor que esté puesta.',
      '<b>Hay que llevar papel</b> para la impresora. Es obligatorio.'
    ],
    base: [],
    vista: 'aparato',
    linea: [
      [0.5, e => e.insertar('conductor', 1)],
      [2.4, e => e.andar(true)],
      [3.0, e => e.etiqueta('lcd', 'Anota velocidad, distancia y actividad', 'ok')]
    ]
  },
  {
    tipo: 'digital',
    titulo: 'Activación y calibrado',
    texto: [
      '<b>Activación:</b> es cuando el tacógrafo pasa a funcionar del todo. Pasa <b>automáticamente</b> la primera vez que se pone una <b>tarjeta de taller</b> (de centro de ensayo). Desde ahí funciona correctamente.',
      '<b>Calibrado:</b> es cargar y confirmar los datos del camión en el tacógrafo (medidas, neumáticos, matrícula). Después de activarlo hay que hacer un <b>primer calibrado</b>.',
      '<b>La matrícula</b> se carga antes de usar el camión para trabajos que necesitan tacógrafo.',
      'Si querés saber si ya se hizo el primer calibrado, se mira en la impresión de <b>datos técnicos</b>.'
    ],
    base: [],
    alArrancar: e => e.reiniciarAparato(),
    vista: 'aparato',
    linea: [
      [0.5, e => e.insertar('taller', 2)],
      [1.4, e => e.pantalla('ACTIVADO\nMODO CALIBRADO', 4)],
      [1.6, e => e.etiqueta('ranura2', 'Tarjeta de taller: activa y calibra', 'precio')]
    ]
  },
  {
    tipo: 'digital',
    titulo: 'Repaso: el digital',
    texto: [
      '<b>Partes:</b> unidad intravehicular (memoria, procesador, pantalla, impresora, 2 ranuras) y sensor de movimiento en la caja de cambios.',
      '<b>Hora:</b> UTC. España: +1 en invierno, +2 en verano. La local, solo para mirar.',
      '<b>Mide:</b> 0 a 220 km/h, distancia de 0,1 km, actividades minuto a minuto.',
      '<b>Memoria:</b> 365 días; cuando se llena, lo nuevo pisa lo viejo. Últimos 20 controles.',
      '<b>Activación:</b> con la primera tarjeta de taller. Después, calibrado.',
      '<b>Papel</b> de impresora: obligatorio.'
    ],
    base: [],
    vista: 'aparato',
    linea: []
  },
  { tipo: 'digital', titulo: 'Preguntas oficiales: el digital', texto: [], base: [], vista: 'aparato', linea: [], quiz: true }
];
