# References
http://stackoverflow.com/questions/9989382/add-1-to-current-date

# Questions

# Observations
~~~This lab only works with Firefox, due to the following errors in Chrome and Safari, respectively:~~~
	XMLHttpRequest cannot load https://api.darksky.net/forecast/1be6013062da72c0042892180c2f1f09/42.7495,-73.5951. Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://websci' is therefore not allowed access.
	
	[Error] Failed to load resource: Origin http://websci is not allowed by Access-Control-Allow-Origin. (42.7495,-73.5951, line 0)
	[Error] XMLHttpRequest cannot load https://api.darksky.net/forecast/1be6013062da72c0042892180c2f1f09/42.7495,-73.5951. Origin http://websci is not allowed by Access-Control-Allow-Origin.
	
CORS errors are the bane of my web developer existence.

Making the DarkSky API request with HTTP instead of HTTPS just returned an empty response, so I switched to the Open Weather API after two hours of trying.

In the lab directions, "scroll the forecast in a separate area of the page" was unclear at first.

Sometimes the forecast result from $.getJSON is undefined. Maybe this has something to do with the maximum number of Open Weather API calls I can make per second.