// ==========================================
// ESCENA 3D: SOCIEDADES
// A la izquierda: lo tuyo (casa y auto). A la derecha: tu empresa.
// En el medio, la línea que separa (o no) lo tuyo de lo de la empresa.
// Todo se mueve suave, sin rebotes.
// ==========================================
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { crearCamion } from './camion.js';

// ---------- AYUDAS ----------
function caja(largo, alto, ancho, radio, color, extra = {}) {
  const m = new THREE.Mesh(
    new RoundedBoxGeometry(largo, alto, ancho, 3, radio),
    new THREE.MeshStandardMaterial({ color, roughness: 0.5, ...extra })
  );
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

// Texto dibujado sobre una placa (carteles)
function placaTexto(texto, largo, alto, { fondo = null, color = '#0f172a', peso = 900, tamano = 0.62, degradado = null } = {}) {
  const lienzo = document.createElement('canvas');
  lienzo.width = 1024;
  lienzo.height = Math.round(1024 * alto / largo);
  const ctx = lienzo.getContext('2d');
  const textura = new THREE.CanvasTexture(lienzo);
  textura.colorSpace = THREE.SRGBColorSpace;
  textura.anisotropy = 8;

  function dibujar() {
    ctx.clearRect(0, 0, lienzo.width, lienzo.height);
    if (fondo) {
      ctx.fillStyle = fondo;
      const r = lienzo.height * 0.25;
      ctx.beginPath();
      ctx.roundRect(0, 0, lienzo.width, lienzo.height, r);
      ctx.fill();
    }
    let t = lienzo.height * tamano;
    ctx.font = `${peso} ${t}px Nunito, sans-serif`;
    while (ctx.measureText(texto).width > lienzo.width * 0.9 && t > 8) {
      t -= 2;
      ctx.font = `${peso} ${t}px Nunito, sans-serif`;
    }
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (degradado) {
      const w = ctx.measureText(texto).width;
      const g = ctx.createLinearGradient(lienzo.width / 2 - w / 2, 0, lienzo.width / 2 + w / 2, 0);
      g.addColorStop(0, degradado[0]);
      g.addColorStop(1, degradado[1]);
      ctx.fillStyle = g;
    } else {
      ctx.fillStyle = color;
    }
    ctx.fillText(texto, lienzo.width / 2, lienzo.height / 2 + t * 0.04);
    textura.needsUpdate = true;
  }
  dibujar();
  if (document.fonts) document.fonts.load('900 100px Nunito').then(dibujar).catch(() => {});

  const placa = new THREE.Mesh(
    new THREE.PlaneGeometry(largo, alto),
    new THREE.MeshStandardMaterial({ map: textura, transparent: true, roughness: 0.6 })
  );
  return placa;
}

// ---------- PERSONAJES Y OBJETOS ----------
function crearPersona(colorRemera, colorPelo = 0x6b4423) {
  const p = new THREE.Group();
  const piel = 0xf5c9a6;
  const matPiel = new THREE.MeshStandardMaterial({ color: piel, roughness: 0.6 });

  [-0.15, 0.15].forEach(x => {
    const pierna = caja(0.24, 0.8, 0.26, 0.08, 0x334155);
    pierna.position.set(x, 0.4, 0);
    p.add(pierna);
    const zapato = caja(0.26, 0.12, 0.36, 0.05, 0x1e293b);
    zapato.position.set(x, 0.06, 0.05);
    p.add(zapato);
  });

  const cuerpo = caja(0.72, 0.9, 0.42, 0.16, colorRemera);
  cuerpo.position.y = 1.25;
  p.add(cuerpo);

  const cabeza = new THREE.Mesh(new THREE.SphereGeometry(0.33, 32, 24), matPiel);
  cabeza.position.y = 1.98;
  cabeza.castShadow = true;
  p.add(cabeza);

  const pelo = new THREE.Mesh(
    new THREE.SphereGeometry(0.345, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: colorPelo, roughness: 0.8 })
  );
  pelo.position.y = 2.02;
  pelo.rotation.x = -0.25;
  p.add(pelo);

  const matOjo = new THREE.MeshStandardMaterial({ color: 0x0f172a });
  [-0.11, 0.11].forEach(x => {
    const ojo = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), matOjo);
    ojo.position.set(x, 2.0, 0.3);
    p.add(ojo);
  });
  const sonrisa = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.018, 8, 16, Math.PI), matOjo);
  sonrisa.position.set(0, 1.9, 0.31);
  sonrisa.rotation.z = Math.PI;
  p.add(sonrisa);

  // Brazos con hombro como bisagra
  const brazos = [];
  [-1, 1].forEach(lado => {
    const hombro = new THREE.Group();
    hombro.position.set(lado * 0.47, 1.62, 0);
    const brazo = caja(0.2, 0.72, 0.2, 0.08, colorRemera);
    brazo.position.y = -0.34;
    hombro.add(brazo);
    const mano = new THREE.Mesh(new THREE.SphereGeometry(0.11, 16, 12), matPiel);
    mano.position.y = -0.74;
    hombro.add(mano);
    p.add(hombro);
    brazos.push(hombro);
  });

  function pensar(siNo) {
    // Mano derecha al mentón
    const derecho = brazos[1];
    derecho.rotation.set(siNo ? -2.35 : 0, 0, siNo ? 0.55 : 0);
  }

  return { grupo: p, pensar };
}

