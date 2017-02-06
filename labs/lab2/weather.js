var degreeSymbol = '\xB0';
var apiKey = '43d590218aa74d6e974ced753c0419ec';
var currentLocation = {};
var weather = {};
var temperature;

$(document).ready(function() {	
	setLocation();
});

function setLocation() {
	// Get the current location
	$.getJSON('http://ip-api.com/json', function(data) {
		currentLocation.latitude = data.lat;
		currentLocation.longitude = data.lon;
		$('#latitude').val(currentLocation.latitude);
		$('#longitude').val(currentLocation.longitude);
	}).then(function() {
		// Get weather data from OpenWeatherMap
		let apiUrl = 'http://api.openweathermap.org/data/2.5/weather?&APPID=' + apiKey + '&lat=' + currentLocation.latitude + '&lon=' + currentLocation.longitude;
		$.getJSON(apiUrl, function(data) {
			console.log(JSON.stringify(data, null, 4));
			weather = data;
		}).then(function() {
			// Populate weather data in HTML
			deepWeather = weather.weather[0];
			temperature = decimal2(weather.main.temp);
			
			$('#weather-main').text(deepWeather.main);
			$('#weather-description').text(deepWeather.description);
			$('#weather-icon').attr('src', 'http://openweathermap.org/img/w/' + deepWeather.icon + '.png');
			$('#city').val(weather.name);
			
			$('#temperature').text(temperature + ' ' + degreeSymbol + 'F');
			$('#humidity').text(weather.main.humidity + '%');
			
			$('#wind').text(decimal2(msToMph(weather.wind.speed)) + ' mph @ ' + weather.wind.deg + ' ' + degreeSymbol);
			
			// Color the background according to the current temperature
			var hexRed = (256 - (136 - Math.round(temperature))) % 256;
			var hexBlue = (256 - (-126 - Math.round(temperature))) % 256;
			var tempColor = 'rgb(' + hexRed + ', 0, ' + hexBlue + ')';
			$('body').css('background', 'linear-gradient(white, ' + tempColor + ')');
		});
	});
}

function kToF(k) {
	return (k - 273) * (9 / 5) + 32;
}

function msToMph(s) {
	return s * (3.28084 / 5280) * 3600;
}

function decimal2(n) {
	return Math.round(n * 100) / 100;
}