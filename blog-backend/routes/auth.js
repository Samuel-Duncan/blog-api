const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/sign-up', authController.signUp);

router.post('/log-in', authController.logIn);

router.delete('/log-out', authController.logOut);

module.exports = router;
