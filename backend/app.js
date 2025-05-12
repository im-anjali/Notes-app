const express = require('express');
const app = express();
const dotenv = require("dotenv");
app.use(express.json())
const cors = require('cors');
const userRoute = require("./routes/userRoutes")
const connectDb = require("../backend/connectDb/connectDb")
const noteRoute = require("./routes/noteRoute")
app.use(cors({
    origin: 'http://localhost:5173',  // Replace with the URL of your React frontend
    credentials: true,                // Allow credentials such as cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allow HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization']  // Allow specific headers
}));
  connectDb();
const PORT = 3000 || process.env.PORT ;
app.get('/', (req, res)=>{
    res.send('hello world');
})


app.use('/user', userRoute);
app.use('/note', noteRoute);
app.listen(PORT, (req, res)=>{
    console.log(`server is running on port http://localhost:${PORT}`)
})
