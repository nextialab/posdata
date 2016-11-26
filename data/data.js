var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var models = require('../modules/models');

var dbURI = models.dbURI;

var user = require('./user');
var token = require('./token');
var post = require('./post');
var meta  = require('./meta');

/* User Schema */
var userSchema = models.userSchema();
userSchema.statics.findUserByEmailAndPass = user.findUserByEmailAndPass;
mongoose.model('User', userSchema);
/* Token Schema */
var tokenSchema = models.tokenSchema();
tokenSchema.statics.findToken = token.findToken;
tokenSchema.statics.updateToken = token.updateToken;
tokenSchema.statics.isAuthenticated = token.isAuthenticated;
mongoose.model('Token', tokenSchema);
/* Post Schema */
var postSchema = models.postSchema();
postSchema.statics.normalizeString = post.normalizeString;
postSchema.statics.findPostByUri = post.findPostByUri;
postSchema.statics.findPostById = post.findPostById;
postSchema.statics.getUniqueUriForNewPost = post.getUniqueUriForNewPost;
postSchema.statics.getUniqueUriForExistingPost = post.getUniqueUriForExistingPost;
mongoose.model('Post', postSchema);
/* Media Schema */
var mediaSchema = models.mediaSchema();
mongoose.model('Media', mediaSchema);
/* Meta Schema */
var metaSchema = models.metaSchema();
metaSchema.statics.getSiteName = meta.getSiteName;
metaSchema.statics.getSiteDescription = meta.getSiteDescription;
metaSchema.statics.getSelectedTheme = meta.getSelectedTheme;
mongoose.model('Meta', metaSchema);
/* Archetype Schema */
var archetypeSchema = models.archetypeSchema();
mongoose.model('Archetype', archetypeSchema);

mongoose.connection.on('connected', function () {
	console.log('Mongoose connected to ' + dbURI);
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
