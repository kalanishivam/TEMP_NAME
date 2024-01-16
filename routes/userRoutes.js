const express = require('express');
const userRegistration = require('../controllers/userRegistration.js');
const errorHandler = require('../middlewares/errorHandler.js');

const router = express.Router();

router.post('/signup', errorHandler ,userRegistration.handleSignup);
router.post('/login', errorHandler , userRegistration.handleLogin )


module.exports = router;