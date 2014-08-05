angular.module('how').controller('HowPrimaryController',
  [
    '$scope', '$location', '$log',
    function(
      $scope, $location, $log
    ) {
      $log.log('RootController initialized');
    }
  ]
)