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

  let clearTweets = function () {
    $.get('/clearTweets');
  };

  $scope.init = function () {
    $scope.appName = 'Lab 10';
    $scope.appDescription = 'Tweet visualization';
    $scope.query = emptyString;
    $scope.tweetNum = tweetNumDefault;
    $scope.formats = ['JSON', 'CSV', 'XML'];
    $scope.format = $scope.formats[0];
    $scope.tweets = [];
    $scope.tweetString = emptyString;
    $scope.formChanged = false;
    hideAlert();
    clearTweets();
  }

  $scope.init();

  $scope.$watchGroup(['query', 'tweetNum', 'format'], (newValues, oldValues) => {
    if (newValues[0] || (newValues[1] != undefined && newValues[1] != tweetNumDefault) ||
        newValues[2] != $scope.formats[0]) {
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
    console.log('displayTweets called!');

    let format = $('#export-format').val();

    $.post('/displayTweets', format, data => {
      console.log(data);
      $scope.tweets = data.docs;
      $scope.tweetString = data.formatted;
      $scope.$apply();
    });
  };

  $scope.resetPage = function () {
    $scope.init();
    changeAlert('Page reset.', 'alert-danger');
    showAlert();
  };

  // Visualization

  $scope.loadVisualizations = function() {
    loadVis1();
    loadVis2();
    loadVis3();
  };

  let someSvg = document.querySelector('.tweet-vis'),
    width = parseInt(getComputedStyle(someSvg).getPropertyValue('width'), 10),
    height = parseInt(getComputedStyle(someSvg).getPropertyValue('height'), 10);

  let loadVis1 = function() {

  };

  let loadVis2 = function() {
  	let svg2 = d3.select("#vis-2"),
      profileColors = $scope.tweets.map(tweet => {
    		return tweet.user.profile_background_color;
    	}),
      smallSquareNum = Math.ceil(Math.sqrt(profileColors.length)),
      smallSquareSize = width / smallSquareNum;

  	svg2.selectAll('rect')
  		.data(profileColors)
  		.enter()
  		.append('rect')
  			.attr('x', (d, index) => { return (index % smallSquareNum) * smallSquareSize; })
  			.attr('y', (d, index) => { return Math.floor(index / smallSquareNum) * smallSquareSize; })
  			.attr('width', smallSquareSize)
  			.attr('height', smallSquareSize)
  			.attr('fill', (d) => { return '#' + d; });
  };

  let loadVis3 = function() {

  };
}

Lab5Controller.$inject = ['$scope', '$http'];
