const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const Taskpanel = require('../models/taskpanel');
const User = require('../models/user');
const passport = require('passport');
const { middlewareAuth } = require('../middlewareAuth');
const { validateTaskpanel } = require('../middlewareAuth');
const taskpanelController = require('../controllers/taskpanel');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })


router.get('/', taskpanelController.homepage);

router.route('/userpanel')
    .get(middlewareAuth, wrapAsync(taskpanelController.userpanels))
    // .post(middlewareAuth, validateTaskpanel, wrapAsync(taskpanelController.createTask));
    .post(upload.single('wallpaper'), (req, res) => {
        res.send(req.body, req.file);
    });

router.route('/:id')
    .put(middlewareAuth, validateTaskpanel, wrapAsync(taskpanelController.changeTask))
    .delete(middlewareAuth, wrapAsync(taskpanelController.deleteTask));

router.get('/completed', middlewareAuth, taskpanelController.completed);

router.get('/deleted', middlewareAuth, taskpanelController.deleted);

module.exports = router;