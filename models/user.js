const mongoose = require('mongoose');
const taskpanel = require('./taskpanel');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    taskpanels: [{ type: Schema.Types.ObjectId, ref: 'taskpanel' }]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);