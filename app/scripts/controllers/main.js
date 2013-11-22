'use strict';

angular.module('protoKoolApp').controller('MainCtrl', function ($scope) {

	$scope.computerCount = 12;

	$scope.computerCountChange = function() {
		var list = [];

		for (var i=1; i<=$scope.computerCount; i++) {
			list.push(i);
		}

		$scope.computers = list;
	};

	$scope.computerCountChange();

	$scope.others =['Telefon', 'Anderes', 'Papier', 'Break/Missing'];
});
