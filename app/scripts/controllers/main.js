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

	$scope.export = function() {
		$scope.exportContent = '';
		for (var i=0; i<entries.length; i++) {

			var d = entries[i].date;
			var day = d.getDate();
			var month = d.getMonth();
			month++;
			var year = d.getFullYear();
			var hour = d.getHours();
			var min = d.getMinutes();
			var sec = d.getSeconds();

			$scope.exportContent += year + '-' + month + '-' + day + ';';
			$scope.exportContent += hour + ':' + min + ':' + sec + ';';
			$scope.exportContent += entries[i].name + '\n';
		}

	};


	$scope.others =['Telefon', 'Anderes', 'Papier', 'Missing'];
});
