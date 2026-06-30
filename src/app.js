const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/User");
const app = express();
const PORT = 7777;
const validation = require("./utils/validations")
const bcrypt = require("bcrypt")
// app.use((req,res)=>{
//     res.send("this is main base route")
// })
// app.use("/defaults",(req,res)=>{
//     res.send("This drefault handling server")
// })
// app.use("/default/test",(req,res)=>{
//     res.send("This drefault test handling server")
// })
// app.use("/test",(req, res)=>{
//     res.send("This is test handling")
// })

// app.use("/hello/2",(req,res)=>{
//     res.send("Hello/2")
// })
// app.use("/hello/8",(req , res)=>{
//     res.end("Hello 8")
// })
// app.use("/hello",(req , res)=>{
//     res.end("Hello")
// })

// app.use("/",(req,res)=>{
//     res.send("only /")
// })

// app.get("/abcd/:id",(req,res)=>{
//     console.log("Query res : ",req.params.id)
//     res.send({firstName : "Sandy", lastName : "Baniya"})
// })

// app.get("/user",(req,res)=>{
//     res.send({firstName : "Sandeep", lastName : "Behra"})
// })
// app.post("/user" , (req,res)=>{
//     //saving data in DB
//     res.send("Succesfully data has been saved in Database")
// })
// app.delete("/user", (req , res)=>{
//     // delete record From db
//     res.send("Succefully Deleted")
// })
// app.put("/user", (req,res)=>{
//     res.send("Successfully Updated entire record")
// })
// app.patch("/user", (req,res)=>{
//     res.send("Successfully Updated a field")
// })

// // practicing in routes

// app.get("/abcd",(req,res)=>{
//     console.log("Query res : ",req.query)
//     res.send({firstName : "Sandy", lastName : "Baniya"})
// })
app.use(express.json());
app.get("/check1", (req, res, next) => {
  next();
  res.send("check1");
});
app.get("/check1", (req, res, next) => {
  next();
});

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
   console.log("mark 3",userPassword)
   const validPassword = await bcrypt.compare(password,userPassword)
   if(!validPassword)
    throw new Error("Credentials is invalid")
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
// API /user , get  user by  id
// app.get("/user", async (req, res) => {
// try{
//   const id = req.body.id;
// const fetchUser = await User.findById(id)
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
// API /user , delete user by  id
// app.delete("/user", async (req, res) => {
// try{
//   const id = req.body.id;
// const response = await User.deleteOne({_id: id})

// res.json({
//   sucess : true,
//   message: "Data succesfully are deleted",
//   Response : response
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

//API /user , update a user by id
// app.patch("/user", async (req, res) => {
// try{
//   const id = req.body.id;
// const response = await User.findByIdAndUpdate(id , {firstName : "Raavan"})

// res.json({
//   sucess : true,
//   message: "Data succesfully are updated",
//   Response : response
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
//API /user , update a user by email id
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
