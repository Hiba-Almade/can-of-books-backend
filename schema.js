'use strict' ;
const mongoose = require('mongoose');

let bookSchema = new mongoose.Schema({
    title:String,
    descripyion:String,
    status:String

});

let userSchema =  new mongoose.Schema({
    email:String,
    books:[bookSchema]
});

let bookModel = mongoose.model("book", bookSchema);
let userModel = mongoose.model("user", userSchema);
module.exports = userModel