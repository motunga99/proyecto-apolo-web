// ==========================================
// TABLERO DEL TACÓGRAFO (sin 3D)
// Pantallas oscuras que se cambian según el paso:
// el tacógrafo digital (se puede tocar), el disco analógico, la línea del día,
// los pictogramas, las tarjetas, quién lo lleva, las placas y las multas.
// Mismas funciones que pedían las escenas 3D, así el motor de la clase no cambia.
// ==========================================

import { crearDtco } from './dtco.js';

const ANCHO = 900;
const ALTO = 560;

// ---------- PICTOGRAMAS (dibujos simples, se pintan con el color del texto) ----------
const P = {
  conduccion: '<circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" stroke-width="3.2"/><circle cx="20" cy="20" r="4" fill="currentColor"/><path d="M20 24v10M16.5 18 7 14M23.5 18 33 14" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>',
  trabajo: '<g stroke="currentColor" stroke-width="3.2" stroke-linecap="round"><path d="M9 33 27 12"/><path d="M31 33 13 12"/></g><g fill="currentColor"><rect x="21" y="5" width="12" height="7" rx="1.5" transform="rotate(40 27 8.5)"/><rect x="7" y="5" width="12" height="7" rx="1.5" transform="rotate(-40 13 8.5)"/></g>',
  disponibilidad: '<rect x="7" y="7" width="26" height="26" rx="2" fill="none" stroke="currentColor" stroke-width="3.2"/><path d="M9 31 31 9" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>',
  descanso: '<path d="M5 30V14M5 24h30v6M35 30v-6" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/><rect x="8" y="17" width="8" height="6" rx="2" fill="currentColor"/><path d="M17 23v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5" fill="currentColor"/>',
  conductor: '<circle cx="20" cy="12" r="6" fill="currentColor"/><path d="M8 35c0-8 5-13 12-13s12 5 12 13z" fill="currentColor"/>',
  tarjeta: '<rect x="5" y="9" width="30" height="22" rx="3" fill="none" stroke="currentColor" stroke-width="3"/><rect x="9" y="15" width="8" height="7" rx="1" fill="currentColor"/>',
  impresora: '<rect x="11" y="5" width="18" height="10" fill="none" stroke="currentColor" stroke-width="3"/><rect x="5" y="15" width="30" height="13" rx="2" fill="currentColor"/><rect x="11" y="25" width="18" height="10" fill="#0b1220" stroke="currentColor" stroke-width="3"/>',
  barco: '<path d="M6 24h28l-4 8H10z" fill="currentColor"/><path d="M12 24v-8h14v8M18 16v-6" fill="none" stroke="currentColor" stroke-width="3"/><path d="M4 36q4-3 8 0t8 0 8 0 8 0" fill="none" stroke="currentColor" stroke-width="2.4"/>',
  reloj: '<circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" stroke-width="3"/><path d="M20 11v9l6 4" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>',
  incidente: '<path d="M20 5 36 33H4z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M20 15v9" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/><circle cx="20" cy="29" r="2" fill="currentColor"/>',
  fallo: '<path d="M20 5 36 33H4z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M15 18l10 10M25 18 15 28" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>'
};
const ico = (n, t = 22) => `<svg class="pict" viewBox="0 0 40 40" width="${t}" height="${t}">${P[n]}</svg>`;

const ACT = {
  conduccion: { nombre: 'Conducción', color: '#60a5fa' },
  trabajo: { nombre: 'Otros trabajos', color: '#c084fc' },
  disponibilidad: { nombre: 'Disponibilidad', color: '#94a3b8' },
  descanso: { nombre: 'Pausa o descanso', color: '#4ade80' }
};

// Colores de la línea del día
const BLOQUE = {
  c: { color: '#2563eb', pict: 'conduccion' },
  t: { color: '#7c3aed', pict: 'trabajo' },
  x: { color: '#475569', pict: 'disponibilidad' },
  p: { color: '#d97706', pict: 'descanso' },
  d: { color: '#15803d', pict: 'descanso' },
  r: { color: '#dc2626', pict: null },
  j: { color: '#334155', pict: null }
};

const TARJ = {
  conductor: { titulo: 'CONDUCTOR', fondo: '#f8fafc', texto: '#0f172a', quien: 'El conductor', vale: '5 años', sirve: 'Te identifica y guarda tu actividad (al menos 56 días).', modo: 'Modo operativo' },
  empresa: { titulo: 'EMPRESA', fondo: '#facc15', texto: '#0f172a', quien: 'La empresa dueña o que alquila los camiones', vale: '5 años', sirve: 'Ver, imprimir y descargar los datos de sus tacógrafos.', modo: 'Modo empresa' },
  control: { titulo: 'CONTROL', fondo: '#2563eb', texto: '#ffffff', quien: 'Los agentes (Guardia Civil, inspectores)', vale: '5 años', sirve: 'Leer, imprimir y descargar datos en un control.', modo: 'Modo control' },
  taller: { titulo: 'TALLER', fondo: '#dc2626', texto: '#ffffff', quien: 'El técnico del taller autorizado (centro de ensayo)', vale: '1 año', sirve: 'Activar, calibrar, revisar y descargar el tacógrafo.', modo: 'Modo calibrado' }
};

