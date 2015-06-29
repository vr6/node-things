'use strict';

/* Filters */

angular.module('m2mcoreFilters', []).filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});
