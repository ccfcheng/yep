var yep = angular.module('yep', []);

yep.controller('MainController', function($scope, Search, Yelp) {
  angular.extend($scope, Search);
  angular.extend($scope, Yelp);
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

    // retrieve: function(name, callback) {
    //   var method = 'GET';
    //   var url = this.setQuery();
    //   var params = {
    //     callback: 'angular.callbacks._0',
    //     oauth_consumer_key: 'TsnPAO-_aWxaIOg9pINODA',
    //     oauth_token: 'rP2sTwBPe2fK8JMnYSx7megW5C4EmJKw',
    //     oauth_signature_method: 'HMAC-SHA1',
    //     oauth_timestamp: new Date().getTime(),
    //     oauth_nonce: this.randomGen(32), 
    //     category_filter: this.category_filter,
    //     location: this.searchLocation,
    //     radius_filter: this.radius_filter
    //   };
    //   var consumerSecret = 'lIppVhaecKJLupkZ1hoj_iXp70E';
    //   var tokenSecret = '2Zri1ev2NoRkoQw9GCpDh1VFqFI';
    //   var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, { encodeSignature: false});
    //   params.oauth_signature = signature;
    //   console.log(params);
    //   $http({
    //     method: 'GET',
    //     url: 'http://api.yelp.com/v2/search',
    //     params: params,
    //   })
    //   .success(function(data){
    //     console.log('success!',data);
    //   })
    //   .error(function(err){
    //     console.log('error!:',err);
    //   });

    // Test from StackOverflow
    retrieve: function(name, callback) {
      var method = 'GET';
      var url = 'http://api.yelp.com/v2/search';
      var params = {
        callback: 'angular.callbacks._0',
        location: this.searchLocation,
        oauth_consumer_key: 'TsnPAO-_aWxaIOg9pINODA', //Consumer Key
        oauth_token: 'rP2sTwBPe2fK8JMnYSx7megW5C4EmJKw', //Token
        oauth_signature_method: "HMAC-SHA1",
        oauth_timestamp: new Date().getTime(),
        oauth_nonce: this.randomGen(32),
        category_filter: this.category_filter,
        radius_filter: this.radius_filter
      };
      var consumerSecret = 'lIppVhaecKJLupkZ1hoj_iXp70E'; //Consumer Secret
      var tokenSecret = '2Zri1ev2NoRkoQw9GCpDh1VFqFI'; //Token Secret
      var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, { encodeSignature: false});
      params.oauth_signature = signature;
      console.log(params);
      $http.jsonp(url, {params: params})
        .success(function(data){console.log('success', data);})
        .error(function(err){console.log('error', err);});
      

      // $http.jsonp('http://api.yelp.com/v2/search', {params:params})
      //   .success(function(data){
      //     console.log('success!',data);
      //   })
      //   .error(function(err){
      //     console.log('error!:',err);
      //   });
      // $http.get('http://www.reddit.com/.json')
      //   .success(function(data){ 
      //     var array = data.data.children;
      //     _.each(array, function(item){
      //       console.log('subreddit:', item.data.subreddit);
      //     }); 
      //   })
      //   .error(function(){ console.log('error!'); });
    }
  };
});
