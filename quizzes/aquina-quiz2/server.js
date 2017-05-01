'use strict';

// Load dependencies
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const request = require('request');
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
}

server.listen(port, () => {
  Weather.remove().exec(); // Start with no weather info
	console.log('quiz2 server listening on port ' + port);
});
