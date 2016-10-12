/**
 * Created by Sudha on 02-09-2015.
 */

angular.module('hyviaMobileApp')
    .controller('SignInCtrl', function ($scope, $state, Authentication) {

    $scope.showErrormsg = false;


    $scope.signIn = function (user) {
      console.log('HTTP CALL', user);

      Authentication.authenticate(user).then(function (response) {
        //$scope.data = response;
        console.log('HTTP CALL RESPONSE', response);
        $state.go('productTypes');
      }, function (response) {
        $scope.showErrormsg = true;
        console.log('HTTP CALL RESPONSE', response);

      });

    };

    $scope.showSignIn = function()
    {
      $scope.signInTabShow = true;
      $scope.signUpTabShow = false;
    };
    $scope.showSignUp = function()
    {
      $scope.signInTabShow = false;
      $scope.signupTabShow = true;
    };
    $scope.signUpPage = function (user) {
      console.log('Sign-Up-Page', user);
      $state.go('signup');
    };
    $scope.showSignIn();
  });
