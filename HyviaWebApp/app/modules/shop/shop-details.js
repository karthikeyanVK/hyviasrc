angular.module('WebApp')
  .controller('shopDetailsController', function ($scope, WebApiService, $state, $stateParams, settings) {
    //TODO: move to settings
    var options = {
      domain: settings.apiURL
    };
    $scope.shopDetails = {
      shopCommand: {
        "shopName": "",
        "emailAddress": "",
        "pincode": "",
        "address": "",
        "latitude": 0,
        "longitude": 0,
        "activationStatus": 0,
        "shopPhoneNo": "",
        "shopMobileNo": "",
        "shopOwnerPhoneNo": "",
        "shopOwnerMobileNo": "",
        "shopCategory": "",
        "shopWebsiteURL": "",
        "registrationDate": ""
      }
    };
    $scope.markerData = {
      lat: 13,
      lng: 8
    };
    $scope.loadShopDetails = function () {
      var shopService = new WebApiService(options, true);
      if ($stateParams.shopId) {

        //TODO: This crappy code about parameters should be removed
        var productParameters = {
          'productQuery.shopId': $stateParams.shopId
        };
        var shopParameters = {
          'shopId': $stateParams.shopId
        };
        shopService.Shop_Get(shopParameters).then(function (response) {
          console.log(response);
          $scope.shopDetails.shopCommand = response[0];
        });
        shopService.Products_Get(productParameters).then(function (response) {
          console.log(response);

          $scope.tableParams = response;
        });
      }
      shopService.Products_GetProductAllTypes({}).then(function (response) {
        console.log(response);

        $scope.shopDetails.productTypes = response;
      });

    };
    $scope.saveShopDetails = function () {


      var shopService = new WebApiService(options, false);

      shopService.Shop_Post($scope.shopDetails).then(function (response) {
        $scope.shopDetails.shopCommand.shopId = response;
        console.log(response);
      });
    };
    $scope.addProductDetails = function () {
      // #/shop-details?shopId={{shop.shopId}}"
      $state.go('newProductDetails', {shopId: $scope.shopDetails.shopCommand.shopId});
    };
    var initialize = function () {
      $scope.loadShopDetails();
    };
    initialize();
  });
