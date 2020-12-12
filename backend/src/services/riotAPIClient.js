const axios = require('axios');
const { riotAPIConfig } = require('../config');

module.exports = axios.create({
    baseURL: riotAPIConfig.baseURL,
    headers: { 'X-Riot-Token': riotAPIConfig.baseURL },
    timeout: 1000
});