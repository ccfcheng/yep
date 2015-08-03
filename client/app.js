var yep = angular.module('yep', []);

yep.controller('MainController', function($scope, Search) {
  angular.extend($scope, Search);
  // this string represents valid Yelp restaurant categories
  $scope.category_filter = '';
})

.factory('Search', function(){
  return {
    setCategory: function(term) {
      this.category_filter = term;
    }
  };
});
