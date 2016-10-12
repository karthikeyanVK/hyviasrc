/**
 * Created by Sudha on 22-11-2015.
 */
angular.module('hyviaMobileApp')

  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('shopLocatorMap', {
        url: '/map/:productId',
        templateUrl: 'modules/map/views/map.html',
        controller: 'MapCtrl'
      })
  });
