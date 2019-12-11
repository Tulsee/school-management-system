const express = require('express');
const Teacher = require('../controllers/teacher');
const router = express.Router();


router.post('/register', Teacher.register);
router.post('/login', Teacher.login);


module.exports = router;