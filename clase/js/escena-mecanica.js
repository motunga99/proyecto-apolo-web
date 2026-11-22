// ==========================================
// ESCENA: MECÁNICA, CONSUMO Y MARCHAS (Mercancías)
// Mismo mundo y mismo camión 3D que el módulo 1.
// A = camión de Proyecto Apolo (el que maneja BIEN). B = gris (el que maneja MAL).
// Modos: quieto, ralenti, zona, marchas, subida, inercia, aire, humo, curva.
// ==========================================
import * as THREE from 'three';
import { crearCamion } from './camion.js';
import { puntoEnCarril, INICIO_CURVA } from './mundo.js';

const CARRIL = 1.6;
// km/h que hace el camión cada 1.000 vueltas del motor, en cada marcha (1ª a 12ª)
const KMH_POR_MIL = [0, 3.2, 4.3, 5.6, 7.2, 9.3, 12, 15.5, 19.8, 25, 31, 37, 45];
export const VERDE = [1000, 1700];   // zona verde del cuentarrevoluciones
export const ROJA = 2300;            // desde acá, zona roja
export const RPM_MAX = 3000;
const RALENTI = 600;

// Subida al costado de la ruta: de 0 a 10 metros de alto
const RAMPA = { x0: -100, x1: -12, z: 22, alto: 16 };
const ANG = Math.atan(RAMPA.alto / (RAMPA.x1 - RAMPA.x0));
const alturaRampa = x => RAMPA.alto * Math.max(0, Math.min(1, (x - RAMPA.x0) / (RAMPA.x1 - RAMPA.x0)));
const X_SEMAFORO = -8;

const rpmDe = (kmh, marcha) => Math.max(RALENTI, (kmh / KMH_POR_MIL[marcha]) * 1000);

