const express = require('express');
const Student = require('../controllers/student');
const router = express.Router();


router.post('/register', Student.register);
router.post('/login', Student.login);





module.exports = router;