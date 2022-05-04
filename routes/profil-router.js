const ProfilController = require('../controllers/profil-controller');
const { authentificateJwt } = require('../middlewares/authentificate-jwt');
const multerConfig = require('../middlewares/multer-config');

const profilRouter = require('express').Router();


// Routing pour les acces utilisateur
// - Route "/register" pour créer un compte et récuperer un token d'identification
// - Route "/login" pour obtenir un JSON Web Token d'identification

profilRouter.route('/update')
    .post(authentificateJwt(),multerConfig('avatar_image'), ProfilController.update);
  

module.exports = profilRouter;