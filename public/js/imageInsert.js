// Esperar a que se cargue completamente el documento HTML
document.addEventListener('DOMContentLoaded', function() {
 const container = document.querySelector('.containerIsert');
for(let x = 0 ; x < 3 ; x++){
let div = document.createElement('DIV');
let img = document.createElement('IMG');
div.classList.add('img_box');
div.classList.add(`box-${x}`);
img.src=`/img/libros/mentes.png`;
div.append(img);
container.append(div);
}
});



