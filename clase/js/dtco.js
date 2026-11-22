// ==========================================
// SIMULADOR DE TACÓGRAFO DIGITAL (basado en el que armó Gemini, corregido)
// Llave de contacto con arranque, pantalla ámbar o blanca, botones 1 y 2,
// menús reales (OK ▲ ▼ ↩), entrada manual con país, impresora, acelerador,
// reloj rápido, sonidos, giro 3D arrastrando y las 4 tarjetas en las 2 ranuras.
// Correcciones respecto del original, para que coincida con el examen:
//  · la tarjeta se puede meter andando, pero queda un INCIDENTE;
//  · andando, el segundo conductor queda en DISPONIBILIDAD (no puede marcar cama);
//  · la ranura 2 funciona y el modo cambia según las tarjetas.
// ==========================================

const CSS = `
.dt-top { position: absolute; left: 40px; top: 14px; right: 40px; display: flex; gap: 10px; align-items: center; }
.dt-chip { display: flex; align-items: center; gap: 8px; background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 6px 12px; color: #e2e8f0; font: 700 12px 'Nunito', sans-serif; cursor: pointer; }
.dt-chip:hover { background: #273449; }
.dt-llave { width: 30px; height: 30px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #475569, #1e293b 65%, #0f172a); border: 2px solid #334155; display: flex; align-items: center; justify-content: center; }
.dt-llave i { width: 6px; height: 20px; border-radius: 2px; background: linear-gradient(90deg, #94a3b8, #f1f5f9, #64748b); transform: rotate(-35deg); transition: transform 0.35s ease; }
.dt-llave.on i { transform: rotate(35deg); }
.dt-escena { position: absolute; left: 30px; top: 62px; width: 640px; perspective: 1400px; perspective-origin: 50% 45%; }
.dt-rig { transform-style: preserve-3d; transition: transform 0.35s cubic-bezier(0.22,1,0.36,1); }
.dt-rig.arrastrando { transition: none; }
.dt-bisel { background: linear-gradient(160deg, #232730, #14161b 60%, #0d0f12); border-radius: 22px; padding: 14px 16px;
  box-shadow: 0 35px 70px -15px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.08), inset 0 2px 3px rgba(255,255,255,0.12), inset 0 -8px 18px rgba(0,0,0,0.8); }
.dt-bisel .rot { display: flex; justify-content: space-between; font: 600 10px 'Courier New', monospace; letter-spacing: 0.15em; color: #64748b; margin-bottom: 6px; }
.dt-unidad { position: relative; background: linear-gradient(180deg, #2a2e37, #1d2026 35%, #16181d); border-radius: 14px; padding: 12px 14px 14px;
  border: 1px solid rgba(255,255,255,0.11); box-shadow: inset 0 1px 1px rgba(255,255,255,0.18), inset 0 -4px 10px rgba(0,0,0,0.75), 0 14px 28px rgba(0,0,0,0.65); }
.dt-impresora { position: relative; background: linear-gradient(180deg, #111317, #1c1f26); border-radius: 8px; padding: 5px 12px; border: 1px solid rgba(255,255,255,0.07); box-shadow: inset 0 3px 8px rgba(0,0,0,0.9); margin-bottom: 10px; }
.dt-impresora .cab { display: flex; justify-content: space-between; align-items: center; font: 700 10px 'Nunito', sans-serif; color: #94a3b8; margin-bottom: 3px; }
.dt-impresora .cab button { background: none; border: 0; color: #fbbf24; font: 800 11px 'Nunito', sans-serif; cursor: pointer; }
.dt-boca-imp { height: 7px; background: #050608; border-radius: 4px; border-bottom: 1px solid rgba(255,255,255,0.12); }
.dt-papel { position: absolute; left: 50%; bottom: 4px; transform: translateX(-50%) translateZ(26px); width: 230px; max-height: 0; overflow: hidden; transition: max-height 1.8s cubic-bezier(0.25,0.8,0.25,1); z-index: 40; filter: drop-shadow(0 12px 20px rgba(0,0,0,0.75)); }
.dt-papel.sale { max-height: 380px; }
.dt-papel .hoja { background: linear-gradient(180deg, #f8fafc, #f1f5f9 88%, #e2e8f0); color: #0f172a; font: 700 10px 'Courier New', monospace; line-height: 1.4; padding: 10px 12px 12px; border-bottom: 2px dashed #94a3b8; }
.dt-papel button { width: 100%; background: #1e293b; color: #fff; border: 0; font: 800 10px 'Nunito', sans-serif; padding: 5px; cursor: pointer; }
.dt-centro { display: grid; grid-template-columns: 62px 1fr 92px; gap: 10px; margin-bottom: 12px; }
.dt-btn { position: relative; background: linear-gradient(180deg, #323743, #20232b); color: #f1f5f9; border: 1px solid rgba(255,255,255,0.14); border-bottom: 3px solid #0d0f13; border-radius: 7px;
  font: 800 14px 'Nunito', sans-serif; box-shadow: 0 4px 6px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.18); cursor: pointer; transition: transform 0.08s; display: flex; align-items: center; justify-content: center; gap: 4px; }
.dt-btn:hover { background: linear-gradient(180deg, #3b414f, #262a33); }
.dt-btn:active, .dt-btn.pulsado { transform: translateY(2px); border-bottom-width: 1px; }
.dt-btn.ok { background: linear-gradient(180deg, #2563eb, #1d4ed8); border-bottom-color: #1e3a8a; }
.dt-act { display: grid; gap: 8px; }
.dt-act .dt-btn { flex-direction: column; height: 56px; }
.dt-act .dt-btn b { color: #fbbf24; font-size: 14px; }
.dt-nav { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
.dt-bisel-lcd { background: linear-gradient(145deg, #0e1013, #1b1e24); border-radius: 10px; padding: 8px; border: 1px solid rgba(255,255,255,0.08); box-shadow: inset 0 4px 12px rgba(0,0,0,0.95); }
.dt-lcd { position: relative; height: 112px; border-radius: 6px; font: 700 16px 'Courier New', monospace; padding: 8px 12px; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden;
  background: linear-gradient(135deg, #1d221f, #151917); color: rgba(255,255,255,0.04); box-shadow: inset 0 2px 10px rgba(0,0,0,0.85); transition: all 0.45s ease; }
.dt-lcd.on.ambar { background: radial-gradient(ellipse at center, #fbbf24, #f59e0b 55%, #d97706); color: #180d02; box-shadow: inset 0 0 18px rgba(146,64,14,0.55), 0 0 26px rgba(245,158,11,0.45); }
.dt-lcd.on.blanca { background: radial-gradient(ellipse at center, #f8fafc, #e2e8f0 65%, #cbd5e1); color: #090d16; box-shadow: inset 0 0 16px rgba(71,85,105,0.35), 0 0 24px rgba(226,232,240,0.35); }
.dt-lcd::before { content: ''; position: absolute; inset: 0; pointer-events: none; z-index: 2; background-image: linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px); background-size: 2px 2px; }
.dt-lcd::after { content: ''; position: absolute; inset: 0; pointer-events: none; z-index: 3; background: linear-gradient(115deg, rgba(255,255,255,0.22), rgba(255,255,255,0.04) 42%, transparent 43%); }
.dt-lcd .c { position: relative; z-index: 1; height: 100%; display: flex; flex-direction: column; justify-content: space-between; }
.dt-lcd .f { display: flex; align-items: center; justify-content: space-between; gap: 8px; white-space: nowrap; }
.dt-lcd .med { text-align: center; justify-content: center; display: flex; flex-direction: column; align-items: center; height: 100%; }
.dt-lcd .sel { padding: 0 8px; border: 1px solid currentColor; background: rgba(0,0,0,0.12); }
.dt-lcd .tenue { opacity: 0.5; }
.dt-lcd .pp { animation: dtParpadeo 1s steps(1) infinite; }
@keyframes dtParpadeo { 50% { opacity: 0.2; } }
.dt-ranuras { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.dt-ranura { background: #101216; border-radius: 7px; padding: 6px 9px; border: 1px solid rgba(255,255,255,0.07); box-shadow: inset 0 3px 7px rgba(0,0,0,0.92); }
.dt-ranura .cab { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; font: 800 10px 'Nunito', sans-serif; color: #cbd5e1; letter-spacing: 0.04em; }
.dt-ranura .cab .dt-btn { padding: 1px 8px; font-size: 11px; height: 20px; }
.dt-ranura .boca { position: relative; height: 8px; background: #040507; border-radius: 4px; border-bottom: 1px solid rgba(255,255,255,0.14); box-shadow: inset 0 2px 4px #000; }
.dt-ranura .labio { position: absolute; left: 12px; right: 12px; top: 1px; height: 5px; border-radius: 2px; display: none; }
.dt-ranura .est { margin-top: 4px; font: 700 9px 'Courier New', monospace; color: #64748b; }
.dt-led { display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: #27272a; margin-right: 6px; transition: all 0.3s; vertical-align: middle; }
.dt-led.verde { background: #22c55e; box-shadow: 0 0 8px #22c55e; }
.dt-led.ambar { background: #f59e0b; box-shadow: 0 0 8px #f59e0b; }
.dt-mesa { position: absolute; left: 690px; top: 62px; width: 190px; display: grid; gap: 10px; }
.dt-mesa .tit { font: 800 11px 'Nunito', sans-serif; color: #94a3b8; letter-spacing: 0.1em; }
.dt-tj { height: 74px; border-radius: 10px; padding: 9px 11px; font: 900 13px 'Nunito', sans-serif; cursor: pointer; box-shadow: 0 10px 20px rgba(0,0,0,0.5); transition: transform 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.6s; position: relative; }
.dt-tj .chip { width: 26px; height: 19px; border-radius: 4px; background: linear-gradient(135deg, #fde047, #eab308 50%, #ca8a04); border: 1px solid #a16207; margin-bottom: 5px; }
.dt-tj small { display: block; font-size: 9px; opacity: 0.75; }
.dt-tj:hover { transform: translateX(-4px); }
.dt-tj.adentro { transform: translateX(-60px) scale(0.85); opacity: 0.25; }
.dt-tj .dentro { position: absolute; right: 8px; top: 8px; font-size: 10px; }
.dt-pie { position: absolute; left: 40px; top: 448px; width: 630px; display: grid; grid-template-columns: 1.4fr 1fr; gap: 14px; background: #0f172a; border: 1px solid #1e293b; border-radius: 14px; padding: 10px 14px; }
.dt-pie label { font: 800 12px 'Nunito', sans-serif; color: #cbd5e1; display: flex; justify-content: space-between; }
.dt-pie input { width: 100%; accent-color: #f59e0b; }
.dt-pie .esc { display: flex; gap: 4px; margin-top: 4px; }
.dt-pie .esc button { flex: 1; border: 1px solid #334155; background: #020617; color: #94a3b8; border-radius: 8px; font: 800 11px 'Nunito', sans-serif; padding: 4px; cursor: pointer; }
.dt-pie .esc button.on { background: #f59e0b; color: #0f172a; }
.dt-pie .rapido { display: flex; gap: 6px; margin-top: 6px; }
.dt-pie .rapido button { flex: 1; border: 0; border-radius: 9px; font: 800 11px 'Nunito', sans-serif; padding: 6px; cursor: pointer; background: #059669; color: #fff; }
.dt-pie .rapido button.stop { background: #334155; }
.dt-aviso { position: absolute; left: 50%; top: 6px; transform: translateX(-50%); background: rgba(15,23,42,0.96); border: 1px solid rgba(245,158,11,0.45); color: #fde68a; padding: 6px 14px; border-radius: 10px; font: 700 12px 'Nunito', sans-serif; opacity: 0; transition: opacity 0.3s; pointer-events: none; z-index: 50; white-space: nowrap; }
.dt-aviso.ve { opacity: 1; }
.dt-chip.guia { background: #0e7490; border-color: #22d3ee; color: #ecfeff; }
.dt-chip.guia.on { background: #22d3ee; color: #0f172a; }
.dt-narra { position: absolute; left: 40px; top: 376px; width: 630px; min-height: 64px; display: flex; gap: 12px; align-items: center; background: #0b1324; border: 1px solid #155e75; border-radius: 14px; padding: 8px 12px; box-sizing: border-box; opacity: 0; transition: opacity 0.4s; pointer-events: none; z-index: 65; }
.dt-narra.ve { pointer-events: auto; }
.dt-narra .txt { flex: 1; }
.dt-ctl { display: none; flex-direction: column; align-items: center; gap: 4px; }
.dt-ctl.ve { display: flex; }
.dt-ctl .bs { display: flex; gap: 4px; }
.dt-ctl button { width: 34px; height: 30px; border-radius: 8px; border: 1px solid #22d3ee; background: rgba(34,211,238,0.12); color: #a5f3fc; font: 900 13px 'Nunito', sans-serif; cursor: pointer; }
.dt-ctl button:hover { background: rgba(34,211,238,0.3); }
.dt-ctl .n { font: 700 10px 'Nunito', sans-serif; color: #67e8f9; }
.dt-narra.ve { opacity: 1; }
.dt-narra .hora { font: 900 13px 'Courier New', monospace; color: #22d3ee; white-space: nowrap; }
.dt-narra .txt { font: 700 14px 'Nunito', sans-serif; color: #e2e8f0; line-height: 1.35; }
.dt-narra .txt b { color: #fde68a; }
.dt-ilumina { outline: 3px solid #22d3ee !important; outline-offset: 3px; box-shadow: 0 0 0 6px rgba(34,211,238,0.25), 0 0 26px 6px rgba(34,211,238,0.7) !important; animation: dtLuz 1.4s ease-in-out infinite; z-index: 60; }
@keyframes dtLuz { 50% { box-shadow: 0 0 0 3px rgba(34,211,238,0.15), 0 0 12px 2px rgba(34,211,238,0.4); } }
.dt-sit { position: absolute; left: 260px; top: 52px; width: 360px; background: #0f172a; border: 1px solid #22d3ee; border-radius: 14px; padding: 8px; z-index: 70; display: none; box-shadow: 0 20px 40px rgba(0,0,0,0.6); }
.dt-sit.ve { display: grid; gap: 6px; }
.dt-sit button { text-align: left; border: 1px solid #334155; background: #1e293b; color: #e2e8f0; border-radius: 10px; padding: 8px 10px; font: 700 13px 'Nunito', sans-serif; cursor: pointer; }
.dt-sit button:hover { border-color: #22d3ee; }
.dt-ayuda-on [data-ayuda] { cursor: help !important; }
.dt-ayuda-on [data-ayuda]:hover { outline: 2px dashed #22d3ee; outline-offset: 2px; }
`;

