/**
 * Created by Sudha on 28-11-2015.
 */
angular.module('hyviaMobileApp')
  .service('ShopServices', function ($http, $q) {
    this.getShopsLocationDetails= function (productId) {

      var url = "http://entityframeworktestsample.azurewebsites.net/api/shops/product?productId=" + productId;
      var deferred = $q.defer();
      $http.get(url)
        .success(function (response) {
          console.log('inside success', response);
          deferred.resolve(response);
        })
        .error(function (response) {
          console.log('inside error', response);
          deferred.reject(response);
        }
      );
      console.log(deferred.promise);
      return deferred.promise;
    };
  });
