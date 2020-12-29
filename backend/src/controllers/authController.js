const { sign } = require('jsonwebtoken');
const { appConfig } = require('../config');
const { PasswordReset, User } = require('../models');

module.exports = {
    login: async (req, res, next) => {
        try {
            const payload = {
                id: req.user.id
            };

            const token = sign(payload, appConfig.key, { algorithm: "HS256", expiresIn: "1d", issuer: appConfig.url, audience: appConfig.client });

            res.set('Authorization', `Bearer ${token}`).json(req.user);
        } catch (err) {
            next(err);
        }
    },
    requestPasswordReset: async (req, res, next) => {
        try {
            if((await PasswordReset.exists({ email: req.body.email }))) {
                res.status(400);
                throw new Error('Password reset already requested, check your email');
            }

            await PasswordReset.create(req.body);

            res.json('Password reset email sent sucessfully');
        } catch (err) {
            next(err);
        }
    },
    resetPassword: async (req, res, next) => {
        try {
            const passwordReset = await PasswordReset.findOne({ email: req.body.email });

            if(!passwordReset || !(await passwordReset.compareToken(req.body.token))) {
                res.status(400);
                throw new Error('Password was already resetted');
            }

            passwordReset.remove();
            const user = await User.findOneAndUpdate({ email: req.body.email }, { password: req.body.password });
            res.json(user);
        } catch (err) {
            next(err);
        }
    }
};