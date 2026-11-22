// ==========================================
// ESCENA: SISTEMAS DE SEGURIDAD (Mercancías)
// Usa el mismo mundo y el mismo camión 3D que Kamm y subviraje.
// Hay dos camiones: A (el de Proyecto Apolo, CON el sistema) y B (SIN el sistema),
// cada uno en su carril, para comparar. Además una bajada de montaña para los frenos.
// Cada simulación es un "modo": esquiva, choque, fading, ralentizador, abs, asr,
// espNo, espSi, ebs, bas, aebs, acc, carril, angulo.
// ==========================================
import * as THREE from 'three';
import { crearCamion } from './camion.js';
import { puntoEnCarril, INICIO_CURVA, FIN_CURVA } from './mundo.js';

const CARRIL = 1.6;
const NARIZ = 3.0;                // del centro de la tractora a la trompa
const X_INICIO = -104;            // donde arrancan los camiones en la recta
const X_FRENA = -66;              // donde empiezan a frenar
const X_OBSTACULO = -40;          // el auto parado
const COLOR_NEUMATICO = 0x1e293b;
const COLOR_BLOQUEO = 0xdc2626;   // rueda trabada
const COLOR_ABS = 0xf59e0b;       // rueda que el ABS suelta y aprieta
const COLOR_PATINA = 0xf97316;    // rueda que patina al acelerar
const COLOR_FRENA = 0x22d3ee;     // rueda frenando (EBS)
const COLOR_ESP = 0x22c55e;       // la rueda que frena el ESP
const COLOR_RALENT = 0x3b82f6;    // ruedas que frena el ralentizador

// Bajada de montaña (al costado de la ruta): de 9 metros de alto a 0
const RAMPA = { x0: -104, x1: -14, z: 22, alto: 9 };
const PENDIENTE = RAMPA.alto / (RAMPA.x1 - RAMPA.x0);
const alturaRampa = x => RAMPA.alto * Math.max(0, Math.min(1, (RAMPA.x1 - x) / (RAMPA.x1 - RAMPA.x0)));

// Testigos del tablero (en el orden de las 9 lucecitas del dibujo)
export const TESTIGOS = ['ABS', 'ASR', 'ESP', 'EBS', 'BAS', 'AEBS', 'CARRIL', 'ACC', 'RALENT'];

// ---------- AUTO (el obstáculo) ----------
function crearAuto(color = 0xdc2626) {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.45, metalness: 0.15 });
  const cuerpo = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.7, 1.7), mat);
  cuerpo.position.y = 0.65; cuerpo.castShadow = true; g.add(cuerpo);
  const techo = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.6, 1.5), mat);
  techo.position.set(-0.2, 1.25, 0); techo.castShadow = true; g.add(techo);
  const vidrio = new THREE.Mesh(new THREE.BoxGeometry(2.05, 0.42, 1.52), new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.1, metalness: 0.4 }));
  vidrio.position.set(-0.2, 1.26, 0); g.add(vidrio);
  const matRueda = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.8 });
  [[1.2, 0.85], [1.2, -0.85], [-1.2, 0.85], [-1.2, -0.85]].forEach(([x, z]) => {
    const r = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.25, 18).rotateX(Math.PI / 2), matRueda);
    r.position.set(x, 0.34, z); g.add(r);
  });
  // luces de freno
  const matStop = new THREE.MeshStandardMaterial({ color: 0x7f1d1d, emissive: 0xef4444, emissiveIntensity: 0.4 });
  [0.6, -0.6].forEach(z => {
    const l = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.16, 0.36), matStop);
    l.position.set(-1.92, 0.8, z); g.add(l);
  });
  g.userData.matStop = matStop;
  return g;
}

// Cartel en el piso para marcar dónde frenan o dónde paran
function crearMarca(color) {
  const g = new THREE.Group();
  const poste = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.6, 8), new THREE.MeshStandardMaterial({ color }));
  poste.position.y = 0.8; g.add(poste);
  const bandera = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.4, 0.7), new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.5 }));
  bandera.position.set(0, 1.45, 0.35); g.add(bandera);
  g.visible = false;
  return g;
}

// Brillo en cada rueda (disco caliente, rueda que frena, etc.)
function agregarBrillos(camion) {
  camion.ruedas.forEach(r => {
    const radio = r.userData.radio;
    const mat = new THREE.MeshBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0, depthWrite: false });
    const aro = new THREE.Mesh(new THREE.TorusGeometry(radio * 0.62, radio * 0.12, 10, 28), mat);
    aro.position.z = 0;
    r.add(aro);
    r.userData.brillo = mat;
  });
}

