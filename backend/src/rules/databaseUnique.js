const mongoose = require('mongoose');
const yup = require('yup');

module.exports = {
    type: yup.mixed,
    handle: function(collection, ignoreId = null, path = null) {
        return this.test({
            name: 'databaseUnique',
            message: '${path} já está sendo utilizado',
            test: async (value, { path: originalPath }) => {
                const exists = await mongoose.model(collection).exists(ignoreId ? { [path || originalPath]: value, id: { $ne: ignoreId  }} : { [path || originalPath]: value });
                return !exists;
            },
            exclusive: true
        });
    }
}