const { forOwn } = require('lodash');
const rules = require('../rules');
const yup = require('yup');

module.exports = () => {
    forOwn(rules, (value, key) => { yup.addMethod(value.type, key, value.handle); });
};