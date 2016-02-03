angular.module('accountingApp').controller('expenseController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  
  $scope.update = function(expense) {
    
    var data = angular.toJson(expense);
    
    $http({
      url: '/api/expense',
      data: data,
      method: 'POST',
      headers: {
          'X-CSRFToken': $scope.token
      }
    }).success(function () {
      $location.path('/');
    });
  };

  $scope.routeToBalance = function () {
    $location.path('/');
  };

}]);
