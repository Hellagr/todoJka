const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const Taskpanel = require('../models/taskpanel');
const User = require('../models/user');
const passport = require('passport');
const { middlewareAuth } = require('../middlewareAuth');
const { route } = require('./Users');
const { authorize } = require('passport');
const { populate, db } = require('../models/taskpanel');
const taskpanelController = require('../controllers/taskpanel');
const { validateTaskpanel } = require('../middlewareAuth');

router.route('/')
    .get(middlewareAuth, wrapAsync(taskpanelController.home))
    .post(middlewareAuth, validateTaskpanel, wrapAsync(taskpanelController.createTask));

router.route('/:id')
    .put(middlewareAuth, validateTaskpanel, wrapAsync(taskpanelController.changeTask))
    .delete(middlewareAuth, wrapAsync(taskpanelController.deleteTask));

router.get('/completed', middlewareAuth, (req, res) => {
    res.render('./otherCards/completed');
});

router.get('/deleted', middlewareAuth, (req, res) => {
    res.render('./otherCards/deleted');
});

module.exports = router;