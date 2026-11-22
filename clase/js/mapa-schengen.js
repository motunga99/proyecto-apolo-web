// ==========================================
// MAPA DE EUROPA: ESPACIO SCHENGEN
// Ventana que se puede mover, achicar y cerrar, con el mapa de Europa:
// cada país pintado según si está en Schengen y en la UE, con su bandera.
// Al tocar o pasar el mouse por un país, abajo dice cuál es y en qué grupo está.
// Datos libres y gratis de internet: world-atlas (mapa) y flagcdn (banderas).
// ==========================================
import { hacerMovible, hacerAchicable } from './ventana.js';

const URL_MAPA = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';
const URL_TOPOJSON = 'https://cdn.jsdelivr.net/npm/topojson-client@3/+esm';

// Código numérico del mapa → [bandera, grupo, nombre]
// grupos: 'ue' = UE y Schengen · 'noue' = Schengen sin ser UE · 'fuera_ue' = UE sin Schengen · 'fuera' = ninguno
const PAISES_SCHENGEN = {
  '724': ['es', 'ue', 'España'], '620': ['pt', 'ue', 'Portugal'], '250': ['fr', 'ue', 'Francia'], '056': ['be', 'ue', 'Bélgica'],
  '528': ['nl', 'ue', 'Países Bajos'], '442': ['lu', 'ue', 'Luxemburgo'], '276': ['de', 'ue', 'Alemania'], '040': ['at', 'ue', 'Austria'],
  '380': ['it', 'ue', 'Italia'], '705': ['si', 'ue', 'Eslovenia'], '191': ['hr', 'ue', 'Croacia'], '348': ['hu', 'ue', 'Hungría'],
  '703': ['sk', 'ue', 'Eslovaquia'], '203': ['cz', 'ue', 'Chequia'], '616': ['pl', 'ue', 'Polonia'], '440': ['lt', 'ue', 'Lituania'],
  '428': ['lv', 'ue', 'Letonia'], '233': ['ee', 'ue', 'Estonia'], '246': ['fi', 'ue', 'Finlandia'], '752': ['se', 'ue', 'Suecia'],
  '208': ['dk', 'ue', 'Dinamarca'], '300': ['gr', 'ue', 'Grecia'], '470': ['mt', 'ue', 'Malta'], '100': ['bg', 'ue', 'Bulgaria'],
  '642': ['ro', 'ue', 'Rumanía'],
  '756': ['ch', 'noue', 'Suiza'], '578': ['no', 'noue', 'Noruega'], '352': ['is', 'noue', 'Islandia'], '438': ['li', 'noue', 'Liechtenstein'],
  '372': ['ie', 'fuera_ue', 'Irlanda'], '196': ['cy', 'fuera_ue', 'Chipre'],
  '826': ['gb', 'fuera', 'Reino Unido'], '504': ['ma', 'fuera', 'Marruecos'], '792': ['tr', 'fuera', 'Turquía']
};
// Los 43 países del sistema de autorizaciones CEMT (lista del Foro Internacional del Transporte)
const CEMT = {
  '008': ['al', 'Albania'], '051': ['am', 'Armenia'], '040': ['at', 'Austria'], '031': ['az', 'Azerbaiyán'], '112': ['by', 'Bielorrusia'],
  '056': ['be', 'Bélgica'], '070': ['ba', 'Bosnia y Herzegovina'], '100': ['bg', 'Bulgaria'], '191': ['hr', 'Croacia'], '203': ['cz', 'Chequia'],
  '208': ['dk', 'Dinamarca'], '233': ['ee', 'Estonia'], '246': ['fi', 'Finlandia'], '250': ['fr', 'Francia'], '268': ['ge', 'Georgia'],
  '276': ['de', 'Alemania'], '300': ['gr', 'Grecia'], '348': ['hu', 'Hungría'], '372': ['ie', 'Irlanda'], '380': ['it', 'Italia'],
  '428': ['lv', 'Letonia'], '438': ['li', 'Liechtenstein'], '440': ['lt', 'Lituania'], '442': ['lu', 'Luxemburgo'], '470': ['mt', 'Malta'],
  '498': ['md', 'Moldavia'], '499': ['me', 'Montenegro'], '528': ['nl', 'Países Bajos'], '807': ['mk', 'Macedonia del Norte'], '578': ['no', 'Noruega'],
  '616': ['pl', 'Polonia'], '620': ['pt', 'Portugal'], '642': ['ro', 'Rumanía'], '643': ['ru', 'Rusia'], '688': ['rs', 'Serbia'],
  '703': ['sk', 'Eslovaquia'], '705': ['si', 'Eslovenia'], '724': ['es', 'España'], '752': ['se', 'Suecia'], '756': ['ch', 'Suiza'],
  '792': ['tr', 'Turquía'], '804': ['ua', 'Ucrania'], '826': ['gb', 'Reino Unido']
};
const PAISES_CEMT = Object.fromEntries(Object.entries(CEMT).map(([id, [f, n]]) => [id, [f, 'cemt', n]]));
PAISES_CEMT['504'] = ['ma', 'bilateral', 'Marruecos'];
PAISES_CEMT['352'] = ['is', 'fuera', 'Islandia'];
PAISES_CEMT['196'] = ['cy', 'fuera', 'Chipre'];

