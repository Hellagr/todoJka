const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const Taskpanel = require('../models/taskpanel');
const User = require('../models/user');
const passport = require('passport');
const { middlewareAuth } = require('../middlewareAuth');
const { validateTaskpanel } = require('../middlewareAuth');
const taskpanelController = require('../controllers/taskpanel');

const multer = require("multer");
const { storage } = require('../cloudinary')
const upload = multer({ storage });
const fs = require('fs');



router.get('/', taskpanelController.homepage);

router.route('/userpanel')
    .get(middlewareAuth, wrapAsync(taskpanelController.userpanels))
    .post(middlewareAuth, validateTaskpanel, wrapAsync(taskpanelController.createTask));

router.post('/userpanelwallpaper', upload.single('wallpaper'), async (req, res) => {
    const sessionUser = req.session.passport.user;
    const dbUser = await User.find({ username: sessionUser });
    dbUser[0].image = '';
    dbUser[0].image = req.file.path;
    console.log(dbUser[0])
    await dbUser[0].save();
    res.redirect('/userpanel');
});


router.route('/:id')
    .put(middlewareAuth, validateTaskpanel, wrapAsync(taskpanelController.changeTask))
    .delete(middlewareAuth, wrapAsync(taskpanelController.deleteTask));

router.get('/completed', middlewareAuth, taskpanelController.completed);

router.get('/deleted', middlewareAuth, taskpanelController.deleted);

module.exports = router;