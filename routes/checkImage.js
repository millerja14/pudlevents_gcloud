var express = require('express');
var path = require('path');
var fs = require('fs');

var multer = require('multer');
var upload = multer({dest: 'uploads/'});


var router = express.Router();

var visionClient = require(path.join(__dirname, '../', 'GoogleAPI/vision.js')).visionClient;

var checkImage = function(fileName) {
    var labels = [];

    visionClient.detectLabels(fileName).then(function(results) {
        labels = results[0];
    });

    console.log('Labels:');

    labels.forEach(function(label) {
        console.log(label);
    });
}

router.post('/', upload.single('pudlImage'), function(req, res) {
    var types = ['labels'];
    console.log('Received an image: ', req.file.path);

    // Send the image to the Cloud Vision API
    visionClient.detect(req.file.path, types, function(err, detections, apiResponse) {

        if (err) {
            res.end('Sorry, cant recognize anything in that picture');
        } else {
            if (detections.indexOf('puddle') > -1) {
                res.status(200);
                res.send('success');
            } else {
                res.status(200);
                res.send('Sorry, that is a ' + detections[0]);
            }
        }
    });
});

module.exports = router;