// Nombres de los países grises que se ven en el mapa
const OTROS = {
  '643': 'Rusia', '804': 'Ucrania', '112': 'Bielorrusia', '688': 'Serbia', '070': 'Bosnia y Herzegovina', '008': 'Albania',
  '807': 'Macedonia del Norte', '499': 'Montenegro', '498': 'Moldavia', '012': 'Argelia', '788': 'Túnez', '434': 'Libia',
  '268': 'Georgia', '051': 'Armenia', '031': 'Azerbaiyán', '760': 'Siria', '368': 'Irak', '364': 'Irán', '818': 'Egipto',
  '398': 'Kazajistán', '020': 'Andorra', '492': 'Mónaco', '674': 'San Marino', '336': 'Vaticano'
};

// Cada mapa: título, grupos de colores, países, zona que se ve y banderas que se ubican a mano
const MAPAS = {
  schengen: {
    sub: 'MAPA DE EUROPA', titulo: '¿Quién está en Schengen?', paises: PAISES_SCHENGEN,
    grupos: {
      ue: { color: '#34F5A0', oscuro: '#0f9f62', texto: 'Unión Europea y Schengen' },
      noue: { color: '#22D3EE', oscuro: '#0e7490', texto: 'Schengen, sin ser de la UE' },
      fuera_ue: { color: '#FACC15', oscuro: '#a16207', texto: 'De la UE, pero fuera de Schengen' },
      fuera: { color: '#334155', oscuro: '#1e293b', texto: 'Fuera de Schengen y de la UE' }
    },
    zona: [-25, 45, 33, 71.5], chicos: [[9.55, 47.15, '438'], [14.45, 35.9, '470']], centros: {}
  },
  cemt: {
    sub: 'MAPA DE LA CEMT', titulo: 'Los 43 países de la CEMT', paises: PAISES_CEMT,
    grupos: {
      cemt: { color: '#FB7185', oscuro: '#be123c', texto: 'Países de la CEMT' },
      bilateral: { color: '#C084FC', oscuro: '#7e22ce', texto: 'Marruecos: autorización bilateral' },
      fuera: { color: '#334155', oscuro: '#1e293b', texto: 'Fuera de la CEMT' }
    },
    zona: [-25, 52, 33, 71.5], chicos: [[9.55, 47.15, '438'], [14.45, 35.9, '470']], centros: { '643': [40, 56] }
  }
};
const GRUPOS_TODOS = { ...MAPAS.schengen.grupos, ...MAPAS.cemt.grupos };

