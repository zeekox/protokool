'use strict';

angular.module('LocalStorageModule').value('prefix', 'myPre');

angular.module('protoKoolApp', [
  'ngSanitize',
  'ngRoute',
  'ngTouch',
  'LocalStorageModule'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
