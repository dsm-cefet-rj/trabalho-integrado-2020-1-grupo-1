const { teamSubscriptionController } = require('../controllers');
const { teamSubscriptionFilterSchema } = require('../filters');
const { requestValidator, filterGenerator } = require('../middlewares');
const { validateTeamSubscription } = require('../validations');
const router = require('express').Router();

router.route('/')
    .get(requestValidator(validateTeamSubscription.querySchema), filterGenerator(teamSubscriptionFilterSchema), teamSubscriptionController.index)
    .post(requestValidator(validateTeamSubscription.createSchema), teamSubscriptionController.create);
router.route('/:id')
    .delete(teamSubscriptionController.destroy);

module.exports = router;