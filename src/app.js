const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/User");
const app = express();
const PORT = 7777;
const validation = require("./utils/validations")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const {userAuth} = require("./middlewares/auth")
app.use(express.json());
app.use(cookieParser())


// API /signup
app.post("/signup", async (req, res) => {
  try {
     const {
    firstName,
    lastName,
    email,
    password,
    age,
    gender
  } = req.body;
   validation(req.body)
   const hasPassword = await bcrypt.hash(password,10) 
    const newUser = new User({
    firstName,
    lastName,
    email,
    password : hasPassword,
    age,
    gender
    });
    await newUser.save();
    res.send("User has been signed up");
  } catch (error) {
    res.status(400).send("Error in signup user : " + error.message);
  }
});
//API /login
app.get("/login", async (req,res)=>{
  try{
   const {
    email,
    password
   } = req.body
   const user = await User.findOne({email})
   if(!user)
    throw new Error("Credentials is invalid")
   const userPassword = user.password;
   const isValidPassword =  await user.comparedPassword(password)
   if(!isValidPassword)
    throw new Error("Credentials is invalid")
  const token = user.getJWT()
  res.cookie("token",token, {
    expires : new Date(Date.now() + 8*60*60*1000)
  })
   res.json({
    success : true,
    message : "successfully logged in!"
   })
  }catch(err)
  {
    res.json({
      success : false,
      message : err.message
    })
  }
})
// API /user , get one user by email id
// app.get("/user", async (req, res) => {
// try{
//   const email = req.body.email;
// const fetchUser = await User.findOne({email: email})
// if(fetchUser.length===0)
// {
//   res.status(400).json({
//     success : false,
//     Message: err.message
//   })
// }

// res.json({
//   sucess : true,
//   message: "Data succesfully are fetched",
//   Data : fetchUser
// })
// }
// catch(err)
// {
//   res.status(400).json({
//     success : false,
//     Message: err.message
//   })
// }

// })
// API /user , get users by email id
// app.get("/user", async (req, res) => {
//   try {
//     const email = req.body.email;
//     const data = await User.find({ email: email });
//     if (data.length === 0) {
//       res.json({
//         success: false,
//         Message: "Data not found",
//       });
//     }
//     res.json({
//       success: true,
//       data: data,
//     });
//   } catch (err) {
//     res.json({
//       success: false,
//       Message: err.message,
//     });
//   }
// });
// API /feed, get all users from user
app.get("/feed", async(req, res)=>{
  try{
    const Data = await User.find()
    if(Data.length===0)
    {
      res.json({
        success: true,
        Message : "Data Not found"
      })
    }
    res.json({
      success: true,
      message: "Data are successfully fetched",
      Data : Data
    })
  }
  catch(err){
res.json({
        success: true,
        Message : err.message
      })
  }
})
app.get("/profile",userAuth, async(req, res)=>{
const user = req.user
res.json(
  {
    success : true,
    message: "successfully fetched",
    data : user
  }
)
})
//update user
app.patch("/user", async (req, res) => {
try{
  const email = req.body.email;
  // const checkList = ["email","password",]
  // const verify = ()=>{
  //   Object.keys(req.body).every((key)=>checkList.includes(key))
  // }
const response = await User.findOneAndUpdate({email:email},{firstName: "Sonal", lastName: "sharma"})

res.json({
  sucess : true,
  message: "Data succesfully are updated",
  Response : response
})
}
catch(err)
{
  res.status(400).json({
    success : false,
    Message: err.message
  })
}

})
connectDB()
  .then((e) => {
    console.log("Database is connected : ", e);
    app.listen(PORT, () => {
      console.log("server is running....");
    });
  })
  .catch((err) => {
    console.error("= Database is not connected : ", err);
  });
