// ==========================================
// MUNDO: luces, ruta con curva, montañas, árboles, nubes, sol y estrellas
// La ruta: una recta, una curva a la izquierda y otra recta.
// El camión va por el carril derecho.
// ==========================================
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const CIELO_DIA = 0x7dd3fc;
const CIELO_NOCHE = 0x0f172a;

// ---------- MEDIDAS DE LA RUTA ----------
const ANCHO_RUTA = 7;
const CARRIL = 1.6;                 // distancia del centro de la ruta al centro del carril derecho
const RADIO_CURVA = 40;             // radio del centro de la ruta en la curva
const CENTRO_CURVA = { x: 0, z: -40 };
const RADIO_CARRIL = RADIO_CURVA + CARRIL;

const LARGO_RECTA_1 = 70;
const LARGO_CURVA = RADIO_CARRIL * Math.PI / 2;
const LARGO_RECTA_2 = 80;

export const INICIO_CURVA = LARGO_RECTA_1;
export const FIN_CURVA = LARGO_RECTA_1 + LARGO_CURVA;
export const LARGO_TOTAL = LARGO_RECTA_1 + LARGO_CURVA + LARGO_RECTA_2;

// Devuelve dónde está el camión (x, z), hacia dónde mira (rumbo)
// y si está en la curva, según los metros recorridos (s).
export function puntoEnCarril(s) {
  if (s < LARGO_RECTA_1) {
    return { x: -LARGO_RECTA_1 + s, z: CARRIL, rumbo: 0, enCurva: false, radio: Infinity };
  }
  if (s < FIN_CURVA) {
    const angulo = -Math.PI / 2 + (s - LARGO_RECTA_1) / RADIO_CARRIL;
    return {
      x: CENTRO_CURVA.x + RADIO_CARRIL * Math.cos(angulo),
      z: CENTRO_CURVA.z - RADIO_CARRIL * Math.sin(angulo),
      rumbo: angulo + Math.PI / 2,
      enCurva: true,
      radio: RADIO_CARRIL
    };
  }
  const d = s - FIN_CURVA;
  return { x: RADIO_CARRIL, z: CENTRO_CURVA.z - d, rumbo: Math.PI / 2, enCurva: false, radio: Infinity };
}

function crearArbol(tipo) {
  const arbol = new THREE.Group();

  const tronco = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.22, 1.1, 12),
    new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9 })
  );
  tronco.position.y = 0.55;
  tronco.castShadow = true;
  arbol.add(tronco);

  const matHojas = new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.75 });
  let copa;
  if (tipo === 'redondo') {
    copa = new THREE.Mesh(new THREE.DodecahedronGeometry(0.95, 1), matHojas);
    copa.position.y = 1.65;
  } else {
    copa = new THREE.Mesh(new THREE.SphereGeometry(0.78, 16, 16), matHojas);
    copa.scale.set(0.9, 1.35, 0.9);
    copa.position.y = 1.8;
  }
  copa.castShadow = true;
  arbol.add(copa);

  return arbol;
}

function crearSenal() {
  const senal = new THREE.Group();

  const poste = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 1.7, 8),
    new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.4, roughness: 0.4 })
  );
  poste.position.y = 0.85;
  poste.castShadow = true;
  senal.add(poste);

  const matAmarillo = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.4 });
  [
    { lado: 0.65, prof: 0.08, mat: matAmarillo },
    { lado: 0.52, prof: 0.09, mat: new THREE.MeshStandardMaterial({ color: 0x1e293b }) },
    { lado: 0.44, prof: 0.10, mat: matAmarillo }
  ].forEach(c => {
    const placa = new THREE.Mesh(new RoundedBoxGeometry(c.lado, c.lado, c.prof, 2, 0.04), c.mat);
    placa.position.y = 1.65;
    placa.rotation.z = Math.PI / 4;
    placa.castShadow = true;
    senal.add(placa);
  });

  return senal;
}

function crearNube() {
  const nube = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.95 });
  [
    { x: 0, y: 0, z: 0, r: 0.85 },
    { x: -0.75, y: -0.15, z: 0.1, r: 0.65 },
    { x: 0.8, y: -0.12, z: -0.1, r: 0.7 },
    { x: 0.25, y: 0.35, z: 0.15, r: 0.65 }
  ].forEach(p => {
    const bola = new THREE.Mesh(new THREE.SphereGeometry(p.r, 16, 16), mat);
    bola.position.set(p.x, p.y, p.z);
    nube.add(bola);
  });
  return nube;
}

// Pieza plana sobre el suelo (para líneas y bordes)
function piezaPlana(largo, ancho, material, y) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(largo, 0.01, ancho), material);
  m.position.y = y;
  m.receiveShadow = true;
  return m;
}

