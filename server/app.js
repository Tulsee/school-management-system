const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const bodyParser = require('body-parser');


const app = express();

const StudentsRoutes = require('./routes/students');

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

app.use('/api/v1/students', StudentsRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
    console.log(`App is running at port ${PORT}`);
});