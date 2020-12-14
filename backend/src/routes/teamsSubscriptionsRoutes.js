const router = require('express').Router();
const { teamsSubscriptionsController } = require('../controllers');

router.route('/')
    .post(teamsSubscriptionsController.create)
router.route('/:id')
    .delete(teamsSubscriptionsController.destroy)

module.exports = router;