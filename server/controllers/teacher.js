const jwt = require('jsonwebtoken');
const config = require('../config/dev');
//load user model
const Teacher = require('../models/Teacher');

//load input validation
const validateTeacherInput = require('../validation/teacherRegister');

exports.register = (req, res) => {
    //let errors = [];
    const {
        errors,
        isValid
    } = validateTeacherInput(req.body);

    //check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Teacher.findOne({
        username: req.body.username
    }).then(teacher => {
        if (teacher) {
            return res.status(422).send({
                errors: [{
                    title: 'already exist!',
                    detail: teacher.username + ' Username teacher already exists. Please try other'
                }]
            })
        } else {
            const newTeacher = new Teacher({
                username: req.body.username,
                name: req.body.name,
                address: req.body.address,
                contactNumber: req.body.contactNumber,
                password: req.body.password
            });
            newTeacher.save(function (err) {
                if (err) {
                    return res.status(422).send({
                        errors: err
                    });
                    // console.log(err);
                }
                return res.json({
                    'registered': true
                });
            })
        }
    })
};

exports.login = (req, res) => {
    const {
        username,
        password
    } = req.body;

    if (!password || !username) {
        return res.status(422).send({
            errors: [{
                title: 'Data missing!',
                detail: 'Provide username and password!'
            }]
        });
    }

    Teacher.findOne({
        username
    }, function (err, teacher) {
        if (err) {
            return res.status(422).send({
                errors: err
            });
        }

        if (!teacher) {
            return res.status(422).send({
                errors: [{
                    title: 'Invalid User!',
                    detail: 'This teacher does not exist Please contact to account section'
                }]
            });
        }

        if (teacher.hasSamePassword(password)) {
            const token = jwt.sign({
                teacherId: teacher.id,
                username: teacher.username
            }, config.SECRET, {
                expiresIn: '1h'
            });

            return res.json(token);
        } else {
            return res.status(422).send({
                errors: [{
                    title: 'Wrong Data!',
                    detail: 'Wrong username or password'
                }]
            });
        }
    });
};