// ==========================================
// ANIMACIONES DEL TEMA LABORAL (trabajo y prevención de riesgos)
// Fotos de Gemini (ilustraciones/lab-*.webp) con carteles y recuadros dibujados encima.
// Misma forma de uso que las otras: montarAnim(div, nombre, { pausado })
// ==========================================

const NS = 'http://www.w3.org/2000/svg';
const S = 320 / 1376, Y0 = 22;            // fotos de 1376 x 768
const foto = n => `<image href="ilustraciones/lab-${n}.webp" x="0" y="${Y0}" width="320" height="${(768 * S).toFixed(1)}"/>`;
const FONDO = t => `<rect width="320" height="260" rx="14" fill="#0b1220"/><text x="160" y="16" text-anchor="middle" font-size="11.5" font-weight="900" fill="#fff">${t}</text>`;
const CARTEL = `<rect x="8" y="206" width="304" height="48" rx="10" fill="#0f172a" stroke="#22d3ee" stroke-opacity="0.4"/>
  <text id="c1" x="160" y="224" text-anchor="middle" font-size="10.5" font-weight="900" fill="#67e8f9"></text>
  <text id="c2" x="160" y="241" text-anchor="middle" font-size="8.8" fill="#e2e8f0"></text>`;
const caja = (id, x, y, w, h, color = '#22d3ee') => `<rect id="${id}" x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="none" stroke="${color}" stroke-width="2.5" opacity="0"/>`;
const tag = (id, x, y, txt, color = '#22d3ee') => { const w = txt.length * 5.5 + 14; x = Math.max(w / 2 + 4, Math.min(316 - w / 2, x)); return `<g id="${id}" opacity="0.25"><rect x="${x - w / 2}" y="${y - 10}" width="${w}" height="18" rx="9" fill="#0b1220" stroke="${color}" stroke-width="1.5"/><text x="${x}" y="${y + 3}" text-anchor="middle" font-size="9.5" font-weight="900" fill="#fff">${txt}</text></g>`; };
const tache = (id, x, y, r = 22) => `<g id="${id}" opacity="0"><circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#ef4444" stroke-width="4"/><line x1="${x - r * 0.7}" y1="${y + r * 0.7}" x2="${x + r * 0.7}" y2="${y - r * 0.7}" stroke="#ef4444" stroke-width="4"/></g>`;
const ok = (id, x, y) => `<g id="${id}" opacity="0"><circle cx="${x}" cy="${y}" r="13" fill="#16a34a"/><path d="M${x - 6} ${y} l4 5 l8 -10" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/></g>`;
const no = (id, x, y) => `<g id="${id}" opacity="0"><circle cx="${x}" cy="${y}" r="13" fill="#dc2626"/><path d="M${x - 5} ${y - 5} l10 10 M${x + 5} ${y - 5} l-10 10" stroke="#fff" stroke-width="3" stroke-linecap="round"/></g>`;
// Damian dibujado chiquito (para las pantallas sin foto)
const persona = (id, x, y, c = '#f97316', e = 1) => `<g${id ? ` id="${id}"` : ''} transform="translate(${x} ${y}) scale(${e})"><circle cy="-30" r="8" fill="#fcd34d"/><rect x="-10" y="-20" width="20" height="26" rx="6" fill="${c}"/><rect x="-9" y="6" width="7" height="22" rx="3" fill="#334155"/><rect x="2" y="6" width="7" height="22" rx="3" fill="#334155"/></g>`;
const barra = (id, x, y, w, h, color, txt, val) => `<g id="${id}" opacity="0.3"><rect x="${x}" y="${y - h}" width="${w}" height="${h}" rx="4" fill="${color}"/><text x="${x + w / 2}" y="${y - h - 5}" text-anchor="middle" font-size="10" font-weight="900" fill="#fff">${val}</text><text x="${x + w / 2}" y="${y + 12}" text-anchor="middle" font-size="8.5" font-weight="900" fill="#cbd5e1">${txt}</text></g>`;

