const { championController } = require('../controllers');
const router = require('express').Router();

router.route('/')
    .get(championController.index);

module.exports = router;