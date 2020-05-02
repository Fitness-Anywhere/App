module.exports = (req, res, next) => {
    if (req.instructor) {
        next();
    } else {
        res.status(401).json({
            errorMessage: 'Invalid credentials'
        });
    }
}