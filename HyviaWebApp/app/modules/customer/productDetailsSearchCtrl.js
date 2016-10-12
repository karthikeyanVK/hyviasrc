/**
 * Created by Sudha on 15-11-2015.
 */


angular.module('WebApp')
  .controller('ProductDetailsSearchCtrl', function ($scope, $state, ProductServices) {

    $scope.getProductDetails=function(productName)
    {
      var productDetails={
        productTypeId : 'ee67c6e1-337d-4e4f-bcb0-70c4101418e1',
        productName : productName
      };
      console.log('Get Product Details', productDetails);
      ProductServices.getProduct(productDetails).then(function (response) {
        console.log('HTTP CALL RESPONSE', response[0]);
        $scope.productDetails = response;
        console.log('product Details', $scope.productDetails);
        $state.go('productdetails');
      }, function (response) {
        $scope.showErrormsg = true;
        console.log('HTTP CALL RESPONSE', response);

      });
    };
    $scope.getProductDetails('');
  })
