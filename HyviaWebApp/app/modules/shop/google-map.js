
angular.module('WebApp')
  .directive('googleMap', function ($compile) {

    function createMarker(mapMarker, scope, map) {
      var contentString = "<div><a ng-click='clickTest()'>" + mapMarker.title + "</a></div>";
      var compiled = $compile(contentString)(scope);

      var infoWindow = new google.maps.InfoWindow({
        content: compiled[0]
      });
      var latLngData = new google.maps.LatLng(mapMarker.lat, mapMarker.lng);
      var marker = new google.maps.Marker({
        position: latLngData,
        map: map,
        title: mapMarker.title,
        options: {
          draggable: true
        },
        events: {
          dragend: function (marker, eventName, args) {
            $log.log('marker dragend');
            $log.log(marker.getPosition().lat());
            $log.log(marker.getPosition().lng());
            $scope.$apply(function () {
              $scope.marker.coords.latitude =
                marker.getPosition().lat();
              $scope.marker.coords.longitude =
                marker.getPosition().lng();
            });
          }
        }
      });
      google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open(map, marker);
        console.log('calling clickMarker', marker);
        scope.clickMarker({marker: marker});

        // $state.go(('shopDetails', {marker: marker}));
      });
      /*google.maps.event.addListener(marker, 'dblclick', function () {

       $state.go(('shopDetails', {marker: marker}));

       });*/
      infoWindow.open(map, marker);
    }

    function updateMarker(scope, map) {

      for (var i = 1; i < scope.mapMarkerData.length; i++) {

        var mapMarker = scope.mapMarkerData[i];
        createMarker(mapMarker, scope, map);
      }
    }


    function setUpMap(element, scope) {

      if (!scope) {
        scope = {};
        scope.mapMarkerData = [{
          lat: 13.08,
          lng: 80.27
        }];
      }
      var mapMarker = _.first(scope.mapMarkerData);

      var myLatlng = new google.maps.LatLng(mapMarker.lat, mapMarker.lng);

      var mapOptions = {
        center: myLatlng,
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        options: { draggable: true }
      };

      var mapId = 'map';
      if (element && element.length > 0) {
        mapId = element[0].id
      }
      var map = new google.maps.Map(document.getElementById(mapId),
        mapOptions);
      /*var marker = new google.maps.Marker({
       position: myLatlng,
       map: map,
       title: 'test'
       });*/
      createMarker(mapMarker, scope, map);
      updateMarker(scope, map);
    }

    google.maps.event.addDomListener(window, 'load', setUpMap);

    //TODO:Should be used to navigate to current location.


    var clickTest = function () {
      alert('Example of infowindow with ng-click')
    };
    return {
      scope: {
        centerOnMe: '&centerOnMe',
        mapMarkerData: '=',
        clickMarker: '&clickMarker'
      },
      restrict: 'AE',
      link: function (scope, element) {
        var _scope = scope;
       // setUpMap(element, _scope);
        scope.$watch('mapMarkerData', function (newMarkerData, oldMarkerData) {
          if (angular.isDefined(newMarkerData) && newMarkerData !== oldMarkerData) {
            setUpMap(element, _scope);
          }
        });

        // scope.clickMarker();
      }
    }
  });
