// ==========================================
// CAMIÓN: TRACTORA + SEMIRREMOLQUE (estilo juguete 3D)
// El camión mira hacia +X. El semirremolque gira sobre la
// quinta rueda, así más adelante puede cruzarse (tijera).
// ==========================================
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

// Caja con bordes redondeados. largo = X, alto = Y, ancho = Z
function caja(largo, alto, ancho, radio, material) {
  const malla = new THREE.Mesh(new RoundedBoxGeometry(largo, alto, ancho, 3, radio), material);
  malla.castShadow = true;
  malla.receiveShadow = true;
  return malla;
}

// Rueda con neumático, llanta, tapacubos y tuercas (para ver cómo gira)
function crearRueda(radio, ancho) {
  const rueda = new THREE.Group();
  rueda.userData.radio = radio;

  const cilindro = (r, a, segmentos) => {
    const g = new THREE.CylinderGeometry(r, r, a, segmentos);
    g.rotateX(Math.PI / 2);
    return g;
  };

  // El material del neumático se guarda para poder pintarlo de rojo (rueda bloqueada)
  const materialNeumatico = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
  const neumatico = new THREE.Mesh(cilindro(radio, ancho, 32), materialNeumatico);
  neumatico.castShadow = true;
  rueda.add(neumatico);
  rueda.userData.materialNeumatico = materialNeumatico;

  const llanta = new THREE.Mesh(
    cilindro(radio * 0.56, ancho + 0.03, 24),
    new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.35, roughness: 0.35 })
  );
  rueda.add(llanta);

  const tapacubos = new THREE.Mesh(
    cilindro(radio * 0.22, ancho + 0.06, 16),
    new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.5, roughness: 0.3 })
  );
  rueda.add(tapacubos);

  const materialTuerca = new THREE.MeshStandardMaterial({ color: 0x1e293b });
  for (let i = 0; i < 5; i++) {
    const angulo = (i / 5) * Math.PI * 2;
    const tuerca = new THREE.Mesh(cilindro(radio * 0.06, ancho + 0.05, 8), materialTuerca);
    tuerca.position.set(Math.cos(angulo) * radio * 0.38, Math.sin(angulo) * radio * 0.38, 0);
    rueda.add(tuerca);
  }

  return rueda;
}

// Cartel con texto dibujado (para la publicidad del camión).
// Se dibuja en un "lienzo" y se pega como calcomanía sobre una placa.
function crearCartel(texto, largo, alto, estilo) {
  const lienzo = document.createElement('canvas');
  lienzo.width = 2048;
  lienzo.height = Math.round(2048 * (alto / largo));
  const ctx = lienzo.getContext('2d');

  const textura = new THREE.CanvasTexture(lienzo);
  textura.colorSpace = THREE.SRGBColorSpace;
  textura.anisotropy = 8;

  function dibujar() {
    ctx.clearRect(0, 0, lienzo.width, lienzo.height);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Achica la letra hasta que entre a lo ancho
    let tamano = lienzo.height * estilo.tamanoRelativo;
    ctx.font = `900 ${tamano}px Nunito, sans-serif`;
    while (ctx.measureText(texto).width > lienzo.width * 0.92 && tamano > 10) {
      tamano -= 4;
      ctx.font = `900 ${tamano}px Nunito, sans-serif`;
    }

    const cx = lienzo.width / 2;
    const cy = lienzo.height / 2;

    if (estilo.degradado) {
      const ancho = ctx.measureText(texto).width;
      const grad = ctx.createLinearGradient(cx - ancho / 2, 0, cx + ancho / 2, 0);
      grad.addColorStop(0, estilo.degradado[0]);
      grad.addColorStop(1, estilo.degradado[1]);
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = estilo.color;
    }
    ctx.fillText(texto, cx, cy);

    // Línea fina debajo del texto
    if (estilo.subrayado) {
      const ancho = ctx.measureText(texto).width;
      ctx.fillRect(cx - ancho / 2, cy + tamano * 0.55, ancho, tamano * 0.06);
    }

    textura.needsUpdate = true;
  }

  dibujar();
  // Cuando termina de cargar la letra Nunito, se vuelve a dibujar con ella
  if (document.fonts) {
    document.fonts.load(`900 100px Nunito`).then(dibujar).catch(() => {});
  }

  const placa = new THREE.Mesh(
    new THREE.PlaneGeometry(largo, alto),
    new THREE.MeshStandardMaterial({
      map: textura,
      transparent: true,
      roughness: 0.5,
      polygonOffset: true,
      polygonOffsetFactor: -2
    })
  );
  return placa;
}

