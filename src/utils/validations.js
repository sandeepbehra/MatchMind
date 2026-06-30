const validator = require("validator")
const validation =  (body)=>{
const {
    firstName ,
    lastName,
    email,
    password
} = body
if(!firstName || !lastName || !email || !password)
    throw new Error("Data is not sufficient")
if(!validator.isEmail(email))
    throw new Error("Email is invalid")
if(!validator.isStrongPassword(password))
    throw new Error("Password is not strong...")
return true    
}
module.exports = validation;
