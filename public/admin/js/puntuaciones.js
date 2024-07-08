

let estrella = document.querySelectorAll('.estrella');
let sumaEstrellas;
let estrellaModificable = true;

for (let x = 0; x < estrella.length; x++){

  estrella[x].addEventListener('mouseenter', () => {

    if(estrellaModificable){
     
    if (estrella[x].src.includes('estrellaYellow.png')){
      // Si la estrella ya está seleccionada, se desmarcan todas las estrellas
      for(let i = 0; i < estrella.length ; i++){

        estrella[i].src = '/icon/estrella.png';

      }
      
      sumaEstrellas = 0;
      console.log('valor reseteado',sumaEstrellas);

    } else {
      // Si la estrella no está seleccionada, se marcan todas las estrellas hasta la posición actual
      for(let i = 0; i <= x; i++) {
        console.log(x,'longitud de X');
        localStorage.setItem('longitud',x);
        estrella[i].src = '/icon/estrellaYellow.png';
        sumaEstrellas = parseInt(estrella[i].dataset.valor);
        console.log('valor de la suma de las estrellas',sumaEstrellas);
      }

    }

    }

  });
  ///////////////////////////////////////////////////////////
  estrella[x].addEventListener('click',()=>{

   if(estrellaModificable){

   estrellaModificable=false;
   
 //Aqui tengo que cambiar algo luego-----------------
       
      if(estrella[x].src.includes('estrellaYellow.png')){
      //enviar puntuacion a la base de datos
      //let productoID = estrella[4].dataset.producto_id;
     
     // const puntuacionElement = producto.querySelector('.puntuacion[data-producto_id="' + productoID + '"]');
      const u = document.querySelector('.estrellas');
      const usuario = u.dataset.usuario;

       const data ={
          puntuacion:sumaEstrellas,
          usuario
        };
        console.log(data);
       fetch('http://195.200.1.171:5000/puntuacionCheing',{
            method:'post',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
       .then(res=>res.json())
       .then(res=>{
        if(res.interruptor == 'A'){
          console.log(`ranking :${res.r}`);
          const calificaServicios = document.querySelector('.calificaServicios');
          calificaServicios.style='display:none';
        const contenedorPuntuacion = document.querySelector('.contenedorPuntuacion');
        const p = document.createElement('P');
        p.textContent=`Ranking: ${res.r}`;
        contenedorPuntuacion.append(p);
        Swal.fire('¡Ranking creado con exito , gracias por calificar!');
        }else if(res.interruptor == 'B'){
        Swal.fire('¡No puedes volver a calificar!');
        }else{
          console.log(`ranking :${res.r}`);
          const calificaServicios = documeºnt.querySelector('.calificaServicios');
          calificaServicios.style='display:none';
          const contenedorPuntuacion = document.querySelector('.contenedorPuntuacion');
        const p = document.createElement('P');
        p.textContent=`Ranking: ${res.r}`;
        contenedorPuntuacion.append(p);
         Swal.fire('¡Ranking Actualizado!');
        }
       })

      }else{
           estrellaModificable=true;
           Swal.fire('¡Debes seleccionar una estrella como minimo!');
           estrella[4].src='/icon/estrella.png'
      }


   }//condicional estrella modificable



  });//evento click

   //estrellas persistentes despues de la carga de la pagina
   window.addEventListener('load', () => {
      let longitud = localStorage.getItem('longitud');
      if (longitud !== null){
        longitud = parseInt(longitud);
        for (let i = 0; i <= longitud; i++) {
          estrella[i].src = '/icon/estrellaYellow.png';
        }
      //estrellaModificable=false;
      }
    });

}//fin del bucle for principal de x

