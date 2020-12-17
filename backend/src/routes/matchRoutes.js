const { matchController } = require('../controllers');
const router = require('express').Router();

router.route('/findByCompetition')
    .get(matchController.findByCompetition);
router.route('/:id')
    .put(matchController.update)
    .delete(matchController.destroy);

module.exports = router;