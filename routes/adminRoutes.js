
const {peliculasGet,addPeliculaGet,addCursoGet,addCursosPost,addPeliculasPost,update,updateMoviesPost,deleteMovie,updatePost,usuarios,cursosGet,updateCursosPost,deleteCurso,updateCursos,librosGet,addLibros,addLibrosPost,updateLibrosGet,updateLibrosPost,deleteLibro,usuariosGet,addUsuario,addUsuarioPost} = require('../controllers/adminControllers.js');

const mensaje = 'si se puede';
const path = require('path');
const express = require('express');
const adminRoutes = express.Router();
//Utils
const upload = require('../utils/multer.js');
//Randis Graterol
//rutas GET
adminRoutes.get('/peliculas',peliculasGet);
adminRoutes.get('/cursos',cursosGet);
adminRoutes.get('/libros',librosGet);
adminRoutes.get('/usuarios',usuariosGet);

//Agregar datos al servidor 
adminRoutes.get('/addPeliculaGet',addPeliculaGet);
adminRoutes.get('/addCursosGet',addCursoGet);
adminRoutes.get('/addLibros',addLibros);
adminRoutes.get('/addUsuario',addUsuario);

adminRoutes.get('/update/:id',update);
adminRoutes.get('/updateLibros/:id',updateLibrosGet);
adminRoutes.get('/updateCursos/:id',updateCursos);
adminRoutes.get('/usuarios',usuarios);
//rutas Post

adminRoutes.post('/addPeliculas',upload.single('img'),addPeliculasPost);
adminRoutes.post('/addCursos',upload.single('img'),addCursosPost);
adminRoutes.post('/addLibros',upload.single('img'),addLibrosPost);
adminRoutes.post('/addUsuario',upload.single('img'),addUsuarioPost);

adminRoutes.post('/updateLibros/:id',upload.single('img'),updateLibrosPost);
adminRoutes.post('/update/:id',upload.single('img'),updateMoviesPost);
adminRoutes.post('/updateCursos/:id',upload.single('img'),updateCursosPost);

adminRoutes.post('/delete',deleteMovie);
adminRoutes.post('/deleteCurso',deleteCurso);
adminRoutes.post('/deleteLibros',deleteLibro);

module.exports=adminRoutes;