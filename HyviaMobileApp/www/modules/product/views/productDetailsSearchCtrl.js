/**
 * Created by Sudha on 15-11-2015.
 */


angular.module('hyviaMobileApp')
  .controller('ProductDetailsSearchCtrl', function ($scope, $state, $stateParams, ProductServices) {
    $scope.loadingData = "false";
    $scope.getProductDetails = function (productName) {
      var productDetails = {
        productTypeId: $stateParams.productTypeId,
        productName: productName
      };
      console.log('Get Product Details', productDetails);
      $scope.loadingData = "true";
      ProductServices.getProduct(productDetails).then(function (response) {
        console.log('HTTP CALL RESPONSE', response[0]);
        $scope.productDetails = response;
        console.log('product Details', $scope.productDetails);
        $scope.loadingData = "false";
        $state.go('productdetails');
      }, function (response) {
        $scope.showErrormsg = true;
        console.log('HTTP CALL RESPONSE', response);
        $scope.loadingData = "false";
      });
    };
    $scope.navigateToShopLocatorMap=function(productDetails)
    {
      $state.go('shopLocatorMap',{productId:productDetails.productId});
    }
    $scope.getProductDetails('');

  })
