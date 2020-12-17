const { competitionController } = require('../controllers');
const router = require('express').Router();

router.route('/')
    .get(competitionController.index)
    .post(competitionController.create);
router.route('/:id(^[a-f0-9]{24}$)')
    .get(competitionController.show)
    .put(competitionController.update)
    .delete(competitionController.destroy);
router.route('/:id/createMatches')
    .post(competitionController.createMatches)

module.exports = router;