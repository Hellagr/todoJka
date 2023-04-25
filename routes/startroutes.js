const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const Taskpanel = require('../models/taskpanel');
const User = require('../models/user');
const passport = require('passport');
const { middlewareAuth, validateUserImage } = require('../middlewareAuth');
const { validateTaskpanel } = require('../middlewareAuth');
const taskpanelController = require('../controllers/taskpanel');

const multer = require("multer");
const { storage, cloudinary } = require('../cloudinary')
const upload = multer({ storage });
const fs = require('fs');



router.get('/', taskpanelController.homepage);

router.route('/userpanel')
    .get(middlewareAuth, wrapAsync(taskpanelController.userpanels))
    .post(middlewareAuth, validateTaskpanel, wrapAsync(taskpanelController.createTask));

router.post('/userpanelwallpaper', upload.single('wallpaper'), async (req, res) => {
    const sessionUser = req.session.passport.user;
    const dbUser = await User.find({ username: sessionUser });
    const userImg = dbUser[0].image.filename;
    try {
        await cloudinary.uploader.destroy(userImg);
    } catch (err) {
        console.log(err)
    }
    console.log(req.file)
    if (req.file) {
        dbUser[0].image.url = '';
        dbUser[0].image.filename = '';
        dbUser[0].image.url = req.file.path;
        dbUser[0].image.filename = req.file.filename;
        await dbUser[0].save();
    } else {
        req.flash('error', 'Please, choise a file if you want to set your wallpaper!');
    }
    res.redirect('/userpanel');
});


router.route('/:id')
    .put(middlewareAuth, validateTaskpanel, wrapAsync(taskpanelController.changeTask))
    .delete(middlewareAuth, wrapAsync(taskpanelController.deleteTask));

router.get('/completed', middlewareAuth, taskpanelController.completed);

router.get('/deleted', middlewareAuth, taskpanelController.deleted);

module.exports = router;