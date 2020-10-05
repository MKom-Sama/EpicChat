const mongoose = require("mongoose");

const userSchema= new mongoose.Schema({
    username:
    {
        type: String,
        min: 4,
        max:255,
    },
    email:
    {
        type: String,
        max:100,
        min: 2,
    },
    password:
    {
        type: String,
        max: 1024,
    },
});

const User = mongoose.model('User',userSchema);

// Exporting the Model

module.exports = User;