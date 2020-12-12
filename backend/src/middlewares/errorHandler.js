const { appConfig } = require('../config');

module.exports = (req, res, next, error) => {
    res.status(res.status || 500);
    res.json({
        message: error.message,
        stackTrace: appConfig.enviroment == 'development' ? error.stack : ''
    });
}