const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const Taskpanel = require('../models/taskpanel');
const User = require('../models/user');
const passport = require('passport');
const { middlewareAuth } = require('../middlewareAuth');
const { validateTaskpanel } = require('../middlewareAuth');
const taskpanelController = require('../controllers/taskpanel');
const Kraken = require('kraken')
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const fs = require('fs');


router.get('/', taskpanelController.homepage);

router.route('/userpanel')
    .get(middlewareAuth, wrapAsync(taskpanelController.userpanels))
    // .post(middlewareAuth, validateTaskpanel, wrapAsync(taskpanelController.createTask));
    .post(upload.single('wallpaper'), (req, res) => {

        const kraken = new Kraken({
            api_key: process.env.KRAKEN_KEY,
            api_secret: process.env.KRAKEN_SECRET
        });

        console.log(upload.buffer)

        var params = {
            file: "/path/to/image/file.jpg",
            wait: true
        };

        kraken.upload(params, function (status) {
            if (status.success) {
                console.log("Success. Optimized image URL: %s", status.kraked_url);
            } else {
                console.log("Fail. Error message: %s", status.message);
            }

        })
    });

router.route('/:id')
    .put(middlewareAuth, validateTaskpanel, wrapAsync(taskpanelController.changeTask))
    .delete(middlewareAuth, wrapAsync(taskpanelController.deleteTask));

router.get('/completed', middlewareAuth, taskpanelController.completed);

router.get('/deleted', middlewareAuth, taskpanelController.deleted);

module.exports = router;