function crearCasa() {
  const g = new THREE.Group();
  const base = caja(3, 2.1, 2.6, 0.12, 0xfef3c7);
  base.position.y = 1.05;
  g.add(base);
  const techo = new THREE.Mesh(new THREE.ConeGeometry(2.45, 1.5, 4), new THREE.MeshStandardMaterial({ color: 0xf87171, roughness: 0.5 }));
  techo.position.y = 2.85;
  techo.rotation.y = Math.PI / 4;
  techo.castShadow = true;
  g.add(techo);
  const puerta = caja(0.6, 1.1, 0.08, 0.06, 0x92400e);
  puerta.position.set(0, 0.56, 1.31);
  g.add(puerta);
  [-0.9, 0.9].forEach(x => {
    const ventana = caja(0.55, 0.5, 0.08, 0.05, 0x93c5fd);
    ventana.position.set(x, 1.3, 1.31);
    g.add(ventana);
  });
  return g;
}

function crearAuto() {
  const g = new THREE.Group();
  const cuerpo = caja(2.6, 0.6, 1.3, 0.2, 0x60a5fa);
  cuerpo.position.y = 0.6;
  g.add(cuerpo);
  const cabina = caja(1.4, 0.55, 1.15, 0.2, 0x93c5fd);
  cabina.position.set(-0.15, 1.12, 0);
  g.add(cabina);
  const matRueda = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
  [[0.85, 0.66], [0.85, -0.66], [-0.85, 0.66], [-0.85, -0.66]].forEach(([x, z]) => {
    const r = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.25, 24), matRueda);
    r.rotation.x = Math.PI / 2;
    r.position.set(x, 0.32, z);
    r.castShadow = true;
    g.add(r);
  });
  return g;
}

// Cartel grande en el techo que dice qué tipo de empresa es (se puede cambiar)
function crearCartelTipo() {
  const lienzo = document.createElement('canvas');
  lienzo.width = 1024;
  lienzo.height = 220;
  const ctx = lienzo.getContext('2d');
  const textura = new THREE.CanvasTexture(lienzo);
  textura.colorSpace = THREE.SRGBColorSpace;
  textura.anisotropy = 8;
  let actual = { texto: '', fondo: '#4f46e5' };

  function dibujar() {
    ctx.clearRect(0, 0, lienzo.width, lienzo.height);
    ctx.fillStyle = actual.fondo;
    ctx.beginPath();
    ctx.roundRect(8, 8, lienzo.width - 16, lienzo.height - 16, 50);
    ctx.fill();
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
    let t = 120;
    ctx.font = `900 ${t}px Nunito, sans-serif`;
    while (ctx.measureText(actual.texto).width > lienzo.width * 0.88 && t > 10) {
      t -= 2;
      ctx.font = `900 ${t}px Nunito, sans-serif`;
    }
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(actual.texto, lienzo.width / 2, lienzo.height / 2 + 6);
    textura.needsUpdate = true;
  }
  if (document.fonts) document.fonts.load('900 100px Nunito').then(dibujar).catch(() => {});

  const grupo = new THREE.Group();
  const placa = new THREE.Mesh(new THREE.PlaneGeometry(5.6, 1.2), new THREE.MeshStandardMaterial({ map: textura, transparent: true, roughness: 0.5, emissive: 0xffffff, emissiveIntensity: 0.15, emissiveMap: textura }));
  placa.position.y = 0.9;
  grupo.add(placa);
  [-2, 2].forEach(x => {
    const poste = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.6, 8), new THREE.MeshStandardMaterial({ color: 0x475569 }));
    poste.position.set(x, 0.2, -0.05);
    grupo.add(poste);
  });

  function poner(texto, fondo) {
    actual = { texto, fondo };
    dibujar();
  }
  return { grupo, poner };
}

