module.exports = (filterSchema) => async (req, res, next) => {
    try {
        req.filter = await filterSchema.cast(req.query);
        next();
    } catch(err) {
        next(err);
    }
};