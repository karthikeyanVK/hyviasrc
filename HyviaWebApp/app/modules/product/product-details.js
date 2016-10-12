angular.module('WebApp')
  .controller('productDetailsController', function ($scope,$state, WebApiService, $stateParams, settings) {
    //TODO: move to settings
    var options = {
      domain: settings.apiURL
    };

    $scope.loadProductDetails = function () {
      $scope.productDetails = {
        productCommand: {
          "productId": "",
          "productTypeId": "",
          "shopId": "",
          "productName": ""
        }
      };
      var productService = new WebApiService(options, true);
      productService.Products_GetProductAllTypes({}).then(function (response) {
        console.log(response);
        $scope.productDetails.productTypes = response;
      });
      if ($stateParams.productId) {

        var parameters = {
          'productQuery.productId': $stateParams.productId
        };

        productService.Products_Get(parameters).then(function (response) {
          console.log(response);
          $scope.productDetails.productCommand = response[0];
        });
      }
      else if ($stateParams.shopId) {
        $scope.productDetails.productCommand.shopId = $stateParams.shopId;
      }
    };
    $scope.saveProductDetails = function (shopId) {

      var productService = new WebApiService(options, false);

      productService.Products_Post($scope.productDetails).then(function (response) {
        $state.go('shopDetails', {shopId: shopId});
        //$state.go("shop-details?shopId="+ shopId);
        console.log(response);
      });
    };
    var initialize = function () {
      $scope.loadProductDetails();
    };
    initialize();
  });

