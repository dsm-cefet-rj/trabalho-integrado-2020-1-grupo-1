module.exports = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalURL}`)
    res.status(404);
    next(error);
}