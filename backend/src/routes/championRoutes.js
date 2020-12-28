const { championController } = require('../controllers');
const router = require('express').Router();
const passport = require('passport');

router.use(passport.authenticate('jwt', { session: false }));

router.route('/')
    .get(championController.index);

module.exports = router;