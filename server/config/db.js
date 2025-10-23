const mongoose = require("mongoose")


const dbConnected = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
      console.log("MongoDB Database Connected Successfully");
    } catch (error) {
       console.error("MongoDB Connection Failed!");
        console.error("Error:", error.message);
        process.exit(1);
    }
}


module.exports = dbConnected;

