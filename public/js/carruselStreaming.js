function App() {}

window.onload = function (event) {
  let app = new App();
  window.app = app;

  // Iniciar el temporizador
  setInterval(function () {
    const btnNext = document.querySelector('[data-button="button-next"]');
    btnNext.click();
  }, 30000); // 4000 milisegundos = 4 segundos
};

App.prototype.processingButton = function (event) {
  const btn = event.currentTarget;
  const carruselList = event.currentTarget.parentNode;
  const track = event.currentTarget.parentNode.querySelector('#track');
  const carrusel = track.querySelectorAll('.carrusel');

  const carruselWidth = carrusel[0].offsetWidth;
  const trackWidth = track.offsetWidth;
  const listWidth = carruselList.offsetWidth;

  track.style.left == "" ? leftPosition = track.style.left = 0 : leftPosition = parseFloat(track.style.left.slice(0, -2) * -1);
  btn.dataset.button == 'button-prev' ? prevAction(leftPosition, carruselWidth, track, 2) : nextAction(leftPosition, trackWidth, listWidth, carruselWidth, track, carrusel, 2);
};

let prevAction = (leftPosition, carruselWidth, track, spaces) => {
  if (leftPosition > 0) {
    track.style.left = `${-1 * (leftPosition - carruselWidth * spaces)}px`;
  }
};

let nextAction = (leftPosition, trackWidth, listWidth, carruselWidth, track, carrusel, spaces) => {
  const maxSpaces = Math.floor((trackWidth - listWidth) / carruselWidth);
  if (leftPosition < (trackWidth - listWidth)) {
    const newPosition = leftPosition + carruselWidth * spaces;
    if (newPosition <= (trackWidth - listWidth)) {
      track.style.left = `${-1 * newPosition}px`;
    } else {
      track.style.left = `${-1 * (trackWidth - listWidth)}px`;
    }
  } else {
    // Reiniciar la posición al inicio y mover los últimos carruseles al principio
    const numCarruselToMove = spaces % maxSpaces;
    let i;
    for (i = 0; i < numCarruselToMove; i++) {
      const lastCarrusel = carrusel[carrusel.length - 1];
      track.insertBefore(lastCarrusel, carrusel[0]);
    }
    track.style.left = '0px';
  }
};