// ==========================================
// ESCENA: CÍRCULO DE KAMM (Mercancías)
// El camión llega a la curva. Se elige la velocidad, cuánto frenar
// dentro de la curva y el tipo de suelo, y se ve qué pasa.
// La física está simplificada para mostrar las respuestas oficiales:
//  - flecha dentro del círculo  -> el camión se dirige sin problemas
//  - flecha fuera del círculo   -> la rueda pierde adherencia
//  - más freno en curva         -> menos fuerza de guiado lateral
//  - toda la fuerza en frenar   -> la rueda se bloquea y no se puede dirigir
// ==========================================
import * as THREE from 'three';
import { puntoEnCarril, INICIO_CURVA, LARGO_TOTAL } from './mundo.js';

const G = 9.8;
const AGARRE = { seco: 0.8, mojado: 0.5, hielo: 0.15 }; // cuánto agarra cada suelo
const AGARRE_SECO = AGARRE.seco;
const FRENO_MAXIMO = 0.8 * G;      // lo que frena el camión con el pedal a fondo
const LARGO_REMOLQUE = 6.2;        // del enganche al centro de los ejes traseros
const RADIO_ANILLO = 1.2;          // tamaño del círculo dibujado en el suelo

const COLOR_NEUMATICO = 0x1e293b;
const COLOR_BLOQUEADO = 0xdc2626;
const COLOR_PATINA = 0xf97316;

const MENSAJES = {
  recta: {
    titulo: 'Recta',
    texto: 'El camión va derecho. La rueda no necesita fuerza para doblar: las flechas están quietas.'
  },
  curva: {
    titulo: 'Curva: todo bien',
    texto: 'La rueda usa parte de su agarre para doblar. La flecha está DENTRO del círculo: el camión se dirige sin problemas.'
  },
  curvaFreno: {
    titulo: 'Frenás en la curva',
    texto: 'La flecha de frenar crece y queda MENOS lugar para doblar. Eso es: si aumenta la fuerza de frenado, disminuye la fuerza de guiado lateral.'
  },
  frenoRecta: {
    titulo: 'Frenando en recta',
    texto: 'No hace falta doblar, así que casi todo el agarre puede ir a frenar.'
  },
  derrape: {
    titulo: '¡La flecha se salió del círculo!',
    texto: 'La rueda pierde adherencia. El camión no obedece al volante y se va de la curva.'
  },
  bloqueo: {
    titulo: '¡Rueda bloqueada!',
    texto: 'Toda la fuerza se fue a frenar y no queda nada para doblar. Aunque gires el volante, el camión sigue derecho.'
  },
  parado: {
    titulo: 'Camión detenido',
    texto: 'Cambiá la velocidad, el freno o el suelo y tocá Repetir.'
  }
};

