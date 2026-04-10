const express = require("express")
const app = express()
const PORT = 7777;
// app.use((req,res)=>{
//     res.send("this is main base route")
// })
app.use("/defaults",(req,res)=>{
    res.send("This drefault handling server")
})
app.use("/default/test",(req,res)=>{
    res.send("This drefault test handling server")
})
app.listen(PORT,()=>{
    console.log("server is running....")
})
app.use("/test",(req, res)=>{
    res.send("This is test handling")
})