function crearEmpresa() {
  const g = new THREE.Group();
  const nave = caja(5.2, 3, 3.6, 0.2, 0xe0e7ff);
  nave.position.y = 1.5;
  g.add(nave);
  const techo = caja(5.5, 0.3, 3.9, 0.12, 0x6366f1);
  techo.position.y = 3.1;
  g.add(techo);
  const porton = caja(2.4, 2, 0.08, 0.08, 0x94a3b8);
  porton.position.set(0.6, 1.02, 1.81);
  g.add(porton);
  for (let i = 0; i < 5; i++) {
    const raya = caja(2.3, 0.04, 0.09, 0.02, 0x64748b);
    raya.position.set(0.6, 0.4 + i * 0.35, 1.83);
    g.add(raya);
  }
  // Cartel con la marca
  const cartel = placaTexto('PROYECTO APOLO', 4.6, 0.75, { fondo: '#ffffff', degradado: ['#2563eb', '#4f46e5'] });
  cartel.position.set(0, 2.55, 1.83);
  g.add(cartel);
  return g;
}

function crearMonedas() {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.5, roughness: 0.3, emissive: 0x7a5c00, emissiveIntensity: 0.15 });
  const pilas = [[0, 0, 7], [0.55, 0.15, 5], [-0.5, 0.2, 6], [0.15, -0.5, 4]];
  pilas.forEach(([x, z, n]) => {
    for (let i = 0; i < n; i++) {
      const m = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.08, 24), mat);
      m.position.set(x, 0.05 + i * 0.09, z);
      m.castShadow = true;
      g.add(m);
    }
  });
  return g;
}

