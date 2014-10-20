var gulp = require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var rjs = require('gulp-requirejs');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var notifier = new require('node-notifier')();
var _ = require('lodash');
// var karma = require('karma').server;
var concat = require('gulp-concat')
// var walk = require('walk');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate')
var uglify = require('gulp-uglify')
var htmlreplace = require('gulp-html-replace');
var templateCache = require('gulp-angular-templatecache');
var del = require('del');
var runSequence = require('run-sequence');
var eslint = require('gulp-eslint');


// --------------------------------------------------
// LESS

var getFileNameFromErrorMessage = function(errorMessage) {
  var filePathWithoutSuffix = errorMessage.split('.less')[0];
  var filePathWithougSuffixSplit = filePathWithoutSuffix.split('/');
  return filePathWithougSuffixSplit[filePathWithougSuffixSplit.length-1];
}

var getLineNumberFromErrorMessage = function(errorMessage) {
  return errorMessage.split('line no.')[1].replace(' ', '');
}

var onLessError = function (err) {
  gutil.log(gutil.colors.red('Less Error: ' + err.message));
  notifier.notify({
      title: 'Less Error',
      message: getFileNameFromErrorMessage(err.message) + '.less - line ' + getLineNumberFromErrorMessage(err.message)
  });
};

gulp.task('less', function () {
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
// JS/HTML HELPER VARIABLES AND METHODS

var libraryFiles = [
  './app/bower_components/angular/angular.js',
  './app/bower_components/angular-route/angular-route.js',
  './app/bower_components/angular-sanitize/angular-sanitize.js',
  './app/bower_components/angular-animate/angular-animate.js',
  './app/bower_components/jquery/dist/jquery.js',
  './app/bower_components/underscore/underscore.js'
];

function getOrderedJSAppFiles(completeHandler) {

  var moduleFiles = [];
  var nonModuleFiles = [];

  // Walker options
  var walker  = walk.walk('./app/src', { followLinks: false });

  walker.on('file', function(root, stat, next) {

      if(stat.name.indexOf('Module.js') > -1) {
        moduleFiles.push(root + '/' + stat.name);
      } else {
        nonModuleFiles.push(root + '/' + stat.name);
      }

      next();
  });

  walker.on('end', function() {
    var files = moduleFiles.concat(nonModuleFiles);
    completeHandler(files);
  });

  return walker;
}

function generateAppScriptTags(completeHandler) {
  getOrderedJSAppFiles(function(files){
    completeHandler(createScriptTagsFromFileList(files));
  });
}

function createScriptTagsFromFileList(fileList) {
  var output = '';
  _.each(fileList, function(file){
    output += '<script src="'+file.replace('./app/', '')+'"></script>\n'
  });
  return output;
}

var onESLintError = function (err) {
  gutil.log(gutil.colors.red('Less Error: ' + err.message));
  notifier.notify({
      title: 'Lint Error',
      message: 'Error: ' + err
  });
};

// --------------------------------------------------
// IMAGES

gulp.task('images', function() {

  gulp.src(['./app/images/**/*.*'])
    .pipe(gulp.dest('./deploy/images'))

});

// --------------------------------------------------
// JS

var compiledSourceDirectory = './deploy/src';
var compiledLibrariesFileName = 'libraries.js';
var compiledAppFileName = 'main.js';

gulp.task('jsLibraries', function() {

  // bundle angular and angular animate separately

  gulp.src(libraryFiles)
      .pipe(sourcemaps.init())
      .pipe(concat(compiledLibrariesFileName))
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(compiledSourceDirectory))

});

gulp.task('jsApp', function(callback) {

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
    .pipe(gulp.dest(compiledSourceDirectory))

});

gulp.task('createTemplates', function(){

  gulp.src('./app/src/**/*.html')
    .pipe(templateCache())
    .pipe(gulp.dest('./app/.temp'))

});

gulp.task('deleteTemplates', function(cb){

  del('./app/.temp/templates.js', cb);

});

// --------------------------------------------------
// HTML

gulp.task('indexDeployment', function() {

  gulp.src(['./app/index.html'])
    .pipe(gulp.dest('./deploy/'))

});


// --------------------------------------------------
// TESTS

var karmaConfigReader = {
  set: function(value) {
    karmaCommonConf = value;
    karmaCommonConf.logLevel = 'INFO';
  }
}

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
// DEFAULT

gulp.task('develop', ['less', 'images', 'jsLibraries', 'jsApp', 'indexDeployment'/*, 'test'*/]);

gulp.task('deploy', ['develop']);

gulp.task('default', ['develop'], function(){

  gulp.watch('app/less/**/*.*', function() {
    gulp.run('less');
  });

  gulp.watch('app/images/**/*.*', function() {
    gulp.run('images');
  });

  gulp.watch(['app/index.html', 'app/src/**/*.*', 'test/**/*.*'], function() {
    // gulp.run('test');
    gulp.run('jsApp');
    gulp.run('indexDeployment');
  });

});

gulp.task('serve', [], function(){
  require('./server/server.js')
});