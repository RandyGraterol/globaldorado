const contactForm = document.querySelector('#contactForm');

contactForm.addEventListener('submit',(e)=>{
e.preventDefault();
const name = document.getElementById('name').value;
const telefono = document.getElementById('telefono').value;
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

const data = {name,telefono,email,password};

fetch('/users',{
	method:'post',
	headers:{
		'Content-Type':'application/json'
	},
	body:JSON.stringify(data)
})
.then(res=>res.json())
.then(res=>{
	if(res.interruptor == 'A'){
		Swal.fire('¡Ya estas registrado , intenta con otros datos!')
	}else if(res.interruptor == 'B'){
        Swal.fire('¡Te haz registrado exitosamente!')
		.then(()=>{
		window.location.href='/login';
		})
	}else{
	   Swal.fire('¡Uff , algo salio mal , intenta mas tarde!')
	   .then(()=>{
	   	location.reload();
	   })
	}
})

});