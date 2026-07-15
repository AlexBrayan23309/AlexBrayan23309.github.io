(function () {
  const CLASE_OSCURO = 'dark-mode';
  const CLAVE_STORAGE = 'peruexpress-tema';

  function aplicarIconos(esOscuro) {
    document.querySelectorAll('.icono-tema').forEach(function (icono) {
      icono.textContent = esOscuro ? '☀️' : '🌙';
    });
    document.querySelectorAll('.texto-tema').forEach(function (texto) {
      texto.textContent = esOscuro ? 'Modo claro' : 'Modo oscuro';
    });
    document.querySelectorAll('.btn-tema, .btn-tema-mobile').forEach(function (btn) {
      btn.setAttribute('aria-pressed', esOscuro ? 'true' : 'false');
      btn.setAttribute('title', esOscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    });
  }

  function alternarTema() {
    const esOscuro = document.documentElement.classList.toggle(CLASE_OSCURO);
    localStorage.setItem(CLAVE_STORAGE, esOscuro ? 'oscuro' : 'claro');
    aplicarIconos(esOscuro);
  }

  document.addEventListener('DOMContentLoaded', function () {
    const esOscuro = document.documentElement.classList.contains(CLASE_OSCURO);
    aplicarIconos(esOscuro);

    document.querySelectorAll('.btn-tema, .btn-tema-mobile').forEach(function (btn) {
      btn.addEventListener('click', alternarTema);
    });
  });
})();
