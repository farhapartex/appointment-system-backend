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


const authLoginController = async (req, res) => {
    const body = req.body;

    if (!body.username || !body.password) {
        return res.status(400).json({ error: 'Please enter all fields' });
    }

    try {
        const user = await User.findOne({ username: body.username }).exec();
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const authToken = user.generateAuthToken();

        res.status(200).json({ authToken });
    } catch (error) {
        return res.status(500).json({ error: "System error" });
    }
}

module.exports = {
    authRegisterController,
    authLoginController,
}