var express = require('express');
var oauth = require('../modules/oauth');
var valid = require('../modules/valid');
var mongoose = require('mongoose');

var router = express.Router();
var Archetype = mongoose.model('Archetype');

router.get('/', oauth.basic(), function (req, res, next) {
    Archetype.find({}).exec().then(function (archetypes) {
        res.json(archetypes);
    }, function (err) {
        res.status(500).json({error: 'Could not execute query'});
    });
});

router.get('/fields', oauth.basic(), function (req, res, next) {
    res.json(['Numeric', 'String', 'URL', 'Image', 'Array']);
});

router.post('/', oauth.basic(), valid.validate(['name']), function (req, res, next) {
    Archetype.create({
        name: req.body.name
    }).then(function (archetype) {
        res.json(archetype);
    }, function (err) {
        res.status(500).json({error: 'Could not create entity'});
    });
});

router.put('/:archetypeid', oauth.basic(), function (res, res, next) {
    var archetypeid = mongoose.Types.ObjectId(req.params.archetypeid);
    Archetype.findById(archetypeid).then(function (archetype) {
        if (!req.body.name) { archetype.name = req.body.name; }
        if (!req.body.fields) { archetype.data = req.body.fields; }
        return archetype.save();
    }, function (err) {
        res.status(404).json({error: 'Could not find entity'});
    }).then(function (archetype) {
        res.json(archetype);
    }, function (err) {
        res.status(500).json({error: 'Could not update entity'});
    });
});

module.exports = router;