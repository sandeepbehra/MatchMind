const { default: mongoose } = require("mongoose");
const mogoose = require("mongoose");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
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
 
userSchema.methods.getJWT = async function(){
  const token = jwt.sign({_id : this._id},"matchMind@09",{
    expiresIn : '7d'
  })
}

userSchema.methods.comparedPassword = async function(incomingPassword){
  const isValidPassword  =  await bcrypt.compare(incomingPassword,this.password)
  return  isValidPassword
}

const User = mongoose.model("User", userSchema);
module.exports = User;
