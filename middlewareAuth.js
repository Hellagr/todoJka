const AppError = require('./utils/AppError');
const { taskpanelSchema } = require('./validateJoiSchema');
const Joi = require('joi');

module.exports.middlewareAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must login in your account.')
        return res.redirect('/login');
    }
    next();
};

module.exports.validateTaskpanel = (req, res, next) => {
    const { error } = taskpanelSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new AppError(msg, 400)
    } else {
        next();
    }
}