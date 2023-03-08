const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const AppError = require('../utils/AppError');
const Joi = require('joi');
const { taskpanelSchema } = require('../validateJoiSchema');
const Taskpanel = require('../models/taskpanel');
const User = require('../models/user');
const passport = require('passport');
const { middlewareAuth } = require('../middlewareAuth');
const { route } = require('./Users');
const { authorize } = require('passport');
const { populate, db } = require('../models/taskpanel');

const validateTaskpanel = (req, res, next) => {
    const { error } = taskpanelSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new AppError(msg, 400)
    } else {
        next();
    }
}

router.get("/", middlewareAuth, wrapAsync(async (req, res) => {
    const sessionUser = req.session.passport.user;
    const dbUser = await User.find({ username: sessionUser });



    const taskpanels = await Taskpanel.find({});


    res.render('home', { taskpanels, dbUser });

}));

router.post("/", middlewareAuth, validateTaskpanel, wrapAsync(async (req, res) => {
    const sessionUser = req.session.passport.user;
    const dbUser = await User.find({ username: sessionUser }).populate('taskpanels');
    const addNewCard = new Taskpanel(req.body.taskpanel);
    await addNewCard.save();
    // dbUser[0].taskpanels.shift()
    dbUser[0].taskpanels.push(addNewCard)

    await dbUser[0].save();
    // console.log(`'Task: '${dbUser[0].taskpanels}`)
    req.flash('success', 'Successfully made a new Card!');
    res.redirect(`/`);
}));

router.put('/:id', middlewareAuth, validateTaskpanel, wrapAsync(async (req, res) => {
    if (!req.body.taskpanel) throw new AppError('Invalid Card Data!', 400);
    const { id } = req.params;
    const taskpanel = await Taskpanel.findByIdAndUpdate(id, { ...req.body.taskpanel });
    req.flash('success', 'Successfully update a Card!');
    res.redirect('/');
}));

router.delete('/:id', middlewareAuth, wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Taskpanel.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted a Card!');
    res.redirect('/');
}));

router.get('/completed', middlewareAuth, (req, res) => {
    res.render('./otherCards/completed');
});

router.get('/deleted', middlewareAuth, (req, res) => {
    res.render('./otherCards/deleted');
});

module.exports = router;