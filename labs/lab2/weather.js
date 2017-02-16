var degreeSymbol = '\xB0';
var apiKey = '43d590218aa74d6e974ced753c0419ec';
var currentLocation = {};
var weather = {};
var temperature;
var forecastCount = 10;
var monthNames = [
	'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
var today = new Date();

$(document).ready(function() {
	$('#todays-date').text(simpleDate(today));
	initWeatherApp();
});

function initWeatherApp() {
	// Set the current location
	$.getJSON('http://ip-api.com/json',
		setLocation
	).then(function() {
		// Get weather data from OpenWeatherMap for current weather
		let currentWeatherUrl = 'http://api.openweathermap.org/data/2.5/weather?&APPID=' + apiKey + '&lat=' + currentLocation.latitude + '&lon=' + currentLocation.longitude;
		$.getJSON(currentWeatherUrl, function(data) {
			//console.log(JSON.stringify(data, null, 4));
			weather = data;
		}).then(function() {
			// Populate weather data in HTML
			deepWeather = weather.weather[0];
			temperature = weather.main.temp;
			
			$('#weather-main').text(deepWeather.main);
			$('#weather-description').text(deepWeather.description);
			$('#weather-icon').attr('src', openWeatherIconUrl(deepWeather.icon));
			$('#city').val(weather.name);
			
			$('#temperature').text(tempString(temperature));
			$('#humidity').text(weather.main.humidity + '%');
			
			$('#wind').text(decimal2(msToMph(weather.wind.speed)) + ' mph @ ' + weather.wind.deg + ' ' + degreeSymbol);
		}).then(
			setBgColor
		).then(function() {
			let forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily?APPID=' + apiKey + '&lat=' + currentLocation.latitude + '&lon=' + currentLocation.longitude + '&cnt=' + forecastCount;
			$.getJSON(forecastUrl, function(data) {
				$('#forecast').empty();
				let forecast = data.list;
				//console.log(forecast);
				forecast.forEach(function(forecastWeather, forecastIndex) {
					$('#forecast').append(forecastCardTemplate(forecastWeather, forecastIndex));
				});
			});
		});
	});
}

function setLocation(data) {
	currentLocation.latitude = data.lat;
	currentLocation.longitude = data.lon;
	$('#latitude').val(currentLocation.latitude);
	$('#longitude').val(currentLocation.longitude);
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

function tempString(k) {
	return decimal2(kToF(k)) + ' ' + degreeSymbol + 'F';
}

function setBgColor() {
	// Color the background according to the current temperature
	var hexRed = (256 - (136 - Math.round(temperature))) % 256;
	var hexBlue = (256 - (-126 - Math.round(temperature))) % 256;
	var tempColor = 'rgb(' + hexRed + ', 0, ' + hexBlue + ')';
	$('body').css('background', 'linear-gradient(white, ' + tempColor + ')');
}

function openWeatherIconUrl(iconCode) {
	return 'http://openweathermap.org/img/w/' + iconCode + '.png';
}

function forecastCardTemplate(data, index) {
	//console.log(data);
	let forecastDeepWeather = data.weather[0];
	//console.log(forecastDeepWeather);
	let newDate = new Date(today.getTime());
	newDate.setDate(newDate.getDate() + 1 + index);
	return `<div class="forecast-card" class="col-md-2">
			<h4>${simpleDate(newDate)}</h4>
			<img src='${openWeatherIconUrl(forecastDeepWeather.icon)}'>
			<span>${tempString(data.temp.min)} - ${tempString(data.temp.max)}</span><br/>
			<span>${forecastDeepWeather.main}</span>
			<span>${forecastDeepWeather.description}</span>
		</div>`;
}

function simpleDate(d) {
	return monthNames[d.getMonth()] + ' ' + d.getDate();
}