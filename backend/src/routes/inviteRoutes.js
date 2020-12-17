const { inviteController } = require('../controllers');
const router = require('express').Router();

router.route('/')
    .get(inviteController.index)
    .post(inviteController.create);
router.route('/:id')
    .delete(inviteController.destroy);
router.route('/:id/accept')
    .put(inviteController.accept);

module.exports = router;