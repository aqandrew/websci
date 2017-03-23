angular.module('lab5', [])
  .controller('Lab5Controller', Lab5Controller);

function Lab5Controller($scope, $http) {
  $scope.appName = 'Lab 6';
  $scope.query = '';
  $scope.tweetNum = 5;
  $scope.formats = ['JSON', 'CSV'];

  $('form').submit(event => {
    event.preventDefault(); // Prevent page redirect on submit

    let postData = {
      query: $scope.query,
      tweetNum: $scope.tweetNum
    };

    $.post('/getTweets', postData, response => {
      console.log(response);
    });
  });

  $scope.exportTweets = function() {
    let format = $('#export-format').val();

    $.post('/exportTweets', format, response => {
      console.log(response);
    });
  };
}

Lab5Controller.$inject = ['$scope', '$http'];
