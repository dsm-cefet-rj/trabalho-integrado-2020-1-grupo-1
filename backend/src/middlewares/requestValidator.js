module.exports = (validationSchema, validateQuery = false) => async (req, res, next) => {
    try {
        const validateField = validateQuery ? 'query' : 'body';
        req[validateField] = await validationSchema.validate(req[validateField]);
        next();
    } catch(err) {
        console.log(err);
        res.status(422).json({
            field: err.path,
            errors: err.errors
        });
    }
};