'use strict';

/* App Module */

var m2mcore = angular.module('m2mcore', [
  'ngRoute',
  'm2mcoreAnimations',
  'm2mcoreFilters',
  'm2mcoreServices'
]);

m2mcore.config(['$routeProvider',  function($routeProvider) {
    $routeProvider.when('/devsvcs', {templateUrl: 'devsvc/devsvc-list.html',   controller: DevSvcListCtrl});
    $routeProvider.when('/devsvcs/:_id', {templateUrl: 'devsvc/devsvc-detail.html', controller: DevSvcDetailCtrl});
    $routeProvider.when('/devices',  {templateUrl: 'device/device-list.html', controller: DeviceListCtrl});
    $routeProvider.when('/devices/new',  {templateUrl: 'device/device-form.html', controller: DeviceNewCtrl});
    $routeProvider.when('/devices/:_id', {templateUrl: 'device/device-detail.html', controller: DeviceDetailCtrl});
    $routeProvider.when('/messages', {templateUrl: 'message/message-list.html',   controller: MessageListCtrl});
    $routeProvider.otherwise({redirectTo: '/devsvcs'});

}]);

m2mcore.run(function($rootScope) {
    $rootScope.viewTitle = "Admin Console";
});