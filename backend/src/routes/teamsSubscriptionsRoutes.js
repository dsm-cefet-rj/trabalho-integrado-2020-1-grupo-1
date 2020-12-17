const { teamsSubscriptionsController } = require('../controllers');
const router = require('express').Router();

router.route('/')
    .post(teamsSubscriptionsController.create)
router.route('/:id')
    .delete(teamsSubscriptionsController.destroy)

module.exports = router;