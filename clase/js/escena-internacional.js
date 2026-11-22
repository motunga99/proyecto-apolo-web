// ==========================================
// ESCENA: PAPELES INTERNACIONALES (Mercancías)
// Una ruta recta: Marruecos ← mar → Algeciras · Madrid · frontera con Francia ·
// Lyon · aduana de Suiza. El camión de Proyecto Apolo va de un lado a otro.
// ==========================================
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { crearCamion } from './camion.js';

const CARRIL = 1.6;      // el camión va por el carril derecho (z positivo)
const ANCHO_RUTA = 7;

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
  return new THREE.Mesh(
    new THREE.PlaneGeometry(largo, alto),
    new THREE.MeshStandardMaterial({ map: textura, transparent: true, roughness: 0.5, polygonOffset: true, polygonOffsetFactor: -2, side: THREE.DoubleSide })
  );
}

// Banderas dibujadas en un lienzo
function texturaBandera(pais) {
  const c = document.createElement('canvas');
  c.width = 300; c.height = 200;
  const x = c.getContext('2d');
  if (pais === 'es') {
    x.fillStyle = '#c60b1e'; x.fillRect(0, 0, 300, 200);
    x.fillStyle = '#ffc400'; x.fillRect(0, 50, 300, 100);
  } else if (pais === 'fr') {
    ['#002395', '#ffffff', '#ed2939'].forEach((col, i) => { x.fillStyle = col; x.fillRect(i * 100, 0, 100, 200); });
  } else if (pais === 'ch') {
    x.fillStyle = '#da291c'; x.fillRect(0, 0, 300, 200);
    x.fillStyle = '#ffffff'; x.fillRect(130, 45, 40, 110); x.fillRect(95, 80, 110, 40);
  } else if (pais === 'ma') {
    x.fillStyle = '#c1272d'; x.fillRect(0, 0, 300, 200);
    x.strokeStyle = '#006233'; x.lineWidth = 9;
    x.beginPath();
    for (let i = 0; i <= 5; i++) {
      const a = -Math.PI / 2 + i * (4 * Math.PI / 5);
      const px = 150 + 52 * Math.cos(a), py = 104 + 52 * Math.sin(a);
      if (i === 0) x.moveTo(px, py); else x.lineTo(px, py);
    }
    x.stroke();
  } else if (pais === 'ue') {
    x.fillStyle = '#003399'; x.fillRect(0, 0, 300, 200);
    x.fillStyle = '#ffcc00';
    for (let i = 0; i < 12; i++) {
      const a = i * Math.PI / 6;
      x.beginPath(); x.arc(150 + 60 * Math.cos(a), 100 + 60 * Math.sin(a), 9, 0, Math.PI * 2); x.fill();
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
function bandera(pais, largo = 1.5, alto = 1) {
  return new THREE.Mesh(
    new THREE.PlaneGeometry(largo, alto),
    new THREE.MeshStandardMaterial({ map: texturaBandera(pais), side: THREE.DoubleSide, roughness: 0.6, polygonOffset: true, polygonOffsetFactor: -2 })
  );
}

// Cartel de país al costado de la ruta: mástil + bandera + nombre
function crearCartelPais(nombre, pais, conUE = false) {
  const g = new THREE.Group();
  const matPoste = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.4, roughness: 0.4 });
  const poste = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 4.4, 10), matPoste);
  poste.position.y = 2.2;
  poste.castShadow = true;
  g.add(poste);
  const b = bandera(pais, 1.8, 1.2);
  b.position.set(0, 3.6, 0.15);
  g.add(b);
  const nombrePlaca = placaTexto(nombre, 3.6, 0.8, { fondo: '#0f172a', color: '#ffffff' });
  nombrePlaca.position.set(0, 2.4, 0.15);
  g.add(nombrePlaca);
  if (conUE) {
    const ue = bandera('ue', 1.1, 0.75);
    ue.position.set(0, 4.65, 0.15);
    g.add(ue);
  }
  return g;
}

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

