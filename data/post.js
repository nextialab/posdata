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
	/*return new Promise(function (resolve, reject) {
		this.findOne({uri: uri}).exec().then(function (post) {
			resolve(post);
		}, function (err) {
			reject(err);
		});
	});*/
	/*this.findOne({uri: uri}).exec(function (err, post) {
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

exports.findPostById = function (id, callback) {
	this.findById(id, function (err, post) {
		if (!err) {
			if (post) {
				callback.onResult(post);
			} else {
				callback.onError();
			}
		} else {
			callback.onError();
		}
	});
};

exports.getUniqueUriForNewPost = function (title, callback) {
	var normalized = this.normalizeString(title);
	this.find({normalized: normalized}).exec(function (err, uris) {
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
	});
};

exports.getUniqueUriForExistingPost = function (id, title, callback) {
	var normalized = this.normalizeString(title);
	this.find({_id: {$ne: id}, normalized: normalized}).exec(function (err, uris) {
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
	});
};
