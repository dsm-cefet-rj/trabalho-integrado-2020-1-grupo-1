const { usersSubscriptionsController } = require('../controllers');
const router = require('express').Router();

router.route('/')
    .post(usersSubscriptionsController.create);
router.route('/:id(^[a-f0-9]{24})')
    .delete(usersSubscriptionsController.destroy);

module.exports = router;