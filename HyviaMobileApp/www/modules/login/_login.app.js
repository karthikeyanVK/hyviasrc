angular.module('hyviaMobileApp')

  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('signin', {
        url: '/sign-in',
        templateUrl: 'modules/login/views/sign-in.html',
        controller: 'SignInCtrl',
        data:{
          requiresLogin:false
        }
      })
      .state('signup', {
        url: '/sign-up',
        templateUrl: 'modules/login/views/sign-in.html',
        controller: 'SignInCtrl',
        data:{
          requiresLogin:false
        }
      })
      .state('forgotpassword', {
        url: '/forgot-password',
        templateUrl: 'templates/forgot-password.html',
        data:{
          requiresLogin:false
        }
      });

    //$urlRouterProvider.otherwise('/sign-in');

  });
