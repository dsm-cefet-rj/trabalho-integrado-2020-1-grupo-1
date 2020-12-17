const { bodySchema } = require('./baseSchemas');
const pick = require('object.pick');
const yup = require('yup');

const createUserSchema = yup.object().noUnknown().shape(pick(bodySchema, ['name', 'email', 'password', 'birthdate', 'leagueOfLegendsUsername']));

module.exports = createUserSchema;