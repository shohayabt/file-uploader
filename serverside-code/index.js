const express = require("express");
const multer = require("multer")
const app = express();
const port = 3000 || 5000


app.use(express.json())

// LocalFileSystem 
const UPLOAD_FOLDER =  './uploads/';
// multer workstation
const upload = multer({ // it will return a middleware 
    dest: UPLOAD_FOLDER
})


app.get("/",(req,res)=>{
    res.send("Hello Programmer")
})
app.post("/upload", upload.single('profilePicture'), (req,res)=>{
    res.json({"status":"successfull"})
})
app.listen(port,()=>{
    console.log(`SERVER IS UP - PORT:${port}`)
})