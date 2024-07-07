const rutaC  = document.getElementById('rutaC');

rutaC.addEventListener('click', (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local

  fetch('/cursosClient',{
    headers:{
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
});

