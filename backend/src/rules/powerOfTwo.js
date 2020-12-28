const yup = require('yup');

module.exports = {
    type: yup.number,
    handle: function() {
        return this.test({
            name: 'powerOfTwo', 
            message: '${path} não é uma potência de 2', 
            test: (value) => Number.isInteger(Math.log2(value)),
            exclusive: true
        });
    }
};