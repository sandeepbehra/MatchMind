const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/User");
const app = express();
const PORT = 7777;
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

app.get("/check1", (req, res, next) => {
  next();
  res.send("check1");
});
app.get("/check1", (req, res, next) => {
  next();
});

app.post("/signup", async (req,res) => {
  const userData = {
    firstName: "oradeep",
    lastName: "Behra",
    email: "sandeep@behra.com",
    password: "12345",
    _id : "6a2d763019f907aa53caa4j"
  };
  const newUser = new User(userData);
  try {
    await newUser.save();
    res.send("User has been signed up");
  } catch (error) {
    res.status(400).send("Error in signup user : "+error.message);
  }
});

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
