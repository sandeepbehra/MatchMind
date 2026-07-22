const jwt = require("jsonwebtoken")
const User = require("../models/User")
const userAuth = async (req, res, next)=>{
try{
 const { token } = req.cookies
    if(!token)
    {
        res.status(401).json({
            success : false,
            message : "please log in",

        })
    }  
     const tokenObj =  await jwt.verify(token, "matchMind@09") 
     const {_id} = tokenObj
     const user = await User.findById(_id)
     if(!user)
     throw new Error("User not found...")
     req.user = user;
     next()
    }
catch(err){
  res.status(401).json({success : false , message : err.message})
    }
    
}

module.exports = {userAuth}