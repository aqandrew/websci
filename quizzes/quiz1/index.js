'use strict';

// Load dependencies
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require('path');
const fs = require('fs');

const port = 3000;

// Set root folder
app.use(express.static(__dirname));

server.listen(port, () => {
	console.log('quiz1 server listening on port ' + port);
});
