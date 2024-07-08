const categorias = require('../models/categorias');
const peliculass = require('../models/peliculas');
const user = require('../models/User.js');
const cursoss = require('../models/cursos.js');
const libros = require('../models/libros.js');
//categorias.hasOne(peliculass);
//peliculass.belongsTo(categorias);
//const Peliculas= require('../models/peliculas');
const nodemailer= require('nodemailer');
const jwt = require('jsonwebtoken');
/////////////////////////////////////////////////////////
const loginAdminPost = async(req,res)=>{
try{
const admin = "jcespinoza2011@gmail.com";
const security = '1066515';
const {usuario,password} = req.body;
if(usuario === admin && password === security){
req.session.loggedIn=true; // Establecer propiedad en la sesión
res.json({interruptor:true});
}else{
res.json({interruptor:false});
}
}catch(error){
console.error(error.message);
res.status(500).send('Error en el Servidor');
}
}
/////////////////////////////////////////////////////////
const peliculasGet = async (req,res)=>{
  try{
   const peliculas = await peliculass.findAll();
   res.render('./admin/tabla',{peliculas,endPoinst:'/addPeliculaGet',tabla:'Peliculas',eliminar:'/delete',mensaje:'Pelicula',update:'/update/'}); 
 }catch(error){
  console.error(error);
  res.status(500).send('Error en el Servidor');
}
}
//////////////////////////////////////////////
const cursosGet = async (req,res)=>{
  try{
     const peliculas = await cursoss.findAll();
    res.render('./admin/tabla',{peliculas,endPoinst:'/addCursosGet',tabla:'Cursos',eliminar:'/deleteCurso',mensaje:'Curso',update:'/updateCursos/'});
  }catch(error){
   console.error(error);
   res.status(500).send('Error en el Servidor'); 
 }
}
//////////////////////////////////////////////
const librosGet = async (req,res)=>{
  try{
  const peliculas = await libros.findAll();
    res.render('./admin/tabla',{peliculas,endPoinst:'/addLibros',tabla:'Libros',eliminar:'/deleteLibros',mensaje:'Libro',update:'/updateLibros/'});
  }catch(error){
   console.error(error);
   res.status(500).send('Error en el Servidor'); 
 }
}
//////////////////////////////////////////////
const usuariosGet = async (req,res)=>{
  try{
    const peliculas = await user.findAll();
    res.render('./admin/tabla',{peliculas,endPoinst:'/addUsuario',tabla:'Usuarios',eliminar:'/deleteUsuario',mensaje:'Usuarios',update:'/updateUsuario/'});
  }catch(error){
   console.error(error);
   res.status(500).send('Error en el Servidor'); 
 }
}
//////////////////////////////////////////////
const addLibros = async (req,res)=>{
  try{
    res.render('./admin/add',{endPoinst:'/addLibros',titulo:'Agregar Libro'});
  }catch(error){
   console.error(error);
   res.status(500).send('Error en el servidor');
 }
}
//////////////////////////////////////////////
const addUsuario = async (req,res)=>{
try{
    res.render('./admin/add',{endPoinst:'/addUsuario',titulo:'Agregar Usuario'});
}catch(error){
  console.error(error);
  res.status(500).send('Error en el servidor'); 
}
}
//////////////////////////////////////////////
const addLibrosPost = async (req,res)=>{
  try{
     if(req.file){
      console.log(req.file,'file---------------------------***')
  // Utiliza req.file aquí
  const file = `/uploads/${req.file.filename}`;
  const portada = `${req.protocol}://${req.get('host')}${file}`;
  console.log(file,'---dato de la funcion addPeliculasPost---');
  const {nombre,descripcion,UrlFile,categoria}=req.body;
  const newPelicula = await libros.create({portada:file,nombre,descripcion,UrlFile,categoria});
  res.cookie('addLibro',true, { httpOnly: true, secure: true });
  res.redirect('/libros');
}
}catch(error){
  console.error(error);
  res.status(500).send('Error en el servidor');
}
}
//////////////////////////////////////////////
const updateLibrosGet = async(req,res)=>{
  const categorias = ['Romance','Terror','Comedia','Suspenso','Drama','Aventura','Acción','Otro'];
  try{
    const {id} = req.params;
    const peli = await libros.findOne({where:{id}});
    for(let x = 0 ; x < categorias.length; x++){
      if(categorias[x] == peli.categoria){
        categorias.splice(x,1);
        break
      }
    }
    res.render('./admin/update',{peli,categorias,titulo:'Actualizar Libro',endPoinst:'/updateLibros/',volver:'/libros'});
  }catch(error){
    console.error(error.message);
    res.status(500).send('Error en el servidor')
  }

}
//////////////////////////////////////////////
const addCursoGet = async (req,res)=>{
  try{
    res.render('./admin/add',{endPoinst:'/addCursos',titulo:'Agregar Curso'});
  }catch(error){
    console.error(error);
    res.status(500).send('Error en el servidor');
  }

}
//////////////////////////////////////////////
const addPeliculaGet = async(req,res)=>{
  try{
    res.render('./admin/add',{endPoinst:'/addPeliculas',titulo:'Agregar Pelicula'});
  }catch(error){
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
}
/////////////////////////////////////////////
const addPeliculasPost = async (req,res)=>{
  try{
   if(req.file){
      console.log(req.file,'file---------------------------***')
  // Utiliza req.file aquí
  const file = `/uploads/${req.file.filename}`;
  const portada = `${req.protocol}://${req.get('host')}${file}`;
  console.log(file,'---dato de la funcion addPeliculasPost---');
  const {nombre,descripcion,UrlFile,categoria}=req.body;
  const newPelicula = await peliculass.create({portada:file,nombre,descripcion,UrlFile,categoria});
  res.cookie('addPeli',true, { httpOnly: true, secure: true });
  res.redirect('/peliculas');
} else {
 res.redirect('/addPeliculas');
}
}catch(error){
  console.error(error);
  res.status(500).send('Error en el servidor');
}

}
/////////////////////////////////////////////////////////
const addUsuarioPost = async (req,res)=>{
  try{
  const {nombre,telefono,correo,password}=req.body;
  let telefonoo = telefono.toString();
  await user.create({nombre,telefono:telefonoo,correo,contrasena:password});
  res.cookie('addUser',true, { httpOnly: true, secure: true });
  res.redirect('/usuarios');
}catch(error){
  console.error(error);
  res.status(500).send('Error en el servidor');
}
}
/////////////////////////////////////////////////////////
const addCursosPost = async (req,res)=>{
  try{
    if(req.file){
    console.log(req.file,'file---------------------------***')
  // Utiliza req.file aquí
  const file = `/uploads/${req.file.filename}`;
  const portada = `${req.protocol}://${req.get('host')}${file}`;
  console.log(file,'---dato de la funcion addPeliculasPost---');
  const {nombre,descripcion,UrlFile,categoria}=req.body;
  const newPelicula = await cursoss.create({portada:file,nombre,descripcion,UrlFile,categoria});
  res.cookie('addCurso',true, { httpOnly: true, secure: true });
  res.redirect('/cursos');
}else{
 res.redirect('/addPeliculas');
} 
}catch(error){
console.error(error);
res.status(500).send('Error en el servidor');
}
}
/////////////////////////////////////////////////////////
const update = async(req,res)=>{
  const categorias = ['Romance','Terror','Comedia','Suspenso','Drama','Aventura','Acción','Otro'];
  try{
   const {id} = req.params;
    const peli = await peliculass.findOne({where:{id}});
    for(let x = 0 ; x < categorias.length; x++){
      if(categorias[x] == peli.categoria){
        categorias.splice(x,1);
        break
      }
    }
    res.render('./admin/update',{peli,categorias,titulo:'Actualizar Pelicula',endPoinst:'/update/',volver:'/peliculas'});
  }catch(error){
    console.error(error.message);
    res.status(500).send('Error en el servidor')
  }

}
////////////////////////////////////////////////////////
const updateCursos = async(req,res)=>{
  const categorias = ['Romance','Terror','Comedia','Suspenso','Drama','Aventura','Acción','Otro'];
  try{
    const {id} = req.params;
    const peli = await cursoss.findOne({where:{id}});
    for(let x = 0 ; x < categorias.length; x++){
      if(categorias[x] == peli.categoria){
        categorias.splice(x,1);
        break
      }
    }
    res.render('./admin/update',{peli,categorias,titulo:'Actualizar Curso',endPoinst:'/updateCursos/',volver:'/cursos'});
  }catch(error){
    console.error(error.message);
    res.status(500).send('Error en el servidor')
  }

}
////////////////////////////////////////////////////////
const updateMoviesPost = async (req,res)=>{
  try{
    if(req.file){
      const file = `/uploads/${req.file.filename}`;
      const portada = `${req.protocol}://${req.get('host')}${file}`;
      console.log(file,'---Recopilacion de Imagen desde middleware---');
      const id = req.params.id;
      const {nombre,descripcion,UrlFile,categoria} = req.body;
      const datos = {
        portada,nombre,descripcion,UrlFile,categoria
      };
      await peliculass.update(datos,{where:{id}});
      res.redirect('/peliculas');
    }
  }catch(error){
   console.log(error.message);
   res.status(500).send('Error en el servidor');
 }
}
////////////////////////////////////////////////////////
const updateCursosPost = async (req,res)=>{
  try{
   if(req.file){
    const file = `/uploads/${req.file.filename}`;
    const portada = `${req.protocol}://${req.get('host')}${file}`;
    console.log(file,'---Recopilacion de Imagen desde middleware---');
    const id = req.params.id;
    const {nombre,descripcion,UrlFile,categoria} = req.body;
    const datos = {
      portada,nombre,descripcion,UrlFile,categoria
    };
    await cursoss.update(datos,{where:{id}});
    res.redirect('/cursos');
  }
}catch(error){
 console.log(error.message);
 res.status(500).send('Error en el servidor');
}
}
////////////////////////////////////////////////////////

const updateLibrosPost = async (req,res)=>{
  try{
   if(req.file){
    const file = `/uploads/${req.file.filename}`;
    const portada = `${req.protocol}://${req.get('host')}${file}`;
    console.log(file,'---Recopilacion de Imagen desde middleware---');
    const id = req.params.id;
    const {nombre,descripcion,UrlFile,categoria} = req.body;
    const datos = {
      portada,nombre,descripcion,UrlFile,categoria
    };
    await libros.update(datos,{where:{id}});
    res.redirect('/libros');
  }
}catch(error){
 console.log(error.message);
 res.status(500).send('Error en el servidor');
}
}
////////////////////////////////////////////////////////
const deleteMovie = async (req,res)=>{
 const id = req.body.id;
 await peliculass.destroy({where:{id}});
 console.log('¡Pelicula Eliminada!');
 res.json({message:true});
}
////////////////////////////////////////////////////////
const deleteCurso = async (req,res)=>{
 const id = req.body.id;
 await cursoss.destroy({where:{id}});
 console.log('¡Curso Eliminado!');
 res.json({message:true});
}
////////////////////////////////////////////////////////
const deleteLibro = async (req,res)=>{
 const id = req.body.id;
 await libros.destroy({where:{id}});
 console.log('¡Libro Eliminado!');
 res.json({message:true});
}
////////////////////////////////////////////////////////
const usuarios = async (req,res)=>{
  try{
    const usuarios = await user.findAll();
    res.render('./admin/users',{usuarios,tabla:'Usuarios'});
  }catch(error){
   console.error(error.message);
   res.status(500).send('Error en el Servidor');
 }

}
///////////////////////////////////////////////////////
const loginAdmin = async(req,res)=>{
try{
 res.render('./admin/login');
}catch(error){
console.error(error.message);
res.status(500).send('Error en el Servidor');
}
}
///////////////////////////////////////////////////////
const cerrarAdmin=(req,res)=>{
 req.session.destroy((err) => {
    if (err) {
      console.log('Error al cerrar sesión:', err);
    } else {
      res.redirect('/admin');
    }
  });
}
//////////////////////////////////////////////////////
const error = (req,res)=>{
res.render('./admin/error');
}
///////////////////////////////////////////////////////
module.exports={
 peliculasGet,
 addPeliculaGet,
 addPeliculasPost, 
 update,
 updateMoviesPost,
 deleteMovie,
 usuarios,
 cursosGet,
 addCursoGet,
 addCursosPost,
 updateCursos,
 updateCursosPost,
 deleteCurso,
 librosGet,
 addLibros,
 addLibrosPost,
 updateLibrosGet,
 updateLibrosPost,
 deleteLibro,
 usuariosGet,
 addUsuario,
 addUsuarioPost,
 loginAdmin,
 loginAdminPost,
 cerrarAdmin,
 error
}