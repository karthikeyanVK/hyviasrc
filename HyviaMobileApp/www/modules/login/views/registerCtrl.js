angular.module('hyviaMobileApp')
  .controller('RegisterCtrl', function ($scope, $state, Authentication) {
    $scope.showErrormsg = false;
    $scope.signUp = function (user) {
      console.log('Sign-Up', user);
      Authentication.register(user).then(function (response) {
        $scope.data = response;
        console.log('HTTP CALL RESPONSE', response);
        $scope.showSignIn();
      }, function (response) {
        $scope.showErrormsg = true;
        console.log('HTTP CALL RESPONSE', response);

      });
    };

    $scope.signInPage = function (user) {
      console.log('Sign-In-Page', user);
      $state.go('signin');
    };

    })
