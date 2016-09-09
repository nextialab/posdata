var child_process = require('child_process');

// API

var api = child_process.spawn('node', ['./bin/api']);
api.on('close', function () {
    console.log('API closed');
});
api.on('error', function (err) {
    console.log('API error: ' + err);
});
api.stdout.on('data', function (data) {
    console.log('API: ' + data);
});
api.stderr.on('data', function (data) {
    console.log('API error: ' + data);
});

// Admin

var admin = child_process.spawn('node', ['./bin/admin']);
admin.on('close', function () {
    console.log('Admin closed');
});
admin.on('error', function (err) {
    console.log('Admin error: ' + err);
});
admin.stdout.on('data', function (data) {
    console.log('Admin: ' + data);
});
admin.stderr.on('data', function (data) {
    console.log('Admin error: ' + data);
});

// Web

var www = child_process.spawn('node', ['./bin/www']);
www.on('close', function () {
    console.log('WWW closed');
});
www.on('error', function (err) {
    console.log('WWW error: ' + err);
});
www.stdout.on('data', function (data) {
    console.log('WWW: ' + data);
});
www.stderr.on('data', function (data) {
    console.log('WWW error: ' + data);
});

process.on('SIGINT', function () {
    console.log('Shutting down children');
    www.kill();
    admin.kill();
    api.kill();
    process.exit();
});