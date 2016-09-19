var express = require('express');
var multer = require('multer');
var mongoose = require('mongoose');
var mime = require('mime');
var oauth = require('../modules/oauth');

var Media = mongoose.model('Media');

var router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype));
    }
});

var uploading = multer({
    storage: storage,
    limits: { fileSize: 1000000, files: 1 }
});

router.get('/:userid', oauth.basic(), function (req, res, next) {
    Media.find({user: mongoose.Types.ObjectId(req.params.userid)}).sort('-createdOn').exec().then(function (medias) {
        res.json(medias);
    }, function (err) {
        res.status(404).json({error: 'Media was not found for user'});
    });
});

router.post('/:userid', oauth.basic(), uploading.single('image'), function (req, res, next) {
    var newMedia = {};
    newMedia.user = mongoose.Types.ObjectId(req.params.userid);
    newMedia.path = '/uploads/' + req.file.filename
    if (req.body.label) { newMedia.label = req.body.label; }
    if (req.body.caption) { newMedia.caption = req.body.caption; }
    Media.create(newMedia).then(function (media) {
        res.json(media);
    }, function (err) {
        res.status(500).json({error: 'Could not create Media'});
    });
});

router.put('/:userid/media/:mediaid', oauth.basic(), function (req, res, next) {
    Media.findById(mongoose.Types.ObjectId(req.params.mediaid)).then(function (media) {
        if (media) {
            if (req.body.label) { media.label = req.body.media; }
            if (req.body.caption) { media.caption = req.body.caption; }
            media.save().then(function (media) {
                res.json(media);
            }, function (err) {
                res.status(500).json({error: 'Could not update media'});
            });
        } else {
            res.status(404).json({error: 'Media was not found'});
        }
    }, function (err) {
        res.status(500).json({error: 'Could not find Media'});
    });
});

module.exports = router;
