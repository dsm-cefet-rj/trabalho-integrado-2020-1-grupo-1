const { usersSubscriptionsController } = require('../controllers');
const router = require('express').Router();

router.route('/')
    .post(usersSubscriptionsController.create);
router.route('/:id')
    .delete(usersSubscriptionsController.destroy);

module.exports = router;