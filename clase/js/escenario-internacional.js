// ==========================================
// ESCENARIO INTERNACIONAL (2D, con ilustraciones)
// Reemplaza al mundo 3D: una ruta de izquierda a derecha.
// Marruecos ← mar (ferry) → Algeciras · Madrid · frontera con Francia (Pirineos) ·
// Lyon · aduana de Suiza (Alpes). El camión de Proyecto Apolo va de un lado a otro.
// Tiene las mismas funciones que la escena 3D vieja, así los capítulos no cambian:
// los pasos siguen pidiendo los lugares con los números de la ruta vieja (x de -132 a 66).
// ==========================================

const W = 1120;
const H = 600;
const PISO = 520;      // edificios y personas
const RUTA_Y = 556;    // camión y vehículos
const VIAS_Y = 606;    // tren
const MAR_Y = 600;     // donde flota el ferry
const RUTA = 'ilustraciones/';

// Los números de la ruta vieja (3D) → lugar en el dibujo (2D)
const TABLA = [
  [-150, -60], [-132, 200], [-125, 400], [-111, 560], [-104, 765], [-90, 1035], [-83, 1240], [-76, 1420],
  [-71, 1640], [-60, 2380], [-40, 2900], [-20, 3500], [-6, 3770], [4, 3960], [18, 4330], [30, 4600],
  [33, 4680], [36, 4760], [40, 4880], [56, 5120], [62, 5300], [66, 5450], [110, 6100]
];
function aDibujo(x3d) {
  if (x3d <= TABLA[0][0]) return TABLA[0][1];
  for (let i = 1; i < TABLA.length; i++) {
    const [a, pa] = TABLA[i - 1], [b, pb] = TABLA[i];
    if (x3d <= b) return pa + (pb - pa) * (x3d - a) / (b - a);
  }
  return TABLA[TABLA.length - 1][1];
}
// El tren va por sus vías (solo en España)
const TABLA_TREN = [[-125, 1350], [-100, 1750], [-60, 2380], [-15, 3100]];
function trenDibujo(x3d) {
  if (x3d <= TABLA_TREN[0][0]) return TABLA_TREN[0][1];
  for (let i = 1; i < TABLA_TREN.length; i++) {
    const [a, pa] = TABLA_TREN[i - 1], [b, pb] = TABLA_TREN[i];
    if (x3d <= b) return pa + (pb - pa) * (x3d - a) / (b - a);
  }
  return TABLA_TREN[TABLA_TREN.length - 1][1];
}

// Las cosas: x = centro, abajo = dónde apoya, alto = tamaño
const COSAS = {
  aduanaMA: { img: 'edif-aduana-ma', x: 300, abajo: PISO, alto: 260 },
  ferry: { img: 'ferry', x: aDibujo(-104), abajo: MAR_Y, alto: 235, z: 560 },
  puerto: { img: 'edif-puerto', x: 1410, abajo: PISO, alto: 210 },
  contenedor: { img: 'contenedor', x: 1330, abajo: PISO + 6, alto: 56, z: 530 },
  policiaFr: { img: 'edif-policia', x: 1700, abajo: PISO, alto: 190 },
  policia: { img: 'policia', x: 1590, abajo: PISO + 8, alto: 280 },
  barreraES: { img: 'barrera', x: 1660, abajo: RUTA_Y + 4, alto: 92, z: 700 },
  apolo: { img: 'edif-apolo', x: 2060, abajo: PISO, alto: 220 },
  vos: { img: 'damian', x: 2575, abajo: PISO + 8, alto: 285 },
  conductorMA: { img: 'conductor-ma', x: 2672, abajo: PISO + 8, alto: 280 },
  remitente: { img: 'edif-bodega', x: 2900, abajo: PISO, alto: 225 },
  cliente: { img: 'edif-cliente', x: 4200, abajo: PISO, alto: 195 },
  quesos: { img: 'edif-quesos', x: 4640, abajo: PISO, alto: 255 },
  barrera: { img: 'barrera', x: 5262, abajo: RUTA_Y + 4, alto: 92, z: 700 },
  aduanaCH: { img: 'edif-aduana-ch', x: 5450, abajo: PISO + 20, alto: 235 },
  aduanero: { img: 'aduanero', x: 5680, abajo: PISO + 8, alto: 280 },
  tren: { img: 'tren', x: trenDibujo(-100), abajo: VIAS_Y, alto: 112, z: 760 },
  tractora: { img: 'tractora', x: 1420, abajo: RUTA_Y, alto: 128, z: 640 }
};
const PROP = {
  'edif-aduana-ma': 700 / 658, ferry: 700 / 364, 'edif-puerto': 700 / 445, contenedor: 700 / 393, 'edif-policia': 700 / 423,
  policia: 262 / 700, barrera: 428 / 373, 'edif-apolo': 700 / 371, damian: 248 / 700, 'conductor-ma': 241 / 700,
  'edif-bodega': 700 / 481, 'edif-cliente': 700 / 345, 'edif-quesos': 645 / 700, 'edif-aduana-ch': 700 / 415,
  aduanero: 286 / 700, tren: 700 / 162, tractora: 384 / 257, 'camion-art': 700 / 252, semirremolque: 609 / 310, precinto: 484 / 360
};
const PERSONAS = ['vos', 'conductorMA', 'policia', 'aduanero'];

// El camión (articulado) y el semirremolque solo
const CAMION_ALTO = 128;
const REMOLQUE_ALTO = 118;
const SOBRE_FERRY = 50; // cuánto sube el camión cuando está arriba del ferry

