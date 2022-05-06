const ReviewController = require('../controllers/review-controller');
const { authentificateJwt } = require('../middlewares/authentificate-jwt');


const reviewRouter = require('express').Router();


// Routing pour les acces utilisateur
// - Route "/register" pour créer un compte et récuperer un token d'identification
// - Route "/login" pour obtenir un JSON Web Token d'identification

reviewRouter.route('/:photoId/comment')
    .post(authentificateJwt(), ReviewController.postComment);
reviewRouter.route('/:photoId/comment')
    .get(authentificateJwt(), ReviewController.getComments);
reviewRouter.route('/:photoId/rating')
    .post(authentificateJwt(), ReviewController.postRating);
reviewRouter.route('/:photoId/rating')
    .get(authentificateJwt(), ReviewController.getRatings);
  

module.exports = reviewRouter;