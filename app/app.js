
var myAppModule = angular.module('accountingApp', ['ngRoute']);

myAppModule.config(function($routeProvider) {
  $routeProvider
   .when('/', {
    templateUrl: 'balance/balance.html',
    controller: 'appController'
  })

  .when('/expense', {
    templateUrl: 'expense/expense.html',
    controller: 'appController'
  });
});

myAppModule.controller('appController', ['$scope', function ($scope) {
  
}]);

