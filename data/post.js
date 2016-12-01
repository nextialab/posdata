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
	return this.findOne({uri: uri}).populate('archetype').exec();
};

exports.findPostById = function (id) {
	return this.findOne({_id: id}).populate('archetype').exec();
	//return this.findById(id);
};

exports.getUniqueUriForNewPost = function (title) {
	var normalized = this.normalizeString(title);
	var model = this;
	return new Promise(function (resolve, reject) {
		model.find({normalized: normalized}).exec().then(function (uris) {
			var result = {uri: normalized, normalized: normalized};
			if (uris.length > 0) {
				result.uri = normalized + '_' + uris.length;
			}
			console.log(result);
			resolve(result);
		}, function (err) {
			console.log(err);
			reject(err);
		});
	});
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
};
