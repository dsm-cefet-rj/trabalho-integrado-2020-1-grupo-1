const dayjs = require('dayjs');
const yup = require('yup');

module.exports = {
    type: yup.string,
    handle: function(format) {
        return this.test({
            name: 'validDate',
            message: '${path} is not a valid date',
            test: (value) => dayjs(value, format).format(format) === value ,
            exclusive: true
        });
    }
};