// ---------- QUÉ MUESTRA CADA PANTALLA ----------
// fr: [título, texto, ids que se prenden]. solo: los que no están en la frase se apagan del todo.
const A = {
  contrato: { t: 'DAMIAN FIRMA CON LA EMPRESA', f: 'oficina',
    x: caja('jefe', 50, 52, 80, 100) + caja('dam', 185, 52, 80, 100, '#f97316') + caja('pap', 120, 140, 70, 22, '#fbbf24') +
      tag('t1', 90, 40, 'EL JEFE (la dirección)') + tag('t2', 228, 40, 'DAMIAN', '#f97316') + tag('t3', 160, 186, 'tiempo de presencia = espera, sin trabajar', '#fbbf24'),
    fr: [['EL JEFE PUEDE MANDAR', 'Darle tareas, cambiarle el trabajo y decidir cómo se hace.', ['jefe', 't1']],
      ['TRABAJADOR MÓVIL', 'Damian trabaja viajando arriba del camión.', ['dam', 't2']],
      ['TIEMPO DE PRESENCIA', 'A disposición del jefe, sin trabajar. Ej: esperar la carga.', ['t3']],
      ['EL CONTRATO', 'Firmado: Damian ya trabaja para la empresa.', ['pap']]] },
  sueldo: { t: 'CÓMO LE PAGAN A DAMIAN', f: 'oficina',
    x: `<g id="km"><rect x="18" y="34" width="112" height="40" rx="8" fill="#0b1220" stroke="#fbbf24"/><text x="74" y="50" text-anchor="middle" font-size="9" font-weight="900" fill="#fde68a">+ € POR KILÓMETRO</text><text x="74" y="66" text-anchor="middle" font-size="9" font-weight="900" fill="#fde68a">O POR CARGA</text></g>` +
      tache('x1', 74, 54, 26) + caja('pap', 120, 140, 70, 22, '#fbbf24') + tag('t2', 160, 186, 'varias empresas: las horas, POR ESCRITO', '#22d3ee'),
    fr: [['¿PRIMAS POR KILÓMETROS O CARGA?', 'Prohibidas si ponen en riesgo la seguridad.', ['km', 'x1']],
      ['¿POR QUÉ?', 'Porque te empujan a correr y a no descansar.', ['km', 'x1']],
      ['VARIAS EMPRESAS', 'Le pasa a cada jefe sus horas en las otras, por escrito.', ['pap', 't2']]] },
  control: { t: 'EL CONTROL EN LA CARRETERA', f: 'control',
    x: caja('ag', 124, 70, 40, 124) + caja('dam', 168, 64, 40, 130, '#f97316') + caja('pap', 155, 92, 28, 22, '#fbbf24') +
      tag('t1', 70, 44, 'el agente') + tag('t2', 70, 68, 'Damian = representante de la empresa', '#f97316') + tag('t3', 70, 92, 'multas de circulación: el conductor', '#ef4444') +
      tag('t4', 70, 116, 'certificado de actividades: NUNCA', '#22c55e') + tag('t5', 70, 140, 'siempre: tarjeta CAP', '#fbbf24'),
    fr: [['UN AGENTE PARA A DAMIAN', 'Le pide los papeles de ese transporte.', ['ag', 't1', 'pap']],
      ['REPRESENTANTE DE LA EMPRESA', 'En el control, Damian representa a su empresa y da los papeles.', ['dam', 't2', 'pap']],
      ['LAS MULTAS DE CIRCULACIÓN', 'Velocidad, semáforo… las paga el que maneja.', ['t3']],
      ['CERTIFICADO DE ACTIVIDADES', 'Ya no se pide nunca. Ni después de vacaciones.', ['t4']],
      ['LO QUE SIEMPRE LLEVA', 'La tarjeta de cualificación profesional (CAP).', ['t5']]] },
  prevenir: { t: 'PREVENIR ES COSA DE LOS DOS', f: 'prevencion',
    x: caja('pas', 15, 152, 110, 46, '#fbbf24') + caja('car', 4, 70, 30, 28) + caja('tra', 38, 100, 26, 64, '#f97316') + caja('tor', 178, 98, 60, 54, '#ef4444') +
      tag('t1', 160, 40, 'EMPRESARIO + TRABAJADOR', '#22c55e') + tag('t2', 160, 64, 'evitar lo evitable · evaluar lo que no') + tag('t3', 160, 88, 'peor: empresas de 1 a 5 trabajadores', '#ef4444'),
    fr: [['PREVENCIÓN DE RIESGOS', 'Pasillos pintados, carteles, casco y chaleco: que nadie se lastime.', ['pas', 'car', 'tra', 'tor']],
      ['¿DE QUIÉN ES LA OBLIGACIÓN?', 'Del empresario y del trabajador. De los dos.', ['t1']],
      ['¿PARA QUÉ SIRVE?', 'Evitar los riesgos evitables y evaluar los que no.', ['t2']],
      ['DONDE PEOR SE CUMPLE', 'En las empresas más chicas: de 1 a 5 trabajadores.', ['t3']]] },
  empresario: { t: 'LO QUE TIENE QUE HACER EL JEFE', f: 'prevencion', solo: true,
    x: tag('t1', 160, 40, 'EVITAR los riesgos evitables', '#22c55e') + tag('t2', 160, 62, 'ADOPTAR medidas de protección', '#22c55e') + tag('t3', 160, 84, 'FORMAR E INFORMAR', '#22c55e') +
      tag('t4', 160, 106, 'DAR la ropa y los EPI', '#22c55e') + tag('t5', 160, 128, 'decide qué puestos llevan EPI y los mantiene', '#22c55e') + tag('t6', 160, 150, 'USAR los EPI → eso es de Damian', '#ef4444'),
    fr: [['1. EVITAR', 'Los riesgos que se pueden evitar.', ['t1']], ['2. ADOPTAR', 'Medidas de protección.', ['t1', 't2']],
      ['3. FORMAR E INFORMAR', 'Enseñarles los riesgos a los trabajadores.', ['t1', 't2', 't3']],
      ['4. DAR LOS EQUIPOS', 'Ropa y equipos de protección.', ['t1', 't2', 't3', 't4']],
      ['LOS EPI', 'El jefe decide qué puestos los llevan, cuál hace falta y los mantiene.', ['t1', 't2', 't3', 't4', 't5']],
      ['OJO', 'Usar los equipos NO es del jefe.', ['t6']]] },
  trabajador: { t: 'LO QUE TIENE QUE HACER DAMIAN', f: 'prevencion', solo: true,
    x: caja('tra', 38, 100, 26, 64, '#f97316') + tag('t1', 170, 50, 'USAR los equipos de protección', '#22c55e') + tag('t2', 170, 76, 'RESPETAR los métodos de trabajo', '#22c55e') +
      tag('t3', 170, 102, '"utilizar medidas de salud" → NO existe', '#ef4444'),
    fr: [['1. USAR', 'Los equipos de protección que le dan.', ['tra', 't1']], ['2. RESPETAR', 'Los métodos de trabajo: hacer las cosas como le enseñaron.', ['tra', 't1', 't2']],
      ['PREGUNTA TRAMPA', '"Utilizar las medidas de salud" no es una obligación.', ['t3']]] },
  coste: { t: 'CUÁNTO CUESTA UN ACCIDENTE', f: null,
    x: persona('p1', 60, 120, '#f97316', 1.4) + `<g id="p2"><rect x="130" y="70" width="60" height="70" rx="6" fill="#1e3a8a"/><rect x="140" y="80" width="12" height="12" fill="#93c5fd"/><rect x="168" y="80" width="12" height="12" fill="#93c5fd"/><rect x="140" y="104" width="12" height="12" fill="#93c5fd"/><rect x="168" y="104" width="12" height="12" fill="#93c5fd"/></g>` +
      `<g id="p3">${persona('', 245, 125, '#64748b', 0.9)}${persona('', 270, 125, '#0ea5e9', 0.9)}${persona('', 295, 125, '#a855f7', 0.9)}</g>` +
      `<text x="60" y="175" text-anchor="middle" font-size="9.5" font-weight="900" fill="#fff">TRABAJADOR</text><text x="160" y="175" text-anchor="middle" font-size="9.5" font-weight="900" fill="#fff">EMPRESA</text><text x="270" y="175" text-anchor="middle" font-size="9.5" font-weight="900" fill="#fff">SOCIEDAD</text>` +
      `<g id="eur"><text x="60" y="58" text-anchor="middle" font-size="22" font-weight="900" fill="#ef4444">−€</text><text x="160" y="58" text-anchor="middle" font-size="22" font-weight="900" fill="#ef4444">−€</text><text x="270" y="58" text-anchor="middle" font-size="22" font-weight="900" fill="#ef4444">−€</text></g>` +
      tag('t1', 160, 192, 'prevenir = más motivación, mejores relaciones, más satisfacción', '#22c55e'),
    fr: [['UN GRAN COSTE ECONÓMICO', 'Un accidente cuesta mucha plata.', ['eur']],
      ['¿A QUIÉN?', 'Al trabajador, a la empresa y a toda la sociedad.', ['eur', 'p1', 'p2', 'p3']],
      ['PREVENIR TRAE COSAS BUENAS', 'Más motivación, mejores relaciones y más satisfacción. Todas.', ['t1']]] },
  accidente: { t: '¿QUÉ ES UN ACCIDENTE DE TRABAJO?', f: 'medico',
    x: caja('bra', 105, 128, 44, 26, '#ef4444') + tag('t1', 70, 40, 'LESIÓN EN EL CUERPO', '#ef4444') + tag('t2', 250, 40, 'en el trabajo') + tag('t3', 250, 64, 'o IN ITINERE (en el camino)') +
      tag('t4', 250, 88, 'enfermedad que empeora: también', '#fbbf24'),
    fr: [['DAMIAN SE CORTA EL BRAZO', 'Descargando. Termina en el médico.', ['bra']],
      ['TIENE QUE HABER LESIÓN', 'Una lesión en el cuerpo que el trabajador sufre por el trabajo.', ['bra', 't1']],
      ['¿DÓNDE?', 'En el trabajo o in itinere: yendo o volviendo del trabajo.', ['t2', 't3']],
      ['SI YA ESTABA ENFERMO', 'Y el accidente lo empeora: también es accidente de trabajo.', ['t4']]] },
  enfermedad: { t: 'LA ENFERMEDAD PROFESIONAL', f: 'medico',
    x: caja('doc', 200, 40, 70, 160, '#22c55e') + tag('t1', 75, 40, 'viene DEL TRABAJO que hacés') + tag('t2', 75, 64, 'la tienen MUCHOS de ese trabajo') +
      tag('t3', 75, 88, 'la reconoce SANIDAD', '#22c55e'),
    fr: [['ENFERMEDAD PROFESIONAL', 'La que te agarrás por el trabajo que hacés.', ['t1']],
      ['DE UN TIPO DE TRABAJO', 'Y la tienen muchos de los que hacen ese trabajo.', ['t1', 't2']],
      ['¿QUIÉN DICE QUE LO ES?', 'Las autoridades sanitarias. No la mutua ni la empresa.', ['doc', 't3']]] },
  notraum: { t: 'EL ACCIDENTE SIN GOLPE', f: 'medico',
    x: `<g id="pul"><rect x="8" y="34" width="120" height="44" rx="8" fill="#0b1220" stroke="#ef4444"/><path d="M14 58 H40 l6 -16 l8 30 l6 -14 H122" fill="none" stroke="#ef4444" stroke-width="2.5"/></g>` +
      tag('t1', 68, 96, 'aparece DE REPENTE', '#ef4444') + tag('t2', 68, 120, 'las bajas MÁS LARGAS', '#fbbf24') + tag('t3', 68, 144, 'del 36 al 45 % de los muertos', '#ef4444'),
    fr: [['NO TRAUMÁTICO = SIN GOLPE', 'Una enfermedad que aparece de golpe, sin violencia. Ej: un infarto.', ['pul']],
      ['APARECE DE REPENTE', 'O empeora de repente.', ['pul', 't1']], ['LAS BAJAS MÁS LARGAS', 'Son las que más duran.', ['t2']],
      ['DEL 36 AL 45 %', 'De los muertos en el trabajo en España.', ['t3']]] },
  numeros: { t: 'EL TRANSPORTE, EN NÚMEROS', f: null,
    x: barra('b1', 40, 170, 60, 120, '#ef4444', 'TRANSPORTE', '1º') + barra('b2', 130, 170, 60, 80, '#64748b', 'otros', '') + barra('b3', 220, 170, 60, 55, '#64748b', 'otros', '') +
      tag('t1', 160, 40, 'causa nº 1: los ACCIDENTES DE TRÁFICO', '#ef4444') + tag('t2', 220, 80, 'bajas: MÁS que la media', '#fbbf24') + tag('t3', 220, 104, 'siempre VARIAS causas juntas'),
    fr: [['LA CAUSA NÚMERO 1', 'De accidentes laborales en el transporte: los de tráfico.', ['t1']],
      ['PRIMERO EN MUERTOS', 'El transporte por carretera es el sector con más muertos. Ninguna ocupación lo supera.', ['b1']],
      ['BAJAS MÁS LARGAS', 'Duran más que la media de los otros trabajos.', ['t2']],
      ['VARIAS CAUSAS', 'Un accidente es la suma de varias causas. Un ritmo tranquilo no causa accidentes.', ['t3']]] },
  sobre: { t: 'EL SOBREESFUERZO', f: 'levantar',
    x: caja('dam', 112, 66, 88, 124, '#f97316') + `<g id="col" opacity="0"><path d="M150 90 Q140 104 133 122" fill="none" stroke="#ef4444" stroke-width="4" stroke-linecap="round"/></g>` +
      tag('t1', 58, 44, 'nº 1: SOBREESFUERZOS', '#ef4444') + tag('t2', 58, 70, 'puede dar: hernia de disco', '#fbbf24') + tag('t3', 58, 96, 'cargar, descargar y mantenimiento'),
    fr: [['FORZAR EL CUERPO DE MÁS', 'El accidente más común del camionero: el sobreesfuerzo.', ['dam', 't1']],
      ['HERNIA DE DISCO', 'Un problema en la columna que viene de un sobreesfuerzo.', ['col', 't2']],
      ['LOS RIESGOS PRINCIPALES', 'Al cargar y descargar, y al hacer el mantenimiento del camión.', ['t3']]] },
  vibra: { t: 'VIBRACIONES Y CAÍDAS', f: 'cabina',
    x: caja('rue', 238, 140, 80, 58, '#fbbf24') + caja('esc', 183, 128, 28, 44, '#ef4444') +
      `<g id="ond" opacity="0"><path d="M240 136 q5 -6 10 0 t10 0 t10 0 t10 0 t10 0 t10 0 t10 0" fill="none" stroke="#fbbf24" stroke-width="2.5"/></g>` +
      tag('t1', 70, 44, 'amortiguadores mal = VIBRACIONES', '#fbbf24') + tag('t2', 70, 70, 'vibraciones → artrosis de codo', '#fbbf24') + tag('t3', 70, 96, 'escalera rota = caída a DISTINTO nivel', '#ef4444') +
      tag('t4', 70, 122, 'mismo nivel = tropezar en el piso'),
    fr: [['AMORTIGUADORES MAL CUIDADOS', 'Vibraciones todo el día en el cuerpo.', ['rue', 'ond', 't1']],
      ['ARTROSIS DE CODO', 'Puede venir de las vibraciones.', ['ond', 't2']],
      ['ESCALERA ROTA', 'Riesgo de caída a distinto nivel: de arriba hacia abajo.', ['esc', 't3']],
      ['MISMO NIVEL', 'Es tropezar en el piso. Distinto nivel es caer desde una altura.', ['t4']]] },
  muelle: { t: 'ATROPELLOS EN EL MUELLE', f: 'muelle',
    x: caja('pas', 100, 136, 80, 64, '#fbbf24') + caja('tor', 156, 90, 64, 52, '#ef4444') + caja('dam', 126, 82, 26, 50, '#f97316') +
      tag('t1', 60, 44, 'cada uno EN SU ZONA', '#22c55e') + tag('t2', 60, 70, 'meterse en zona prohibida', '#ef4444') + tag('t3', 60, 96, 'máquina que no va') + tag('t4', 60, 122, 'camión sin frenar bien') +
      tag('t5', 60, 150, 'los que más matan: atropellos y caídas', '#ef4444'),
    fr: [['EL PASILLO PEATONAL', 'Damian camina por su zona, lejos de la carretilla.', ['pas', 'dam', 't1']],
      ['¿POR QUÉ HAY ATROPELLOS?', 'Porque alguien se mete en una zona de trabajo prohibida.', ['tor', 't2']],
      ['OTRAS CAUSAS', 'Una máquina que no sirve para ese lugar o el camión sin inmovilizar.', ['t3', 't4']],
      ['LOS QUE MÁS MATAN', 'Los atropellos y las caídas a distinto nivel.', ['t5']]] },
  lista: { t: 'LOS OTROS PELIGROS', f: 'prevencion', solo: true,
    x: tag('t1', 160, 40, 'ELECTRICIDAD: cables rotos, conexiones, cables de luz', '#fbbf24') + tag('t2', 160, 64, 'TÓXICOS: tocarlos sin el EPI', '#a855f7') +
      tag('t3', 160, 88, 'le pasan TODOS: caídas, golpes, vibraciones…', '#22d3ee') + tag('t4', 160, 112, 'el que MENOS pasa: máquina que vuelca', '#22c55e') +
      tag('t5', 160, 136, 'choque con TU AUTO: no es del transporte', '#ef4444'),
    fr: [['ELECTRICIDAD', 'Conexiones mal hechas, cables rotos o la carga tocando cables de luz.', ['t1']],
      ['PRODUCTOS TÓXICOS', 'Dañan cuando los tocás sin el equipo de protección.', ['t2']],
      ['LA LISTA', 'Sobreesfuerzos, caídas, vibraciones, atropellos, golpes: todos.', ['t3']],
      ['EL MENOS FRECUENTE', 'Que te aplaste una máquina que vuelca.', ['t4']],
      ['NO ES DEL TRANSPORTE', 'Un choque con tu auto particular.', ['t5']]] },
  cabina: { t: 'SUBIR Y BAJAR DE LA CABINA', f: 'cabina',
    x: caja('as', 183, 76, 28, 26, '#22c55e') + caja('esc', 183, 128, 28, 44, '#22c55e') + caja('dam', 150, 62, 56, 118, '#f97316') +
      tag('t1', 70, 44, 'DE FRENTE a la cabina', '#22c55e') + tag('t2', 70, 70, 'agarrado de los ASIDEROS', '#22c55e') + tag('t3', 70, 96, 'pisando los ESCALONES', '#22c55e') +
      tag('t4', 70, 130, 'NUNCA SALTAR', '#ef4444') + tag('t5', 70, 156, 'columna · rodillas · tobillos', '#ef4444'),
    fr: [['DE FRENTE A LA CABINA', 'Así baja Damian, sin darle la espalda.', ['dam', 't1']],
      ['LOS ASIDEROS', 'Las manijas: se agarra fuerte.', ['as', 't2']], ['LOS ESCALONES', 'Los pisa de a uno.', ['esc', 't3']],
      ['NUNCA SALTAR', 'Daña la columna, las rodillas y los tobillos.', ['t4', 't5']],
      ['DESPUÉS DE MANEJAR MUCHO', 'Saltar puede dar una distensión muscular.', ['t4']]] },
  levantar: { t: 'CUÁNTO PESO SE PUEDE LEVANTAR', f: 'levantar',
    x: caja('rod', 120, 128, 40, 40, '#22c55e') + caja('esp', 118, 80, 50, 42, '#22c55e') + caja('box', 150, 128, 46, 34, '#fbbf24') +
      tag('k1', 55, 44, '25 kg máximo', '#22c55e') + tag('k2', 55, 70, '15 kg: mujeres, jóvenes, mayores', '#fbbf24') + tag('k3', 55, 96, '40 kg: de vez en cuando + entrenado', '#ef4444') +
      tag('k4', 55, 122, '10.000 kg por día (menos de 10 m)'),
    fr: [['MANIPULAR CARGAS', 'Mover o sujetar una carga. Mejor con máquinas que a mano.', ['box']],
      ['25 KG', 'Lo máximo aconsejado para levantar de pie.', ['k1']], ['15 KG', 'Para mujeres, jóvenes y trabajadores mayores.', ['k2']],
      ['40 KG', 'Solo de vez en cuando y si el trabajador está entrenado.', ['k3']],
      ['EN UN DÍA', 'No más de 10.000 kg a mano, a menos de 10 metros.', ['k4']],
      ['RODILLAS DOBLADAS', 'Espalda derecha y la caja pegada al cuerpo.', ['rod', 'esp', 'box']]] },
  epi: { t: 'LOS EPI DE DAMIAN', f: 'epi',
    x: tag('t1', 160, 40, 'EPI = Equipo de Protección Individual', '#22d3ee') + tag('k1', 70, 68, 'I: riesgos chicos', '#22c55e') + tag('k2', 160, 68, 'II: medios', '#fbbf24') +
      tag('k3', 252, 68, 'III: mortales', '#ef4444') + caja('arn', 222, 76, 86, 86, '#ef4444'),
    fr: [['EPI', 'Equipo de Protección Individual: lo que cada uno se pone para cuidarse.', ['t1']],
      ['¿PARA QUÉ?', 'Para evitar o achicar las lesiones.', ['t1']],
      ['CATEGORÍAS I Y II', 'Riesgos chicos y riesgos medios.', ['k1', 'k2']],
      ['CATEGORÍA III', 'Riesgos que te pueden matar o dejar daño para siempre. Ej: el arnés.', ['k3', 'arn']]] },
  ce: { t: 'LA MARCA CE', f: null,
    x: `<rect x="50" y="28" width="220" height="112" rx="12" fill="#f8fafc"/><g id="ce"><text x="125" y="112" text-anchor="middle" font-size="66" font-weight="900" fill="#0f172a" font-family="Arial">CE</text></g>` +
      `<g id="num"><text x="235" y="110" text-anchor="middle" font-size="26" font-weight="900" fill="#0f172a" font-family="Arial">0123</text></g>` +
      tag('t1', 160, 156, 'categoría III: + número de 4 cifras') + tag('t3', 160, 176, 'folleto con instrucciones de uso', '#fbbf24') +
      tag('t4', 160, 196, 'usarlo, cuidarlo, guardarlo, avisar si se rompe', '#22c55e'),
    fr: [['LA MARCA CE', 'Todo EPI aprobado la lleva.', ['ce']],
      ['CATEGORÍA III', 'Al lado de la CE, un número de 4 cifras.', ['num', 't1']],
      ['EL FOLLETO', 'Siempre se vende con las instrucciones de uso.', ['t3']],
      ['LO QUE HACE DAMIAN', 'Lo usa y lo cuida, lo guarda en su lugar y avisa si está roto.', ['t4']]] },
  cuerpo: { t: 'CADA PARTE DEL CUERPO, SU EPI', f: 'epi', solo: true,
    x: caja('b1', 18, 100, 50, 46) + caja('b2', 14, 144, 24, 18) + caja('b3', 44, 140, 42, 22) + caja('b4', 84, 136, 56, 28) + caja('b5', 88, 96, 50, 46) +
      caja('b6', 196, 140, 24, 22) + caja('b7', 142, 110, 60, 34) + caja('b8', 138, 140, 62, 20) + caja('b9', 220, 58, 90, 104) +
      ['CABEZA → el casco', 'OÍDOS → los tapones', 'OJOS Y CARA → las gafas', 'MANOS → los guantes', 'PIES → el calzado de protección', 'PIEL → la crema', 'TRONCO → la faja', 'RESPIRAR → la mascarilla', 'TODO EL CUERPO → el arnés']
        .map((s, i) => tag('t' + (i + 1), 160, 46, s)).join(''),
    fr: [['CABEZA', 'El casco.', ['b1', 't1']], ['OÍDOS', 'Los tapones.', ['b2', 't2']], ['OJOS Y CARA', 'Las gafas de montura integral.', ['b3', 't3']],
      ['MANOS Y BRAZOS', 'Los guantes (por ejemplo contra el calor).', ['b4', 't4']], ['PIES Y PIERNAS', 'El calzado de protección (por ejemplo contra el frío).', ['b5', 't5']],
      ['PIEL', 'Las cremas de protección.', ['b6', 't6']], ['TRONCO Y ABDOMEN', 'La faja.', ['b7', 't7']], ['PARA RESPIRAR', 'Mascarillas y equipos de respiración.', ['b8', 't8']],
      ['TODO EL CUERPO', 'El arnés contra caídas y la ropa de protección.', ['b9', 't9']]] }
};

