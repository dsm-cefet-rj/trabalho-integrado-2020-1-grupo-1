const { bodySchema } = require('./baseSchema');
const yup = require('yup');

const createUserSubscriptionSchema = yup.object().noUnknown().shape(bodySchema);

module.exports = createUserSubscriptionSchema;