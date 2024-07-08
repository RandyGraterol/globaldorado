const perspectiva = document.querySelector('.perspectiva');
const perspectivaContainer = document.querySelector('.perspectiva-container');

window.addEventListener('scroll', () => {
  const distanciaAlTop = perspectivaContainer.getBoundingClientRect().top;
  const alturaVentana = window.innerHeight;
  
  console.log(alturaVentana,'altura de la ventana');
  console.log(distanciaAlTop,'diststancia al top');

  if (distanciaAlTop < alturaVentana) {
    perspectiva.classList.remove('oculto');
  } else {
    perspectiva.classList.add('oculto');
  }
},{ passive: true });




