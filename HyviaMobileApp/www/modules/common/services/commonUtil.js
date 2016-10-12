angular.module('hyviaMobileApp')
  .service('CommonUtil', function ($http, $q) {
    this.getDistanceFromLatLonInKm = function (start, destination) {
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(destination.lat - start.lat);  // deg2rad below
      var dLon = deg2rad(destination.lng - start.lng);
      var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(start.lat)) * Math.cos(deg2rad(destination.lat)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in km
      return d;
    }

    function deg2rad(deg) {
      return deg * (Math.PI / 180)
    }
  });
