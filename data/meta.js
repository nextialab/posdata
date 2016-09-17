exports.getSiteName = function () {
	return this.findOne({key: 'site_name'}).exec();
};

exports.getSiteDescription = function () {
	return this.findOne({key: 'site_description'}).exec();
};

exports.getSelectedTheme = function () {
	return this.findOne({key: 'theme'}).exec();
};
