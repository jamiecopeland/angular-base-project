var gulp = require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var rjs = require('gulp-requirejs');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var notifier = new require('node-notifier')();
var _ = require('lodash');
var karma = require('karma').server;
var concat = require('gulp-concat')
var walk = require('walk');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate')
var uglify = require('gulp-uglify')


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
    .pipe(gulp.dest('app/css'));
});

// --------------------------------------------------
// JS
function getOrderedJSFiles(completeHandler) {
  
  var moduleFiles = [];
  var nonModuleFiles = [];  
  var bootFile;

  // Walker options
  var walker  = walk.walk('./app/src', { followLinks: false });

  walker.on('file', function(root, stat, next) {

      if(stat.name.indexOf('boot.js') > -1) {
        bootFile = root + '/' + stat.name;
      } else {
        if(stat.name.indexOf('Module.js') > -1) {
          moduleFiles.push(root + '/' + stat.name);  
        } else {
          nonModuleFiles.push(root + '/' + stat.name);  
        }  
      }
      
      next();
  });

  walker.on('end', function() {
    var files = moduleFiles.concat(nonModuleFiles);
    files.push(bootFile);
    completeHandler(files);
  });

  return walker;
}

gulp.task('jsLibraries', function() {

  // bundle angular and angular animate separately
  var libraryFiles = [
    './app/bower_components/angular/angular.js',
    './app/bower_components/angular-route/angular-route.js',
    './app/bower_components/angular-sanitize/angular-sanitize.js',
    './app/bower_components/angular-animate/angular-animate.js',
    './app/bower_components/greensock/src/uncompressed/TweenMax.js',
    './app/bower_components/jquery/jquery.js',
    './app/bower_components/underscore/underscore.js'
  ]

  gulp.src(libraryFiles)
      .pipe(sourcemaps.init())
      .pipe(concat('libraries.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./app/src-compiled'))

});

gulp.task('jsApp', function() {

  getOrderedJSFiles(function(projectFiles){
    gulp.src(projectFiles)
      .pipe(sourcemaps.init())
      .pipe(concat('main.js'))
      .pipe(ngAnnotate())
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./app/src-compiled'))
  });

});

// --------------------------------------------------
// JS

gulp.task('js', function() {

  rjs({
    name: 'main',
    baseUrl: 'app/src/',
    out: 'main-min.js',
    mainConfigFile: 'app/src/main.js',
    shim: {}
  })
  .pipe(gulp.dest('./app/src'));
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

gulp.task('develop', ['less', 'test']);

gulp.task('deploy', ['develop', 'requireJS']);

gulp.task('default', ['develop'], function(){
  
  gulp.watch('app/less/**/*.*', function() {
    gulp.run('less');
  });

  gulp.watch(['app/src/**/*.*', 'test/**/*.*'], function() {
    // gulp.run('test');
    gulp.run('jsApp');
  });

});

gulp.task('serve', [], function(){
  require('./server/server.js')
});