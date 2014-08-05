// Karma configuration
// Generated on Sun Oct 20 2013 07:28:56 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',


    // frameworks to use
    frameworks: ['requirejs', 'mocha', 'chai', 'sinon'],

    // list of files / patterns to load in the browser
    files: [
        // {pattern: 'app/bower_components/angular-mocks/angular-mocks.js', included: false},
        // {pattern: 'app/bower_components/angular-mocks/angular-mocks.js', included: false},

        {pattern: 'app/bower_components/**/*.js', included: false},
        {pattern: 'app/src/**/*.*', included: false},
        {pattern: 'test/**/*.spec.js', included: false},

        'test/test-main.js',
    ],


    // list of files to exclude
    exclude: [
        'app/src/main.js'
    ],


    // Test results reporter to use
    // Possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],


    // Web server port
    port: 9876,


    // Enable / disable colors in the output (reporters and logs)
    colors: true,


    // Level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};