// Papeles que flotan sobre el camión (o sobre el conductor marroquí)
const TARJETAS = {
  tarjetaLicencia: { img: 'licencia', titulo: 'LICENCIA COMUNITARIA', sub: 'Copia certificada a bordo', color: '#1d4ed8', sobre: 'camion', orden: 0 },
  tarjetaCMR: { img: 'cmr', titulo: 'CARTA DE PORTE CMR', sub: '3 copias · firman remitente y transportista', color: '#0369a1', sobre: 'camion', orden: 1 },
  tarjetaCEMT: { img: 'cemt', titulo: 'AUTORIZACIÓN CEMT', sub: 'Original a bordo · cada 3 viajes, volver', color: '#b91c1c', sobre: 'camion', orden: 2 },
  tarjetaBilateral: { img: 'bilateral', titulo: 'AUTORIZACIÓN BILATERAL', sub: 'España – Marruecos', color: '#b91c1c', sobre: 'camion', orden: 3 },
  tarjetaTIR: { img: 'cuaderno-tir', titulo: 'CUADERNO TIR', sub: 'Un viaje · precinto de la aduana de salida', color: '#1d4ed8', sobre: 'camion', orden: 4 },
  tarjetaATA: { img: 'cuaderno-ata', titulo: 'CUADERNO ATA', sub: 'Importación temporal · ferias · 1 año', color: '#7c3aed', sobre: 'camion', orden: 5 },
  tarjetaCertificado: { img: 'certificado', titulo: 'CERTIFICADO DE CONDUCTOR', sub: 'Conductor de fuera de la UE', color: '#7c3aed', sobre: 'conductorMA', orden: 0 }
};

// Carteles de país al costado de la ruta (siempre visibles)
const PAISES = [
  { nombre: 'MARRUECOS', bandera: 'ma', x: aDibujo(-114) },
  { nombre: 'ESPAÑA', bandera: 'es', ue: true, x: aDibujo(-80) },
  { nombre: 'FRANCIA', bandera: 'fr', ue: true, x: aDibujo(-15) },
  { nombre: 'SUIZA', bandera: 'ch', x: aDibujo(58) }
];
// Nombres grandes en el cielo (se ven en la vista de toda la ruta)
const ZONAS = [
  { nombre: 'MARRUECOS', bandera: 'ma', x: 520 },
  { nombre: 'ESPAÑA', bandera: 'es', x: 2150 },
  { nombre: 'FRANCIA', bandera: 'fr', x: 4150 },
  { nombre: 'SUIZA', bandera: 'ch', x: 5450 }
];

// Vistas (botones de arriba): x = centro, zoom = cuánto se acerca; el piso queda abajo
const conPiso = (x, zoom, pantalla = 540) => ({ x, zoom, y: RUTA_Y - (pantalla - H / 2) / zoom });
const VISTAS = {
  general: conPiso(2850, 0.185, 470),
  estrecho: conPiso(1005, 0.74),
  madrid: conPiso(2450, 0.92),
  frontera: conPiso(3480, 0.93),
  lyon: conPiso(4370, 0.97),
  suiza: conPiso(5130, 0.93)
};

// Lugares fijos de algunos carteles
const ANCLAS_FIJAS = { frontera: [aDibujo(-20), PISO - 300] };

function banderaHTML(p) {
  if (p === 'es') return '<i class="bd bd-es"></i>';
  if (p === 'fr') return '<i class="bd bd-fr"></i>';
  if (p === 'ch') return '<i class="bd bd-ch"></i>';
  if (p === 'ma') return '<i class="bd bd-ma"><b>★</b></i>';
  return '';
}

