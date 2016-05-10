exports.validate = function (data) {
    return function (req, res, next) {
        var valid = true;
        var i = 0;
        var require = '';
        while (valid && i < data.length) {
            var member = data[i];
            if (!req.body.hasOwnProperty(member)) {
                valid = false;
                require = member;
            }
            i++;
        }
        if (valid) {
            next();
        } else {
            res.status(400).json({error: 'Request require ' + valid});
        }
    }
}
