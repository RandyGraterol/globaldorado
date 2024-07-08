function session(req, res, next) {
  if (req.session.loggedIn) {
    next(); // El usuario ha iniciado sesión, continuar con la siguiente ruta
  } else {
    res.redirect('/error'); // Redirigir a la página de inicio de sesión
  }
}
module.exports=session;