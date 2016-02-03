angular.module('accountingApp').controller('balanceController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  
  $http.get('/api/expenses').success(function (data) {
    $scope.expenses = data;
  });

  $scope.addExpense = function () {
    $location.path('/expense');
  };

}]);
