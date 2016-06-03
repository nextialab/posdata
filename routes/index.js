var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var Meta = mongoose.model('Meta');

/* GET home page. */
router.get('/', function(req, res, next) {
    Meta.getSelectedTheme({
        success: function (theme) {
            res.render(theme + '/index', { title: 'Posdata' });
        }
    });
});

module.exports = router;
