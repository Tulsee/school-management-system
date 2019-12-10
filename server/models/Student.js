const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name: {
        type: String,
        min: [7, 'Too short, min is 7 characters'],
        max: [32, 'Too long, max is 32 characters']
    },
    grade: {
        type: Number
    },
    parentsName: {
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

StudentSchema.methods.hasSamePassword = function (requestedPassword) {

    return bcrypt.compareSync(requestedPassword, this.password);
}


StudentSchema.pre('save', function (next) {
    const student = this;

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(student.password, salt, function (err, hash) {
            student.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('Student', StudentSchema);