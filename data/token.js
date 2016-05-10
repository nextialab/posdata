var uuid = require('uuid');

exports.findToken = function (user, callback) {
    var model = this;
    model.findOne({user: user}).exec(function (err, token) {
        if (!err) {
            if (token) {
                callback.onResult(token);
            } else {
                model.create({user: user._id, token: uuid.v4()}, function (err, token) {
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

exports.isAuthenticated = function (userid, token, callback) {
    this.findOne({user: userid, token: token})
    .populate('user')
    .exec(function (err, token) {
        if (!err) {
            if (token) {
                callback.onResult(token.user);
            } else {
                callback.onError();
            }
        } else {
            callback.onError();
        }
    });
};
