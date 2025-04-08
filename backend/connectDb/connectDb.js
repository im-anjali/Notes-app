const mongoose = require('mongoose')
require('dotenv').config();

const connectDB = async () =>{
    try {
        const c = await mongoose.connect(process.env.MONGOURL);
        console.log("mongo db connected")
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}
module.exports = connectDB;