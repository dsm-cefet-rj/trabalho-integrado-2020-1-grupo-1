const { teamMatchController } = require('../controllers');
const { teamMatchFilterSchema } = require('../filters');
const { requestValidator, filterGenerator } = require('../middlewares');
const { validateTeamMatch } = require('../validations');
const router = require('express').Router();
const passport = require('passport');

router.use(passport.authenticate('jwt', { session: false }));

router.route('/')
    .get(requestValidator(validateTeamMatch.querySchema), filterGenerator(teamMatchFilterSchema), teamMatchController.index);
router.route('/:id')
    .put(requestValidator(validateTeamMatch.updateSchema), teamMatchController.update);

module.exports = router;