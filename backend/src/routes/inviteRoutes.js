const { inviteController } = require('../controllers');
const { inviteFilterSchema } = require('../filters');
const { requestValidator, filterGenerator } = require('../middlewares');
const { validateInvite } = require('../validations');
const router = require('express').Router();
const passport = require('passport');

router.use(passport.authenticate('jwt', { session: false }));

router.route('/')
    .get(requestValidator(validateInvite.querySchema), filterGenerator(inviteFilterSchema), inviteController.index)
    .post(requestValidator(validateInvite.createSchema), inviteController.create);
router.route('/:id')
    .delete(inviteController.destroy);
router.route('/:id/accept')
    .put(inviteController.accept);

module.exports = router;