const mongoose = require('mongoose');
const yup = require('yup');

module.exports = {
    type: yup.mixed,
    handle: function(collection, path = null) {
        return this.test({
            name: 'databaseUnique',
            message: 'The ${path} has already been taken',
            test: async (value, { path: originalPath }) => {
                const exists = await mongoose.model(collection).exists({ [path || originalPath]: value });
                return !exists;
            },
            exclusive: true
        });
    }
}