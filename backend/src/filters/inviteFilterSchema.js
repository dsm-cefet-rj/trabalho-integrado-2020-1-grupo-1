const { mapValues } = require('lodash');
const yup = require('yup');

const baseInviteFilterSchema = {
    receiver: yup.string()
};

const inviteFilterSchema = yup.lazy(builder => yup.object().shape(mapValues(builder, (value, key) => baseInviteFilterSchema[key])));

module.exports = inviteFilterSchema;