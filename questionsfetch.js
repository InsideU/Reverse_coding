const express = require('express');
const mysql = require('mysql');

const app = express();
app.use('/download', express.static('./files/download'))
//downloading the zip file from the system 
app.get('/downloads', (req, res) => {
    db.connect((err) => {
        var parameters = req.query;
        const teamnumber = parameters.teamno;
        //console.log(teamnumber);
        if (err) {
            console.log("Wait for the questions to be alloted");
        }
        let sql1 = `select * from allotment where teamid = ${teamnumber}`;
        db.query(sql1, (err, results) => {
            if (err) throw err;
            results.forEach((elements) => {
                var questionnumbers = elements.questionno;
               // console.log(questionnumbers)
                //see this only one question location is printed
                let sql2 = `select (route) from routetest where qno=${questionnumbers}`;
                //console.log(sql2)

                db.query(sql2, (err, results) => {
                    if (err) throw err;
                    console.log(results);
                });
            });
            //  var filename=results[0].questionno
            //  console.log(results[0].questionno)
            //  res.send(results)
            // res.json({
            //     win:`/download/${filename}/_run.exe`,
            //     mac:`/download/${filename}/run.o`,
            // });
        });

        // console.log('You Have been alloted a Question');
        // var filepath=__dirname+'/downloads/RC2.exe';
        // res.download(filepath)
    }); //end of the database connection

});//end of the zip file downloading


// create connection 

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'revcoding'
});
//connect 
db.connect((err) => {
    if (err) {
        throw err;
    }
    // console.log('mysql connected');

});

// routing condition 







app.listen('3000', () => {
    console.log('Server started on port 3000');
});

