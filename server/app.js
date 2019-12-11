const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const bodyParser = require('body-parser');


const app = express();

//load routes
const StudentsRoutes = require('./routes/students');
const TeacherRoutes = require('./routes/teachers');

//database connection
mongoose.connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('database connected');
}).catch(err => console.log(err));

//middleware for body-parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//handle routes
app.use('/api/v1/students', StudentsRoutes);
app.use('/api/v1/teachers', TeacherRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
    console.log(`App is running at port ${PORT}`);
});