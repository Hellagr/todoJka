const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: String,
    task: [String]
})

module.exports = mongoose.model('Taskpanel', taskSchema);