// Zona que se muestra y proyección (cambian según el mapa)
const ANCHO = 600, ALTO = 520;
const COS = Math.cos(52 * Math.PI / 180);
let LON_MIN = -25, LON_MAX = 45, LAT_MIN = 33, LAT_MAX = 71.5, ESCALA = 1;
function ponerZona([a, b, c, d]) {
  LON_MIN = a; LON_MAX = b; LAT_MIN = c; LAT_MAX = d;
  ESCALA = Math.min(ANCHO / ((LON_MAX - LON_MIN) * COS), ALTO / (LAT_MAX - LAT_MIN));
}
const proyectar = ([lon, lat]) => [(lon - LON_MIN) * COS * ESCALA, (LAT_MAX - lat) * ESCALA];

let actual = 'schengen';
let PAISES = PAISES_SCHENGEN;
let GRUPOS = MAPAS.schengen.grupos;
let ventana = null, boton = null, cargado = null, cerradoPorUsuario = false, datosMapa = null, topo = null;

function crearVentana() {
  const estilo = document.createElement('style');
  estilo.textContent = `
    #mapa-schengen { position: fixed; z-index: 30; right: 24px; top: 96px; width: min(640px, 94vw, calc((100vh - 270px) * 1.154 + 24px)); min-width: 300px;
      background: linear-gradient(165deg, rgba(15,23,42,0.97), rgba(10,15,30,0.97)); border: 1px solid rgba(52,245,160,0.35);
      border-radius: 22px; box-shadow: 0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(34,211,238,0.08) inset;
      color: #e2e8f0; font-family: Rajdhani, Inter, sans-serif; display: none; overflow: hidden; }
    #mapa-schengen.aparece { animation: mapaLuz 1.4s ease-out; }
    @keyframes mapaLuz { 0% { opacity: 0; box-shadow: 0 0 0 rgba(52,245,160,0); } 45% { opacity: 1; box-shadow: 0 0 60px rgba(52,245,160,0.55); } 100% { box-shadow: 0 24px 60px rgba(0,0,0,0.5); } }
    #mapa-schengen .mapa-cabecera { display: flex; align-items: center; gap: 10px; padding: 12px 14px 8px 18px; cursor: grab; }
    #mapa-schengen .mapa-titulo { flex: 1; }
    #mapa-schengen .mapa-titulo small { display: block; font-family: Orbitron, sans-serif; font-size: 10px; letter-spacing: 3px; color: #22d3ee; }
    #mapa-schengen .mapa-titulo b { display: block; font-size: 20px; font-weight: 700;
      background: linear-gradient(90deg, #22d3ee, #34F5A0); -webkit-background-clip: text; background-clip: text; color: transparent; }
    #mapa-schengen .mapa-boton { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.16); color: #e2e8f0;
      border-radius: 10px; width: 32px; height: 32px; cursor: pointer; font-size: 15px; }
    #mapa-schengen .mapa-boton:hover { background: rgba(34,211,238,0.15); }
    #mapa-schengen.achicada .mapa-cuerpo, #mapa-schengen.achicada .mapa-pie { display: none; }
    #mapa-schengen .mapa-cuerpo { padding: 0 12px; position: relative; }
    #mapa-schengen svg { width: 100%; height: auto; display: block; border-radius: 16px; }
    #mapa-schengen .mapa-cargando { padding: 60px 20px; text-align: center; color: #94a3b8; }
    #mapa-schengen .pais { stroke: rgba(2,6,23,0.85); stroke-width: 0.6; transition: filter 0.25s, opacity 0.25s; cursor: pointer; }
    #mapa-schengen .pais.grupo-gris { opacity: 0.85; }
    #mapa-schengen .pais.color { opacity: 0; animation: paisLuz 1.1s ease-out forwards; animation-delay: var(--d); }
    @keyframes paisLuz { 0% { opacity: 0; filter: brightness(2.2); } 60% { opacity: 1; filter: brightness(1.5); } 100% { opacity: 1; filter: brightness(1); } }
    #mapa-schengen .pais:hover, #mapa-schengen .pais.elegido { filter: brightness(1.45) drop-shadow(0 0 6px rgba(255,255,255,0.6)); }
    #mapa-schengen .bandera { opacity: 0; animation: banderaLuz 0.8s ease-out forwards; animation-delay: var(--d); pointer-events: none; }
    @keyframes banderaLuz { from { opacity: 0; } to { opacity: 1; } }
    #mapa-schengen .mapa-info { margin: 8px 12px 0; padding: 9px 14px; border-radius: 12px; background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1); font-size: 16px; min-height: 22px; display: flex; align-items: center; gap: 10px; }
    #mapa-schengen .mapa-info img { width: 30px; height: 20px; border-radius: 4px; box-shadow: 0 0 0 1px rgba(255,255,255,0.3); }
    #mapa-schengen .mapa-info .punto { width: 12px; height: 12px; border-radius: 50%; flex: none; }
    #mapa-schengen .mapa-pie { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 12px; padding: 8px 16px 12px; font-size: 13px; }
    #mapa-schengen .mapa-pie span { display: flex; align-items: center; gap: 8px; }
    #mapa-schengen .mapa-pie i { width: 14px; height: 14px; border-radius: 4px; flex: none; }
    #mapa-boton-abrir { position: fixed; z-index: 30; right: 24px; bottom: 24px; display: none; padding: 10px 18px; border-radius: 999px;
      border: none; cursor: pointer; font-family: Rajdhani, sans-serif; font-weight: 700; font-size: 16px; color: #0f172a;
      background: linear-gradient(90deg, #22d3ee, #34F5A0); box-shadow: 0 10px 30px rgba(0,0,0,0.35); }
    @media (max-width: 760px) { #mapa-schengen { right: 3vw; top: auto; bottom: 10px; } #mapa-schengen .mapa-pie { grid-template-columns: 1fr; } }`;
  document.head.appendChild(estilo);

  ventana = document.createElement('div');
  ventana.id = 'mapa-schengen';
  ventana.innerHTML = `
    <div class="mapa-cabecera">
      <div class="mapa-titulo"><small id="mapa-sub"></small><b id="mapa-tit"></b></div>
      <button class="mapa-boton" id="mapa-achicar" title="Achicar">–</button>
      <button class="mapa-boton" id="mapa-cerrar" title="Cerrar">✕</button>
    </div>
    <div class="mapa-cuerpo"><p class="mapa-cargando">Cargando el mapa…</p></div>
    <div class="mapa-info" id="mapa-info">Tocá o pasá el mouse por un país para ver cuál es.</div>
    <div class="mapa-pie" id="mapa-pie"></div>`;
  document.body.appendChild(ventana);

  boton = document.createElement('button');
  boton.id = 'mapa-boton-abrir';
  boton.textContent = 'Ver el mapa';
  document.body.appendChild(boton);

  hacerMovible(ventana, ventana.querySelector('.mapa-cabecera'), 'mapa-schengen-v1');
  hacerAchicable(ventana, ventana.querySelector('#mapa-achicar'));
  ventana.querySelector('#mapa-cerrar').onclick = () => { cerradoPorUsuario = true; ventana.style.display = 'none'; boton.style.display = 'block'; };
  boton.onclick = () => { cerradoPorUsuario = false; abrir(); };
}

