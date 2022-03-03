const mongoose = require('mongoose');

const ContactAppSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    secret:{
        type:String,
        required:true
    },
    contacts:[{
        cname:{
            type:String
        },
        phoneNumber :{
            type:String
        },
        cemail:{
            type:String,
        }
    }],
});

module.exports = mongoose.model("contact",ContactAppSchema);