const CSS = `
#escenario { position: fixed; left: 466px; right: 322px; top: 92px; bottom: 16px; z-index: 5; overflow: hidden; border-radius: 22px; }
#escenario .ajuste { position: absolute; left: 50%; top: 50%; width: ${W}px; height: ${H}px; transform-origin: 0 0; }
#escenario .mundo { position: absolute; left: 0; top: 0; width: ${W}px; height: ${H}px; transform-origin: 0 0; transition: transform 1.3s cubic-bezier(0.22, 1, 0.36, 1); }
#escenario .fondo { position: absolute; left: -3000px; width: 12000px; top: -4000px; bottom: -800px; background:
  radial-gradient(ellipse 18% 30% at 35% 72%, rgba(56, 189, 248, 0.10), transparent 70%),
  radial-gradient(ellipse 15% 25% at 60% 60%, rgba(167, 139, 250, 0.07), transparent 70%); }
#escenario .vereda { position: absolute; top: ${PISO}px; height: 26px;
  background: linear-gradient(180deg, rgba(148, 163, 184, 0.16), rgba(148, 163, 184, 0.05)); border-top: 1px solid rgba(148, 163, 184, 0.25); }
#escenario .ruta { position: absolute; top: ${PISO + 26}px; height: 110px;
  background: linear-gradient(180deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0) 92%); }
#escenario .ruta::after { content: ''; position: absolute; left: 0; right: 0; top: 34px; height: 4px; opacity: 0.35;
  background: repeating-linear-gradient(90deg, #e2e8f0 0 46px, transparent 46px 92px); }
#escenario .mar { position: absolute; top: ${PISO + 8}px; height: 260px; z-index: 540;
  background: linear-gradient(180deg, rgba(14, 165, 233, 0.55), rgba(3, 105, 161, 0.35) 40%, rgba(3, 105, 161, 0) 100%);
  border-top: 2px solid rgba(125, 211, 252, 0.6); }
#escenario .mar::before { content: ''; position: absolute; left: 0; right: 0; top: 10px; height: 60px; opacity: 0.45;
  background: repeating-linear-gradient(90deg, transparent 0 30px, rgba(255, 255, 255, 0.35) 30px 52px, transparent 52px 90px);
  mask-image: linear-gradient(180deg, transparent, #000 20%, transparent); -webkit-mask-image: linear-gradient(180deg, transparent, #000 20%, transparent);
  animation: olas 6s linear infinite; }
@keyframes olas { to { background-position: 90px 0; } }
#escenario .vias { position: absolute; top: ${VIAS_Y - 14}px; height: 18px; opacity: 0; transition: opacity 0.7s ease; z-index: 600;
  background: repeating-linear-gradient(90deg, rgba(120, 83, 52, 0.85) 0 10px, transparent 10px 34px);
  border-top: 3px solid #94a3b8; border-bottom: 3px solid #94a3b8; }
#escenario .vias.ve { opacity: 1; }
.montana { position: absolute; transform: translateX(-50%); clip-path: polygon(50% 0, 100% 100%, 0 100%);
  background: linear-gradient(180deg, #e2e8f0 0 16%, #475569 16.5%, #1e293b 100%); opacity: 0.55; z-index: 10; }
.portico { position: absolute; transform: translateX(-50%); z-index: 690; pointer-events: none; }
.portico .poste { position: absolute; bottom: 0; width: 10px; height: 240px; background: linear-gradient(90deg, #1e3a8a, #3b5bdb); border-radius: 4px; }
.portico .viga { position: absolute; left: -10px; right: -10px; bottom: 228px; height: 50px; background: #1d4ed8; border-radius: 10px;
  display: flex; align-items: center; justify-content: center; gap: 14px; color: #fff; font: 900 22px 'Nunito', sans-serif; letter-spacing: 0.04em;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5), 0 0 0 2px rgba(255, 255, 255, 0.2) inset; white-space: nowrap; }
.caseta-vieja { position: absolute; transform: translateX(-50%); z-index: 480; width: 92px; height: 82px; border-radius: 8px;
  background: linear-gradient(180deg, #cbd5e1, #94a3b8); opacity: 0.8; }
.caseta-vieja span { position: absolute; left: -10px; right: -10px; top: -26px; text-align: center; padding: 3px 4px; border-radius: 6px;
  background: #64748b; color: #fff; font: 800 11px 'Nunito', sans-serif; }
.cartel-pais { position: absolute; transform: translate(-50%, -100%); z-index: 530; display: flex; flex-direction: column; align-items: center; pointer-events: none; }
.cartel-pais .chapa { padding: 6px 12px 7px; border-radius: 10px; background: #0f172a; border: 2px solid rgba(255, 255, 255, 0.25); color: #fff;
  font: 900 15px 'Nunito', sans-serif; letter-spacing: 0.06em; display: flex; align-items: center; gap: 8px; box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5); white-space: nowrap; }
.cartel-pais .ue { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 21px; border-radius: 3px; background: #1d4ed8;
  color: #facc15; font-size: 9px; letter-spacing: -1px; }
.cartel-pais .palo { width: 6px; height: 70px; background: linear-gradient(90deg, #64748b, #cbd5e1); border-radius: 3px; }
.bd { display: inline-block; width: 30px; height: 20px; border-radius: 3px; position: relative; overflow: hidden; box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.3); flex: none; }
.bd-es { background: linear-gradient(180deg, #c60b1e 0 25%, #ffc400 25% 75%, #c60b1e 75%); }
.bd-fr { background: linear-gradient(90deg, #0055a4 0 33.3%, #ffffff 33.3% 66.6%, #ef4135 66.6%); }
.bd-ch { background: #d52b1e; }
.bd-ch::before, .bd-ch::after { content: ''; position: absolute; left: 50%; top: 50%; background: #fff; transform: translate(-50%, -50%); }
.bd-ch::before { width: 12px; height: 4px; } .bd-ch::after { width: 4px; height: 12px; }
.bd-ma { background: #c1272d; display: inline-flex; align-items: center; justify-content: center; }
.bd-ma b { color: #006233; font-size: 14px; line-height: 1; }
.zona-nombre { position: absolute; transform: translate(-50%, -50%); display: flex; align-items: center; gap: 40px; z-index: 5;
  font: 900 140px 'Nunito', sans-serif; letter-spacing: 0.08em; color: rgba(226, 232, 240, 0.85); white-space: nowrap; text-shadow: 0 20px 60px rgba(0, 0, 0, 0.6); }
.zona-nombre .bd { width: 200px; height: 134px; border-radius: 18px; }
.zona-nombre .bd-ch::before { width: 84px; height: 28px; } .zona-nombre .bd-ch::after { width: 28px; height: 84px; }
.zona-nombre .bd-ma b { font-size: 96px; }
.cosa { position: absolute; transform-origin: 50% 100%; opacity: 0; pointer-events: none;
  transition: opacity 0.7s ease, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), filter 0.6s ease;
  transform: translate(-50%, -100%) translateY(14px) scale(0.94); }
.cosa.ve { opacity: 1; transform: translate(-50%, -100%); }
.cosa.ya { transition: none !important; }
.cosa img { display: block; height: 100%; width: auto; filter: drop-shadow(0 14px 22px rgba(0, 0, 0, 0.55)); }
.cosa .sombra { position: absolute; left: 50%; bottom: -10px; width: 80%; height: 22px; transform: translateX(-50%); border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.55), transparent 70%); z-index: -1; }
.cosa.brilla img { animation: cosaLuz 1.8s ease-out; }
@keyframes cosaLuz { 30% { filter: drop-shadow(0 0 26px rgba(125, 211, 252, 0.95)) drop-shadow(0 14px 22px rgba(0, 0, 0, 0.55)) brightness(1.12); } }
.movil { transition: opacity 0.7s ease, left 3.4s cubic-bezier(0.45, 0, 0.2, 1), top 1.6s cubic-bezier(0.45, 0, 0.2, 1), transform 0.9s ease !important; }
.cosa.ferry { transition: opacity 0.7s ease, left 3.4s cubic-bezier(0.45, 0, 0.2, 1), transform 0.9s ease; }
.cosa.ferry img { animation: mece 4s ease-in-out infinite; }
@keyframes mece { 50% { transform: translateY(4px) rotate(0.6deg); } }
.camion { position: absolute; opacity: 0; transform: translate(-50%, -100%); pointer-events: none; z-index: 640;
  transition: opacity 0.7s ease, left 3.4s cubic-bezier(0.45, 0, 0.2, 1), top 1.6s cubic-bezier(0.45, 0, 0.2, 1); }
.camion.ve { opacity: 1; }
.camion.ya, .camion.ya * { transition: none !important; }
.camion .gira { height: 100%; transition: transform 0.3s ease; transform-origin: 50% 100%; position: relative; }
.camion .gira.girando { transform: scaleX(0.05); }
.camion .gira > img:not(.precinto) { display: block; height: 100%; width: auto; filter: drop-shadow(0 14px 18px rgba(0, 0, 0, 0.55)); }
.camion .sombra { position: absolute; left: 50%; bottom: -8px; width: 86%; height: 18px; transform: translateX(-50%); border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.55), transparent 70%); z-index: -1; }
.camion .precinto { position: absolute; width: 30px; height: auto; bottom: 30px; right: 1%; opacity: 0; transition: opacity 0.6s ease; }
.camion.derecha .precinto { right: auto; left: 1%; }
.camion .precinto.ve { opacity: 1; animation: cosaLuz 1.8s ease-out; }
.semi-tren { position: absolute; height: 70px; bottom: 36px; left: 6%; }
.semi-tren img { height: 100%; width: auto; }
.dato { position: absolute; z-index: 900; pointer-events: none; opacity: 0; }
.dato.vuela { animation: datoX 3.6s linear infinite; }
.dato .in { width: 34px; height: 42px; border-radius: 6px; background: #f8fafc; box-shadow: 0 0 14px rgba(34, 211, 238, 0.9);
  position: relative; transform: translate(-50%, -50%); }
.dato.vuela .in { animation: datoY 3.6s ease-in-out infinite; }
.dato .in::before { content: ''; position: absolute; left: 6px; top: 6px; width: 12px; height: 12px; border-radius: 50%; background: #0ea5e9; box-shadow: 0 13px 0 -2px #0ea5e9; }
.dato .in::after { content: ''; position: absolute; left: 6px; right: 6px; top: 30px; height: 3px; background: #94a3b8; box-shadow: 0 -6px 0 #94a3b8; }
@keyframes datoX { 0% { left: var(--x0); top: var(--y0); opacity: 0; } 12% { opacity: 1; } 88% { opacity: 1; } 100% { left: var(--x1); top: var(--y1); opacity: 0; } }
@keyframes datoY { 0% { margin-top: 0; } 50% { margin-top: -150px; } 100% { margin-top: 0; } }
#escenario .capa-etq { position: absolute; left: 0; top: 0; width: ${W}px; height: ${H}px; pointer-events: none; z-index: 5000; }
#escenario .etiqueta3d { width: max-content; opacity: 0; transition: opacity 0.45s ease, left 0.6s cubic-bezier(0.22, 1, 0.36, 1), top 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
#escenario .etiqueta3d.ve { opacity: 1; }
#escenario .etiqueta3d.fuera { opacity: 0 !important; }
.tarjeta-doc { position: absolute; width: 176px; transform: translate(-50%, -100%); opacity: 0; transition: opacity 0.6s ease, left 0.5s ease, top 0.5s ease;
  display: flex; align-items: center; gap: 8px; padding: 6px 8px; border-radius: 12px; background: rgba(15, 23, 42, 0.92); border: 2px solid; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5); }
.tarjeta-doc.ve { opacity: 1; }
.tarjeta-doc.fuera { opacity: 0 !important; }
.tarjeta-doc.aparece { animation: tarjLuz 2s ease-out; }
@keyframes tarjLuz { 0% { filter: brightness(1.6); } 30% { box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.35), 0 0 30px rgba(255, 255, 255, 0.6); } 100% { filter: none; } }
.tarjeta-doc img { width: 50px; height: 42px; object-fit: contain; flex: none; filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.6)); }
.tarjeta-doc b { display: block; color: #fff; font: 900 12px 'Nunito', sans-serif; line-height: 1.15; }
.tarjeta-doc span { display: block; color: #cbd5e1; font: 700 10.5px 'Nunito', sans-serif; line-height: 1.2; margin-top: 2px; }
@media (max-width: 1100px) { #escenario { left: 8px; right: 8px; top: 84px; bottom: auto; height: 46vh; } }
`;