function abrir() {
  ventana.style.display = 'block';
  boton.style.display = 'none';
  ventana.classList.remove('aparece');
  void ventana.offsetWidth;
  ventana.classList.add('aparece');
}

// Centro del pedazo más grande de un país (para poner la bandera en el lugar justo)
function centroPrincipal(anillos) {
  let mejor = null, mejorArea = 0;
  anillos.forEach(r => {
    let a = 0, cx = 0, cy = 0;
    for (let i = 0; i < r.length - 1; i++) {
      const [x0, y0] = r[i], [x1, y1] = r[i + 1];
      const f = x0 * y1 - x1 * y0;
      a += f; cx += (x0 + x1) * f; cy += (y0 + y1) * f;
    }
    if (Math.abs(a) > mejorArea) { mejorArea = Math.abs(a); mejor = [cx / (3 * a), cy / (3 * a)]; }
  });
  return mejor;
}

function mostrarInfo(id, nombreIngles) {
  const info = document.getElementById('mapa-info');
  const p = PAISES[id];
  ventana.querySelectorAll('.pais.elegido').forEach(el => el.classList.remove('elegido'));
  ventana.querySelectorAll(`.pais[data-id="${id}"]`).forEach(el => el.classList.add('elegido'));
  if (p && p[1] !== 'fuera') {
    const g = GRUPOS[p[1]];
    info.innerHTML = `<img src="https://flagcdn.com/w80/${p[0]}.png" alt=""><b>${p[2]}</b><span class="punto" style="background:${g.color}"></span>${g.texto}`;
  } else {
    info.innerHTML = `<span class="punto" style="background:#64748b"></span><b>${(p && p[2]) || OTROS[id] || nombreIngles || 'País'}</b> · ${GRUPOS.fuera.texto}`;
  }
}

