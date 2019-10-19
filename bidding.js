const express = require('express');
const app = express();
const mysql = require('mysql');
const multer = require('multer');
const router = require('express').Router();
const teamPolicy = require('./teamPolicy');
judge = require('./judge')
var teamNumber;

// File storage code begins here
var storage = multer.diskStorage({

    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        teamNumber = req.teamno;
        const questionNumber = req.query.qno;
        global.filetypes = req.query.type;
        filename = `${questionNumber}_${teamNumber}` + '-' + Date.now() + `.${filetypes}`;
        callback(null, filename);

        console.log(questionNumber);
        console.log(filename);

    }
});

var uploads = multer({ storage: storage }).single('file');
router.post('/api/userfile', teamPolicy, uploads,function (req, res) {
    console.log(req.query)
    const parameters = req.query;
    teamNumber = req.teamno
    const questionNumber = parameters.qno;

    // verifyin the question to be submitted
    sql = `select * from allotment where Teamid=${teamNumber} and questionno=${questionNumber}`
    req.db.query(sql, (err, results) => {
        console.log(teamNumber,questionNumber);
        if (!results.length) {
            return res.status(404).json({
                err: true,
                msg: "This question is not alloted to you"
            })
        }


        //end of the verification

        // uploads(req, res, function (err) {
        //     if (err) {
        //         console.log(err.message)
        //         return res.end("Error uploading file.");
        //     }




            judge(`./uploads/${filename}`, [
                `D:\\nodejs\\reverse_coding\\reverse_codingv2\\files\\ques\\${1}\\test\\I1.txt`,
                `D:\\nodejs\\reverse_coding\\reverse_codingv2\\files\\ques\\${1}\\test\\I2.txt`,
            ], [
                `D:\\nodejs\\reverse_coding\\reverse_codingv2\\files\\ques\\${1}\\test\\O1.txt`,
                `D:\\nodejs\\reverse_coding\\reverse_codingv2\\files\\ques\\${1}\\test\\O2.txt`,
            ], `${filetypes}`).then((result) => {


                count = 0;
                result.forEach((elements) => {
                    console.log(elements)
                    if (elements == true) {
                        count += 1;
                    }
                });
                var points = (count / 4) * 200;



                if (err) throw err;
                console.log(teamNumber);
                let marks = `select (qscore) from allotment where Teamid=${req.teamno} and questionno=${questionNumber}`;
                req.db.query(marks, (err, results) => {
                    if (err) throw err;
                    var last_score = results[0].qscore;
                    console.log(last_score);


                    if (last_score < points) {
                        diff = points - last_score;
                        let sql2 = `update allotment set qscore=${points} where Teamid=${teamNumber} and questionno=${questionNumber}`;
                        req.db.query(sql2, (err, result1) => {
                            if (err) throw err;
                            console.log(result1);
                
                           })
                        let sql5=`select * from allotment where Teamid=${req.teamno}`
                        req.db.query(sql5,(err,result5)=>{
                        
                        console.log('this is result5',result5);  
                         let sql = `update score set score=score+${diff} where Teamid=${teamNumber}`;
                            req.db.query(sql, (err, results) => {
                                if (err) throw err;
                                console.log(results);
                            })
                        })
                    }
                            res.json({
                                err : false,
                                points,
                                result : result
                            })
                });


            }).catch(e => {
                res.json({
                    err: true,
                    msg: e
                });
            });

         })//last bracked


    });
// });
function update_score(last_score, present_score) {

    if (last_score > present_score) {
        return last_score;
    }
    else {
        return (present_score);
    }
}
module.exports = router;

// http://localhost:3000/api/userfile?teamno=121&&qno=2&&type=py