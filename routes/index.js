const authRouter = require('./auth-router');
const photoRouter = require('./photo-router');


const router = require('express').Router();
router.use('/auth', authRouter);
router.use('/photo',photoRouter)

module.exports = router;