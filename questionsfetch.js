const express = require('express');
const mysql =require('mysql');

const app=express();
app.use('/download',express.static('./files/download'))
//downloading the zip file from the system 
app.get('/downloads',(req,res)=>{
    db.connect((err)=>{
        var parameters=req.query;
       const teamnumber=parameters.teamno;
       console.log(teamnumber);
        if(err){
            console.log("Wait for the questions to be alloted");
        }
        let sql1=`select * from questions where teamno = ${teamnumber}` ;
        db.query(sql1,(err,results)=>{
            if(err) throw err;
            var filename=results[0].filehash
            console.log(results[0].filehash)
            // res.send(results)
            res.json({
                win:`/download/${filename}/${id}_run.exe`,
                mac:`/download/${filename}/run.o`,
            })
        });
        
        // console.log('You Have been alloted a Question');
        // var filepath=__dirname+'/downloads/RC2.exe';
        // res.download(filepath)
    }); //end of the database connection
   
});//end of the zip file downloading


// create connection 

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'revcoding'
});
//connect 
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('mysql connected');
    
});

// routing condition 







app.listen('3000',()=>{
    console.log('Server started on port 3000');
});

