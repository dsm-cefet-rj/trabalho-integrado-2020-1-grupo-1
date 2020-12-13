const router = require('express').Router();
const { teamController } = require('../controllers');

router.route('/')
    .get(teamController.index)
    .post(teamController.create);
router.route('/:id')
    .get(teamController.show)
    .put(teamController.update)
    .delete(teamController.destroy);

module.exports = router;