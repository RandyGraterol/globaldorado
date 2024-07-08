  const formulario = document.getElementById('contactForm');
        formulario.addEventListener('submit',(e)=>{
        e.preventDefault();
        const data = new FormData(formulario);
        const correo = data.get('correo');
        const contrasena = data.get('contrasena');

        fetch('/login',{
            method:'post',
            headers:{
            'Content-Type':'application/json'
            },
            body:JSON.stringify({correo,contrasena})
        })
        .then(res=>res.json())
        .then(respuesta =>{
         if(!respuesta.interruptor){
          Swal.fire('¡Correo o Contraseña Incorrectos , vuelve a intentarlo!')
         }else{
            localStorage.setItem('token', respuesta.token);
            window.location.href='/main';
         }
        })


        });