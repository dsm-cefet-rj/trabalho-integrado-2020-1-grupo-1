const mongoose = require('mongoose');
const yup = require('yup');

module.exports = {
    type: yup.mixed,
    handle: function(collection, ignoreId, path = null) {
        return this.test({
            name: 'databaseUnique',
            message: '${path} já está sendo utilizado',
            test: async (value, { path: originalPath }) => {
                const exists = await mongoose.model(collection).exists({ [path || originalPath]: value, id: { $ne: ignoreId  }});
                return !exists;
            },
            exclusive: true
        });
    }
}