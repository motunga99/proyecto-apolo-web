// ==========================================
// VENTANAS QUE SE PUEDEN MOVER (como en Windows)
// Se agarran de su barra de arriba y se llevan adonde no molesten.
// Funciona con mouse y con el dedo. Recuerda dónde quedó cada una.
// ==========================================

function leer(clave) {
    try { return JSON.parse(localStorage.getItem('claseboba-ventana-' + clave)); } catch (e) { return null; }
  }
  function guardar(clave, valor) {
    try { localStorage.setItem('claseboba-ventana-' + clave, JSON.stringify(valor)); } catch (e) { /* sin memoria, no pasa nada */ }
  }
  
  // Que la ventana no se vaya fuera de la pantalla
  function dentroDePantalla(el, x, y) {
    const ancho = Math.min(el.offsetWidth, window.innerWidth);
    const maxX = Math.max(0, window.innerWidth - ancho);
    const maxY = Math.max(0, window.innerHeight - 44); // que siempre quede a la vista la barra
    // Nunca debajo de la barra de arriba de la página (para que no la tape)
    const barra = document.querySelector('.barra');
    const minY = barra ? barra.getBoundingClientRect().bottom + 8 : 0;
    return {
      x: Math.min(Math.max(0, x), maxX),
      y: Math.min(Math.max(minY, y), Math.max(minY, maxY))
    };
  }
  
  function colocar(el, x, y) {
    const p = dentroDePantalla(el, x, y);
    el.style.left = p.x + 'px';
    el.style.top = p.y + 'px';
    el.style.right = 'auto';
    el.style.bottom = 'auto';
    el.style.transform = 'none';
    return p;
  }
  
  // el: la ventana. agarre: la parte de donde se agarra. clave: nombre para recordarla.
  export function hacerMovible(el, agarre, clave) {
    if (!el || !agarre) return;
    agarre.classList.add('agarre');
  
    const guardada = leer(clave);
    if (guardada) colocar(el, guardada.x, guardada.y);
  
    let arrastrando = false;
    let difX = 0, difY = 0;
  
    agarre.addEventListener('pointerdown', e => {
      // Los botones dentro de la barra siguen funcionando normal
      if (e.target.closest('button')) return;
      const r = el.getBoundingClientRect();
      colocar(el, r.left, r.top);
      difX = e.clientX - r.left;
      difY = e.clientY - r.top;
      arrastrando = true;
      agarre.setPointerCapture(e.pointerId);
      el.classList.add('moviendose');
      e.preventDefault();
    });
  
    agarre.addEventListener('pointermove', e => {
      if (!arrastrando) return;
      colocar(el, e.clientX - difX, e.clientY - difY);
    });
  
    const soltar = e => {
      if (!arrastrando) return;
      arrastrando = false;
      el.classList.remove('moviendose');
      const r = el.getBoundingClientRect();
      guardar(clave, { x: r.left, y: r.top });
    };
    agarre.addEventListener('pointerup', soltar);
    agarre.addEventListener('pointercancel', soltar);
  
    // Si cambia el tamaño de la pantalla, que no quede afuera
    window.addEventListener('resize', () => {
      if (el.style.left) colocar(el, parseFloat(el.style.left), parseFloat(el.style.top));
    });
  }
  
  // Botón "–" para achicar la ventana a una barrita
  export function hacerAchicable(el, boton) {
    if (!el || !boton) return;
    boton.addEventListener('click', () => {
      const achicada = el.classList.toggle('achicada');
      boton.textContent = achicada ? '+' : '–';
      boton.title = achicada ? 'Mostrar' : 'Achicar';
    });
  }