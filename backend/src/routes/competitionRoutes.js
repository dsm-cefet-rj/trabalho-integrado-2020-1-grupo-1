const router = require('express').Router();
const { competitionController } = require('../controllers');

router.route('/')
    .get(competitionController.index)
    .post(competitionController.create);
router.route('/:id')
    .get(competitionController.show)
    .put(competitionController.update)
    .delete(competitionController.destroy);
router.route('/:id/createMatches')
    .post(competitionController.createMatches)

module.exports = router;