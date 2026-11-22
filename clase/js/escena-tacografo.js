// ==========================================
// ESCENA: EL TACÓGRAFO
// La ruta con el camión de Proyecto Apolo, la barra del día (conducción,
// pausas y descansos), el aparato con sus ranuras, el disco del analógico,
// las cuatro tarjetas y los vehículos que no necesitan tacógrafo.
// ==========================================
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { crearMundo, puntoEnCarril } from './mundo.js';
import { crearCamion } from './camion.js';

// ---------- AYUDAS PARA DIBUJAR ----------
function caja(largo, alto, ancho, radio, color, extra = {}) {
  const m = new THREE.Mesh(
    new RoundedBoxGeometry(largo, alto, ancho, 2, radio),
    new THREE.MeshStandardMaterial({ color, roughness: 0.55, ...extra })
  );
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

// Placa con texto (carteles de edificios y vehículos)
function placaTexto(texto, largo, alto, { fondo = '#ffffff', color = '#0f172a', tamano = 0.62 } = {}) {
  const lienzo = document.createElement('canvas');
  lienzo.width = 1024;
  lienzo.height = Math.max(64, Math.round(1024 * alto / largo));
  const ctx = lienzo.getContext('2d');
  const textura = new THREE.CanvasTexture(lienzo);
  textura.colorSpace = THREE.SRGBColorSpace;
  textura.anisotropy = 8;
  function dibujar() {
    ctx.clearRect(0, 0, lienzo.width, lienzo.height);
    if (fondo) {
      ctx.fillStyle = fondo;
      ctx.beginPath();
      ctx.roundRect(0, 0, lienzo.width, lienzo.height, lienzo.height * 0.18);
      ctx.fill();
    }
    let t = lienzo.height * tamano;
    ctx.font = `900 ${t}px Nunito, sans-serif`;
    while (ctx.measureText(texto).width > lienzo.width * 0.9 && t > 10) {
      t -= 3;
      ctx.font = `900 ${t}px Nunito, sans-serif`;
    }
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(texto, lienzo.width / 2, lienzo.height / 2 + t * 0.04);
    textura.needsUpdate = true;
  }
  dibujar();
  if (document.fonts) document.fonts.load('900 100px Nunito').then(dibujar).catch(() => {});
  const placa = new THREE.Mesh(
    new THREE.PlaneGeometry(largo, alto),
    new THREE.MeshStandardMaterial({ map: textura, transparent: true, roughness: 0.5, polygonOffset: true, polygonOffsetFactor: -2 })
  );
  return placa;
}

// Bandera de España (rojo, amarillo, rojo)
function texturaBandera() {
  const lienzo = document.createElement('canvas');
  lienzo.width = 300;
  lienzo.height = 200;
  const ctx = lienzo.getContext('2d');
  ctx.fillStyle = '#c60b1e';
  ctx.fillRect(0, 0, 300, 200);
  ctx.fillStyle = '#ffc400';
  ctx.fillRect(0, 50, 300, 100);
  const t = new THREE.CanvasTexture(lienzo);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
function bandera(largo, alto) {
  return new THREE.Mesh(
    new THREE.PlaneGeometry(largo, alto),
    new THREE.MeshStandardMaterial({ map: texturaBandera(), side: THREE.DoubleSide, roughness: 0.6, polygonOffset: true, polygonOffsetFactor: -2 })
  );
}

// Rueda simple para los vehículos chicos
function rueda(r = 0.4, a = 0.3) {
  const g = new THREE.CylinderGeometry(r, r, a, 20);
  g.rotateX(Math.PI / 2);
  const m = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 }));
  m.castShadow = true;
  return m;
}

