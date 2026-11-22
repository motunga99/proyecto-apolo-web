// ==========================================
// ESCENA: PAPELES DEL TRANSPORTE (viaje nacional, Mercancías)
// La ruta de siempre, el camión de Proyecto Apolo con bandera española,
// edificios al costado y los vehículos que no necesitan autorización.
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
  const carga = caja(largo - 1.5, alto, 2.0, 0.12, tipo === 'funebre' ? 0x111827 : tipo === 'blindado' ? 0x64748b : 0xf8fafc);
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

export function crearEscenaPapeles(escena, camara) {
  const mundo = crearMundo(escena);
  mundo.seguirSol(-20, 0);

  // ---------- OBJETOS ----------
  const objetos = {};
  function registrar(nombre, obj, x, z, rotY = 0) {
    obj.position.set(x, 0, z);
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

  // Edificios (del otro lado de la ruta, entre los árboles)
  registrar('apolo', crearEdificio('PROYECTO APOLO · TRANSPORTES', 0xe0e7ff, 0x4f46e5, '#4f46e5'), -41, -14);
  registrar('frutas', crearEdificio('FRUTAS LÓPEZ', 0xfef3c7, 0xd97706, '#d97706'), -27, -14);
  registrar('fabrica', crearEdificio('MUEBLES ANA · FÁBRICA', 0xffedd5, 0xc2410c, '#c2410c'), -13, -14);
  registrar('web', placaTexto('www.proyectoapolo.com.ar', 7, 1.1, { fondo: '#0f172a', color: '#22d3ee' }), -55, -12);
  // Oficina de Transportes (la que da la autorización)
  registrar('oficina', crearEdificio('TRANSPORTES · COMUNIDAD AUTÓNOMA', 0xdcfce7, 0x15803d, '#15803d'), 3, -15);
  objetos.web.position.y = 3;
  objetos.web.userData.base.y = 3;
  objetos.web.userData.objetivo.y = 3;

  // El camión de Proyecto Apolo, con bandera española
  const camion = crearCamion();
  [1, -1].forEach(lado => {
    const b = bandera(0.62, 0.42);
    b.position.set(1.75, 1.3, lado * 1.112);
    if (lado < 0) b.rotation.y = Math.PI;
    camion.tractora.add(b);
  });
  const mastil = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.1, 8), new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.5 }));
  mastil.position.set(1.4, 3.55, 0.85);
  camion.tractora.add(mastil);
  const banderita = bandera(0.6, 0.4);
  banderita.position.set(1.1, 3.85, 0.85);
  camion.tractora.add(banderita);
  const p0 = puntoEnCarril(36);
  registrar('camion', camion.grupo, p0.x, p0.z);
  camion.grupo.position.y = 0.02;
  camion.grupo.userData.base.y = 0.02;
  camion.grupo.userData.objetivo.y = 0.02;

  // Personas
  registrar('vos', crearPersona(0xa78bfa), -36, 4.2, Math.PI / 2);
  registrar('lopez', crearPersona(0x34d399, 0x111827), -26, -9.5);
  registrar('ana', crearPersona(0xfb923c, 0xd97706), -10.5, -9.5);
  registrar('inspector', crearPersona(0x1e3a8a, 0x111827), -31.5, 4.8, -Math.PI / 2);

  // El camión propio de Muebles Ana (privado complementario)
  registrar('camionAna', crearVehiculo('camion', 0xea580c, 'MUEBLES ANA', '#c2410c'), -15.5, -9.2);
  // Una furgoneta chica (para la regla del peso)
  registrar('furgoneta', crearVehiculo('furgoneta', 0x0ea5e9, 'REPARTOS', '#0369a1'), -28, 5.6);

  // Los que no necesitan autorización (fila del lado de la cámara)
  registrar('oficial', crearVehiculo('furgoneta', 0x1d4ed8, 'AYUNTAMIENTO', '#1d4ed8'), -8, 7);
  registrar('funebre', crearVehiculo('funebre', 0x111827, 'FUNERARIA'), -1.5, 7);
  registrar('blindado', crearVehiculo('blindado', 0x334155, 'TRANSPORTE DE DINERO'), 5, 7);
  registrar('grua', crearVehiculo('grua', 0xf59e0b, 'GRÚA'), 11.5, 7);
  registrar('moto', crearVehiculo('moto', 0xdc2626), -9, 11.5);
  registrar('ambulancia', crearVehiculo('furgoneta', 0xffffff, 'MEDICAMENTOS · URGENCIA', '#dc2626'), -1, 11.5);
  registrar('tractor', crearVehiculo('tractor', 0x16a34a), 7, 11.5);

  // Tarjetas de autorización que aparecen sobre cada vehículo
  function tarjeta(clave, subtitulo, fondo) {
    const g = new THREE.Group();
    const base = placaTexto(clave, 2.6, 1.0, { fondo, color: '#ffffff', tamano: 0.7 });
    g.add(base);
    const sub = placaTexto(subtitulo, 2.6, 0.42, { fondo: '#0f172a', color: '#e2e8f0', tamano: 0.6 });
    sub.position.y = -0.72;
    g.add(sub);
    return g;
  }
  const pc = puntoEnCarril(36);
  registrar('tarjetaMDPE', tarjeta('MDPE', 'Público · más de 3,5 t', '#16a34a'), pc.x + 1, pc.z);
  registrar('tarjetaMDLE', tarjeta('MDLE', 'Público · hasta 3,5 t', '#0284c7'), -28, 5.6);
  registrar('tarjetaMPCE', tarjeta('MPCE', 'Privado complementario', '#ea580c'), -15.5, -9.2);
  [['tarjetaMDPE', 6.6], ['tarjetaMDLE', 4.6], ['tarjetaMPCE', 6.2]].forEach(([n, y]) => {
    objetos[n].position.y = y; objetos[n].userData.base.y = y; objetos[n].userData.objetivo.y = y;
  });

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
  crearEtiqueta('globo', arriba('vos', 2.6));
  crearEtiqueta('vos', arriba('vos', 2.6));
  crearEtiqueta('camion', () => objetos.camion.position.clone().add(new THREE.Vector3(1.5, 5.4, 0)));
  crearEtiqueta('apolo', arriba('apolo', 6.6));
  crearEtiqueta('frutas', arriba('frutas', 6.6));
  crearEtiqueta('fabrica', arriba('fabrica', 6.6));
  crearEtiqueta('lopez', arriba('lopez', 2.6));
  crearEtiqueta('inspector', arriba('inspector', 2.6));
  crearEtiqueta('ana', arriba('ana', 2.6));
  crearEtiqueta('camionAna', arriba('camionAna', 4.4));
  crearEtiqueta('furgoneta', arriba('furgoneta', 3.2));
  ['oficial', 'funebre', 'blindado', 'grua', 'ambulancia'].forEach(n => crearEtiqueta(n, arriba(n, 3.4)));
  crearEtiqueta('moto', arriba('moto', 2.6));
  crearEtiqueta('tractor', arriba('tractor', 3.2));
  crearEtiqueta('cielo', () => new THREE.Vector3(-14, 9, -6));
  crearEtiqueta('oficina', arriba('oficina', 6.6));
  crearEtiqueta('cieloOficina', () => new THREE.Vector3(-4, 8.5, -8));

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
  // Mueve el camión a un punto de la ruta (s = metros recorridos)
  function camionA(s, inmediato = false) {
    const p = puntoEnCarril(s);
    const o = objetos.camion;
    o.userData.objetivo.set(p.x, 0.02, p.z);
    if (inmediato) o.position.copy(o.userData.objetivo);
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

  return { mostrar, yaVisible, etiqueta, camionA, tipo, limpiar, actualizar, ubicarEtiquetas };
}
