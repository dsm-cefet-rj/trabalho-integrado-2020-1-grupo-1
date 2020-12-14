const router = require('express').Router();
const { championController } = require('../controllers');

router.route('/')
    .get(championController.index);

module.exports = router;