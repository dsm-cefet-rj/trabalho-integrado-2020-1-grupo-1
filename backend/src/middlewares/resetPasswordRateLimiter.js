const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
    windowMs: 24 * 60 * 60 * 1000,
    max: 2
});