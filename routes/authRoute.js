const express = require('express');
const { authRegisterController } = require('../controllers/authController');

const router = express.Router();

router.post('/register', authRegisterController)

module.exports = router;