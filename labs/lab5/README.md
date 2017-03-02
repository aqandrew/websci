# References
https://dev.twitter.com/oauth/application-only
http://stackoverflow.com/questions/6182315/how-to-do-base64-encoding-in-node-js
https://nodejs.org/api/http.html
https://nodejs.org/api/https.html
http://stackoverflow.com/questions/29511076/oauth-twitter-statuscode-403-ssl-is-required-c-sharp
http://stackoverflow.com/questions/37913936/twitter-api-returning-empty-body-with-node-js

# Observations
I didn't want to use jQuery, so I used NodeJS' HTTPS module.
It's difficult to find simple examples of using the Twitter Streaming API online.
NodeJS's request module proved to be easier to use than its Twitter module.

# Questions
How could I have returned a Promise in the callback of res.on('data')? This would've allowed getTweets to be placed in a then() call in the 'main' function (app.post()).
