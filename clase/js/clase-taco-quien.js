// ==========================================
// TACÓGRAFO · CAPÍTULO 4: QUÉ ES Y QUIÉN LO LLEVA
// ==========================================

export const PASOS_TACO_QUIEN = [
  {
    tipo: 'quien',
    titulo: '¿Qué es el tacógrafo?',
    texto: [
      'Es el aparato que va en el camión y <b>anota solo</b>, sin que lo toques:<br>• la <b>velocidad</b>;<br>• la <b>distancia</b> recorrida;<br>• las <b>actividades</b> del conductor: conducción, otros trabajos, disponibilidad y descanso.',
      '<b>¿Para qué?</b> Para que las autoridades puedan <b>controlar</b> que se cumplan los tiempos de conducción y descanso. Así mejora la <b>seguridad en la carretera</b> y las <b>condiciones de trabajo</b> de los conductores.',
      '<b>Hay dos tipos:</b><br>• <b>Analógico:</b> el viejo. Anota sobre un <b>disco de papel</b>.<br>• <b>Digital:</b> anota y además <b>guarda en su memoria</b> y en tu <b>tarjeta</b>.<br>Los camiones que se matriculan nuevos llevan <b>digital</b>.',
      '<b>Siempre homologado:</b> el tacógrafo tiene que estar aprobado por un país de la UE. Lo vemos en el capítulo de controles.',
      'Es obligatorio en los vehículos matriculados en <b>cualquier país de la Unión Europea</b>.'
    ],
    base: [],
    vista: 'general',
    linea: []
  },
  {
    tipo: 'quien',
    titulo: '¿Quién tiene que llevarlo?',
    texto: [
      '<b>Mercancías:</b> los vehículos de <b>más de 3.500 kg</b> de masa máxima autorizada (MMA, el peso máximo con carga), contando el remolque si lleva.',
      '<b>Viajeros:</b> los vehículos hechos para <b>más de 9 personas</b>, contando al conductor.',
      '<b>Ejemplos:</b><br>• una furgoneta de 3.000 kg: no lleva;<br>• un camión de correos de 15.000 kg: lleva;<br>• una furgoneta de 3.000 kg con un remolque de 1.000 kg suma 4.000 kg: lleva;<br>• un autocar de 9 plazas con el conductor: no lleva.'
    ],
    base: [],
    vista: 'exentos',
    linea: [[0.5, e => e.resaltar('si0')], [1.6, e => e.resaltar('si1')]]
  },
  {
    tipo: 'quien',
    titulo: 'Los que no lo necesitan',
    texto: [
      'Aunque pesen más de 3.500 kg, <b>no necesitan tacógrafo</b>:<br>• los que van como mucho a <b>40 km/h</b>, como un tractor;<br>• los del <b>Ejército, la Policía, la Guardia Civil, los bomberos</b> y los de la Administración, cuando hacen su trabajo;<br>• los de <b>emergencias y salvamento</b>, por ejemplo un autocar que lleva bomberos a ayudar en un terremoto;<br>• los especiales con <b>fines médicos</b>, como un autocar de donación de sangre;<br>• los que se están <b>probando en la carretera</b> y los nuevos que todavía no circulan;<br>• los de <b>autoescuela y cursos CAP</b>;<br>• los de hasta 7.500 kg sin fines comerciales, los de <b>ayuda humanitaria</b> y los <b>históricos</b>, si no son para negocio;<br>• los que trabajan solo dentro de un <b>recinto cerrado</b>, como un puerto o un aeropuerto.',
      '<b>Trampa:</b> un autocar que lleva trabajadores de una empresa, o diputados al Congreso, sí lo necesita. No entra en ninguna excepción.'
    ],
    base: [],
    vista: 'exentos',
    linea: [[0.5, e => e.resaltar('no0')], [1.5, e => e.resaltar('no1')], [2.5, e => e.resaltar('no4')], [3.5, e => e.resaltar('no5')]]
  },
  {
    tipo: 'quien',
    titulo: 'Los que no lo necesitan cerca de su base',
    texto: [
      'Estos <b>no lo necesitan</b> si trabajan a <b>100 km o menos</b> de su base:<br>• el transporte <b>privado complementario</b> del material o las máquinas que usa el propio conductor, con un vehículo de hasta 7.500 kg, si manejar no es su trabajo principal;<br>• las empresas <b>agrícolas y forestales</b> llevando sus cosas;<br>• la <b>recogida de leche</b> en granjas, o llevarles leche para el ganado;<br>• el <b>hormigón</b> en camiones hechos para eso (hormigoneras);<br>• los <b>envíos postales</b> de Correos con vehículos de hasta 7.500 kg, manejados por el personal de reparto;<br>• la <b>grúa de averías</b>;<br>• los <b>animales vivos</b> entre granjas y mercados locales, a 100 km o menos en línea recta.',
      '<b>Trampa de las grúas:</b> un camión que lleva coches averiados a una ciudad a 200 km sí lo necesita.',
      '<b>Con otros límites:</b><br>• la <b>basura</b> doméstica: hasta 50 km;<br>• los vehículos de <b>alcantarillado</b>, los de <b>dinero y objetos de valor</b>, y los de <b>material de feria</b> o exposiciones preparados para eso;<br>• las <b>islas</b> de 250 km² o menos sin puente ni túnel a tierra firme, y <b>Ceuta y Melilla</b>;<br>• en viajeros, las <b>líneas regulares</b> de hasta 50 km.',
      '<b>Los viajes vacíos</b> que tiene que hacer el vehículo antes o después de uno de estos trabajos tampoco necesitan tacógrafo.'
    ],
    base: [],
    vista: 'exentos',
    linea: [[0.5, e => e.resaltar('no10')], [1.5, e => e.resaltar('no13')], [2.5, e => e.resaltar('no17')]]
  },
  {
    tipo: 'quien',
    titulo: 'No lo usa, pero lo revisa',
    texto: [
      'Algunos vehículos que no necesitan tacógrafo lo tienen igual, porque el <b>limitador de velocidad</b> (el aparato que no deja pasar de cierta velocidad) toma la velocidad del tacógrafo.',
      'En ese caso, el tacógrafo tiene que pasar la <b>revisión cada 2 años</b>, aunque no se use para los tiempos.',
      '<b>Ejemplo:</b> un autobús que solo circula en una isla chica no necesita tacógrafo, pero si su limitador toma la señal del tacógrafo, pasa la revisión igual.'
    ],
    base: [],
    vista: 'placas',
    linea: [[0.5, e => e.resaltar('revision')]]
  },
  {
    tipo: 'quien',
    titulo: 'Repaso: quién lleva tacógrafo',
    texto: [
      '<b>Qué hace:</b> anota velocidad, distancia y actividades. Analógico (disco) o digital (memoria y tarjeta). Los nuevos, digital.',
      '<b>Lo llevan:</b> mercancías de más de 3.500 kg; viajeros de más de 9 plazas.',
      '<b>No lo necesitan:</b> hasta 40 km/h, ejército, policía, bomberos, emergencias, fines médicos, autoescuela, recintos cerrados, islas chicas, Ceuta y Melilla.',
      '<b>Cerca de la base (100 km):</b> material propio hasta 7.500 kg, agrícolas, leche, hormigón, Correos, grúas, animales a mercados.',
      '<b>Viajes vacíos</b> de esos trabajos: tampoco. <b>Limitador conectado:</b> revisión cada 2 años.'
    ],
    base: [],
    vista: 'exentos',
    linea: []
  },
  { tipo: 'quien', titulo: 'Preguntas oficiales: quién lleva tacógrafo', texto: [], base: [], vista: 'general', linea: [], quiz: true }
];
