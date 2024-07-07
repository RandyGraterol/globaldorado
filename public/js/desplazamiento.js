
  // Selecciona todos los enlaces de navegación que apuntan a secciones internas
  const links = document.querySelectorAll('a[href^="#"]');

  // Agrega un controlador de eventos a cada enlace
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Evita el comportamiento predeterminado del enlace

      // Obtiene el destino del enlace (el elemento con el id correspondiente)
      const target = document.querySelector(link.getAttribute('href'));

      // Desplázate suavemente al destino
      target.scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
