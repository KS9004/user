const mongoose = require('mongoose');

const user = mongoose.Schema({
    title:  String, // String is shorthand for {type: String}
    email: String,
});

module.exports = mongoose.model('User', user);