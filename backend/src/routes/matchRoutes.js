const { matchController } = require('../controllers');
const router = require('express').Router();

router.route('/')
    .get(matchController.index);
router.route('/:id')
    .put(matchController.update)
    .delete(matchController.destroy);

module.exports = router;