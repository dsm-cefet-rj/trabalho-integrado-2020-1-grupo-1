const { userController } = require('../controllers');
const { userFilterSchema } = require('../filters');
const { requestValidator, filterGenerator } = require('../middlewares');
const { validateUser } = require('../validations');
const router = require('express').Router();

router.route('/')
    .get(requestValidator(validateUser.querySchema, true), filterGenerator(userFilterSchema), userController.index)
    .post(requestValidator(validateUser.createSchema), userController.create);
router.route('/:id')
    .get(userController.show)
    .put(requestValidator(validateUser.updateSchema), userController.update)
    .delete(userController.destroy);

module.exports = router;