angular.module('lab5', [])
  .controller('Lab5Controller', Lab5Controller);

function Lab5Controller($scope, $http) {
  $scope.appName = 'Lab 7';
  $scope.appDescription = 'node.js, MongoDB, and Twitter API';
  $scope.query = '';
  $scope.tweetNum = 5;
  $scope.formats = ['JSON', 'CSV', 'XML'];
  $scope.loadResult = '';
  $scope.exportResult = '';
  $scope.tweets = []; // TODO build MongoDB of tweets instead of this
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
    // TODO export from MongoDB
    let format = $('#export-format').val();

    $.post('/exportTweets', format, response => {
      $scope.exportResult = response;
      $scope.loadResult = '';
      $scope.$apply();
    });
  };

  $scope.displayTweets = function() {
    alert('TODO display tweets');
  }

  $scope.resetPage = function() {
    alert('TODO reset page');
  }
}

Lab5Controller.$inject = ['$scope', '$http'];