const EXENTOS = {
  lleva: [
    ['Camión de más de 3.500 kg', 'Contando el remolque'],
    ['Autobús de más de 9 plazas', 'Contando al conductor'],
    ['Grúa a más de 100 km', 'Lejos de su base'],
    ['Correos de más de 7.500 kg', 'Por ejemplo, 15.000 kg'],
    ['Línea regular de más de 50 km', 'En viajeros']
  ],
  noLleva: [
    ['Hasta 40 km/h', 'Un tractor'],
    ['Ejército, policía, bomberos', 'Haciendo su trabajo'],
    ['Emergencias y salvamento', ''],
    ['Fines médicos', 'Donación de sangre'],
    ['Autoescuela y cursos CAP', ''],
    ['Recinto cerrado', 'Puerto, aeropuerto'],
    ['Pruebas en carretera', 'Y vehículos nuevos'],
    ['Sin fines comerciales', 'Hasta 7.500 kg, humanitaria, históricos'],
    ['Material propio', 'Hasta 7.500 kg · 100 km'],
    ['Agrícolas y forestales', '100 km'],
    ['Recogida de leche', '100 km'],
    ['Hormigoneras', '100 km'],
    ['Correos hasta 7.500 kg', '100 km'],
    ['Grúa de averías', 'Hasta 100 km'],
    ['Animales a mercados', '100 km en línea recta'],
    ['Basura doméstica', '50 km'],
    ['Alcantarillado, dinero, feria', 'Preparados para eso'],
    ['Islas chicas, Ceuta y Melilla', 'Isla de 250 km² o menos'],
    ['Línea regular hasta 50 km', 'En viajeros']
  ]
};

