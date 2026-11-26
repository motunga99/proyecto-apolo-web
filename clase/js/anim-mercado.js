// ==========================================
// ANIMACIONES DEL TEMA MERCADO DEL TRANSPORTE
// Fotos de Gemini (ilustraciones/mer-*.webp) con carteles y recuadros dibujados encima.
// Misma forma de uso que las otras: montarAnim(div, nombre, { pausado })
// ==========================================

const NS = 'http://www.w3.org/2000/svg';
const S = 320 / 1376, Y0 = 22;            // fotos de 1376 x 768
const foto = n => `<image href="ilustraciones/mer-${n}.webp" x="0" y="${Y0}" width="320" height="${(768 * S).toFixed(1)}"/>`;
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
const flecha = (id, x1, y1, x2, y2, color = '#fbbf24') => `<g id="${id}" opacity="0.3"><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="3"/><circle cx="${x2}" cy="${y2}" r="4" fill="${color}"/></g>`;
const caja2 = (id, x, y, w, h, txt, color, sub = '') => `<g id="${id}" opacity="0.3"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="#0f172a" stroke="${color}" stroke-width="2.5"/><text x="${x + w / 2}" y="${y + (sub ? h / 2 - 2 : h / 2 + 4)}" text-anchor="middle" font-size="11" font-weight="900" fill="#fff">${txt}</text>${sub ? `<text x="${x + w / 2}" y="${y + h / 2 + 12}" text-anchor="middle" font-size="8.5" font-weight="700" fill="${color}">${sub}</text>` : ''}</g>`;
const A = {
  propio: { t: 'CUENTA AJENA O CUENTA PROPIA', f: 'propio',
    x: caja('fab', 20, 48, 160, 104, '#22c55e') + caja('tf', 92, 108, 92, 46, '#22c55e') + caja('tt', 160, 108, 142, 80, '#f97316') +
      tag('t1', 90, 40, 'CUENTA PROPIA = PRIVADO', '#22c55e') + tag('t2', 236, 196, 'CUENTA AJENA = PÚBLICO', '#f97316') + tag('t3', 100, 170, 'privado complementario', '#22c55e'),
    fr: [['CUENTA AJENA', 'Damian lleva la carga de otros y le pagan: transporte público.', ['tt', 't2']],
      ['CUENTA PROPIA', 'La fábrica lleva sus cosas con su camión: transporte privado.', ['fab', 'tf', 't1']],
      ['PRIVADO COMPLEMENTARIO', 'Su camión, su gente, sus cosas. Pero su negocio no es el transporte.', ['tf', 't3']],
      ['SEGÚN SU NATURALEZA', 'Así se clasifican en públicos y privados.', ['t1', 't2']]] },
  clases: { t: 'LAS CLASES DE TRANSPORTE', f: null,
    x: caja2('k1', 14, 34, 140, 52, 'OBJETO = ¿QUÉ?', '#22d3ee', 'viajeros o mercancías') + caja2('k2', 166, 34, 140, 52, 'ÁMBITO = ¿DÓNDE?', '#fbbf24', 'interior o internacional') +
      caja2('k3', 14, 96, 140, 52, 'NATURALEZA', '#f97316', 'público o privado') + caja2('k4', 166, 96, 140, 52, 'RÉGIMEN JURÍDICO', '#a855f7', 'ordinario o especial') +
      tag('t1', 160, 168, 'INTERIOR = no sale del país', '#fbbf24') + tag('t2', 160, 190, 'INTERNACIONAL = pasa por otro país, aunque sea un poco', '#fbbf24'),
    fr: [['SEGÚN SU OBJETO', '¿Qué se lleva? Viajeros o mercancías.', ['k1']], ['SEGÚN SU ÁMBITO', '¿Dónde? Interiores o internacionales.', ['k2']],
      ['SEGÚN SU NATURALEZA', '¿Para quién? Públicos o privados.', ['k3']], ['ESPECIFICIDAD Y RÉGIMEN JURÍDICO', 'Ordinarios o especiales.', ['k4']],
      ['INTERIOR', 'El que no sale de un país (aunque cruce comunidades).', ['k2', 't1']], ['INTERNACIONAL', 'El que pasa, aunque sea un poco, por otro país.', ['k2', 't2']]] },
  modos: { t: 'LA CARRETERA ES LA REINA', f: 'modos',
    x: caja('cam', 155, 116, 125, 72, '#f97316') + caja('tren', 0, 88, 320, 24, '#64748b') + caja('bar', 46, 74, 98, 18, '#64748b') + caja('avi', 200, 38, 50, 20, '#64748b') +
      tag('t1', 70, 40, 'nº 1: LA CARRETERA', '#f97316') + tag('t2', 80, 150, 'la que más empleo da', '#22c55e') + tag('t3', 80, 172, '50 % del sector', '#fbbf24') + tag('t4', 80, 194, 'transporte = 5 % de la economía', '#22d3ee'),
    fr: [['TREN, BARCO, AVIÓN…', 'Hay muchos modos de transporte.', ['tren', 'bar', 'avi']],
      ['LA CARRETERA, PRIMERO', 'El modo más importante para las mercancías en España.', ['cam', 't1']],
      ['MÁS EMPLEO', 'Es el modo que más trabajo da.', ['cam', 't2']],
      ['LA MITAD', 'La carretera es el 50 % de lo que produce el transporte.', ['t3']],
      ['EL 5 %', 'El transporte es el 5 % de la economía española.', ['t4']]] },
  sector: { t: 'POR QUÉ IMPORTA Y SUS PROBLEMAS', f: 'almacen', solo: true,
    x: tag('t1', 160, 40, 'arrastra: fábricas de camiones, combustible, venta de vehículos', '#22c55e') + tag('t2', 160, 64, 'retiene a las empresas', '#22c55e') +
      tag('t3', 160, 88, 'en las crisis, SUFRE', '#ef4444') + tag('t4', 160, 112, 'lo peor: los ACCIDENTES', '#ef4444') + tag('t5', 160, 136, 'atascos = pérdida de plata', '#fbbf24') +
      tag('t6', 160, 160, 'muchas empresas chicas = problema', '#ef4444') + tag('t7', 160, 184, 'empresa chica: el dueño maneja', '#22d3ee'),
    fr: [['EL EFECTO ARRASTRE', 'El transporte mueve otros negocios: fábricas, combustible, venta de camiones.', ['t1']],
      ['RETIENE EMPRESAS', 'Con buen transporte, las empresas se quedan.', ['t1', 't2']],
      ['LAS CRISIS', 'Si se vende menos, se lleva menos: el transporte sufre.', ['t3']],
      ['LO MALO', 'Los accidentes. Y los atascos hacen perder plata.', ['t4', 't5']],
      ['ATOMIZACIÓN', 'Muchísimas empresas chicas: cuesta formar a la gente.', ['t6']],
      ['CHICAS Y GRANDES', 'En la chica, el dueño maneja. La grande consigue préstamos más baratos.', ['t6', 't7']]] },
  jefes: { t: 'EL GERENTE Y EL JEFE DE TRÁFICO', f: 'empresa',
    x: caja('ger', 14, 46, 116, 96, '#a855f7') + caja('tra', 118, 84, 46, 58, '#22d3ee') +
      tag('t1', 70, 196, 'GERENTE: decide, coordina y representa', '#a855f7') + tag('t2', 210, 34, 'JEFE DE TRÁFICO: rutas y camiones', '#22d3ee'),
    fr: [['EL GERENTE', 'Planifica, coordina y representa a la empresa.', ['ger', 't1']],
      ['DECISIONES GRANDES', 'Las estratégicas: por ejemplo, comprar más camiones.', ['ger', 't1']],
      ['EL JEFE DE TRÁFICO', 'Planifica servicios y rutas y reparte las órdenes de ruta.', ['tra', 't2']],
      ['LA FLOTA', 'Gestiona los camiones y vigila que se cumplan las normas.', ['tra', 't2']]] },
  equipo: { t: 'COMERCIAL, ADMINISTRATIVO Y CONDUCTOR', f: 'empresa',
    x: caja('com', 172, 96, 32, 46, '#22c55e') + caja('adm', 206, 92, 36, 44, '#fbbf24') + caja('con', 266, 80, 34, 64, '#f97316') +
      tag('t1', 90, 160, 'COMERCIAL: clientes, ofertas, presupuestos', '#22c55e') + tag('t2', 90, 182, 'ADMINISTRATIVO: contabilidad, nóminas, archivo', '#fbbf24') +
      tag('t3', 160, 34, 'CONDUCTOR: vigila el camión y la carga', '#f97316'),
    fr: [['EL COMERCIAL', 'Busca trabajos, hace ofertas y presupuestos y contrata.', ['com', 't1']],
      ['EL COMERCIAL DA LA CARA', 'Seguimiento, estadísticas y responder si hubo un problema.', ['com', 't1']],
      ['EL ADMINISTRATIVO', 'Contabilidad, nóminas y archivo de papeles.', ['adm', 't2']],
      ['EL CONDUCTOR', 'Además de manejar, vigila el camión y cómo se coloca la carga.', ['con', 't3']]] },
  puerto: { t: 'AGENCIAS, TRANSITARIOS Y OPERADORES', f: 'puerto', solo: true,
    x: caja('bar', 222, 84, 84, 30, '#22d3ee') + caja('cam', 76, 146, 160, 32, '#f97316') +
      tag('t1', 160, 40, 'AGENCIA: intermedia, en nombre propio', '#fbbf24') + tag('t2', 160, 40, 'TRANSITARIO: transporte INTERNACIONAL', '#22d3ee') +
      tag('t3', 160, 40, 'OPERADOR LOGÍSTICO: lo gestiona todo', '#22c55e') + tag('t4', 160, 64, 'autorización de OPERADOR DE TRANSPORTE', '#a855f7'),
    fr: [['LA AGENCIA', 'La única que puede intermediar entre cargador y transportista. En nombre propio.', ['t1', 'cam']],
      ['EL TRANSITARIO', 'Especialista en organizar transportes internacionales.', ['t2', 'bar']],
      ['EL OPERADOR LOGÍSTICO', 'Aprovisionamiento, transporte y distribución. Camiones propios y ajenos.', ['t3', 'cam']],
      ['LA AUTORIZACIÓN', 'Transitario y operador logístico: la de operador de transporte.', ['t4']]] },
  almacen: { t: 'ALMACENES Y CENTROS DE TRANSPORTE', f: 'almacen',
    x: caja('alm', 10, 40, 230, 120, '#22c55e') + caja('par', 190, 80, 110, 90, '#fbbf24') +
      tag('t1', 90, 186, 'ALMACENISTA: guarda y reparte', '#22c55e') + tag('t2', 240, 186, 'centro = 1 gestor + servicios', '#fbbf24') + tag('t3', 230, 40, 'solo estacionar ≠ centro', '#ef4444'),
    fr: [['EL ALMACENISTA-DISTRIBUIDOR', 'Guarda la mercancía de otros y la reparte. Actividad auxiliar.', ['alm', 't1']],
      ['CÓMO REPARTE', 'Con sus camiones o contratando transportistas. Siempre en nombre propio.', ['alm', 't1']],
      ['CENTRO DE TRANSPORTE', 'Un solo gestor y muchos servicios juntos.', ['alm', 'par', 't2']],
      ['NO ES UN CENTRO', 'Un terreno que solo sirve para estacionar camiones.', ['par', 't3']]] },
  colabora: { t: 'CUANDO DAMIAN LE PASA UN VIAJE A OTRO', f: null,
    x: caja2('cli', 12, 70, 84, 46, 'CLIENTE', '#22d3ee') + caja2('dam', 118, 70, 84, 46, 'DAMIAN', '#f97316') + caja2('ped', 224, 70, 84, 46, 'PEDRO', '#22c55e') +
      caja2('adm', 118, 146, 84, 40, 'ADMINISTRACIÓN', '#a855f7') +
      flecha('f1', 96, 93, 116, 93, '#22d3ee') + flecha('f2', 202, 93, 222, 93, '#22c55e') + flecha('f3', 160, 118, 160, 144, '#a855f7') +
      tag('t1', 70, 48, 'aquí Damian = TRANSPORTISTA', '#22d3ee') + tag('t2', 250, 48, 'aquí Damian = CARGADOR', '#22c55e') + tag('t3', 250, 166, 'OPERADOR', '#a855f7') +
      tag('t4', 160, 196, 'máximo: 100 % de sus camiones', '#fbbf24'),
    fr: [['TRABAJAR EN COLABORACIÓN', 'Damian no tiene camión libre y le pasa el viaje a Pedro.', ['cli', 'dam', 'ped']],
      ['FRENTE AL CLIENTE', 'Damian es el transportista y responde de todo el viaje.', ['cli', 'dam', 'f1', 't1']],
      ['FRENTE A PEDRO', 'Damian es el cargador: el que le encarga el viaje.', ['dam', 'ped', 'f2', 't2']],
      ['FRENTE A LA ADMINISTRACIÓN', 'Damian responde como operador de transportes.', ['adm', 'f3', 't3']],
      ['EL LÍMITE', 'Sin requisitos de operador: hasta el 100 % de sus camiones.', ['t4']]] },
  quien: { t: 'QUIÉN ES QUIÉN EN EL CONTRATO', f: 'carga',
    x: caja('car', 236, 92, 50, 104, '#22d3ee') + caja('exp', 100, 74, 34, 68, '#fbbf24') + caja('por', 196, 86, 42, 106, '#f97316') +
      tag('t1', 70, 34, 'CARGADOR: el que contrata', '#22d3ee') + tag('t2', 70, 56, 'EXPEDIDOR: entrega la carga', '#fbbf24') + tag('t3', 250, 34, 'PORTEADOR: el que lleva', '#f97316') +
      tag('t4', 250, 56, 'DESTINATARIO: el que recibe') + tag('t5', 110, 178, 'precio: Observatorio de Costes', '#22c55e'),
    fr: [['EL CARGADOR', 'El que contrata el transporte.', ['car', 't1']], ['EL EXPEDIDOR', 'El que entrega la mercancía al camión por cuenta del cargador.', ['exp', 't2']],
      ['EL PORTEADOR', 'El que lleva la carga: la empresa de Damian.', ['por', 't3']], ['EL DESTINATARIO', 'El que la recibe al final.', ['t4']],
      ['EL PRECIO', 'Sin pacto: el del Observatorio de Costes. Si sube el combustible, se revisa.', ['t5']]] },
  carga: { t: 'LA CARGA Y LA DESCARGA', f: 'carga',
    x: caja('pal', 100, 74, 80, 70, '#fbbf24') + caja('rel', 196, 86, 42, 106, '#f97316') +
      `<g id="reloj" opacity="0.3"><circle cx="60" cy="80" r="30" fill="#0f172a" stroke="#22d3ee" stroke-width="3"/><line x1="60" y1="80" x2="60" y2="58" stroke="#fff" stroke-width="3"/><line x1="60" y1="80" x2="76" y2="80" stroke="#fff" stroke-width="3"/><text x="60" y="128" text-anchor="middle" font-size="12" font-weight="900" fill="#67e8f9">1 HORA</text></g>` +
      tag('t1', 60, 150, 'carga: 1 hora', '#22d3ee') + tag('t2', 60, 172, 'descarga: 1 hora', '#22d3ee') + tag('t3', 160, 34, 'sin hora pactada: antes de las 18 h', '#fbbf24') +
      tag('t4', 160, 196, 'los palets son parte del envío', '#22c55e'),
    fr: [['¿A QUÉ HORA?', 'Si se pactó el día pero no la hora: antes de las seis de la tarde.', ['t3']],
      ['UNA HORA PARA CARGAR', 'Desde que el camión está listo.', ['reloj', 't1', 'rel']],
      ['UNA HORA PARA DESCARGAR', 'Si tarda más, Damian puede cobrar la espera.', ['reloj', 't2']],
      ['¿CUÁNDO LA RECIBE?', 'Cuando está cargada y estibada.', ['pal']],
      ['LOS PALETS', 'Son parte del envío. Devolverlos es otro transporte.', ['pal', 't4']]] },
  entrega: { t: 'LA ENTREGA Y SI ALGO SALE MAL', f: 'entrega',
    x: caja('dam', 206, 92, 34, 82, '#f97316') + caja('rec', 240, 96, 40, 78, '#22d3ee') + caja('cam', 0, 40, 176, 136, '#64748b') +
      tag('t1', 100, 34, 'plazo: el de un transportista CUIDADOSO', '#22c55e') + tag('t2', 100, 34, 'después de las 18 h → 9 h del día siguiente', '#fbbf24') +
      tag('t3', 100, 34, 'no está nadie → depósito en la Junta', '#a855f7') + tag('t4', 100, 34, 'caso fortuito → no responde', '#22c55e') +
      tag('t5', 100, 34, 'carga dañada → máx. 1/3 IPREM por kilo', '#ef4444'),
    fr: [['¿CUÁNDO ENTREGA?', 'En el tiempo de un transportista cuidadoso. Paquetería: 24 h más.', ['dam', 'rec', 't1']],
      ['DESPUÉS DE LAS SEIS', 'Entrega a las nueve de la mañana siguiente.', ['t2']],
      ['NO ESTÁ EL QUE RECIBE', 'Si nadie le dice qué hacer: depósito en la Junta Arbitral.', ['cam', 't3']],
      ['CASO FORTUITO', 'Algo que nadie podía evitar: el porteador no responde.', ['t4']],
      ['SI SE DAÑA LA CARGA', 'Como máximo, un tercio del IPREM diario por kilo.', ['t5']]], solo: true },
  palabras: { t: 'LAS PALABRAS DEL SEGURO', f: 'seguro', solo: true,
    x: caja('per', 86, 98, 76, 102, '#22d3ee') + caja('gol', 132, 118, 34, 30, '#ef4444') +
      ['TOMADOR: firma y paga', 'ASEGURADO: al que cubre', 'BENEFICIARIO: el que cobra', 'PRIMA: lo que se paga', 'SINIESTRO: lo que pasó', 'PÓLIZA: el papel', 'avisar en 7 DÍAS']
        .map((s, i) => tag('t' + i, 70, 36, s, i === 6 ? '#ef4444' : '#22d3ee')).join(''),
    fr: [['TOMADOR', 'El que firma el seguro y paga.', ['t0']], ['ASEGURADO', 'La persona a la que cubre el seguro.', ['t1']],
      ['BENEFICIARIO', 'El que cobra la indemnización.', ['t2']], ['PRIMA', 'Lo que se paga por el seguro.', ['t3']],
      ['SINIESTRO', 'Lo que pasó: el accidente que causa el daño.', ['t4', 'gol']], ['PÓLIZA', 'El papel del seguro.', ['t5', 'per']],
      ['AVISAR EN 7 DÍAS', 'Ese es el plazo para avisar a la aseguradora.', ['t6']]] },
  obligatorio: { t: 'EL SEGURO OBLIGATORIO', f: 'seguro', solo: true,
    x: caja('con', 228, 40, 72, 160, '#ef4444') + tag('t1', 90, 40, 'lo contrata el PROPIETARIO', '#22d3ee') + tag('t2', 90, 64, 'personas: 70 millones', '#22c55e') + tag('t3', 90, 88, 'cosas: 15 millones', '#22c55e') +
      tag('t4', 90, 112, 'NO cubre al conductor culpable', '#ef4444') + tag('t5', 90, 136, 'ni la mercancía ni lo del dueño', '#ef4444') +
      tag('t6', 90, 160, 'sin seguro: precinto 1 mes', '#fbbf24') + tag('t7', 90, 184, 'multa 601 a 3.005 €', '#fbbf24'),
    fr: [['¿QUIÉN LO TIENE QUE TENER?', 'El propietario. Lo puede contratar cualquier interesado.', ['t1']],
      ['¿HASTA CUÁNTO PAGA?', '70 millones a personas y 15 millones a cosas, por siniestro.', ['t2', 't3']],
      ['EL CONDUCTOR CULPABLE', 'No cubre sus lesiones ni si muere.', ['con', 't4']],
      ['LO QUE NO CUBRE', 'Ni la mercancía, ni las cosas del dueño, del tomador ni de los parientes.', ['t5']],
      ['SIN SEGURO', 'No circula: precinto de un mes (después 3 meses y un año) y multa.', ['t6', 't7']]] },
  junta1: { t: '¿QUÉ ES UNA JUNTA ARBITRAL?', f: 'junta',
    x: caja('pre', 140, 86, 44, 48, '#fbbf24') + caja('voc', 30, 82, 104, 80, '#22d3ee') + caja('par', 208, 56, 90, 116, '#f97316') +
      tag('t1', 90, 36, 'peleas de plata (MERCANTILES)', '#22c55e') + tag('t2', 90, 58, 'transporte TERRESTRE', '#22c55e') + tag('t3', 160, 196, 'hasta 15.000 € se supone el sí', '#fbbf24'),
    fr: [['UNA MESA QUE DECIDE', 'El cliente no le paga a Damian: van a la Junta, no a juicio.', ['par']],
      ['PELEAS MERCANTILES', 'De plata y contratos del transporte terrestre: carretera y tren.', ['t1', 't2']],
      ['DEPÓSITOS Y PERITAJES', 'También guarda la mercancía y la revisa cuando hace falta.', ['pre', 'voc']],
      ['HASTA 15.000 €', 'Se supone que los dos aceptan, salvo que digan que no antes del viaje.', ['t3']]] },
  junta2: { t: 'CÓMO FUNCIONA LA JUNTA', f: 'junta',
    x: caja('pre', 140, 86, 44, 48, '#fbbf24') + caja('voc', 30, 82, 104, 80, '#22d3ee') + caja('par', 208, 56, 90, 116, '#f97316') +
      tag('t1', 90, 36, 'GRATIS · sin abogado', '#22c55e') + tag('t2', 160, 196, 'presidente + 2 a 4 vocales', '#fbbf24') + tag('t3', 250, 36, 'LAUDO en 6 meses', '#22d3ee') +
      tag('t4', 90, 58, 'elige el demandante', '#a855f7'),
    fr: [['GRATIS Y SIN ABOGADO', 'Se reclama con un escrito firmado. Solo se pagan las pruebas.', ['par', 't1']],
      ['QUIÉNES LA FORMAN', 'Un presidente (funcionario, licenciado en Derecho) y de 2 a 4 vocales.', ['pre', 'voc', 't2']],
      ['EL LAUDO', 'La decisión. En 6 meses, por mayoría. Si hay empate, decide el presidente.', ['pre', 't3']],
      ['¿QUÉ JUNTA?', 'Origen, destino o domicilio de la empresa. Elige el demandante.', ['t4']]] }
};

// Estos se apagan del todo cuando no les toca
const OCULTOS = ['x1', 'col', 'ond', 'num'];

export function montarAnim(contenedor, nombre, opts = {}) {
  const pausado = opts.pausado || (() => false);
  const d = A[nombre] || A.propio;
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
