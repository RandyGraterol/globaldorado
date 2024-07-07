const sequelize = require('../config/database');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const redis = require('redis');
const client = redis.createClient();

const userss = require('../models/User');
const tablaPuntuaciones =require('../models/puntuaciones');
const puntuacionesCursos = require('../models/puntuacionesCursos');
const puntuacionesLibros = require('../models/puntuacionesLibros');

const peliculass = require('../models/peliculas');
const cursos = require('../models/cursos.js');
const contacto = require('../models/contacto.js');
const libros = require('../models/libros.js');

const {Op} = require('sequelize');
//definiendo clave foranea

peliculass.hasOne(tablaPuntuaciones);
tablaPuntuaciones.belongsTo(peliculass);


cursos.hasOne(puntuacionesCursos,{
  foreignKey: 'cursoId',
  as: 'Puntuacione'
});
puntuacionesCursos.belongsTo(cursos,{
  foreignKey: 'cursoId',
  as: 'curso'
});



libros.hasOne(puntuacionesLibros,{
  foreignKey: 'libroId',
  as: 'Puntuacione'
});
puntuacionesLibros.belongsTo(libros,{
  foreignKey: 'libroId',
  as: 'libro'
});

//Mnesaje de Bienvenida
const transporter = nodemailer.createTransport({
  service:'Gmail',
  auth:{
    user:'elrandygraterol@gmail.com',
    pass:'ifrayiqntzduuita'
  }
});
//////////////////////////////////////////////////////
//Mensaje de recuperacion
const transporter2 = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'elrandygraterol@gmail.com',
    pass: 'ifrayiqntzduuita'
  }
});
//////////////////////////////////////////////////////
const getUsers = async (req,res) => {
  try {
    const users = await userss.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};
//////////////////////////////////////////////////////
const createUser = async (req,res) =>{

try{
const {name,telefono,email,password} = req.body;
const token = "false";
const u = await userss.findOne({where:{correo:email}});
if(u){
  res.json({interruptor:'A'})
}else{
 const newUser = await userss.create({ nombre:name,telefono,correo:email,contrasena:password,token});
  res.json({interruptor:'B'}); 
}
}catch (error){
console.error(error);
res.json({interruptor:'C'});
}

};
/////////////////////////////////////////////////////
 const index = async (req,res)=>{
  try{
    const  movies = await peliculass.findAll();
    const book = await libros.findAll();
    res.render('index',{movies,book});
    console.log(movies,'Pagina Principal');
  }catch(error){
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
 }
//////////////////////////////////////////////////

const loginGet = async (req,res)=>{
  try{
  res.render('login');  
}catch(error){
    console.error(error);
    res.status(500).send('Error en el servidor'); 
}
 
}
/////////////////////////////////////////////////
const loginPost = async (req,res)=>{

  const useR ={
   id:0,
   nombre:"",
   telefono:"",
   correo:"",
   contrasena:""
  }

  try{
    const secretKey = 'randy';
    
    const {correo,contrasena} = req.body;
     
    const usuario = await userss.findOne({ where: { correo, contrasena}});
    console.log(usuario,"Usuario");
    if(usuario){

      if(usuario.correo === correo && usuario.contrasena === contrasena){

       useR.id=usuario.id;
       useR.nombre=usuario.nombre;
       useR.telefono=usuario.telefono;
       useR.correo=usuario.correo;
       useR.contrasena=usuario.contrasena;
  
       const tokenn = jwt.sign(useR,secretKey,{expiresIn:'1h'});
       const T='sitieKey';
       await userss.update({token:T},{where:{correo}}); 
        res.json({interruptor:true,tokenn});
    }

    }else{
      res.json({interruptor:false});
    }
    
   
}catch(error){
    console.error(error);
    res.status(500).send('Error en el servidor'); 
}
 
}

/////////////////////////////////////////////////
const registerGet = async (req,res)=>{
  try{
  res.render('register');  
}catch(error){
    console.error(error);
    res.status(500).send('Error en el servidor'); 
}
 
}
////////////////////////////////////////////////
const main = async (req,res)=>{
  try{
  //const usuario = req.user.nombre;
  res.render('main',/*{name:usuario}*/);  
}catch(error){
    console.error(error);
    res.status(500).send('Error en el servidor puto'); 
}
 
}
////////////////////////////////////////////////
const construccion = async (req,res)=>{
  try{
  res.render('run');  
}catch(error){
    console.error(error);
    res.status(500).send('Error en el servidor'); 
}
 
}
////////////////////////////////////////////////
const logout = async (req,res)=>{
  try{
  res.clearCookie('token');
  res.redirect('/');
}catch(error){
    console.error(error);
    res.status(500).send('Error en el servidor'); 
}
}
///////////////////////////////////////////////
const restablecerGet = async (req,res)=>{
try{
  res.render('restablecer');
}catch(error){
    console.error(error);
    res.status(500).send('Error en el servidor'); 
}
}
////////////////////////////////////////////////
const alertRegistro = async (req,res)=>{
try{
const registro = req.cookies.registro;
if(typeof registro !== 'undefined'){
res.json({mensaje:registro});
}else{
  res.json({mensaje:false});
}
}catch(error){
    console.error(error);
    res.status(500).send('Error en el servidor'); 
}
}
////////////////////////////////////////////////
const eliminarMensajeRegistro = async (req,res)=>{
  try{
   if(typeof req.cookies.registro !== 'undefined'){
 res.clearCookie('registro'); 
 res.json({mensaje:'Mensaje_Eliminadooo'});
}else{
  res.json({mensaje:false});
}
  }catch(error){
     console.error(error);
     res.status(500).send('Error en el servidor'); 
  }
}

////////////////////////////////////////////////
const restablecerPost = async (req,res)=>{
try{
const email = req.body.email;
const usuario = await userss.findOne({where:{correo:email}});
console.log(usuario,"+++++++++++++++++++++");
if(!usuario){
 res.json({respuesta:false});
}else{
  //const UserName = req.user.nombre;
// Generar un token único
  const token = crypto.randomBytes(20).toString('hex');
  // Almacenar el token en tu base de datos o en una estructura de datos adecuada junto con la información del usuario
 res.cookie('securityToken',token,{httpOnly:true,secure:true});
  // Crear la URL de recuperación de contraseña
  const recoveryURL = `http://172.25.56.15:5000/restablecerRun?token=${token}&email=${email}`;
  // Enviar el correo electrónico de recuperación de contraseña
  const mailOptions = {
    from: 'elrandygraterol@gmail.com',
    to: email,
    subject: 'Recuperación de contraseña',
    text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${recoveryURL}`
  };
  transporter2.sendMail(mailOptions, (error, info) =>{
    if (error) {
      console.log(error);
      res.send('Error al enviar el correo electrónico de recuperación de contraseña');
    } else {
      console.log('Correo electrónico de recuperación de contraseña enviado:', info.response);
    }
});
 res.json({respuesta:true}); 
} 
}catch(error){
  console.error(error);
  res.status(500).send('Error en el servidor');
}
}
///////////////////////////////////////////////
const RestablecerRun = async (req,res)=>{
try{
const token = req.query.token;
const email = req.query.email;
console.log(email,'email');
//const UserName = req.query.userName;
//const tokenCookies = req.cookies.securityToken;
//console.log(UserName);
//console.log(tokenCookies,'tokenCookies');
//console.log(token,'token');
 res.render('restablecerRun',{email});
}catch(error){
 console.error(error);
 res.status(500).send('Error en el servidor'); 
}

}
///////////////////////////////////////////////
const RestablecerRunPost = async (req,res)=>{
try{
 const { password, correo } = req.body;
 console.log(`contraseña recibida en el servidor ${password} correo = ${correo}`);
 const updatedRows = await userss.update({ contrasena:password },{where:{correo}});
 if (updatedRows[0] === 0) {
  res.json({message:false});
  }else{
   res.json({message:true});
  }
}catch(error){
  console.error(error);
  res.status(500).send('Error en el servidor');
}
}
//////////////////////////////////////////////
const peliculasClient = async (req,res)=>{
try{
    let movies = await peliculass.findAll({
      include:[{
        model: tablaPuntuaciones,
        as: 'Puntuacione',
        required:false,
        where: { PeliculaId: sequelize.col('Peliculas.id') }
      }]
    });
  // Aquí puedes acceder a la información de las películas y sus puntuaciones
  console.log('**** Puntuaciones****',movies);
  res.render('./client/clientPeliculasDD.ejs',{movies,tabla:'Peliculas'});
}catch(error){
console.error(error.message); 
}

}
/////////////////////////////////////////////
const librosClient = async(req,res)=>{
try{
    let movies = await libros.findAll({
      include: [{
        model: puntuacionesLibros,
        as: 'Puntuacione',
        required:false,
        where: {libroId:sequelize.col('Libros.id')}
      }]
    });
  // Aquí puedes acceder a la información de las películas y sus puntuaciones
  console.log('**** Puntuaciones****',movies);
  res.render('./client/clientPeliculasDD.ejs',{movies,tabla:'Libros'});
}catch(error){
console.error(error.message); 
}

}
/////////////////////////////////////////////
const cursosClient = async (req,res)=>{
try{
    let movies = await cursos.findAll({
      include: [{
        model: puntuacionesCursos,
        as: 'Puntuacione',
        required:false,
        where: { cursoId: sequelize.col('Cursos.id') }
      }]
    });
  // Aquí puedes acceder a la información de las películas y sus puntuaciones
  console.log('**** Puntuaciones****',movies);
  res.render('./client/clientPeliculasDD.ejs',{movies,tabla:'Cursos'});
}catch(error){
console.error(error.message); 
}

}
/////////////////////////////////////////////
const puntuaciones = async (req,res)=>{
  try{
     const user = req.user.nombre;
     const {puntuacion,PeliculaId} = req.body;
     const puntuacionT = await tablaPuntuaciones.findOne({where:{PeliculaId}});
   // Obtener la puntuación actual del producto
  //                               operador ternario
  const puntuacionActual = puntuacionT ? puntuacionT.puntuacion : 0;
   
  // Calcular la nueva puntuación sumando la puntuación actual con la nueva puntuación
  const nuevaPuntuacion = puntuacionActual + puntuacion;
  console.log(nuevaPuntuacion,'[[[[[[[[[[[[[[[Nueva puntuacion]]]]]]]]]]]]]]]]');
   
  if(puntuacionActual == 0){

const newPuntuacion = await tablaPuntuaciones.create({user,puntuacion,PeliculaId});

const puntuacionActual2 = await tablaPuntuaciones.findOne({where:{PeliculaId}});
  /////////////////////////////////////////////////////////
console.log('Puntuación agregada:', puntuacionActual2);

res.json({puntuacion:puntuacionActual2.puntuacion});
      
}else{
    if(puntuacionT.user == user && puntuacionT.PeliculaId == PeliculaId){
      console.log(`El usuario ${user} ya califico la pelicula`);
     res.json({interruptor:true});
    }else{

     const datosActualizados = {
     user,
     nuevaPuntuacion,
     PeliculaId
     } 

      await tablaPuntuaciones.update(datosActualizados,{
      where:{PeliculaId}
      });

      console.log(`Puntuación actualizada: ${nuevaPuntuacion}`);
      // Enviar la nueva puntuación al frontend
      res.json({ puntuacion:nuevaPuntuacion,interruptor:false});
    }    

}

  }catch(error){

    console.error(error.message);

  }
}
//////////////////////////////////////////7
const contactanos = async (req, res) => {
  try {
    const { nombre, telefono, email, mensaje } = req.body;

    const mensajee = await contacto.findOne({
      where: {
        [Op.or]: [
          { nombre }, // Busca registros donde el nombre coincida con el valor de la variable 'nombre'
          { email }, // Busca registros donde el email coincida con el valor de la variable 'email'
        ],
      },
    });

    if (!mensajee) {
      await contacto.create({ nombre, telefono, email, mensaje });
      res.json({ message: true });
    } else {
      res.json({ message: false });
    }
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Error en el servidor');
  }
};
////////////////////////////////////////////
const capacitacion = async (req,res)=>{
try{
 res.render('./client/capacitacion',{tabla:'Capacitación'});
}catch(error){
  console.error(`ERROR: ${error.message}`);
  res.status(500).send('Error en el servidor');
}
}
////////////////////////////////////////////
const streaming = async(req,res)=>{
try{
res.render('./client/streaming',{tabla:'Streaming'});
}catch(error){
console.log('Error en el servidor');
res.status(500).send('Error en el servidor');
}
}
////////////////////////////////////////////
const hojaCalculo = async(req,res)=>{
try{
res.render('./client/hojaCalculo',{tabla:'Hoja Calculo'});
}catch(error){
console.log('Error en el servidor');
res.status(500).send('Error en el servidor');
}
}
////////////////////////////////////////////
const afiliacion = async(req,res)=>{
try{
res.render('./client/afiliacion',{tabla:'Afiliación'});
}catch(error){
console.log('Error en el servidor');
res.status(500).send('Error en el servidor');
}
}
////////////////////////////////////////////
module.exports={
 getUsers,
 createUser,
 index,
 loginGet,
 loginPost,
 registerGet,
 main,
 construccion,
 logout,
 restablecerGet,
 alertRegistro,
 eliminarMensajeRegistro,
 restablecerPost,
 RestablecerRun,
 RestablecerRunPost,
 peliculasClient,
 puntuaciones,
 contactanos,
 cursosClient,
 capacitacion,
 librosClient,
 streaming,
 hojaCalculo,
 afiliacion
}