const CSS = `
#tablero { position: fixed; left: 466px; right: 16px; top: 92px; bottom: 16px; z-index: 5; }
#tablero .escenario { position: absolute; left: 50%; top: 50%; width: ${ANCHO}px; height: ${ALTO}px; transform-origin: 0 0; }
.pantalla { position: absolute; inset: 0; opacity: 0; pointer-events: none; transition: opacity 0.5s ease; font-family: 'Nunito', sans-serif; color: #e2e8f0; }
.pantalla.activa { opacity: 1; pointer-events: auto; }
.pantalla h3 { margin: 0; font-family: 'Orbitron', sans-serif; font-size: 15px; letter-spacing: 0.18em; color: #22d3ee; text-transform: uppercase; }
.pict { display: inline-block; vertical-align: middle; }
.capa-etq { position: absolute; inset: 0; pointer-events: none; z-index: 30; }
.capa-etq .etiqueta3d { opacity: 1; }
@media (max-width: 1100px) { #tablero { left: 8px; right: 8px; top: 84px; bottom: auto; height: 44vh; } }

/* ---- tacógrafo digital ---- */
.dtco { position: absolute; left: 90px; top: 60px; width: 720px; height: 230px; border-radius: 22px;
  background: linear-gradient(180deg, #2b3442, #111827 70%); border: 2px solid #475569;
  box-shadow: 0 30px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.12); }
.dtco .marca { position: absolute; left: 26px; top: 12px; font: 800 11px 'Orbitron', sans-serif; letter-spacing: 0.25em; color: #94a3b8; }
.lcd { position: absolute; left: 40px; top: 36px; width: 400px; height: 104px; border-radius: 8px;
  background: radial-gradient(ellipse at center, #fbbf24 0%, #f59e0b 58%, #d97706 100%);
  border: 6px solid #0b0d11; box-shadow: inset 0 0 18px rgba(146,64,14,0.55), 0 0 26px rgba(245,158,11,0.35); color: #1a0f02;
  font: 800 21px 'Courier New', monospace; padding: 8px 14px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-around; overflow: hidden; }
.lcd::before { content: ''; position: absolute; inset: 0; pointer-events: none;
  background-image: linear-gradient(rgba(0,0,0,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.07) 1px, transparent 1px); background-size: 3px 3px; }
.lcd::after { content: ''; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(115deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 40%, transparent 41%); }
.lcd .sel { border: 2px solid currentColor; padding: 0 8px; background: rgba(26,15,2,0.15); }
.lcd .tenue { opacity: 0.45; }
.lcd .parpadea { animation: lcdParpadeo 1s steps(1) infinite; }
@keyframes lcdParpadeo { 50% { opacity: 0.25; } }
.led { position: absolute; left: 70px; top: 3px; width: 8px; height: 8px; border-radius: 50%; background: #27272a; transition: all 0.3s; }
.led.on { background: #22c55e; box-shadow: 0 0 8px #22c55e; }
.lcd .fila { display: flex; align-items: center; gap: 12px; white-space: nowrap; }
.lcd .fila .num { font-size: 16px; opacity: 0.8; }
.lcd .grande { font-size: 20px; text-align: center; justify-content: center; }
.lcd.aviso .fila { animation: lcdParpadeo 1s steps(1) infinite; }
.teclas { position: absolute; left: 470px; top: 44px; display: grid; grid-template-columns: repeat(4, 50px); gap: 10px; }
.tecla { height: 44px; border-radius: 10px; border: 1px solid #64748b; background: linear-gradient(#475569, #334155); color: #f1f5f9;
  font: 800 16px 'Nunito', sans-serif; cursor: pointer; box-shadow: 0 3px 0 #0f172a; }
.tecla:active { transform: translateY(2px); box-shadow: 0 1px 0 #0f172a; }
.tecla.imp { grid-column: span 4; height: 34px; font-size: 13px; display: flex; align-items: center; justify-content: center; gap: 8px; }
.ranura { position: absolute; top: 160px; width: 300px; height: 52px; }
.ranura .boca { position: absolute; left: 70px; top: 18px; width: 220px; height: 12px; border-radius: 6px; background: #020617; box-shadow: inset 0 2px 4px #000; }
.ranura .btn { position: absolute; left: 0; top: 2px; width: 52px; height: 44px; border-radius: 12px; }
.ranura .rotulo { position: absolute; left: 86px; top: 0px; font: 700 11px 'Nunito', sans-serif; color: #94a3b8; letter-spacing: 0.08em; }
.papel { position: absolute; left: 640px; top: 290px; width: 150px; height: 0; overflow: hidden; background: #fffef5; color: #111;
  font: 700 11px 'Courier New', monospace; border-radius: 0 0 6px 6px; transition: height 1.4s ease; box-shadow: 0 10px 20px rgba(0,0,0,0.4); }
.papel .in { padding: 8px 10px; line-height: 1.5; }
.papel.sale { height: 230px; }
.tarjetas-mesa { position: absolute; left: 90px; top: 320px; width: 520px; height: 120px; }
.tj { position: absolute; width: 130px; height: 84px; transform-origin: 50% 0; border-radius: 10px; cursor: pointer; transition: transform 0.7s cubic-bezier(0.22,1,0.36,1), left 0.7s cubic-bezier(0.22,1,0.36,1), top 0.7s cubic-bezier(0.22,1,0.36,1);
  box-shadow: 0 8px 18px rgba(0,0,0,0.45); font: 900 13px 'Nunito', sans-serif; padding: 10px; box-sizing: border-box; z-index: 5; }
.tj .chip { width: 24px; height: 18px; border-radius: 3px; background: linear-gradient(135deg,#fde68a,#ca8a04); margin-bottom: 6px; }
.tj small { display: block; font-size: 9px; font-weight: 800; opacity: 0.75; margin-top: 4px; }
.tj:hover { filter: brightness(1.08); }
.mando { position: absolute; left: 90px; top: 462px; width: 520px; display: flex; align-items: center; gap: 16px; }
.interruptor { display: flex; border: 1px solid #475569; border-radius: 999px; overflow: hidden; }
.interruptor button { border: 0; padding: 9px 16px; font: 800 13px 'Nunito', sans-serif; background: #1e293b; color: #94a3b8; cursor: pointer; }
.interruptor button.on { background: #22d3ee; color: #0f172a; }
.velo { font: 800 15px 'Nunito', sans-serif; color: #e2e8f0; }
.pista { position: absolute; left: 90px; top: 512px; width: 720px; font: 600 13px 'Nunito', sans-serif; color: #94a3b8; }

/* ---- línea del día ---- */
.dia-caja { position: absolute; left: 30px; right: 30px; top: 60px; }
.dia-titulo { font: 900 22px 'Nunito', sans-serif; color: #f8fafc; margin: 6px 0 104px; }
.dia-barra { position: relative; height: 120px; display: flex; border-radius: 12px; overflow: hidden; background: #0f172a; border: 1px solid #334155; }
.bloque { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; color: #fff; opacity: 0.12;
  transition: opacity 0.6s ease, filter 0.6s ease; border-right: 1px solid rgba(15,23,42,0.6); font: 900 14px 'Nunito', sans-serif; text-align: center; overflow: hidden; }
.bloque.on { opacity: 1; filter: drop-shadow(0 0 10px rgba(255,255,255,0.15)); }
.dia-eje { position: relative; height: 26px; margin-top: 6px; font: 700 12px 'Nunito', sans-serif; color: #64748b; }
.dia-eje span { position: absolute; transform: translateX(-50%); }
.leyenda { display: flex; flex-wrap: wrap; gap: 18px; margin-top: 26px; font: 700 14px 'Nunito', sans-serif; color: #cbd5e1; }
.leyenda div { display: flex; align-items: center; gap: 8px; }

/* ---- pictogramas ---- */
.pic-grande { position: absolute; top: 60px; left: 30px; right: 30px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.pic-chica { position: absolute; top: 330px; left: 30px; right: 30px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.pic { background: #0f172a; border: 1px solid #334155; border-radius: 16px; padding: 14px; transition: box-shadow 0.5s, border-color 0.5s; }
.pic .nom { font: 900 17px 'Nunito', sans-serif; margin: 8px 0 4px; }
.pic .cuando { font: 600 13px 'Nunito', sans-serif; color: #cbd5e1; line-height: 1.35; }
.pic-chica .pic { display: flex; gap: 12px; align-items: center; padding: 10px 12px; }
.pic-chica .nom { font-size: 14px; margin: 0; }
.pic-chica .cuando { font-size: 12px; }
.resaltado { border-color: #22d3ee !important; box-shadow: 0 0 0 3px rgba(34,211,238,0.35), 0 0 30px rgba(34,211,238,0.35); }

/* ---- tarjetas grandes ---- */
.tarj-fila { position: absolute; top: 70px; left: 20px; right: 20px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.tarj-col { background: #0f172a; border: 1px solid #334155; border-radius: 16px; padding: 14px; transition: box-shadow 0.5s, border-color 0.5s; }
.tarj-col .carta { height: 112px; border-radius: 12px; padding: 12px; box-sizing: border-box; font: 900 16px 'Nunito', sans-serif; box-shadow: 0 10px 22px rgba(0,0,0,0.4); }
.tarj-col .carta .chip { width: 30px; height: 22px; border-radius: 4px; background: linear-gradient(135deg,#fde68a,#ca8a04); margin-bottom: 10px; }
.tarj-col dl { margin: 12px 0 0; font: 600 13px 'Nunito', sans-serif; color: #cbd5e1; }
.tarj-col dt { color: #22d3ee; font: 800 11px 'Nunito', sans-serif; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 10px; }
.tarj-col dd { margin: 3px 0 0; line-height: 1.35; }

/* ---- exentos ---- */
.ex-caja { position: absolute; top: 56px; left: 20px; right: 20px; display: grid; grid-template-columns: 1fr 3fr; gap: 18px; }
.ex-col h4 { margin: 0 0 8px; font: 900 15px 'Nunito', sans-serif; }
.ex-grid { display: grid; gap: 7px; }
.ex-col.no .ex-grid { grid-template-columns: repeat(3, 1fr); }
.ex { border-radius: 10px; padding: 7px 10px; font: 800 13px 'Nunito', sans-serif; border: 1px solid; transition: box-shadow 0.5s, border-color 0.5s; }
.ex small { display: block; font-weight: 600; font-size: 11px; opacity: 0.8; }
.ex-col.si .ex { background: rgba(37,99,235,0.18); border-color: #1d4ed8; }
.ex-col.no .ex { background: rgba(22,163,74,0.14); border-color: #166534; }

/* ---- placas ---- */
.placa { position: absolute; top: 80px; width: 380px; background: linear-gradient(#e2e8f0, #cbd5e1); color: #0f172a; border-radius: 10px; padding: 16px 18px;
  font: 700 14px 'Courier New', monospace; line-height: 1.7; box-shadow: 0 16px 30px rgba(0,0,0,0.5); transition: box-shadow 0.5s; }
.placa b { font-family: 'Nunito', sans-serif; font-size: 15px; letter-spacing: 0.08em; }
.marca-e { display: inline-flex; align-items: center; gap: 8px; border: 3px solid #0f172a; padding: 2px 10px; font: 900 22px 'Nunito', sans-serif; }

/* ---- multas ---- */
.mul-fila { position: absolute; top: 70px; left: 20px; right: 20px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.mul { border-radius: 16px; padding: 16px; border: 2px solid; transition: box-shadow 0.5s; }
.mul .tit { font: 900 20px 'Nunito', sans-serif; }
.mul .eur { font: 900 28px 'Nunito', sans-serif; margin: 6px 0 10px; }
.mul ul { margin: 0; padding-left: 18px; font: 600 13px 'Nunito', sans-serif; line-height: 1.5; color: #e2e8f0; }
.mul-pie { position: absolute; top: 380px; left: 20px; right: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.mul-pie > div { background: #0f172a; border: 1px solid #334155; border-radius: 14px; padding: 14px 16px; font: 600 14px 'Nunito', sans-serif; line-height: 1.5; transition: box-shadow 0.5s, border-color 0.5s; }

/* ---- disco ---- */
.disco-svg { position: absolute; left: 30px; top: 30px; width: 500px; height: 500px; transition: transform 1s ease; }
.disco-svg.vuelta { transform: rotateY(180deg); }
.disco-svg .cara { transition: opacity 0.3s 0.5s; }
.zona { cursor: pointer; transition: filter 0.3s; }
.zona:hover, .zona.resaltado { filter: drop-shadow(0 0 10px #22d3ee) brightness(1.08); }
.disco-ley { position: absolute; left: 560px; top: 40px; width: 320px; display: grid; gap: 10px; }
.disco-ley > div { background: #0f172a; border: 1px solid #334155; border-radius: 12px; padding: 10px 12px; font: 600 13px 'Nunito', sans-serif; line-height: 1.35; color: #cbd5e1; transition: box-shadow 0.5s, border-color 0.5s; }
.disco-ley b { color: #f8fafc; font-size: 14px; }
.btn-vuelta { position: absolute; left: 560px; top: 486px; padding: 10px 16px; border-radius: 999px; border: 1px solid #22d3ee; background: rgba(34,211,238,0.12); color: #a5f3fc; font: 800 14px 'Nunito', sans-serif; cursor: pointer; }

/* ---- portada ---- */
.port { position: absolute; left: 40px; right: 40px; top: 80px; text-align: center; }
.port h2 { font: 900 40px 'Nunito', sans-serif; color: #f8fafc; margin: 0 0 8px; }
.port p { font: 600 17px 'Nunito', sans-serif; color: #94a3b8; margin: 0 0 40px; }
.port .fila-pic { display: flex; justify-content: center; gap: 40px; }
.port .fila-pic div { display: flex; flex-direction: column; align-items: center; gap: 10px; font: 800 15px 'Nunito', sans-serif; }
`;

