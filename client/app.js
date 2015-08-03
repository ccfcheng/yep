var yep = angular.module('yep', []);

yep.controller('MainController', function($scope, Search) {
  angular.extend($scope, Search);
  // this string represents valid Yelp restaurant categories
  $scope.categoryHash = {

  };
  
  $scope.category_filter = '';
  $scope.searchLocation = '';
  $scope.radius_filter;
  
  // $scope.advancedSearch = true;

  // $scope.toggleAdvancedMode = function() {

  //   $scope.advancedSearch = !$scope.advancedSearch;
  // };

})

.factory('Search', function(){
  return {
    // toggleAdvancedMode: function() {
    //   if (this.advancedSearch) {
    //     this.advancedSearch = false;
    //   } else {
    //     this.advancedSearch = true;
    //   }
    // },

    setCategory: function(term) {
      this.category_filter = 'category_filter=' + term;
    },

    setLocation: function() {
      this.searchLocation = 'location=' + this.currentLocation;
    },

    setRadius: function(miles) {
      this.radius_filter = 'radius_filter=' + (miles * 800); 
    }

  };
});
