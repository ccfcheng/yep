var yep = angular.module('yep', []);

yep.controller('MainController', function($scope, $window, Search, Yelp) {
  angular.extend($scope, Search);
  angular.extend($scope, Yelp);
  // this string represents valid Yelp restaurant categories
  $scope.restaurants = [];
  $scope.curatedList = [];
  $scope.latitude = '';
  $scope.longitude = '';
  $scope.coordString = '';

  navigator.geolocation.getCurrentPosition(function(position){
    $scope.latitude = position.coords.latitude;
    $scope.longitude = position.coords.longitude;
    $scope.coordString = $scope.latitude + ',' + $scope.longitude;
  });

  $scope.onSearchView = true;
  // cll=latitude,longitude
  $scope.category_filter = '';
  $scope.searchLocation = '';
  $scope.coordinates = '';
  $scope.radius_filter = '';
  $scope.query = '';

  $scope.queryYelp = function() {
    var Results = this.retrieve();
    Results.success(function(data){
              data.businesses.forEach($scope.parseYelp, $scope);
              $scope.curatedList = $scope.chooseThree($scope.restaurants);
              $scope.onSearchView = false;
              // console.log($scope.restaurants);
              // console.log($scope.curatedList);
            })
          .error(function(err){console.log('error', err);});
  };

  $scope.reloadSearch = function($window) {
    window.location.reload(true);
  };

  $scope.validSubmission = function() {
    return $scope.category_filter && $scope.radius_filter && 
    ($scope.searchLocation || ($scope.latitude && $scope.longitude));
  };

})

.factory('Search', function(){
  return {
    // appends a category term to Yelp's category search syntax
    setCategory: function(term) {
      this.category_filter = term;
    },
    // appends a location term to Yelp's location search syntax
    setLocation: function() {
      this.searchLocation = this.currentLocation;
    },
    // appends a radius term to Yelp's radius search syntax, automatically converts miles to meters
    setRadius: function(miles) {
      this.radius_filter = (miles * 800).toString(); 
    },
    // concatenates all appropriate terms to form a Yelp search query
    setQuery: function() {
      this.query = 'http://api.yelp.com/v2/search/?' + this.searchLocation + '&sort=2&' + this.radius_filter +
      '&' + this.category_filter;
      return this.query;
    }

  };
})

.factory('Yelp', function($http){
  return {

    chooseThree: function(array) {
      var result = [];
      while (result.length < 3) {
        var i = Math.floor(Math.random() * array.length);
        result.push(array.splice(i,1)[0]);
      }
      return result;
    },

    parseYelp: function(business) {
      var obj = {
        name: business.name,
        imageURL: business.image_url,
        phone: business.display_phone,
        snippet: business.snippet_text,
        reviews: business.review_count,
        rating: business.rating,
        ratingURL: business.rating_img_url,
        address: business.location.display_address
        // http://maps.google.com/?q=term (term should be address.join(' '))
      };
      // only push to array if 3.5 stars and above
      if (obj.rating >= 3.5) { this.restaurants.push(obj); }
      // console.log(obj.address);
    },

    randomGen: function(length) {
      var source = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var counter = 0;
      var result = '';
      while (counter < length) {
        var i = Math.floor(Math.random() * source.length);
        result += source[i];
        counter++;
      }
      return result;
    },

    retrieve: function() {
      var method = 'GET';
      var url = 'http://api.yelp.com/v2/search';
      var params = {
        callback: 'angular.callbacks._0',
        oauth_consumer_key: 'TsnPAO-_aWxaIOg9pINODA', //Consumer Key
        oauth_token: 'rP2sTwBPe2fK8JMnYSx7megW5C4EmJKw', //Token
        oauth_signature_method: "HMAC-SHA1",
        oauth_timestamp: new Date().getTime(),
        oauth_nonce: this.randomGen(32),
        category_filter: this.category_filter,
        radius_filter: this.radius_filter
      };
      if (this.searchLocation) { 
        params.location = this.searchLocation; 
      } else if (this.latitude && this.longitude) {
        params.ll = this.latitude + ',' + this.longitude;
      }
      var consumerSecret = 'lIppVhaecKJLupkZ1hoj_iXp70E'; //Consumer Secret
      var tokenSecret = '2Zri1ev2NoRkoQw9GCpDh1VFqFI'; //Token Secret
      var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, { encodeSignature: false});
      params.oauth_signature = signature;
      console.log(params);
      return $http.jsonp(url, {params: params});
    }

  };
});