// Persona de juguete
function crearPersona(colorRemera, colorPelo = 0x6b4423) {
  const g = new THREE.Group();
  const piel = new THREE.MeshStandardMaterial({ color: 0xfcd9b6, roughness: 0.6 });
  const pierna = caja(0.22, 0.75, 0.22, 0.06, 0x1e3a8a);
  [-0.14, 0.14].forEach(z => { const p = pierna.clone(); p.position.set(0, 0.38, z); g.add(p); });
  const cuerpo = caja(0.42, 0.75, 0.6, 0.12, colorRemera);
  cuerpo.position.y = 1.12;
  g.add(cuerpo);
  const cabeza = new THREE.Mesh(new THREE.SphereGeometry(0.27, 20, 20), piel);
  cabeza.position.y = 1.78;
  cabeza.castShadow = true;
  g.add(cabeza);
  const pelo = new THREE.Mesh(new THREE.SphereGeometry(0.28, 20, 20, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: colorPelo }));
  pelo.position.y = 1.82;
  g.add(pelo);
  return g;
}

// Edificio con cartel en el frente (el frente mira hacia la ruta, +Z)
function crearEdificio(texto, colorPared, colorTecho, fondoCartel) {
  const g = new THREE.Group();
  const pared = caja(7, 4, 5, 0.2, colorPared);
  pared.position.y = 2;
  g.add(pared);
  const techo = caja(7.4, 0.5, 5.4, 0.15, colorTecho);
  techo.position.y = 4.2;
  g.add(techo);
  const puerta = caja(2.6, 2.6, 0.1, 0.05, 0x94a3b8);
  puerta.position.set(-1.2, 1.3, 2.52);
  g.add(puerta);
  const ventana = caja(1.6, 1, 0.1, 0.05, 0xbae6fd);
  ventana.position.set(2, 2.4, 2.52);
  g.add(ventana);
  const cartel = placaTexto(texto, 6.4, 1.1, { fondo: fondoCartel, color: '#ffffff' });
  cartel.position.set(0, 4.95, 2.4);
  g.add(cartel);
  return g;
}

// Vehículos chicos y medianos, mirando hacia +X
function crearVehiculo(tipo, color, texto = '', colorTexto = '#ffffff') {
  const g = new THREE.Group();
  if (tipo === 'moto') {
    const cuerpo = caja(1.3, 0.35, 0.3, 0.1, color);
    cuerpo.position.set(0, 0.75, 0);
    g.add(cuerpo);
    const caja2 = caja(0.6, 0.55, 0.6, 0.06, 0xf8fafc);
    caja2.position.set(-0.5, 1.15, 0);
    g.add(caja2);
    [-0.6, 0.6].forEach(x => { const r = rueda(0.35, 0.15); r.position.set(x, 0.35, 0); g.add(r); });
    const piloto = crearPersona(0xf97316);
    piloto.scale.setScalar(0.8);
    piloto.position.set(0.05, 0.25, 0);
    g.add(piloto);
    return g;
  }
  if (tipo === 'tractor') {
    const cuerpo = caja(1.8, 0.9, 1.2, 0.12, color);
    cuerpo.position.set(0.4, 1.0, 0);
    g.add(cuerpo);
    const cabina = caja(1.0, 1.1, 1.1, 0.1, 0xbae6fd, { transparent: true, opacity: 0.85 });
    cabina.position.set(-0.1, 2.0, 0);
    g.add(cabina);
    [0.75, -0.75].forEach(z => {
      const grande = rueda(0.75, 0.4); grande.position.set(-0.4, 0.75, z); g.add(grande);
      const chica = rueda(0.42, 0.3); chica.position.set(1.1, 0.42, z); g.add(chica);
    });
    return g;
  }
  // Furgoneta / camión rígido (largo según el tipo)
  const largo = tipo === 'camion' ? 6 : 3.6;
  const alto = tipo === 'camion' ? 2.4 : 1.7;
  const cabina = caja(1.4, 1.6, 1.9, 0.18, color);
  cabina.position.set(largo / 2 - 0.4, 1.3, 0);
  g.add(cabina);
  const vidrio = caja(0.08, 0.6, 1.7, 0.03, 0xbae6fd);
  vidrio.position.set(largo / 2 + 0.31, 1.65, 0);
  g.add(vidrio);
  const carga = caja(largo - 1.5, alto, 2.0, 0.12, tipo === 'funebre' ? 0x111827 : tipo === 'blindado' ? 0x64748b : (texto && colorTexto === '#ffffff') ? color : 0xf8fafc);
  carga.position.set(-0.6, 0.55 + alto / 2, 0);
  g.add(carga);
  if (texto) {
    [1, -1].forEach(lado => {
      const p = placaTexto(texto, largo - 1.8, 0.7, { fondo: null, color: tipo === 'funebre' || tipo === 'blindado' ? '#ffffff' : colorTexto });
      p.position.set(-0.6, 0.55 + alto / 2, lado * 1.01);
      if (lado < 0) p.rotation.y = Math.PI;
      g.add(p);
    });
  }
  if (tipo === 'grua') {
    const brazo = caja(3.2, 0.25, 0.25, 0.05, 0xf59e0b);
    brazo.position.set(-0.6, 2.9, 0);
    brazo.rotation.z = 0.35;
    g.add(brazo);
    const base = caja(0.6, 0.6, 0.6, 0.05, 0xf59e0b);
    base.position.set(-1.6, 2.5, 0);
    g.add(base);
  }
  const ejes = tipo === 'camion' ? [largo / 2 - 0.5, -largo / 2 + 0.9, -largo / 2 + 1.9] : [largo / 2 - 0.5, -largo / 2 + 0.7];
  ejes.forEach(x => [0.95, -0.95].forEach(z => { const r = rueda(0.42, 0.3); r.position.set(x, 0.42, z); g.add(r); }));
  return g;
}


