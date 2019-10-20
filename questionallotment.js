const express= require('express');
const mysql = require('mysql');
const app=express();
const router = require('express').Router();

router.get('/allotments',function(req,res){
    var teamnumber=req.query.teamno;
    var questionnumber=req.query.qno;
    var bidrate=req.query.bid;
    console.log('this part',teamnumber);
    
        console.log(teamnumber,questionnumber);
           
        sql=`insert into allotment(Teamid,questionno,bidrate,allotmenttime) values(${teamnumber},${questionnumber},${bidrate},now())`;
        req.db.query(sql,(err,results)=>{
            if(err) throw err;
        else{
            sql=`select (score) from score where Teamid=${teamnumber}`  
            req.db.query(sql,(err,result)=>{
                pscore=result[0].score
                if (err) throw err
                if(bidrate<pscore ){
                    sqll=`update score set score=(score-${bidrate}) where Teamid=${teamnumber} `; 
                    req.db.query(sqll,(err,resultss)=>{
                        if(err) throw err;
                    console.log(resultss);
                    })    
                }
                else{
                    res.json("You dont have enough credits");
                }
            }) 
            res.json("Question Alloted");
        }
        
        })   
       

 
});

module.exports=router;

// http://localhost:3000/allotments?teamno=121&qno=10&bid=50