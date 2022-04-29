const PhotoController = require('../controllers/photo-controller');
const { authentificateJwt } = require('../middlewares/authentificate-jwt');

const photoRouter = require('express').Router();

// Routing pour les acces utilisateur
// - Route "/register" pour créer un compte et récuperer un token d'identification
// - Route "/login" pour obtenir un JSON Web Token d'identification

photoRouter.route('/upload')
    .post(authentificateJwt(), PhotoController.update);


    


module.exports = photoRouter;