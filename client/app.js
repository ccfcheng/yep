var yep = angular.module('yep', []);

yep.controller('MainController', function($scope, Search) {
  angular.extend($scope, Search);
  // this string represents valid Yelp restaurant categories
  $scope.categoryHash = {

  };
  
  $scope.category_filter = '';
  $scope.searchLocation = '';
  $scope.radius_filter = '';
  $scope.query = '';

})

.factory('Search', function(){
  return {
    // appends a category term to Yelp's category search syntax
    setCategory: function(term) {
      this.category_filter = 'category_filter=' + term;
    },
    // appends a location term to Yelp's location search syntax
    setLocation: function() {
      this.searchLocation = 'location=' + this.currentLocation;
    },
    // appends a radius term to Yelp's radius search syntax, automatically converts miles to meters
    setRadius: function(miles) {
      this.radius_filter = 'radius_filter=' + (miles * 800); 
    },
    // concatenates all appropriate terms to form a Yelp search query
    setQuery: function() {
      this.query = '?' + this.searchLocation + '&sort=2&' + this.radius_filter + '&' + this.category_filter;
    }

  };
});
