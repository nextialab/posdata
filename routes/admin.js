var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('admin');
});

router.get('/templates/:template', function (req, res, next) {
    res.render('partials/' + req.params.template);
});

module.exports = router;
