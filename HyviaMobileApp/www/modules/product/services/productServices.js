/**
 * Created by Sudha on 15-11-2015.
 */

angular.module('hyviaMobileApp')

  .service('ProductServices', function ($http, $q) {

      this.getProductType = function (productName) {

        var url = "http://entityframeworktestsample.azurewebsites.net/api/products/types?productName=" + productName;
        //var url = "http://localhost:60517/api/products/types?productName=" + productName;
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

    this.getProduct = function (product) {
      var url = "http://entityframeworktestsample.azurewebsites.net/api/Products?";
      var url_query = "productTypeId=" + product.productTypeId + "&productName=" + product.productName;
      // url_query="productQuery.productTypeId=abc&productQuery.productName=xyz"
      var deferred = $q.defer();
      $http.get(url + url_query)
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
  })
