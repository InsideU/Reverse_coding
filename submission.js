const express = require('express');
const app=express();
const mysql=require('mysql');
const multer = require('multer');
judge = require('./judge')
var teamNumber;

// storing the current file location to be executed in the database
// app.post('/api/userfile',function(req,res){
//     const parameters = req.query;
//             global.teamnumbers = parameters.teamno;
//             global.questionnumbers= parameters.qno;
//             console.log(teamnumbers);
//             console.log(questionnumbers);
//     });

//end of the storing code


// File storage code begins here
var storage= multer.diskStorage({
    
    destination : function( req,file,callback){
        callback(null,'./uploads');
    },
    filename: function (req, file, callback) {
        teamNumber = req.query.teamno;
        const questionNumber=req.query.qno;
        global.filetypes= req.query.type;
        filename=`${questionNumber}_${teamNumber}` + '-' + Date.now()+`.${filetypes}`;
        callback(null, filename);
        // start of the judge 
        
        // var userfile=file.originalname
        // console.log(userfile);

// console.log(
    console.log(questionNumber);
    console.log(filename);
        //end of the judge code 
    // console.log(filetypes);
      
    }
    });

    
    var uploads=multer({storage : storage}).single('file');
    app.post('/api/userfile',function(req,res){
        // const parameters = req.query;
        // const teamnumbers = parameters.teamno;
        // const questionnumbers= parameters.qno;
        // console.log(questionnumbers)
        uploads(req,res,function(err) {
            if(err) {
                console.log(err.message)
                return res.end("Error uploading file.");
            }
           
            // console.log("this is the ",`${filetypes}`)
        //    console.log(req.file.filename)  // current uploaded filename
           judge( `./uploads/${filename}`, [
            `D:\\nodejs\\reverse_coding\\reverse_codingv2\\files\\ques\\1\\test\\I1.txt`,
            `D:\\nodejs\\reverse_coding\\reverse_codingv2\\files\\ques\\1\\test\\I2.txt`,
        ], [
            `D:\\nodejs\\reverse_coding\\reverse_codingv2\\files\\ques\\1\\test\\O1.txt`,
            `D:\\nodejs\\reverse_coding\\reverse_codingv2\\files\\ques\\1\\test\\O2.txt`,
        ], `${filetypes}`).then((result) => {
            
            // console.log({
            //     err: false,
            //     result, points: 150
            // })
            count =0;
            result.forEach((elements)=>{
                console.log(elements)
                if(elements==true){
                    count+=1
                }
                });
                var points = (count/4)*150;
                // console.log({
                //     counts : count ,
                //     points: (count/2)*150
                // })
                db.connect((err)=>{
                    if(err) throw err;
                console.log(teamNumber);
                let sql3=`select * from score where Teamid=${teamNumber}`;
                db.query(sql3,(err,result)=>{
                    if(result.length==0){
                        let sql = `insert into score values(${teamNumber},${points})`;
                        db.query(sql,(err,results)=>{
                            if(err) console.log(err.message);
                        console.log("inserted the field successfully",results); 
                     });
                    }
                    else{
                        let marks=`select (score) from score where Teamid=${teamNumber}`;
                        db.query(marks,(err,results)=>{
                            if(err) throw err;
                        var last_score=results[0].score;
                        uscore=update_score(last_score,`${points}`);
                            
                        let sql2=`update score set score=${uscore} where Teamid=${teamNumber}`;
                        db.query(sql2,(err,result1)=>{
                            if(err) throw err;
                        console.log(result1);
                        })
                        });
                        
                  
                    }
                
                
                       
                // console.log(result)
                    // }
                })

                
            });
        }).catch(e => {
            console.log({
                err: true,
                message: e
            });
        });
            res.end("File is uploaded");

            
        });
    });

// File storing code ends here

app.listen(3000,function(){
    console.log("Working on port 3000");
});

// create connection with the database

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'revcoding'
});


//connect 
// db.connect((err) => {
//     if (err) {
//         throw err;
//     }
//     // console.log('mysql connected');

// });
function update_score(last_score,present_score){
    
    if(last_score > present_score){
        return last_score;
    }
    else{
        return (present_score);
    }
}