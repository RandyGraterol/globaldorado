/*!
* Start Bootstrap - Coming Soon v6.0.7 (https://startbootstrap.com/theme/coming-soon)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-coming-soon/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

const form = document.getElementById('contactForm');

form.addEventListener('submit',e=>{
e.preventDefault();
const password1 = document.querySelector('.password1').value;
const password2 = document.querySelector('.password2');
const email =  password2.dataset.email;
console.log(`email desde el cliente restablecerRun ${email}`);
const data = {
	password:password1,
	correo:email
}
if(password1 !== password2.value){
Swal.fire('Las contraseñas no coinciden , vuelve a intentarlo');
}else{
 fetch('/RestablecerRun',{
 	method:'post',
 	headers:{
 		"Content-Type":"application/json"
 	},
 	body:JSON.stringify(data)
 })
 .then(res=>res.json())
 .then(respuesta=>{
 	if (respuesta.message == true){
 	Swal.fire('La contraseña se a cambiado exitosamente')	
 	.then(()=>{
 		window.location.href='/login';
 	})
 	}else{
    Swal.fire('No se a podido restablecer la contraseña')	
 	.then(()=>{
 		window.location.href='/restablecer';
 	})
 	}
 })
}

})