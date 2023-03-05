const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: false,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.generateAuthToken = () => {
    const token = jwt.sign({
        id: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        isAdmin: this.isAdmin,
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
    }, process.env.JWT_SECRET);

    return token;
}


module.exports = {
    User: mongoose.model('User', userSchema)
}