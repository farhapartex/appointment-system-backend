const express = require('express');
const { authRegisterController, authLoginController } = require('../controllers/authController');

const router = express.Router();

router.post('/register', authRegisterController)
router.post('/login', authLoginController)

module.exports = router;