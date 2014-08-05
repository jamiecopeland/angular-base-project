angular.module('how', [])
angular.module('root', [])
angular.module('app', [
  // 'ngAnimate',
  'root'
]);
// angular.bootstrap(document, ['app']);
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
angular.module('how').directive('Thingy',
  [
    function() {
      return {
        restrict: 'A',
        link: function(scope, element, attrs){
          
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvdy9Ib3dNb2R1bGUuanMiLCJyb290L1Jvb3RNb2R1bGUuanMiLCJhcHAuanMiLCJib290LmpzIiwiaG93L2NvbnRyb2xsZXJzL0hvd1ByaW1hcnlDb250cm9sbGVyLmpzIiwiaG93L2RpcmVjdGl2ZXMvVGhpbmd5LmpzIiwicm9vdC9jb250cm9sbGVycy9Sb290Q29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FDQUE7RUFDQTtFQUNBO0FBQ0E7QUNIQTtBQ0FBO0VBQ0E7SUFDQTtJQUNBO01BQ0E7SUFDQTtNQUNBO0lBQ0E7RUFDQTtBQUNBO0FDVEE7RUFDQTtJQUNBO01BQ0E7UUFDQTtRQUNBOztRQUVBO01BQ0E7SUFDQTtFQUNBO0FBQ0E7QUNYQTtFQUNBO0lBQ0E7SUFDQTtNQUNBO0lBQ0E7O01BRUE7O0lBRUE7RUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2hvdycsIFtdKSIsImFuZ3VsYXIubW9kdWxlKCdyb290JywgW10pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFtcbiAgLy8gJ25nQW5pbWF0ZScsXG4gICdyb290J1xuXSk7IiwiLy8gYW5ndWxhci5ib290c3RyYXAoZG9jdW1lbnQsIFsnYXBwJ10pOyIsImFuZ3VsYXIubW9kdWxlKCdob3cnKS5jb250cm9sbGVyKCdIb3dQcmltYXJ5Q29udHJvbGxlcicsXG4gIFtcbiAgICAnJHNjb3BlJywgJyRsb2NhdGlvbicsICckbG9nJyxcbiAgICBmdW5jdGlvbihcbiAgICAgICRzY29wZSwgJGxvY2F0aW9uLCAkbG9nXG4gICAgKSB7XG4gICAgICAkbG9nLmxvZygnUm9vdENvbnRyb2xsZXIgaW5pdGlhbGl6ZWQnKTtcbiAgICB9XG4gIF1cbikiLCJhbmd1bGFyLm1vZHVsZSgnaG93JykuZGlyZWN0aXZlKCdUaGluZ3knLFxuICBbXG4gICAgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpe1xuICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICBdXG4pOyIsImFuZ3VsYXIubW9kdWxlKCdyb290JykuY29udHJvbGxlcignUm9vdENvbnRyb2xsZXInLFxuICBbXG4gICAgJyRzY29wZScsICckbG9jYXRpb24nLCAnJGxvZycsXG4gICAgZnVuY3Rpb24oXG4gICAgICAkc2NvcGUsICRsb2NhdGlvbiwgJGxvZ1xuICAgICkge1xuICAgICAgXG4gICAgICBjb25zb2xlLmxvZygnUm9vdENvbnRyb2xsZXIgaW5pdGlhbGl6ZWQnKTtcblxuICAgIH1cbiAgXVxuKSJdLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9