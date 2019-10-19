const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    try {
        token = req.get('Authorization').split(' ')[1]

        decoded = jwt.verify(token, "mysecretkey123");
        //  console.log(decoded._id)
        sql = `select * from dashboard where _id='${decoded._id}'`;
        req.db.query(sql, (err, results) => {
            if (err) throw err;
            if(!results.length){
                res.status(404).json({
                    err : true,
                    msg : 'User not allowed'
                })
            }
            team = results[0].teamno;
            member=decoded._id;
            req.teamno = team;
            req.memberno= member
           // console.log("This is teamPolicy", req.teamno);
            next();
        });



    } catch (e) {
        console.log(e.message)
        console.log('Error decoding token');
        res.status(401).json({ err: e.message })
    }


}

