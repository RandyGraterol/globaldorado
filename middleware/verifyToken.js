const jwt = require('jsonwebtoken');
const secretKey = 'randy';
function verifyToken(req, res, next) {
  
  const token = req.cookies.token;

  if (token){
    // Verificar y decodificar el token
    jwt.verify(token,secretKey,(err, decodedToken)=>{
      if (err){
        // Error de verificación del token
        res.redirect('/login');
      } else {
        //Token válido, almacenar los datos decodificados en el objeto de solicitud para su uso posterior
        req.user = decodedToken;
        console.log('datos del token desde el middleware JWT',req.user);
        next();
      }
    });
  } else {
    console.log(`TOKEN : ${token}`);
    // No se proporcionó el token
     res.json({error:'xxxxxxxxxxxxxxxxxxxxxx'});
  }
}

module.exports = verifyToken;

