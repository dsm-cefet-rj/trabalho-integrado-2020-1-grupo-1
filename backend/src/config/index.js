require('dotenv').config();

module.exports = {
    appConfig: require('./app'),
    databaseConfig: require('./database'),
    mailConfig: require('./mail'),
    riotAPIConfig: require('./riotAPI'),
};