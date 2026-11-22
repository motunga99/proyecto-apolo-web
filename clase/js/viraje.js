// ==========================================
// ESCENA: SUBVIRAJE Y SOBREVIRAJE (Mercancías)
// Modos:
//  - quieto:   camión parado esperando
//  - normal:   hace la curva que el conductor quiere
//  - sub:      entra DEMASIADO RÁPIDO -> patinan las ruedas de adelante -> se va de trompa (curva más abierta)
//  - sobre:    FRENA FUERTE en plena curva -> patinan las de atrás -> se va de cola (curva más cerrada)
//  - balanceo: andando en la curva, la carrocería se inclina hacia afuera
//  - cabeceo:  andando, acelera (la trompa sube) y frena (la trompa baja)
//  - guinada:  andando, da un volantazo y gira como un trompo
// Las animaciones están guionadas para mostrar las respuestas oficiales.
// ==========================================
import * as THREE from 'three';
import { puntoEnCarril, INICIO_CURVA, FIN_CURVA } from './mundo.js';

const LARGO_REMOLQUE = 6.2;
const COLOR_NEUMATICO = 0x1e293b;
const COLOR_PATINA = 0xf97316;

// Centro y radio de la curva del carril (se calculan desde la ruta)
const inicioCurva = puntoEnCarril(INICIO_CURVA + 0.01);
const RADIO = inicioCurva.radio;
const CENTRO = {
  x: inicioCurva.x - Math.sin(inicioCurva.rumbo) * RADIO,
  z: inicioCurva.z - Math.cos(inicioCurva.rumbo) * RADIO
};
const ANGULO_INICIO = -Math.PI / 2;

// Centro aproximado del camión (para ubicar las barras de los ejes)
const CENTRO_CAMION = new THREE.Vector3(-2.7, 1.6, 0);

// Cartel de velocidad máxima (círculo rojo con un número)
function crearCartelVelocidad(numero) {
  const lienzo = document.createElement('canvas');
  lienzo.width = 256; lienzo.height = 256;
  const ctx = lienzo.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.beginPath(); ctx.arc(128, 128, 120, 0, Math.PI * 2); ctx.fill();
  ctx.lineWidth = 30; ctx.strokeStyle = '#dc2626';
  ctx.beginPath(); ctx.arc(128, 128, 104, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = '#111827';
  ctx.font = '900 110px Nunito, sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(String(numero), 128, 136);
  const textura = new THREE.CanvasTexture(lienzo);
  textura.colorSpace = THREE.SRGBColorSpace;

  const cartel = new THREE.Group();
  const poste = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.06, 2.4, 8),
    new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.4, roughness: 0.4 })
  );
  poste.position.y = 1.2;
  cartel.add(poste);
  const disco = new THREE.Mesh(new THREE.CircleGeometry(0.7, 32), new THREE.MeshStandardMaterial({ map: textura }));
  disco.position.y = 2.6;
  // Mira hacia el costado de la cámara para que se lea bien
  cartel.add(disco);
  const atras = new THREE.Mesh(new THREE.CircleGeometry(0.7, 32), new THREE.MeshStandardMaterial({ color: 0x94a3b8 }));
  atras.position.y = 2.6;
  atras.rotation.y = Math.PI;
  cartel.add(atras);
  return cartel;
}

