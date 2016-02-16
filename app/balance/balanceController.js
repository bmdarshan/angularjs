angular.module('accountingApp').controller('balanceController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

  $scope.getExpenses = function () {
    $http.get('/api/expenses').success(function (data) {
      $scope.expenses = data;
    });
  };

  $scope.getExpenses();

  $scope.addExpense = function () {
    $location.path('/expense');
  };

  $scope.deleteExpense = function (id) {
    $http.delete('/api/expense/' + id).success(function (data) {
      $scope.getExpenses();
    });
  };

}]);
