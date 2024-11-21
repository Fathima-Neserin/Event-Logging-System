const mongoose = require("mongoose");

const dBConnection = () => {
    try {

        mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected");
        
    } catch (error) {
       console.error("Something went wrong, cannot connect to db", error.message)   
    }
}

module.exports = dBConnection;