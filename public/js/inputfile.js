const inputFile = document.getElementById('img');
    const label = document.querySelector('.input-file');

const formulario = document.getElementById('formulario');

formulario.addEventListener('submit',e=>{
if(inputFile.files.length === 0){
e.preventDefault();
Swal.fire('¡Debe seleccionar una Imagen!')
}

});

inputFile.addEventListener('change',()=>{
label.textContent='';
label.textContent='¡Imagen Seleccionada!';
label.style='background:rgb(255, 183, 67);color:black;font-weight:bold';
     
});