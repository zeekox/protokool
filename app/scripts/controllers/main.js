'use strict';

angular.module('protoKoolApp').controller('MainCtrl', function ($scope) {

	$scope.computerCount = 12;

	var computers = $scope.computers = [];

	var computerCountChange = $scope.computerCountChange = function() {

		for (var i=1; i<=$scope.computerCount; i++) {
			computers.push(i);
		}
	};

	computerCountChange();

	var entries = $scope.entries = [];

	$scope.addEntry = function(entry) {
		entries.push(entry);
	};


	$scope.others =['Telefon', 'Anderes', 'Papier', 'Break/Missing'];
});
