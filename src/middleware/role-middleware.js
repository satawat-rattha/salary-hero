module.exports = (roles = []) => (req, res, next) => {
    if (!roles.some(role => req.user?.isRole(role))) {
        return res.status(403).json({
            error: {
                message: 'Forbidden access'
            }
        })
    }

    next()
}