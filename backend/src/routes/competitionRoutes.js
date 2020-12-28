const { competitionController } = require('../controllers');
const { competitionFilterSchema } = require('../filters')
const { requestValidator, filterGenerator } = require('../middlewares');
const { validateCompetition } = require('../validations');
const router = require('express').Router();
const passport = require('passport');

router.use(passport.authenticate('jwt', { session: false }));

router.route('/')
    .get(requestValidator(validateCompetition.querySchema), filterGenerator(competitionFilterSchema), competitionController.index)
    .post(requestValidator(validateCompetition.createSchema), competitionController.create);
router.route('/:id')
    .get(competitionController.show)
    .put(requestValidator(validateCompetition.updateSchema, false, "params"), competitionController.update)
    .delete(competitionController.destroy);
router.route('/:id/createMatches')
    .post(competitionController.createMatches)

module.exports = router;