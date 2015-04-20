var gulp = require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var rjs = require('gulp-requirejs');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var notifier = require('node-notifier');
var _ = require('lodash');
var karma = require('karma').server;
var concat = require('gulp-concat');
// var walk = require('walk');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var templateCache = require('gulp-angular-templatecache');
var del = require('del');
var runSequence = require('run-sequence');
var eslint = require('gulp-eslint');

// --------------------------------------------------
// LESS

var onLessError = function (err) {
  var fileName = _.last(err.message.split('.less')[0].split('/'));
  var lineNumber = err.message.split('line no.')[1].replace(' ', '');

  notifier.notify({
    title: 'Less Error',
    message: fileName + '.less - line: ' + lineNumber + '\n' + err.message.split('in file /')[0]
  });
};

gulp.task('compileLess', function () {

  gulp.src('app/less/_html5-boilerplate.less')
    .pipe(plumber({
      errorHandler: onLessError
    }))
    .pipe(less({
        compress: true
    }))
    .pipe(rename('main.css'))
    .pipe(gulp.dest('deploy/css'));

});

// --------------------------------------------------
// Images

gulp.task('copyImages', function() {

  gulp.src(['./app/images/**/*.*'])
    .pipe(gulp.dest('./deploy/images'));

});

// --------------------------------------------------
// JavaScript

var compiledSourceDirectory = './deploy/src';
var compiledLibrariesFileName = 'libraries.js';
var compiledAppFileName = 'main.js';

var libraryFiles = [
  './app/bower_components/angular/angular.js',
  './app/bower_components/angular-route/angular-route.js',
  './app/bower_components/angular-sanitize/angular-sanitize.js',
  './app/bower_components/angular-animate/angular-animate.js',
  './app/bower_components/jquery/dist/jquery.js',
  './app/bower_components/lodash/lodash.js'
];

var onESLintError = function (err) {
  var fileName = _.last(err.fileName.split('/'));
  var message  = fileName + ' - line: ' + err.lineNumber + '\n' + err.message;

  notifier.notify({
      title: 'Lint Error',
      message: message
  });
};

gulp.task('compileJSLibraries', function() {

  gulp.src(libraryFiles)
      .pipe(sourcemaps.init())
      .pipe(concat(compiledLibrariesFileName))
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(compiledSourceDirectory));

});

gulp.task('compileJSApp', function(callback) {

  runSequence('deleteTemplates', 'createTemplates', 'mungeJS', callback);

});

gulp.task('mungeJS', function(){

  gulp.src(['./app/src/app.js', './app/src/**/*Module.js', './app/src/**/*.js', './app/.temp/templates.js'])
    .pipe(plumber({
      errorHandler: onESLintError
    }))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
    .pipe(sourcemaps.init())
    .pipe(concat(compiledAppFileName))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(compiledSourceDirectory));

});

gulp.task('createTemplates', function(callback){

  var stream = gulp.src('./app/src/**/*.html')
    .pipe(templateCache())
    .pipe(gulp.dest('./app/.temp'));

  stream.on('end', function(){
    callback();
  });

});

gulp.task('deleteTemplates', function(callback){

  del('./app/.temp/templates.js', callback);

});

// --------------------------------------------------
// HTML

gulp.task('copyHTML', function() {

  gulp.src(['./app/index.html'])
    .pipe(gulp.dest('./deploy/'));

});

// --------------------------------------------------
// Tests

var karmaConfigReader = {
  set: function(value) {
    karmaCommonConf = value;
    karmaCommonConf.logLevel = 'INFO';
  }
};

var karmaConfig = require('./karma.conf.js');
karmaConfig(karmaConfigReader);

gulp.task('test', function (done) {

  karma.start(_.assign({}, karmaCommonConf, {singleRun: true}),
    function(output){
      if(output) {
        notifier.notify({
            title: 'Tests failed',
            message: 'You did a bad!'
        });
      }
      done();
    });

});

// --------------------------------------------------
// Meta tasks

gulp.task('develop', ['compileLess', 'copyImages', 'compileJSLibraries', 'compileJSApp', 'copyHTML'/*, 'test'*/]);

gulp.task('deploy', ['develop']);

gulp.task('default', ['develop'], function(){

  gulp.watch('app/less/**/*.*', function() {
    gulp.run('compileLess');
  });

  gulp.watch('app/images/**/*.*', function() {
    gulp.run('copyImages');
  });

  gulp.watch(['app/index.html', 'app/src/**/*.*', 'test/**/*.*'], function() {
    // gulp.run('test');
    gulp.run('compileJSApp');
    gulp.run('copyHTML');
  });

});

gulp.task('serve', [], function(){
  require('./server/server.js');
});