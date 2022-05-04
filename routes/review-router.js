const ReviewController = require('../controllers/review-controller');
const { authentificateJwt } = require('../middlewares/authentificate-jwt');


const reviewRouter = require('express').Router();


// Routing pour les acces utilisateur
// - Route "/register" pour créer un compte et récuperer un token d'identification
// - Route "/login" pour obtenir un JSON Web Token d'identification

reviewRouter.route('/post')
    .post(authentificateJwt(), ReviewController.insert);
reviewRouter.route('/showall')
    .get(authentificateJwt(), ReviewController.getAll);
  

module.exports = reviewRouter;