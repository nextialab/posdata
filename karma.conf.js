module.exports = function (config) {
    'use strict';

    config.set({
        autoWatch: false,
        basePath: './',
        frameworks: [
            'jasmine'
        ],
        files: [
            'test/admin/*.js'
        ],
        exclude: [
        ],
        port: 8080,
        browsers: [
            'PhantomJS'
        ],
        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher'
        ],
        singleRun: true,
        colors: true,
        logLevel: config.LOG_INFO
    });

};