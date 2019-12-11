const jwt = require('jsonwebtoken');
const config = require('../config/dev');
//load user model
const Student = require('../models/Student');

//load input validation
const validateStudentInput = require('../validation/studentRegister')


exports.register = (req, res) => {
    //let errors = [];
    const { errors, isValid}=validateStudentInput(req.body);
 
    //check validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    Student.findOne({
        username: req.body.username
    }).then(student => {
        if (student) {
            return res.status(422).send({
                errors: [{
                    title: 'already exist!',
                    detail: 'Username already exists. please try other than ' + student.username
                }]
            })
        } else {
            const newStudent = new Student({
                username: req.body.username,
                name: req.body.name,
                grade: req.body.grade,
                address: req.body.address,
                contactNumber: req.body.contactNumber,
                parentsName: req.body.parentsName,
                password: req.body.password
            });
            newStudent.save(function (err) {
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
    const {username, password} = req.body;

    if (!password || !username) {
        return res.status(422).send({errors: [{title: 'Data missing!', detail: 'Provide username and password!'}]});
      }

      Student.findOne({username}, function(err, student) { 
        if (err) {
          return res.status(422).send({errors: err});
        }
    
        if (!student) {
          return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'This student does not exist Please contacy to account section'}]});
        }
    
        if (student.hasSamePassword(password)) {
          const token = jwt.sign({
            studentId: student.id,
            username: student.username
          }, config.SECRET, { expiresIn: '1h'});
    
          return res.json(token);
        } else {
          return res.status(422).send({errors: [{title: 'Wrong Data!', detail: 'Wrong username or password'}]});
        }
      });
};