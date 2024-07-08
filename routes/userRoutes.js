const verifyToken = require('../middleware/verifyToken.js'); // Importar verifyToken
const Recaptcha = require('express-recaptcha').RecaptchaV2;
const recaptcha = new Recaptcha('6Ldlt8kpAAAAAHlpQ9tKPkzoSAJfWhI-9blLs3Pd','6Ldlt8kpAAAAAMQY4fNwRhE50l9AAxECPoqTGC4E');
const upload = require('../utils/multer.js');
const { getUsers, createUser,index,loginGet,registerGet,main,construccion,loginPost,logout,restablecerGet,alertRegistro,eliminarMensajeRegistro,RestablecerRun,restablecerPost,RestablecerRunPost,peliculasClient,puntuaciones,contactanos,cursosClient,capacitacion,librosClient,streaming,hojaCalculo,afiliacion,publicarF} = require('../controllers/userControllers.js');


const express = require('express');
const userRoutes = express.Router();

//rutas GET
userRoutes.get('/',index);
userRoutes.get('/login',loginGet);
userRoutes.get('/register',registerGet);
userRoutes.get('/main',main);
userRoutes.get('/construccion',construccion);
userRoutes.get('/users', getUsers);
userRoutes.get('/logout',logout);
userRoutes.get('/restablecer',restablecerGet);
userRoutes.get('/alertRegistro',alertRegistro);
userRoutes.get('/eliminarMensajeRegistro',eliminarMensajeRegistro);
userRoutes.get('/RestablecerRun',RestablecerRun);
userRoutes.get('/peliculasClient',peliculasClient);
userRoutes.get('/cursosClient',cursosClient);
userRoutes.get('/capacitacion',capacitacion);
userRoutes.get('/librosClient',librosClient);
userRoutes.get('/streaming',streaming);
userRoutes.get('/hojaCalculo',hojaCalculo);
userRoutes.get('/afiliacion',afiliacion);
userRoutes.get('/publicarF',publicarF);
//rutas POST
userRoutes.post('/users',createUser);
userRoutes.post('/login',loginPost);
userRoutes.post('/restablecerPost',restablecerPost);
userRoutes.post("/RestablecerRun",RestablecerRunPost);
userRoutes.post('/puntuaciones',puntuaciones);
userRoutes.post('/contactanos',contactanos);

module.exports = userRoutes;