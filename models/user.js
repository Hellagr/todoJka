const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const taskpanel = require('./taskpanel');

const UserSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    taskpanel: [{ type: Schema.Types.ObjectId, ref: 'taskpanel' }]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);