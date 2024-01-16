const express = require('express');
const userRegistration = require('../controllers/userRegistration.js')

const router = express.Router();

router.post('/signup' ,userRegistration.handleSignup);
router.post('/login' , userRegistration.handleLogin )


export default router;