const passport = require('passport');

module.exports = (req, res) => new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) {
            reject(err);
        }

        if(!user) {
            reject(new Error(info.message));
        }

        resolve(user);
    })(req, res);
});