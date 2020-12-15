const { userController } = require('../controllers');
const router = require('express').Router();

router.route('/')
    .get(userController.index)
    .post(userController.create);
router.route('/findByName')
    .get(userController.findByName);
router.route('/findByEmail')
    .get(userController.findByEmail);
router.route('/findByTeam')
    .get(userController.findByTeam)
router.route('/:id')
    .get(userController.show)
    .put(userController.update)
    .delete(userController.destroy);

module.exports = router;