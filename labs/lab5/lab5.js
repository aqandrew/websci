angular.module('lab5', [])
  .controller('Lab5Controller', Lab5Controller);

function Lab5Controller($scope, $http) {
  const emptyString = '';
  const tweetNumDefault = 5;
  const alertTimeout = 2500;
  const alertClasses = 'alert collapse';

  let setAlertTimeout = () => {
    setTimeout(hideAlert, alertTimeout);
  }

  let hideAlert = () => {
    $('.alert').hide('fade');
  };

  let showAlert = () => {
    $('.alert').show('fade');
    setAlertTimeout();
  };

  let changeAlert = function (text, alertClass) {
    $('#alert-text').text(text);
    $('.alert').removeClass()
      .addClass(alertClasses)
      .addClass(alertClass);
  };

  $scope.init = function () {
    $scope.appName = 'Lab 7';
    $scope.appDescription = 'node.js, MongoDB, and Twitter API';
    $scope.query = emptyString;
    $scope.tweetNum = tweetNumDefault;
    $scope.formats = ['JSON', 'CSV', 'XML'];
    $scope.tweets = [];
    $scope.tweetString = emptyString;
    $scope.formChanged = false;
    hideAlert();
  }

  $scope.init();

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
      changeAlert(response.message, 'alert-info');
      showAlert();
    });
  });

  $scope.exportTweets = function() {
    let format = $('#export-format').val();

    $.post('/exportTweets', format, response => {
      changeAlert(response, 'alert-success');
      showAlert();
    });
  };

  $scope.displayTweets = function() {
    $.get('/displayTweets', data => {
      console.log(data);
      $scope.tweets = data;
      $scope.tweetString = JSON.stringify($scope.tweets, null, 4);
      $scope.$apply();
    });
  };

  $scope.resetPage = function () {
    $scope.init();
    changeAlert('Page reset.', 'alert-danger');
    showAlert();
  };
}

Lab5Controller.$inject = ['$scope', '$http'];
