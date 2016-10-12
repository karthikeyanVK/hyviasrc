angular.module('WebApp')

  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('shops', {
        url: '/shops',
        templateUrl: 'modules/shop/shops.html',
        controller: 'shopsController'
      })
      .state('shopDetails', {
        url: '/shop-details?shopId',
        templateUrl: 'modules/shop/shop-details.html',
        controller: 'shopDetailsController'
      })
    .state('productDetails', {
      url: '/product-details?:productId',
      templateUrl: 'modules/product/product-details.html',
      controller: 'productDetailsController'
    })
    .state('newProductDetails', {
      url: '/product-details/new/?:shopId',
      templateUrl: 'modules/product/product-details.html',
      controller: 'productDetailsController'
    });


  });
