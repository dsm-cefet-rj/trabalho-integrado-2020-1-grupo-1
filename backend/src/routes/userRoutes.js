const router = require('express').Router();
const { userController } = require('../controllers');

router.route('/')
    .get(userController.index)
    .post(userController.create);
router.route('/findByName')
    .get(userController.findByName);
router.route('/findByTeam')
    .get(userController.findByTeam)
router.route('/:id')
    .get(userController.show)
    .put(userController.update)
    .delete(userController.destroy);

module.exports = router;