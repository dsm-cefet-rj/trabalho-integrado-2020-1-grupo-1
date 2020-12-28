const yup = require('yup');

exports.body = {
    email: yup.string().required().email().databaseExists('User').trim(),
    password: yup.string().required().min(8).max(100).trim(),
    token: yup.string().required().uuid()
};