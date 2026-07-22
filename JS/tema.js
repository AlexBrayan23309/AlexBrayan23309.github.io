// ===== MODO OSCURO (usa la clase 'dark' que reconoce Tailwind) =====
(function () {
  const CLASE_OSCURO = 'dark';
  const CLAVE_STORAGE = 'peruexpress-tema';

  function aplicarIconos(esOscuro) {
    document.querySelectorAll('.icono-tema').forEach(function (icono) {
      icono.textContent = esOscuro ? '☀️' : '🌙';
    });
    document.querySelectorAll('.texto-tema').forEach(function (texto) {
      texto.textContent = esOscuro ? 'Modo claro' : 'Modo oscuro';
    });
    document.querySelectorAll('.switch-tema, .switch-tema-mobile').forEach(function (etiqueta) {
      etiqueta.setAttribute('title', esOscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    });
    document.querySelectorAll('.input-tema, .input-tema-mobile').forEach(function (interruptor) {
      interruptor.checked = esOscuro;
    });
  }

  function alternarTema(esOscuro) {
    document.documentElement.classList.toggle(CLASE_OSCURO, esOscuro);
    localStorage.setItem(CLAVE_STORAGE, esOscuro ? 'oscuro' : 'claro');
    aplicarIconos(esOscuro);
  }

  document.addEventListener('DOMContentLoaded', function () {
    const esOscuro = document.documentElement.classList.contains(CLASE_OSCURO);
    aplicarIconos(esOscuro);

    document.querySelectorAll('.input-tema, .input-tema-mobile').forEach(function (interruptor) {
      interruptor.addEventListener('change', function () {
        alternarTema(interruptor.checked);
      });
    });
  });
})();