// Placa cuyo texto se puede cambiar (la pantalla del tacógrafo)
function placaCambiable(largo, alto, { fondo = '#0b1220', color = '#34f5a0' } = {}) {
  const lienzo = document.createElement('canvas');
  lienzo.width = 1024;
  lienzo.height = Math.round(1024 * alto / largo);
  const ctx = lienzo.getContext('2d');
  const textura = new THREE.CanvasTexture(lienzo);
  textura.colorSpace = THREE.SRGBColorSpace;
  let actual = '';
  function poner(texto) {
    actual = texto;
    ctx.fillStyle = fondo;
    ctx.fillRect(0, 0, lienzo.width, lienzo.height);
    const lineas = String(texto).split('\n');
    let t = lienzo.height * (lineas.length > 1 ? 0.34 : 0.5);
    ctx.font = `900 ${t}px Nunito, sans-serif`;
    while (lineas.some(l => ctx.measureText(l).width > lienzo.width * 0.92) && t > 10) {
      t -= 3;
      ctx.font = `900 ${t}px Nunito, sans-serif`;
    }
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    lineas.forEach((l, i) => ctx.fillText(l, lienzo.width / 2, lienzo.height / 2 + (i - (lineas.length - 1) / 2) * t * 1.1));
    textura.needsUpdate = true;
  }
  poner('');
  if (document.fonts) document.fonts.load('900 100px Nunito').then(() => poner(actual)).catch(() => {});
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(largo, alto), new THREE.MeshStandardMaterial({ map: textura, roughness: 0.4, emissive: 0x0a2a1a, polygonOffset: true, polygonOffsetFactor: -2 }));
  return { mesh, poner };
}

// El aparato: caja negra con pantalla, dos ranuras e impresora
function crearAparato() {
  const g = new THREE.Group();
  const cuerpo = caja(6, 2.2, 1, 0.15, 0x1f2937);
  cuerpo.position.y = 1.1;
  g.add(cuerpo);
  const pantalla = placaCambiable(3.2, 0.95);
  pantalla.mesh.position.set(-1.1, 1.55, 0.51);
  g.add(pantalla.mesh);
  [['RANURA 1 · CONDUCTOR', -1.9], ['RANURA 2 · SEGUNDO', 0.3]].forEach(([texto, x]) => {
    const r = caja(1.7, 0.12, 0.06, 0.03, 0x020617);
    r.position.set(x, 0.62, 0.52);
    g.add(r);
    const p = placaTexto(texto, 1.9, 0.26, { fondo: null, color: '#cbd5e1', tamano: 0.7 });
    p.position.set(x, 0.38, 0.53);
    g.add(p);
  });
  const impresora = caja(1.4, 0.9, 0.06, 0.05, 0x334155);
  impresora.position.set(2.1, 1.25, 0.52);
  g.add(impresora);
  const pi = placaTexto('IMPRESORA', 1.3, 0.26, { fondo: null, color: '#cbd5e1', tamano: 0.7 });
  pi.position.set(2.1, 0.6, 0.53);
  g.add(pi);
  const titulo = placaTexto('TACÓGRAFO DIGITAL', 6, 0.6, { fondo: '#1e293b', color: '#ffffff', tamano: 0.6 });
  titulo.position.set(0, 2.6, 0);
  g.add(titulo);
  return { grupo: g, pantalla };
}

