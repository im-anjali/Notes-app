const express = require('express');
const app = express();
const dotenv = require("dotenv");
app.use(express.json())
const userRoute = require("./routes/userRoutes")
const connectDb = require("../backend/connectDb/connectDb")
const noteRoute = require("./routes/noteRoute")
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