function crearArbol(i) {
  const g = new THREE.Group();
  const tronco = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.22, 1.1, 12), new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9 }));
  tronco.position.y = 0.55;
  tronco.castShadow = true;
  g.add(tronco);
  const matHojas = new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.75 });
  const copa = i % 2 ? new THREE.Mesh(new THREE.DodecahedronGeometry(0.95, 1), matHojas) : new THREE.Mesh(new THREE.SphereGeometry(0.78, 16, 16), matHojas);
  if (!(i % 2)) copa.scale.set(0.9, 1.35, 0.9);
  copa.position.y = 1.7;
  copa.castShadow = true;
  g.add(copa);
  return g;
}

// Barrera de aduana (caseta + brazo rojo y blanco que cruza la ruta)
function crearBarrera() {
  const g = new THREE.Group();
  const caseta = caja(2, 2.6, 2, 0.15, 0xf1f5f9);
  caseta.position.set(0, 1.3, -ANCHO_RUTA / 2 - 1.4);
  g.add(caseta);
  const techo = caja(2.4, 0.3, 2.4, 0.1, 0x1e3a8a);
  techo.position.set(0, 2.75, -ANCHO_RUTA / 2 - 1.4);
  g.add(techo);
  const brazo = new THREE.Group();
  const largo = ANCHO_RUTA + 0.6;
  for (let i = 0; i < 8; i++) {
    const tramo = caja(largo / 8, 0.22, 0.22, 0.04, i % 2 ? 0xffffff : 0xdc2626);
    tramo.position.set(0, 0, (i + 0.5) * largo / 8);
    brazo.add(tramo);
  }
  brazo.position.set(0, 1.1, -ANCHO_RUTA / 2 - 0.3);
  g.add(brazo);
  return g;
}

// El barco (ferry) que cruza el estrecho
function crearFerry() {
  const g = new THREE.Group();
  const casco = caja(14, 2, 5, 0.4, 0x1e3a8a);
  casco.position.y = 0.6;
  g.add(casco);
  const cubierta = caja(13, 0.3, 4.6, 0.1, 0xe2e8f0);
  cubierta.position.y = 1.75;
  g.add(cubierta);
  // El puente de mando va a un costado, para que el camión pueda subir y bajar por las puntas
  const puente = caja(8, 2.2, 0.9, 0.2, 0xffffff);
  puente.position.set(0, 3, -1.95);
  g.add(puente);
  const chimenea = caja(1, 1.4, 0.8, 0.1, 0xdc2626);
  chimenea.position.set(-2.5, 4.7, -1.95);
  g.add(chimenea);
  const nombre = placaTexto('FERRY ALGECIRAS - TÁNGER', 9, 0.9, { fondo: null, color: '#ffffff' });
  nombre.position.set(1, 0.7, 2.52);
  g.add(nombre);
  return g;
}

// Tren de mercancías: locomotora y dos vagones. Uno es "canguro": tiene una parte baja
// (la bolsa) donde se meten las ruedas del semirremolque. Mira hacia +X.
function crearTren() {
  const g = new THREE.Group();
  const loco = caja(6, 3, 2.6, 0.3, 0xdc2626);
  loco.position.set(9, 2.1, 0);
  g.add(loco);
  const cabina = caja(2, 1.2, 2.4, 0.2, 0xbae6fd);
  cabina.position.set(10.6, 4.1, 0);
  g.add(cabina);
  const nombre = placaTexto('RENFE MERCANCÍAS', 4.6, 0.6, { fondo: null, color: '#ffffff' });
  nombre.position.set(8.6, 2.2, 1.32);
  g.add(nombre);
  const matRueda = new THREE.MeshStandardMaterial({ color: 0x1e293b });
  const ruedaTren = (x) => [-1.1, 1.1].forEach(z => {
    const r = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.25, 16), matRueda);
    r.rotation.x = Math.PI / 2;
    r.position.set(x, 0.55, z);
    g.add(r);
  });
  [7, 11].forEach(ruedaTren);
  // Vagón canguro con su "bolsa"
  const bordeA = caja(3, 0.6, 2.6, 0.1, 0x475569); bordeA.position.set(4, 1.2, 0); g.add(bordeA);
  const bordeB = caja(3, 0.6, 2.6, 0.1, 0x475569); bordeB.position.set(-9, 1.2, 0); g.add(bordeB);
  const bolsa = caja(10, 0.35, 2.6, 0.1, 0x334155); bolsa.position.set(-2.5, 0.55, 0); g.add(bolsa);
  [3.5, -9].forEach(ruedaTren);
  // El semirremolque de Proyecto Apolo arriba del vagón, con las ruedas en la bolsa
  const remolque = caja(11, 3, 2.4, 0.2, 0xf8fafc);
  remolque.position.set(-3.4, 2.65, 0);
  g.add(remolque);
  const marca = placaTexto('Proyecto Apolo', 6, 1, { fondo: null, color: '#4f46e5' });
  marca.position.set(-3.4, 2.7, 1.22);
  g.add(marca);
  [-6.6, -7.6].forEach(x => [-0.95, 0.95].forEach(z => {
    const r = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.3, 16), matRueda);
    r.rotation.x = Math.PI / 2;
    r.position.set(x, 1.0, z);
    g.add(r);
  }));
  return g;
}
function crearVias(largo) {
  const g = new THREE.Group();
  const matRiel = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.6, roughness: 0.3 });
  const matDurmiente = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9 });
  [-0.75, 0.75].forEach(z => {
    const riel = new THREE.Mesh(new THREE.BoxGeometry(largo, 0.12, 0.12), matRiel);
    riel.position.set(0, 0.2, z);
    g.add(riel);
  });
  for (let x = -largo / 2; x < largo / 2; x += 1.2) {
    const d = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.1, 2.3), matDurmiente);
    d.position.set(x, 0.1, 0);
    g.add(d);
  }
  return g;
}

