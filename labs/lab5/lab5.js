angular.module('lab5', [])
  .controller('Lab5Controller', Lab5Controller);

function Lab5Controller($scope, $http) {
  $scope.appName = 'Lab 5';
  $scope.query = '';
  $scope.tweetNum = 5;
}

Lab5Controller.$inject = ['$scope', '$http'];