const TARJ = {
  conductor: { titulo: 'CONDUCTOR', fondo: 'linear-gradient(135deg,#f8fafc,#e0f2fe 45%,#bae6fd)', texto: '#0f172a', labio: '#7dd3fc' },
  empresa: { titulo: 'EMPRESA', fondo: '#facc15', texto: '#0f172a', labio: '#facc15' },
  control: { titulo: 'CONTROL', fondo: '#2563eb', texto: '#ffffff', labio: '#60a5fa' },
  taller: { titulo: 'TALLER', fondo: '#dc2626', texto: '#ffffff', labio: '#f87171' }
};
const NOMBRES = { conductor: 'DAMIAN MOTUNGA', segundo: 'GÓMEZ, A.' };
const PAISES = [['E', 'ESPAÑA'], ['F', 'FRANCIA'], ['P', 'PORTUGAL'], ['D', 'ALEMANIA'], ['I', 'ITALIA']];
const CCAA = ['CATALUÑA', 'ARAGÓN', 'MADRID', 'ANDALUCÍA', 'VALENCIA'];
const MENU = [
  { id: 'PRINT', label: 'IMPRESIÓN CONDUCTOR 1' },
  { id: 'ENTRY', label: 'ENTRADA CONDUCTOR 1' },
  { id: 'VIEW', label: 'VISUALIZACIÓN' },
  { id: 'VEH', label: 'VEHÍCULO' }
];
const SUB = {
  PRINT: [{ id: 'P24', label: '24H ACTIVIDADES TARJ.' }, { id: 'PEV', label: 'EVENTOS Y FALLOS' }, { id: 'PVE', label: 'EXCESOS VELOCIDAD' }, { id: 'PTE', label: 'DATOS TÉCNICOS' }],
  ENTRY: [{ id: 'CINI', label: 'PAÍS COMIENZO' }, { id: 'CFIN', label: 'PAÍS FIN' }],
  VIEW: [{ id: 'VT', label: 'TIEMPOS CONDUCCIÓN' }, { id: 'VC', label: 'DATOS TARJETA' }, { id: 'VH', label: 'HORA UTC / LOCAL' }],
  VEH: [{ id: 'OUT', label: 'OUT (FUERA DE ÁMBITO)' }, { id: 'FERRY', label: 'FERRY / TREN' }]
};

