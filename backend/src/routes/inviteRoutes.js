const { inviteController } = require('../controllers');
const router = require('express').Router();

router.route('/')
    .get(inviteController.index)
    .post(inviteController.create);
router.route('/:id(^[a-f0-9]{24}$)')
    .delete(inviteController.destroy);
router.route('/:id(^[a-f0-9]{24}$)/accept')
    .put(inviteController.accept);

module.exports = router;