angular.module('how', [])
angular.module('root', [])
angular.module('app', [
  // 'ngAnimate',
  'root',
  'how'
]);
// angular.bootstrap(document, ['app']);
angular.module('how').controller('HowPrimaryController',  
  ["$scope", "$location", "$log", function(
    $scope, $location, $log
  ) {
    console.log('HowPrimaryController initialized');
  }]
)
angular.module('how').directive('thingy',  
  function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs){
        console.log('Thingy initialized');
      }
    }
  }
);
angular.module('root').controller('RootController',
  ["$scope", "$location", "$log", function(
    $scope, $location, $log
  ) {
    console.log('RootController initialized a'); 
  }]
)
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvdy9Ib3dNb2R1bGUuanMiLCJyb290L1Jvb3RNb2R1bGUuanMiLCJhcHAuanMiLCJib290LmpzIiwiaG93L2NvbnRyb2xsZXJzL0hvd1ByaW1hcnlDb250cm9sbGVyLmpzIiwiaG93L2RpcmVjdGl2ZXMvVGhpbmd5LmpzIiwicm9vdC9jb250cm9sbGVycy9Sb290Q29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FDQUE7RUFDQTtFQUNBO0VBQ0E7QUFDQTtBQ0pBO0FDQUE7RUFDQSxnQ0FBQTtJQUNBO0VBQ0E7SUFDQTtFQUNBLENBQUE7QUFDQTtBQ05BO0VBQ0E7SUFDQTtNQUNBO01BQ0E7UUFDQTtNQUNBO0lBQ0E7RUFDQTtBQUNBO0FDVEE7RUFDQSxnQ0FBQTtJQUNBO0VBQ0E7SUFDQTtFQUNBLENBQUE7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdob3cnLCBbXSkiLCJhbmd1bGFyLm1vZHVsZSgncm9vdCcsIFtdKSIsImFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXG4gIC8vICduZ0FuaW1hdGUnLFxuICAncm9vdCcsXG4gICdob3cnXG5dKTsiLCIvLyBhbmd1bGFyLmJvb3RzdHJhcChkb2N1bWVudCwgWydhcHAnXSk7IiwiYW5ndWxhci5tb2R1bGUoJ2hvdycpLmNvbnRyb2xsZXIoJ0hvd1ByaW1hcnlDb250cm9sbGVyJywgIFxuICBmdW5jdGlvbihcbiAgICAkc2NvcGUsICRsb2NhdGlvbiwgJGxvZ1xuICApIHtcbiAgICBjb25zb2xlLmxvZygnSG93UHJpbWFyeUNvbnRyb2xsZXIgaW5pdGlhbGl6ZWQnKTtcbiAgfVxuKSIsImFuZ3VsYXIubW9kdWxlKCdob3cnKS5kaXJlY3RpdmUoJ3RoaW5neScsICBcbiAgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpe1xuICAgICAgICBjb25zb2xlLmxvZygnVGhpbmd5IGluaXRpYWxpemVkJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG4pOyIsImFuZ3VsYXIubW9kdWxlKCdyb290JykuY29udHJvbGxlcignUm9vdENvbnRyb2xsZXInLFxuICBmdW5jdGlvbihcbiAgICAkc2NvcGUsICRsb2NhdGlvbiwgJGxvZ1xuICApIHtcbiAgICBjb25zb2xlLmxvZygnUm9vdENvbnRyb2xsZXIgaW5pdGlhbGl6ZWQgYScpOyBcbiAgfVxuKSJdLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9