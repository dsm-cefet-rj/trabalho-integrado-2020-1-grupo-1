const { competitionController } = require('../controllers');
const { requestValidator } = require('../middlewares');
const { validateCompetition } = require('../validations');
const router = require('express').Router();

router.route('/')
    .get(competitionController.index)
    .post(requestValidator(validateCompetition.createSchema), competitionController.create);
router.route('/:id')
    .get(competitionController.show)
    .put(requestValidator(validateCompetition.updateSchema), competitionController.update)
    .delete(competitionController.destroy);
router.route('/:id/createMatches')
    .post(competitionController.createMatches)

module.exports = router;