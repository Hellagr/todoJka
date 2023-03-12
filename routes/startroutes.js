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

router.get("/", middlewareAuth, wrapAsync(taskpanelController.home));
router.post("/", middlewareAuth, validateTaskpanel, wrapAsync(taskpanelController.createTask));
router.put('/:id', middlewareAuth, validateTaskpanel, wrapAsync(taskpanelController.changeTask));
router.delete('/:id', middlewareAuth, wrapAsync(taskpanelController.deleteTask));

router.get('/completed', middlewareAuth, (req, res) => {
    res.render('./otherCards/completed');
});

router.get('/deleted', middlewareAuth, (req, res) => {
    res.render('./otherCards/deleted');
});

module.exports = router;