// El disco del analógico: velocidad afuera, actividades en el medio, kilómetros adentro
function crearDisco() {
  const lienzo = document.createElement('canvas');
  lienzo.width = lienzo.height = 1024;
  const ctx = lienzo.getContext('2d');
  const c = 512;
  const anillos = [
    [500, '#f8fafc'], [420, '#dbeafe'], [330, '#ffffff'], [250, '#fef3c7'], [170, '#ffffff']
  ];
  anillos.forEach(([r, col]) => { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(c, c, r, 0, Math.PI * 2); ctx.fill(); });
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 3;
  [500, 420, 330, 250, 170].forEach(r => { ctx.beginPath(); ctx.arc(c, c, r, 0, Math.PI * 2); ctx.stroke(); });
  for (let h = 0; h < 24; h++) {
    const a = h / 24 * Math.PI * 2 - Math.PI / 2;
    ctx.beginPath(); ctx.moveTo(c + Math.cos(a) * 420, c + Math.sin(a) * 420); ctx.lineTo(c + Math.cos(a) * 500, c + Math.sin(a) * 500); ctx.stroke();
  }
  // trazos de ejemplo
  ctx.strokeStyle = '#1e3a8a'; ctx.lineWidth = 6; ctx.beginPath();
  for (let i = 0; i <= 200; i++) { const a = i / 200 * Math.PI * 1.2 - Math.PI / 2; const r = 430 + 50 * Math.abs(Math.sin(i * 0.4)); i ? ctx.lineTo(c + Math.cos(a) * r, c + Math.sin(a) * r) : ctx.moveTo(c + Math.cos(a) * r, c + Math.sin(a) * r); }
  ctx.stroke();
  ctx.lineWidth = 26; ctx.strokeStyle = '#1e3a8a';
  ctx.beginPath(); ctx.arc(c, c, 300, -Math.PI / 2, Math.PI * 0.2); ctx.stroke();
  ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(c, c, 300, Math.PI * 0.2, Math.PI * 0.7); ctx.stroke();
  ctx.lineWidth = 5; ctx.beginPath();
  for (let i = 0; i <= 30; i++) { const a = i / 30 * Math.PI * 1.2 - Math.PI / 2; const r = i % 2 ? 190 : 230; i ? ctx.lineTo(c + Math.cos(a) * r, c + Math.sin(a) * r) : ctx.moveTo(c + Math.cos(a) * r, c + Math.sin(a) * r); }
  ctx.stroke();
  ctx.fillStyle = '#0f172a'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.font = '900 34px Nunito, sans-serif';
  ctx.fillText('VELOCIDAD', c, c - 462);
  ctx.fillText('ACTIVIDADES', c, c - 375);
  ctx.fillText('KILÓMETROS', c, c - 290);
  ctx.font = '900 30px Nunito, sans-serif';
  ctx.fillText('NOMBRE · MATRÍCULA', c, c - 30);
  ctx.fillText('FECHA · LUGAR · KM', c, c + 20);
  ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(c, c, 40, 0, Math.PI * 2); ctx.fill();
  const t = new THREE.CanvasTexture(lienzo);
  t.colorSpace = THREE.SRGBColorSpace;
  const disco = new THREE.Mesh(new THREE.CircleGeometry(2.4, 64), new THREE.MeshStandardMaterial({ map: t, roughness: 0.5, side: THREE.DoubleSide }));
  const g = new THREE.Group();
  disco.position.y = 2.9;
  g.add(disco);
  const pie = caja(0.3, 0.6, 0.3, 0.05, 0x94a3b8);
  pie.position.y = 0.3;
  g.add(pie);
  return g;
}

