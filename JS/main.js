// ===== MENÚ HAMBURGUESA =====
const hamburger = document.getElementById('navHamburger');
const navMobile = document.getElementById('navMobile');

if (hamburger && navMobile) {
  hamburger.addEventListener('click', function () {
    navMobile.classList.toggle('open');
    hamburger.textContent = navMobile.classList.contains('open') ? '✕' : '☰';
  });
}
// ===== BOTÓN INTERCAMBIAR CIUDADES =====
bindIntercambiarBoton('btnIntercambiar', 'origen', 'destino', {
  dispatchEvents: true,
  focusAfter: 'destino'
});
// ===== FECHA MÍNIMA (hoy) =====
const inputFecha = document.getElementById('fecha');
if (inputFecha) {
  const hoy = new Date().toISOString().split('T')[0];
  inputFecha.min = hoy;
  inputFecha.value = hoy;
}

// ===== BOTÓN BUSCAR =====
const btnBuscar = document.getElementById('btnBuscar');
if (btnBuscar) {
  btnBuscar.addEventListener('click', function () {
    const origen = document.getElementById('origen')?.value || '';
    const destino = document.getElementById('destino')?.value || '';
    const fecha = document.getElementById('fecha')?.value || '';
    const pasajeros = document.getElementById('pasajeros')?.value || '';
    const errorEl = document.getElementById('busquedaError');

    // Usar la función de validación
    const resultado = validarBusquedaPasajes(origen, destino, fecha, pasajeros);

    if (!resultado.valido) {
      mostrarError('busquedaError', resultado.mensaje);
      return;
    }

    limpiarError('busquedaError');
    // Aquí iría la lógica de búsqueda real (API, etc.)
    alert(`Buscando pasajes de ${origen} → ${destino} para el ${fecha}`);
  });
}

// ===== FAQ ACORDEÓN =====
document.querySelectorAll('.faq-pregunta').forEach(function (btn) {
  btn.addEventListener('click', function () {
    const item = btn.closest('.faq-item');
    const estaAbierto = item.classList.contains('open');
    // Cerrar todos
    document.querySelectorAll('.faq-item').forEach(function (el) { 
      el.classList.remove('open'); });
    // Abrir el clickeado si estaba cerrado
    if (!estaAbierto) item.classList.add('open');
  });
});
