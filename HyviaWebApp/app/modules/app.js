'use strict';

/**
 * @ngdoc overview
 * @name webApp
 * @description
 * # webApp
 * Main module of the application.
 */
angular
  .module('WebApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    "ngRoute",
    'ui.router',
    'ngTable',
    'AppCore'

  ])
  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('signInPage', {
        url: '/sign-in',
        templateUrl: 'modules/login/sign-in.html',
        controller: 'SignInCtrl'
      })
      .state('signup', {
        url: '/sign-up',
        templateUrl: 'modules/login/sign-up.html',
        controller: 'RegisterCtrl'
      })
      .state('customerhome', {
        url: '/customer-home',
        templateUrl: 'modules/customer/home.html',
        controller: 'ProductTypeSearchCtrl'
      })
      /*.state('productdetails', {
        url: '/product-details/{productTypeId}',
        templateUrl: 'modules/customer/product-details.html',
        controller: 'ProductDetailsSearchCtrl'
      })*/
      /*.state('shopDetails', {
        url: '/product-types',
        templateUrl: 'modules/shop/shop-details.html',
        controller: 'ProductTypeSearchCtrl'
      })*/

    $urlRouterProvider.otherwise('/sign-in');
   /* $routeProvider
      .when('/', {
        templateUrl: 'views/login/sign-up.html',
        controller: 'SignInCtrl'
      })
      .when('/signInPage', {
        templateUrl: 'views/login/sign-in.html',
        controller: 'SignInCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });*/
  });
