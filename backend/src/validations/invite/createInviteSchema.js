const { bodySchema } = require('./baseSchema');
const yup = require('yup');

const createInviteSchema = yup.object().noUnknown().shape(bodySchema);

module.exports = createInviteSchema;