const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: String,
    task: String,
    colorBorder: String
})

module.exports = mongoose.model('Taskpanel', taskSchema);