// Tarjeta de tacógrafo (color de fondo según el tipo)
function crearTarjeta(titulo, fondo, colorTexto) {
  const g = new THREE.Group();
  const base = caja(1.9, 1.2, 0.06, 0.08, new THREE.Color(fondo).getHex());
  g.add(base);
  const chip = caja(0.32, 0.26, 0.02, 0.03, 0xd4a017);
  chip.position.set(-0.55, 0.05, 0.04);
  g.add(chip);
  const p = placaTexto(titulo, 1.7, 0.36, { fondo: null, color: colorTexto, tamano: 0.62 });
  p.position.set(0.1, 0.36, 0.04);
  g.add(p);
  const s = placaTexto('TARJETA DE TACÓGRAFO', 1.7, 0.2, { fondo: null, color: colorTexto, tamano: 0.6 });
  s.position.set(0.1, -0.38, 0.04);
  g.add(s);
  return g;
}

export function crearEscenaTacografo(escena, camara) {
  const mundo = crearMundo(escena);
  mundo.seguirSol(-20, 0);

  // ---------- OBJETOS ----------
  const objetos = {};
  function registrar(nombre, obj, x, z, rotY = 0, y = 0) {
    obj.position.set(x, y, z);
    obj.rotation.y = rotY;
    obj.userData.base = obj.position.clone();
    obj.userData.objetivo = obj.position.clone();
    obj.userData.escala = 0;
    obj.userData.escalaObjetivo = 0;
    obj.userData.escalaNormal = obj.scale.x || 1;
    obj.scale.setScalar(0.0001);
    obj.visible = false;
    escena.add(obj);
    objetos[nombre] = obj;
    return obj;
  }

  // Edificios (del otro lado de la ruta)
  registrar('empresa', crearEdificio('TRANSPORTES APOLO · EMPRESA', 0xe0f2fe, 0x0284c7, '#0284c7'), -58, -14);
  registrar('hotel', crearEdificio('HOTEL · ÁREA DE DESCANSO', 0xfef3c7, 0xb45309, '#b45309'), -34, -14);
  registrar('taller', crearEdificio('TALLER AUTORIZADO DE TACÓGRAFOS', 0xf1f5f9, 0x475569, '#475569'), -10, -14);

  // El camión de Proyecto Apolo, con bandera española
  const camion = crearCamion();
  [1, -1].forEach(lado => {
    const b = bandera(0.62, 0.42);
    b.position.set(1.75, 1.3, lado * 1.112);
    if (lado < 0) b.rotation.y = Math.PI;
    camion.tractora.add(b);
  });
  const p0 = puntoEnCarril(20);
  registrar('camion', camion.grupo, p0.x, p0.z, 0, 0.02);

  // Personas
  registrar('vos', crearPersona(0xa78bfa), -36, 4.6, Math.PI / 2);
  registrar('segundo', crearPersona(0xf97316, 0x111827), -34.6, 4.6, Math.PI / 2);
  registrar('jefe', crearPersona(0x0284c7, 0x111827), -55, -9.5);
  registrar('guardia', crearPersona(0x166534, 0x111827), -22, 4.6, -Math.PI / 2);
  registrar('mecanico', crearPersona(0x475569, 0x111827), -7, -9.5);

  // El aparato, el disco y las tarjetas (en el pasto, cerca de la ruta)
  const aparato = crearAparato();
  registrar('aparato', aparato.grupo, -14, 10);
  registrar('disco', crearDisco(), -21, 10);
  const RANURA = { 1: new THREE.Vector3(-15.9, 0.7, 10.6), 2: new THREE.Vector3(-13.7, 0.7, 10.6) };
  const TARJETAS = {
    tarjetaConductor: ['CONDUCTOR', '#f8fafc', '#0f172a', -8.6],
    tarjetaEmpresa: ['EMPRESA', '#facc15', '#0f172a', -6.4],
    tarjetaControl: ['CONTROL', '#2563eb', '#ffffff', -4.2],
    tarjetaTaller: ['TALLER', '#dc2626', '#ffffff', -2.0]
  };
  Object.entries(TARJETAS).forEach(([n, [t, f, c, x]]) => registrar(n, crearTarjeta(t, f, c), x, 10.4, 0, 1.4));

  // Los que no necesitan tacógrafo
  registrar('furgoneta', crearVehiculo('furgoneta', 0x0ea5e9, 'HASTA 3.500 kg'), 8, 8);
  registrar('tractor', crearVehiculo('tractor', 0x16a34a), 16, 8);
  registrar('militar', crearVehiculo('camion', 0x4d7c0f, 'EJÉRCITO'), 24, 8);
  registrar('leche', crearVehiculo('camion', 0x0369a1, 'RECOGIDA DE LECHE'), 8, 13);
  registrar('grua', crearVehiculo('grua', 0xf59e0b, 'AVERÍAS'), 16, 13);
  registrar('autoescuela', crearVehiculo('camion', 0x7c3aed, 'AUTOESCUELA'), 24, 13);

  // ---------- LA BARRA DEL DÍA ----------
  const COLORES = { c: '#2563eb', p: '#f59e0b', d: '#16a34a', t: '#7c3aed', x: '#64748b', r: '#dc2626' };
  const LARGO_BARRA = 30;
  const barra = new THREE.Group();
  const tituloBarra = placaCambiable(12, 1.1, { fondo: '#0f172a', color: '#ffffff' });
  tituloBarra.mesh.material.emissive.setHex(0x000000);
  tituloBarra.mesh.position.set(0, 1.5, 0);
  barra.add(tituloBarra.mesh);
  const tramos = new THREE.Group();
  barra.add(tramos);
  registrar('dia', barra, -34, -4, 0, 10.5);
  let piezas = [];
  // bloques: [[tipo, horas, texto], ...]  tipos: c conducción, p pausa, d descanso, t otro trabajo, x disponibilidad, r falta/exceso
  function dia(bloques, titulo = 'UN DÍA DE TRABAJO', total = null) {
    while (tramos.children.length) {
      const h = tramos.children.pop();
      h.geometry.dispose(); h.material.map?.dispose(); h.material.dispose();
    }
    piezas = [];
    tituloBarra.poner(titulo);
    const suma = total || bloques.reduce((a, b) => a + b[1], 0);
    let x = -LARGO_BARRA / 2;
    bloques.forEach(([t, h, texto]) => {
      const w = LARGO_BARRA * h / suma;
      const p = placaTexto(texto || '', Math.max(0.05, w - 0.08), 1.3, { fondo: COLORES[t], color: '#ffffff', tamano: 0.36 });
      p.position.set(x + w / 2, 0, 0);
      p.material.opacity = 0.12;
      tramos.add(p);
      piezas.push(p);
      x += w;
    });
  }
  function diaHasta(n) {
    piezas.forEach((p, i) => { p.material.opacity = i < n ? 1 : 0.12; });
  }

  // ---------- ETIQUETAS (cartelitos sobre las cosas) ----------
  const capa = document.getElementById('etiquetas');
  const etiquetas = {};
  function crearEtiqueta(nombre, ancla) {
    const el = document.createElement('div');
    el.className = 'etiqueta3d';
    capa.appendChild(el);
    etiquetas[nombre] = { el, ancla, visible: false };
  }
  const arriba = (nombre, alto) => () => objetos[nombre].position.clone().add(new THREE.Vector3(0, alto, 0));
  ['vos', 'segundo', 'jefe', 'guardia', 'mecanico'].forEach(n => crearEtiqueta(n, arriba(n, 2.6)));
  crearEtiqueta('camion', () => objetos.camion.position.clone().add(new THREE.Vector3(1.5, 5.4, 0)));
  ['empresa', 'hotel', 'taller'].forEach(n => crearEtiqueta(n, arriba(n, 6.6)));
  crearEtiqueta('aparato', arriba('aparato', 3.6));
  crearEtiqueta('disco', arriba('disco', 5.8));
  Object.keys(TARJETAS).forEach(n => crearEtiqueta(n, arriba(n, 1.2)));
  ['furgoneta', 'tractor', 'leche', 'grua'].forEach(n => crearEtiqueta(n, arriba(n, 3.4)));
  ['militar', 'autoescuela'].forEach(n => crearEtiqueta(n, arriba(n, 4.4)));
  crearEtiqueta('dia', () => objetos.dia.position.clone().add(new THREE.Vector3(0, 3, 0)));

  // ---------- LO QUE SE PUEDE PEDIR DESDE LOS PASOS ----------
  function mostrar(nombre, siNo = true) {
    const o = objetos[nombre];
    o.userData.escalaObjetivo = siNo ? o.userData.escalaNormal : 0;
    if (siNo) o.visible = true;
  }
  function yaVisible(nombre) {
    const o = objetos[nombre];
    o.visible = true;
    o.userData.escala = o.userData.escalaNormal;
    o.userData.escalaObjetivo = o.userData.escalaNormal;
    o.scale.setScalar(o.userData.escalaNormal);
  }
  function etiqueta(nombre, html = null, tipo = '') {
    const e = etiquetas[nombre];
    if (html === null) { e.visible = false; return; }
    if (tipo === 'globo') {
      Object.entries(etiquetas).forEach(([otro, o]) => {
        if (otro !== nombre && o.el.classList.contains('globo')) o.visible = false;
      });
    }
    e.el.innerHTML = `<div class="etq-in">${html}</div>`;
    e.el.className = 'etiqueta3d ' + tipo;
    void e.el.offsetWidth;
    e.el.classList.add('aparece');
    e.visible = true;
  }
  // Mueve el camión a un punto de la ruta (s = metros recorridos, hasta 70 es recta)
  function camionA(s, inmediato = false) {
    const p = puntoEnCarril(Math.min(s, 68));
    const o = objetos.camion;
    o.userData.objetivo.set(p.x, 0.02, p.z);
    if (inmediato) o.position.copy(o.userData.objetivo);
  }
  // Mete una tarjeta en una ranura (1 o 2), o la devuelve a su lugar (ranura = 0)
  function insertar(nombre, ranura) {
    const o = objetos[nombre];
    if (ranura) o.userData.objetivo.copy(RANURA[ranura]);
    else o.userData.objetivo.copy(o.userData.base);
  }
  function pantalla(texto) { aparato.pantalla.poner(texto); }
  function tipo() {}
  function limpiar() {
    Object.values(objetos).forEach(o => {
      o.userData.escala = 0;
      o.userData.escalaObjetivo = 0;
      o.userData.objetivo.copy(o.userData.base);
      o.position.copy(o.userData.base);
      o.scale.setScalar(0.0001);
      o.visible = false;
    });
    Object.keys(etiquetas).forEach(n => etiqueta(n, null));
    pantalla('');
    dia([]);
  }

  // ---------- CADA CUADRO ----------
  const vPantalla = new THREE.Vector3();
  function actualizar(dt) {
    const suave = 1 - Math.exp(-dt * 4);
    const suaveCamion = 1 - Math.exp(-dt * 0.9);
    Object.entries(objetos).forEach(([nombre, o]) => {
      o.userData.escala += (o.userData.escalaObjetivo - o.userData.escala) * suave;
      o.scale.setScalar(Math.max(0.0001, o.userData.escala));
      o.position.lerp(o.userData.objetivo, nombre === 'camion' ? suaveCamion : suave);
      if (o.userData.escalaObjetivo === 0 && o.userData.escala < 0.01) o.visible = false;
    });
    mundo.moverNubes(dt);
  }
  function ubicarEtiquetas() {
    Object.values(etiquetas).forEach(e => {
      if (!e.visible) { e.el.style.opacity = 0; return; }
      vPantalla.copy(e.ancla()).project(camara);
      e.el.style.opacity = vPantalla.z > 1 ? 0 : 1;
      e.el.style.left = ((vPantalla.x + 1) / 2 * window.innerWidth) + 'px';
      e.el.style.top = ((1 - vPantalla.y) / 2 * window.innerHeight) + 'px';
    });
  }

  return { mostrar, yaVisible, etiqueta, camionA, insertar, pantalla, dia, diaHasta, tipo, limpiar, actualizar, ubicarEtiquetas };
}
