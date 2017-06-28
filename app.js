const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

var url = 'mongodb://localhost:27017/test';

MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to database");

    db.close();
})

app.get('/', function (req, res) {
    res.send('Welcome to EFG3!')
})

app.listen(3000, function () {
    console.log('Server listening on port 3000.')
})