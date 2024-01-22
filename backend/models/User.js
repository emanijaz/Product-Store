const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please Enter username"]
    },
    email:{
        type: String,
        unique: true,
        required: [true, "Please enter email"]
    },
    password:{
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    
},{timestamps: true} // used for created At and updated At times in moongose
)

module.exports = mongoose.model("User", userSchema)