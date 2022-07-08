const authController = require('../controllers/auth-controller');
//const { authentificateJwt } = require('../middlewares/authentificate-jwt');
const bodyValidation = require('../middlewares/body-validation-middleware');
const { registerValidator, loginValidator ,refreshValidator} = require('../validators/auth-validator');


const authRouter = require('express').Router();

// Routing pour les acces utilisateur
// - Route "/register" pour créer un compte et récuperer un token d'identification
// - Route "/login" pour obtenir un JSON Web Token d'identification

authRouter.route('/register')
    .post(bodyValidation(registerValidator), authController.register);

authRouter.route('/login')
    .post(bodyValidation(loginValidator), authController.login);

authRouter.route('/refresh')
    .post(bodyValidation(refreshValidator), authController.refresh);
    
    
    


module.exports = authRouter;