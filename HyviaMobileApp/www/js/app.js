angular.module('hyviaMobileApp', ['ionic','satellizer','LocalStorageModule'])
  .config(function ($stateProvider, $urlRouterProvider,localStorageServiceProvider,$httpProvider) {
    $urlRouterProvider.otherwise('/product-types');
    localStorageServiceProvider.setPrefix('hyviaMobile');
    $httpProvider.interceptors.push('authInterceptorService');

  });


