// ==========================================
// TACÓGRAFO · CAPÍTULO 5: EL TACÓGRAFO ANALÓGICO Y SUS DISCOS
// ==========================================

export const PASOS_TACO_ANALOGICO = [
  {
    tipo: 'analogico',
    titulo: 'El aparato analógico',
    texto: [
      'El analógico anota todo sobre un <b>disco de papel</b>. El disco tiene tres nombres que significan lo mismo: <b>disco-diagrama</b>, <b>hoja de registro</b> o simplemente disco.',
      '<b>En el frente se ven tres indicadores:</b> la <b>velocidad</b>, el <b>cuentakilómetros total</b> y un <b>reloj</b>. El cuentakilómetros lo podés mirar siempre sin abrir la caja.',
      '<b>Lo que anota solo:</b> la velocidad, la distancia, la conducción, cada vez que se <b>abre la caja</b> del disco y, en los que funcionan con señal eléctrica, los <b>cortes de corriente</b>.',
      '<b>Lo que tenés que marcar vos:</b> las otras actividades (otros trabajos, disponibilidad y descanso), con el <b>selector de actividad</b>, cada vez que cambiás. Después el aparato las graba solo.<br><b>Ejemplo:</b> llegás a descargar: girás el selector a los martillos. Te vas a dormir: a la cama.',
      'Las agujas que escriben sobre el disco se llaman <b>dispositivo marcador</b>.',
      '<b>La hora</b> del disco es la del <b>país donde está matriculado</b> el camión.'
    ],
    base: [],
    vista: 'disco',
    linea: [[0.6, e => e.trazarDisco(true)]]
  },
  {
    tipo: 'analogico',
    titulo: 'Las zonas del disco',
    texto: [
      'Tocá cada zona del disco para ver qué es. De afuera hacia adentro:',
      '<b>1. Afuera: la velocidad.</b> Marcada de 20 en 20 km/h como mínimo.',
      '<b>2. En el medio: las actividades.</b> Se distinguen por el <b>grosor</b> o la <b>posición</b> del trazo. Mirá el disco: el trazo grueso es conducción, el fino es pausa.',
      '<b>3. Adentro: los kilómetros.</b> Una línea <b>quebrada</b>, porque la aguja sube y baja con los kilómetros.',
      '<b>4. El centro:</b> la zona para lo que anotás a mano. La vemos en el paso siguiente.',
      '<b>5. Lo impreso de fábrica:</b> el fabricante, la <b>marca de homologación</b> de los modelos de tacógrafo donde se puede usar, y la velocidad máxima que puede marcar.',
      'Los registros tienen que quedar <b>imborrables</b> y fáciles de leer.'
    ],
    base: [],
    vista: 'disco',
    linea: [
      [0.5, e => { e.resaltar('velocidad'); e.etiqueta('velocidad', 'Afuera: velocidad', 'ok'); }],
      [2.2, e => { e.resaltar('actividades'); e.etiqueta('velocidad', null); e.etiqueta('actividades', 'En el medio: actividades', 'ok'); }],
      [3.9, e => { e.resaltar('km'); e.etiqueta('actividades', null); e.etiqueta('km', 'Adentro: kilómetros', 'ok'); }],
      [5.6, e => { e.resaltar('impreso'); e.etiqueta('km', null); e.etiqueta('impreso', 'Impreso: homologación', 'ok'); }]
    ]
  },
  {
    tipo: 'analogico',
    titulo: 'Lo que anotás a mano: frente y reverso',
    texto: [
      '<b>Antes de poner el disco</b>, en el centro del frente anotás:<br>• tu <b>nombre y apellidos</b>;<br>• el <b>lugar y la fecha</b> en que empezás, y al final dónde y cuándo terminás;<br>• la <b>matrícula</b> del camión;<br>• los <b>kilómetros</b> del cuentakilómetros al empezar y al terminar la jornada.',
      '<b>Trampa:</b> no se anota la hora UTC, ni el número de chasis, ni la marca del camión, ni el consumo de combustible.',
      '<b>En el reverso</b> (la parte de atrás) se anotan los <b>cambios de camión</b>: la matrícula y los kilómetros al tomar y al dejar cada camión.',
      '<b>Si cambiás de camión</b> en la jornada: usás <b>el mismo disco</b> si está homologado para los dos tacógrafos, y anotás ahí la nueva matrícula y los kilómetros. Los discos van siempre con vos.',
      '<b>Dos conductores:</b> cada uno usa <b>su propio disco</b>, con su nombre.'
    ],
    base: [],
    vista: 'disco',
    linea: [
      [0.5, e => { e.resaltar('centro'); e.etiqueta('centro', 'Nombre, lugar y fecha, matrícula y km', 'ok'); }],
      [3.5, e => { e.etiqueta('centro', null); e.girarDisco(true); }],
      [3.8, e => e.etiqueta('velocidad', 'Atrás: cambios de camión', 'precio')]
    ]
  },
  {
    tipo: 'analogico',
    titulo: 'Cómo se usa el disco',
    texto: [
      '<b>Es personal:</b> es tuyo, no del camión.',
      '<b>Dura</b> como mínimo <b>24 horas</b>. Se pone <b>al hacerte cargo del camión</b>, todos los días que manejás, y se deja puesto <b>toda la jornada</b>.',
      '<b>Trampa:</b> el examen pone "los discos solo pueden usarse 48 horas". Eso no es correcto.',
      '<b>No sirve cualquier disco:</b> tiene que estar <b>homologado</b> para ese modelo de tacógrafo. El disco dice para qué modelos sirve. Usar discos no homologados es falta grave.',
      '<b>La empresa</b> te da discos suficientes para todo el tiempo que vas a estar trabajando, contando que alguno se puede estropear o te lo pueden pedir los agentes.'
    ],
    base: [],
    vista: 'disco',
    linea: [[0.6, e => e.trazarDisco(true)], [0.8, e => e.etiqueta('centro', 'Uno por jornada · 24 horas', 'ok')]]
  },
  {
    tipo: 'analogico',
    titulo: 'Si se rompe, y si te paran',
    texto: [
      '<b>Si se rompe el tacógrafo:</b> anotás tus actividades a mano en el disco o en una hoja aparte, que adjuntás al disco, y seguís trabajando.',
      '<b>Reparación:</b> tan pronto como se pueda, en un taller autorizado. Si el camión no vuelve a la empresa dentro de <b>una semana</b>, se repara en el camino.',
      '<b>En un control tenés que mostrar:</b><br>• los discos del día y de los <b>56 días anteriores</b>;<br>• tu tarjeta de conductor, si tenés una (es la tarjeta del tacógrafo digital, la vemos en el capítulo 7);<br>• las anotaciones a mano e impresiones que hayas tenido que hacer.'
    ],
    base: [],
    vista: 'disco',
    linea: []
  },
  {
    tipo: 'analogico',
    titulo: 'Repaso: el analógico',
    texto: [
      '<b>Disco = disco-diagrama = hoja de registro.</b> Personal, 24 horas, toda la jornada puesto. Homologado para ese tacógrafo.',
      '<b>Zonas:</b> afuera velocidad (de 20 en 20), medio actividades (grosor del trazo), adentro kilómetros (línea quebrada).',
      '<b>Solo:</b> velocidad, distancia, conducción, apertura de la caja. Lo demás, con el selector.',
      '<b>Frente, a mano:</b> nombre, lugar y fecha, matrícula, kilómetros. <b>Reverso:</b> cambios de camión.',
      '<b>Cambio de camión:</b> mismo disco si sirve. <b>Dos conductores:</b> un disco cada uno.',
      '<b>Control:</b> discos de hoy y de 56 días atrás.'
    ],
    base: [],
    vista: 'disco',
    linea: []
  },
  { tipo: 'analogico', titulo: 'Preguntas oficiales: el analógico', texto: [], base: [], vista: 'disco', linea: [], quiz: true }
];
