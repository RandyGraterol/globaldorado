const formulario = document.getElementById('formularioContacto');




formulario.addEventListener('submit',(e) => {
  e.preventDefault(); // Prevenir el comportamiento predeterminado
const nombre = document.getElementById('nombre').value;
const telefono = document.getElementById('telefono').value;
const email = document.getElementById('email').value;
const mensaje = document.getElementById('mensaje').value;

const data = {
	nombre,
	telefono,
	email,
	mensaje
}
  fetch('/contactanos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(res => {
      if (res.message == true) {
        Swal.fire({
          title: '¡Su mensaje a sido enviado!',
          html: '<img src="/icon/mensaje.png" width="30" alt="Mi imagen">',
          showCloseButton: true,
          showConfirmButton: false
        });
      }
      else{
      	Swal.fire({
          title: '¡Ya haz enviado un mensaje!',
          html: '<img src="/icon/mensaje.png" width="30" alt="Mi imagen">',
          showCloseButton: true,
          showConfirmButton: false
        });
      }
    });
});