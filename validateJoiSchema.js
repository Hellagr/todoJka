const Joi = require('joi');

module.exports.taskpanelSchema = Joi.object({
    taskpanel: Joi.object({
        title: Joi.string().required().min(1).max(20),
        task: Joi.string().required().min(1).max(200),
        colorBorder: Joi.string().required()
    }).required()
})