async function dibujar() {
  const cuerpo = ventana.querySelector('.mapa-cuerpo');
  try {
    if (!datosMapa) {
      cuerpo.innerHTML = '<p class="mapa-cargando">Cargando el mapa…</p>';
      [topo, datosMapa] = await Promise.all([import(URL_TOPOJSON), fetch(URL_MAPA).then(r => r.json())]);
    }
    const conf = MAPAS[actual];
    const paises = topo.feature(datosMapa, datosMapa.objects.countries).features;

    // Fondo: mar con degradé y líneas de meridianos y paralelos
    let rejilla = '';
    for (let lon = -20; lon <= 40; lon += 10) {
      const [x] = proyectar([lon, 0]);
      rejilla += `<line x1="${x}" y1="0" x2="${x}" y2="${ALTO}"/>`;
    }
    for (let lat = 35; lat <= 70; lat += 5) {
      const [, y] = proyectar([0, lat]);
      rejilla += `<line x1="0" y1="${y}" x2="${ANCHO}" y2="${y}"/>`;
    }

    let grises = '', coloreados = '', brillo = '', banderas = '';
    const centros = [];
    paises.forEach(p => {
      const g = p.geometry;
      if (!g) return;
      const poligonos = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
      const cerca = poligonos.some(pol => pol[0].some(([lon, lat]) => lon > LON_MIN - 5 && lon < LON_MAX + 5 && lat > LAT_MIN - 5 && lat < LAT_MAX + 5));
      if (!cerca) return;
      const info = PAISES[p.id];
      const anillos = [];
      let d = '';
      poligonos.forEach(pol => pol.forEach(anillo => {
        const pts = anillo.map(proyectar);
        anillos.push(pts);
        d += 'M' + pts.map(([x, y]) => x.toFixed(1) + ',' + y.toFixed(1)).join('L') + 'Z';
      }));
      const nombre = (p.properties && p.properties.name) || '';
      if (info && info[1] !== 'fuera') {
        const c = (conf.centros[p.id] && proyectar(conf.centros[p.id])) || centroPrincipal(anillos) || [0, 0];
        const demora = (0.15 + (c[0] / ANCHO) * 0.9).toFixed(2) + 's';   // se van encendiendo de oeste a este
        coloreados += `<path class="pais color" data-id="${p.id}" data-n="${nombre}" style="--d:${demora}" d="${d}" fill="url(#grad-${info[1]})"/>`;
        brillo += `<path d="${d}" fill="${GRUPOS[info[1]].color}"/>`;
        centros.push([c, info, demora]);
      } else {
        grises += `<path class="pais grupo-gris" data-id="${p.id}" data-n="${nombre}" d="${d}" fill="url(#grad-fuera)"/>`;
        if (info) centros.push([centroPrincipal(anillos), info, '1.2s']);
      }
    });
    // Liechtenstein y Malta son muy chicos: se marcan con un punto
    conf.chicos.forEach(([lon, lat, id]) => {
      if (!PAISES[id] || PAISES[id][1] === 'fuera') return;
      const [x, y] = proyectar([lon, lat]);
      coloreados += `<circle class="pais color" data-id="${id}" style="--d:1s" cx="${x}" cy="${y}" r="4" fill="${GRUPOS[PAISES[id][1]].color}"/>`;
    });
    centros.forEach(([c, info, demora]) => {
      if (!c || c[0] < 8 || c[0] > ANCHO - 8 || c[1] < 8 || c[1] > ALTO - 8) return;
      const id = 'b-' + actual + '-' + info[0];
      banderas += `<g class="bandera" style="--d:${demora}">
        <clipPath id="${id}"><circle cx="${c[0]}" cy="${c[1]}" r="9"/></clipPath>
        <circle cx="${c[0]}" cy="${c[1] + 1.2}" r="10.5" fill="rgba(0,0,0,0.45)"/>
        <image href="https://flagcdn.com/w80/${info[0]}.png" x="${c[0] - 14}" y="${c[1] - 9}" width="28" height="18" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id})"/>
        <circle cx="${c[0]}" cy="${c[1]}" r="9" fill="none" stroke="#ffffff" stroke-width="1.6"/>
      </g>`;
    });

    const degradados = Object.entries(GRUPOS_TODOS).map(([k, g]) =>
      `<linearGradient id="grad-${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${g.color}"/><stop offset="1" stop-color="${g.oscuro}"/></linearGradient>`).join('');

    cuerpo.innerHTML = `<svg viewBox="0 0 ${ANCHO} ${ALTO}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="mar" cx="45%" cy="40%" r="75%"><stop offset="0" stop-color="#0c4a6e"/><stop offset="1" stop-color="#020617"/></radialGradient>
        <filter id="halo" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6"/></filter>
        ${degradados}
      </defs>
      <rect width="${ANCHO}" height="${ALTO}" fill="url(#mar)"/>
      <g stroke="rgba(148,163,184,0.12)" stroke-width="0.8">${rejilla}</g>
      ${grises}
      <g filter="url(#halo)" opacity="0.35">${brillo}</g>
      ${coloreados}
      ${banderas}
    </svg>`;

    cuerpo.querySelectorAll('.pais').forEach(el => {
      const elegir = () => mostrarInfo(el.dataset.id, el.dataset.n);
      el.addEventListener('pointerenter', elegir);
      el.addEventListener('click', elegir);
    });
    cargado = actual;
  } catch (err) {
    cuerpo.innerHTML = '<p class="mapa-cargando">No se pudo cargar el mapa. Revisá la conexión a internet.</p>';
  }
}

