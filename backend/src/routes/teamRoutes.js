const { teamController } = require('../controllers');
const { requestValidator } = require('../middlewares');
const { validateTeam } = require('../validations');
const router = require('express').Router();

router.route('/')
    .get(teamController.index)
    .post(requestValidator(validateTeam.createSchema), teamController.create);
router.route('/:id')
    .get(teamController.show)
    .put(requestValidator(validateTeam.updateSchema), teamController.update)
    .delete(teamController.destroy);

module.exports = router;