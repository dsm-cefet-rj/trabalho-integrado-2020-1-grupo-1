const router = require('express').Router();
const { usersSubscriptionsController } = require('../controllers');

router.route('/')
    .post(usersSubscriptionsController.create);
router.route('/:id')
    .delete(usersSubscriptionsController.destroy);

module.exports = router;