// Sonidos sintetizados (sin archivos)
let callado = false;
class Sonido {
  constructor() { this.ctx = null; this.mudo = false; }
  init() {
    if (!this.ctx) { const A = window.AudioContext || window.webkitAudioContext; if (A) this.ctx = new A(); }
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  }
  bip(f = 2150, d = 0.045, t = 'sine', g = 0.06) {
    if (this.mudo || callado) return;
    try {
      this.init(); if (!this.ctx) return;
      const o = this.ctx.createOscillator(), v = this.ctx.createGain(), n = this.ctx.currentTime;
      o.type = t; o.frequency.setValueAtTime(f, n); v.gain.setValueAtTime(g, n); v.gain.exponentialRampToValueAtTime(0.001, n + d);
      o.connect(v); v.connect(this.ctx.destination); o.start(); o.stop(n + d);
    } catch (e) { /* el navegador puede bloquear el sonido antes de tocar algo */ }
  }
  error() { this.bip(950, 0.09, 'square', 0.05); setTimeout(() => this.bip(750, 0.14, 'square', 0.05), 110); }
  servo(entra) {
    if (this.mudo || callado) return;
    try {
      this.init(); if (!this.ctx) return;
      const n = this.ctx.currentTime, d = 0.6, o = this.ctx.createOscillator(), v = this.ctx.createGain();
      o.type = 'sawtooth'; o.frequency.setValueAtTime(entra ? 135 : 165, n); o.frequency.linearRampToValueAtTime(entra ? 175 : 120, n + d);
      v.gain.setValueAtTime(0.04, n); v.gain.exponentialRampToValueAtTime(0.001, n + d);
      o.connect(v); v.connect(this.ctx.destination); o.start(); o.stop(n + d);
    } catch (e) {}
  }
  impresora() { let c = 0; const i = setInterval(() => { this.bip(420 + (c % 3) * 90, 0.035, 'sawtooth', 0.03); if (++c > 16) clearInterval(i); }, 85); }
}

