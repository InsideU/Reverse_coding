const express = require('express');
const mysql= require('mysql');
const router=require('express').Router()
const app = express();

router.get('/leaderboard',(req,res)=>{
    sql='select score totalscore,durationtime as lastUpdate,teamname as teamName from score order by totalscore desc,lastUpdate asc';
    req.db.query(sql,(err,results)=>{
        if(err) console.log(err.message)
        res.json(results);  
    });
});


module.exports=router;