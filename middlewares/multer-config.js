const multer = require('multer');


const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage =multer.memoryStorage()


module.exports = (filename) => {
  
  return multer({storage: storage}).single(filename);
} 