const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const AppError = require('../utils/AppError');
const Joi = require('joi');
const { taskpanelSchema } = require('../validateJoiSchema');
const Taskpanel = require('../models/taskpanel');

const validateTaskpanel = (req, res, next) => {
    const { error } = taskpanelSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new AppError(msg, 400)
    } else {
        next();
    }

}

router.get("/", wrapAsync(async (req, res, next) => {
    const taskpanels = await Taskpanel.find({});
    res.render('home', { taskpanels })
}));

router.post("/", validateTaskpanel, wrapAsync(async (req, res) => {
    const taskpanel = new Taskpanel(req.body.taskpanel);
    await taskpanel.save();
    res.redirect(`/`);
}));

router.put('/:id', validateTaskpanel, wrapAsync(async (req, res) => {
    if (!req.body.taskpanel) throw new AppError('Invalid Card Data!', 400);
    const { id } = req.params;
    const taskpanel = await Taskpanel.findByIdAndUpdate(id, { ...req.body.taskpanel });
    res.redirect('/');
}));

router.delete('/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Taskpanel.findByIdAndDelete(id);
    res.redirect('/');
}));

module.exports = router;