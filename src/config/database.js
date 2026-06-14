const mongoose = require('mongoose')

const connectDB = async ()=>{
    // try{
        await mongoose.connect("mongodb+srv://sbehra0000_db_user:HQZgT8qri73Uby0I@black-backend.yksmccw.mongodb.net/matchMind")
        console.log("Database is connected")

    // }
    // catch(err){
    //     console.error("Error in connecting to Database : ",err)
    // }
}

module.exports = connectDB;