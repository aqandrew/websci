var apiKey = '43d590218aa74d6e974ced753c0419ec';
var degreeSymbol = '\xB0';

angular.module('quiz1', [])
  .controller('Quiz1Controller', Quiz1Controller);

function Quiz1Controller($scope, $http) {
  let messageNoInfo = 'No weather information available.';

  $scope.appName = 'Quiz 1';
  $scope.weatherInfo = messageNoInfo;
  $scope.zipcode;
  $scope.localTemp;

  $scope.getWeatherInfo = function() {
    if ($scope.zipcode) {
      let currentWeatherUrl = 'http://api.openweathermap.org/data/2.5/weather?&APPID=' + apiKey + '&zip=' + $scope.zipcode

      // Get weather information for the specified zipcode
      $http({
        method: 'GET',
        url: currentWeatherUrl
      }).then((successResponse) => {
        $scope.localTemp = successResponse.data.main.temp - 273;
      }, (errorResponse) => {
        alert('Please enter a valid zipcode.');
      });
    }
    else {
      alert('Please enter a zipcode.');
    }
  };

  // Register a listener function for localTemp
  $scope.$watch('localTemp', (newVal, oldVal) => {
    if (newVal == undefined) {
      $scope.weatherInfo = messageNoInfo;
    }
    else {
      if (newVal <= 0) {
        $scope.weatherInfo = newVal + degreeSymbol + 'C is freezing!';
      }
      else if (newVal <= 10) {
        $scope.weatherInfo = newVal + degreeSymbol + 'C is pretty cold.';
      }
      else if (newVal <= 25) {
        $scope.weatherInfo = newVal + degreeSymbol + 'C is nice and warm.';
      }
      else {
        $scope.weatherInfo = newVal + degreeSymbol + 'C IS HOT!!';
      }
    }
  });
}

Quiz1Controller.$inject = ['$scope', '$http'];
