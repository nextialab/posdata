var bcrypt = require('bcryptjs');

exports.findUserByEmailAndPass = function (email, password) {
    var model = this;
    return new Promise(function (resolve, reject) {
        model.findOne({email: email}).exec().then(function (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (result) {
                    resolve(user);
                } else {
                    reject(err);
                }
            });
        }, function (err) {
            reject(err);
        });
    });
};
