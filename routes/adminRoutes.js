
const {peliculasGet,addPeliculaGet,addCursoGet,addCursosPost,addPeliculasPost,update,updateMoviesPost,deleteMovie,updatePost,usuarios,cursosGet,updateCursosPost,deleteCurso,updateCursos,librosGet,addLibros,addLibrosPost,updateLibrosGet,updateLibrosPost,deleteLibro,usuariosGet,addUsuario,addUsuarioPost,loginAdmin,loginAdminPost,cerrarAdmin,error} = require('../controllers/adminControllers.js');
const session = require('../middleware/session.js');
const path = require('path');
const express = require('express');
const adminRoutes = express.Router();
//Utils
const upload = require('../utils/multer.js');
//Randis Graterol
//rutas GET
adminRoutes.get('/peliculas',session,peliculasGet);
adminRoutes.get('/cursos',session,cursosGet);
adminRoutes.get('/libros',session,librosGet);
adminRoutes.get('/usuarios',session,usuariosGet);

//Agregar datos al servidor 
adminRoutes.get('/addPeliculaGet',session,addPeliculaGet);
adminRoutes.get('/addCursosGet',session,addCursoGet);
adminRoutes.get('/addLibros',session,addLibros);
adminRoutes.get('/addUsuario',session,addUsuario);

adminRoutes.get('/update/:id',session,update);
adminRoutes.get('/updateLibros/:id',session,updateLibrosGet);
adminRoutes.get('/updateCursos/:id',session,updateCursos);
adminRoutes.get('/usuarios',session,usuarios);

adminRoutes.get('/admin',loginAdmin);
adminRoutes.get('/cerrarAdmin',cerrarAdmin);
adminRoutes.get('/error',error);
//rutas Post

adminRoutes.post('/addPeliculas',session,upload.single('img'),addPeliculasPost);
adminRoutes.post('/addCursos',session,upload.single('img'),addCursosPost);
adminRoutes.post('/addLibros',session,upload.single('img'),addLibrosPost);
adminRoutes.post('/addUsuario',session,upload.single('img'),addUsuarioPost);

adminRoutes.post('/updateLibros/:id',session,upload.single('img'),updateLibrosPost);
adminRoutes.post('/update/:id',session,upload.single('img'),updateMoviesPost);
adminRoutes.post('/updateCursos/:id',session,upload.single('img'),updateCursosPost);

adminRoutes.post('/delete',deleteMovie);
adminRoutes.post('/deleteCurso',deleteCurso);
adminRoutes.post('/deleteLibros',deleteLibro);

adminRoutes.post('/loginAdminPost',loginAdminPost);

module.exports=adminRoutes;