export function crearDtco(pantalla, ico) {
  const estilo = document.createElement('style');
  estilo.textContent = CSS;
  document.head.appendChild(estilo);

  pantalla.insertAdjacentHTML('afterbegin', `
    <div class="dt-aviso" id="dt-aviso"></div>
    <div class="dt-top">
      <div class="dt-chip" id="dt-contacto" data-ayuda="llave"><div class="dt-llave" id="dt-llave"><i></i></div><div><div style="font-size:9px;color:#94a3b8">CONTACTO</div><div id="dt-cont-txt" style="color:#f87171">APAGADO</div></div></div>
      <div class="dt-chip" id="dt-luz" data-ayuda="luz">Luz: <span id="dt-luz-txt" style="color:#fbbf24">Ámbar</span></div>
      <div class="dt-chip" id="dt-vista">Vista: <span id="dt-vista-txt">3D</span></div>
      <div class="dt-chip" id="dt-mudo">Sonido: <span id="dt-mudo-txt">sí</span></div>
      <div class="dt-chip guia" id="dt-dia">▶ Simular un día</div>
      <div class="dt-chip guia" id="dt-sit-btn">Situaciones ▾</div>
      <div class="dt-chip guia" id="dt-ayuda">? Qué es esto</div>
    </div>
    <div class="dt-escena"><div class="dt-rig" id="dt-rig" style="transform: rotateX(7deg) rotateY(-8deg)">
      <div class="dt-bisel" data-ancla="aparato">
        <div class="rot"><span>TACÓGRAFO DIGITAL · DIN-1</span><span>e 9 · 12/24 V</span></div>
        <div class="dt-unidad">
          <div class="dt-impresora" data-ayuda="impresora">
            <div class="dt-papel" id="dt-papel"><div class="hoja" id="dt-hoja"></div><button id="dt-cortar">ARRANCAR EL PAPEL</button></div>
            <div class="cab"><span>IMPRESORA</span><button id="dt-imp">${ico('impresora', 13)} Imprimir 24 h</button></div>
            <div class="dt-boca-imp"></div>
          </div>
          <div class="dt-centro">
            <div class="dt-act">
              <button class="dt-btn" data-k="1" data-ayuda="b1"><b>1</b><span id="dt-i1"></span></button>
              <button class="dt-btn" data-k="2" data-ayuda="b2"><b style="color:#cbd5e1">2</b><span id="dt-i2"></span></button>
            </div>
            <div class="dt-bisel-lcd" data-ayuda="lcd"><div class="dt-lcd ambar" id="dt-lcd"><div class="c" id="dt-c"></div></div></div>
            <div class="dt-nav">
              <button class="dt-btn" data-k="BACK" data-ayuda="back">↩</button><button class="dt-btn" data-k="UP" data-ayuda="flechas">▲</button>
              <button class="dt-btn ok" data-k="OK" data-ayuda="ok">OK</button><button class="dt-btn" data-k="DOWN" data-ayuda="flechas">▼</button>
            </div>
          </div>
          <div class="dt-ranuras">
            <div class="dt-ranura" data-ayuda="ranura1"><div class="cab"><span><span class="dt-led" id="dt-led1"></span>RANURA 1 · CONDUCTOR</span><button class="dt-btn" data-k="EJ1" data-ayuda="expulsar">⏏ 1</button></div><div class="boca"><div class="labio" id="dt-labio1"></div></div><div class="est" id="dt-est1">SIN TARJETA</div></div>
            <div class="dt-ranura" data-ayuda="ranura2"><div class="cab"><span><span class="dt-led" id="dt-led2"></span>RANURA 2 · SEGUNDO</span><button class="dt-btn" data-k="EJ2" data-ayuda="expulsar">⏏ 2</button></div><div class="boca"><div class="labio" id="dt-labio2"></div></div><div class="est" id="dt-est2">VACÍA</div></div>
          </div>
        </div>
      </div>
    </div></div>
    <div class="dt-sit" id="dt-sit"></div>
    <div class="dt-narra" id="dt-narra"><div class="hora" id="dt-narra-h"></div><div class="txt" id="dt-narra-t"></div>
      <div class="dt-ctl" id="dt-ctl"><div class="bs"><button id="dt-g-atras" title="Paso anterior">⏮</button><button id="dt-g-pausa" title="Pausa">⏸</button><button id="dt-g-sig" title="Paso siguiente">⏭</button><button id="dt-g-fin" title="Terminar">✕</button></div><div class="n" id="dt-g-n"></div></div></div>
    <div class="dt-mesa" id="dt-mesa"><div class="tit">TARJETAS · TOCÁ PARA METER O SACAR</div></div>
    <div class="dt-pie">
      <div>
        <label>Velocidad del camión <span id="dt-vel" style="color:#fbbf24">0 km/h</span></label>
        <input type="range" id="dt-acel" min="0" max="90" value="0" data-ayuda="acelerador">
        <div class="rapido"><button id="dt-ruta">▶ Andar a 85 km/h</button><button class="stop" id="dt-stop">■ Parar</button></div>
      </div>
      <div>
        <label>Velocidad del reloj</label>
        <div class="esc" data-ayuda="reloj"><button data-e="1">1x real</button><button data-e="60" class="on">60x</button><button data-e="300">300x</button></div>
        <div style="font:600 11px Nunito;color:#64748b;margin-top:6px">A 60x, 1 segundo es 1 minuto.</div>
      </div>
    </div>
  `);

  const $ = s => pantalla.querySelector(s);
  const snd = new Sonido();
  const lcd = $('#dt-lcd'), cont = $('#dt-c'), papel = $('#dt-papel'), hoja = $('#dt-hoja'), aviso = $('#dt-aviso');
  const acel = $('#dt-acel'), velTxt = $('#dt-vel');

  // ---------- TARJETAS DE LA MESA ----------
  const cartas = {};
  Object.entries(TARJ).forEach(([k, t]) => {
    const el = document.createElement('div');
    el.className = 'dt-tj';
    el.style.background = t.fondo;
    el.style.color = t.texto;
    el.innerHTML = `<div class="chip"></div>${t.titulo}<small>TARJETA DE TACÓGRAFO</small><span class="dentro"></span>`;
    el.dataset.ayuda = 'tj-' + k;
    el.onclick = () => tocarTarjeta(k);
    $('#dt-mesa').appendChild(el);
    cartas[k] = el;
  });

  // ---------- ESTADO ----------
  const st = {};
  function reset(encendido = true) {
    Object.assign(st, {
      contacto: encendido, arrancando: false, arranque: 0, luz: st.luz || 'ambar',
      ranura: { 1: null, 2: null }, act: { 1: 'descanso', 2: 'disponibilidad' },
      vel: 0, km: 245380.4, escala: st.escala || 60, reloj: new Date(Date.UTC(2026, 10, 22, 8, 0, 0)),
      cont: 135, diaria: 260, pausa: 0, pais: 'E', out: false, ferry: false,
      modo: encendido ? 'MAIN' : 'OFF', eleccion: 0, menu: 0, sub: 0, cat: null, info: null, banner: null,
      mensaje: null, tMensaje: 0, incidente: false, flujoPais: 'CINI'
    });
    acel.value = 0;
    papel.classList.remove('sale');
    pintarTodo();
  }

  const hm = m => String(Math.floor(Math.max(0, m) / 60)).padStart(2, '0') + 'h' + String(Math.floor(Math.max(0, m) % 60)).padStart(2, '0');
  const hora = (local = false) => { const d = new Date(st.reloj.getTime() + (local ? 3600000 : 0)); return String(d.getUTCHours()).padStart(2, '0') + ':' + String(d.getUTCMinutes()).padStart(2, '0'); };
  const modoTac = () => { const r = [st.ranura[1], st.ranura[2]]; return r.includes('taller') ? 'CALIBRADO' : r.includes('control') ? 'CONTROL' : r.includes('empresa') ? 'EMPRESA' : 'OPERATIVO'; };
  const conTarjeta1 = () => st.ranura[1] === 'conductor';

  // Temporizador: si hay una simulación andando, queda anotado para poder adelantarlo
  let pendientes = [];
  function luego(ms, fn) {
    const item = { fn, hecho: false };
    item.id = setTimeout(() => { if (!item.hecho) { item.hecho = true; fn(); } }, ms);
    pendientes.push(item);
  }
  function adelantar() { const l = pendientes; pendientes = []; l.forEach(i => { clearTimeout(i.id); if (!i.hecho) { i.hecho = true; i.fn(); } }); }
  function descartar() { pendientes.forEach(i => { clearTimeout(i.id); i.hecho = true; }); pendientes = []; }
  function avisar(t) {
    aviso.textContent = t;
    aviso.classList.add('ve');
    clearTimeout(avisar.tm);
    avisar.tm = setTimeout(() => aviso.classList.remove('ve'), 3200);
  }
  function mensaje(t, seg = 2.5) { st.mensaje = t; st.tMensaje = seg; pintarLcd(); }

  // ---------- CONTACTO Y ARRANQUE ----------
  function contacto(on) {
    snd.init();
    st.contacto = on;
    if (on) {
      snd.bip(1800, 0.08);
      st.modo = 'BOOT'; st.arranque = 1; pintarTodo();
      luego(900, () => { if (st.contacto && st.modo === 'BOOT') { st.arranque = 2; snd.bip(2200, 0.04); pintarLcd(); } });
      luego(1800, () => { if (st.contacto && st.modo === 'BOOT') { st.arranque = 3; pintarLcd(); } });
      luego(2700, () => { if (st.contacto && st.modo === 'BOOT') { st.modo = 'MAIN'; pintarLcd(); } });
    } else {
      if (st.vel > 0) parar();
      st.modo = 'OFF'; snd.bip(900, 0.09); pintarTodo();
    }
  }

  // ---------- TARJETAS ----------
  function tocarTarjeta(tipo) {
    if (st.ranura[1] === tipo) { sacar(1); return; }
    if (st.ranura[2] === tipo) { sacar(2); return; }
    const libre = !st.ranura[1] ? 1 : !st.ranura[2] ? 2 : null;
    if (!libre) { snd.error(); avisar('Las dos ranuras están ocupadas: sacá una antes.'); return; }
    insertar(tipo, libre, true);
  }
  function insertar(tipo, r, dialogo = false) {
    if (!st.contacto) { snd.error(); avisar('Primero girá la llave de contacto.'); return; }
    if (st.ranura[r]) sacar(r, true);
    st.ranura[r] = tipo;
    snd.servo(true);
    if (tipo === 'conductor' || tipo === 'segundo') {
      if (st.vel > 0) {
        st.incidente = true;
        snd.error();
        avisar('Se puede, pero queda grabado un INCIDENTE: tarjeta puesta andando.');
        mensaje('! INCIDENTE\nTARJETA PUESTA ANDANDO', 3);
      } else {
        st.modo = 'LEYENDO';
        pintarTodo();
        luego(1100, () => {
          if (st.ranura[r] !== tipo) return;
          snd.bip(2400, 0.06);
          if (dialogo && r === 1) { st.modo = 'MANUAL'; st.eleccion = 0; }
          else st.modo = 'MAIN';
          if (r === 1) st.act[1] = 'trabajo';
          pintarTodo();
        });
      }
    } else {
      mensaje('MODO ' + modoTac(), 2);
    }
    pintarTodo();
  }
  function sacar(r, forzar = false) {
    const t = st.ranura[r];
    if (!t) { if (!forzar) avisar(`No hay tarjeta en la ranura ${r}.`); return; }
    if (st.vel > 0 && !forzar) { snd.error(); avisar('Con el camión andando la tarjeta no sale: pará primero.'); return; }
    st.ranura[r] = null;
    snd.servo(false);
    if (!forzar) mensaje('GRABANDO DATOS…\nEXPULSANDO ' + r, 1.2);
    pintarTodo();
  }

  // ---------- BOTONES ----------
  function tecla(k) {
    snd.init();
    const b = pantalla.querySelector(`[data-k="${k}"]`);
    if (b) { b.classList.add('pulsado'); setTimeout(() => b.classList.remove('pulsado'), 120); }
    if (k === 'EJ1') { sacar(1); return; }
    if (k === 'EJ2') { sacar(2); return; }
    if (!st.contacto || st.modo === 'BOOT' || st.modo === 'LEYENDO') return;
    snd.bip();
    if (k === '1' || k === '2') {
      const r = Number(k);
      if (st.vel > 0) {
        snd.error();
        avisar(r === 1 ? 'Andando, el 1 marca CONDUCCIÓN solo.' : 'Andando, el segundo queda en DISPONIBILIDAD. Marcar descanso sería mal uso del selector.');
        return;
      }
      const ciclo = ['trabajo', 'disponibilidad', 'descanso'];
      st.act[r] = ciclo[(ciclo.indexOf(st.act[r]) + 1) % 3];
      pintarTodo();
      return;
    }
    if (st.modo === 'MANUAL') {
      if (k === 'UP' || k === 'DOWN') st.eleccion = 1 - st.eleccion;
      else if (k === 'OK') { if (st.eleccion === 0) { st.modo = 'PAIS'; st.flujoPais = 'CINI'; st.eleccion = 0; } else st.modo = 'MAIN'; }
      else if (k === 'BACK') st.modo = 'MAIN';
      pintarLcd(); return;
    }
    if (st.modo === 'PAIS') {
      if (k === 'UP') st.eleccion = (st.eleccion - 1 + PAISES.length) % PAISES.length;
      else if (k === 'DOWN') st.eleccion = (st.eleccion + 1) % PAISES.length;
      else if (k === 'OK') {
        st.pais = PAISES[st.eleccion][0];
        if (st.pais === 'E') { st.modo = 'CCAA'; st.eleccion = 0; }
        else { st.modo = 'MAIN'; avisar(`País ${st.flujoPais === 'CINI' ? 'de comienzo' : 'de fin'} guardado: ${PAISES[st.eleccion][1]}`); }
      } else if (k === 'BACK') st.modo = 'MAIN';
      pintarLcd(); return;
    }
    if (st.modo === 'CCAA') {
      if (k === 'UP') st.eleccion = (st.eleccion - 1 + CCAA.length) % CCAA.length;
      else if (k === 'DOWN') st.eleccion = (st.eleccion + 1) % CCAA.length;
      else if (k === 'OK') { st.modo = 'MAIN'; avisar(`Guardado: ESPAÑA · ${CCAA[st.eleccion]}`); }
      else if (k === 'BACK') st.modo = 'MAIN';
      pintarLcd(); return;
    }
    if (st.modo === 'MAIN') {
      if (k === 'OK') {
        if (st.vel > 0) { snd.error(); avisar('Con el camión andando el menú está bloqueado.'); return; }
        st.modo = 'MENU'; st.menu = 0;
      } else if (k === 'UP' || k === 'DOWN') {
        info('TIEMPOS CONDUCTOR 1', [`COND. SEGUIDA: ${hm(st.cont)} / 04h30`, `COND. DIARIA: ${hm(st.diaria)} / 09h00`, `PAUSA: ${hm(st.pausa)} / 00h45`]);
        return;
      }
      pintarLcd(); return;
    }
    if (st.modo === 'MENU') {
      if (k === 'UP') st.menu = (st.menu - 1 + MENU.length) % MENU.length;
      else if (k === 'DOWN') st.menu = (st.menu + 1) % MENU.length;
      else if (k === 'OK') { st.cat = MENU[st.menu].id; st.sub = 0; st.modo = 'SUB'; }
      else if (k === 'BACK') st.modo = 'MAIN';
      pintarLcd(); return;
    }
    if (st.modo === 'SUB') {
      const l = SUB[st.cat];
      if (k === 'UP') st.sub = (st.sub - 1 + l.length) % l.length;
      else if (k === 'DOWN') st.sub = (st.sub + 1) % l.length;
      else if (k === 'OK') { accion(l[st.sub].id); return; }
      else if (k === 'BACK') st.modo = 'MENU';
      pintarLcd(); return;
    }
    if (st.modo === 'INFO') { if (k === 'OK' || k === 'BACK') { st.modo = 'MAIN'; pintarLcd(); } }
  }
  function info(t, l) { st.info = { t, l }; st.modo = 'INFO'; pintarLcd(); }
  function accion(id) {
    if (id === 'P24' || id === 'PEV' || id === 'PVE' || id === 'PTE') { imprimir(id); st.modo = 'MAIN'; pintarLcd(); return; }
    if (id === 'CINI' || id === 'CFIN') { st.flujoPais = id; st.modo = 'PAIS'; st.eleccion = 0; pintarLcd(); return; }
    if (id === 'VT') return info('TIEMPOS CONDUCCIÓN', [`SEGUIDA: ${hm(st.cont)} / 04h30`, `DIARIA:  ${hm(st.diaria)} / 09h00`, `FALTAN:  ${hm(270 - st.cont)} PARA LA PAUSA`]);
    if (id === 'VC') return info('DATOS TARJETA 1', conTarjeta1() ? [`TITULAR: ${NOMBRES.conductor}`, 'Nº E1004829100001', 'VENCE: 15/09/2029'] : ['NO HAY TARJETA', 'DE CONDUCTOR', 'EN LA RANURA 1']);
    if (id === 'VH') return info('HORA', [`UTC:   ${hora()} (LA QUE GRABA)`, `LOCAL: ${hora(true)} (SOLO MIRAR)`, 'ESPAÑA: UTC+1 INV · +2 VER']);
    if (id === 'OUT') { st.out = !st.out; return info('OUT · FUERA DE ÁMBITO', [`ESTADO: ${st.out ? 'ACTIVADO' : 'DESACTIVADO'}`, 'VIAJE NO OBLIGADO', 'A USAR TACÓGRAFO']); }
    if (id === 'FERRY') { st.ferry = !st.ferry; return info('FERRY / TREN', [`ESTADO: ${st.ferry ? 'ACTIVADO' : 'DESACTIVADO'}`, 'CORTAR DESCANSO: 2 VECES,', '1 HORA EN TOTAL']); }
  }

  // ---------- IMPRESORA ----------
  function imprimir(tipo = 'P24') {
    if (!st.contacto) { snd.error(); avisar('Girá la llave de contacto para imprimir.'); return; }
    if (st.vel > 0) { snd.error(); avisar('Para imprimir, pará el camión.'); return; }
    snd.impresora();
    const tit = { P24: '24H TARJETA CONDUCTOR', PEV: 'EVENTOS Y FALLOS', PVE: 'EXCESOS DE VELOCIDAD', PTE: 'DATOS TÉCNICOS' }[tipo];
    const c1 = conTarjeta1();
    hoja.innerHTML = `
      <div style="text-align:center;border-bottom:1px solid #94a3b8;padding-bottom:4px;margin-bottom:4px">
        <div>22.11.2026 ${hora()} (UTC)</div>
        <div>${ico('impresora', 12)} ${ico('conductor', 12)} ${ico('tarjeta', 12)} 24h</div>
        <div style="font-weight:900">${tit}</div>
      </div>
      <div>${c1 ? NOMBRES.conductor : 'SIN TARJETA:'}</div>
      <div>${c1 ? 'TARJ: E1004829100001' : 'NOMBRE: ______________'}</div>
      <div>VEH: 1234 ABC · E</div>
      <div style="border-top:1px dashed #94a3b8;margin-top:4px;padding-top:4px">00:00 - 24:00 (UTC) · PAÍS ${st.pais}</div>
      <div>${ico('descanso', 12)} 00:00 08h00</div>
      <div>${ico('trabajo', 12)} 08:00 00h20</div>
      <div>${ico('conduccion', 12)} 08:20 ${hm(st.diaria)}</div>
      <div>${ico('disponibilidad', 12)} 13:00 00h15</div>
      <div>${st.incidente ? '! INCIDENTE: TARJETA ANDANDO' : 'SIN INCIDENTES'}</div>
      <div style="border-top:1px solid #94a3b8;margin-top:6px;padding-top:4px">FIRMA: ______________</div>`;
    papel.classList.remove('sale');
    void papel.offsetWidth;
    papel.classList.add('sale');
  }

  // ---------- ANDAR Y PARAR ----------
  function velocidad(v) {
    const antes = st.vel;
    st.vel = v;
    acel.value = v;
    velTxt.textContent = v + ' km/h';
    if (v > 0 && !st.contacto) contacto(true);
    if (v > 0) {
      st.act[1] = 'conduccion';
      if (st.act[2] === 'descanso' || st.act[2] === 'trabajo') st.act[2] = 'disponibilidad';
      if (['MENU', 'SUB', 'INFO', 'MANUAL', 'PAIS', 'CCAA'].includes(st.modo)) st.modo = 'MAIN';
    } else if (antes > 0) {
      st.act[1] = 'trabajo';
    }
    pintarTodo();
  }
  function parar() { velocidad(0); }

  // ---------- PINTAR ----------
  function pintarTodo() {
    $('#dt-llave').classList.toggle('on', st.contacto);
    $('#dt-cont-txt').textContent = st.contacto ? 'ENCENDIDO' : 'APAGADO';
    $('#dt-cont-txt').style.color = st.contacto ? '#34d399' : '#f87171';
    $('#dt-i1').innerHTML = ico(st.act[1], 18);
    $('#dt-i2').innerHTML = ico(st.act[2], 18);
    [1, 2].forEach(r => {
      const t = st.ranura[r];
      $('#dt-led' + r).className = 'dt-led ' + (t ? 'verde' : st.contacto ? 'ambar' : '');
      const lab = $('#dt-labio' + r);
      lab.style.display = t ? 'block' : 'none';
      if (t) lab.style.background = TARJ[t].labio;
      $('#dt-est' + r).textContent = t ? `TARJETA: ${TARJ[t].titulo}` : r === 1 ? 'SIN TARJETA' : 'VACÍA';
      $('#dt-est' + r).style.color = t ? '#34d399' : '#64748b';
    });
    Object.entries(cartas).forEach(([k, el]) => {
      const r = st.ranura[1] === k ? 1 : st.ranura[2] === k ? 2 : 0;
      el.classList.toggle('adentro', !!r);
      el.querySelector('.dentro').textContent = r ? `EN RANURA ${r}` : '';
    });
    velTxt.textContent = Math.round(st.vel) + ' km/h';
    pintarLcd();
  }
  function pintarLcd() {
    lcd.classList.toggle('on', st.contacto);
    lcd.classList.toggle('ambar', st.luz === 'ambar');
    lcd.classList.toggle('blanca', st.luz === 'blanca');
    if (!st.contacto || st.modo === 'OFF') { cont.innerHTML = ''; return; }
    if (st.mensaje) { cont.innerHTML = `<div class="med">${st.mensaje.split('\n').map(l => `<div>${l}</div>`).join('')}</div>`; return; }
    const m = st.modo;
    if (m === 'BOOT') {
      cont.innerHTML = st.arranque === 1 ? '<div class="med"><div style="font-size:24px;letter-spacing:.2em">TACÓGRAFO</div><div style="font-size:12px">DIGITAL · SMART 2</div></div>'
        : st.arranque === 2 ? '<div class="f"><span>AUTOTEST…</span><span>[OK]</span></div><div style="height:10px;border:1px solid currentColor;padding:1px"><div style="height:100%;width:75%;background:currentColor"></div></div><div class="f" style="font-size:12px"><span>SENSOR: OK</span><span>GNSS: OK</span></div>'
        : `<div class="med"><div>BIENVENIDO</div><div style="font-size:13px">${hora()} UTC · 22.11.2026</div></div>`;
      return;
    }
    if (m === 'LEYENDO') { cont.innerHTML = `<div class="med"><div style="font-size:13px">${ico('tarjeta', 14)} LEYENDO TARJETA…</div><div>${NOMBRES.conductor}</div><div class="pp" style="font-size:12px">COMPROBANDO</div></div>`; return; }
    if (m === 'MANUAL') { cont.innerHTML = `<div class="f" style="font-size:13px;border-bottom:1px solid rgba(0,0,0,.25)"><span>1 ${NOMBRES.conductor}</span><span>${hora()}</span></div><div class="med" style="height:auto">¿ENTRADA MANUAL?</div><div class="f" style="justify-content:center;gap:30px"><span class="${st.eleccion === 0 ? 'sel' : 'tenue'}">SÍ</span><span class="${st.eleccion === 1 ? 'sel' : 'tenue'}">NO</span></div>`; return; }
    if (m === 'PAIS') { const p = PAISES[st.eleccion]; cont.innerHTML = `<div class="f" style="font-size:12px;border-bottom:1px solid rgba(0,0,0,.25)"><span>${st.flujoPais === 'CINI' ? 'PAÍS COMIENZO' : 'PAÍS FIN'}</span><span>▲▼ · OK</span></div><div class="med" style="height:auto;font-size:19px">▶ ${p[0]} · ${p[1]}</div><div style="font-size:11px;text-align:center" class="tenue">OK PARA CONFIRMAR</div>`; return; }
    if (m === 'CCAA') { cont.innerHTML = `<div class="f" style="font-size:12px;border-bottom:1px solid rgba(0,0,0,.25)"><span>COMUNIDAD AUTÓNOMA</span><span>▲▼ · OK</span></div><div class="med" style="height:auto;font-size:19px">▶ ${CCAA[st.eleccion]}</div><div style="font-size:11px;text-align:center" class="tenue">EN ESPAÑA SE INDICA</div>`; return; }
    if (m === 'MENU' || m === 'SUB') {
      const l = m === 'MENU' ? MENU : SUB[st.cat], i = m === 'MENU' ? st.menu : st.sub;
      cont.innerHTML = `<div class="f" style="font-size:11px;border-bottom:1px solid rgba(0,0,0,.25)"><span>${m === 'MENU' ? 'MENÚ PRINCIPAL' : MENU[st.menu].label}</span><span>${i + 1}/${l.length} · ↩</span></div><div style="font-size:15px;padding:2px 6px;background:rgba(0,0,0,.14);border-left:4px solid currentColor">▶ ${l[i].label}</div><div style="font-size:12px" class="tenue">&nbsp;&nbsp;${l[(i + 1) % l.length].label}</div>`;
      return;
    }
    if (m === 'INFO') { cont.innerHTML = `<div class="f" style="font-size:11px;border-bottom:1px solid rgba(0,0,0,.25)"><span>${st.info.t}</span><span>OK/↩</span></div><div style="font-size:13px;line-height:1.35">${st.info.l.map(x => `<div>${x}</div>`).join('')}</div>`; return; }
    // pantalla principal
    const md = modoTac();
    const tj = r => st.ranura[r] ? ico('tarjeta', 14) : `<span class="tenue">${ico('tarjeta', 14)}</span>`;
    let medio;
    if (md !== 'OPERATIVO') medio = `<span class="pp">MODO ${md}</span>`;
    else if (!conTarjeta1()) medio = st.vel > 0 ? '<span class="pp">! CONDUCCIÓN SIN TARJETA</span>' : '<span>SIN TARJETA COND. 1</span>';
    else if (st.cont >= 270) medio = '<span class="pp">! PAUSA OBLIGATORIA 4h30</span>';
    else if (st.cont >= 255) medio = '<span class="pp">! PAUSA EN 15 MIN</span>';
    else medio = `<span>${NOMBRES.conductor}</span>`;
    cont.innerHTML = `
      <div class="f" style="font-size:18px"><span>${hora()} <small style="font-size:10px;border:1px solid currentColor;padding:0 3px">${st.pais}</small>${st.out ? ' <small style="font-size:10px;background:rgba(0,0,0,.2);padding:0 3px">OUT</small>' : ''}${st.ferry ? ' ' + ico('barco', 14) : ''}</span><span style="font-size:22px">${Math.round(st.vel)}<small style="font-size:11px"> km/h</small></span></div>
      <div class="f" style="font-size:12px">${medio}<span>${Math.floor(st.km).toLocaleString('es-ES')} km</span></div>
      <div class="f" style="font-size:14px;border-top:1px solid rgba(0,0,0,.25);padding-top:2px"><span>1 ${ico(st.act[1], 16)} ${tj(1)} <small style="font-size:12px">${hm(st.cont)}</small> <small class="tenue" style="font-size:11px">| ${hm(st.pausa)}</small></span><span>${tj(2)} ${ico(st.act[2], 16)} 2</span></div>`;
  }

  // ---------- CONTROLES DE ABAJO Y DE ARRIBA ----------
  pantalla.querySelectorAll('.dt-btn[data-k]').forEach(b => b.addEventListener('click', () => tecla(b.dataset.k)));
  $('#dt-imp').onclick = () => imprimir('P24');
  $('#dt-cortar').onclick = () => { snd.bip(1400, 0.04); papel.classList.remove('sale'); };
  $('#dt-contacto').onclick = () => contacto(!st.contacto);
  $('#dt-luz').onclick = () => { st.luz = st.luz === 'ambar' ? 'blanca' : 'ambar'; $('#dt-luz-txt').textContent = st.luz === 'ambar' ? 'Ámbar' : 'Blanca'; $('#dt-luz-txt').style.color = st.luz === 'ambar' ? '#fbbf24' : '#e2e8f0'; pintarLcd(); };
  $('#dt-mudo').onclick = () => { snd.mudo = !snd.mudo; $('#dt-mudo-txt').textContent = snd.mudo ? 'no' : 'sí'; };
  acel.oninput = () => velocidad(parseInt(acel.value, 10) || 0);
  $('#dt-ruta').onclick = () => velocidad(85);
  $('#dt-stop').onclick = () => parar();
  pantalla.querySelectorAll('.esc button').forEach(b => b.onclick = () => {
    st.escala = Number(b.dataset.e);
    pantalla.querySelectorAll('.esc button').forEach(x => x.classList.toggle('on', x === b));
  });

  // Giro 3D arrastrando
  const rig = $('#dt-rig');
  let rx = 7, ry = -8, arr = false, px = 0, py = 0, frente = false;
  const aplicar = () => { rig.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`; };
  $('#dt-vista').onclick = () => { frente = !frente; rx = frente ? 0 : 7; ry = frente ? 0 : -8; $('#dt-vista-txt').textContent = frente ? 'de frente' : '3D'; aplicar(); };
  const empieza = (x, y, e) => { if (e.target.closest('button') || e.target.closest('.dt-tj')) return; arr = true; rig.classList.add('arrastrando'); px = x; py = y; };
  const mueve = (x, y) => { if (!arr) return; ry = Math.max(-28, Math.min(28, ry + (x - px) * 0.25)); rx = Math.max(-22, Math.min(22, rx - (y - py) * 0.25)); px = x; py = y; aplicar(); };
  const termina = () => { arr = false; rig.classList.remove('arrastrando'); };
  rig.addEventListener('mousedown', e => empieza(e.clientX, e.clientY, e));
  window.addEventListener('mousemove', e => mueve(e.clientX, e.clientY));
  window.addEventListener('mouseup', termina);
  rig.addEventListener('touchstart', e => empieza(e.touches[0].clientX, e.touches[0].clientY, e), { passive: true });
  window.addEventListener('touchmove', e => { if (arr) mueve(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
  window.addEventListener('touchend', termina);

  // ---------- CADA CUADRO ----------
  let acumulado = 0;
  function actualizar(dt) {
    if (st.tMensaje > 0) { st.tMensaje -= dt; if (st.tMensaje <= 0) { st.mensaje = null; pintarLcd(); } }
    acumulado += dt;
    if (acumulado < 0.25) return;
    const seg = acumulado * st.escala;
    acumulado = 0;
    st.reloj = new Date(st.reloj.getTime() + seg * 1000);
    if (!st.contacto) return;
    const min = seg / 60;
    if (st.vel > 0) st.km += st.vel * seg / 3600;
    if (conTarjeta1()) {
      if (st.act[1] === 'conduccion') { st.cont += min; st.diaria += min; st.pausa = 0; }
      else if (st.act[1] === 'descanso') {
        st.pausa += min;
        if (st.pausa >= 45 && st.cont > 0) { st.cont = 0; st.pausa = 0; avisar('Pausa de 45 minutos cumplida: la conducción seguida vuelve a cero.'); }
      }
    }
    pintarLcd();
  }

  // ==========================================
  // AYUDA: "¿QUÉ ES ESTO?"
  // ==========================================
  const AYUDA = {
    llave: '<b>Llave de contacto.</b> Prende el camión y el tacógrafo. Al girarla, el tacógrafo hace su prueba y queda listo.',
    luz: '<b>Luz de la pantalla.</b> Cambia el color de fondo: ámbar o blanca. No cambia nada de lo que graba.',
    impresora: '<b>Impresora.</b> Imprime en papel tus actividades del día, los incidentes, los excesos de velocidad o los datos técnicos. Solo con el camión parado. Siempre hay que llevar papel.',
    b1: '<b>Botón 1: tu actividad.</b> Si manejás vos (ranura 1), con el camión parado lo apretás para elegir: martillos (otros trabajos), cuadrado (disponibilidad) o cama (pausa o descanso). Andando no hace falta: marca volante solo.',
    b2: '<b>Botón 2: la actividad del segundo conductor</b> (ranura 2). Parado elige martillos, cuadrado o cama. Andando queda en disponibilidad: marcar cama sería falta muy grave.',
    lcd: '<b>Pantalla.</b> Arriba: hora UTC, país y velocidad. Al medio: tu nombre o los avisos. Abajo: tu actividad, tu tarjeta, la conducción seguida contra 4h30 y la pausa que llevás.',
    back: '<b>Atrás (↩).</b> Vuelve un paso en el menú o cancela.',
    flechas: '<b>Flechas ▲ ▼.</b> En el menú, suben y bajan por las opciones. En la pantalla normal, te muestran tus tiempos: conducción seguida, diaria y pausa.',
    ok: '<b>OK.</b> Abre el menú y confirma lo que elegiste: imprimir, cargar el país, ver los tiempos o la hora. Con el camión andando el menú no se abre.',
    ranura1: '<b>Ranura 1.</b> Acá va la tarjeta del que maneja. Se mete al hacerte cargo del camión, y la luz verde dice que está puesta.',
    ranura2: '<b>Ranura 2.</b> Acá va la tarjeta del segundo conductor cuando manejan dos. También acá meten su tarjeta la empresa, los agentes o el taller.',
    expulsar: '<b>Botón de expulsión (⏏).</b> Saca la tarjeta de esa ranura. Solo funciona con el camión parado.',
    acelerador: '<b>Acelerador.</b> Hace andar el camión. Apenas se mueve, el tacógrafo marca conducción solo.',
    reloj: '<b>Velocidad del reloj.</b> No existe en un camión: es para ver acá, más rápido, cómo corren los tiempos.',
    'tj-conductor': '<b>Tarjeta de conductor (blanca).</b> Es tuya, una sola, vale 5 años. Te identifica y guarda tu actividad de al menos 56 días.',
    'tj-empresa': '<b>Tarjeta de empresa (amarilla).</b> La tiene la empresa. Con ella ve, imprime y descarga los datos de sus camiones.',
    'tj-control': '<b>Tarjeta de control (azul).</b> La tienen los agentes. La meten en un control para leer, imprimir y descargar.',
    'tj-taller': '<b>Tarjeta de taller (roja).</b> La tiene el técnico del taller autorizado. Activa, calibra y revisa el tacógrafo. Vale 1 año.'
  };
  const narra = $('#dt-narra'), narraH = $('#dt-narra-h'), narraT = $('#dt-narra-t');
  function decir(texto, horaTxt = '') { narraH.textContent = horaTxt; narraT.innerHTML = texto; narra.classList.add('ve'); }
  function callar() { narra.classList.remove('ve'); }
  let ayuda = false;
  $('#dt-ayuda').onclick = e => {
    e.stopPropagation();
    ayuda = !ayuda;
    $('#dt-ayuda').classList.toggle('on', ayuda);
    pantalla.classList.toggle('dt-ayuda-on', ayuda);
    if (ayuda) { cancelarGuion(); decir('Tocá cualquier parte del tacógrafo y te digo qué es. Para usarlo de nuevo, apagá «Qué es esto».'); } else callar();
  };
  pantalla.addEventListener('click', e => {
    if (!ayuda) return;
    const el = e.target.closest('[data-ayuda]');
    if (!el) return;
    e.preventDefault();
    e.stopPropagation();
    decir(AYUDA[el.dataset.ayuda] || '');
    iluminar(el);
  }, true);
  ['input', 'mousedown'].forEach(ev => pantalla.addEventListener(ev, e => {
    if (ayuda && e.target.closest('[data-ayuda]') && e.target.tagName === 'INPUT') { e.preventDefault(); e.stopPropagation(); decir(AYUDA.acelerador); }
  }, true));

  // ==========================================
  // GUIONES: UN DÍA ENTERO Y SITUACIONES
  // ==========================================
  let iluminado = null;
  function iluminar(el) {
    if (iluminado) iluminado.classList.remove('dt-ilumina');
    iluminado = el || null;
    if (el) el.classList.add('dt-ilumina');
  }
  const Q = {
    llave: () => $('#dt-contacto'), b1: () => $('[data-k="1"]'), b2: () => $('[data-k="2"]'), ok: () => $('[data-k="OK"]'),
    abajo: () => $('[data-k="DOWN"]'), ej1: () => $('[data-k="EJ1"]'), imp: () => $('#dt-imp'), lcd: () => $('.dt-bisel-lcd'),
    acel: () => $('#dt-acel'), ruta: () => $('#dt-ruta'), stop: () => $('#dt-stop'),
    conductor: () => cartas.conductor, control: () => cartas.control, ranura2: () => $('[data-ayuda="ranura2"]')
  };
  // Reproductor: avanza solo (despacio), y se puede pausar, adelantar o volver
  const ctl = $('#dt-ctl'), gN = $('#dt-g-n'), gPausa = $('#dt-g-pausa');
  let G = null;
  function foto() { return { st: { ...st, ranura: { ...st.ranura }, act: { ...st.act }, reloj: new Date(st.reloj) }, papel: papel.classList.contains('sale'), hoja: hoja.innerHTML }; }
  function volverA(f) {
    Object.assign(st, { ...f.st, ranura: { ...f.st.ranura }, act: { ...f.st.act }, reloj: new Date(f.st.reloj) });
    hoja.innerHTML = f.hoja;
    papel.classList.toggle('sale', f.papel);
    acel.value = st.vel;
    pintarTodo();
  }
  function cancelarGuion() {
    if (G) { clearTimeout(G.timer); G = null; }
    adelantar(); // lo que estaba por pasar (terminar de leer la tarjeta, el arranque) se completa ya, no se pierde
    iluminar(null);
    ctl.classList.remove('ve');
  }
  function pintarCtl() {
    if (!G) return;
    gN.textContent = `Paso ${G.i + 1} de ${G.pasos.length}`;
    gPausa.textContent = G.auto ? '⏸' : '▶';
    gPausa.title = G.auto ? 'Pausa' : 'Seguir';
  }
  function lectura(texto) { return Math.max(6000, 3500 + texto.replace(/<[^>]+>/g, '').length * 55); }
  function hacerAccion() {
    if (!G || G.hecha) return;
    G.hecha = true;
    const a = G.pasos[G.i][3];
    if (a) a();
  }
  function programarSiguiente() {
    clearTimeout(G.timer);
    if (!G.auto) return;
    const [, texto] = G.pasos[G.i];
    G.timer = setTimeout(() => { if (G) irPaso(G.i + 1); }, lectura(texto));
  }
  function irPaso(n) {
    if (!G) return;
    clearTimeout(G.timer);
    if (n >= G.pasos.length) {
      adelantar();
      iluminar(null);
      decir('Fin. Podés volver atrás con ⏮, elegir otra situación, o probarlo vos.');
      G.i = G.pasos.length - 1;
      G.auto = false;
      pintarCtl();
      return;
    }
    n = Math.max(0, n);
    if (n <= G.i) { descartar(); volverA(G.fotos[n]); }
    else { adelantar(); if (!G.hecha && G.i >= 0) hacerAccion(); adelantar(); G.fotos[n] = foto(); }
    G.i = n;
    G.hecha = false;
    const [hh, texto, luz] = G.pasos[n];
    if (hh) { const [h, m] = hh.split(':').map(Number); ponerHora(h, m); }
    decir(texto, hh ? hh + ' (hora local)' : '');
    iluminar(luz ? Q[luz]() : null);
    pintarCtl();
    // la acción se hace un ratito después de leer qué viene
    G.timer = setTimeout(() => { if (!G) return; hacerAccion(); programarSiguiente(); }, 1800);
  }
  const ponerHora = (h, m) => { st.reloj = new Date(Date.UTC(2026, 10, 22, h - 1, m, 0)); };
  function correr(pasos, encendido = false) {
    cancelarGuion();
    if (ayuda) $('#dt-ayuda').click();
    reset(encendido);
    G = { pasos, i: -1, auto: true, hecha: true, fotos: [], timer: null };
    ctl.classList.add('ve');
    irPaso(0);
  }
  $('#dt-g-sig').onclick = e => { e.stopPropagation(); if (G) irPaso(G.i + 1); };
  $('#dt-g-atras').onclick = e => { e.stopPropagation(); if (G) irPaso(G.i - 1); };
  $('#dt-g-pausa').onclick = e => {
    e.stopPropagation();
    if (!G) return;
    G.auto = !G.auto;
    if (G.auto) { hacerAccion(); programarSiguiente(); } else clearTimeout(G.timer);
    pintarCtl();
  };
  $('#dt-g-fin').onclick = e => { e.stopPropagation(); cancelarGuion(); callar(); };
  const pulsar = k => tecla(k);

  const DIA = [
    ['07:00', 'Llegás al camión a la mañana. <b>Girás la llave de contacto</b>: el tacógrafo arranca y se prueba solo.', 'llave', () => contacto(true), 3600],
    ['07:02', '<b>Metés tu tarjeta de conductor en la ranura 1</b>. Siempre al hacerte cargo del camión, antes de salir.', 'conductor', () => insertar('conductor', 1, true), 2400],
    ['07:03', 'Te pregunta si querés cargar algo a mano. Como hay que poner el país, <b>dejás SÍ y apretás OK</b>.', 'ok', () => pulsar('OK'), 1800],
    ['07:03', 'Aparece el país. Está España: <b>OK</b>.', 'ok', () => pulsar('OK'), 1800],
    ['07:04', 'En España te pide también la comunidad autónoma. <b>OK</b> en Cataluña.', 'ok', () => pulsar('OK'), 2200],
    ['07:05', 'Antes de salir <b>cargás el camión</b>: eso es otro trabajo. Mirá el botón 1: ya marca <b>martillos</b>.', 'b1', null, 2600],
    ['07:30', '<b>Salís a la ruta.</b> Apenas el camión se mueve, el tacógrafo marca <b>volante</b> solo. No tocás nada.', 'ruta', () => { velocidad(85); st.cont = 0; st.diaria = 0; }, 3000],
    ['11:45', 'Pasan las horas… Mirá la pantalla: abajo cuenta la conducción seguida contra <b>4h30</b>. A las 4h15 te avisa.', 'lcd', () => { st.cont = 256; st.diaria = 256; pintarTodo(); }, 3400],
    ['12:00', 'Llegaste a 4h30: <b>tenés que parar</b>. Frenás en un área de descanso.', 'stop', () => { st.cont = 270; st.diaria = 270; velocidad(0); }, 2400],
    ['12:00', 'Al parar marca martillos. Para la pausa <b>apretás el 1 hasta la cama</b>.', 'b1', () => { pulsar('1'); luego(500, () => pulsar('1')); }, 2600],
    ['12:45', 'Con <b>45 minutos de cama</b>, la conducción seguida vuelve a cero. Ya podés seguir.', 'lcd', () => { st.pausa = 45; st.cont = 0; st.pausa = 0; pintarTodo(); }, 3000],
    ['12:46', '<b>Volvés a la ruta.</b> Otra vez volante solo.', 'ruta', () => velocidad(85), 2600],
    ['16:15', 'Llegás al cliente. Frenás.', 'stop', () => { st.cont = 210; st.diaria = 480; velocidad(0); }, 2200],
    ['16:16', 'Te dicen que esperes una hora tu turno, y sabés cuánto dura: <b>apretás el 1 hasta el cuadrado</b> (disponibilidad).', 'b1', () => pulsar('1'), 2800],
    ['17:15', 'Te toca <b>descargar</b>: es otro trabajo. Apretás el 1 hasta los <b>martillos</b>.', 'b1', () => { pulsar('1'); luego(500, () => pulsar('1')); }, 2800],
    ['18:00', 'Terminaste. <b>Imprimís el resumen del día</b>: sale en hora UTC, de 0 a 24.', 'imp', () => imprimir('P24'), 3600],
    ['18:02', 'Para el final del día cargás el <b>país de fin</b>: OK → ENTRADA CONDUCTOR 1 → PAÍS FIN.', 'ok', () => { pulsar('OK'); luego(500, () => pulsar('DOWN')); luego(1000, () => pulsar('OK')); luego(1500, () => pulsar('DOWN')); luego(2000, () => pulsar('OK')); luego(2600, () => pulsar('OK')); luego(3200, () => pulsar('OK')); }, 4200],
    ['18:05', '<b>Sacás la tarjeta</b> con el botón ⏏ 1. Solo sale con el camión parado.', 'ej1', () => sacar(1), 2400],
    ['18:06', 'Ahora sí, <b>11 horas de descanso diario</b> antes de volver a manejar. Apagás el contacto.', 'llave', () => contacto(false), 2600]
  ];

  const SITUACIONES = {
    'Llegué al cliente y espero turno': [
      ['', 'Estás parado en el cliente con tu tarjeta puesta.', null, () => insertar('conductor', 1), 2400],
      ['', 'Te dicen que esperes y <b>sabés cuánto va a tardar</b>: eso es <b>disponibilidad</b>. Apretás el 1 hasta el <b>cuadrado</b>.', 'b1', () => pulsar('1'), 2800],
      ['', 'Si no te dicen cuánto tarda y pasa de 2 horas, para la ley laboral ese tiempo cuenta como trabajo.', 'lcd', null, 3400]
    ],
    'Voy a comer o a hacer la pausa': [
      ['', 'Paraste con tu tarjeta puesta. Al frenar, el tacógrafo marca <b>martillos</b>.', null, () => insertar('conductor', 1), 2400],
      ['', 'Para la pausa <b>apretás el 1 hasta la cama</b>.', 'b1', () => { pulsar('1'); luego(500, () => pulsar('1')); }, 2800],
      ['', 'La pausa tiene que ser de <b>45 minutos</b> (o 15 + 30). Con 45 minutos de cama, la conducción seguida vuelve a cero.', 'lcd', null, 3400]
    ],
    'Cargo o descargo el camión': [
      ['', 'Estás parado con tu tarjeta puesta.', null, () => insertar('conductor', 1), 2400],
      ['', 'Cargar y descargar es <b>otro trabajo</b>: el botón 1 tiene que estar en <b>martillos</b>. Al parar ya queda así.', 'b1', null, 3000],
      ['', 'Limpiar el camión, revisarlo o hacer trámites también es martillos.', 'b1', null, 2800]
    ],
    'Me olvidé la tarjeta y ya arranqué': [
      ['', 'Saliste manejando <b>sin tarjeta</b>. Mirá la pantalla: avisa CONDUCCIÓN SIN TARJETA.', 'lcd', () => velocidad(85), 3000],
      ['', 'Te das cuenta y la metés andando. <b>Se puede, pero queda grabado un incidente</b>.', 'conductor', () => insertar('conductor', 1), 3200],
      ['', 'Lo correcto: meterla siempre <b>antes de salir</b>, al hacerte cargo del camión.', 'stop', () => velocidad(0), 2600]
    ],
    'Perdí la tarjeta o se rompió': [
      ['', 'Podés manejar sin tarjeta hasta <b>15 días</b>, y pedir una nueva en <b>7 días</b>.', null, null, 3000],
      ['', 'Al empezar el viaje <b>imprimís</b> un papel, y le ponés tus datos y tu <b>firma</b>.', 'imp', () => imprimir('P24'), 3800],
      ['', 'Al terminar el viaje, <b>otro papel</b>, también con tus datos y tu firma. Los guardás para mostrar en un control.', 'imp', null, 3400]
    ],
    'Me para la Guardia Civil': [
      ['', 'Estás con tu tarjeta en la ranura 1 y paraste.', null, () => insertar('conductor', 1), 2400],
      ['', 'El agente mete su <b>tarjeta de control</b> (azul) en la ranura 2. El tacógrafo pasa a <b>modo control</b>.', 'control', () => insertar('control', 2), 3000],
      ['', 'Puede leer, imprimir y descargar tus datos. Vos mostrás tu tarjeta, las impresiones que hayas hecho y los discos de los 56 días anteriores si manejaste uno analógico.', 'ranura2', null, 4200]
    ],
    'Subo al ferry o al tren': [
      ['', 'Paraste para subir el camión al barco, con tu tarjeta puesta.', null, () => insertar('conductor', 1), 2400],
      ['', 'En el menú: <b>OK → VEHÍCULO → FERRY / TREN</b>. Aparece el barquito en la pantalla.', 'ok', () => { pulsar('OK'); luego(500, () => pulsar('DOWN')); luego(900, () => pulsar('DOWN')); luego(1300, () => pulsar('DOWN')); luego(1800, () => pulsar('OK')); luego(2300, () => pulsar('DOWN')); luego(2800, () => pulsar('OK')); luego(3600, () => pulsar('OK')); }, 4600],
      ['', 'En el barco, con litera, <b>apretás el 1 hasta la cama</b>: es tu descanso. Lo podés cortar 2 veces, 1 hora en total, para subir y bajar el camión.', 'b1', () => { pulsar('1'); luego(500, () => pulsar('1')); }, 3600]
    ]
  };
  const sit = $('#dt-sit');
  sit.innerHTML = Object.keys(SITUACIONES).map(n => `<button data-s="${n}">${n}</button>`).join('');
  sit.querySelectorAll('button').forEach(b => b.onclick = e => { e.stopPropagation(); sit.classList.remove('ve'); correr(SITUACIONES[b.dataset.s], true); });
  $('#dt-sit-btn').onclick = e => { e.stopPropagation(); sit.classList.toggle('ve'); };
  pantalla.addEventListener('click', e => { if (!e.target.closest('#dt-sit') && !e.target.closest('#dt-sit-btn')) sit.classList.remove('ve'); });
  $('#dt-dia').onclick = e => { e.stopPropagation(); correr(DIA, false); };

  function callando(fn) { return (...a) => { callado = true; try { return fn(...a); } finally { callado = false; } }; }

  reset(true);

  return {
    // la clase no reinicia el aparato en cada paso: solo limpia los carteles
    limpiarClase: () => { cancelarGuion(); callar(); st.mensaje = null; pintarTodo(); },
    reset: callando(() => { cancelarGuion(); callar(); reset(true); }),
    // para los pasos de la clase: explica abajo y prende la parte, sin tapar nada
    explicar: (texto, parte) => {
      const sel = { lcd: '.dt-bisel-lcd', ranura1: '[data-ayuda="ranura1"]', ranura2: '[data-ayuda="ranura2"]', impresora: '.dt-impresora', b1: '[data-k="1"]', b2: '[data-k="2"]' }[parte];
      if (texto === null) { iluminar(null); callar(); return; }
      decir(texto);
      iluminar(sel ? $(sel) : null);
    },
    actualizar,
    insertar: callando((t, r, d = false) => { if (st.ranura[r] === t) return; insertar(t, r, d); }),
    sacar: callando(r => sacar(r, true)),
    andar: callando(si => { if ((st.vel > 0) !== si) velocidad(si ? 85 : 0); }),
    actividad: (r, a) => { st.act[r] = a; pintarTodo(); },
    imprimir: callando(() => imprimir('P24')),
    pantalla: (t, s = 4) => mensaje(t, s),
    contacto
  };
}
