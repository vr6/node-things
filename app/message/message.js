'use strict';

/* Controllers */


function MessageListCtrl($document, $scope, Message) {
	$scope.messages = Message.query ({title:$scope.query});
    addmenu($scope, $document);
}
MessageListCtrl.$inject = ['$document', '$scope', 'Message'];

