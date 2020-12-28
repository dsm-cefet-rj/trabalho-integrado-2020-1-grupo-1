const { userSubscriptionController } = require('../controllers');
const { requestValidator } = require('../middlewares');
const { validateUserSubscription } = require('../validations');
const router = require('express').Router();
const passport = require('passport');

router.use(passport.authenticate('jwt', { session: false }));

router.route('/')
    .post(requestValidator(validateUserSubscription.createSchema), userSubscriptionController.create);
router.route('/:id')
    .delete(userSubscriptionController.destroy);

module.exports = router;