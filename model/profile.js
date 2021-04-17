const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    company : {
        type : String
    },
    location : {
        type : String
    },
    website : {
        type : String
    },
    status : {
        type : String,
        required : true 
    },
    skills : {
        type : [String],
        required : true 
    },
    bio : {
        type : String
    },
    experience : [
        {
            title : {
                type : String,
                required : true
            },
            company : {
                type : String,
                required : true
            },
            location : {
                type : String
            },
            from : {
                type : Date
            },
            status : {
                type : Boolean,
                required : true
            },
            description : {
                type : String,
                required : true
            }
        }
    ],
    education : [
        {
            school: {
                type : String,
                required : true
            },
            degree: {
                type : String,
                required : true
            },
            fieldofstudy: {
                type : String,
                required : true
            },
            from: {
                type : Date,
                required : true
            },
            to: {
                type : Date,
            },
            current: {
                type : Boolean,
                required : true
            },
            description: {
                type : String
            }
        }
    ],
    social : [
        {
            facebook : {
                type : String,
            },
            instagram : {
                type : String,
            },
            twitter : {
                type : String,
            },
            linkedin : {
                type : String,
            },
        }
    ],
    date : {
        type : Date,
        default : Date.now
    }

});

module.exports = Profile = mongoose.model('profile', profileSchema);