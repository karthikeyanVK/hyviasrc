/**
 * Created by Sudha on 13-11-2015.
 */
angular.module('hyviaMobileApp')
  .controller('ProductTypeSearchCtrl', function ($scope, $state, ProductServices) {
    $scope.loadingData = "false";
    $scope.getProductTypes=function(productName)
    {
      $scope.loadingData = "true";
      console.log('Get Product Type', productName);

      ProductServices.getProductType(productName).then(function (response) {
        //$scope.data = response;
        console.log('HTTP CALL RESPONSE', response[0]);
        $scope.productType = response;
        $scope.loadingData = "false";
      }, function (response) {
        $scope.showErrormsg = true;
        console.log('HTTP CALL RESPONSE', response);
        $scope.loadingData = "false";
      });
    };
    $scope.gotoProductDetailsPage=function(productTypeId) {
      $state.go('productdetails', {productTypeId: productTypeId});
    }
    $scope.getProductTypes('')

  })
