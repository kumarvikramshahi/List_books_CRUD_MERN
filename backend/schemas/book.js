const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookSchema = new Schema({
    title:  {
        type: String,
        required: true,
        maxlength: 50,
        minlength: 2,
    },
    author:  {
        type: String,
        required: true,
        maxlength: 50,
        minlength: 2,
    },
    genre:  {
        type: String,
        required: true,
        maxlength: 50,
        minlength: 2,
    },
})

module.exports = mongoose.model('book', BookSchema)