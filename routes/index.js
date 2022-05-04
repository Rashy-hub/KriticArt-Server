const authRouter = require('./auth-router');
const photoRouter = require('./photo-router');
const profilRouter = require('./profil-router');
const reviewRouter = require('./review-router');


const router = require('express').Router();
router.use('/auth', authRouter);
router.use('/photo',photoRouter);
router.use('/profil',profilRouter);
router.use('/review',reviewRouter)

module.exports = router;