// Muestra un mapa ('schengen' o 'cemt') o lo oculta (null). Lo llama cada paso de la clase.
export function mostrarMapa(tipo) {
  if (!tipo || !MAPAS[tipo]) {
    if (ventana) { ventana.style.display = 'none'; boton.style.display = 'none'; }
    cerradoPorUsuario = false;
    return;
  }
  if (!ventana) crearVentana();
  if (tipo !== actual || cargado !== tipo) {
    actual = tipo;
    const conf = MAPAS[tipo];
    PAISES = conf.paises;
    GRUPOS = conf.grupos;
    ponerZona(conf.zona);
    document.getElementById('mapa-sub').textContent = conf.sub;
    document.getElementById('mapa-tit').textContent = conf.titulo;
    document.getElementById('mapa-pie').innerHTML = Object.values(conf.grupos).map(g => `<span><i style="background:${g.color}"></i>${g.texto}</span>`).join('');
    document.getElementById('mapa-info').textContent = 'Tocá o pasá el mouse por un país para ver cuál es.';
    cargado = null;
  }
  if (cerradoPorUsuario) { boton.style.display = 'block'; return; }
  abrir();
  if (cargado !== tipo) dibujar();
}
export const mostrarMapaSchengen = siNo => mostrarMapa(siNo ? 'schengen' : null);
