const express = require('express');
const app = express();
const dotenv = require("dotenv");
app.use(express.json())
const route = require("./routes/route")

const PORT = process.env.PORT || 3000;
app.get('/', (req, res)=>{
    res.send('hello world');
})
app.use('/user', route);
app.listen(PORT, (req, res)=>{
    console.log(`server is running on port http://localhost:${PORT}`)
})
