const GalleryController = require('../controllers/gallery-controller');
const { authentificateJwt } = require('../middlewares/authentificate-jwt');


const galleryRouter = require('express').Router();


// Routing pour les acces utilisateur
// - Route "/register" pour créer un compte et récuperer un token d'identification
// - Route "/login" pour obtenir un JSON Web Token d'identification

galleryRouter.route('/create')
    .post(authentificateJwt(), GalleryController.create);
galleryRouter.route('/getbyid')
    .get(authentificateJwt(), GalleryController.getById);
  

module.exports = galleryRouter;