export function crearEscenaMecanica({ escena, mundo }) {
  const A = crearCamion();
  const B = crearCamion();
  escena.add(A.grupo); escena.add(B.grupo);
  // B gris, para distinguirlo
  const vistos = new Set();
  B.grupo.traverse(o => {
    if (!o.isMesh || !o.material || !o.material.color || vistos.has(o.material)) return;
    vistos.add(o.material);
    const c = o.material.color.getHex();
    if (c === 0x3b82f6) o.material.color.setHex(0x9ca3af);
    if (c === 0x2563eb) o.material.color.setHex(0x6b7280);
  });

  // ---------- SUBIDA ----------
  const largo = Math.hypot(RAMPA.x1 - RAMPA.x0, RAMPA.alto);
  const rampa = new THREE.Group();
  const asfalto = new THREE.Mesh(new THREE.BoxGeometry(largo + 6, 0.3, 8), new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.85 }));
  asfalto.rotation.z = ANG;
  asfalto.position.set((RAMPA.x0 + RAMPA.x1) / 2, RAMPA.alto / 2 - 0.13, RAMPA.z);
  asfalto.receiveShadow = true;
  rampa.add(asfalto);
  const forma = new THREE.Shape();
  forma.moveTo(RAMPA.x0, -0.5); forma.lineTo(RAMPA.x0, -0.4); forma.lineTo(RAMPA.x1, RAMPA.alto - 0.4); forma.lineTo(RAMPA.x1 + 8, RAMPA.alto - 0.4); forma.lineTo(RAMPA.x1 + 8, -0.5);
  const cuna = new THREE.Mesh(new THREE.ExtrudeGeometry(forma, { depth: 10, bevelEnabled: false }), new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.9, flatShading: true }));
  cuna.position.z = RAMPA.z - 5; cuna.receiveShadow = true;
  rampa.add(cuna);
  const meseta = new THREE.Mesh(new THREE.BoxGeometry(14, 0.3, 8), asfalto.material);
  meseta.position.set(RAMPA.x1 + 6, RAMPA.alto - 0.13, RAMPA.z);
  rampa.add(meseta);
  for (let i = 0; i < 24; i++) {
    const x = RAMPA.x0 + 2 + i * 3.7;
    const l = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.02, 0.18), new THREE.MeshStandardMaterial({ color: 0xfacc15 }));
    l.rotation.z = ANG; l.position.set(x, alturaRampa(x) + 0.03, RAMPA.z);
    rampa.add(l);
  }
  rampa.visible = false;
  escena.add(rampa);

  // ---------- SEMÁFORO ----------
  const semaforo = new THREE.Group();
  const poste = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 4, 10), new THREE.MeshStandardMaterial({ color: 0x334155 }));
  poste.position.y = 2; semaforo.add(poste);
  const caja = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.2, 0.4), new THREE.MeshStandardMaterial({ color: 0x0f172a }));
  caja.position.y = 4.4; semaforo.add(caja);
  const matRojo = new THREE.MeshStandardMaterial({ color: 0x7f1d1d, emissive: 0xef4444, emissiveIntensity: 1.4 });
  const matVerde = new THREE.MeshStandardMaterial({ color: 0x14532d, emissive: 0x22c55e, emissiveIntensity: 0 });
  const luzR = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 10), matRojo); luzR.position.set(-0.21, 4.75, 0); semaforo.add(luzR);
  const luzV = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 10), matVerde); luzV.position.set(-0.21, 4.1, 0); semaforo.add(luzV);
  const linea = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.02, 7), new THREE.MeshStandardMaterial({ color: 0xffffff }));
  linea.position.set(X_SEMAFORO - 1, 0.04, 0);
  semaforo.position.set(X_SEMAFORO, 0, 4.2);
  semaforo.visible = false; linea.visible = false;
  escena.add(semaforo); escena.add(linea);

  // ---------- HUMO DEL ESCAPE ----------
  const humos = [];
  const geoHumo = new THREE.SphereGeometry(0.28, 10, 8);
  function soltarHumo(camion, color, tam) {
    const mat = new THREE.MeshStandardMaterial({ color, transparent: true, opacity: 0.75, roughness: 1, depthWrite: false });
    const m = new THREE.Mesh(geoHumo, mat);
    const p = new THREE.Vector3(1.2, 3.1, -1.0);
    camion.tractora.localToWorld(p);
    m.position.copy(p); m.scale.setScalar(tam);
    m.userData.vida = 0;
    escena.add(m); humos.push(m);
  }
  function moverHumo(dt) {
    for (let i = humos.length - 1; i >= 0; i--) {
      const m = humos[i];
      m.userData.vida += dt;
      m.position.y += dt * 1.2;
      m.position.x -= dt * 0.8;
      m.scale.multiplyScalar(1 + dt * 0.9);
      m.material.opacity = Math.max(0, 0.75 - m.userData.vida * 0.45);
      if (m.userData.vida > 1.7) { escena.remove(m); m.material.dispose(); humos.splice(i, 1); }
    }
  }
  function borrarHumo() { humos.forEach(m => { escena.remove(m); m.material.dispose(); }); humos.length = 0; }

  // ---------- PANEL DE LA CABINA ----------
  const el = id => document.getElementById(id);
  const elAguja = el('cab-rpm-aguja'), elRpm = el('cab-rpm'), elMarcha = el('cab-marcha'), elKmh = el('cab-kmh');
  const elCons = el('cab-consumo'), elConsBar = el('cab-consumo-bar'), elLitros = el('cab-litros'), elMsg = el('cab-testigo');

  // ---------- ESTADO ----------
  let modo = 'quieto';
  let t = 0, terminado = 0, estadoActual = '', alCambiarEstado = null;
  const ancla = new THREE.Vector3();
  const estado = { A: null, B: null };
  const nuevo = (camion, z) => ({ camion, x: -100, y: 0, z, v: 0, marcha: 1, acel: 0, cambiando: 0, cambios: 0, litros: 0, cons: 0, rpm: RALENTI, s: 0, rumbo: 0, rumboRem: 0, inercia: false, frenando: false });
  function avisar(clave) {
    if (clave === estadoActual) return;
    estadoActual = clave;
    if (alCambiarEstado) alCambiarEstado(clave);
  }

  // consumo instantáneo en litros cada 100 km (aproximado, para comparar)
  function calcularConsumo(e, pendiente = 0) {
    const kmh = e.v * 3.6;
    if (kmh < 1) return 0;
    if (e.inercia || e.frenando || e.cambiando > 0) return 0;
    const r = e.rpm / 1000;
    const base = 9 + 14 * r * r * (0.35 + 0.65 * e.acel);
    const aire = 9 * (kmh / 80) * (kmh / 80);
    return base + aire + pendiente * 260 * e.acel;
  }

  function girarRuedas(camion, v, dt) { camion.ruedas.forEach(r => { r.rotation.z -= (v / r.userData.radio) * dt; }); }

  function ubicar(e) {
    const c = e.camion;
    if (modo === 'subida') {
      e.y = alturaRampa(e.x) + 0.06;
      c.grupo.position.set(e.x, e.y, e.z);
      c.grupo.rotation.set(0, 0, e.x < RAMPA.x1 && e.x > RAMPA.x0 ? ANG : 0);
    } else {
      c.grupo.position.set(e.x, 0.06, e.z);
      c.grupo.rotation.set(0, e.rumbo, 0);
    }
    c.remolque.rotation.y = modo === 'curva' ? e.rumboRem - e.rumbo : 0;
  }

  function reiniciar() {
    t = 0; terminado = 0; estadoActual = '';
    borrarHumo();
    estado.A = nuevo(A, CARRIL);
    estado.B = nuevo(B, -CARRIL);
    const ea = estado.A, eb = estado.B;
    const dos = ['marchas', 'subida', 'inercia', 'aire', 'humo'].includes(modo);
    B.grupo.visible = dos;
    rampa.visible = modo === 'subida';
    semaforo.visible = linea.visible = modo === 'inercia';
    matRojo.emissiveIntensity = 1.4; matVerde.emissiveIntensity = 0;
    mundo.setSuelo('seco');
    if (modo === 'quieto' || modo === 'ralenti') { ea.x = -40; ea.v = 0; }
    else if (modo === 'zona') { ea.x = -108; ea.v = 0; ea.marcha = 1; }
    else if (modo === 'marchas') { ea.x = eb.x = -108; ea.v = eb.v = 70 / 3.6; ea.marcha = 12; eb.marcha = 9; }
    else if (modo === 'aire') { ea.x = eb.x = -108; ea.v = 70 / 3.6; eb.v = 90 / 3.6; ea.marcha = 12; eb.marcha = 12; }
    else if (modo === 'humo') { ea.x = eb.x = -108; ea.v = eb.v = 50 / 3.6; ea.marcha = eb.marcha = 10; }
    else if (modo === 'subida') {
      ea.z = RAMPA.z + CARRIL; eb.z = RAMPA.z - CARRIL;
      ea.x = eb.x = RAMPA.x0 - 4; ea.v = eb.v = 45 / 3.6; ea.marcha = eb.marcha = 12;
    } else if (modo === 'inercia') { ea.x = eb.x = -108; ea.v = eb.v = 60 / 3.6; ea.marcha = eb.marcha = 11; }
    else if (modo === 'curva') { ea.s = INICIO_CURVA - 30; ea.v = 30 / 3.6; ea.marcha = 9; }
    ubicar(ea); ubicar(eb);
    calcularAncla();
    dibujarPanel();
  }

  function calcularAncla() {
    const ea = estado.A, eb = estado.B;
    if (B.grupo.visible) ancla.set((ea.x + eb.x) / 2 - 3, (ea.y + eb.y) / 2, (ea.z + eb.z) / 2);
    else ancla.set(ea.x - 3, ea.y, ea.z);
  }

  // Cambio de marcha: un ratito sin fuerza (el embrague está pisado)
  function cambiar(e, nuevaMarcha) {
    e.marcha = Math.max(1, Math.min(12, nuevaMarcha));
    e.cambiando = 0.7; e.cambios++;
  }

  // ---------- CADA CUADRO ----------
  let tHumo = 0;
  function actualizar(dt) {
    if (dt <= 0) { moverHumo(0); return; }
    t += dt;
    const ea = estado.A, eb = estado.B;
    [ea, eb].forEach(e => { e.inercia = false; e.frenando = false; if (e.cambiando > 0) e.cambiando -= dt; });

    if (modo === 'quieto' || modo === 'ralenti') {
      ea.rpm = RALENTI; ea.acel = 0;
      if (modo === 'ralenti') { ea.litros += dt * 1.5 / 3600 * 60; avisar('ralenti'); }
    }

    else if (modo === 'zona') {
      // acelera subiendo de marcha: cuando llega arriba de la zona verde, cambia
      if (ea.marcha < 10 || ea.v * 3.6 < 68) {
        ea.acel = 0.8;
        if (ea.cambiando <= 0) ea.v += dt * (ea.marcha < 4 ? 1.4 : 0.9);
        ea.rpm = rpmDe(ea.v * 3.6, ea.marcha);
        if (ea.rpm >= VERDE[1] && ea.marcha < 10) { cambiar(ea, ea.marcha + 1); avisar('cambia'); }
        else if (ea.cambiando <= 0) avisar('acelera');
      } else { ea.acel = 0.35; ea.rpm = rpmDe(ea.v * 3.6, ea.marcha); avisar('crucero'); if (t > 40) avisar('fin'); }
      ea.x += ea.v * dt;
      if (ea.x > 60) avisar('fin');
    }

    else if (modo === 'marchas' || modo === 'aire' || modo === 'humo') {
      [ea, eb].forEach(e => { e.acel = 0.45; e.rpm = rpmDe(e.v * 3.6, e.marcha); e.x += e.v * dt; });
      if (modo === 'humo') {
        tHumo += dt;
        if (tHumo > 0.12) { tHumo = 0; soltarHumo(B, 0x111827, 1.1); if (Math.random() < 0.25) soltarHumo(A, 0xe5e7eb, 0.5); }
        eb.acel = 0.75; // con el filtro sucio pide más
      }
      avisar('andan');
      if (t > 9) avisar('fin');
    }

    else if (modo === 'subida') {
      const g = 9.8 * Math.sin(ANG);
      const d2 = dt * 2; // la subida va al doble de velocidad para no aburrir
      [ea, eb].forEach((e, i) => {
        if (e.cambiando > 0) e.cambiando -= dt;
        const enCuesta = e.x > RAMPA.x0 && e.x < RAMPA.x1;
        const fuerza = e.cambiando > 0 ? 0 : 0.25 * (KMH_POR_MIL[12] / KMH_POR_MIL[e.marcha]);
        e.acel = e.cambiando > 0 ? 0 : 1;
        if (e.x < RAMPA.x1 + 6) {
          e.v += (Math.min(fuerza, 1.6) - (enCuesta ? g * 0.85 : 0) - 0.05) * d2;
          e.v = Math.max(1.2, Math.min(e.v, 50 / 3.6));
          e.rpm = rpmDe(e.v * 3.6, e.marcha);
          // cuando la aguja baja de la zona verde, reduce
          if (e.cambiando <= 0 && e.rpm < VERDE[0] && e.marcha > 1) cambiar(e, e.marcha - (i === 0 ? 2 : 1));
          e.x += Math.cos(enCuesta ? ANG : 0) * e.v * d2;
        } else { e.acel = 0.3; e.rpm = rpmDe(e.v * 3.6, e.marcha); }
      });
      if (ea.x >= RAMPA.x1 + 6 && eb.x >= RAMPA.x1 + 6) avisar('fin');
      else if (ea.x >= RAMPA.x1 + 6) avisar('llegaA');
      else if (ea.cambios + eb.cambios > 0) avisar('cambian');
      else avisar('suben');
      if (t > 60) avisar('fin');
    }

    else if (modo === 'inercia') {
      const XA_SUELTA = -92, XB_FRENA = -42;
      // A: suelta el acelerador temprano y rueda con la marcha puesta (consumo 0)
      if (ea.x < XA_SUELTA) { ea.acel = 0.45; }
      else if (ea.v > 0.05) { ea.inercia = true; ea.acel = 0; ea.v = Math.max(0, ea.v - 1.35 * dt); }
      // B: sigue acelerando y frena fuerte al final
      if (eb.x < XB_FRENA) { eb.acel = 0.55; }
      else if (eb.v > 0.05) { eb.frenando = true; eb.acel = 0; eb.v = Math.max(0, eb.v - 4.2 * dt); }
      [ea, eb].forEach(e => {
        if (e.x > X_SEMAFORO - 2.5) { e.v = 0; e.x = X_SEMAFORO - 2.5; }
        e.x += e.v * dt;
        e.rpm = e.v > 0.3 ? rpmDe(e.v * 3.6, e.marcha) : RALENTI;
        if (e.rpm < 800 && e.marcha > 6) e.marcha--;
      });
      if (ea.v === 0 && eb.v === 0) { matRojo.emissiveIntensity = 0.1; matVerde.emissiveIntensity = 1.4; avisar('fin'); }
      else if (eb.frenando) avisar('frenaB');
      else if (ea.inercia) avisar('ruedaA');
      else avisar('andan');
    }

    else if (modo === 'curva') {
      ea.acel = 0.3; ea.s += ea.v * dt;
      const p = puntoEnCarril(ea.s);
      ea.x = p.x; ea.z = p.z; ea.rumbo = p.rumbo;
      ea.rumboRem += (ea.v / 6.2) * Math.sin(ea.rumbo - ea.rumboRem) * dt;
      ea.rpm = rpmDe(ea.v * 3.6, ea.marcha);
      avisar(p.enCurva ? 'enCurva' : 'recta');
      if (ea.s > INICIO_CURVA + 70) avisar('fin');
    }

    // consumo y litros
    [ea, eb].forEach(e => {
      const pend = modo === 'subida' && e.x > RAMPA.x0 && e.x < RAMPA.x1 ? Math.sin(ANG) : 0;
      e.cons = calcularConsumo(e, pend);
      e.litros += e.cons / 100 * (e.v * dt / 1000);
    });

    girarRuedas(A, ea.v, dt);
    if (B.grupo.visible) girarRuedas(B, eb.v, dt);
    ubicar(ea); if (B.grupo.visible) ubicar(eb);
    calcularAncla();
    mundo.seguirSol(ancla.x, ancla.z);
    moverHumo(dt);

    if (estadoActual === 'fin') { terminado += dt; if (terminado > 4.5) reiniciar(); }
    dibujarPanel();
  }

  // ---------- PANEL ----------
  function anguloRpm(rpm) { return -135 + Math.min(rpm, RPM_MAX) / RPM_MAX * 270; }
  function dibujarPanel() {
    const e = estado.A;
    if (!e || !elAguja) return;
    elAguja.setAttribute('transform', `rotate(${anguloRpm(e.rpm).toFixed(1)} 70 72)`);
    elRpm.textContent = Math.round(e.rpm / 10) * 10;
    elMarcha.textContent = e.v < 0.3 && (modo === 'quieto' || modo === 'ralenti') ? 'N' : e.marcha;
    elKmh.textContent = Math.round(e.v * 3.6);
    if (modo === 'ralenti') { elCons.textContent = '1,5 L/hora'; elConsBar.setAttribute('width', 20); }
    else { elCons.textContent = e.cons < 0.5 ? '0 L/100 km' : Math.round(e.cons) + ' L/100 km'; elConsBar.setAttribute('width', Math.min(110, e.cons * 1.6)); }
    elConsBar.setAttribute('fill', e.cons < 0.5 ? '#22c55e' : e.cons > 45 ? '#ef4444' : '#f59e0b');
    elLitros.textContent = e.litros.toFixed(2).replace('.', ',') + ' L';
    let msg = '';
    if (e.rpm >= ROJA) msg = 'Aguja en ROJO: gasta muchísimo';
    else if (e.rpm >= VERDE[0] && e.rpm <= VERDE[1]) msg = 'Aguja en la zona VERDE';
    if (e.inercia) msg = 'Rueda por inercia: consumo CERO';
    if (e.cambiando > 0) msg = 'Cambiando de marcha';
    if (modo === 'ralenti') msg = 'Parado al ralentí: gasta igual';
    if (modo === 'quieto') msg = 'Motor al ralentí';
    elMsg.textContent = msg;
  }

  function anclaDe(nombre) {
    const ea = estado.A, eb = estado.B;
    if (nombre === 'A') return new THREE.Vector3(ea.x - 2.5, ea.y + 5.4, ea.z);
    if (nombre === 'B') return new THREE.Vector3(eb.x - 2.5, eb.y + 5.4, eb.z);
    if (nombre === 'semaforo') return new THREE.Vector3(X_SEMAFORO, 5.8, 4.2);
    if (nombre === 'cima') return new THREE.Vector3(RAMPA.x1 + 4, RAMPA.alto + 4, RAMPA.z);
    if (nombre === 'cielo') return new THREE.Vector3(ancla.x + 2, ancla.y + 9, ancla.z);
    return null;
  }

  function configurar(m) { modo = m || 'quieto'; reiniciar(); }
  configurar('quieto');

  return {
    configurar, reiniciar, actualizar, anclaDe,
    datos: () => estado,
    modo: () => modo,
    alCambiarEstado: fn => { alCambiarEstado = fn; },
    posicion: () => ancla,
    camiones: { A, B }
  };
}
