const sequelize =require('./config/database');//conexion
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes'); 
const alertRoutes = require('./routes/alertRoutes'); 
const dotenv = require('dotenv'); 
const session = require('express-session');
dotenv.config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const port = 5000;
const app = express();

// Configurar la caché para recursos estáticos
const staticOptions = {
  maxAge: 30 * 24 * 60 * 60, // Tiempo de caché en segundos (30 días en este ejemplo)
};


// Configuración de archivos estáticos
app.use(express.static(path.join(__dirname, '/public')));

app.use(session({
  secret: 'mi_secreto', // Clave secreta para firmar las cookies de sesión
  resave: false,
  saveUninitialized: false
}));

// Configuración del motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'/views'));
//configurar cookies
app.use(cookieParser());

// Configuración de recuperación de datos y envío
app.use(express.urlencoded({ extended:false}));
app.use(express.json());

// Configuración de cors
app.use(cors());

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente ¡Randis!');
    // Sincronización del modelo con la base de datos
    return sequelize.sync({ force:false});
  })
  .catch((error)=>{
    console.error('Error al conectar a la base de datos randy:', error.message);
  });
// Routers
app.use('/',userRoutes);
app.use('/',adminRoutes);
app.use('/',alertRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});