// Tarjeta flotante (papeles que aparecen sobre el camión)
function tarjeta(titulo, subtitulo, fondo) {
  const g = new THREE.Group();
  const p = placaTexto(titulo, 3.4, 1.1, { fondo, color: '#ffffff', tamano: 0.55 });
  g.add(p);
  const sub = placaTexto(subtitulo, 3.4, 0.45, { fondo: '#0f172a', color: '#e2e8f0', tamano: 0.6 });
  sub.position.y = -0.8;
  g.add(sub);
  return g;
}

export function crearEscenaInternacional(escena, camara) {
  // ---------- CIELO Y LUCES ----------
  escena.background = new THREE.Color(0x7dd3fc);
  escena.fog = new THREE.Fog(0x7dd3fc, 120, 320);
  escena.add(new THREE.HemisphereLight(0xffffff, 0x10b981, 2.4));
  escena.add(new THREE.AmbientLight(0xffffff, 1.1));
  const sol = new THREE.DirectionalLight(0xfffbeb, 3.3);
  sol.castShadow = true;
  sol.shadow.mapSize.set(2048, 2048);
  sol.shadow.camera.near = 2;
  sol.shadow.camera.far = 90;
  const d = 26;
  Object.assign(sol.shadow.camera, { left: -d, right: d, top: d, bottom: -d });
  sol.shadow.bias = -0.0005;
  escena.add(sol);
  escena.add(sol.target);
  function seguirSol(x) {
    sol.position.set(x + 12, 26, 16);
    sol.target.position.set(x, 0, 0);
  }
  seguirSol(-55);

  // ---------- SUELO, MAR Y RUTA ----------
  const suelo = new THREE.Mesh(new THREE.PlaneGeometry(420, 260), new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.9 }));
  suelo.rotation.x = -Math.PI / 2;
  suelo.position.set(-20, -0.02, -40);
  suelo.receiveShadow = true;
  escena.add(suelo);

  const mar = new THREE.Mesh(new THREE.PlaneGeometry(28, 260), new THREE.MeshStandardMaterial({ color: 0x0ea5e9, roughness: 0.25, metalness: 0.1 }));
  mar.rotation.x = -Math.PI / 2;
  mar.position.set(-97, 0.03, -40);
  escena.add(mar);
  const estrecho = placaTexto('ESTRECHO DE GIBRALTAR', 18, 1.6, { fondo: null, color: '#e0f2fe' });
  estrecho.rotation.x = -Math.PI / 2;
  estrecho.position.set(-97, 0.06, -14);
  escena.add(estrecho);

  const matAsfalto = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.85 });
  const matBorde = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.6 });
  const matLinea = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.5 });
  function tramoRuta(desde, hasta) {
    const largo = hasta - desde, medio = (desde + hasta) / 2;
    const r = new THREE.Mesh(new THREE.BoxGeometry(largo, 0.08, ANCHO_RUTA), matAsfalto);
    r.position.set(medio, 0, 0);
    r.receiveShadow = true;
    escena.add(r);
    [-1, 1].forEach(lado => {
      const b = new THREE.Mesh(new THREE.BoxGeometry(largo, 0.01, 0.18), matBorde);
      b.position.set(medio, 0.045, lado * (ANCHO_RUTA / 2 - 0.25));
      escena.add(b);
    });
    for (let x = desde + 1; x < hasta - 1; x += 3.6) {
      const l = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.01, 0.18), matLinea);
      l.position.set(x + 0.9, 0.048, 0);
      escena.add(l);
    }
  }
  tramoRuta(-150, -111);   // Marruecos
  tramoRuta(-83, 110);     // España, Francia y Suiza

  // Montañas (los Pirineos cerca de la frontera, los Alpes en Suiza)
  const matMonte = new THREE.MeshStandardMaterial({ color: 0x34d399, roughness: 0.9, flatShading: true });
  const matMonteOscuro = new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.9, flatShading: true });
  const matNieve = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.6, flatShading: true });
  [
    [-30, -34, 12, 11, matMonte], [-14, -40, 14, 13, matMonte], [-22, -26, 7, 6, matMonteOscuro],
    [70, -36, 14, 16, matMonte], [88, -42, 16, 19, matMonte], [78, -26, 8, 8, matMonteOscuro],
    [-130, -40, 12, 9, matMonteOscuro], [-60, -55, 14, 10, matMonte], [30, -60, 16, 11, matMonte]
  ].forEach(([x, z, r, h, mat], i) => {
    const m = new THREE.Mesh(new THREE.ConeGeometry(r, h, 7), mat);
    m.position.set(x, h / 2 - 0.2, z);
    m.rotation.y = i * 0.9;
    escena.add(m);
    if (x > 60) {
      const pico = new THREE.Mesh(new THREE.ConeGeometry(r * 0.35, h * 0.35, 7), matNieve);
      pico.position.set(x, h - h * 0.175 - 0.2, z);
      pico.rotation.y = i * 0.9;
      escena.add(pico);
    }
  });

  // Árboles
  [-140, -125, -70, -48, -36, -8, 6, 24, 40, 48, 68, 84, 100].forEach((x, i) => {
    const a = crearArbol(i);
    a.position.set(x, 0, i % 2 ? -7 : -8.5);
    escena.add(a);
  });

  // Carteles de país (siempre visibles, mirando a la cámara)
  const carteles = [
    ['MARRUECOS', 'ma', false, -114],
    ['ESPAÑA', 'es', true, -80],
    ['FRANCIA', 'fr', true, -17],
    ['SUIZA', 'ch', false, 58]
  ];
  carteles.forEach(([nombre, pais, ue, x]) => {
    const c = crearCartelPais(nombre, pais, ue);
    c.position.set(x, 0, 5.2);
    escena.add(c);
  });
  // Pórtico sobre la ruta en la frontera España-Francia
  const matPortico = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.5 });
  [-1, 1].forEach(lado => {
    const poste = new THREE.Mesh(new THREE.BoxGeometry(0.35, 6.2, 0.35), matPortico);
    poste.position.set(-20, 3.1, lado * (ANCHO_RUTA / 2 + 0.6));
    poste.castShadow = true;
    escena.add(poste);
  });
  const viga = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.9, ANCHO_RUTA + 1.6), matPortico);
  viga.position.set(-20, 6.1, 0);
  escena.add(viga);
  const cartelFrontera = placaTexto('ESPAÑA  →  FRANCIA', 6.4, 1.3, { fondo: '#1d4ed8', color: '#ffffff' });
  cartelFrontera.position.set(-20, 7.75, 0);
  escena.add(cartelFrontera);
  [['es', -24.2], ['fr', -15.8]].forEach(([p, x]) => {
    const b = bandera(p, 1.8, 1.2);
    b.position.set(x, 7.75, 0);
    escena.add(b);
  });
  // Cartel de entrada a Lyon y de salida hacia Marsella
  const cartelLyon = crearCartelPais('LYON', 'fr', true);
  cartelLyon.position.set(4, 0, 5.2);
  escena.add(cartelLyon);
  const cartelMarsella = crearCartelPais('MARSELLA →', 'fr', false);
  cartelMarsella.position.set(38, 0, 5.2);
  escena.add(cartelMarsella);

  // Línea de frontera España-Francia: una caseta vieja y vacía, sin barrera
  const casetaVieja = caja(2.2, 2.4, 2.2, 0.15, 0xcbd5e1);
  casetaVieja.position.set(-20, 1.2, -6);
  escena.add(casetaVieja);
  const casetaCartel = placaTexto('ANTIGUA ADUANA', 2.6, 0.5, { fondo: '#64748b', color: '#ffffff' });
  casetaCartel.position.set(-20, 2.75, -4.85);
  escena.add(casetaCartel);
  [-1, 1].forEach(lado => {
    const raya = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.012, ANCHO_RUTA), new THREE.MeshStandardMaterial({ color: 0xffffff }));
    raya.position.set(-20 + lado * 0.0, 0.05, 0);
    escena.add(raya);
  });

  // ---------- OBJETOS QUE SE MUESTRAN DESDE LOS PASOS ----------
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

  registrar('apolo', crearEdificio('PROYECTO APOLO · MADRID', 0xe0e7ff, 0x4f46e5, '#4f46e5'), -55, -13);
  registrar('remitente', crearEdificio('BODEGA SOL · MADRID', 0xfce7f3, 0xbe185d, '#be185d'), -40, -13);
  registrar('puerto', crearEdificio('PUERTO DE ALGECIRAS', 0xe0f2fe, 0x0369a1, '#0369a1'), -76, -13);
  registrar('ferry', crearFerry(), -104, CARRIL, 0, 0.1);
  registrar('aduanaMA', crearEdificio('ADUANA · MARRUECOS', 0xfee2e2, 0xb91c1c, '#b91c1c'), -128, -13);
  registrar('cliente', crearEdificio('CLIENTE · LYON', 0xdbeafe, 0x1d4ed8, '#1d4ed8'), 14, -13);
  registrar('quesos', crearEdificio('QUESOS DUPONT · LYON', 0xfef3c7, 0xca8a04, '#ca8a04'), 30, -13);
  registrar('aduanaCH', crearEdificio('ADUANA · DOUANE · ZOLL', 0xfee2e2, 0xdc2626, '#dc2626'), 66, -13);
  registrar('barrera', crearBarrera(), 62, 0);
  // Control de frontera al bajar del ferry en Algeciras (frontera exterior de Schengen)
  const controlES = crearBarrera();
  const cartelControl = placaTexto('CONTROL FRONTERIZO · ADUANA', 4.2, 0.7, { fondo: '#1e3a8a', color: '#ffffff' });
  cartelControl.position.set(0, 3.4, -ANCHO_RUTA / 2 - 0.35);
  controlES.add(cartelControl);
  registrar('barreraES', controlES, -71, 0);
  registrar('policiaFr', crearEdificio('POLICÍA · CONTROL DE FRONTERAS', 0xe0e7ff, 0x1e3a8a, '#1e3a8a'), -62, -13);
  registrar('policia', crearPersona(0x1e3a8a, 0x111827), -72.5, 4.7, -Math.PI / 2);
  registrar('vos', crearPersona(0xa78bfa), -50, 4.6, Math.PI / 2);
  registrar('conductorMA', crearPersona(0xfacc15, 0x111827), -47.5, 4.6, Math.PI / 2);

  // El camión de Proyecto Apolo, con bandera española en las puertas
  const camion = crearCamion();
  [1, -1].forEach(lado => {
    const b = bandera('es', 0.62, 0.42);
    b.position.set(1.75, 1.3, lado * 1.112);
    if (lado < 0) b.rotation.y = Math.PI;
    camion.tractora.add(b);
  });
  registrar('camion', camion.grupo, -60, CARRIL, 0, 0.02);

  // Papeles flotantes sobre el camión
  registrar('tarjetaLicencia', tarjeta('LICENCIA COMUNITARIA', 'Copia certificada a bordo', '#1d4ed8'), -60, CARRIL, 0, 6.6);
  registrar('tarjetaCMR', tarjeta('CARTA DE PORTE CMR', '3 copias · firman remitente y transportista', '#0369a1'), -60, CARRIL, 0, 9.0);
  registrar('tarjetaCEMT', tarjeta('AUTORIZACIÓN CEMT', 'Original a bordo · cada 3 viajes, volver', '#b91c1c'), -60, CARRIL, 0, 9.0);
  registrar('tarjetaBilateral', tarjeta('AUTORIZACIÓN BILATERAL', 'España – Marruecos', '#b91c1c'), -60, CARRIL, 0, 7.2);
  registrar('vias', crearVias(90), -60, 8);
  registrar('tren', crearTren(), -100, 8);
  registrar('tarjetaTIR', tarjeta('CUADERNO TIR', 'Un viaje · precinto de la aduana de salida', '#1d4ed8'), -60, CARRIL, 0, 7.2);
  registrar('tarjetaATA', tarjeta('CUADERNO ATA', 'Importación temporal · ferias · 1 año', '#7c3aed'), -60, CARRIL, 0, 7.2);
  registrar('tarjetaCertificado', tarjeta('CERTIFICADO DE CONDUCTOR', 'Conductor de fuera de la UE', '#7c3aed'), -47.5, 4.6, 0, 4.4);

  // ---------- DATOS QUE VIAJAN (fichas de pasajeros del ferry a la policía) ----------
  function texturaFicha() {
    const c = document.createElement('canvas');
    c.width = 128; c.height = 160;
    const x = c.getContext('2d');
    x.shadowColor = '#22d3ee'; x.shadowBlur = 18;
    x.fillStyle = '#f8fafc';
    x.beginPath(); x.roundRect(14, 12, 100, 136, 14); x.fill();
    x.shadowBlur = 0;
    x.fillStyle = '#0ea5e9';
    x.beginPath(); x.arc(46, 52, 16, 0, Math.PI * 2); x.fill();
    x.beginPath(); x.roundRect(26, 70, 40, 22, 10); x.fill();
    x.fillStyle = '#94a3b8';
    [[74, 44, 28], [74, 58, 22], [26, 104, 76], [26, 118, 60], [26, 132, 70]].forEach(([px, py, w]) => { x.fillRect(px, py, w, 6); });
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }
  const matFicha = new THREE.SpriteMaterial({ map: texturaFicha(), transparent: true, depthWrite: false });
  const fichas = [];
  for (let i = 0; i < 7; i++) {
    const f = new THREE.Sprite(matFicha.clone());
    f.scale.set(1.3, 1.6, 1);
    f.visible = false;
    escena.add(f);
    fichas.push({ sprite: f, fase: i / 7 });
  }
  const datos = { activo: false, brillo: 0, desde: new THREE.Vector3(), hasta: new THREE.Vector3() };
  // Prende o apaga el envío de datos (desde el ferry hasta la policía)
  function enviarDatos(siNo) {
    datos.activo = siNo;
    if (siNo) {
      datos.desde.copy(objetos.ferry.position).add(new THREE.Vector3(0, 4.5, 0));
      datos.hasta.copy(objetos.policiaFr.position).add(new THREE.Vector3(0, 5.5, 2.5));
    }
  }
  function moverDatos(dt) {
    datos.brillo += ((datos.activo ? 1 : 0) - datos.brillo) * (1 - Math.exp(-dt * 3));
    fichas.forEach(f => {
      f.fase = (f.fase + dt * 0.28) % 1;
      const t = f.fase;
      f.sprite.position.lerpVectors(datos.desde, datos.hasta, t);
      f.sprite.position.y += Math.sin(Math.PI * t) * 7;
      const borde = Math.min(1, t * 6, (1 - t) * 6);
      f.sprite.material.opacity = borde * datos.brillo;
      f.sprite.visible = datos.brillo > 0.02;
    });
  }

  // ---------- ETIQUETAS ----------
  const capa = document.getElementById('etiquetas');
  const etiquetas = {};
  function crearEtiqueta(nombre, ancla) {
    const el = document.createElement('div');
    el.className = 'etiqueta3d';
    capa.appendChild(el);
    etiquetas[nombre] = { el, ancla, visible: false };
  }
  const arriba = (nombre, alto) => () => objetos[nombre].position.clone().add(new THREE.Vector3(0, alto, 0));
  crearEtiqueta('camion', () => objetos.camion.position.clone().add(new THREE.Vector3(1.5, 5.4, 0)));
  crearEtiqueta('vos', arriba('vos', 2.6));
  crearEtiqueta('conductorMA', arriba('conductorMA', 2.6));
  ['apolo', 'remitente', 'puerto', 'aduanaMA', 'cliente', 'quesos', 'aduanaCH'].forEach(n => crearEtiqueta(n, arriba(n, 6.6)));
  crearEtiqueta('ferry', arriba('ferry', 6));
  crearEtiqueta('barreraES', arriba('barreraES', 5.2));
  crearEtiqueta('tren', () => objetos.tren.position.clone().add(new THREE.Vector3(-3, 6, 0)));
  crearEtiqueta('policia', arriba('policia', 2.6));
  crearEtiqueta('policiaFr', arriba('policiaFr', 6.6));
  crearEtiqueta('frontera', () => new THREE.Vector3(-20, 10.3, 0));
  crearEtiqueta('cielo', () => objetos.camion.position.clone().add(new THREE.Vector3(0, 9.5, -4)));

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
  // Lleva el camión (y la tarjeta de la licencia) a un punto x de la ruta
  // y: altura del camión (por ejemplo, arriba del ferry)
  let rotCamion = 0;
  function camionA(x, inmediato = false, y = null) {
    const c0 = objetos.camion;
    if (inmediato) { rotCamion = 0; c0.rotation.y = 0; }
    else if (x < c0.userData.objetivo.x - 0.5) rotCamion = Math.PI;
    else if (x > c0.userData.objetivo.x + 0.5) rotCamion = 0;
    ['camion', 'tarjetaLicencia', 'tarjetaCMR', 'tarjetaCEMT', 'tarjetaBilateral', 'tarjetaTIR', 'tarjetaATA'].forEach(n => {
      const o = objetos[n];
      o.userData.objetivo.x = x;
      if (inmediato) o.position.x = x;
    });
    if (y !== null) {
      const c = objetos.camion;
      c.userData.objetivo.y = y;
      if (inmediato) c.position.y = y;
    }
  }
  // Mueve el tren por las vías
  function trenA(x, inmediato = false) {
    const o = objetos.tren;
    o.userData.objetivo.x = x;
    if (inmediato) o.position.x = x;
  }
  // Transporte no acompañado: se oculta la tractora y viaja solo el semirremolque
  function soloRemolque(siNo) { camion.tractora.visible = !siNo; }
  // Mueve el ferry de un lado al otro del estrecho
  function ferryA(x, inmediato = false) {
    const o = objetos.ferry;
    o.userData.objetivo.x = x;
    if (inmediato) o.position.x = x;
  }
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
    datos.activo = false; datos.brillo = 0;
    camion.tractora.visible = true;
    rotCamion = 0; objetos.camion.rotation.y = 0;
  }

  // ---------- CADA CUADRO ----------
  const vPantalla = new THREE.Vector3();
  function actualizar(dt) {
    const suave = 1 - Math.exp(-dt * 4);
    const suaveCamion = 1 - Math.exp(-dt * 0.8);
    Object.entries(objetos).forEach(([nombre, o]) => {
      o.userData.escala += (o.userData.escalaObjetivo - o.userData.escala) * suave;
      o.scale.setScalar(Math.max(0.0001, o.userData.escala));
      const lento = ['camion', 'tarjetaLicencia', 'tarjetaCMR', 'tarjetaCEMT', 'tarjetaBilateral', 'tarjetaTIR', 'tarjetaATA', 'ferry', 'tren'].includes(nombre);
      o.position.lerp(o.userData.objetivo, lento ? suaveCamion : suave);
      if (o.userData.escalaObjetivo === 0 && o.userData.escala < 0.01) o.visible = false;
    });
    moverDatos(dt);
    // El camión gira despacio para mirar hacia donde va (nunca anda marcha atrás)
    const cam = objetos.camion;
    cam.rotation.y += (rotCamion - cam.rotation.y) * (1 - Math.exp(-dt * 2.5));
    seguirSol(objetos.camion.position.x);
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

  return { mostrar, yaVisible, etiqueta, camionA, ferryA, trenA, enviarDatos, soloRemolque, tipo, limpiar, actualizar, ubicarEtiquetas };
}
