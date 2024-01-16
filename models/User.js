const mongoose = require("mongoose");

const Users = new mongoose.Schema({
    name :{
        type : String,
        required : true,
    },
    username : {
        type : String, 
        required : true
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
    },
    block : {
        type : Boolean,
        default : false
    }
})

const UserModel = mongoose.model('Users', Users);

module.exports = UserModel;