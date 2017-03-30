'use strict';

// Load dependencies
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const https = require('https');
const request = require('request');
const csvjson = require('csvjson');

const port = 3000;
const consumerKey = 'y4Ops0GFlV7nr2667A01Y5ljH';
const consumerSecret = 'wuXIqfwEAlgtZO28vK9KGDGfWqXackE2y3uMTuBLzP8fcui0aM';
const outputFilename = 'aquina-tweets';
const coordinateSw = {
  latitude: -73.68,
  longitude: 42.72
};
const coordinateNe = {
  latitude: -73.67,
  longitude: 42.73
};
var tweets = [];

// Set root folder
app.use(express.static(__dirname));

// Parse JSON-encoded HTTP requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

app.post('/getTweets', (req, res) => {
  // console.log('getTweets request: ' + JSON.stringify(req.body));

  let query = req.body.query;
  let tweetNum = req.body.tweetNum;

  authorizeApp(query, tweetNum).then(fulfilledVal => {
    // console.log(fulfilledVal);
    res.json({
      message: loadMessage(tweetNum, query),
      tweets: tweets
    });
  }, rejectedVal => {
    console.log(rejectedVal);
  });
});

app.post('/exportTweets', (req, res) => {
  console.log('exportTweets request: ' + JSON.stringify(req.body));
  let format = Object.getOwnPropertyNames(req.body)[0];
  let csvOptions = {
    delimiter: ',',
    wrap: false
  };
  let writeData = format == 'JSON' ? JSON.stringify(tweets, null, 2) : csvjson.toCSV(tweets, csvOptions);
  let newOutputFilename = outputFilename + '.' + format.toLowerCase();

  let fileExists = fs.existsSync(newOutputFilename);

  fs.writeFile(newOutputFilename, writeData, (err) => {
    if (err) {
      throw err;
    }
  });

  let wroteMessage = !fileExists ? 'Wrote ' + tweets.length + ' tweet(s) to ' + newOutputFilename + '.' :
    'Overwrote ' + newOutputFilename + ' with ' + tweets.length + ' tweet(s).';

  res.send(wroteMessage);
});

function loadMessage(tweetNum, query) {
  if (!query) {
    return 'Found ' + tweetNum + ' tweets(s) from RPI.';
  }

  return 'Found ' + tweetNum + ' tweet(s) related to "' + query + '".'
}

function authorizeApp(query, tweetNum) {
  // Get application OAuth bearer token
  let bearerTokenCredentials = consumerKey + ':' + consumerSecret;
  let encodedCredentials = new Buffer(bearerTokenCredentials).toString('base64');

  let authRquestOptions = {
    hostname: 'api.twitter.com',
    path: '/oauth2/token',
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + encodedCredentials,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  };

  let authRequest = https.request(authRquestOptions, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');

    res.on('data', (chunk) => {
      // console.log(`BODY: ${chunk}`);
      let accessToken = JSON.parse(chunk).access_token;
      console.log('Received access token: ' + accessToken);
      getTweets(accessToken, query, tweetNum);
    });

    res.on('end', () => {
      console.log('No more data in response.');
    });
  });

  // write data to request body
  let body = 'grant_type=client_credentials';
  authRequest.write(body);
  authRequest.end();

  return new Promise((resolve, reject) => {
    if (tweets.length != 0) {
      resolve(tweets)
    }
    else {
      reject(new Error('tweets array is empty!'));
    }
  });
}

function getTweets(accessToken, query, tweetNum) {
  let tweetSearchOptions = {
    count: tweetNum
  };

  if (query) {
    tweetSearchOptions.q = query;
  }
  else {
    let latitude = (coordinateSw.latitude + coordinateNe.latitude) / 2;
    let longitude = (coordinateSw.longitude + coordinateNe.longitude) / 2;

    // Each degree of latitude is approximately 68.703 miles apart.
    let radius = Math.abs(coordinateSw.latitude - coordinateNe.latitude) * 68.703 / 2;

    tweetSearchOptions.geocode = latitude + ' ' + longitude + ' ' + radius + 'mi'
  }

  request.get({
    headers: { 'Authorization': 'Bearer ' + accessToken },
    url: 'https://api.twitter.com/1.1/search/tweets.json',
    json: true,
    qs: tweetSearchOptions
  }, (e, r, b) => {
    tweets = b.statuses;
  });
}

server.listen(port, () => {
	console.log('lab5 server listening on port ' + port);
});
