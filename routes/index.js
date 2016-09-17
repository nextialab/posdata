var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var Meta = mongoose.model('Meta');

/* GET home page. */
router.get('/', function(req, res, next) {
    Meta.getSelectedTheme().then(function (theme) {
        res.render(theme.value + '/index', { title: 'Posdata' });
    }, function (err) {
        res.render('default/index', { title: 'Posdata' });
    });
});

module.exports = router;