export function crearKamm({ escena, camion, mundo }) {
  // ---------- ESTADO ----------
  let velocidadEntrada = 50; // km/h
  let frenar = 0;            // 0 a 1 (pedal)
  let suelo = 'seco';

  let s = 0;                 // metros recorridos por la ruta
  let v = 0;                 // velocidad en m/s
  let modo = 'ruta';         // 'ruta' | 'derrape' | 'bloqueo'
  let x = 0, z = 0, rumbo = 0;
  let rumboRemolque = 0;
  let tiempoParado = 0;
  let volante = 0;           // giro del volante, 0 a 1
  let estadoActual = '';
  let alCambiarEstado = null; // aviso para el Modo clase (pausas automáticas)

  // Flechas en unidades del círculo seco (1 = radio del círculo seco)
  let flechaFreno = 0;
  let flechaDoblar = 0;

  // ---------- CÍRCULO EN EL SUELO (junto a la rueda delantera derecha) ----------
  const anillo = new THREE.Group();
  anillo.position.set(2.05, 0.12, 1.0);
  camion.grupo.add(anillo);

  const matAnillo = new THREE.MeshBasicMaterial({ color: 0x0ea5e9, transparent: true, opacity: 0.9, depthTest: false });
  const aro = new THREE.Mesh(new THREE.RingGeometry(RADIO_ANILLO - 0.05, RADIO_ANILLO + 0.05, 64), matAnillo);
  aro.rotation.x = -Math.PI / 2;
  aro.renderOrder = 10;
  const contenedorAro = new THREE.Group();
  contenedorAro.add(aro);
  anillo.add(contenedorAro);

  const relleno = new THREE.Mesh(
    new THREE.CircleGeometry(RADIO_ANILLO, 64),
    new THREE.MeshBasicMaterial({ color: 0x7dd3fc, transparent: true, opacity: 0.25, depthTest: false })
  );
  relleno.rotation.x = -Math.PI / 2;
  relleno.renderOrder = 9;
  contenedorAro.add(relleno);

  const geoFlecha = new THREE.BoxGeometry(1, 0.02, 0.1);
  geoFlecha.translate(0.5, 0, 0);
  const matFlecha = new THREE.MeshBasicMaterial({ color: 0x10b981, depthTest: false });
  const flecha3D = new THREE.Mesh(geoFlecha, matFlecha);
  flecha3D.renderOrder = 11;
  anillo.add(flecha3D);

  // ---------- PANEL DEL CÍRCULO (SVG) ----------
  const C = 110, R0 = 78; // centro y radio del círculo seco en el dibujo
  const svgCirculo = document.getElementById('kamm-circulo');
  const svgReferencia = document.getElementById('kamm-referencia');
  const svgTextoRef = document.getElementById('kamm-texto-ref');
  const svgQueda = document.getElementById('kamm-queda');
  const svgFreno = document.getElementById('kamm-freno');
  const svgDoblar = document.getElementById('kamm-doblar');
  const svgSuma = document.getElementById('kamm-suma');

  // ---------- PANEL DE CABINA (SVG) ----------
  const aguja = document.getElementById('cab-aguja');
  const textoKmh = document.getElementById('cab-kmh');
  const volanteSvg = document.getElementById('cab-volante');
  const pedalFreno = document.getElementById('cab-freno');
  const pedalAcel = document.getElementById('cab-acelerador');

  // ---------- MENSAJE ----------
  const msgTitulo = document.getElementById('msg-titulo');
  const msgTexto = document.getElementById('msg-texto');
  const msgCaja = document.getElementById('mensaje');

  // ---------- CONTROLES ----------
  const ctlVel = document.getElementById('ctl-vel');
  const ctlFreno = document.getElementById('ctl-freno');
  const txtVel = document.getElementById('txt-vel');
  const txtFreno = document.getElementById('txt-freno');

  ctlVel.addEventListener('input', () => {
    velocidadEntrada = Number(ctlVel.value);
    txtVel.textContent = `${velocidadEntrada} km/h`;
    // Si todavía no llegó a la curva, se aplica en el momento
    if (modo === 'ruta' && s < INICIO_CURVA) v = velocidadEntrada / 3.6;
  });

  ctlFreno.addEventListener('input', () => {
    frenar = Number(ctlFreno.value) / 100;
    txtFreno.textContent = `${ctlFreno.value}%`;
  });

  const botonesSuelo = document.querySelectorAll('[data-suelo]');
  botonesSuelo.forEach(b => {
    b.addEventListener('click', () => {
      suelo = b.dataset.suelo;
      mundo.setSuelo(suelo);
      botonesSuelo.forEach(o => o.classList.remove('activo'));
      b.classList.add('activo');
    });
  });

  document.getElementById('btn-repetir').addEventListener('click', () => reiniciar());

  // ---------- FUNCIONES ----------
  // sInicio: metros desde donde arranca (más cerca de la curva = se espera menos)
  function reiniciar(sInicio = 30) {
    s = sInicio;
    estadoActual = '';
    v = velocidadEntrada / 3.6;
    modo = 'ruta';
    tiempoParado = 0;
    const p = puntoEnCarril(s);
    x = p.x; z = p.z; rumbo = p.rumbo;
    rumboRemolque = rumbo;
    pintarNeumaticos('normal');
  }

  function pintarNeumaticos(tipo) {
    camion.ruedas.forEach(r => {
      let color = COLOR_NEUMATICO;
      if (tipo === 'bloqueo') color = COLOR_BLOQUEADO;
      if (tipo === 'derrape' && camion.ruedasDelanteras.includes(r)) color = COLOR_PATINA;
      r.userData.materialNeumatico.color.setHex(color);
    });
  }

  function mostrarMensaje(clave) {
    if (clave === estadoActual) return;
    estadoActual = clave;
    if (alCambiarEstado) alCambiarEstado(clave);
    const m = MENSAJES[clave];
    msgTitulo.textContent = m.titulo;
    msgTexto.textContent = m.texto;
    msgCaja.classList.toggle('alerta', clave === 'derrape' || clave === 'bloqueo');
    // Destello suave al cambiar
    msgCaja.classList.remove('destello');
    void msgCaja.offsetWidth;
    msgCaja.classList.add('destello');
  }

  // Flecha SVG desde el centro hasta (dx, dy)
  function lineaSvg(el, dx, dy) {
    el.setAttribute('x2', C + dx);
    el.setAttribute('y2', C + dy);
    el.style.opacity = Math.hypot(dx, dy) < 2 ? 0 : 1;
  }

  function dibujarPaneles(radioSuelo, fuera) {
    // Círculo del suelo actual y referencia del seco
    svgCirculo.setAttribute('r', R0 * radioSuelo);
    const mostrarRef = suelo !== 'seco';
    svgReferencia.style.opacity = mostrarRef ? 1 : 0;
    svgTextoRef.style.opacity = mostrarRef ? 1 : 0;

    // Lo que queda para doblar (línea verde clara)
    const queda = Math.sqrt(Math.max(0, radioSuelo * radioSuelo - flechaFreno * flechaFreno));
    svgQueda.setAttribute('x2', C - R0 * queda);

    const limite = 1.5;
    const f = Math.min(flechaFreno, limite);
    const d = Math.min(flechaDoblar, limite);
    lineaSvg(svgFreno, 0, R0 * f);
    lineaSvg(svgDoblar, -R0 * d, 0);
    lineaSvg(svgSuma, -R0 * d, R0 * f);
    svgSuma.setAttribute('stroke', fuera ? '#ef4444' : '#10b981');
    svgSuma.setAttribute('marker-end', fuera ? 'url(#punta-roja)' : 'url(#punta-verde)');

    // Círculo y flecha en el suelo, junto a la rueda
    contenedorAro.scale.set(radioSuelo, 1, radioSuelo);
    matAnillo.color.setHex(fuera ? 0xef4444 : 0x0ea5e9);
    const largo = Math.min(Math.hypot(f, d), limite) * RADIO_ANILLO;
    flecha3D.visible = largo > 0.03;
    flecha3D.scale.x = Math.max(largo, 0.001);
    // frenar apunta hacia atrás (-X), doblar hacia la izquierda (-Z)
    flecha3D.rotation.y = Math.atan2(d, -f);
    matFlecha.color.setHex(fuera ? 0xef4444 : 0x10b981);

    // Cabina
    const kmh = v * 3.6;
    aguja.setAttribute('transform', `rotate(${-120 + Math.min(kmh, 120) * 2} 60 75)`);
    textoKmh.textContent = Math.round(kmh);
    volanteSvg.setAttribute('transform', `rotate(${-volante * 90} 150 75)`);
    const presionFreno = (modo === 'bloqueo' || (s >= INICIO_CURVA && v > 0)) ? frenar : 0;
    pedalFreno.setAttribute('transform', `translate(0 ${presionFreno * 14})`);
    pedalFreno.setAttribute('fill', presionFreno > 0 ? '#ef4444' : '#64748b');
    const acelerando = presionFreno === 0 && v > 0.1;
    pedalAcel.setAttribute('transform', `translate(0 ${acelerando ? 8 : 0})`);
    pedalAcel.setAttribute('fill', acelerando ? '#22c55e' : '#64748b');
  }

  function actualizar(dt) {
    const agarre = AGARRE[suelo];
    const agarreMax = agarre * G;           // aceleración máxima que aguanta la rueda
    const radioSuelo = agarre / AGARRE_SECO; // tamaño del círculo (1 = seco)
    let fuera = false;
    let volanteObjetivo = 0;

    if (modo === 'ruta') {
      const p = puntoEnCarril(s);
      const frenaActivo = s >= INICIO_CURVA && v > 0;
      const aFreno = frenaActivo ? frenar * FRENO_MAXIMO : 0;
      const aLateral = p.enCurva ? (v * v) / p.radio : 0;

      flechaFreno = aFreno / (AGARRE_SECO * G);
      flechaDoblar = aLateral / (AGARRE_SECO * G);
      volanteObjetivo = p.enCurva ? 1 : 0;

      if (aFreno > 0 && aFreno >= agarreMax * 0.999) {
        // Toda la fuerza va a frenar -> rueda bloqueada
        modo = 'bloqueo';
      } else if (Math.hypot(flechaFreno, flechaDoblar) > radioSuelo) {
        // La flecha se sale del círculo -> pierde adherencia
        modo = 'derrape';
      } else {
        v = Math.max(0, v - aFreno * dt);
        s += v * dt;
        const q = puntoEnCarril(s);
        x = q.x; z = q.z; rumbo = q.rumbo;

        if (v <= 0.01) mostrarMensaje('parado');
        else if (p.enCurva && aFreno > 0) mostrarMensaje('curvaFreno');
        else if (p.enCurva) mostrarMensaje('curva');
        else if (aFreno > 0) mostrarMensaje('frenoRecta');
        else mostrarMensaje('recta');

        if (s >= LARGO_TOTAL) reiniciar();
      }

      if (modo !== 'ruta') pintarNeumaticos(modo);
    }

    if (modo === 'bloqueo') {
      // Rueda bloqueada: el camión sigue derecho y frena patinando
      volanteObjetivo = 1;
      flechaFreno = radioSuelo;
      flechaDoblar = 0;
      fuera = true;
      v = Math.max(0, v - agarreMax * 0.75 * dt);
      x += v * Math.cos(rumbo) * dt;
      z -= v * Math.sin(rumbo) * dt;
      mostrarMensaje(v > 0.01 ? 'bloqueo' : 'parado');
    } else if (modo === 'derrape') {
      // Pierde adherencia: dobla mucho menos de lo que pide la curva
      volanteObjetivo = 1;
      const aFreno = frenar * FRENO_MAXIMO;
      const queda = Math.sqrt(Math.max(0, agarreMax * agarreMax - aFreno * aFreno));
      if (v > 0.5) rumbo += (queda * 0.5 / v) * dt;
      v = Math.max(0, v - Math.max(aFreno, 2.5) * dt);
      x += v * Math.cos(rumbo) * dt;
      z -= v * Math.sin(rumbo) * dt;
      flechaFreno = aFreno / (AGARRE_SECO * G);
      flechaDoblar = Math.max(flechaDoblar, radioSuelo * 0.9);
      fuera = true;
      mostrarMensaje(v > 0.01 ? 'derrape' : 'parado');
    }

    if (v <= 0.01) {
      tiempoParado += dt;
      if (tiempoParado > 3) reiniciar();
    }

    // ---------- MOVER EL CAMIÓN ----------
    camion.grupo.position.set(x, 0.06, z);
    camion.grupo.rotation.y = rumbo;

    // El semirremolque sigue a la tractora
    rumboRemolque += (v / LARGO_REMOLQUE) * Math.sin(rumbo - rumboRemolque) * dt;
    camion.remolque.rotation.y = rumboRemolque - rumbo;

    // Ruedas: giran según la velocidad (bloqueadas no giran)
    if (modo !== 'bloqueo') {
      camion.ruedas.forEach(r => { r.rotation.z -= (v / r.userData.radio) * dt; });
    }

    // Volante y ruedas delanteras
    volante += (volanteObjetivo - volante) * Math.min(1, dt * 3);
    camion.ruedasDelanteras.forEach(r => { r.rotation.y = volante * 0.3; });

    mundo.seguirSol(x, z);
    dibujarPaneles(radioSuelo, fuera || Math.hypot(flechaFreno, flechaDoblar) > radioSuelo);
  }

  // Cambiar velocidad (km/h), freno (%) y suelo desde otro lado (Modo clase)
  function configurar({ velocidad, freno, tipoSuelo }) {
    if (velocidad !== undefined) {
      ctlVel.value = velocidad;
      ctlVel.dispatchEvent(new Event('input'));
    }
    if (freno !== undefined) {
      ctlFreno.value = freno;
      ctlFreno.dispatchEvent(new Event('input'));
    }
    if (tipoSuelo) document.querySelector(`[data-suelo="${tipoSuelo}"]`).click();
  }

  reiniciar();

  return {
    actualizar,
    reiniciar,
    configurar,
    alCambiarEstado: fn => { alCambiarEstado = fn; },
    inicioCurva: INICIO_CURVA,
    posicion: () => camion.grupo.position
  };
}