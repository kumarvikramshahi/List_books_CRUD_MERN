// Module imports
// require('dotenv').config({ path: '.env.development.local' });
const mongoose = require('mongoose');   
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');

// File imports
const { DATABASE_CONNECTION_STRING } = require('./utils/constant');
const bookRouter = require("./routes/books");

const app = express();

// port declearation
const PORT = process.env.PORT || 8080;

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setting CORS Headers
app.use((req, res, next) => {
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
    next();
});
app.use(helmet());
app.use(morgan('combined'));

// Routes
app.get("/", (req, resp) => {
    resp.status(200).json({
        message: "hello from Kumar Vikram"
    })
})

app.use(bookRouter)

// Default error handeler
app.use((error, req, resp, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal server error";
    resp.status(statusCode).json({ message: message })
})

// Listening
mongoose.connect(
    DATABASE_CONNECTION_STRING,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(() => app.listen(PORT))
    .catch(err => console.log(err, "error in connection to DB"))