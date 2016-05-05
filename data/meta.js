exports.getSiteName = function (callback) {
	this.findOne({key: 'site_name'}).exec(function (err, sitename) {
		if (!err && sitename) {
			callback.success(sitename.value);
		} else {
			callback.success('');
		}
	});
}

exports.getSiteDescription = function (callback) {
	this.findOne({key: 'site_description'}).exec(function (err, description) {
		if (!err && description) {
			callback.success(description.value)
		} else {
			callback.success('');
		}
	});
}
