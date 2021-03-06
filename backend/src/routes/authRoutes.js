const { authController } = require('../controllers');
const router = require('express').Router();
const { loginRateLimiter, resetPasswordRateLimiter, requestValidator } = require('../middlewares');
const { validateAuth } = require('../validations');
const passport = require('passport');

router.route('/login')
    .post(loginRateLimiter, passport.authenticate('local', { session: false }), authController.login);
router.route('/request-reset-password')
    .post(requestValidator(validateAuth.requestPasswordResetSchema), authController.requestPasswordReset);
router.route('/reset-password')
    .post(requestValidator(validateAuth.passwordResetSchema), resetPasswordRateLimiter, authController.resetPassword);

module.exports = router;