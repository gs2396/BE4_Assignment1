const mongoose = require("mongoose")
require("dotenv").config()

const mongoURI = process.env.MONGODB_URI;


const initializeDatabase = async() => {
    try{
        const connection = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        if(connection) {
            console.log("Connected Successfully.")
        }

    }
    catch(error){
        console.log("Failed to connect", error)
    }
}

module.exports = { initializeDatabase }