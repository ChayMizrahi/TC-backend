const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./keys.json');
const env = require('./nodemon.json');

const upload = require('./util/uploadsFiles');

const app = express();

const MONGODB_URI = `mongodb+srv://${keys.MONGODB_USERNAME}:${keys.MONGODB_PASSWORD}@cluster0-kf3i8.mongodb.net/${keys.MONGODB_DATABASE}`;

const contentCardRoutes = require('./routes/contentCard');

app.use(bodyParser.json());
app.use(upload.single('image'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');
    next();
});

app.use('/contentCard', contentCardRoutes);
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    res.status(status).json({ message: error.message });
})

mongoose.connect(MONGODB_URI)
    .then(res => {
        app.listen(process.env.PORT || 8080);
    })
    .catch(err => {
        console.log(err);
    });
