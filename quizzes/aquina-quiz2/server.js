'use strict';

// Load dependencies
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const request = require('request');
const http = require('http');
const mongoose = require('mongoose');
const dbName = 'quiz2';
const db = mongoose.connect('mongodb://localhost/' + dbName);

const degreeSymbol = '\xB0';
const apiKey = '43d590218aa74d6e974ced753c0419ec';
const port = 8000;

// Store minimum required fields for Weather
var weatherSchema = new mongoose.Schema({
  zipcode: 'number',
  locationName: 'string',
  temperature: 'number'
});
var Weather = mongoose.model('Weather', weatherSchema);

// Set root folder
app.use(express.static(__dirname));

// Parse JSON-encoded HTTP requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

app.post('/addZip', (req, res) => {
  let zip = req.body.zip;
  let temp, locName;
  console.log('got zip:', zip);
  console.log('Weather:', Weather);

  let currentWeatherUrl = 'http://api.openweathermap.org/data/2.5/weather?&APPID=' + apiKey + '&zip=' + zip;
  http.get(currentWeatherUrl, data => {
    // console.log('http.get data:', data);
    // temp = data.main.temp;
    // locName = data.name;

    let newWeather = new Weather({
      zipcode: zip//,
      // locationName: 'string',
      // temperature: 'number'
    });

    // let query = Weather.insert({
    //   'zipcode': zip,
    //   // 'temperature': temp,
    //   // 'locationName': locName
    // });

    newWeather.save((err, docs) => {
      res.json({
        'message': 'Added ZIP code ' + zip
      });
    });
  });
});

app.get('/getWeathers', (req, res) => {
  let query = Weather.find();
  query.exec((err, docs) => {
    res.json({
      'docs': docs,
      'message': 'Success! Got weather.'
    });
  });
});

server.listen(port, () => {
  Weather.remove().exec(); // Start with no weather info
	console.log('quiz2 server listening on port ' + port);
});
