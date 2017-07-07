var express = require('express');
var mongoose = require('mongoose');

var config = require('./config');
var VisualKey = require('./models/visualkey');

mongoose.Promise = Promise;

var app = express();

// Connect to mongodb database
mongoose.connect(config.mongodb.url);

// For serving static files
app.use(express.static('public'));

// Route for obtaining list of available keys
app.get('/api/keys', function (req, res) {

    // Retrieve the list of visual key documents from mongo
    VisualKey.find({ }, { _id: 0, id: 1, name: 1 }).lean().exec(function (err, keys) {
        if (err) throw err;

        res.json(keys);
    });
});

// Route for obtaining key data by id
app.get('/api/key/:id', function (req, res) {

    // Retrieve the visual key document from mongo by id
    VisualKey.findOne({ 'id': req.params.id }, { _id: 0 }).lean().exec(function (err, key) {
        if (err) throw err;

        res.json(key);
    });

    // TODO: error if query returns no result
});

// Start the server and listen on port
app.listen(process.env.PORT || 3000, function () {
    console.log('Server listening on port 3000.')
});
