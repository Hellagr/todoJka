const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    image: {
        url: String,
        filename: String
    },
    taskpanels: [{ type: Schema.Types.ObjectId, ref: 'Taskpanel' }]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);