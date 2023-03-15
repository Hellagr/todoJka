const User = require('../models/user');
const wrapAsync = require('../utils/wrapAsync');

module.exports.register = (req, res) => {
    res.render('users/register');
}

module.exports.newUserPost = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('Welcome to todoCard App!');
            res.redirect('/');
        });
    } catch (err) {
        let error = err.message;
        if (error.includes('duplicate') && error.includes('index: email_1 dup key')) {
            req.flash('error', 'This email is already registered. Please use another email.');
            res.redirect('register');
        } else {
            req.flash('error', 'This username is already registered. Please use another username.');
            res.redirect('register');
        }
    }
}

module.exports.login = (req, res) => {
    res.render('users/login');
}

module.exports.authenticate = (req, res) => {
    try {
        req.flash('success', 'Welcome back!');
        const redirectUrl = req.session.returnTo || '/';
        delete req.session.returnTo;
        res.redirect(redirectUrl);
    } catch (error) {
        req.flash('error', 'Password or username is incorrect');
        res.redirect('/login');
    }
}

module.exports.logout = function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect("/login");
    });

}



