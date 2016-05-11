var data = require('./config');

var mongoose = require('mongoose');
var models = require('./modules/models');
var bcrypt = require('bcryptjs');

var dbURI = models.dbURI;

function migrate() {
    var User = mongoose.model('User', models.userSchema());
    bcrypt.hash(data.config.admin.password, 10, function (err, hash) {
        User.create({
            email: data.config.admin.email,
            password: hash,
            role: 'admin',
            name: data.config.admin.name
        }, function (userErr, user) {
            if (!userErr && user) {
                console.log('User migrated');
                var Meta = mongoose.model('Meta', models.metaSchema());
                Meta.create([
                    {user: user._id, key: 'site_name', value: data.config.site.name},
                    {user: user._id, key: 'site_description', value: data.config.site.description}
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
    migrate();
});

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
