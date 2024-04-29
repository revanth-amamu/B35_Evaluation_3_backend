const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "manager", "member"],
        default: "member"
    }
},{
    versionKey:false,
});

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;