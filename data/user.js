var bcrypt = require('bcryptjs');

exporst.findUserByUserAndPass = function (username, password, callback) {
    this.findOne({username: username}).exec(function (err, user) {
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
