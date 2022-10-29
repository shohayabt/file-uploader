const express = require("express");
const app = express();
const port = 3000 || 5000



app.get("/", (req,res)=>{
    res.send("Hello Programmers")
})
app.listen(port,()=>{
    console.log(`SERVER IS UP - PORT:${port}`)
})