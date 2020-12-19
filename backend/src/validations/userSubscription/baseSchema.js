const yup = require('yup');

exports.bodySchema = {
    user: yup.string().required().matches(new RegExp('^[a-f0-9]{24}$', 'i')),
    role: yup.string().required().oneOf(['Top', 'Jungler', 'Mid', 'AD Carry', 'Support']),
    team: yup.string().required().matches(new RegExp('^[a-f0-9]{24}$', 'i')),
    competition: yup.string().required().matches(new RegExp('^[a-f0-9]{24}$', 'i'))
}