'use strict';

var res;
angular.module('m2mcoreServices', ['ngResource'])
	.factory('DeviceType', ['$resource', '$http',
        function($resource, $http) {
			var actions = {
                'count': {method:'PUT', params:{_id: 'count'}},
                'distinct': {method:'PUT', params:{_id: 'distinct'}},
                'find': {method:'PUT', params:{_id: 'find'}, isArray:true},
                'group': {method:'PUT', params:{_id: 'group'}, isArray:true},
                'mapReduce': {method:'PUT', params:{_id: 'mapReduce'}, isArray:true} ,
                'aggregate': {method:'PUT', params:{_id: 'aggregate'}, isArray:true}
            }
            res = $resource('api/devmodels/:_id', {}, actions);
            return res;

        }
    ])
	.factory('DevDomain', ['$resource', '$http',
        function($resource, $http) {
            return $resource('api/devdomains', {}, {});
        }
    ])
	.factory('Device', ['$resource', '$http',
        function($resource, $http) {
            return $resource('api/devices', {}, {});
        }
    ])
	.factory('Message', ['$resource', '$http',
        function($resource, $http) {
            return $resource('api/messages', {}, {});
        }
    ])
    .factory('db', ['$resource', '$http',
		function($resource, $http) {
			var actions = {
				'count': {method:'PUT', params:{_id: 'count'}},
				'distinct': {method:'PUT', params:{_id: 'distinct'}},
				'find': {method:'PUT', params:{_id: 'find'}, isArray:true},
				'group': {method:'PUT', params:{_id: 'group'}, isArray:true},
				'mapReduce': {method:'PUT', params:{_id: 'mapReduce'}, isArray:true} ,
				'aggregate': {method:'PUT', params:{_id: 'aggregate'}, isArray:true}
			}
			var db = {};
			db.devmodels = $resource('api/devmodels/:_id', {}, actions);
			return db;
		}
	]);