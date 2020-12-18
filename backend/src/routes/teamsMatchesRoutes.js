const { teamsMatchesController } = require('../controllers');
const { teamsMatchesFilterSchema } = require('../filters');
const { requestValidator, filterGenerator } = require('../middlewares');
const { validateTeamsMatches } = require('../validations');
const router = require('express').Router();

router.route('/')
    .get(requestValidator(validateTeamsMatches.querySchema), filterGenerator(teamsMatchesFilterSchema), teamsMatchesController.index);
router.route('/:id')
    .put(requestValidator(validateTeamsMatches.updateSchema), teamsMatchesController.update);

module.exports = router;