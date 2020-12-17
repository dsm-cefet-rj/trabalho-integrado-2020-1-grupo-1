const { matchController } = require('../controllers');
const router = require('express').Router();

router.route('/findByCompetition')
    .get(matchController.findByCompetition);
router.route('/:id(^[a-f0-9]{24}$)')
    .put(matchController.update)
    .delete(matchController.destroy);

module.exports = router;