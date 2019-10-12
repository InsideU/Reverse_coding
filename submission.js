const express = require('express');
const app=express();
const multer = require('multer');
var storage= multer.diskStorage({
    destination : function( req,file,callback){
        callback(null,'./uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
      
    }
    });
    var uploads=multer({storage : storage}).single('file');
    app.post('/api/userfile',function(req,res){
        uploads(req,res,function(err) {
            if(err) {
                console.log(err.message)
                return res.end("Error uploading file.");
            }
            console.log(req.files)
            res.end("File is uploaded");
        });
    });

app.listen(3000,function(){
    console.log("Working on port 3000");
});