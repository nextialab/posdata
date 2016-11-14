var uuid = require('uuid');

var live = (1000 * 60 * 60 * 24 * 30); // 30 days in milliseconds
//var live = 1000 * 60; // 30 seconds in milliseconds

exports.findToken = function (user) {
    var model = this;
    return new Promise(function (resolve, reject) {
        model.findOne({user: user}).exec().then(function (token) {
            var now = new Date();
            var expires = new Date(now.getTime() + live);
            var delta = expires.getTime() - now.getTime();
            if (token) {
                if (now.getTime() >= token.expires) {
                    // update token
                    token.expires = expires;
                    token.token = uuid.v4();
                    token.save(function (err) {
                        if (!err) {
                            resolve({token: token.token, expires: delta});
                        } else {
                            reject({reason: 'internal', err: err});
                        }
                    });
                } else {
                    delta = token.expires.getTime() - now.getTime();
                    resolve({token: token.token, expires: delta});
                }
            } else {
                model.create({user: user._id, token: uuid.v4(), expires: expires}).then(function (token) {
                    resolve({token: token.token, expires: delta});
                }, function (err) {
                    reject({reason: 'internal', err: err});
                });
            }
        }, function (err) {
            reject({reason: 'internal', err: err});
        });
    });
};

exports.updateToken = function (userid, callback) {
    var model = this;
    model.findOne({user: userid}).exec(function (err, token) {
        if (!err && token) {
            var now = new Date();
            var expires = new Date(now.getTime() + live);
            var delta = expires.getTime() - now.getTime();
            token.expires = expires;
            token.token = uuid.v4();
            token.save(function (err) {
                if (!err) {
                    callback.onResult({token: token.token, expires: delta});
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
    var model = this;
    return new Promise(function (resolve, reject) {
        model.findOne({user: userid, token: token}).populate('user').exec().then(function (token) {
            var now = new Date();
            if (token.expires > now.getTime()) {
                resolve(token);
            } else {
                reject();
            }
        }, function (err) {
            reject(err);
        });
    });
};
