const { User } = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authRegisterController = async (req, res) => {
    const body = req.body;

    try {
        const existingUser = await User.findOne({ username: body.username }).exec();

        if (existingUser) {
            return res.status(409).json({ error: 'Username already exists' });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(body.password, salt);

        const newUser = await User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            username: body.username,
            password: hashedPassword,
            isAdmin: body.isAdmin || false
        });
        res.status(201).json(newUser);

    } catch (error) {
        console.log(error);
        return res.status(409).json({ error: error.message });
    }
}

module.exports = {
    authRegisterController
}