var m2mcoreAnimations = angular.module('m2mcoreAnimations', ['ngAnimate']);

m2mcoreAnimations.animation('.devicetype', function() {

  var animateUp = function(element, className, done) {
    if(className != 'active') {
      return;
    }
    element.css({
      position: 'absolute',
      top: 500,
      left: 0,
      display: 'block'
    });

    jQuery(element).animate({
      top: 0
    }, done);

    return function(cancel) {
      if(cancel) {
        element.stop();
      }
    };
  }

  var animateDown = function(element, className, done) {
    if(className != 'active') {
      return;
    }
    element.css({
      position: 'absolute',
      left: 0,
      top: 0
    });

    jQuery(element).animate({
      top: -500
    }, done);

    return function(cancel) {
      if(cancel) {
        element.stop();
      }
    };
  }

  return {
    addClass: animateUp,
    removeClass: animateDown
  };
});

var addmenu = function (scope, doc) {
    scope.menuclicked = false;
	scope.toggleSelect = function(){
	  scope.isPopupVisible = !scope.isPopupVisible;
	    scope.menuclicked = true;
	}
	doc.bind('click', function(event){
		if (!scope.menuclicked) {
			scope.isPopupVisible = false;
			scope.$apply();
		}
		scope.menuclicked = false;
	});
};