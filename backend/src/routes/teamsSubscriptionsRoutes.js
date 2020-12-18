const { teamsSubscriptionsController } = require('../controllers');
const { teamsSubscriptionsFilterSchema } = require('../filters');
const { requestValidator, filterGenerator } = require('../middlewares');
const { validateTeamsSubscriptions } = require('../validations');
const router = require('express').Router();

router.route('/')
    .get(requestValidator(validateTeamsSubscriptions.querySchema), filterGenerator(teamsSubscriptionsFilterSchema), teamsSubscriptionsController.index)
    .post(requestValidator(validateTeamsSubscriptions.createSchema), teamsSubscriptionsController.create);
router.route('/:id')
    .delete(teamsSubscriptionsController.destroy);

module.exports = router;