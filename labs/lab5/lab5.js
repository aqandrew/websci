angular.module('lab5', [])
  .controller('Lab5Controller', Lab5Controller);

function Lab5Controller($scope, $http) {
  $scope.appName = 'Lab 6';
  $scope.query = '';
  $scope.tweetNum = 5;
  $scope.formats = ['JSON', 'CSV'];
  $scope.loadResult = '';
  $scope.exportResult = '';
  $scope.tweets = [];
  $scope.tweetString = '';

  $('form').submit(event => {
    event.preventDefault(); // Prevent page redirect on submit

    let postData = {
      query: $scope.query,
      tweetNum: $scope.tweetNum
    };

    $.post('/getTweets', postData, response => {
      console.log(response);
      $scope.loadResult = response.message;
      $scope.exportResult = '';
      $scope.tweets = response.tweets;
      $scope.tweetString = JSON.stringify($scope.tweets, null, 4);
      $scope.$apply();
    });
  });

  $scope.exportTweets = function() {
    let format = $('#export-format').val();

    $.post('/exportTweets', format, response => {
      $scope.exportResult = response;
      $scope.loadResult = '';
      $scope.$apply();
    });
  };
}

Lab5Controller.$inject = ['$scope', '$http'];
