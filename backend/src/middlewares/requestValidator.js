module.exports = (validationSchema, validateQuery = false, context = null) => async (req, res, next) => {
    try {
        const validateField = validateQuery ? 'query' : 'body';
        if(context) {
            req[validateField] = await validationSchema.validate(req[validateField], { context: { [context]: req[context] } });
        } else {
            req[validateField] = await validationSchema.validate(req[validateField]);
        }
        next();
    } catch(err) {
        res.status(422).json({
            field: err.path,
            errors: err.errors
        });
    }
};