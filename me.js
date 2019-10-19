const express = require('express');
const app = express();
const mysql = require('mysql');
const multer = require('multer');
const router = require('express').Router();
const teamPolicy = require('./teamPolicy');

router.post('/me', teamPolicy, function (req, res) {
    teamNumber = req.memberno
    console.log(teamNumber);
    let sql=`select * from dashboard where _id='${teamNumber}'`;
    req.db.query(sql,(err,results)=>{

        if(err) throw err;
        console.log(decoded);
    res.json(results[0]);
    });
});
    module.exports=router;
    