export function crearMundo(escena) {
  escena.background = new THREE.Color(CIELO_DIA);
  escena.fog = new THREE.Fog(CIELO_DIA, 70, 180);

  // ---------- LUCES ----------
  const luzCielo = new THREE.HemisphereLight(0xffffff, 0x10b981, 2.4);
  luzCielo.position.set(0, 20, 0);
  escena.add(luzCielo);

  const luzAmbiente = new THREE.AmbientLight(0xffffff, 1.1);
  escena.add(luzAmbiente);

  // El sol sigue al camión para que las sombras siempre se vean
  const sol = new THREE.DirectionalLight(0xfffbeb, 3.3);
  sol.castShadow = true;
  sol.shadow.mapSize.set(2048, 2048);
  sol.shadow.camera.near = 2;
  sol.shadow.camera.far = 80;
  const d = 22;
  sol.shadow.camera.left = -d;
  sol.shadow.camera.right = d;
  sol.shadow.camera.top = d;
  sol.shadow.camera.bottom = -d;
  sol.shadow.bias = -0.0005;
  escena.add(sol);
  escena.add(sol.target);

  // ---------- SUELO ----------
  const suelo = new THREE.Mesh(
    new THREE.PlaneGeometry(400, 400),
    new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.9 })
  );
  suelo.rotation.x = -Math.PI / 2;
  suelo.position.set(10, -0.02, -30);
  suelo.receiveShadow = true;
  escena.add(suelo);

  // ---------- RUTA ----------
  const matAsfalto = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.85 });
  const matBorde = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.6 });
  const matLinea = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.5 });
  const Y_RUTA = 0.04;

  // Recta 1 (de x = -110 a x = 0)
  const recta1 = new THREE.Mesh(new THREE.BoxGeometry(110, 0.08, ANCHO_RUTA), matAsfalto);
  recta1.position.set(-55, 0, 0);
  recta1.receiveShadow = true;
  escena.add(recta1);

  // Curva (anillo de 90 grados)
  const geoCurva = new THREE.RingGeometry(RADIO_CURVA - ANCHO_RUTA / 2, RADIO_CURVA + ANCHO_RUTA / 2, 80, 1, -Math.PI / 2, Math.PI / 2);
  const curva = new THREE.Mesh(geoCurva, matAsfalto);
  curva.rotation.x = -Math.PI / 2;
  curva.position.set(CENTRO_CURVA.x, Y_RUTA, CENTRO_CURVA.z);
  curva.receiveShadow = true;
  escena.add(curva);

  // Recta 2 (de z = -40 a z = -150)
  const recta2 = new THREE.Mesh(new THREE.BoxGeometry(ANCHO_RUTA, 0.08, 110), matAsfalto);
  recta2.position.set(RADIO_CURVA, 0, CENTRO_CURVA.z - 55);
  recta2.receiveShadow = true;
  escena.add(recta2);

  // Bordes blancos
  [-1, 1].forEach(lado => {
    const desplazamiento = lado * (ANCHO_RUTA / 2 - 0.25);

    const b1 = piezaPlana(110, 0.18, matBorde, Y_RUTA + 0.005);
    b1.position.set(-55, Y_RUTA + 0.005, desplazamiento);
    escena.add(b1);

    const radio = RADIO_CURVA + desplazamiento;
    const bc = new THREE.Mesh(new THREE.RingGeometry(radio - 0.09, radio + 0.09, 80, 1, -Math.PI / 2, Math.PI / 2), matBorde);
    bc.rotation.x = -Math.PI / 2;
    bc.position.set(CENTRO_CURVA.x, Y_RUTA + 0.005, CENTRO_CURVA.z);
    escena.add(bc);

    const b2 = piezaPlana(0.18, 110, matBorde, Y_RUTA + 0.005);
    b2.position.set(RADIO_CURVA + desplazamiento, Y_RUTA + 0.005, CENTRO_CURVA.z - 55);
    escena.add(b2);
  });

  // Líneas amarillas del centro
  for (let x = -108; x < 0; x += 3.6) {
    const l = piezaPlana(1.8, 0.18, matLinea, Y_RUTA + 0.008);
    l.position.set(x, Y_RUTA + 0.008, 0);
    escena.add(l);
  }
  const pasosCurva = Math.floor((RADIO_CURVA * Math.PI / 2) / 3.6);
  for (let i = 0; i < pasosCurva; i++) {
    const angulo = -Math.PI / 2 + (i + 0.5) * (Math.PI / 2) / pasosCurva;
    const l = piezaPlana(1.8, 0.18, matLinea, Y_RUTA + 0.008);
    l.position.set(CENTRO_CURVA.x + RADIO_CURVA * Math.cos(angulo), Y_RUTA + 0.008, CENTRO_CURVA.z - RADIO_CURVA * Math.sin(angulo));
    l.rotation.y = angulo + Math.PI / 2;
    escena.add(l);
  }
  for (let z = CENTRO_CURVA.z - 2; z > -150; z -= 3.6) {
    const l = piezaPlana(0.18, 1.8, matLinea, Y_RUTA + 0.008);
    l.position.set(RADIO_CURVA, Y_RUTA + 0.008, z);
    escena.add(l);
  }

  // ---------- MONTAÑAS ----------
  const matFondo = new THREE.MeshStandardMaterial({ color: 0x34d399, roughness: 0.9, flatShading: true });
  const matMedio = new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.9, flatShading: true });
  [
    { x: -70, z: -40, r: 12, h: 10, mat: matFondo },
    { x: -40, z: -60, r: 14, h: 12, mat: matFondo },
    { x: -5, z: -95, r: 16, h: 13, mat: matFondo },
    { x: 80, z: -100, r: 15, h: 12, mat: matFondo },
    { x: 85, z: -40, r: 13, h: 10, mat: matFondo },
    { x: -55, z: -25, r: 7, h: 5, mat: matMedio },
    { x: 15, z: -75, r: 8, h: 6, mat: matMedio },
    { x: 70, z: -15, r: 8, h: 6, mat: matMedio }
  ].forEach((m, i) => {
    const montana = new THREE.Mesh(new THREE.ConeGeometry(m.r, m.h, 7), m.mat);
    montana.position.set(m.x, m.h / 2 - 0.2, m.z);
    montana.rotation.y = i * 0.9;
    escena.add(montana);
  });

  // ---------- ÁRBOLES (fuera de la zona donde el camión se puede ir de la curva) ----------
  [
    [-62, -6], [-48, -7.5], [-34, -6], [-20, -7],
    [6, -24], [14, -31], [24, -42], [8, -48], [-6, -30], [20, -55],
    [48, -70], [49, -95], [33, -80], [32, -105]
  ].forEach(([x, z], i) => {
    const arbol = crearArbol(i % 2 === 0 ? 'redondo' : 'alto');
    arbol.position.set(x, 0, z);
    escena.add(arbol);
  });

  // Señal de curva peligrosa antes de la curva
  const senal = crearSenal();
  senal.position.set(-18, 0, 4.4);
  escena.add(senal);

  // ---------- CIELO ----------
  const astro = new THREE.Mesh(
    new THREE.SphereGeometry(3, 24, 24),
    new THREE.MeshBasicMaterial({ color: 0xfde047, fog: false })
  );
  astro.position.set(40, 40, -120);
  escena.add(astro);

  const estrellas = new THREE.Group();
  const geoEstrella = new THREE.SphereGeometry(0.25, 8, 8);
  const matEstrella = new THREE.MeshBasicMaterial({ color: 0xfef9c3, fog: false });
  for (let i = 0; i < 80; i++) {
    const estrella = new THREE.Mesh(geoEstrella, matEstrella);
    estrella.position.set((Math.random() - 0.5) * 240, 20 + Math.random() * 40, -110 - Math.random() * 30);
    estrellas.add(estrella);
  }
  estrellas.visible = false;
  escena.add(estrellas);

  const nubes = [];
  [
    { x: -40, y: 18, z: -50, s: 2.2 },
    { x: -5, y: 22, z: -70, s: 2.6 },
    { x: 30, y: 17, z: -45, s: 1.9 },
    { x: 60, y: 21, z: -80, s: 2.3 }
  ].forEach(c => {
    const nube = crearNube();
    nube.position.set(c.x, c.y, c.z);
    nube.scale.setScalar(c.s);
    escena.add(nube);
    nubes.push(nube);
  });

  // ---------- FUNCIONES ----------
  function moverNubes(delta) {
    nubes.forEach(n => {
      n.position.x -= 0.8 * delta;
      if (n.position.x < -90) n.position.x = 110;
    });
  }

  function seguirSol(x, z) {
    sol.position.set(x + 12, 24, z + 14);
    sol.target.position.set(x, 0, z);
  }

  function setNoche(noche) {
    const cielo = noche ? CIELO_NOCHE : CIELO_DIA;
    escena.background.setHex(cielo);
    escena.fog.color.setHex(cielo);
    sol.intensity = noche ? 0.7 : 3.3;
    sol.color.setHex(noche ? 0x93c5fd : 0xfffbeb);
    luzCielo.intensity = noche ? 0.8 : 2.4;
    luzAmbiente.intensity = noche ? 0.6 : 1.1;
    astro.material.color.setHex(noche ? 0xf8fafc : 0xfde047);
    estrellas.visible = noche;
  }

  // Aspecto del asfalto según el suelo
  function setSuelo(tipo) {
    if (tipo === 'mojado') {
      matAsfalto.color.setHex(0x1e293b);
      matAsfalto.roughness = 0.2;
      matAsfalto.metalness = 0.3;
    } else if (tipo === 'hielo') {
      matAsfalto.color.setHex(0xa5c4dd);
      matAsfalto.roughness = 0.08;
      matAsfalto.metalness = 0.1;
    } else {
      matAsfalto.color.setHex(0x334155);
      matAsfalto.roughness = 0.85;
      matAsfalto.metalness = 0;
    }
  }

  return { moverNubes, seguirSol, setNoche, setSuelo };
}
