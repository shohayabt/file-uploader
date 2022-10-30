const express = require("express");
const multer = require("multer")
const app = express();
const path = require('path')
const port = 3000 || 5000

// LocalFileSystem 
const UPLOAD_FOLDER =  './uploads';
app.use(express.json())
// Disk Storage 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,UPLOAD_FOLDER )
      },
    filename: (req,file,cb)=>{
        const fileName = file.originalname
        const fileExt = path.extname(fileName)
        const newFileName = fileName.replace(fileExt," ").toLowerCase().split(" ").join("-") + "-" + Date.now()
        cb(null, newFileName + fileExt)
    }
})

// multer workstation
const upload = multer({ // it will return a middleware 
    storage:storage,
    limits:{
        fileSize:300000, // 300KB
    },
    fileFilter:(req,file,cb)=>{
        if(
            file.mimetype === "image/png"
        ){
            cb(null,true)
        }else{
            cb(new Error("only png file allowed"))
        }
    }
})


app.get("/",(req,res)=>{
    res.send("Hello Programmer")
})
app.post("/upload", upload.single("profilePicture"), (req,res)=>{
    res.send(req.file)
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