export function crearTableroTacografo() {
  // ---------- ESTILOS Y CONTENEDOR ----------
  const estilo = document.createElement('style');
  estilo.textContent = CSS;
  document.head.appendChild(estilo);
  const tablero = document.createElement('div');
  tablero.id = 'tablero';
  const esc = document.createElement('div');
  esc.className = 'escenario';
  tablero.appendChild(esc);
  document.body.appendChild(tablero);

  const pantallas = {};
  function nuevaPantalla(nombre, html) {
    const p = document.createElement('div');
    p.className = 'pantalla';
    p.innerHTML = html + '<div class="capa-etq"></div>';
    esc.appendChild(p);
    pantallas[nombre] = p;
    return p;
  }

  // ---------- PORTADA ----------
  nuevaPantalla('general', `
    <div class="port">
      <h2>El tacógrafo</h2>
      <p>El aparato que anota cuánto manejás, cuánto trabajás y cuánto descansás.</p>
      <div class="fila-pic">
        ${Object.entries(ACT).map(([k, a]) => `<div style="color:${a.color}">${ico(k, 84)}<span>${a.nombre}</span></div>`).join('')}
      </div>
    </div>`);

  // ---------- TACÓGRAFO DIGITAL (simulador) ----------
  const pAparato = nuevaPantalla('aparato', '');
  const dtco = crearDtco(pAparato, ico);

  // ---------- DISCO ANALÓGICO ----------
  const pDisco = nuevaPantalla('disco', `
    <h3 style="position:absolute;left:30px;top:6px">El disco del tacógrafo analógico</h3>
    <svg class="disco-svg" id="disco" viewBox="-250 -250 500 500">
      <g class="cara" id="anverso">
        <g id="giro">
          <circle r="240" fill="#f8fafc"/>
          <g class="zona" data-z="velocidad"><circle r="238" fill="#dbeafe"/><circle r="190" fill="#f8fafc"/></g>
          <g class="zona" data-z="actividades"><circle r="186" fill="#fef3c7"/><circle r="148" fill="#f8fafc"/></g>
          <g class="zona" data-z="km"><circle r="144" fill="#dcfce7"/><circle r="112" fill="#f8fafc"/></g>
          <g id="marcas"></g>
          <g id="trazos"></g>
        </g>
        <g class="zona" data-z="centro"><circle r="108" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/></g>
        <g id="centro-texto" font-family="'Segoe Script','Comic Sans MS',cursive" font-size="12" fill="#1e3a8a" text-anchor="middle"></g>
        <g class="zona" data-z="impreso"><rect x="-58" y="62" width="116" height="22" rx="3" fill="#e2e8f0"/><text y="77" text-anchor="middle" font-size="10" font-weight="800" fill="#0f172a" font-family="Nunito">e1 · 125 km/h · FABRIC.</text></g>
        <path d="M0 -250 L0 -200" stroke="#ef4444" stroke-width="4"/>
      </g>
      <g class="cara" id="reverso" style="opacity:0" transform="scale(-1,1)">
        <circle r="240" fill="#f1f5f9"/>
        <circle r="200" fill="none" stroke="#cbd5e1" stroke-width="2"/>
        <text y="-150" text-anchor="middle" font-family="Nunito" font-weight="900" font-size="18" fill="#0f172a">REVERSO</text>
        <text y="-122" text-anchor="middle" font-family="Nunito" font-weight="700" font-size="13" fill="#475569">Cambios de camión en la jornada</text>
        <g font-family="'Segoe Script','Comic Sans MS',cursive" font-size="13" fill="#1e3a8a">
          <text x="-170" y="-70">Matrícula  · km al tomar · km al dejar</text>
          <text x="-170" y="-30">1234 ABC · 244.900 · 245.120</text>
          <text x="-170" y="10">5678 DEF · 81.300 · 81.560</text>
        </g>
        <path d="M-180 -55H180M-180 -15H180M-180 25H180" stroke="#cbd5e1"/>
      </g>
    </svg>
    <div class="disco-ley">
      <div data-l="velocidad"><b>1 · Afuera: velocidad.</b> Marcada de 20 en 20 km/h. La graba sola.</div>
      <div data-l="actividades"><b>2 · En el medio: actividades.</b> Se distinguen por el grosor o la posición del trazo. La conducción la anota sola; lo demás, con el selector.</div>
      <div data-l="km"><b>3 · Adentro: kilómetros.</b> Una línea quebrada que sube y baja.</div>
      <div data-l="centro"><b>4 · El centro: lo anotás vos a mano.</b> Nombre y apellidos, lugar y fecha al empezar y al terminar, matrícula y kilómetros al empezar y al terminar.</div>
      <div data-l="impreso"><b>5 · Impreso de fábrica.</b> Fabricante, marca de homologación de los tacógrafos donde sirve y velocidad máxima que marca.</div>
    </div>
    <button class="btn-vuelta" id="btn-vuelta">Dar vuelta al disco</button>
  `);
  const disco = pDisco.querySelector('#disco');
  const giro = pDisco.querySelector('#giro');
  const marcas = pDisco.querySelector('#marcas');
  const trazos = pDisco.querySelector('#trazos');
  const centroTexto = pDisco.querySelector('#centro-texto');
  (function dibujarDisco() {
    let m = '';
    for (let h = 0; h < 24; h++) {
      const a = h / 24 * Math.PI * 2 - Math.PI / 2;
      const c = Math.cos(a), s = Math.sin(a);
      m += `<line x1="${c * 190}" y1="${s * 190}" x2="${c * 238}" y2="${s * 238}" stroke="#94a3b8" stroke-width="1"/>`;
      m += `<text x="${c * 226}" y="${s * 226 + 4}" font-size="11" font-weight="800" text-anchor="middle" fill="#334155" font-family="Nunito" transform="rotate(${h * 15} ${c * 226} ${s * 226})">${h}</text>`;
    }
    [20, 40, 60, 80, 100, 120].forEach((v, i) => {
      const r = 194 + i * 6.5;
      m += `<circle r="${r}" fill="none" stroke="#bfdbfe" stroke-width="0.8"/>`;
    });
    marcas.innerHTML = m;
    // trazos de ejemplo: velocidad, actividades (grueso = conducción) y km
    let v = '', k = '';
    for (let i = 0; i <= 160; i++) {
      const a = (8 + i * 4.5 / 160 * 1) / 24 * Math.PI * 2 - Math.PI / 2;
      const r = 200 + 26 * Math.abs(Math.sin(i * 0.35)) * (i % 40 < 34 ? 1 : 0.1);
      v += (i ? 'L' : 'M') + (Math.cos(a) * r).toFixed(1) + ' ' + (Math.sin(a) * r).toFixed(1);
    }
    for (let i = 0; i <= 40; i++) {
      const a = (8 + i * 4.5 / 40) / 24 * Math.PI * 2 - Math.PI / 2;
      const r = i % 2 ? 118 : 138;
      k += (i ? 'L' : 'M') + (Math.cos(a) * r).toFixed(1) + ' ' + (Math.sin(a) * r).toFixed(1);
    }
    const arco = (h1, h2, r) => {
      const a1 = h1 / 24 * Math.PI * 2 - Math.PI / 2, a2 = h2 / 24 * Math.PI * 2 - Math.PI / 2;
      return `M${Math.cos(a1) * r} ${Math.sin(a1) * r} A${r} ${r} 0 ${h2 - h1 > 12 ? 1 : 0} 1 ${Math.cos(a2) * r} ${Math.sin(a2) * r}`;
    };
    trazos.innerHTML = `
      <path d="${v}" fill="none" stroke="#1e3a8a" stroke-width="1.6"/>
      <path d="${k}" fill="none" stroke="#14532d" stroke-width="1.6"/>
      <path d="${arco(8, 12.5, 172)}" fill="none" stroke="#1e3a8a" stroke-width="12"/>
      <path d="${arco(12.5, 13.25, 160)}" fill="none" stroke="#1e3a8a" stroke-width="3"/>
      <path d="${arco(13.25, 17.75, 172)}" fill="none" stroke="#1e3a8a" stroke-width="12"/>
      <path d="${arco(17.75, 18.25, 166)}" fill="none" stroke="#1e3a8a" stroke-width="7"/>`;
    centroTexto.innerHTML = `
      <text y="-70">Damian Motunga</text>
      <text y="-46">Lleida 22/11 → Zaragoza 22/11</text>
      <text y="-22">1234 ABC</text>
      <text y="4">km fin 245.380</text>
      <text y="26">km inicio 244.900</text>
      <text y="48" font-weight="700">total 480 km</text>`;
  })();
  const ley = {};
  pDisco.querySelectorAll('.disco-ley > div').forEach(d => { ley[d.dataset.l] = d; });
  pDisco.querySelectorAll('.zona').forEach(z => {
    z.addEventListener('mouseenter', () => resaltar(z.dataset.z));
    z.addEventListener('click', () => resaltar(z.dataset.z));
  });
  let vuelta = false;
  function girarDisco(si) {
    vuelta = si;
    disco.classList.toggle('vuelta', si);
    pDisco.querySelector('#anverso').style.opacity = si ? 0 : 1;
    pDisco.querySelector('#reverso').style.opacity = si ? 1 : 0;
    pDisco.querySelector('#btn-vuelta').textContent = si ? 'Ver el frente' : 'Dar vuelta al disco';
  }
  pDisco.querySelector('#btn-vuelta').onclick = () => girarDisco(!vuelta);
  let anguloDisco = 0;
  let girando = false;

  // ---------- LÍNEA DEL DÍA ----------
  const pDia = nuevaPantalla('dia', `
    <div class="dia-caja">
      <h3>Línea del día</h3>
      <div class="dia-titulo" id="dia-titulo"></div>
      <div class="dia-barra" id="dia-barra" data-ancla="dia"></div>
      <div class="dia-eje" id="dia-eje"></div>
      <div class="leyenda">
        <div style="color:#60a5fa">${ico('conduccion', 26)} Conducción</div>
        <div style="color:#c084fc">${ico('trabajo', 26)} Otros trabajos</div>
        <div style="color:#94a3b8">${ico('disponibilidad', 26)} Disponibilidad</div>
        <div style="color:#fbbf24">${ico('descanso', 26)} Pausa</div>
        <div style="color:#4ade80">${ico('descanso', 26)} Descanso</div>
        <div style="color:#f87171"><span style="display:inline-block;width:22px;height:22px;border-radius:5px;background:#dc2626"></span> Exceso o lo que falta</div>
        <div id="leyenda-dias" style="color:#cbd5e1;display:none"><span style="display:inline-block;width:22px;height:22px;border-radius:5px;background:#334155;border:1px solid #64748b"></span> Días de trabajo</div>
      </div>
    </div>`);
  const diaBarra = pDia.querySelector('#dia-barra');
  const diaEje = pDia.querySelector('#dia-eje');
  const diaTitulo = pDia.querySelector('#dia-titulo');
  let piezas = [];
  function dia(bloques, titulo = 'Un día de trabajo', total = null, eje = 'horas') {
    diaTitulo.textContent = titulo;
    pDia.querySelector('#leyenda-dias').style.display = bloques.some(b => b[0] === 'j') ? '' : 'none';
    diaBarra.innerHTML = '';
    piezas = [];
    const suma = total || bloques.reduce((a, b) => a + b[1], 0) || 1;
    bloques.forEach(([t, h, texto]) => {
      const b = document.createElement('div');
      b.className = 'bloque';
      b.style.width = (100 * h / suma) + '%';
      b.style.background = BLOQUE[t].color;
      const ancho = 840 * h / suma;
      b.innerHTML = (BLOQUE[t].pict && ancho > 34 ? ico(BLOQUE[t].pict, 30) : '') + (ancho > 50 ? `<span>${texto || ''}</span>` : '');
      b.title = texto || '';
      diaBarra.appendChild(b);
      piezas.push(b);
    });
    if (total) {
      const resto = document.createElement('div');
      resto.style.flex = '1';
      diaBarra.appendChild(resto);
    }
    // eje
    let html = '';
    if (eje === 'horas') {
      const paso = suma > 48 ? 24 : suma > 24 ? 4 : 2;
      for (let h = 0; h <= suma; h += paso) html += `<span style="left:${100 * h / suma}%">${h} h</span>`;
    }
    diaEje.innerHTML = html;
  }
  function diaHasta(n) { piezas.forEach((p, i) => p.classList.toggle('on', i < n)); }

  // ---------- PICTOGRAMAS ----------
  const pPic = nuevaPantalla('pictogramas', `
    <h3 style="position:absolute;left:30px;top:22px">Los pictogramas de las actividades</h3>
    <div class="pic-grande">
      <div class="pic" data-r="conduccion" style="color:#60a5fa">${ico('conduccion', 54)}<div class="nom">Conducción · volante</div><div class="cuando">La marca sola el tacógrafo cuando el camión anda, para el de la ranura 1.</div></div>
      <div class="pic" data-r="trabajo" style="color:#c084fc">${ico('trabajo', 54)}<div class="nom">Otros trabajos · martillos</div><div class="cuando">Cargar, descargar, limpiar, revisar el camión, trámites, o manejar un vehículo que no lleva tacógrafo.</div></div>
      <div class="pic" data-r="disponibilidad" style="color:#94a3b8">${ico('disponibilidad', 54)}<div class="nom">Disponibilidad · cuadrado</div><div class="cuando">Esperar sabiendo cuánto dura (frontera, turno de carga) o ir de acompañante en equipo.</div></div>
      <div class="pic" data-r="descanso" style="color:#4ade80">${ico('descanso', 54)}<div class="nom">Pausa y descanso · cama</div><div class="cuando">Las pausas y los descansos. También el barco o tren con litera.</div></div>
    </div>
    <div class="pic-chica">
      <div class="pic" data-r="conductor">${ico('conductor', 30)}<div><div class="nom">Conductor 1 y 2</div><div class="cuando">Con un número al lado: qué ranura es.</div></div></div>
      <div class="pic" data-r="tarjeta">${ico('tarjeta', 30)}<div><div class="nom">Tarjeta</div><div class="cuando">Que hay una tarjeta puesta.</div></div></div>
      <div class="pic" data-r="impresora">${ico('impresora', 30)}<div><div class="nom">Impresora</div><div class="cuando">Imprimir datos. Va arriba en el papel impreso.</div></div></div>
      <div class="pic" data-r="barco">${ico('barco', 30)}<div><div class="nom">Barco o tren</div><div class="cuando">El camión viaja en ferry o en tren.</div></div></div>
      <div class="pic" data-r="reloj">${ico('reloj', 30)}<div><div class="nom">Hora</div><div class="cuando">Graba en hora UTC; la local es solo para mirar.</div></div></div>
      <div class="pic" data-r="incidente" style="color:#fbbf24">${ico('incidente', 30)}<div><div class="nom">Incidente</div><div class="cuando">Algo que puede ser trampa: tarjeta puesta andando, caja abierta.</div></div></div>
      <div class="pic" data-r="fallo" style="color:#f87171">${ico('fallo', 30)}<div><div class="nom">Fallo</div><div class="cuando">Algo que funciona mal: impresora, sensor, descarga.</div></div></div>
      <div class="pic" data-r="combinan">${ico('conductor', 22)}${ico('tarjeta', 22)}<div><div class="nom">Se combinan</div><div class="cuando">Juntos dicen más: conductor + tarjeta = tarjeta del conductor.</div></div></div>
    </div>`);

  // ---------- TARJETAS ----------
  nuevaPantalla('tarjetas', `
    <h3 style="position:absolute;left:20px;top:26px">Las cuatro tarjetas del tacógrafo digital</h3>
    <div class="tarj-fila">
      ${Object.entries(TARJ).map(([k, t]) => `
        <div class="tarj-col" data-r="${k}">
          <div class="carta" style="background:${t.fondo};color:${t.texto}"><div class="chip"></div>${t.titulo}<div style="font-size:10px;opacity:.75;margin-top:6px">TARJETA DE TACÓGRAFO</div></div>
          <dl><dt>La tiene</dt><dd>${t.quien}</dd><dt>Vale</dt><dd>${t.vale}</dd><dt>Sirve para</dt><dd>${t.sirve}</dd><dt>Pone el tacógrafo en</dt><dd>${t.modo}</dd></dl>
        </div>`).join('')}
    </div>`);

  // ---------- QUIÉN LO LLEVA ----------
  nuevaPantalla('exentos', `
    <h3 style="position:absolute;left:20px;top:20px">¿Quién lleva tacógrafo?</h3>
    <div class="ex-caja">
      <div class="ex-col si"><h4 style="color:#93c5fd">LLEVAN</h4><div class="ex-grid">${EXENTOS.lleva.map(([a, b], i) => `<div class="ex" data-r="si${i}">${a}<small>${b}</small></div>`).join('')}</div></div>
      <div class="ex-col no"><h4 style="color:#86efac">NO LLEVAN (aunque pesen más de 3.500 kg)</h4><div class="ex-grid">${EXENTOS.noLleva.map(([a, b], i) => `<div class="ex" data-r="no${i}">${a}<small>${b}</small></div>`).join('')}</div></div>
    </div>`);

  // ---------- PLACAS Y HOMOLOGACIÓN ----------
  nuevaPantalla('placas', `
    <h3 style="position:absolute;left:40px;top:24px">Homologación, placas y revisión</h3>
    <div class="placa" data-r="descriptiva" style="left:40px"><b>PLACA DESCRIPTIVA</b><br>La pone el fabricante en el aparato<br>Fabricante: TACO S.A.<br>Modelo: DT-4 · Serie 0012345<br><span class="marca-e">e 9</span> 0041<br><small>(constante K: solo en analógicos)</small></div>
    <div class="placa" data-r="instalacion" style="left:470px"><b>PLACA DE INSTALACIÓN</b><br>En el tacógrafo o al lado, a la vista<br>Taller autorizado: E-25-000<br>Fecha de instalación: 03/2025<br>Neumáticos · constantes w, k, l<br><b style="color:#b91c1c">Próxima revisión: 03/2027</b></div>
    <div style="position:absolute;left:40px;top:380px;width:820px;display:grid;grid-template-columns:1fr 1fr;gap:16px">
      <div class="pic" data-r="marca"><div class="nom"><span class="marca-e" style="color:#e2e8f0;border-color:#e2e8f0">e 9</span> La marca de homologación</div><div class="cuando">Una "e" minúscula y el número del país que lo aprobó, dentro de un rectángulo. 9 = España. Lo aprueba un solo país.</div></div>
      <div class="pic" data-r="revision"><div class="nom">Revisión: cada 2 años</div><div class="cuando">En un taller autorizado. Revisan precintos e instalación. Si la hora UTC tiene más de 20 minutos de diferencia, también.</div></div>
    </div>`);

  // ---------- MULTAS ----------
  nuevaPantalla('sanciones', `
    <h3 style="position:absolute;left:20px;top:26px">Infracciones y multas</h3>
    <div class="mul-fila">
      <div class="mul" data-r="leve" style="border-color:#ca8a04;background:rgba(202,138,4,0.12)"><div class="tit" style="color:#facc15">LEVE</div><div class="eur">100 – 400 €</div><ul><li>58 horas de manejo en la semana</li><li>Descanso diario de 10 h 30</li><li>2 horas menos de descanso semanal</li><li>En equipo, descansar 8 horas</li></ul></div>
      <div class="mul" data-r="grave" style="border-color:#ea580c;background:rgba(234,88,12,0.12)"><div class="tit" style="color:#fb923c">GRAVE</div><div class="eur">401 – 1.000 €</div><ul><li>1 h 30 de más en el día</li><li>5 h 15 sin pausa</li><li>Descanso diario 1 h 20 más corto</li><li>Semanal reducido de 21 horas</li><li>Discos no homologados</li></ul></div>
      <div class="mul" data-r="muygrave" style="border-color:#dc2626;background:rgba(220,38,38,0.14)"><div class="tit" style="color:#f87171">MUY GRAVE</div><div class="eur">1.001 – 6.000 €</div><ul><li>Más de 2 horas de más en el día, o más del 50%</li><li>65 horas en la semana</li><li>Menos de la mitad del descanso</li><li>Manipular, no poner tarjeta o disco, tarjeta de otro</li><li>Impedir el control</li></ul></div>
    </div>
    <div class="mul-pie">
      <div data-r="puntos"><b style="color:#f8fafc">Puntos del carnet:</b> más del 50% de exceso o de falta de descanso, 6 puntos. Manipular también saca puntos.</div>
      <div data-r="presc"><b style="color:#f8fafc">Prescripción:</b> infracciones leves y graves, 1 año. Sanciones: leves 1 año, graves 2, muy graves 3. Manipular siendo reincidente: 6.001 – 18.000 €.</div>
    </div>`);

  // ---------- ESCALAR AL TAMAÑO DE LA PANTALLA ----------
  function ajustar() {
    const w = tablero.clientWidth, h = tablero.clientHeight;
    const k = Math.min(w / ANCHO, h / ALTO);
    esc.style.transform = `scale(${k}) translate(-50%, -50%)`;
  }
  window.addEventListener('resize', ajustar);
  ajustar();

  // ---------- VISTA ACTUAL ----------
  let actual = 'general';
  function verPantalla(n) {
    if (!pantallas[n]) n = 'general';
    actual = n;
    Object.entries(pantallas).forEach(([k, p]) => p.classList.toggle('activa', k === n));
  }
  verPantalla('general');

  // ---------- CARTELITOS ----------
  // anclas: [pantalla, x, y] en coordenadas del escenario
  const ANCLAS = {
    aparato: ['aparato', 350, 66], lcd: ['aparato', 335, 162], ranura1: ['aparato', 200, 300], ranura2: ['aparato', 480, 300],
    b1: ['aparato', 95, 172], b2: ['aparato', 95, 236], impresora: ['aparato', 350, 108], mesa: ['aparato', 785, 62], mando: ['aparato', 300, 448],
    dia: ['dia', 450, 206],
    velocidad: ['disco', 280, 40], actividades: ['disco', 280, 92], km: ['disco', 280, 130], centro: ['disco', 280, 196], impreso: ['disco', 280, 352],
    tarjetas: ['tarjetas', 450, 66], exentos: ['exentos', 450, 52], placas: ['placas', 450, 70], sanciones: ['sanciones', 450, 66],
    pictogramas: ['pictogramas', 450, 56]
  };
  const etiquetas = {};
  function etiqueta(nombre, html = null, tipo = '') {
    if (etiquetas[nombre]) { etiquetas[nombre].remove(); delete etiquetas[nombre]; }
    if (html === null) { if (ANCLAS[nombre] && ANCLAS[nombre][0] === 'aparato') dtco.explicar(null); return; }
    const a = ANCLAS[nombre];
    if (!a) return;
    const [pn, x, y] = a;
    if (pn === 'aparato') { dtco.explicar(html, nombre); return; }
    const el = document.createElement('div');
    el.className = 'etiqueta3d aparece ' + tipo;
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.innerHTML = `<div class="etq-in">${html}</div>`;
    pantallas[pn].querySelector('.capa-etq').appendChild(el);
    etiquetas[nombre] = el;
  }

  // ---------- RESALTAR ----------
  function resaltar(nombre) {
    document.querySelectorAll('#tablero .resaltado').forEach(e => e.classList.remove('resaltado'));
    if (!nombre) return;
    document.querySelectorAll(`#tablero [data-r="${nombre}"], #tablero [data-z="${nombre}"], #tablero [data-l="${nombre}"]`).forEach(e => e.classList.add('resaltado'));
  }

  // ---------- LO QUE PIDE EL MOTOR DE LA CLASE ----------
  function limpiar() {
    Object.keys(etiquetas).forEach(n => etiqueta(n, null));
    resaltar(null);
    dtco.limpiarClase();
    girarDisco(false);
    girando = false;
    dia([]);
  }
  function actualizar(dt) {
    dtco.actualizar(dt);
    if (girando) {
      anguloDisco += dt * 12;
      giro.setAttribute('transform', `rotate(${-anguloDisco})`);
    }
  }
  const nada = () => {};

  limpiar();

  return {
    verPantalla,
    // motor
    limpiar, actualizar, tipo: nada, ubicarEtiquetas: nada, mostrar: nada, yaVisible: nada, camionA: nada,
    etiqueta, resaltar,
    // aparato
    reiniciarAparato: dtco.reset, insertar: dtco.insertar, sacar: dtco.sacar, andar: dtco.andar, actividad: dtco.actividad, imprimir: dtco.imprimir, pantalla: (t, s = 4) => dtco.pantalla(t, s),
    // disco
    girarDisco, trazarDisco: si => { girando = si; },
    // día
    dia, diaHasta
  };
}