export function crearEscenaSeguridad({ escena, mundo }) {
  // ---------- LOS DOS CAMIONES ----------
  const A = crearCamion();
  const B = crearCamion();
  escena.add(A.grupo);
  escena.add(B.grupo);
  agregarBrillos(A);
  agregarBrillos(B);
  // B es gris, para distinguirlo (el de Proyecto Apolo es A)
  const vistos = new Set();
  B.grupo.traverse(o => {
    if (!o.isMesh || !o.material || !o.material.color || vistos.has(o.material)) return;
    vistos.add(o.material);
    const c = o.material.color.getHex();
    if (c === 0x3b82f6) o.material.color.setHex(0x9ca3af);
    if (c === 0x2563eb) o.material.color.setHex(0x6b7280);
  });

  // ---------- AUTOS ----------
  const autoA = crearAuto(0xdc2626);
  const autoB = crearAuto(0xdc2626);
  const autoGuia = crearAuto(0x16a34a);   // el auto de adelante en el ACC
  const autoCostado = crearAuto(0xf59e0b); // el del ángulo muerto
  [autoA, autoB, autoGuia, autoCostado].forEach(a => { a.visible = false; escena.add(a); });

  // ---------- MARCAS ----------
  const marcaA = crearMarca(0x22c55e);
  const marcaB = crearMarca(0xef4444);
  const marcaFreno = crearMarca(0xfacc15);
  [marcaA, marcaB, marcaFreno].forEach(m => escena.add(m));

  // ---------- HUELLAS DE FRENADA (rueda trabada) ----------
  const matHuella = new THREE.MeshBasicMaterial({ color: 0x0b0f19, transparent: true, opacity: 0.85, depthWrite: false });
  const huellas = [1.0, -1.0].map(() => {
    const h = new THREE.Mesh(new THREE.PlaneGeometry(1, 0.32).rotateX(-Math.PI / 2), matHuella);
    h.visible = false; h.renderOrder = 3; escena.add(h);
    return h;
  });

  // ---------- RADAR (AEBS / ACC) ----------
  const matRadar = new THREE.MeshBasicMaterial({ color: 0x22c55e, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide });
  const radar = new THREE.Mesh(new THREE.ConeGeometry(2.6, 30, 32, 1, true), matRadar);
  radar.rotation.z = Math.PI / 2;        // apunta hacia adelante (+X)
  radar.position.set(NARIZ + 15, 1.0, 0);
  radar.renderOrder = 4;
  A.tractora.add(radar);

  // ---------- LÍNEA DEL CARRIL QUE SE ILUMINA (LDW) ----------
  const matLineaAviso = new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0, depthWrite: false });
  const lineaAviso = new THREE.Mesh(new THREE.PlaneGeometry(60, 0.5).rotateX(-Math.PI / 2), matLineaAviso);
  lineaAviso.position.set(-60, 0.07, 0);
  lineaAviso.renderOrder = 5;
  escena.add(lineaAviso);

  // ---------- LUZ DEL ESPEJO (ángulo muerto) ----------
  const matEspejo = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0 });
  const luzEspejo = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), matEspejo);
  luzEspejo.position.set(2.3, 2.3, -1.35);
  A.tractora.add(luzEspejo);

  // ---------- BAJADA DE MONTAÑA ----------
  const largoRampa = Math.hypot(RAMPA.x1 - RAMPA.x0, RAMPA.alto);
  const angRampa = Math.atan(PENDIENTE);
  const rampa = new THREE.Group();
  const asfalto = new THREE.Mesh(new THREE.BoxGeometry(largoRampa + 6, 0.3, 7), new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.85 }));
  asfalto.rotation.z = -angRampa;
  asfalto.position.set((RAMPA.x0 + RAMPA.x1) / 2, RAMPA.alto / 2 - 0.13, RAMPA.z);
  asfalto.receiveShadow = true;
  rampa.add(asfalto);
  // la montaña debajo (una cuña de tierra)
  const forma = new THREE.Shape();
  forma.moveTo(RAMPA.x0 - 6, -0.5); forma.lineTo(RAMPA.x0 - 6, RAMPA.alto - 0.4); forma.lineTo(RAMPA.x0, RAMPA.alto - 0.4); forma.lineTo(RAMPA.x1, -0.4); forma.lineTo(RAMPA.x1, -0.5);
  const cuna = new THREE.Mesh(new THREE.ExtrudeGeometry(forma, { depth: 9, bevelEnabled: false }), new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.9, flatShading: true }));
  cuna.position.z = RAMPA.z - 4.5 - 0.3;
  cuna.receiveShadow = true;
  rampa.add(cuna);
  // línea del medio
  for (let i = 0; i < 24; i++) {
    const x = RAMPA.x0 + 2 + i * 3.7;
    const l = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.02, 0.18), new THREE.MeshStandardMaterial({ color: 0xfacc15 }));
    l.rotation.z = -angRampa;
    l.position.set(x, alturaRampa(x) + 0.03, RAMPA.z);
    rampa.add(l);
  }
  rampa.visible = false;
  escena.add(rampa);

  // ---------- PANEL DE LA CABINA ----------
  const elKmh = document.getElementById('cab-kmh');
  const elAguja = document.getElementById('cab-aguja');
  const elPedal = document.getElementById('cab-pedal');
  const elPedalTxt = document.getElementById('cab-pedal-txt');
  const elBas = document.getElementById('cab-bas');
  const elTermo = document.getElementById('cab-termo');
  const elTermoBox = document.getElementById('cab-termo-caja');
  const elTestigos = {};
  TESTIGOS.forEach(t => { elTestigos[t] = document.querySelector(`[data-testigo="${t}"]`); });
  const elTestigoNombre = document.getElementById('cab-testigo');

  // ---------- ESTADO ----------
  let modo = 'quieto';
  let t = 0;               // tiempo del modo
  let terminado = 0;       // segundos desde que terminó (para repetir solo)
  let alCambiarEstado = null;
  let estadoActual = '';
  const ancla = new THREE.Vector3();
  const estado = {};       // datos de cada camión
  let temp = 0;            // temperatura de los frenos (0 a 1)
  let pedal = 0, pedalBas = 0;
  let vibra = 0;
  const testigos = {};

  function avisar(clave) {
    if (clave === estadoActual) return;
    estadoActual = clave;
    if (alCambiarEstado) alCambiarEstado(clave);
  }

  function nuevoEstado(camion, z, conSistema) {
    return { camion, x: X_INICIO, z, zObj: z, v: 0, rumbo: 0, rumboRemolque: 0, conSistema, parado: false, s: 0, frenando: false, tFreno: 0, choco: false, giroExtra: 0, ang: 0 };
  }

  function pintarRuedas(camion, fn) {
    camion.ruedas.forEach((r, i) => {
      const c = fn(i);
      r.userData.materialNeumatico.color.setHex(c ?? COLOR_NEUMATICO);
    });
  }
  function brillo(camion, fn) {
    camion.ruedas.forEach((r, i) => {
      const v = fn(i);
      if (!v) { r.userData.brillo.opacity = 0; return; }
      r.userData.brillo.color.setHex(v.color);
      r.userData.brillo.opacity = v.op;
    });
  }

  // ---------- PREPARAR CADA MODO ----------
  function reiniciar() {
    pintarRuedas(A, () => null); pintarRuedas(B, () => null); brillo(A, () => null); brillo(B, () => null);
    t = 0; terminado = 0; estadoActual = ''; temp = 0; pedal = 0; pedalBas = 0; vibra = 0;
    TESTIGOS.forEach(k => { testigos[k] = 0; });
    estado.A = nuevoEstado(A, CARRIL, true);
    estado.B = nuevoEstado(B, -CARRIL, false);
    const dos = ['abs', 'asr', 'ebs', 'bas'].includes(modo);
    A.grupo.visible = modo !== 'nada';
    B.grupo.visible = dos;
    autoA.visible = ['esquiva', 'choque', 'abs', 'bas', 'aebs'].includes(modo);
    autoB.visible = ['abs', 'bas'].includes(modo);
    autoGuia.visible = modo === 'acc';
    autoCostado.visible = modo === 'angulo';
    rampa.visible = ['fading', 'ralentizador'].includes(modo);
    [marcaA, marcaB, marcaFreno].forEach(m => { m.visible = false; });
    huellas.forEach(h => { h.visible = false; });
    matRadar.opacity = 0;
    matLineaAviso.opacity = 0;
    matEspejo.opacity = 0;
    mundo.setSuelo(['asr', 'espNo', 'espSi'].includes(modo) ? 'hielo' : modo === 'abs' ? 'mojado' : 'seco');
    [A, B].forEach(c => {
      pintarRuedas(c, () => null);
      brillo(c, () => null);
      c.remolque.rotation.y = 0;
      c.cuerpoTractora.rotation.set(0, 0, 0);
    });
    autoA.position.set(X_OBSTACULO, 0.02, CARRIL);
    autoB.position.set(X_OBSTACULO, 0.02, -CARRIL);
    autoA.rotation.set(0, 0, 0);
    autoB.rotation.set(0, 0, 0);
    autoA.userData.matStop.emissiveIntensity = 1.2;
    autoB.userData.matStop.emissiveIntensity = 1.2;

    const ea = estado.A, eb = estado.B;
    if (modo === 'quieto' || modo === 'nada') {
      ea.x = -40; ea.v = 0;
    } else if (['esquiva', 'choque', 'abs', 'bas'].includes(modo)) {
      ea.v = eb.v = 70 / 3.6;
    } else if (modo === 'ebs') {
      ea.v = eb.v = 70 / 3.6;
      ea.x = eb.x = -106;
    } else if (modo === 'asr') {
      ea.x = eb.x = -96; ea.v = eb.v = 0;
    } else if (modo === 'aebs') {
      ea.v = 60 / 3.6; ea.x = -106;
    } else if (modo === 'acc') {
      ea.v = 60 / 3.6; ea.x = -106;
      autoGuia.position.set(-80, 0.02, CARRIL);
      autoGuia.userData.v = 60 / 3.6;
      autoGuia.userData.matStop.emissiveIntensity = 0.3;
    } else if (modo === 'carril' || modo === 'angulo') {
      ea.v = 50 / 3.6; ea.x = -106;
      autoCostado.position.set(-112, 0.02, -CARRIL);
      autoCostado.userData.matStop.emissiveIntensity = 0.3;
    } else if (modo === 'fading' || modo === 'ralentizador') {
      ea.x = RAMPA.x0 + 4; ea.z = RAMPA.z; ea.v = 40 / 3.6;
    } else if (modo === 'espNo' || modo === 'espSi') {
      ea.s = INICIO_CURVA - 40; ea.v = 55 / 3.6;
    }
    ubicar(A, ea);
    ubicar(B, eb);
    calcularAncla();
    dibujarPanel(0);
  }

  function ubicar(camion, e) {
    let y = 0.06, inclinacion = 0;
    if (modo === 'fading' || modo === 'ralentizador') {
      y = alturaRampa(e.x) + 0.06;
      inclinacion = e.x < RAMPA.x1 ? -angRampa : 0;
    }
    camion.grupo.position.set(e.x, y, e.z);
    camion.grupo.rotation.set(0, e.rumbo, inclinacion);
    camion.remolque.rotation.y = e.rumboRemolque - e.rumbo;
  }

  function calcularAncla() {
    const ea = estado.A, eb = estado.B;
    if (B.grupo.visible) ancla.set((ea.x + eb.x) / 2 - 3, 0.06, (ea.z + eb.z) / 2);
    else if (modo === 'fading' || modo === 'ralentizador') ancla.set(ea.x - 3, alturaRampa(ea.x), ea.z);
    else if (modo === 'espNo' || modo === 'espSi') ancla.set(ea.x, 0.06, ea.z);
    else ancla.set(ea.x - 3, 0.06, ea.z);
  }

  function girarRuedas(camion, v, dt, soloMotrices = null) {
    camion.ruedas.forEach((r, i) => {
      if (soloMotrices !== null && (i === 2 || i === 3)) r.rotation.z -= (soloMotrices / r.userData.radio) * dt;
      else r.rotation.z -= (v / r.userData.radio) * dt;
    });
  }

  // Frena en la recta: devuelve true si ya paró
  function frenarRecta(e, dt, decel) {
    e.v = Math.max(0, e.v - decel * dt);
    e.x += e.v * dt;
    return e.v <= 0.01;
  }

  // ---------- CADA CUADRO ----------
  function actualizar(dt) {
    t += dt;
    const ea = estado.A, eb = estado.B;
    TESTIGOS.forEach(k => { testigos[k] = 0; });
    let pedalObj = 0, basObj = 0;

    if (modo === 'quieto' || modo === 'nada') {
      avisar('quieto');
    }

    // ---------- ESQUIVA (seguridad activa) y CHOQUE (seguridad pasiva) ----------
    else if (modo === 'esquiva' || modo === 'choque') {
      if (ea.x < X_FRENA && !ea.parado) {
        ea.x += ea.v * dt; avisar('anda');
      } else if (!ea.parado) {
        pedalObj = 1;
        if (modo === 'esquiva') {
          ea.zObj = CARRIL + 3.4;
          ea.parado = frenarRecta(ea, dt, 6.5);
          avisar('esquiva');
        } else {
          const limite = X_OBSTACULO - 1.9 - NARIZ;
          ea.parado = frenarRecta(ea, dt, 4.2);
          if (ea.x >= limite) { ea.x = limite; ea.v = 0; ea.parado = true; ea.choco = true; }
          avisar('frena');
        }
      }
      if (ea.choco) {
        avisar('choque');
        autoA.position.x = Math.min(autoA.position.x + dt * 2, X_OBSTACULO + 1.2);
        A.cuerpoTractora.rotation.z = Math.sin(Math.min(t, 40) * 30) * 0.02 * Math.max(0, 1 - terminado * 2);
      }
      ea.z += (ea.zObj - ea.z) * Math.min(1, dt * 1.6);
      ea.rumbo = -(ea.zObj - ea.z) * 0.08 * Math.min(1, ea.v / 5);
      girarRuedas(A, ea.v, dt);
      if (ea.parado) avisar(ea.choco ? 'choque' : 'parado');
    }

    // ---------- ABS: A con ABS esquiva, B sin ABS traba las ruedas y sigue derecho ----------
    else if (modo === 'abs') {
      [ea, eb].forEach(e => {
        const camion = e.camion;
        if (e.x < X_FRENA && !e.parado) { e.x += e.v * dt; girarRuedas(camion, e.v, dt); return; }
        if (e.parado) return;
        if (!e.frenando) { e.frenando = true; e.tFreno = 0; }
        e.tFreno += dt;
        if (e.conSistema) {
          // ABS: frena fuerte pero sin trabar, y se puede doblar
          e.parado = frenarRecta(e, dt, 6.0);
          e.zObj = CARRIL + 3.4;
          girarRuedas(camion, e.v, dt);
          const pulso = Math.sin(e.tFreno * 38) > 0;
          pintarRuedas(camion, () => (pulso && e.v > 2 ? COLOR_ABS : null));
          if (e.v > 7 / 3.6) { testigos.ABS = 1; vibra = 1; }
        } else {
          // Sin ABS: ruedas trabadas, patina derecho y no dobla
          const limite = X_OBSTACULO - 1.9 - NARIZ;
          e.parado = frenarRecta(e, dt, 4.0);
          if (e.x >= limite) { e.x = limite; e.v = 0; e.parado = true; e.choco = true; }
          pintarRuedas(camion, () => COLOR_BLOQUEO);
          huellas.forEach((h, k) => {
            h.visible = true;
            const desde = X_FRENA - 0.9, hasta = e.x - 0.9;
            h.scale.x = Math.max(0.01, hasta - desde);
            h.position.set((desde + hasta) / 2, 0.06, e.z + (k === 0 ? 1 : -1));
          });
        }
        e.z += (e.zObj - e.z) * Math.min(1, dt * 1.6);
        e.rumbo = -(e.zObj - e.z) * 0.08 * Math.min(1, e.v / 5);
      });
      pedalObj = ea.frenando && !ea.parado ? 1 : 0;
      if (eb.choco) autoB.position.x = Math.min(autoB.position.x + dt * 2, X_OBSTACULO + 1.2);
      if (ea.frenando && !ea.parado) avisar('frenan');
      else if (!ea.frenando) avisar('anda');
      if (ea.parado && eb.parado) avisar('fin');
    }

    // ---------- ASR: arrancar en hielo ----------
    else if (modo === 'asr') {
      if (t > 0.8) {
        // A con ASR: arranca despacio y derecho
        ea.v = Math.min(ea.v + 1.1 * dt, 30 / 3.6);
        ea.x += ea.v * dt;
        girarRuedas(A, ea.v, dt);
        if (t < 5) testigos.ASR = Math.sin(t * 10) > 0 ? 1 : 0.3;
        // B sin ASR: las motrices giran locas, casi no avanza y la cola se mueve
        eb.v = Math.min(eb.v + 0.18 * dt, 6 / 3.6);
        eb.x += eb.v * dt;
        girarRuedas(B, eb.v, dt, 14);
        pintarRuedas(B, i => (i === 2 || i === 3 ? COLOR_PATINA : null));
        eb.rumbo = Math.sin(t * 2.6) * 0.06;
        pedalObj = 1;
        avisar('arrancan');
      }
      if (ea.x > -40) avisar('fin');
    }

    // ---------- ESP: curva con hielo ----------
    else if (modo === 'espNo' || modo === 'espSi') {
      ea.s += ea.v * dt;
      const p = puntoEnCarril(ea.s);
      const enCurva = ea.s > INICIO_CURVA + 4;
      if (modo === 'espNo' && enCurva) {
        // la cola se va: el semirremolque empuja y el camión se cruza (tijera)
        ea.ang = Math.min(ea.ang + dt * 0.55, 1);
        const k = ea.ang;
        ea.v = Math.max(0, ea.v - 3 * dt);
        const fuera = 5 * k * k;  // se sale hacia afuera de la curva
        ea.x = p.x + Math.sin(p.rumbo) * fuera;
        ea.z = p.z + Math.cos(p.rumbo) * fuera;
        ea.rumbo = p.rumbo + 0.9 * k;
        ea.rumboRemolque = p.rumbo - 0.35 * k;
        pintarRuedas(A, i => (i >= 2 ? COLOR_PATINA : null));
        avisar(ea.v < 0.5 ? 'fin' : 'derrapa');
      } else {
        ea.x = p.x; ea.z = p.z; ea.rumbo = p.rumbo;
        ea.rumboRemolque += (ea.v / 6.2) * Math.sin(ea.rumbo - ea.rumboRemolque) * dt;
        if (modo === 'espSi' && enCurva && ea.s < FIN_CURVA - 10) {
          // el ESP frena una sola rueda (la delantera de afuera de la curva) y corrige
          testigos.ESP = Math.sin(t * 10) > 0 ? 1 : 0.3;
          brillo(A, i => (i === 0 ? { color: COLOR_ESP, op: 0.95 } : null));
          pintarRuedas(A, i => (i === 0 ? COLOR_ESP : null));
          ea.rumbo += Math.sin(t * 6) * 0.03;
          avisar('corrige');
        } else {
          brillo(A, () => null);
          pintarRuedas(A, () => null);
          avisar(enCurva ? 'sigue' : 'anda');
        }
        if (ea.s > FIN_CURVA + 20) avisar('fin');
      }
      girarRuedas(A, ea.v, dt);
    }

    // ---------- EBS: todas las ruedas a la vez ----------
    else if (modo === 'ebs') {
      [ea, eb].forEach(e => {
        const camion = e.camion;
        if (e.x < X_FRENA - 8 && !e.frenando) { e.x += e.v * dt; girarRuedas(camion, e.v, dt); return; }
        if (!e.frenando) {
          e.frenando = true; e.tFreno = 0;
          marcaFreno.visible = true; marcaFreno.position.set(e.x + NARIZ, 0, CARRIL + 3.4);
        }
        e.tFreno += dt;
        if (e.parado) return;
        let activos;
        if (e.conSistema) activos = i => true;
        else activos = i => (i < 2 ? e.tFreno > 0.35 : i < 4 ? e.tFreno > 0.8 : e.tFreno > 1.4);
        const n = camion.ruedas.filter((r, i) => activos(i)).length / camion.ruedas.length;
        e.parado = frenarRecta(e, dt, 6.2 * n);
        girarRuedas(camion, e.v, dt);
        brillo(camion, i => (activos(i) && !e.parado ? { color: COLOR_FRENA, op: 0.9 } : null));
        if (e.parado) {
          const m = e.conSistema ? marcaA : marcaB;
          m.visible = true; m.position.set(e.x + NARIZ, 0, e.z + (e.conSistema ? 2.6 : -2.6));
          brillo(camion, () => null);
        }
      });
      if (ea.frenando && !ea.parado) { testigos.EBS = 1; pedalObj = 1; }
      avisar(ea.frenando ? (ea.parado && eb.parado ? 'fin' : 'frenan') : 'anda');
    }

    // ---------- BAS: el conductor no pisa a fondo; el BAS sí ----------
    else if (modo === 'bas') {
      [ea, eb].forEach(e => {
        const camion = e.camion;
        if (e.x < X_FRENA && !e.parado) { e.x += e.v * dt; girarRuedas(camion, e.v, dt); return; }
        if (e.parado) return;
        e.frenando = true;
        const limite = X_OBSTACULO - 1.9 - NARIZ;
        e.parado = frenarRecta(e, dt, e.conSistema ? 7.2 : 3.6);
        if (e.x >= limite) { e.x = limite; e.v = 0; e.parado = true; e.choco = true; }
        girarRuedas(camion, e.v, dt);
        brillo(camion, () => (!e.parado ? { color: COLOR_FRENA, op: e.conSistema ? 0.95 : 0.45 } : null));
      });
      if (ea.frenando && !ea.parado) { pedalObj = 0.5; basObj = 1; testigos.BAS = 1; }
      if (eb.choco) autoB.position.x = Math.min(autoB.position.x + dt * 2, X_OBSTACULO + 1.2);
      avisar(ea.frenando ? (ea.parado && eb.parado ? 'fin' : 'frenan') : 'anda');
    }

    // ---------- AEBS: frena solo antes de chocar ----------
    else if (modo === 'aebs') {
      const dist = X_OBSTACULO - 1.9 - (ea.x + NARIZ);
      if (!ea.parado) {
        if (dist > 34) { ea.x += ea.v * dt; matRadar.color.setHex(0x22c55e); matRadar.opacity = 0.12; avisar('anda'); }
        else if (dist > 22) { ea.x += ea.v * dt; matRadar.color.setHex(0xf59e0b); matRadar.opacity = 0.2; testigos.AEBS = Math.sin(t * 12) > 0 ? 1 : 0.3; avisar('avisa'); }
        else { matRadar.color.setHex(0xef4444); matRadar.opacity = 0.26; testigos.AEBS = 1; pedalObj = 1; ea.parado = frenarRecta(ea, dt, 7.5); avisar('frena'); }
      } else { matRadar.opacity = 0.1; avisar('fin'); }
      girarRuedas(A, ea.v, dt);
    }

    // ---------- ACC: mantiene la distancia con el de adelante ----------
    else if (modo === 'acc') {
      const g = autoGuia.userData;
      const vg = t < 4 ? 60 / 3.6 : t < 9 ? 38 / 3.6 : 52 / 3.6;
      g.v += (vg - g.v) * Math.min(1, dt * 0.8);
      autoGuia.userData.matStop.emissiveIntensity = vg < g.v - 0.5 ? 1.4 : 0.3;
      autoGuia.position.x += g.v * dt;
      const hueco = autoGuia.position.x - 1.9 - (ea.x + NARIZ);
      const deseado = 2 * ea.v + 4;   // unos 2 segundos
      ea.v += ((g.v + (hueco - deseado) * 0.35) - ea.v) * Math.min(1, dt * 1.2);
      ea.v = Math.max(0, ea.v);
      ea.x += ea.v * dt;
      matRadar.color.setHex(0x38bdf8); matRadar.opacity = 0.12;
      testigos.ACC = 1;
      estado.segundos = ea.v > 0.5 ? hueco / ea.v : 0;
      girarRuedas(A, ea.v, dt);
      avisar(vg < 50 / 3.6 ? 'frena' : 'sigue');
      if (autoGuia.position.x > -6) avisar('fin');
    }

    // ---------- CARRIL (LDW y LKA) y ÁNGULO MUERTO (BSM) ----------
    else if (modo === 'carril') {
      ea.x += ea.v * dt;
      const x = ea.x;
      if (x < -84) { ea.zObj = CARRIL; avisar('anda'); }
      else if (x < -66) { ea.zObj = 0.15; if (ea.z < 0.75) { matLineaAviso.opacity = 0.6 + Math.sin(t * 14) * 0.3; testigos.CARRIL = 1; avisar('avisa'); } }
      else { ea.zObj = CARRIL; matLineaAviso.opacity = Math.max(0, matLineaAviso.opacity - dt); testigos.CARRIL = ea.z < 1.2 ? 1 : 0; avisar('corrige'); }
      ea.z += (ea.zObj - ea.z) * Math.min(1, dt * 0.9);
      ea.rumbo = -(ea.zObj - ea.z) * 0.05;
      girarRuedas(A, ea.v, dt);
      if (x > -20) avisar('fin');
    } else if (modo === 'angulo') {
      ea.x += ea.v * dt;
      autoCostado.position.x += (ea.v + (t < 3 ? 2.4 : 0)) * dt;
      const rel = autoCostado.position.x - ea.x;
      const enAngulo = rel > -7 && rel < 1.5;
      matEspejo.opacity = enAngulo ? 0.6 + Math.sin(t * 12) * 0.4 : 0;
      girarRuedas(A, ea.v, dt);
      avisar(enAngulo ? 'avisa' : 'anda');
      if (ea.x > -20) avisar('fin');
    }

    // ---------- BAJADA: FADING y RALENTIZADOR ----------
    else if (modo === 'fading' || modo === 'ralentizador') {
      const g = 9.8 * Math.sin(angRampa);
      if (ea.x < RAMPA.x1 - 2) {
        if (modo === 'fading') {
          // solo el freno de servicio: aguanta… hasta que se calienta
          const fuerza = Math.max(0, 1 - Math.max(0, temp - 0.45) * 1.6);
          const decel = Math.min(g + 0.15, (g + 0.6) * fuerza);
          ea.v = Math.max(0, ea.v + (g - decel) * dt);
          temp = Math.min(1, temp + dt * 0.085);
          pedalObj = 1;
          // las ruedas se pintan: negro → naranja → rojo a medida que se calientan
          const cal = temp < 0.5 ? new THREE.Color(COLOR_NEUMATICO).lerp(new THREE.Color(0xf97316), temp / 0.5) : new THREE.Color(0xf97316).lerp(new THREE.Color(0xdc2626), (temp - 0.5) / 0.5);
          pintarRuedas(A, () => cal.getHex());
          brillo(A, () => ({ color: temp > 0.6 ? 0xef4444 : 0xf97316, op: Math.min(1, temp * 1.2) }));
          avisar(temp > 0.6 ? 'fading' : temp > 0.3 ? 'calienta' : 'baja');
        } else {
          // el ralentizador retiene: frena las motrices sin rozar, los frenos quedan fríos
          ea.v += ((40 / 3.6) - ea.v) * Math.min(1, dt * 0.6);
          temp = Math.min(0.12, temp + dt * 0.01);
          testigos.RALENT = 1;
          brillo(A, i => (i === 2 || i === 3 ? { color: COLOR_RALENT, op: 0.9 } : null));
          pintarRuedas(A, i => (i === 2 || i === 3 ? COLOR_RALENT : null));
          avisar('retiene');
        }
        ea.x += Math.cos(angRampa) * ea.v * dt;
      } else {
        ea.v = Math.max(0, ea.v - 4 * dt);
        ea.x += ea.v * dt;
        avisar('fin');
      }
      girarRuedas(A, ea.v, dt);
    }

    // ---------- MOVER LOS CAMIONES ----------
    ubicar(A, ea);
    if (B.grupo.visible) ubicar(B, eb);
    calcularAncla();
    mundo.seguirSol(ancla.x, ancla.z);

    // Repetir solo cuando termina
    if (estadoActual === 'fin' || estadoActual === 'parado' || estadoActual === 'choque') {
      terminado += dt;
      if (terminado > 4.5) reiniciar();
    }

    pedal += (pedalObj - pedal) * Math.min(1, dt * 8);
    pedalBas += (basObj - pedalBas) * Math.min(1, dt * 8);
    vibra = Math.max(0, vibra - dt * 2);
    dibujarPanel(dt);
  }

  // ---------- PANEL ----------
  let tPanel = 0;
  function dibujarPanel(dt) {
    tPanel += dt;
    const kmh = estado.A ? estado.A.v * 3.6 : 0;
    if (elKmh) elKmh.textContent = Math.round(kmh);
    if (elAguja) elAguja.setAttribute('transform', `rotate(${-120 + Math.min(kmh, 120) * 2} 50 56)`);
    if (elPedal) {
      const sacudida = testigos.ABS ? Math.sin(tPanel * 60) * 2.5 : 0;
      elPedal.setAttribute('height', String(Math.round(pedal * 60)));
      elPedal.setAttribute('y', String(70 - pedal * 60));
      elPedal.parentNode.setAttribute('transform', `translate(${sacudida} 0)`);
    }
    if (elPedalTxt) elPedalTxt.textContent = Math.round(pedal * 100) + '%';
    if (elBas) {
      elBas.setAttribute('height', String(Math.round(pedalBas * 60)));
      elBas.setAttribute('y', String(70 - pedalBas * 60));
    }
    const conTermo = modo === 'fading' || modo === 'ralentizador';
    if (elTermoBox) elTermoBox.style.display = conTermo ? '' : 'none';
    if (elTermo) { elTermo.style.width = Math.round(temp * 100) + '%'; elTermo.style.background = temp > 0.6 ? '#ef4444' : temp > 0.3 ? '#f97316' : '#22c55e'; }
    const activos = [];
    TESTIGOS.forEach(k => {
      const el = elTestigos[k];
      if (!el) return;
      const v = testigos[k] || 0;
      el.style.opacity = String(0.15 + v * 0.85);
      el.classList.toggle('on', v > 0.5);
      if (v > 0) activos.push(el.dataset.nombre);
    });
    if (elTestigoNombre) elTestigoNombre.textContent = activos.length ? activos.join(' · ') : 'Ningún testigo encendido';
  }

  // ---------- CARTELES (anclas en 3D) ----------
  function anclaDe(nombre) {
    const ea = estado.A, eb = estado.B;
    const yA = A.grupo.position.y;
    if (nombre === 'A') return new THREE.Vector3(ea.x - 2.5, yA + 5.2, ea.z);
    if (nombre === 'B') return new THREE.Vector3(eb.x - 2.5, 5.2, eb.z);
    if (nombre === 'auto') return new THREE.Vector3(X_OBSTACULO, 3.2, CARRIL);
    if (nombre === 'autoB') return new THREE.Vector3(X_OBSTACULO, 3.2, -CARRIL);
    if (nombre === 'guia') return autoGuia.position.clone().add(new THREE.Vector3(0, 3, 0));
    if (nombre === 'costado') return autoCostado.position.clone().add(new THREE.Vector3(0, 3, 0));
    if (nombre === 'cielo') return new THREE.Vector3(ancla.x + 2, ancla.y + 9, ancla.z);
    return null;
  }

  function configurar(nuevo) {
    modo = nuevo || 'quieto';
    reiniciar();
  }

  configurar('quieto');

  return {
    configurar,
    reiniciar,
    actualizar,
    anclaDe,
    datos: () => estado,
    modo: () => modo,
    alCambiarEstado: fn => { alCambiarEstado = fn; },
    posicion: () => ancla,
    camiones: { A, B }
  };
}
