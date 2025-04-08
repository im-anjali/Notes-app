const express = require('express');
const app = express();
const dotenv = require("dotenv");
app.use(express.json())
const route = require("./routes/route")
const connectDb = require("../backend/connectDb/connectDb")
connectDb();
const PORT = 3000 || process.env.PORT ;
app.get('/', (req, res)=>{
    res.send('hello world');
})
app.use('/user', route);
app.listen(PORT, (req, res)=>{
    console.log(`server is running on port http://localhost:${PORT}`)
})
