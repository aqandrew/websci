# Questions
Why did the directions document say nothing about the "hashtags" element?
Why do more than 5 div.tweet s persist after a certain number of times?

# Observations
The corpus of tweets is 10000 in length, but the single $.getJSON call I make only fetches 100. In a previous iteration of the getTweets function I wrote, I was able to get all 10000 tweets, but at the cost of querying the source file every tweetInterval.