export function crearEscenarioInternacional() {
  const estilo = document.createElement('style');
  estilo.textContent = CSS;
  document.head.appendChild(estilo);

  const raiz = document.createElement('div');
  raiz.id = 'escenario';
  raiz.innerHTML = `<div class="ajuste"><div class="mundo"><div class="fondo"></div></div><div class="capa-etq"></div></div>`;
  document.body.appendChild(raiz);
  const ajuste = raiz.querySelector('.ajuste');
  const mundo = raiz.querySelector('.mundo');
  const capa = raiz.querySelector('.capa-etq');
  const agregar = (html, clase, estiloEl = {}) => {
    const el = document.createElement('div');
    el.className = clase;
    el.innerHTML = html;
    Object.assign(el.style, estiloEl);
    mundo.appendChild(el);
    return el;
  };

  // ---------- EL PAISAJE (siempre visible) ----------
  const COSTA_MA = aDibujo(-111), COSTA_ES = aDibujo(-83);
  agregar('', 'vereda', { left: '-3000px', width: (COSTA_MA + 3000) + 'px' });
  agregar('', 'ruta', { left: '-3000px', width: (COSTA_MA + 3000) + 'px' });
  agregar('', 'vereda', { left: COSTA_ES + 'px', width: '7000px' });
  agregar('', 'ruta', { left: COSTA_ES + 'px', width: '7000px' });
  agregar('', 'mar', { left: COSTA_MA + 'px', width: (COSTA_ES - COSTA_MA) + 'px' });
  const vias = agregar('', 'vias', { left: TABLA_TREN[0][1] - 400 + 'px', width: (TABLA_TREN[3][1] - TABLA_TREN[0][1] + 600) + 'px' });
  // Montañas: Pirineos en la frontera con Francia y Alpes en Suiza
  [[3330, 300, 360], [3470, 380, 470], [3620, 280, 330], [3760, 220, 270],
   [5330, 380, 420], [5520, 470, 540], [5720, 360, 400], [5900, 300, 360]].forEach(([x, alto, ancho]) => {
    agregar('', 'montana', { left: x + 'px', top: (PISO - alto) + 'px', width: ancho + 'px', height: alto + 'px' });
  });
  // Pórtico de la frontera España → Francia (y la antigua aduana vacía)
  const xFrontera = aDibujo(-20);
  agregar(`<div class="poste" style="left:0"></div><div class="poste" style="right:0"></div><div class="viga">${banderaHTML('es')} ESPAÑA → FRANCIA ${banderaHTML('fr')}</div>`,
    'portico', { left: xFrontera + 'px', top: (RUTA_Y + 30 - 240) + 'px', width: '330px', height: '240px' });
  agregar('<span>ANTIGUA ADUANA</span>', 'caseta-vieja', { left: (xFrontera - 230) + 'px', top: (PISO - 82) + 'px' });
  // Carteles de país al costado de la ruta, y de Lyon y Marsella
  const cartel = (texto, x) => agregar(`<div class="chapa">${texto}</div><div class="palo"></div>`, 'cartel-pais', { left: x + 'px', top: (PISO + 4) + 'px' });
  PAISES.forEach(p => cartel(`${banderaHTML(p.bandera)}${p.nombre}${p.ue ? '<span class="ue">★★★</span>' : ''}`, p.x));
  cartel(`${banderaHTML('fr')}LYON<span class="ue">★★★</span>`, aDibujo(4));
  cartel(`${banderaHTML('fr')}MARSELLA →`, aDibujo(38));
  // Nombres grandes de cada país en el cielo (para la vista de toda la ruta)
  ZONAS.forEach(z => agregar(`${banderaHTML(z.bandera)}<span>${z.nombre}</span>`, 'zona-nombre', { left: z.x + 'px', top: '-420px' }));

  // ---------- LAS COSAS ----------
  const els = {};
  const posX = {};
  Object.entries(COSAS).forEach(([nombre, c]) => {
    const el = document.createElement('div');
    el.className = 'cosa' + (nombre === 'ferry' ? ' ferry' : '') + (nombre === 'tren' ? ' movil' : '');
    el.style.left = c.x + 'px';
    el.style.top = c.abajo + 'px';
    el.style.height = c.alto + 'px';
    el.style.width = Math.round(c.alto * PROP[c.img]) + 'px';
    el.innerHTML = `<img src="${RUTA}${c.img}.png" alt="">` + (nombre === 'ferry' ? '' : '<div class="sombra"></div>');
    el.style.zIndex = String(c.z || c.abajo);
    mundo.appendChild(el);
    els[nombre] = el;
    posX[nombre] = c.x;
  });
  // El tren lleva un semirremolque arriba del vagón canguro
  const semiTren = document.createElement('div');
  semiTren.className = 'semi-tren';
  semiTren.innerHTML = `<img src="${RUTA}semirremolque.png" alt="">`;
  els.tren.appendChild(semiTren);
  const imgVos = els.vos.querySelector('img');
  function cara(cual) { imgVos.src = RUTA + (cual === 'normal' ? 'damian' : 'damian-' + cual) + '.png'; }

  // El camión
  const camion = document.createElement('div');
  camion.className = 'camion derecha';
  camion.innerHTML = `<div class="gira"><img src="${RUTA}camion-art.png" alt=""><img class="precinto" src="${RUTA}precinto.png" alt=""></div><div class="sombra"></div>`;
  mundo.appendChild(camion);
  const imgCamion = camion.querySelector('.gira > img');
  const gira = camion.querySelector('.gira');
  const imgPrecinto = camion.querySelector('.precinto');
  ['semirremolque', 'semirremolque-der', 'camion-art-der', 'damian-contento', 'damian-preocupado'].forEach(n => { const i = new Image(); i.src = RUTA + n + '.png'; });
  const estadoCamion = { x: aDibujo(-60), arriba: false, remolque: false, derecha: true };
  function altoCamion() { return estadoCamion.remolque ? REMOLQUE_ALTO : CAMION_ALTO; }
  function anchoCamion() { return altoCamion() * PROP[estadoCamion.remolque ? 'semirremolque' : 'camion-art']; }
  let srcCamion = '';
  let timerGiro = null;
  function imagenCamion(conGiro) {
    const src = RUTA + (estadoCamion.remolque ? 'semirremolque' : 'camion-art') + (estadoCamion.derecha ? '-der' : '') + '.png';
    if (src === srcCamion) return;
    const cambiaTipo = srcCamion && srcCamion.includes('semirremolque') !== src.includes('semirremolque');
    srcCamion = src;
    clearTimeout(timerGiro);
    if (!conGiro || cambiaTipo) { gira.classList.remove('girando'); imgCamion.src = src; return; }
    // gira suave: se achica de costado, cambia de lado y vuelve
    gira.classList.add('girando');
    timerGiro = setTimeout(() => { imgCamion.src = src; gira.classList.remove('girando'); }, 300);
  }
  function dibujarCamion(conGiro = false) {
    imagenCamion(conGiro);
    camion.style.left = estadoCamion.x + 'px';
    camion.style.top = (estadoCamion.arriba ? MAR_Y - SOBRE_FERRY - 40 : RUTA_Y) + 'px';
    camion.style.height = altoCamion() + 'px';
    camion.style.zIndex = estadoCamion.arriba ? '620' : '640';
    camion.classList.toggle('derecha', estadoCamion.derecha);
  }
  dibujarCamion();

  // Las tarjetas de los papeles (en la capa de carteles: siempre se leen bien)
  const tarjetas = {};
  Object.entries(TARJETAS).forEach(([nombre, t]) => {
    const el = document.createElement('div');
    el.className = 'tarjeta-doc';
    el.style.borderColor = t.color;
    el.innerHTML = `<img src="${RUTA}${t.img}.png" alt=""><div><b>${t.titulo}</b><span>${t.sub}</span></div>`;
    capa.appendChild(el);
    tarjetas[nombre] = el;
  });

  // Los datos de los pasajeros que viajan del ferry a la policía
  const datos = [];
  for (let i = 0; i < 6; i++) {
    const d = document.createElement('div');
    d.className = 'dato';
    d.innerHTML = '<div class="in"></div>';
    d.style.animationDelay = (i * 0.6) + 's';
    d.querySelector('.in').style.animationDelay = (i * 0.6) + 's';
    mundo.appendChild(d);
    datos.push(d);
  }

  // ---------- AJUSTE AL TAMAÑO Y VISTAS ----------
  let vista = VISTAS.general;
  function ajustar() {
    const k = Math.min(raiz.clientWidth / W, raiz.clientHeight / H);
    ajuste.style.transform = `scale(${k}) translate(-50%, -50%)`;
  }
  function aplicarVista() {
    const z = vista.zoom;
    mundo.style.transform = `translate(${W / 2 - vista.x * z}px, ${H / 2 - vista.y * z}px) scale(${z})`;
  }
  const aPantalla = (x, y) => [W / 2 + (x - vista.x) * vista.zoom, H / 2 + (y - vista.y) * vista.zoom];
  window.addEventListener('resize', ajustar);
  ajustar();
  aplicarVista();

  // ---------- ESTADO ----------
  const visibles = new Set();
  function ver(nombre, siNo, inmediato = false) {
    if (nombre === 'vias') { vias.classList.toggle('ve', siNo); return; }
    if (nombre === 'camion') {
      if (inmediato) camion.classList.add('ya');
      camion.classList.toggle('ve', siNo);
      if (siNo) visibles.add(nombre); else visibles.delete(nombre);
      if (inmediato) { void camion.offsetWidth; camion.classList.remove('ya'); }
      return;
    }
    if (tarjetas[nombre]) {
      const t = tarjetas[nombre];
      if (siNo && !visibles.has(nombre) && !inmediato) { t.classList.remove('aparece'); void t.offsetWidth; t.classList.add('aparece'); }
      t.classList.toggle('ve', siNo);
      if (siNo) visibles.add(nombre); else visibles.delete(nombre);
      ubicarTarjetas();
      return;
    }
    const el = els[nombre];
    if (!el) return;
    if (inmediato) el.classList.add('ya');
    el.classList.toggle('ve', siNo);
    if (siNo) visibles.add(nombre); else visibles.delete(nombre);
    if (inmediato) { void el.offsetWidth; el.classList.remove('ya'); }
    // En la aduana de Suiza siempre hay un aduanero
    if (nombre === 'aduanaCH') ver('aduanero', siNo, inmediato);
  }

  // ---------- LO QUE PIDEN LOS CAPÍTULOS ----------
  function mostrar(nombre, siNo = true) { ver(nombre, siNo); }
  function yaVisible(nombre) { ver(nombre, true, true); }

  // Lugar de un cartel en el mundo
  function anclaMundo(nombre) {
    if (ANCLAS_FIJAS[nombre]) return ANCLAS_FIJAS[nombre];
    if (nombre === 'camion' || nombre === 'cielo') {
      const arriba = estadoCamion.arriba ? MAR_Y - SOBRE_FERRY - 40 : RUTA_Y;
      return [estadoCamion.x, arriba - altoCamion() - (nombre === 'cielo' ? 160 : 12)];
    }
    const n = nombre === 'globo' ? 'vos' : nombre;
    const c = COSAS[n];
    if (!c) return null;
    return [posX[n], c.abajo - c.alto - 12];
  }

  const etiquetas = {};
  function etiqueta(nombre, html = null, tipo = '') {
    if (etiquetas[nombre]) { etiquetas[nombre].remove(); delete etiquetas[nombre]; }
    if (html === null) return;
    if (tipo === 'globo') Object.entries(etiquetas).forEach(([otro, el]) => { if (el.classList.contains('globo')) { el.remove(); delete etiquetas[otro]; } });
    if (!anclaMundo(nombre)) return;
    // Lo que acompaña a algunos carteles
    if (nombre === 'puerto' && /contenedor/i.test(html)) ver('contenedor', true);
    if (/precinto/i.test(html)) { imgPrecinto.classList.add('ve'); }
    if ((nombre === 'vos' || nombre === 'globo') && tipo === 'precio') cara('contento');
    // la cosa del cartel se ilumina un momento
    const el0 = els[nombre === 'globo' ? 'vos' : nombre];
    if (el0) { el0.classList.remove('brilla'); void el0.offsetWidth; el0.classList.add('brilla'); }
    const el = document.createElement('div');
    el.className = 'etiqueta3d aparece ve ' + tipo;
    el.dataset.nombre = nombre;
    el.innerHTML = `<div class="etq-in">${html}</div>`;
    capa.appendChild(el);
    etiquetas[nombre] = el;
    reacomodar(true);
  }

  // ---------- QUE LOS CARTELES NO TAPEN CARAS NI SE PISEN ENTRE ELLOS ----------
  const choca = (a, b) => a[0] < b[2] + 6 && a[2] > b[0] - 6 && a[1] < b[3] + 6 && a[3] > b[1] - 6;
  function rectPantalla(nombre, x0 = 0, x1 = 1, y0 = 0, y1 = 1) {
    const c = COSAS[nombre];
    const w = c.alto * PROP[c.img];
    const izq = posX[nombre] - w / 2, arr = c.abajo - c.alto;
    const [a, b] = aPantalla(izq + w * x0, arr + c.alto * y0);
    const [d, e] = aPantalla(izq + w * x1, arr + c.alto * y1);
    return [a, b, d, e];
  }
  function rectCamion() {
    const w = anchoCamion(), h = altoCamion();
    const abajo = estadoCamion.arriba ? MAR_Y - SOBRE_FERRY - 40 : RUTA_Y;
    const [a, b] = aPantalla(estadoCamion.x - w / 2, abajo - h);
    const [d, e] = aPantalla(estadoCamion.x + w / 2, abajo);
    return [a, b, d, e];
  }
  // Las tarjetas se apilan arriba del camión (o del conductor)
  function ubicarTarjetas() {
    const pila = { camion: 0, conductorMA: 0 };
    Object.entries(TARJETAS).sort((a, b) => a[1].orden - b[1].orden).forEach(([nombre, t]) => {
      const el = tarjetas[nombre];
      let x, y;
      if (t.sobre === 'camion') {
        const r = rectCamion();
        x = (r[0] + r[2]) / 2; y = r[1] - 6;
      } else {
        const c = COSAS[t.sobre];
        [x, y] = aPantalla(posX[t.sobre], c.abajo - c.alto - 6);
      }
      if (visibles.has(nombre)) {
        y -= pila[t.sobre] * 66;
        pila[t.sobre]++;
      }
      el.style.left = x + 'px';
      el.style.top = y + 'px';
      el.classList.toggle('fuera', x < -60 || x > W + 60);
    });
  }
  function reacomodar(alInstante = false) {
    ubicarTarjetas();
    const lista = Object.values(etiquetas);
    if (!lista.length) return;
    const ocupado = [];
    const cuerpos = [];
    visibles.forEach(n => {
      if (PERSONAS.includes(n)) {
        ocupado.push(rectPantalla(n, 0.18, 0.82, -0.02, 0.24));
        cuerpos.push(rectPantalla(n, 0.12, 0.88, 0, 1));
      } else if (tarjetas[n]) {
        const el = tarjetas[n];
        const x = parseFloat(el.style.left), y = parseFloat(el.style.top);
        ocupado.push([x - el.offsetWidth / 2, y - el.offsetHeight, x + el.offsetWidth / 2, y]);
      } else if (n === 'camion') {
        cuerpos.push(rectCamion());
      }
    });
    if (visibles.has('aduanaCH')) {
      ocupado.push(rectPantalla('aduanero', 0.18, 0.82, -0.02, 0.24));
      cuerpos.push(rectPantalla('aduanero', 0.12, 0.88, 0, 1));
    }
    const minX = 8, maxX = W - 8, techo = 10, suelo = H - 8;
    lista.forEach(el => {
      const am = anclaMundo(el.dataset.nombre);
      const [ax, ay] = aPantalla(am[0], am[1]);
      const fuera = ax < -40 || ax > W + 40;
      el.classList.toggle('fuera', fuera);
      if (fuera) return;
      const w = el.offsetWidth, h = el.offsetHeight;
      const caja = (x, y) => [x - w / 2, y - h, x + w / 2, y];
      const libre = (x, y) => !ocupado.some(o => choca(caja(x, y), o));
      let pos = null, mejor = Infinity;
      for (let dx = -520; dx <= 520; dx += 20) {
        const x = Math.max(minX + w / 2, Math.min(maxX - w / 2, ax + dx));
        const cx = Math.abs(x - ax) * 1.4;
        if (cx >= mejor) continue;
        for (let y = techo + h; y <= suelo; y += 8) {
          let c = cx + (y <= ay ? (ay - y) : (y - ay) * 1.8);
          if (c >= mejor) continue;
          const b = caja(x, y);
          c += cuerpos.filter(o => choca(b, o)).length * 90;
          if (c < mejor && libre(x, y)) { mejor = c; pos = [x, y]; }
        }
      }
      if (!pos) pos = [Math.max(minX + w / 2, Math.min(maxX - w / 2, ax)), Math.max(ay, techo + h)];
      if (alInstante) el.style.transition = 'none';
      el.style.left = pos[0] + 'px';
      el.style.top = pos[1] + 'px';
      if (alInstante) { void el.offsetWidth; el.style.transition = ''; }
      ocupado.push(caja(pos[0], pos[1]));
    });
  }
  // El camión se mueve con CSS: se calcula dónde está ahora para que los carteles lo sigan
  function xActualCamion() {
    const r = camion.getBoundingClientRect(), m = mundo.getBoundingClientRect();
    if (!m.width) return estadoCamion.x;
    const escala = m.width / W;
    return (r.left + r.width / 2 - m.left) / escala;
  }
  setInterval(() => {
    const destino = estadoCamion.x;
    estadoCamion.x = xActualCamion();
    reacomodar(false);
    estadoCamion.x = destino;
  }, 150);

  // ---------- MOVIMIENTOS ----------
  // Lleva el camión a un punto de la ruta vieja. y: 1.95 = arriba del ferry · 0.02 = en el piso
  function camionA(x, inmediato = false, y = null) {
    const nuevo = aDibujo(x);
    if (inmediato) estadoCamion.derecha = true;
    else if (nuevo < estadoCamion.x - 2) estadoCamion.derecha = false;
    else if (nuevo > estadoCamion.x + 2) estadoCamion.derecha = true;
    estadoCamion.x = nuevo;
    if (y !== null) estadoCamion.arriba = y > 1;
    if (inmediato) camion.classList.add('ya');
    dibujarCamion(!inmediato);
    if (inmediato) { void camion.offsetWidth; camion.classList.remove('ya'); }
    ubicarTarjetas();
  }
  function ferryA(x, inmediato = false) {
    const el = els.ferry;
    posX.ferry = aDibujo(x);
    if (inmediato) el.classList.add('ya');
    el.style.left = posX.ferry + 'px';
    if (inmediato) { void el.offsetWidth; el.classList.remove('ya'); }
  }
  function trenA(x, inmediato = false) {
    const el = els.tren;
    posX.tren = trenDibujo(x);
    if (inmediato) el.classList.add('ya');
    el.style.left = posX.tren + 'px';
    if (inmediato) { void el.offsetWidth; el.classList.remove('ya'); }
  }
  // Transporte no acompañado: la tractora se queda en el puerto y viaja solo el semirremolque
  function soloRemolque(siNo) {
    estadoCamion.remolque = siNo;
    if (siNo) {
      posX.tractora = estadoCamion.x - 40;
      els.tractora.style.left = posX.tractora + 'px';
    }
    ver('tractora', siNo, true);
    dibujarCamion();
  }
  // Los datos de los pasajeros viajan del ferry a la policía
  function enviarDatos(siNo) {
    const fx = posX.ferry, fy = MAR_Y - COSAS.ferry.alto * 0.8;
    const px = posX.policiaFr, py = PISO - COSAS.policiaFr.alto * 0.7;
    datos.forEach(d => {
      d.style.setProperty('--x0', fx + 'px'); d.style.setProperty('--y0', fy + 'px');
      d.style.setProperty('--x1', px + 'px'); d.style.setProperty('--y1', py + 'px');
      d.classList.toggle('vuela', siNo);
    });
  }
  function tipo() {}
  function limpiar() {
    Object.keys(els).forEach(n => { ver(n, false, true); els[n].classList.remove('brilla'); });
    Object.keys(tarjetas).forEach(n => ver(n, false, true));
    ver('camion', false, true);
    ver('vias', false);
    Object.keys(etiquetas).forEach(n => { etiquetas[n].remove(); delete etiquetas[n]; });
    enviarDatos(false);
    imgPrecinto.classList.remove('ve');
    soloRemolque(false);
    ferryA(-104, true);
    trenA(-100, true);
    estadoCamion.arriba = false;
    camionA(-60, true);
    cara('normal');
  }
  function setVista(nombre) {
    vista = VISTAS[nombre] || VISTAS.general;
    aplicarVista();
    reacomodar(true);
  }

  return {
    mostrar, yaVisible, etiqueta, camionA, ferryA, trenA, enviarDatos, soloRemolque, tipo, limpiar, setVista,
    actualizar: () => {}, ubicarEtiquetas: () => {}
  };
}
