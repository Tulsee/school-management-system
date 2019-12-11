const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
    name: {
        type: String,
        min: [7, 'Too short, min is 7 characters'],
        max: [32, 'Too long, max is 32 characters']
    },
    classTeacherOf: {
        type: String,
        min: [7, 'Too short, min is 7 characters'],
        max: [32, 'Too long, max is 32 characters']
    },
    contactNumber: {
        type: Number
    },
    address: {
        type: String,
        min: [7, 'Too short, min is 7 characters'],
        max: [32, 'Too long, max is 32 characters']
    },
    username: {
        type: String,
        min: [7, 'Too short, min is 7 characters'],
        max: [32, 'Too long, max is 32 characters']
    },
    password: {
        type: String,
        min: [7, 'Too short, min is 7 characters'],
        max: [32, 'Too long, max is 32 characters']
    },
});

TeacherSchema.methods.hasSamePassword = function (requestedPassword) {

    return bcrypt.compareSync(requestedPassword, this.password);
}


TeacherSchema.pre('save', function (next) {
    const teacher = this;

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(teacher.password, salt, function (err, hash) {
            teacher.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('Teacher', TeacherSchema);