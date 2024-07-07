const multer = require('multer');
const path = require('path');
function getContentType(extname) {
  switch (extname) {
    case '.html':
      return '.html';
    case '.css':
      return '.css';
    case '.js':
      return '.js';
    case '.json':
      return '.json';
    case '.png':
      return '.png';
    case '.jpg':
      return '.jpg';
    case '.jpeg':
      return '.jpeg';
    case '.mp3':
      return '.mp3';
    case '.mp4':
      return '.mp4';
    default:
      return null;
  }
}


//configuración del modulo multer
let storage = multer.diskStorage({

  destination: function (req, file, cb){
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
   let ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + getContentType(ext))
  }

});

let upload = multer({storage:storage});

module.exports=upload;