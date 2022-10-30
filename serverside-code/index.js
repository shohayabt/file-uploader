const express = require("express");
const multer = require("multer")
const app = express();
const port = 3000 || 5000


app.use(express.json())

// LocalFileSystem 
const UPLOAD_FOLDER =  './uploads/';
// multer workstation
const upload = multer({ // it will return a middleware 
    dest: UPLOAD_FOLDER,
    limits:{
        fileSize:300000, // 300KB
    },
    fileFilter:(req,file,cb)=>{
        if(
            file.mimetype === "image/png"
        ){
            cb(null,true)
        }else{
            cb('Only png file is allowed')
        }
    }
})


app.get("/",(req,res)=>{
    res.send("Hello Programmer")
})
app.post("/upload", upload.single("profilePicture"), (req,res)=>{
    res.json({"status":"successfull"})
})


// Error Handler 
app.use((err ,req,res,next)=>{
    if(err){
        if(err instanceof multer.MulterError){
            res.status(500).send(err.message)
        }else{
            res.status(500).send("something went wrong")
        }
    }else{
        res.status(200).json({"status":"successfull"})
    }
})
app.listen(port,()=>{
    console.log(`SERVER IS UP - PORT:${port}`)
})