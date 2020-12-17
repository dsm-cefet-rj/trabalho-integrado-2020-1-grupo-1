module.exports = (validationSchema, validateQueryString = false) => async (req, res, next) => {
    try {
        await validationSchema.validate(validateQueryString ? req.query : req.body);
        next();
    } catch(err) {
        res.status(422).json({
            field: err.path,
            errors: err.errors
        });
    }
};