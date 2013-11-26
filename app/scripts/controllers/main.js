'use strict';

angular.module('protoKoolApp').controller('MainCtrl', function ($scope, localStorageService) {

	$scope.computerCount = 12;

	var computers = $scope.computers = [];

	var computerCountChange = $scope.computerCountChange = function() {

		for (var i=1; i<=$scope.computerCount; i++) {
			computers.push(i);
		}
	};

	computerCountChange();

	var entriesKey = 'entries';
	var entriesString = localStorageService.get(entriesKey);
	var entries = $scope.entries = [];
	var counter = 0;
	
	if (entriesString) {
		$scope.entries = JSON.parse(entriesString);
		entries = $scope.entries;
		counter = entries.length + 1;
	}


	$scope.addEntry = function(entry) {
		var updated_entry = {};

		if($scope.selectedItem === entry && entries.length > 0) {
			entries[0].count += 'X';
			updated_entry = entries[0];
		} else {

			$scope.selectedItem = entry;

			updated_entry = { id: counter++, name: entry, date: new Date(), count: ''};
			entries.unshift(updated_entry);
		} 
		localStorageService.add(entriesKey, JSON.stringify(entries));
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
			$scope.exportContent += entries[i].name + ';' + entries[i].count.length + ';\n';
		}

	};


	$scope.others =['Telefon', 'Anderes', 'Papier', 'Missing'];
});
