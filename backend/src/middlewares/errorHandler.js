const { appConfig } = require('../config');

module.exports = (error, req, res, next) => {
    const statusCode = res.statusCode || 500;
    res.status(statusCode);
    res.json({
        message: error.message,
        stackTrace: appConfig.enviroment == 'development' ? error.stack : ''
    });
}