export function crearViraje({ escena, camion, mundo }) {
  let modo = 'quieto';
  let velocidadInicial = 45 / 3.6;
  let s = 0, v = 0;
  let x = 0, z = 0, rumbo = 0;
  let angulo = ANGULO_INICIO;
  let rumboRemolque = 0;
  let volante = 0;
  let frenando = 0;          // 0 a 1, para el pedal de freno
  let acelerando = 0;        // 0 a 1, para el pedal del acelerador
  let inclinacion = 0;       // balanceo de la carrocería
  let cabeceo = 0;           // cabeceo de la carrocería
  let faseCabeceo = 'acelera';
  let estadoActual = '';
  let alCambiarEstado = null;
  const ancla = new THREE.Vector3(); // punto que sigue la cámara

  // ---------- CARTEL DE VELOCIDAD ANTES DE LA CURVA ----------
  const cartel = crearCartelVelocidad(40);
  const pCartel = puntoEnCarril(INICIO_CURVA - 12);
  cartel.position.set(pCartel.x, 0, pCartel.z + 3.2);
  cartel.visible = false;
  escena.add(cartel);

  // ---------- LÍNEA PUNTEADA: LA CURVA QUE QUERÍAS ----------
  const m = new THREE.Matrix4();
  const geoPunto = new THREE.CircleGeometry(0.28, 12).rotateX(-Math.PI / 2);
  const desde = INICIO_CURVA - 25, hasta = FIN_CURVA + 20, paso = 1.6;
  const cantidadGuia = Math.floor((hasta - desde) / paso);
  const guia = new THREE.InstancedMesh(geoPunto, new THREE.MeshBasicMaterial({ color: 0xffffff, depthTest: false, transparent: true, opacity: 0.95 }), cantidadGuia);
  for (let i = 0; i < cantidadGuia; i++) {
    const p = puntoEnCarril(desde + i * paso);
    m.makeTranslation(p.x, 0.12, p.z);
    guia.setMatrixAt(i, m);
  }
  guia.renderOrder = 5;
  escena.add(guia);

  // ---------- RASTRO: EL CAMINO QUE HIZO DE VERDAD ----------
  const MAX_RASTRO = 400;
  const matRastro = new THREE.MeshBasicMaterial({ color: COLOR_PATINA, depthTest: false });
  const rastro = new THREE.InstancedMesh(new THREE.CircleGeometry(0.34, 12).rotateX(-Math.PI / 2), matRastro, MAX_RASTRO);
  rastro.count = 0;
  rastro.renderOrder = 6;
  escena.add(rastro);
  let distanciaRastro = 0;

  function agregarRastro() {
    if (rastro.count >= MAX_RASTRO) return;
    m.makeTranslation(x, 0.13, z);
    rastro.setMatrixAt(rastro.count, m);
    rastro.count++;
    rastro.instanceMatrix.needsUpdate = true;
  }

  // ---------- BARRAS DE LOS EJES (siguen al camión) ----------
  function crearEje(largo, color, giroLocal) {
    const g = new THREE.Group();
    const mat = new THREE.MeshBasicMaterial({ color, depthTest: false, transparent: true, opacity: 0.85 });
    const barra = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, largo, 12), mat);
    barra.renderOrder = 12;
    g.add(barra);
    [1, -1].forEach(lado => {
      const punta = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.6, 16), mat);
      punta.position.y = lado * largo / 2;
      if (lado < 0) punta.rotation.x = Math.PI;
      punta.renderOrder = 12;
      g.add(punta);
    });
    g.visible = false;
    g.userData.giroLocal = new THREE.Quaternion().setFromEuler(giroLocal);
    escena.add(g);
    return g;
  }
  const ejes = {
    balanceo: crearEje(15, 0xef4444, new THREE.Euler(0, 0, Math.PI / 2)),  // longitudinal: de adelante hacia atrás
    cabeceo: crearEje(6, 0x3b82f6, new THREE.Euler(Math.PI / 2, 0, 0)),    // transversal: de lado a lado
    guinada: crearEje(7, 0x22c55e, new THREE.Euler(0, 0, 0))               // vertical: de arriba hacia abajo
  };
  const qRumbo = new THREE.Quaternion();
  const ejeY = new THREE.Vector3(0, 1, 0);

  function ubicarEje() {
    Object.entries(ejes).forEach(([nombre, eje]) => {
      eje.visible = nombre === modo;
      if (!eje.visible) return;
      const c = CENTRO_CAMION.clone().applyAxisAngle(ejeY, rumbo);
      eje.position.set(x + c.x, 0.06 + c.y, z + c.z);
      qRumbo.setFromAxisAngle(ejeY, rumbo);
      eje.quaternion.copy(qRumbo).multiply(eje.userData.giroLocal);
    });
  }

  // ---------- CABINA ----------
  const aguja = document.getElementById('cab-aguja');
  const textoKmh = document.getElementById('cab-kmh');
  const volanteSvg = document.getElementById('cab-volante');
  const pedalAcel = document.getElementById('cab-acelerador');
  const pedalFreno = document.getElementById('cab-freno');
  const notaVolante = document.getElementById('cab-nota');

  // ---------- FUNCIONES ----------
  function avisar(clave) {
    if (clave === estadoActual) return;
    estadoActual = clave;
    if (alCambiarEstado) alCambiarEstado(clave);
  }

  function pintar(tipo) {
    camion.ruedas.forEach((r, i) => {
      let color = COLOR_NEUMATICO;
      if (tipo === 'sub' && camion.ruedasDelanteras.includes(r)) color = COLOR_PATINA;
      if (tipo === 'sobre' && (i === 2 || i === 3)) color = COLOR_PATINA; // ruedas de atrás de la tractora
      r.userData.materialNeumatico.color.setHex(color);
    });
  }

  function reiniciar(sInicio) {
    // Cada modo arranca donde mejor se ve
    if (sInicio === undefined) {
      if (modo === 'cabeceo') sInicio = 8;
      else if (modo === 'guinada') sInicio = 10;
      else if (modo === 'sub') sInicio = INICIO_CURVA - 48; // arranca lejos del cartel y se acerca
      else sInicio = INICIO_CURVA - 30;
    }
    s = sInicio;
    v = velocidadInicial;
    angulo = ANGULO_INICIO;
    estadoActual = '';
    faseCabeceo = 'acelera';
    inclinacion = 0;
    cabeceo = 0;
    frenando = 0;
    acelerando = 0;
    const p = puntoEnCarril(s);
    x = p.x; z = p.z; rumbo = p.rumbo;
    rumboRemolque = rumbo;
    rastro.count = 0;
    distanciaRastro = 0;
    pintar('normal');
    camion.grupo.rotation.set(0, rumbo, 0);
    camion.remolque.rotation.y = 0;
    ancla.set(x, 0.06, z);
  }

  function configurar(opciones) {
    modo = opciones.modo;
    velocidadInicial = (opciones.velocidad || 45) / 3.6;
    const conCurva = modo === 'sub' || modo === 'sobre' || modo === 'normal';
    guia.visible = conCurva;
    rastro.visible = conCurva;
    cartel.visible = modo === 'sub';
    matRastro.color.setHex(modo === 'normal' ? 0x22c55e : modo === 'sobre' ? 0xef4444 : COLOR_PATINA);
  }

  // Seguir la ruta normalmente
  function seguirRuta(dt, desvio = 0, giroExtra = 0) {
    s += v * dt;
    const p = puntoEnCarril(s);
    // desvío hacia la derecha del camión (para el volantazo)
    x = p.x + Math.sin(p.rumbo) * desvio;
    z = p.z + Math.cos(p.rumbo) * desvio;
    rumbo = p.rumbo + giroExtra;
    return p;
  }

  function actualizar(dt) {
    let volanteObjetivo = 0;
    let frenoObjetivo = 0;
    let acelObjetivo = 0;
    let inclinacionObjetivo = 0;
    let cabeceoObjetivo = 0;

    if (modo === 'quieto') {
      v = 0;
      avisar('quieto');
    } else if (modo === 'balanceo') {
      // ---------- BALANCEO: andando por la curva, se inclina hacia afuera ----------
      const p = seguirRuta(dt);
      acelObjetivo = 0.4;
      if (p.enCurva) {
        volanteObjetivo = 0.8;
        inclinacionObjetivo = 0.11; // hacia afuera de la curva
        avisar('curva');
      } else {
        avisar('recta');
      }
      if (s > FIN_CURVA + 25) reiniciar();
    } else if (modo === 'cabeceo') {
      // ---------- CABECEO: acelera (trompa arriba) y frena (trompa abajo) ----------
      if (faseCabeceo === 'acelera') {
        v += 4 * dt;
        acelObjetivo = 1;
        cabeceoObjetivo = 0.05;   // trompa para arriba
        avisar('acelera');
        if (v >= 17) faseCabeceo = 'frena';
      } else {
        v = Math.max(0, v - 6.5 * dt);
        frenoObjetivo = 1;
        cabeceoObjetivo = -0.075; // trompa para abajo
        avisar('frena');
        if (v <= 5) faseCabeceo = 'acelera';
      }
      seguirRuta(dt);
      if (s > INICIO_CURVA - 6) reiniciar();
    } else if (modo === 'guinada') {
      // ---------- GUIÑADA: volantazo en la recta, gira como un trompo ----------
      const inicioGolpe = 30, largoGolpe = 16;
      let desvio = 0, giroExtra = 0;
      const u = (s - inicioGolpe) / largoGolpe;
      if (u > 0 && u < 1) {
        desvio = -2.6 * Math.sin(Math.PI * u);                       // se va hacia la izquierda y vuelve
        giroExtra = 0.5 * Math.sin(2 * Math.PI * u);                  // la trompa gira a un lado y al otro
        volanteObjetivo = Math.sin(2 * Math.PI * u) > 0 ? 1 : -1;
        avisar('volantazo');
      } else {
        avisar('recta');
      }
      acelObjetivo = 0.4;
      seguirRuta(dt, desvio, giroExtra);
      if (s > INICIO_CURVA - 6) reiniciar();
    } else {
      // ---------- NORMAL, SUB Y SOBRE ----------
      const enCurva = s >= INICIO_CURVA;

      if (!enCurva || modo === 'normal') {
        const p = seguirRuta(dt);
        volanteObjetivo = p.enCurva ? 0.8 : 0;
        acelObjetivo = 0.5;
        if (p.enCurva) avisar('curva');
        else if (s < INICIO_CURVA) avisar('recta');
        if (modo === 'normal' && s > FIN_CURVA + 45) reiniciar();
      } else {
        const avance = Math.min(1.2, (angulo - ANGULO_INICIO) / (Math.PI / 2));
        let cambioRadio, giroExtra;
        if (modo === 'sub') {
          // Entró demasiado rápido: las de adelante no agarran, dobla de menos
          cambioRadio = 16 * avance * avance;
          giroExtra = -0.15 * Math.min(1, avance * 3);
          volanteObjetivo = 1;
          if (avance > 0.2) frenoObjetivo = 0.4;   // el camionero intenta frenar, tarde
          pintar('sub');
          avisar('sub');
        } else {
          // Clavó el freno en plena curva: la cola queda liviana y se va
          cambioRadio = -11 * avance * avance;
          giroExtra = 0.75 * Math.min(1, avance * 2.2);
          volanteObjetivo = 0.6;
          frenoObjetivo = 1;
          pintar('sobre');
          avisar('sobre');
        }
        const radio = RADIO + cambioRadio;
        if (avance > 0.2) v = Math.max(0, v - 2.6 * dt);
        angulo += (v * dt) / radio;
        x = CENTRO.x + radio * Math.cos(angulo);
        z = CENTRO.z - radio * Math.sin(angulo);
        rumbo = angulo + Math.PI / 2 + giroExtra;
        if (v <= 0.01) avisar('parado');
      }

      distanciaRastro += v * dt;
      if (distanciaRastro > 1.2) { distanciaRastro = 0; agregarRastro(); }
    }

    // ---------- MOVER EL CAMIÓN ----------
    camion.grupo.position.set(x, 0.06, z);
    camion.grupo.rotation.set(0, rumbo, 0);
    rumboRemolque += (v / LARGO_REMOLQUE) * Math.sin(rumbo - rumboRemolque) * dt;
    camion.remolque.rotation.y = rumboRemolque - rumbo;

    // Inclinación y cabeceo de la carrocería (las ruedas quedan en el piso)
    const suave = Math.min(1, dt * 4);
    inclinacion += (inclinacionObjetivo - inclinacion) * suave;
    cabeceo += (cabeceoObjetivo - cabeceo) * suave;
    camion.cuerpoTractora.rotation.x = inclinacion;
    camion.cuerpoRemolque.rotation.x = inclinacion;
    camion.cuerpoTractora.rotation.z = cabeceo;
    camion.cuerpoRemolque.rotation.z = cabeceo * 0.4;

    ubicarEje();

    // Ruedas y volante
    camion.ruedas.forEach(r => { r.rotation.z -= (v / r.userData.radio) * dt; });
    volante += (volanteObjetivo - volante) * Math.min(1, dt * 3);
    camion.ruedasDelanteras.forEach(r => { r.rotation.y = volante * 0.3; });

    // Cabina
    frenando += (frenoObjetivo - frenando) * Math.min(1, dt * 6);
    acelerando += (acelObjetivo - acelerando) * Math.min(1, dt * 6);
    if (v <= 0.01) acelerando = 0;
    const kmh = v * 3.6;
    aguja.setAttribute('transform', `rotate(${-120 + Math.min(kmh, 120) * 2} 60 75)`);
    textoKmh.textContent = Math.round(kmh);
    volanteSvg.setAttribute('transform', `rotate(${-volante * 90} 150 75)`);
    pedalFreno.setAttribute('transform', `translate(0 ${frenando * 14})`);
    pedalFreno.setAttribute('fill', frenando > 0.1 ? '#ef4444' : '#64748b');
    pedalAcel.setAttribute('transform', `translate(0 ${acelerando * 10})`);
    pedalAcel.setAttribute('fill', acelerando > 0.1 ? '#22c55e' : '#64748b');
    notaVolante.style.opacity = estadoActual === 'sub' ? 1 : 0;

    ancla.set(x, 0.06, z);
    mundo.seguirSol(x, z);
  }

  reiniciar();

  return {
    actualizar,
    reiniciar,
    configurar,
    alCambiarEstado: fn => { alCambiarEstado = fn; },
    posicion: () => ancla
  };
}