function App() {}

window.onload = function(event){
  let app = new App();
  window.app = app;

  // Iniciar el temporizador
  setInterval(function() {
    const btnNext = document.querySelector('[data-button="button-next"]');
    btnNext.click();
  }, 30000); // 4000 milisegundos = 4 segundos
}

App.prototype.processingButton = function(event){
  const btn = event.currentTarget;
  const carruselList = event.currentTarget.parentNode;
  const track = event.currentTarget.parentNode.querySelector('#track');
  const carrusel = track.querySelectorAll('.carrusel');

  const carruselWidth = carrusel[0].offsetWidth;
  const trackWidth=track.offsetWidth;
  const listWidth = carruselList.offsetWidth;

  track.style.left == "" ? leftPosition = track.style.left = 0 : leftPosition = parseFloat(track.style.left.slice(0,-2) * -1);
  btn.dataset.button == 'button-prev' ? prevAction(leftPosition,carruselWidth,track) : nextAction(leftPosition,trackWidth,listWidth,carruselWidth,track,carrusel);
}



let prevAction = (leftPosition,carruselWidth,track)=>{
  if(leftPosition > 0){
    track.style.left=`${-1 * (leftPosition - carruselWidth)}px`;
  }
}
let nextAction = (leftPosition, trackWidth, listWidth, carruselWidth, track, carrusel) => {
  if (leftPosition < (trackWidth - listWidth)) {
    track.style.left = `${-1 * (leftPosition + carruselWidth)}px`;
  } else {
  // Reiniciar la posición al inicio y mover el último carrusel al principio
  track.style.left = '0px';
  const lastCarrusel = carrusel[carrusel.length - 1];
  track.insertBefore(lastCarrusel, carrusel[0]);
  }
};