// Estos se apagan del todo cuando no les toca
const OCULTOS = ['x1', 'col', 'ond', 'num'];

export function montarAnim(contenedor, nombre, opts = {}) {
  const pausado = opts.pausado || (() => false);
  const d = A[nombre] || A.contrato;
  contenedor.innerHTML = `<svg viewBox="0 0 320 260" xmlns="${NS}" style="width:100%;height:auto;display:block">${FONDO(d.t)}${d.f ? foto(d.f) : ''}${d.x || ''}${CARTEL}</svg>`;
  const q = id => contenedor.querySelector('#' + id);
  let t = 0, ultimo = performance.now(), vivo = true, prev = -1;
  const todosIds = [...new Set(d.fr.flatMap(f => f[2]))];
  function cuadro(ahora) {
    if (!vivo) return;
    const dt = pausado() ? 0 : Math.max(0, Math.min(0.05, (ahora - ultimo) / 1000)); ultimo = ahora; t += dt;
    const fr = d.fr, k = Math.floor(t / 4.8) % fr.length, f = fr[k];
    if (k !== prev) { q('c1').textContent = f[0]; q('c2').textContent = f[1]; prev = k; }
    const br = (0.55 + 0.45 * Math.abs(Math.sin(t * 2.4))).toFixed(2);
    todosIds.forEach(id => {
      const el = q(id); if (!el) return;
      const apagado = (d.solo || el.tagName === 'rect' || OCULTOS.includes(id)) ? 0 : 0.3;
      el.setAttribute('opacity', f[2].includes(id) ? (el.tagName === 'rect' ? br : Math.max(0.85, br)) : apagado);
    });
    requestAnimationFrame(cuadro);
  }
  requestAnimationFrame(cuadro);
  return () => { vivo = false; };
}
