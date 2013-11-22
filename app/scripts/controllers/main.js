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

	var counter = 0;

	$scope.addEntry = function(entry) {
		if($scope.selectedItem === entry) {
			entries[0].count += 'X';
		} else {
	
			$scope.selectedItem = entry;
			entries.unshift({ id: counter++, name: entry, date: new Date(), count: ''});
		}
	};


	$scope.others =['Telefon', 'Anderes', 'Papier', 'Missing'];
});
