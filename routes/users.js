const express = require('express');
const router = express.Router();
const User = require('../models/user');
const wrapAsync = require('../utils/wrapAsync');


router.get('/register', (req, res) => {
    res.render('users/register');
})

router.post('/register', wrapAsync(async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        console.log(registeredUser);
        req.flash(`'Welcome to todoCard App, ${username}'`);
        res.redirect('/');
    } catch (err) {
        let error = err.message;
        if (error.includes('duplicate') && error.includes('index: email_1 dup key')) {
            req.flash('error', 'This email is already registered. Please use another email.');
            res.redirect('register');
        }
    }
}));

module.exports = router;