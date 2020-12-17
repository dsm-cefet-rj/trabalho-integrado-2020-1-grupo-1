const { teamController } = require('../controllers');
const router = require('express').Router();

router.route('/')
    .get(teamController.index)
    .post(teamController.create);
router.route('/findByCompetition')
    .get(teamController.findByCompetition);
router.route('/findByMatch')
    .get(teamController.findByCompetition);
router.route('/:id(^[a-f0-9]{24}$)')
    .get(teamController.show)
    .put(teamController.update)
    .delete(teamController.destroy);

module.exports = router;