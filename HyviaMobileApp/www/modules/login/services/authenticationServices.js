/**
 * Created by Sudha on 31-08-2015.
 */

var serviceModule = angular.module('hyviaMobileApp')

  .service('Authentication', function ($http, $q, localStorageService) {

    this.authenticate = function (user) {

      var url = "http://entityframeworktestsample.azurewebsites.net/token";
      var data = {
        grant_type: 'password',
        username: user.emailId,
        password: user.password
      };
      var serialize = function (obj) {
        var str = [];
        for (var p in obj) {
          if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
          }
        }
        return str.join('&');
      };
      var deferred = $q.defer();
      $http.post(url, serialize(data),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .success(function (response) {
          console.log('inside success', response);
          localStorageService.set('authorizationData', { token: response.access_token, userName: data.userName });
          deferred.resolve(response);

        })
        .error(function (response) {
          console.log('inside error', response);
          deferred.reject(response);
        }
      );
      console.log(deferred.promise);
      return deferred.promise;
    };
    var serialize = function (obj) {
      var str = [];
      for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
      }
      return str.join('&');
    };
    this.register = function (user) {

      var url = "http://entityframeworktestsample.azurewebsites.net/api/account/register";
      //var url = "http://localhost:60517/api/account/register"
      var data = {
        username: user.emailId,
        password: user.password,
        confirmPassword: user.confirmPassword
      };

      var deferred = $q.defer();
      $http.post(url, data)
        .success(function (response) {

          console.log('inside success', response);
          //localStorageService.set('authorizationData', { token: response.access_token, userName: data.userName });
          deferred.resolve(response);
        })
        .error(function (response) {
          console.log('inside error', response);
          deferred.reject(response);
        }
      );

      console.log(deferred.promise);
      return deferred.promise;
    };


  });
