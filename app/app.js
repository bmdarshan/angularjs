// declare a module
var myAppModule = angular.module('accountingApp', ['ngRoute']);

// configure the module.
// in this example we will create a greeting filter
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

