const { bodySchema } = require('./baseSchemas');
const yup = require('yup');

const createUserSchema = yup.object().noUnknown().shape(bodySchema);

module.exports = createUserSchema;