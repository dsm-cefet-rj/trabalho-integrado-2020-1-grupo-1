const { forOwn } = require('lodash');
const passport = require('passport');
const strategies = require('../auth');

module.exports = () => {
    forOwn(strategies, strategy => { passport.use(strategy) });
};