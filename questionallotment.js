const express= require('express');
const mysql = require('mysql');

const app=express();

//connection to the database

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'revcoding'
});
// connection established

app.get('/allotments',function(req,res){
    var teamnumber=req.query.teamno;
    var questionnumber=req.query.qno;
    console.log('this part',teamnumber);
    db.connect((err)=>{
        console.log(teamnumber,questionnumber);
           if (err) throw err;
        sql=`insert into allotment values(${teamnumber},${questionnumber})`;
        db.query(sql,(err,results)=>{
            if(err) console.log('Question Already alloted');
        else{
            console.log("Question Alloted");
        }
        
        })      

    });
});
app.listen('3000', () => {
    console.log('Server started on port 3000');

});