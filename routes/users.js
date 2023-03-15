const express = require('express');
const { session } = require('passport');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');
const wrapAsync = require('../utils/wrapAsync');
const user = require('../controllers/user');

router.route('/register')
    .get(user.register)
    .post(wrapAsync(user.newUserPost));

router.route('/login')
    .get(user.login)
    .post(passport.authenticate('local', { failureFlash: true, keepSessionInfo: true, failureRedirect: '/login' }), user.authenticate);

router.get("/logout", user.logout);

module.exports = router;