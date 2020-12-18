const yup = require('yup');

module.exports = {
    type: yup.number,
    handle: function() {
        return this.test({
            name: 'powerOfTwo', 
            message: '${path} is not a power of two', 
            test: (value) => Number.isInteger(Math.log2(value)),
            exclusive: true
        });
    }
};