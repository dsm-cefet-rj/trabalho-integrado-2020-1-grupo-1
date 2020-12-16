const axios = require('axios');
const { riotAPIConfig } = require('../config');

module.exports = axios.create({
    baseURL: riotAPIConfig.baseURL,
    headers: { 'X-Riot-Token': riotAPIConfig.apiToken },
    timeout: 1000
});