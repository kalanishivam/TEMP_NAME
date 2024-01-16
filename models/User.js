const mongoose = require("mongoose");

const Users = new mongoose.Schema({
    name :{
        type : String,
        required : true,
    },
    email :{
        type : String, 
        required : true,
        unique : true
    },
    phone :{
        type : Number,
        default : 0,
    },
    password : {
        type : String,
        required : true
    }
})

const UserModel = mongoose.model('User', Users);

module.exports = User;