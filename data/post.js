exports.normalizeString = function (string) {
	return Array.prototype.map.call(string, function (char) {
        if (char.match(/[a-zA-Z0-9]/) != null) {
            return char.toLowerCase();
        } else {
            return '-';
        }
    }).join('');
};

exports.findPostByUri = function(uri) {
	return this.findOne({uri: uri}).exec();
};

exports.findPostById = function (id) {
	return this.findById(id);
	/*this.findById(id, function (err, post) {
		if (!err) {
			if (post) {
				callback.onResult(post);
			} else {
				callback.onError();
			}
		} else {
			callback.onError();
		}
	});*/
};

exports.getUniqueUriForNewPost = function (title) {
	var normalized = this.normalizeString(title);
	var model = this;
	return new Promise(function (resolve, reject) {
		model.find({normalized: normalized}).exec().then(function (uris) {
			if (uris.length > 0) {
				var newUri = normalized + '_' + uris.length;
				resolve(newUri, normalized);
			} else {
				resolve(normalized, normalized);
			}
		}, function (err) {
			reject(err);
		});
	});
	/*this.find({normalized: normalized}).exec(function (err, uris) {
		if (!err) {
			if (uris.length > 0) {
				var newUri = normalized + '_' + uris.length;
				callback.onResult(newUri, normalized);
			} else {
				callback.onResult(normalized, normalized);
			}
		} else {
			callback.onError(err);
		}
	});*/
};

exports.getUniqueUriForExistingPost = function (id, title) {
	var normalized = this.normalizeString(title);
	var model = this;
	return new Promise(function (resolve, reject) {
		model.find({_id: {$ne: id}, normalized: normalized}).exec().then(function (uris) {
			if (uris.length > 0) {
				var newUri = normalized + '_' + uris.length;
				resolve(newUri, normalized);
			} else {
				resolve(normalized, normalized);
			}
		}, function (err) {
			reject(err);
		});
	});
	/*this.find({_id: {$ne: id}, normalized: normalized}).exec(function (err, uris) {
		if (!err) {
			if (uris.length > 0) {
				var newUri = normalized + '_' + uris.length;
				callback.onResult(newUri, normalized);
			} else {
				callback.onResult(normalized, normalized);
			}
		} else {
			callback.onError(err);
		}
	});*/
};