export function crearCamion() {
  const camion = new THREE.Group();
  const ruedas = [];
  const haces = [];

  // Materiales
  const matCabina = new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.35, metalness: 0.1 });
  const matDeflector = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.35 });
  const matCarga = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 });
  const matFranja = new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.4 });
  const matChasis = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7 });
  const matCromo = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.65, roughness: 0.25 });
  const matVidrio = new THREE.MeshStandardMaterial({
    color: 0xbae6fd, roughness: 0.12, metalness: 0.2, transparent: true, opacity: 0.88
  });
  const matFaro = new THREE.MeshStandardMaterial({ color: 0xfef08a, emissive: 0xfef08a, emissiveIntensity: 0.3 });
  const matLuzTrasera = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 0.5 });

  // ---------- TRACTORA ----------
  const tractora = new THREE.Group();
  const cuerpoTractora = new THREE.Group(); // todo menos las ruedas (para la suspensión)
  tractora.add(cuerpoTractora);

  const chasis = caja(4.6, 0.32, 1.6, 0.08, matChasis);
  chasis.position.set(0.4, 0.62, 0);
  cuerpoTractora.add(chasis);

  const cabina = caja(1.6, 1.75, 2.2, 0.18, matCabina);
  cabina.position.set(2.1, 1.6, 0);
  cuerpoTractora.add(cabina);

  const deflector = caja(1.2, 0.6, 2.05, 0.18, matDeflector);
  deflector.position.set(1.95, 2.75, 0);
  cuerpoTractora.add(deflector);

  // Sitio web en el frente (sobre el deflector del techo)
  const cartelWeb = crearCartel('proyectoapolo.com.ar', 1.65, 0.42, {
    color: '#ffffff',
    tamanoRelativo: 0.6
  });
  cartelWeb.position.set(2.565, 2.75, 0);
  cartelWeb.rotation.y = Math.PI / 2;
  cuerpoTractora.add(cartelWeb);

  const parabrisas = caja(0.12, 0.75, 1.9, 0.05, matVidrio);
  parabrisas.position.set(2.88, 1.95, 0);
  parabrisas.rotation.z = 0.1;
  cuerpoTractora.add(parabrisas);

  const ventanas = caja(0.8, 0.65, 2.24, 0.06, matVidrio);
  ventanas.position.set(2.25, 1.95, 0);
  cuerpoTractora.add(ventanas);

  [-1.18, 1.18].forEach(z => {
    const brazo = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.05, 0.2), matChasis);
    brazo.position.set(2.75, 2.05, z);
    cuerpoTractora.add(brazo);
    const espejo = caja(0.12, 0.4, 0.14, 0.03, matChasis);
    espejo.position.set(2.82, 1.9, z + (z > 0 ? 0.08 : -0.08));
    cuerpoTractora.add(espejo);
  });

  const paragolpes = caja(0.3, 0.3, 2.25, 0.08, matCromo);
  paragolpes.position.set(2.95, 0.7, 0);
  cuerpoTractora.add(paragolpes);

  const tanque = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.8, 16), matCromo);
  tanque.rotation.z = Math.PI / 2;
  tanque.position.set(0.85, 0.62, 0.95);
  tanque.castShadow = true;
  cuerpoTractora.add(tanque);

  const escape = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.3, 12), matCromo);
  escape.position.set(1.2, 1.85, -1.0);
  cuerpoTractora.add(escape);

  // Quinta rueda (donde se engancha el semirremolque)
  const quintaRueda = new THREE.Mesh(
    new THREE.CylinderGeometry(0.55, 0.55, 0.12, 24),
    new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.4, roughness: 0.4 })
  );
  quintaRueda.position.set(-0.9, 0.85, 0);
  cuerpoTractora.add(quintaRueda);

  [-0.7, 0.7].forEach(z => {
    const faro = caja(0.12, 0.22, 0.32, 0.04, matFaro);
    faro.position.set(2.98, 1.05, z);
    cuerpoTractora.add(faro);

    // Haz de luz para el modo noche
    const geoHaz = new THREE.ConeGeometry(1.0, 4.5, 20, 1, true);
    geoHaz.rotateZ(-Math.PI / 2);
    const haz = new THREE.Mesh(geoHaz, new THREE.MeshBasicMaterial({
      color: 0xfef08a, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide
    }));
    haz.position.set(5.25, 0.95, z);
    haz.rotation.z = -0.08;
    cuerpoTractora.add(haz);
    haces.push(haz);
  });

  // Ruedas de la tractora: eje delantero y eje trasero (bajo la quinta rueda)
  const ruedasDelanteras = [];
  [2.05, -0.9].forEach(x => {
    [1.0, -1.0].forEach(z => {
      const rueda = crearRueda(0.5, 0.4);
      rueda.position.set(x, 0.5, z);
      tractora.add(rueda);
      ruedas.push(rueda);
      if (x > 0) ruedasDelanteras.push(rueda);
    });
  });

  camion.add(tractora);

  // ---------- SEMIRREMOLQUE ----------
  // Su origen está en el punto de enganche (quinta rueda)
  const remolque = new THREE.Group();
  remolque.position.set(-0.9, 0, 0);
  const cuerpoRemolque = new THREE.Group();
  remolque.add(cuerpoRemolque);

  const cajaCarga = caja(8.8, 2.7, 2.4, 0.16, matCarga);
  cajaCarga.position.set(-3.2, 2.6, 0);
  cuerpoRemolque.add(cajaCarga);

  const franja = caja(8.82, 0.35, 2.42, 0.04, matFranja);
  franja.position.set(-3.2, 1.55, 0);
  cuerpoRemolque.add(franja);

  // "Proyecto Apolo" en los dos costados de la caja
  [1, -1].forEach(lado => {
    const cartel = crearCartel('Proyecto Apolo', 7.4, 1.5, {
      degradado: ['#2563eb', '#4f46e5'],
      tamanoRelativo: 0.7,
      subrayado: true
    });
    cartel.position.set(-3.2, 2.75, lado * 1.212);
    if (lado < 0) cartel.rotation.y = Math.PI; // del otro lado se da vuelta para leerse bien
    cuerpoRemolque.add(cartel);
  });

  const bastidor = caja(7.6, 0.25, 1.4, 0.06, matChasis);
  bastidor.position.set(-3.4, 1.1, 0);
  cuerpoRemolque.add(bastidor);

  // Patas de apoyo del semirremolque
  [-0.65, 0.65].forEach(z => {
    const pata = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.85, 0.12), matChasis);
    pata.position.set(-1.6, 0.6, z);
    cuerpoRemolque.add(pata);
  });

  [-0.95, 0.95].forEach(z => {
    const luz = caja(0.1, 0.24, 0.3, 0.03, matLuzTrasera);
    luz.position.set(-7.62, 1.4, z);
    cuerpoRemolque.add(luz);
  });

  // 3 ejes traseros
  [-5.2, -6.2, -7.2].forEach(x => {
    [1.0, -1.0].forEach(z => {
      const rueda = crearRueda(0.46, 0.4);
      rueda.position.set(x, 0.46, z);
      remolque.add(rueda);
      ruedas.push(rueda);
    });
  });

  camion.add(remolque);

  // Encender o apagar luces (modo noche)
  function setNoche(noche) {
    matFaro.emissiveIntensity = noche ? 1.8 : 0.3;
    haces.forEach(h => { h.material.opacity = noche ? 0.24 : 0; });
  }

  return { grupo: camion, tractora, remolque, cuerpoTractora, cuerpoRemolque, ruedas, ruedasDelanteras, setNoche };
}
