'use strict';

/* Controllers */


function DevSvcDetailCtrl($resource, $routeParams, $scope) {
    $scope.devsvc = $resource('api/devsvcs/:_id', {}, {}).get({_id: $routeParams._id}, function(device) {
    });
}
DevSvcDetailCtrl.$inject = ['$resource', '$routeParams', '$scope'];

function DevSvcListCtrl($document, $scope, $resource) {
    $scope.devsvcs = $resource('api/devsvcs').query ({name:$scope.query});
	addmenu($scope, $document);
    $scope.isOptMenu = true;
    $scope.optmenus = [
      {
        name: "Add Devices"
      }
    ];
}
DevSvcListCtrl.$inject = ['$document', '$scope', '$resource'];
