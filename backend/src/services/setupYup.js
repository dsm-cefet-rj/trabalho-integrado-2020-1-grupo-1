const { forOwn } = require('lodash');
const rules = require('../rules');
const yup = require('yup');
const { pt } = require('yup-locale-pt');

module.exports = () => {
    yup.setLocale(pt);
    forOwn(rules, (value, key) => { yup.addMethod(value.type, key, value.handle); });
};