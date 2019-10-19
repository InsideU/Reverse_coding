const express = require('express');
const app = express();
const mysql = require('mysql');
const multer = require('multer');
const router = require('express').Router();
const teamPolicy = require('./teamPolicy');


router.post('/dashboard',teamPolicy,(req,res)=>{
    var teamnumber = req.teamno;
    let sql=`select * from dashboard where teamno=${teamnumber}`;
    req.db.query(sql,(err,results)=>{
        let sql1=`select * from score where Teamid=${teamnumber}`;
        req.db.query(sql1,(err,result)=>{
            res.json({
                TeamName: results[0].teamName,
                members: results,
                TotalScore:result[0].score
            })
        })
        

    });
});

module.exports=router;


//  localhost:3000/dashboard?teamno=1