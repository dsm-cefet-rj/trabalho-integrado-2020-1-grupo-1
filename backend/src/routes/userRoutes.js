const { userController } = require('../controllers');
const { userFilterSchema } = require('../filters');
const { requestValidator, filterGenerator } = require('../middlewares');
const { validateUser } = require('../validations');
const router = require('express').Router();
const passport = require('passport');

router.route('/')
    .get(passport.authenticate('jwt', { session: false }), requestValidator(validateUser.querySchema, true), filterGenerator(userFilterSchema), userController.index)
    .post(requestValidator(validateUser.createSchema), userController.create);
router.route('/:id')
    .get(passport.authenticate('jwt', { session: false }), userController.show)
    .put(passport.authenticate('jwt', { session: false }), requestValidator(validateUser.updateSchema, false, "user"), userController.update)
    .delete(passport.authenticate('jwt', { session: false }), userController.destroy);

module.exports = router;