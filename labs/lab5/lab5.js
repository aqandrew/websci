angular.module('lab5', [])
  .controller('Lab5Controller', Lab5Controller);

function Lab5Controller($scope, $http) {
  $scope.appName = 'Lab 7';
  $scope.appDescription = 'node.js, MongoDB, and Twitter API';
  const emptyString = '';
  const tweetNumDefault = 5;
  $scope.query = emptyString;
  $scope.tweetNum = tweetNumDefault;
  $scope.formats = ['JSON', 'CSV', 'XML'];
  $scope.loadResult = emptyString;
  $scope.exportResult = emptyString;
  $scope.tweets = [];
  $scope.tweetString = emptyString;
  $scope.formChanged = false;

  $scope.$watchGroup(['query', 'tweetNum'], (newValues, oldValues) => {
    if (newValues[0] || (newValues[1] != undefined && newValues[1] != tweetNumDefault)) {
      $scope.formChanged = true;
    }
    else {
      $scope.formChanged = false;
    }
  });

  $('form').submit(event => {
    event.preventDefault(); // Prevent page redirect on submit

    let postData = {
      query: $scope.query,
      tweetNum: $scope.tweetNum
    };

    $.post('/getTweets', postData, response => {
      console.log(response);
      $scope.loadResult = response.message;
      $scope.exportResult = emptyString;
      $scope.$apply();
    });
  });

  $scope.exportTweets = function() {
    // TODO export from MongoDB
    let format = $('#export-format').val();

    $.post('/exportTweets', format, response => {
      $scope.exportResult = response;
      $scope.loadResult = emptyString;
      $scope.$apply();
    });
  };

  $scope.displayTweets = function() {
    $.get('/displayTweets', data => {
      console.log(data);
      $scope.tweets = data;
      $scope.tweetString = JSON.stringify($scope.tweets, null, 4);
      $scope.loadResult = emptyString;
      $scope.exportResult = emptyString
      $scope.$apply();
    });
  }

  $scope.resetPage = function() {
    $scope.formChanged = false;
    // TODO reset MongoDB
  }
}

Lab5Controller.$inject = ['$scope', '$http'];
