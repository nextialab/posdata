var mongoose = require('mongoose');

var Token = mongoose.model('Token');

exports.basic = function () {
    return function (req, res, next) {
        if (req.headers.authorization && req.params.userid) {
            var userid = mongoose.Types.ObjectId(req.params.userid);
            Token.isAuthenticated(userid, req.headers.authorization).then(function () {
                next();
            }, function (err) {
                res.status(403).json({error: 'User is not authorized'});
            });
        } else {
            res.status(403).json({error: 'User is not authorized'});
        }
    }
};

exports.role = function (role) {
    return function (req, res, next) {
        if (req.headers.authorization && req.params.userid) {
            var userid = mongoose.Types.ObjectId(req.params.userid);
            Token.isAuthenticated(userid, req.headers.authorization).then(function (token) {
                if (token.user.role === role) {
                    next();
                } else {
                    res.status(403).json({error: 'User is not authorized'});
                }
            }, function (err) {
                res.status(403).json({error: 'User is not authorized'});
            });
        } else {
            res.status(403).json({error: 'User is not authorized'});
        }
    }
}
