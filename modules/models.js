var mongoose = require('mongoose');

exports.dbURI = 'mongodb://localhost/posdata';

exports.userSchema = function () {
    return new mongoose.Schema({
        userid: {type: String, unique: true},
        email: {type: String, unique: true},
    	password: String,
    	role: String,
    	name: String,
    	createdOn: {type: Date, default: Date.now},
    	modifiedOn: {type: Date, default: Date.now}
    });
};

exports.tokenSchema = function () {
    return new mongoose.Schema({
    	userid: String,
    	token: {type: String, unique: true},
        expires: Date,
    	createdOn: {type: Date, default: Date.now}
    });
};

exports.postSchema = function () {
    return new mongoose.Schema({
    	uri: {type: String, unique: true},
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    	normalized: String,
    	title: String,
        summary: {type: String, default: ''},
    	content: {type: String, default: ''},
    	status: {type: String, default: 'draft'},
    	createdOn: {type: Date, default: Date.now},
    	modifiedOn: {type: Date, default: Date.now}
    });
};

exports.mediaSchema = function () {
    return new mongoose.Schema({
    	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    	path: {type: String, unique: true},
        label: {type: String, default: ''},
        caption: {type: String, default: ''},
    	createdOn: {type: Date, default: Date.now},
        modifiedOn: {type: Date, default: Date.now}
    });
};

exports.metaSchema = function () {
    return new mongoose.Schema({
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        key: String,
        value: String,
        createdOn: {type: Date, default: Date.now},
        modifiedOn: {type: Date, default: Date.now}
    });
};

exports.albumSchema = function () {
    return new mongoose.Schema({
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        album: [{type: mongoose.Schema.Types.ObjectId, ref: 'Media'}],
        name: String,
        caption: {type: String, default: ''},
        createdOn: {type: Date, default: Date.now},
        modifiedOn: {type: Date, default: Date.now}
    });
}
