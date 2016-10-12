angular.module('hyviaMobileApp')
  .controller('ShopCtrl', function ($scope, $state, ShopServices,$stateParams) {
    console.log('marker',$stateParams.marker);
var marker=$stateParams.marker;
    console.log('marker',marker);
  })
