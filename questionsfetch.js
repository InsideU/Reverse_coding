const express = require('express');
const mysql = require('mysql');
const router = require('express').Router()
const teamPolicy = require('./teamPolicy');
const app = express();


function run(i, arr, results,db,cb) {
    if (i >= results.length) return cb(arr)
    var questionnumbers = Number(results[i].questionno);
    let sql2 = `select (route) from routetest where questionno=${questionnumbers}`;
    db.query(sql2, (err, res) => {
        if (err) throw err;
       //console.log(res)
        arr.push({
            win: res[0].route,
            scoredPoints: questioscore,
            _id: questionnumbers
        })
        run(i + 1, arr,results,db,cb)
        //res.json(results);  // here is the sychronization problem
        // console.log({
        //     win: results[0].route,
        //     score: questioscore,
        //     qid: questionnumbers
        // })
    });

    // a=await req.db.query(sql2);
    // console.log(a)
}

router.use('/download', express.static('./files/download'))
router.post('/downloads',teamPolicy, (req, res) => {

    
    let sql1 = `select * from allotment where teamid = ${req.teamno}`;
    req.db.query(sql1, (err, results) => {
        if (err) throw err;
        questioscore = (results[0].qscore)   // qscore need to be updated

    
        console.log(results);
        run(0,[],results,req.db,(ar)=>{
            res.json({"Question Details":ar})
        })
        // results.forEach((elements) => {

        // });
    });
});
module.exports = router;








