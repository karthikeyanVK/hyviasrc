/**
 * Created by Sudha on 31-08-2015.
 */

var serviceModule = angular.module('WebApp')

  .service('Authentication',function($http,$q){
    this.authenticate=function(user)
    {
      var url="http://entityframeworktestsample.azurewebsites.net/token";
      var data = {
        grant_type:'password',
        username: user.emailId,
        password: user.password
      };
      var serialize =function (obj) {
        var str = [];
        for (var p in obj) {
          if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
          }
        }
        return str.join('&');
      };
      var deferred = $q.defer();
      $http.post(url,serialize(data),
        {
          headers:{
            'Content-Type':'application/x-www-form-urlencoded'
          }
        })
        .success(function(response)
        {
          console.log('inside success',response);
          deferred.resolve(response);

        })
        .error(function(response)
        {
          console.log('inside error',response);
          deferred.reject(response);
        }
      );
      console.log( deferred.promise);
      return deferred.promise;
    };
    this.register = function (user) {

      var url = "http://entityframeworktestsample.azurewebsites.net/api/account/register";
      var data = {
        username: user.emailId,
        password: user.password,
        confirmPassword: user.confirmPassword
      };

      var deferred = $q.defer();
      $http.post(url, data)
        .success(function (response) {
          console.log('inside success', response);
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
