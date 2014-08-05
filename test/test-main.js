var specFiles = Object.keys(window.__karma__.files).filter(function (file) {
  return /\.spec\.js$/.test(file);
});

requirejs.config({
  // Karma serves files from '/base'
  baseUrl: '/base/app/src',

  paths: {
    'angularMocks': '../bower_components/angular-mocks/angular-mocks',

    'text': '../bower_components/requirejs-text/text',
    'domReady': '../bower_components/requirejs-domready/domReady',
    'angular': '../bower_components/angular/angular',
    'angularRoute': '../bower_components/angular-route/angular-route',
    'angularSanitize': '../bower_components/angular-sanitize/angular-sanitize',
    'angularAnimate': '../bower_components/angular-animate/angular-animate',
    'tweenmax': '../bower_components/greensock/src/uncompressed/TweenMax',
    'jquery': '../bower_components/jquery/jquery',
    'underscore': '../bower_components/underscore/underscore'
  },

  shim: {
    'angularMocks': {
        exports: 'angularMocks',
        deps: ['angular']            
    },
    
    'angular': {
      exports: 'angular',
      deps: ['jquery']
    },
    'angularRoute': {
      exports: 'angularRoute',
      deps: ['angular']
    },
    'angularSanitize': {
      exports: 'angularSanitize',
      deps: ['angular']
    },
    'angularAnimate': {
      exports: 'angularAnimate',
      deps: ['angular']
    },
    'tweenmax': {
      exports: 'TweenMax'
    },
    'jquery': {
      exports: '$'
    },
    'underscore': {
      exports: '_'
    }
  },

  // ask Require.js to load these files (all our tests)
  deps: specFiles,

  // start test run, once Require.js is done
  callback: window.__karma__.start
});