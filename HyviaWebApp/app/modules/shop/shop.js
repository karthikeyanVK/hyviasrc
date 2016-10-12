angular.module('WebApp')
  .controller('shopsController',function($scope,$state,WebApiService,settings){

    $scope.getShops = function() {
      var options = {
        domain: settings.apiURL
      };

      var shopService =  new WebApiService(options,false);

      shopService.Shop_GetAllShops().then(function (response) {
        $scope.tableParams = response;
        //constructTableData(response);
      });
    };
    $scope.addShopDetails= function () {
      $state.go('shopDetails');
    }
    var initialize = function() {

      $scope.shops = {};
      $scope.getShops();
      //$scope.tableParams = new ngTableParams();
      //$scope.tableParams1.reload();

    };
    initialize();
   /* var constructTableData = function(data)
    {
       $scope.tableParams.settings({
        dataset: data
      });
      //$scope.tableParams = new ngTableParams({}, { dataset: data});
    }*/
  });
