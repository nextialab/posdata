var data = {
    site: {
        name: 'Posdata',
        description: 'Content management systems for online learning resources'
    },
    admin: {
        email: 'your_email',
        password: 'your_password',
        name: 'your_name'
    }
};

/* Stop editing! */

var mongoose = require('mongoose');
var models = require('../modules/models.js');
var bcrypt = require('bcryptjs');
var uuid = require('uuid');
var dbURI = 'mongodb://localhost/posdata';

function migrate() {
    var User = mongoose.model('User', models.userSchema());
    bcrypt.hash(data.admin.password, 10, function (err, hash) {
        User.create({
            userid: uuid.v4(),
            email: data.admin.email;
            password: hash,
            role: 'admin',
            name: data.admin.name;
        }, function (userErr, user) {
            if (!userErr && user) {
                console.log('User migrated');
                var Meta = mongoose.model('Meta', models.metaSchema());
                Meta.create([
                    {user: user._id, key: 'site_name', value: data.site.name},
                    {user: user._id, key: 'site_description', value: data.site.description}
                ], function (metaErr, metas) {
                    if (!metaErr && metas) {
                        console.log('Meta data migrated');
                    } else {
                        console.log('Error migrating meta data');
                    }
                    mongoose.disconnect();
                });
            } else {
                console.log('Error migrating user');
                mongoose.disconnect();
            }
        });
    });
}

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
}
mongoose.connection.on('error', function (err) {
	console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
	console.log('Mongoose disconnected');
});

process.on('SIGINT', function () {
	mongoose.connection.close(function () {
		console.log('Mongoose disconnected through app termination');
		process.exit(0);
	});
});

mongoose.connect(dbURI);
