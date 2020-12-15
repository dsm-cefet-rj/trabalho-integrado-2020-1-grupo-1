const { appConfig } = require('../config');

module.exports = (error, req, res, next) => {
    res.status(res.statusCode != 200 ? res.statusCode : 500);
    res.json({
        message: error.message,
        stackTrace: appConfig.enviroment == 'development' ? error.stack : ''
    });
}