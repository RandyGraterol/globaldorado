const producto = document.querySelectorAll('.peliculaDiv');

producto.forEach( producto =>{
let estrella = producto.querySelectorAll('.estrella');
let sumaEstrellas;
let estrellaModificable = true;

for (let x = 0; x < estrella.length; x++){

  estrella[x].addEventListener('mouseenter', () => {

    if(estrellaModificable){
     
    if (estrella[x].src.includes('estrellaYellow.png')){
      // Si la estrella ya está seleccionada, se desmarcan todas las estrellas
      for(let i = 0; i < estrella.length ; i++){
    
        estrella[i].src = '/icon/startBlue.png';

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
      let PeliculaId = estrella[4].dataset.pelicula_id;
     
     // const puntuacionElement = producto.querySelector('.puntuacion[data-producto_id="' + productoID + '"]');
      
      const data = {
          puntuacion: sumaEstrellas,
          PeliculaId
        };

        fetch('/puntuaciones', {
          method: 'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(res => res.json())
          .then(response => {
          
          if(response.interruptor !==true){
          
          let contenedorP = producto.querySelectorAll('.puntuacion');
          let contenedor = producto.querySelectorAll('.contenedorPuntuacion');

           for(let f = 0 ; f < contenedorP.length;f++){

           contenedorP[f].style='display:none';
           let mensaje= document.createElement('P');
           mensaje.innerHTML=`Puntuación Total : ${response.puntuacion}`;
           let frag = document.createDocumentFragment();
           frag.append(mensaje);
           contenedor[f].append(frag);
           
           }
         
         // Muestra la imagen en un diálogo modal
         Swal.fire({
         title: '¡Gracias por su puntuacion!',
         html: '<img src="/icon/estrellaYellow.png" width="30" alt="Mi imagen">',
         showCloseButton: true,
         showConfirmButton: false
         }); 
          // estrella[4].src='/icon/estrellaYellow.png';
          
           // Actualizar la puntuación en el elemento correspondiente
              console.log(`Respuesta del servidor "Puntuacion" ${response.puntuacion}. pts`);          
         }else{ 

            Swal.fire('Imposible volver a calificar la pelicula');
            
          console.log('el usuario ya califico el producto en la parte del cliente');
         }

          })
          .catch(error =>{
            console.error('Error al enviar la puntuación:', error);
          });
           
      }else{
           estrellaModificable=true;
           alert('Debe seleccionar una estrella');
           estrella[4].src='/icon/startBlue.png'
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
});
