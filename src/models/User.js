const { default: mongoose } = require("mongoose");
const mogoose = require("mongoose");

const userSchema = new mogoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique : true
  },
  password: {
    type: String,
    required: true,
    minLength  : 6,
    maxLength : 60
  },
  age: {
    type: Number,
    trim: true,
    default : 18
  },
  gender :{
    type : String,
    
    lowercase : true,
    // validate :(value)=>{
    // if(!["Female","Male","Others"].includes(value)){
    //     throw Error;
    // }
    // }
    enum : ["female","male","others"]
  },
 
}, {timestamps :true});

const User = mongoose.model("User", userSchema);
module.exports = User;
