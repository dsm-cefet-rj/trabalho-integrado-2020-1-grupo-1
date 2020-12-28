const mongoose = require('mongoose');
const yup = require('yup');

module.exports = {
    type: yup.mixed,
    handle: function(collection, path = null) {
        return this.test({
            name: 'databaseExists',
            message: 'The ${path} doesn\'t exists',
            test: async (value, { path: originalPath }) => {
                const exists = await mongoose.model(collection).exists({ [path || originalPath]: value });
                return exists;
            },
            exclusive: true
        });
    }
}