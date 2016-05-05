var uuid = require('uuid');

exports.findToken = function (user, callback) {
    var model = this;
    model.findOne({username: user}).exec(function (err, token) {
        if (!err) {
            if (token) {
                callback.onResult(token);
            } else {
                model.create({username: user, token: uuid.v4()}, function (err, token) {
                    if (!err) {
                        callback.onResult(token);
                    } else {
                        callback.onError();
                    }
                });
            }
        } else {
            callback.onError();
        }
    });
};

exports.isAuthenticated = function (username, token, callback) {
    this.findOne({username: username, token: token}).exec(function (err, token) {
        if (!err) {
            if (token) {
                callback.onResult();
            } else {
                callback.onError();
            }
        } else {
            callback.onError();
        }
    });
};
