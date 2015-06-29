'use strict';

/* Controllers */

function DeviceListCtrl($document, $scope, $resource, $location) {
//    $scope.devices = Device.query();
//    $scope.devices = $resource('api/devices/with/devmodels', {}, {}).query({});
//   $scope.devices = $resource('api/devices/with/devmodels').query ({name:$scope.query});
 	  $scope.devices = $resource('api/devices', {}, {}).query({});
    addmenu($scope, $document);

    $scope.addnew = function () {
        $location.path("/devices/new");
    }
    $scope.isOptMenu = true;
    $scope.optmenus = [
      {
         name: "Subscribe to Service",
         menuaction: function () {$scope.addToService();}
      }
   ];
   $scope.addToService = function() {
        alert("test");
   }
}
DeviceListCtrl.$inject = [ '$document', '$scope', '$resource', '$location'];


function DeviceDetailCtrl($resource, $routeParams, $scope) {
    $scope.device = $resource('api/devices/:_id', {}, {}).get({_id: $routeParams._id}, function(device) {
//		$scope.devmodel = $resource('api/devmodels/:_id', {}, {}).get({_id: $scope.device.type}, function(devmodel) {
//		});
    });
}
DeviceDetailCtrl.$inject = ['$resource', '$routeParams', '$scope'];

function DeviceNewCtrl(Device, $routeParams, $location, $scope, db) {
    $scope.device = new Device();
    $scope.devmodels = db.devmodels.query();
    $scope.save = function () {
        Device.save({}, $scope.device, function (res) {
			console.log(JSON.stringify(res));
			if (res._id !== "") { $location.path("/devices");}
		} )
    }
}
DeviceNewCtrl.$inject = ['Device', '$routeParams', '$location', '$scope', 'db'];

