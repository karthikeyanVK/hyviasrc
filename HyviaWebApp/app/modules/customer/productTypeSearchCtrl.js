/**
 * Created by Sudha on 13-11-2015.
 */
angular.module('WebApp')
  .controller('ProductTypeSearchCtrl', function ($scope, $state, ProductServices) {

    $scope.getProductTypes=function(productName)
    {
      console.log('Get Product Type', productName);
      ProductServices.getProductType(productName).then(function (response) {
        //$scope.data = response;
        console.log('HTTP CALL RESPONSE', response[0]);
        $scope.productType = response;
      }, function (response) {
        $scope.showErrormsg = true;
        console.log('HTTP CALL RESPONSE', response);

      });
    };
    $scope.gotoProductDetailsPage=function(productTypeId) {
      $state.go('productdetails', {productTypeId: productTypeId});
    }


  })
