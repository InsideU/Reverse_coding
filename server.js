const express = require('express');
const app = express();
const mysql = require('mysql');
const allotment=require('./questionallotment');
const question = require('./questionsfetch')
const bidding = require('./bidding')
const leaderboard = require('./leaderboard')
const dasboard = require('./dashboard');
const me = require('./me')
var cors = require('cors')
app.use(cors())
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'revcoding'
});

db.connect(err => {
    if (err) throw err
    app.use((req, res, next) => {
        req.db = db
        next()
    })
    
    app.use(leaderboard);
    app.use(bidding);
    app.use(question);
    app.use(allotment);
    app.use(dasboard);
    app.use(me);
})

app.listen(3000, () => {
    console.log('Server started');
});