// ---------- LA ESCENA ----------
export function crearEscenaSociedades(escena, camara) {
  escena.background = new THREE.Color(0xe0f2fe);
  escena.fog = new THREE.Fog(0xe0f2fe, 40, 90);

  // Luces
  escena.add(new THREE.HemisphereLight(0xffffff, 0xc7d2fe, 2.2));
  const sol = new THREE.DirectionalLight(0xfffbeb, 2.6);
  sol.position.set(8, 16, 12);
  sol.castShadow = true;
  sol.shadow.mapSize.set(2048, 2048);
  sol.shadow.camera.left = -16;
  sol.shadow.camera.right = 16;
  sol.shadow.camera.top = 16;
  sol.shadow.camera.bottom = -16;
  sol.shadow.bias = -0.0005;
  escena.add(sol);

  // Piso
  const piso = new THREE.Mesh(new THREE.CircleGeometry(30, 64), new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.9 }));
  piso.rotation.x = -Math.PI / 2;
  piso.receiveShadow = true;
  escena.add(piso);

  // Zonas en el piso
  const zonaMia = new THREE.Mesh(new THREE.PlaneGeometry(13, 12), new THREE.MeshStandardMaterial({ color: 0xd1fae5, roughness: 0.9 }));
  zonaMia.rotation.x = -Math.PI / 2;
  zonaMia.position.set(-7, 0.01, 0.5);
  zonaMia.receiveShadow = true;
  escena.add(zonaMia);
  const zonaEmpresa = new THREE.Mesh(new THREE.PlaneGeometry(13, 12), new THREE.MeshStandardMaterial({ color: 0xe0e7ff, roughness: 0.9 }));
  zonaEmpresa.rotation.x = -Math.PI / 2;
  zonaEmpresa.position.set(7, 0.01, 0.5);
  zonaEmpresa.receiveShadow = true;
  escena.add(zonaEmpresa);

  const textoMio = placaTexto('LO TUYO', 4, 0.9, { color: '#047857' });
  textoMio.rotation.x = -Math.PI / 2;
  textoMio.position.set(-7, 0.03, 5.6);
  escena.add(textoMio);
  const textoEmpresa = placaTexto('TU EMPRESA', 5, 0.9, { color: '#4338ca' });
  textoEmpresa.rotation.x = -Math.PI / 2;
  textoEmpresa.position.set(7, 0.03, 5.6);
  escena.add(textoEmpresa);

  // Cartel de publicidad al fondo
  const publicidad = new THREE.Group();
  [-3.2, 3.2].forEach(x => {
    const poste = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 4, 12), new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.4, roughness: 0.4 }));
    poste.position.set(x, 2, 0);
    poste.castShadow = true;
    publicidad.add(poste);
  });
  const marco = caja(7.2, 1.9, 0.2, 0.12, 0x1e293b);
  marco.position.y = 4.3;
  publicidad.add(marco);
  const cartelWeb = placaTexto('www.proyectoapolo.com.ar', 6.8, 1.5, { fondo: '#ffffff', degradado: ['#0ea5e9', '#6366f1'], tamano: 0.42 });
  cartelWeb.position.set(0, 4.3, 0.11);
  publicidad.add(cartelWeb);
  publicidad.position.set(0, 0, -7.5);
  escena.add(publicidad);

  // ---------- OBJETOS QUE APARECEN Y DESAPARECEN ----------
  const objetos = {};
  function registrar(nombre, obj, posicion) {
    obj.position.copy(posicion);
    obj.userData.posBase = posicion.clone();
    obj.userData.posObjetivo = posicion.clone();
    obj.userData.escala = 0;
    obj.userData.escalaObjetivo = 0;
    obj.userData.escalaNormal = obj.scale.x || 1;
    obj.scale.setScalar(0.0001);
    obj.visible = false;
    escena.add(obj);
    objetos[nombre] = obj;
    return obj;
  }

  registrar('casa', crearCasa(), new THREE.Vector3(-8.2, 0, -1.6));
  registrar('auto', crearAuto(), new THREE.Vector3(-5.2, 0, 2.6));
  const empresaObj = crearEmpresa();
  const cartelTipo = crearCartelTipo();
  cartelTipo.grupo.position.set(0, 3.25, 0.6);
  empresaObj.add(cartelTipo.grupo);
  registrar('empresa', empresaObj, new THREE.Vector3(7.2, 0, -1.8));
  registrar('monedas', crearMonedas(), new THREE.Vector3(4.6, 0, 1.6));

  // Mesa de la junta (la reunión de los dueños)
  const mesa = new THREE.Group();
  const tabla = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 0.12, 40), new THREE.MeshStandardMaterial({ color: 0xa16207, roughness: 0.5 }));
  tabla.position.y = 0.95;
  tabla.castShadow = true;
  mesa.add(tabla);
  const pata = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.25, 0.9, 16), new THREE.MeshStandardMaterial({ color: 0x78350f }));
  pata.position.y = 0.45;
  mesa.add(pata);
  const papel = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.02, 0.36), new THREE.MeshStandardMaterial({ color: 0xffffff }));
  papel.position.set(0.1, 1.02, 0.1);
  mesa.add(papel);
  registrar('mesa', mesa, new THREE.Vector3(2.2, 0, 2.4));

  const camion = crearCamion();
  camion.grupo.scale.setScalar(0.42);
  registrar('camion', camion.grupo, new THREE.Vector3(9.6, 0.02, 2.6));

  const persona = crearPersona(0xa78bfa);
  registrar('persona', persona.grupo, new THREE.Vector3(-0.2, 0, 2.6));
  const socio2 = crearPersona(0x34d399, 0x111827);
  registrar('socio2', socio2.grupo, new THREE.Vector3(2.3, 0, 3.6));
  const socio3 = crearPersona(0xfb923c, 0xd97706);
  registrar('socio3', socio3.grupo, new THREE.Vector3(4.2, 0, 4.4));
  const socio4 = crearPersona(0x60a5fa, 0x1f2937); // el socio nuevo (ampliación de capital)
  registrar('socio4', socio4.grupo, new THREE.Vector3(5.9, 0, 5.6));

  // Línea del medio y pared protectora
  const matLinea = new THREE.MeshStandardMaterial({ color: 0x22d3ee, emissive: 0x22d3ee, emissiveIntensity: 0.6 });
  const linea = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.04, 12), matLinea);
  registrar('linea', linea, new THREE.Vector3(0.9, 0.03, 0.5));
  const pared = new THREE.Mesh(
    new THREE.BoxGeometry(0.15, 3.2, 12),
    new THREE.MeshStandardMaterial({ color: 0x22d3ee, emissive: 0x22d3ee, emissiveIntensity: 0.35, transparent: true, opacity: 0.28, depthWrite: false })
  );
  registrar('pared', pared, new THREE.Vector3(0.9, 1.6, 0.5));

  // ---------- ACCIONES: los 60.000 € partidos en pedacitos ----------
  const CANT_ACCIONES = 60;
  const acciones = new THREE.InstancedMesh(
    new RoundedBoxGeometry(0.42, 0.06, 0.3, 2, 0.02),
    new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.4, emissive: 0x14532d, emissiveIntensity: 0.2 }),
    CANT_ACCIONES
  );
  acciones.castShadow = true;
  acciones.frustumCulled = false; // se reparten por toda la escena
  escena.add(acciones);
  const origenAcciones = [];
  const destinoAcciones = [];
  const duenos = [objetos.persona, objetos.socio2, objetos.socio3];
  for (let i = 0; i < CANT_ACCIONES; i++) {
    // Pila arriba de las monedas
    origenAcciones.push(new THREE.Vector3(4.6 + (i % 4) * 0.08 - 0.12, 1.2 + Math.floor(i / 4) * 0.07, 1.6 + ((i % 2) - 0.5) * 0.1));
    // Repartidas: 40 para él, 10 para cada socio, apiladas al lado de sus pies
    const cual = i < 40 ? 0 : (i < 50 ? 1 : 2);
    const n = cual === 0 ? i : (cual === 1 ? i - 40 : i - 50);
    const columnas = cual === 0 ? 4 : 2;
    const dueno = duenos[cual];
    destinoAcciones.push(dueno.userData.posBase.clone().add(new THREE.Vector3(
      0.75 + (n % columnas) * 0.46,
      0.05 + Math.floor(n / columnas) * 0.07,
      0.3
    )));
  }
  // ---------- ACCIONES NUEVAS: la ampliación de capital (20 más, color dorado) ----------
  const CANT_NUEVAS = 20;
  const nuevas = new THREE.InstancedMesh(
    new RoundedBoxGeometry(0.42, 0.06, 0.3, 2, 0.02),
    new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.4, emissive: 0x78350f, emissiveIntensity: 0.25 }),
    CANT_NUEVAS
  );
  nuevas.castShadow = true;
  nuevas.frustumCulled = false;
  nuevas.visible = false;
  escena.add(nuevas);
  const origenNuevas = [];
  const destinoNuevas = [];
  for (let i = 0; i < CANT_NUEVAS; i++) {
    // Salen de la empresa
    origenNuevas.push(objetos.empresa.userData.posBase.clone().add(new THREE.Vector3(-2.2 + (i % 4) * 0.08, 0.1 + Math.floor(i / 4) * 0.07, 2.2)));
    // Llegan a los pies del socio nuevo
    destinoNuevas.push(objetos.socio4.userData.posBase.clone().add(new THREE.Vector3(0.75 + (i % 2) * 0.46, 0.05 + Math.floor(i / 2) * 0.07, 0.3)));
  }
  let kNuevas = 0, kNuevasObjetivo = 0;
  let nuevasVisibles = false;

  let kAcciones = 0, kAccionesObjetivo = 0;
  let accionesVisibles = false;
  const mAux = new THREE.Matrix4();
  const vAux = new THREE.Vector3();
  const qAux = new THREE.Quaternion();
  const eAux = new THREE.Euler();
  const sAux = new THREE.Vector3(1, 1, 1);

  function dibujarAcciones() {
    acciones.visible = accionesVisibles;
    if (!accionesVisibles) return;
    for (let i = 0; i < CANT_ACCIONES; i++) {
      vAux.lerpVectors(origenAcciones[i], destinoAcciones[i], kAcciones);
      vAux.y += Math.sin(Math.PI * kAcciones) * (2 + (i % 5) * 0.3); // vuelan en arco
      eAux.set(0, kAcciones * (i % 7), Math.sin(Math.PI * kAcciones) * 1.5);
      qAux.setFromEuler(eAux);
      mAux.compose(vAux, qAux, sAux);
      acciones.setMatrixAt(i, mAux);
    }
    acciones.instanceMatrix.needsUpdate = true;
  }

  function dibujarNuevas() {
    nuevas.visible = nuevasVisibles;
    if (!nuevasVisibles) return;
    for (let i = 0; i < CANT_NUEVAS; i++) {
      vAux.lerpVectors(origenNuevas[i], destinoNuevas[i], kNuevas);
      vAux.y += Math.sin(Math.PI * kNuevas) * (2 + (i % 5) * 0.3);
      eAux.set(0, kNuevas * (i % 7), Math.sin(Math.PI * kNuevas) * 1.5);
      qAux.setFromEuler(eAux);
      mAux.compose(vAux, qAux, sAux);
      nuevas.setMatrixAt(i, mAux);
    }
    nuevas.instanceMatrix.needsUpdate = true;
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
  const arriba = (obj, alto) => () => obj.position.clone().add(new THREE.Vector3(0, alto * (obj.scale.y / (obj.userData.escalaNormal || 1)), 0));
  crearEtiqueta('globo', arriba(objetos.persona, 2.75));
  crearEtiqueta('casa', arriba(objetos.casa, 4.1));
  crearEtiqueta('auto', arriba(objetos.auto, 1.9));
  crearEtiqueta('deuda', () => objetos.empresa.userData.posBase.clone().add(new THREE.Vector3(0, 6.3, 0)));
  crearEtiqueta('monedas', arriba(objetos.monedas, 1.9));
  crearEtiqueta('persona', arriba(objetos.persona, 2.75));
  crearEtiqueta('socio2', arriba(objetos.socio2, 3.7)); // más alto, para no pisar a los de al lado
  crearEtiqueta('socio3', arriba(objetos.socio3, 2.75));
  crearEtiqueta('socio4', arriba(objetos.socio4, 3.7));
  crearEtiqueta('registro', () => objetos.empresa.userData.posBase.clone().add(new THREE.Vector3(-1.2, 6.3, 1.0)));
  crearEtiqueta('escritura', () => objetos.empresa.userData.posBase.clone().add(new THREE.Vector3(-3.2, 2.2, 3.2)));
  crearEtiqueta('pared', () => objetos.pared.userData.posBase.clone().add(new THREE.Vector3(0, 3.5, 3)));
  crearEtiqueta('mesa', () => objetos.mesa.userData.posBase.clone().add(new THREE.Vector3(0, 5.2, -1)));

  // ---------- LO QUE SE PUEDE PEDIR DESDE LOS PASOS ----------
  function mostrar(nombre, siNo = true) {
    const o = objetos[nombre];
    o.userData.escalaObjetivo = siNo ? o.userData.escalaNormal : 0;
    if (siNo) {
      o.visible = true;
      o.userData.posObjetivo.copy(o.userData.posBase);
    }
  }

  function etiqueta(nombre, html = null, tipo = '') {
    const e = etiquetas[nombre];
    if (html === null) {
      e.visible = false;
    } else {
      // Solo un globo de diálogo a la vez, para que no se encimen
      if (tipo === 'globo') {
        Object.entries(etiquetas).forEach(([otro, o]) => {
          if (otro !== nombre && o.el.classList.contains('globo')) o.visible = false;
        });
      }
      // Aparece con un destello de luz para que se note
      e.el.innerHTML = `<div class="etq-in">${html}</div>`;
      e.el.className = 'etiqueta3d ' + tipo;
      void e.el.offsetWidth;
      e.el.classList.add('aparece');
      e.visible = true;
    }
  }

  // Se lo llevan para pagar la deuda (va hacia la empresa y desaparece)
  function llevarse(nombre) {
    const o = objetos[nombre];
    o.userData.posObjetivo.copy(objetos.empresa.userData.posBase).add(new THREE.Vector3(-1.5, 0, 1.5));
    o.userData.escalaObjetivo = 0;
  }

  function acciones_(estado, inmediato = false) {
    // 'no' | 'pila' | 'repartidas'
    accionesVisibles = estado !== 'no';
    kAccionesObjetivo = estado === 'repartidas' ? 1 : 0;
    if (estado === 'pila' || inmediato) kAcciones = kAccionesObjetivo;
  }

  function accionesNuevas(estado, inmediato = false) {
    // 'no' | 'pila' | 'repartidas'
    nuevasVisibles = estado !== 'no';
    kNuevasObjetivo = estado === 'repartidas' ? 1 : 0;
    if (estado === 'pila' || inmediato) kNuevas = kNuevasObjetivo;
  }

  // Color de los pedacitos del capital: verde = acciones (SA), naranja = participaciones (SL)
  const COLOR_ACCIONES = { color: 0x22c55e, brillo: 0x14532d };
  function colorAcciones(color = COLOR_ACCIONES.color, brillo = COLOR_ACCIONES.brillo) {
    acciones.material.color.setHex(color);
    acciones.material.emissive.setHex(brillo);
  }

  function pensar(siNo) { persona.pensar(siNo); }

  // Qué tipo de empresa es (cartel del techo)
  const TIPOS = {
    autonomo: { texto: 'AUTÓNOMO', fondo: '#059669' },
    sa: { texto: 'SOCIEDAD ANÓNIMA (SA)', fondo: '#4f46e5' },
    sl: { texto: 'SOCIEDAD LIMITADA (SL)', fondo: '#ea580c' },
    laboral: { texto: 'SOCIEDAD LABORAL', fondo: '#0d9488' },
    cooperativa: { texto: 'COOPERATIVA', fondo: '#9333ea' },
    otras: { texto: 'OTRAS SOCIEDADES', fondo: '#64748b' }
  };
  function tipo(clave) {
    cartelTipo.grupo.visible = !!clave;
    if (clave) cartelTipo.poner(TIPOS[clave].texto, TIPOS[clave].fondo);
  }

  // Deja todo como al principio, al instante
  function limpiar() {
    Object.values(objetos).forEach(o => {
      o.userData.escala = 0;
      o.userData.escalaObjetivo = 0;
      o.userData.posObjetivo.copy(o.userData.posBase);
      o.position.copy(o.userData.posBase);
      o.scale.setScalar(0.0001);
      o.visible = false;
    });
    Object.keys(etiquetas).forEach(n => etiqueta(n, null));
    accionesVisibles = false;
    kAcciones = 0;
    kAccionesObjetivo = 0;
    colorAcciones();
    nuevasVisibles = false;
    kNuevas = 0;
    kNuevasObjetivo = 0;
    persona.pensar(false);
  }

  // Aparece al instante (para arrancar un paso ya armado)
  function yaVisible(nombre) {
    const o = objetos[nombre];
    o.visible = true;
    o.userData.escala = o.userData.escalaNormal;
    o.userData.escalaObjetivo = o.userData.escalaNormal;
    o.scale.setScalar(o.userData.escalaNormal);
  }

  // ---------- CADA CUADRO ----------
  const vPantalla = new THREE.Vector3();
  let tiempo = 0;
  function actualizar(dt) {
    tiempo += dt;
    const suave = 1 - Math.exp(-dt * 4);
    Object.values(objetos).forEach(o => {
      o.userData.escala += (o.userData.escalaObjetivo - o.userData.escala) * suave;
      const s = Math.max(0.0001, o.userData.escala);
      o.scale.setScalar(s);
      o.position.lerp(o.userData.posObjetivo, suave);
      if (o.userData.escalaObjetivo === 0 && o.userData.escala < 0.01) o.visible = false;
    });
    // La pared brilla suave
    pared.material.opacity = 0.22 + Math.sin(tiempo * 2) * 0.06;

    kAcciones += (kAccionesObjetivo - kAcciones) * (1 - Math.exp(-dt * 1.2));
    dibujarAcciones();
    kNuevas += (kNuevasObjetivo - kNuevas) * (1 - Math.exp(-dt * 1.2));
    dibujarNuevas();
  }

  // Las etiquetas se ubican siempre (aunque esté en pausa)
  function ubicarEtiquetas() {
    Object.values(etiquetas).forEach(e => {
      if (!e.visible) { e.el.style.opacity = 0; return; }
      vPantalla.copy(e.ancla()).project(camara);
      const detras = vPantalla.z > 1;
      e.el.style.opacity = detras ? 0 : 1;
      e.el.style.left = ((vPantalla.x + 1) / 2 * window.innerWidth) + 'px';
      e.el.style.top = ((1 - vPantalla.y) / 2 * window.innerHeight) + 'px';
    });
  }

  return { mostrar, yaVisible, etiqueta, llevarse, acciones: acciones_, accionesNuevas, colorAcciones, pensar, tipo, limpiar, actualizar, ubicarEtiquetas };
}
