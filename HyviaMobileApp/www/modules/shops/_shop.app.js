/**
 * Created by Sudha on 13-12-2015.
 */
angular.module('hyviaMobileApp')

  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('shopDetails', {
        url: '/shopDetails/:marker',
        templateUrl: 'modules/shops/views/shop-details.html',
        controller: 'ShopCtrl'
      })
    //$urlRouterProvider.otherwise('/sign-in');

  });
