var express = require('express');
var mongoose = require('mongoose');

var config = require('./config');
var VisualKey = require('./models/visualkey');

var app = express();

// Connect to mongodb database
mongoose.connect(config.mongodb.url);

// Route for obtaining key data by id
app.get('/api/key/:id', function (req, res) {

    // Retrieve the visual key document from mongo by id
    VisualKey.findOne({ 'id': req.param('id') }, { _id: 0 }).lean().exec(function (err, key) {
        if (err) throw err;

        res.json(key);
    });

    // TODO: error if query returns no result
});

// Start the server and listen on port 3000
app.listen(3000, function () {
    console.log('Server listening on port 3000.')
});