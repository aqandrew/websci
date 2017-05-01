angular.module('quiz2', [])
  .controller('Quiz2Controller', Quiz2Controller);

function Quiz2Controller($scope, $http) {
  $scope.zip = '';

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

  let changeAlert = (text, alertClass) => {
    $('#alert-text').text(text);
    $('.alert').removeClass()
      .addClass(alertClasses)
      .addClass(alertClass);
  };

  $('form').submit(event => {
    event.preventDefault(); // Prevent page redirect on submit

    let postData = {
      zip: $scope.zip,
    };

    $.post('/addZip', postData, response => {
      console.log(response);
      changeAlert(response.message, 'alert-success');
      showAlert();
    });
  });
}

$(document).ready(() => {

});
