const mongoose = require('mongoose');

const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String,
    adress: String,
    zipcode: Number,
    city: String,
    phone: Number,
});

module.exports = User;