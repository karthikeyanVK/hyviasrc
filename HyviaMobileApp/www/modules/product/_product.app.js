angular.module('hyviaMobileApp')

  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('productTypes', {
        url: '/product-types',
        templateUrl: 'modules/product/views/product-types.html',
        controller: 'ProductTypeSearchCtrl'
      })
      .state('productdetails', {
        url: '/product-details/:productTypeId',
        templateUrl: 'modules/product/views/product-details.html',
        controller: 'ProductDetailsSearchCtrl'
      });
    //$urlRouterProvider.otherwise('/sign-in');

  });
