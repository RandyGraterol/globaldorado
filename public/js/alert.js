fetch('/alertRegistro')
		.then(res=> res.json())
		.then(respuesta=>{
			let ocultar;
			if(respuesta.mensaje == false){
				console.log('No se recibio nada de la ruta "mensajeDeRegistro" ');
			}else{
				 ocultar =document.querySelectorAll('.ocultar');
				for(let x = 0;x < ocultar.length;x++){
				 ocultar[x].style.display='none';	
				}
				console.log('--_--_--'+respuesta.mensaje+'--_--_--');
				Swal.fire('¡Se ha Registrado Exitosamente!')
				.then(()=>{
					fetch('/eliminarMensajeRegistro')
					.then(res=>res.json())
					.then(respuesta2=>{
				         for(let x = 0;x < ocultar.length;x++){
				         ocultar[x].style.display='flex';	
			           	}
									  
					})
				});
			}
		})
	