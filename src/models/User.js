const { default: mongoose } = require("mongoose")
const mogoose = require("mongoose")

const userSchema = new mogoose.Schema({
    firstName: {
        type: String
    },
    lastName : {
        type : String
    },
    email:{
    type : String
    },
    password :{
        type: Number
    },
    

})

const User = mongoose.model('User',userSchema)
 module.exports = User;