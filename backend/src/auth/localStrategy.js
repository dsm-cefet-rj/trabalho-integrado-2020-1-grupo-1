const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const options = {
    usernameField: "email",
};

module.exports = new LocalStrategy(options, async (email, password, done) => {
    try {
        const user = await mongoose.model('User').findOne({ email });

        if(!user || !(await user.comparePassword(password))) {
            return done(null, false, { message: 'Invalid credentials' });
        }
        
        return done(null, user);
    } catch (err) {
        return done(err);
    }
});