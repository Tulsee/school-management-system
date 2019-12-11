const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateTeacherInput(data) {
    let errors = {};
    data.username = !isEmpty(data.username) ? data.username : '';
    data.name = !isEmpty(data.name) ? data.name : '';
    data.address = !isEmpty(data.address) ? data.address : '';
    data.contactNumber = !isEmpty(data.contactNumber) ? data.contactNumber : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';
    if (!Validator.isLength(data.name, {
            min: 7,
            max: 32
        })) {
        errors.name = 'Name must be between 7 and 32 characters';
    }
    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is Required';
    }
    if (Validator.isEmpty(data.contactNumber)) {
        errors.contactNumber = 'contactNumber field is Required';
    }
    if (Validator.isEmpty(data.username)) {
        errors.username = 'username field is Required';
    }
    if (!Validator.isEmpty(data.address)) {
        errors.address = 'address field is Required';
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is Required';
    }
    if (!Validator.isLength(data.password, {
            min: 6,
            max: 30
        })) {
        errors.password = 'Password must be between 6 and 30 characters';
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm  Password field is Required';
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'confirm Passwords must match';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}