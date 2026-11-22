// ==========================================
// TACÓGRAFO · CAPÍTULO 7: LAS TARJETAS
// ==========================================

export const PASOS_TACO_TARJETAS = [
  {
    tipo: 'tarjetas',
    titulo: 'Las cuatro tarjetas',
    texto: [
      'El digital funciona con <b>tarjetas</b>. Hay cuatro, y cada una tiene un color de fondo:',
      '<b>De conductor (blanca):</b> la tiene cada conductor. Te identifica y guarda tu actividad. Sin ella no podés manejar un camión con digital.',
      '<b>De empresa (amarilla):</b> la tiene la empresa dueña o que alquila los camiones. Le deja ver, imprimir y <b>descargar</b> los datos de sus tacógrafos.',
      '<b>De control (azul):</b> la tienen los agentes de control (Guardia Civil, inspectores de transporte). Con ella leen, imprimen y descargan los datos.',
      '<b>De taller o de centro de ensayo (roja):</b> la tiene el técnico del taller autorizado. Sirve para probar, <b>activar</b>, <b>calibrar</b> y descargar el tacógrafo. Se pone en todas las intervenciones del taller.',
      '<b>Validez:</b> todas valen <b>5 años</b>, menos la de taller, que vale <b>1 año</b>.'
    ],
    base: [],
    vista: 'tarjetas',
    linea: [
      [0.6, e => e.resaltar('conductor')],
      [1.8, e => e.resaltar('empresa')],
      [3.0, e => e.resaltar('control')],
      [4.2, e => e.resaltar('taller')]
    ]
  },
  {
    tipo: 'tarjetas',
    titulo: 'Tu tarjeta de conductor: pedirla y renovarla',
    texto: [
      '<b>Una sola:</b> cada conductor tiene <b>una sola</b> tarjeta. Aunque trabajes para dos empresas y manejes tres camiones, tenés una.',
      '<b>Es personal</b>: solo la usás vos. Y <b>no reemplaza</b> al permiso de conducir: hacen falta los dos.',
      '<b>Dónde se pide:</b> en la oficina de transportes de la comunidad autónoma donde <b>vivís</b>.',
      '<b>Dura 5 años.</b> Para renovarla, la pedís como mínimo <b>15 días hábiles antes</b> de que venza. La Administración te la tiene que dar antes de que venza la vieja. Podés elegir ir a buscarla o que te la manden a casa.<br><b>Ejemplo:</b> tu tarjeta vence el 30 de junio: pedí la nueva a principios de junio como tarde.',
      '<b>Si cambiás de domicilio</b>, pedís una renovación con el domicilio nuevo.',
      '<b>Vencida:</b> sirve solo para imprimir, mirar o descargar datos. No para manejar.'
    ],
    base: [],
    vista: 'tarjetas',
    linea: [[0.6, e => e.resaltar('conductor')]]
  },
  {
    tipo: 'tarjetas',
    titulo: 'Si la perdés o te la quitan',
    texto: [
      '<b>Pérdida o robo:</b> pedís una nueva en <b>7 días</b> como máximo. La nueva vale lo mismo que le quedaba a la vieja.',
      '<b>Si aparece la vieja</b> cuando ya tenés la nueva, la vieja se <b>devuelve</b> a la oficina que la dio.',
      '<b>Si anda mal</b>, también se devuelve a esa oficina.',
      '<b>Te la pueden quitar o suspender</b> si:<br>• está <b>falsificada</b>;<br>• la sacaste con <b>papeles falsos</b>;<br>• usás una que <b>no es tuya</b>, o otro usa la tuya.<br>También se la pueden llevar como prueba si encuentran un aparato de trampa.',
      '<b>Trampa:</b> por pasarte de horas de manejo <b>no</b> te quitan la tarjeta.'
    ],
    base: [],
    vista: 'tarjetas',
    linea: [[0.6, e => e.resaltar('conductor')]]
  },
  {
    tipo: 'tarjetas',
    titulo: 'Qué guarda tu tarjeta',
    texto: [
      'Tu tarjeta graba datos <b>solo mientras está puesta</b> en el tacógrafo.',
      '<b>Guarda:</b><br>• tus <b>actividades</b> de al menos <b>56 días</b>;<br>• cada vez que la metés y la sacás: tu identificación, número de tarjeta, fecha y hora, matrícula y kilómetros;<br>• en qué <b>ranura</b> estuvo y si manejabas <b>solo o en equipo</b>;<br>• el lugar donde empezás y terminás la jornada, que indicás vos a mano;<br>• los <b>incidentes</b> y <b>fallos</b>, de la tarjeta y del tacógrafo: fecha, hora y código;<br>• los <b>controles</b>: fecha y hora, tipo de control, número de tarjeta del agente y país.',
      '<b>Cuando la memoria se llena</b>, los datos nuevos se graban encima de los más viejos.',
      '<b>Si cambiás de camión</b>, el tacógrafo nuevo lee lo necesario de tu tarjeta (conducción seguida, descansos, la semana anterior) y sigue sumando.'
    ],
    base: [],
    vista: 'aparato',
    linea: [
      [0.5, e => e.insertar('conductor', 1)],
      [1.4, e => e.etiqueta('ranura1', 'Graba solo si está puesta', 'precio')]
    ]
  },
  {
    tipo: 'tarjetas',
    titulo: 'Repaso: las tarjetas',
    texto: [
      '<b>Conductor (blanca), empresa (amarilla), control (azul), taller (roja).</b> 5 años; la de taller, 1 año.',
      '<b>Tu tarjeta:</b> una sola, personal, no reemplaza al permiso. Se pide donde vivís. Se renueva cada 5 años, pidiéndola 15 días hábiles antes.',
      '<b>Pérdida o robo:</b> 7 días. Si aparece la vieja o anda mal, se devuelve.',
      '<b>Te la quitan</b> si es falsa, si la sacaste con papeles falsos o si se usa la de otro. Por horas de más, no.',
      '<b>Guarda</b> 56 días de actividad, y solo graba estando puesta.'
    ],
    base: [],
    vista: 'tarjetas',
    linea: []
  },
  { tipo: 'tarjetas', titulo: 'Preguntas oficiales: las tarjetas', texto: [], base: [], vista: 'tarjetas', linea: [], quiz: true }
];
