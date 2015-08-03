var yep = angular.module('yep', []);

yep.controller('MainController', function($scope, Search) {
  angular.extend($scope, Search);
  // $scope.searchTerm = 'hello';
})

.factory('Search', function(){
  return {};
});
