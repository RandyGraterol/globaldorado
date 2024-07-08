const categorias = require('../models/categorias');
const peliculass = require('../models/peliculas');

const addPeli = async(req,res)=>{
try{
	const message  = req.cookies.addPeli;
	if(message){
		res.json({message});
	}
}catch(error){
	console.error(error.message);
	res.status(500).send('Error en el Servidor');
}

}
//////////////////////////////////////////////////////

const deleteAlertPeli = async (req,res)=>{
try{
res.clearCookie('addPeli');
res.json({message:true});
}catch(error){
	console.error(error.message);
	res.status(500).send('Error en el Servidor');
}
}

module.exports={
addPeli,
deleteAlertPeli
}