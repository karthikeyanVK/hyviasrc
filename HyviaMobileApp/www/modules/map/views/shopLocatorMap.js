angular.module('hyviaMobileApp')
  .controller('MapCtrl', function ($scope, $ionicLoading, $q, ShopServices,$state, $stateParams,$filter, CommonUtil) {
    $scope.settings = {};
    $scope.setMapMarkerData = function () {
      $scope.centerOnMe().then(function (pos) {
        var data = {
          title: "You are Here",
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
        var markerData = [];
        markerData.push(data)
        ShopServices.getShopsLocationDetails($stateParams.productId).then(function (shops) {
          angular.forEach(shops, function (shop) {
            var temp = {};
            temp.lat = shop.latitude;
            temp.lng = shop.longitude;
            temp.title = getShopDetails(shop, data, temp);
            markerData.push(temp);
          });
          $scope.markerData = markerData;
        });
        /*
         var data = {
         title: 'title',
         lat: pos.coords.latitude,
         lng: pos.coords.longitude
         };
         var markerData = [];

         for (var i = 0; i < 10; i++) {
         var temp = {};
         angular.copy(data, temp);
         temp.title = data.title + i;
         temp.lat = data.lat - i / 10;
         temp.lng = data.lng - i / 10;
         markerData.push(temp)
         }

         $scope.markerData = markerData;
         */

      });
    };
    var getShopDetails = function (shop, currentLocation, markerData) {
      var distance = CommonUtil.getDistanceFromLatLonInKm(currentLocation, markerData);

      return shop.shopName + ", " +
        shop.address + ', ' + shop.pincode +
        '</br> <b>' + $filter('number')(distance, 3) + " kms away </b>";

    }
    var initialize = function () {
      $scope.setMapMarkerData();
    };
    $scope.centerOnMe = function () {
      /* if(!$scope.map) {
       return;
       }
       */
      var deferred = $q.defer();

      $ionicLoading.show({
        content: 'Getting current location...',
        showBackdrop: false
      });

      navigator.geolocation.getCurrentPosition(function (pos) {
        //$scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        $ionicLoading.hide();
        deferred.resolve(pos);
        //return pos;
      }, function (error) {
        deferred.resolve('Hello, ' + name + '!');
        alert('Unable to get location: ' + error.message);
      });
      return deferred.promise;
    };
    $scope.clickMarker=function(marker)
    {
      console.log('inside clickmarker',marker);
      $state.go('shopDetails',{marker:marker});
    }
    initialize();
  });
