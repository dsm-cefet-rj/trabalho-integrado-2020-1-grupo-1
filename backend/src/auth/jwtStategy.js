const { Strategy: JWTStrategy, ExtractJwt: JWTExtract } = require('passport-jwt');
const { appConfig } = require('../config');
const mongoose = require('mongoose');

const options = {
    secretOrKey: appConfig.key,
    jwtFromRequest: JWTExtract.fromAuthHeaderAsBearerToken(),
    issuer: appConfig.url,
    audience: appConfig.client,
    algorithms: ['HS256']
};

module.exports = new JWTStrategy(options, async (payload, done) => {
    try {
        const user = await mongoose.model('User').findById(payload.id);

        if(!user) {
            return done(null, false); 
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
});