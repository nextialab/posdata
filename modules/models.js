var mongoose = require('mongoose');

exports.dbURI = 'mongodb://localhost/posdata';

exports.userSchema = function () {
    return new mongoose.Schema({
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
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    	token: {type: String, unique: true},
        //TODO: expires: Date,
    	createdOn: {type: Date, default: Date.now}
    });
};

exports.tagSchema = function () {
    return new mongoose.Schema({
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        name: String,
        createdOn: {type: Date, default: Date.now}
    });
};

exports.postSchema = function () {
    return new mongoose.Schema({
    	uri: String,
        type: {type: String, default: 'post'},
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    	normalized: String,
    	title: String,
        image: {type: String, default: ''},
        summary: {type: String, default: ''},
        videoUrl: {type: String, default: ''},
        markdown: {type: String, default: ''},
    	content: {type: String, default: ''},
        tags: [String],
        language: {type: String, default: 'es'},
    	status: {type: String, default: 'draft'},
    	createdOn: {type: Date, default: Date.now},
    	modifiedOn: {type: Date, default: Date.now}
    });
};

exports.testSchema = function () {
    return new mongoose.Schema({
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        title: String,
        createdOn: {type: Date, default: Date.now},
        modifiedOn: {type: Date, default: Date.now}
    });
};

exports.questionSchema = function () {
    return new mongoose.Schema({
        test: {type: mongoose.Schema.Types.ObjectId, ref: 'Test'},
        question: String,
        type: {type: String, default: 'text'},
        answer: String,
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

exports.themeSchema = function () {
    return new mongoose.Schema({
        name: {type: String, unique: true},
        active: Boolean,
        createdOn: {type: Date, default: Date.now},
        modifiedOn: {type: Date, default: Date.now}
    });
}

exports.metaSchema = function () {
    return new mongoose.Schema({
        key: String,
        value: String,
        createdOn: {type: Date, default: Date.now},
        modifiedOn: {type: Date, default: Date.now}
    });
};
