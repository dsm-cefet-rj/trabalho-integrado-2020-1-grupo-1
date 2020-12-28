const { matchController } = require('../controllers');
const { matchFilterSchema } = require('../filters');
const { requestValidator, filterGenerator } = require('../middlewares');
const { validateMatch } = require('../validations');
const router = require('express').Router();
const passport = require('passport');

router.use(passport.authenticate('jwt', { session: false }));

router.route('/')
    .get(requestValidator(validateMatch.querySchema), filterGenerator(matchFilterSchema), matchController.index);
router.route('/:id')
    .get(matchController.show)
    .put(requestValidator(validateMatch.updateSchema), matchController.update)
    .delete(matchController.destroy);

module.exports = router;