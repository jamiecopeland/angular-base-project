angular.module('how', [])
angular.module('root', [])
angular.module('app', [
  // 'ngAnimate',
  'root',
  'how'
]);
// angular.bootstrap(document, ['app']);
angular.module('how').controller('HowPrimaryController',
  [
    '$scope', '$location', '$log',
    function(
      $scope, $location, $log
    ) {
      console.log('HowPrimaryController initialized');
    }
  ]
)
angular.module('how').directive('thingy',
  [
    function() {
      return {
        restrict: 'A',
        link: function(scope, element, attrs){
          console.log('Thingy initialized');
        }
      }
    }
  ]
);
angular.module('root').controller('RootController',
  [
    '$scope', '$location', '$log',
    function(
      $scope, $location, $log
    ) {
      
      console.log('RootController initialized');
      
    }
  ]
)
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvdy9Ib3dNb2R1bGUuanMiLCJyb290L1Jvb3RNb2R1bGUuanMiLCJhcHAuanMiLCJib290LmpzIiwiaG93L2NvbnRyb2xsZXJzL0hvd1ByaW1hcnlDb250cm9sbGVyLmpzIiwiaG93L2RpcmVjdGl2ZXMvVGhpbmd5LmpzIiwicm9vdC9jb250cm9sbGVycy9Sb290Q29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0pBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdob3cnLCBbXSkiLCJhbmd1bGFyLm1vZHVsZSgncm9vdCcsIFtdKSIsImFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXG4gIC8vICduZ0FuaW1hdGUnLFxuICAncm9vdCcsXG4gICdob3cnXG5dKTsiLCIvLyBhbmd1bGFyLmJvb3RzdHJhcChkb2N1bWVudCwgWydhcHAnXSk7IiwiYW5ndWxhci5tb2R1bGUoJ2hvdycpLmNvbnRyb2xsZXIoJ0hvd1ByaW1hcnlDb250cm9sbGVyJyxcbiAgW1xuICAgICckc2NvcGUnLCAnJGxvY2F0aW9uJywgJyRsb2cnLFxuICAgIGZ1bmN0aW9uKFxuICAgICAgJHNjb3BlLCAkbG9jYXRpb24sICRsb2dcbiAgICApIHtcbiAgICAgIGNvbnNvbGUubG9nKCdIb3dQcmltYXJ5Q29udHJvbGxlciBpbml0aWFsaXplZCcpO1xuICAgIH1cbiAgXVxuKSIsImFuZ3VsYXIubW9kdWxlKCdob3cnKS5kaXJlY3RpdmUoJ3RoaW5neScsXG4gIFtcbiAgICBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycyl7XG4gICAgICAgICAgY29uc29sZS5sb2coJ1RoaW5neSBpbml0aWFsaXplZCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICBdXG4pOyIsImFuZ3VsYXIubW9kdWxlKCdyb290JykuY29udHJvbGxlcignUm9vdENvbnRyb2xsZXInLFxuICBbXG4gICAgJyRzY29wZScsICckbG9jYXRpb24nLCAnJGxvZycsXG4gICAgZnVuY3Rpb24oXG4gICAgICAkc2NvcGUsICRsb2NhdGlvbiwgJGxvZ1xuICAgICkge1xuICAgICAgXG4gICAgICBjb25zb2xlLmxvZygnUm9vdENvbnRyb2xsZXIgaW5pdGlhbGl6ZWQnKTtcbiAgICAgIFxuICAgIH1cbiAgXVxuKSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==