const { teamsSubscriptionsController } = require('../controllers');
const router = require('express').Router();

router.route('/')
    .post(teamsSubscriptionsController.create)
router.route('/:id(^[a-f0-9]{24})')
    .delete(teamsSubscriptionsController.destroy)

module.exports = router;