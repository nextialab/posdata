var bcrypt = require('bcryptjs');

exports.findUserByEmailAndPass = function (email, password, callback) {
    this.findOne({email: email}).exec(function (err, user) {
        if (!err) {
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (result) {
                        callback.onResult(user);
                    } else {
                        callback.onError();
                    }
                })
            } else {
                callback.onError();
            }
        } else {
            callback.onError();
        }
    });
};
