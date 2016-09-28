var uuid = require('uuid');

var live = (1000 * 60 * 60 * 24 * 30); // 30 days in milliseconds

exports.findToken = function (user) {
    var model = this;
    return new Promise(function (resolve, reject) {
        model.findOne({user: user}).exec().then(function (token) {
            var now = new Date();
            var expires = new Date(now.getTime() + live);
            if (token) {
                if (now.getTime() >= token.expires) {
                    // update token
                    token.expires = expires;
                    token.token = uuid.v4();
                    token.save(function (err) {
                        if (!err) {
                            resolve(token);
                        } else {
                            reject({reason: 'internal', err: err});
                        }
                    });
                } else {
                    resolve(token);
                }
            } else {
                model.create({user: user._id, token: uuid.v4(), expires: expires}).then(function (token) {
                    resolve(token);
                }, function (err) {
                    reject({reason: 'internal', err: err});
                });
            }
        }, function (err) {
            reject({reason: 'internal', err: err});
        });
    });
    /*var model = this;
    model.findOne({user: user}).exec(function (err, token) {
        if (!err) {
            if (token) {
                var now = new Date();
                if (now.getTime() >= token.expires) {
                    callback.onError('{reason: "expired"}');
                } else {
                    callback.onResult(token);
                }
            } else {
                var now = new Date();
                var expires = new Date(now.getTime() + live);
                model.create({user: user._id, token: uuid.v4(), expires: expires}, function (err, token) {
                    if (!err) {
                        callback.onResult(token);
                    } else {
                        callback.onError(err);
                    }
                });
            }
        } else {
            callback.onError(err);
        }
    });*/
};

exports.updateToken = function (userid, callback) {
    var model = this;
    model.findOne({user: userid}).exec(function (err, token) {
        if (!err && token) {
            var now = new Date();
            var expires = new Date(now.getTime() + live);
            token.expires = expires;
            token.token = uuid.v4();
            token.save(function (err) {
                if (!err) {
                    callback.onResult(token);
                } else {
                    callback.onError();
                }
            });
        } else {
            callback.onError();
        }
    });
}

exports.isAuthenticated = function (userid, token) {
    return this.findOne({user: userid, token: token}).populate('user').exec();
    /*this.findOne({user: userid, token: token})
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
    });*/
};
