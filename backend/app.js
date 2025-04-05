const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res)=>{
    res.send('hello world');
})
app.listen(PORT, (req, res)=>{
    console.log(`server is running on port http://localhost:${PORT}`)
})