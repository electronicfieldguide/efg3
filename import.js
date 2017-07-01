var mongoose = require('mongoose');
var fs = require('fs');
var config = require('./config');

var VisualKey = require('./models/visualkey');

mongoose.connect(config.mongodb.url);

fs.readFile('json/data.json', function(err, data) {
    var docs = JSON.parse(data);

    docs.forEach(function (doc) {

        var prependImgUrl = function (node) {
            if (node.image) {
                node.image = config.images.url + node.image;
            }

            if (node.children) {
                node.children.forEach(prependImgUrl);
            }
        };

        doc.nodes.forEach(prependImgUrl);

        var document = new VisualKey(doc);

        document.save(function(err) {
            if (err) throw err;

            console.log('VisualKeyDocument saved successfully!');
        });
    });
});