const { userController } = require('../controllers');
const { validator } = require('../middlewares');
const { validateUser } = require('../validations');
const router = require('express').Router();

router.route('/')
    .get(validator(validateUser.querySchema, true), userController.index)
    .post(validator(validateUser.create), userController.create);
router.route('/:id')
    .get(userController.show)
    .put(validator(validateUser.update), userController.update)
    .delete(userController.destroy);

module.exports = router;