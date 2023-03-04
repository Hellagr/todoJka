module.exports.middlewareAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must login in your account.')
        return res.redirect('/login');
    }
    next();
};