const express = require('express');
const mysql =require('mysql');

const app=express();

//downloading the zip file from the system 
app.get('/downloads',(req,res)=>{
    console.log("Into the download section");
    var filepath=__dirname+'/downloads/RC2.exe';
    res.download(filepath)
});
//end of the zip file downloading


// create connection 

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'rollcall'
});
//connect 
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('mysql connected');
    
});

// routing condition 

app.get('/getposts',(req,res)=>{
    let sql="Select * from token";
    let query =db.query(sql,(err,results)=>{
        if(err) throw err;
        console.log(results);
        res.send(results);
    });
});





app.listen('3000',()=>{
    console.log('Server started on port 3000');
});

