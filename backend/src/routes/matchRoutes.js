const router = require('express').Router();
const { matchController } = require('../controllers');

router.route('/findByCompetition')
    .get(matchController.findByCompetition);
router.route('/:id')
    .put(matchController.update)
    .delete(matchController.destroy);

module.exports = router;