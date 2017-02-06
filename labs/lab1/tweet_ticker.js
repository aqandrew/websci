var tweetData = [];
var tweetInterval = 3000;
var hashtagInterval = tweetInterval * 1.5;
var numTweetsToShow = 5;
var tweetSource = 'TwitterTweets17.json';
var tweetNum = 0;
var totalTweets = 0;
var tweetIntervalId, hashtagIntervalId;
var hashtagSampleSize = 1000;
var numHashtagsToShow = 5;

$(document).ready(function() {
	getTweets();
	setTimeout(getHashtags, 100);
	hashtagIntervalId = window.setInterval(getHashtags, hashtagInterval);
});

function incrementTweetNum() {
	tweetNum = (tweetNum + 1) % totalTweets;
}

function tweetTemplate(someTweet, animationClass) {
	let author = someTweet.user;
	let before = `<div id="tweet-${tweetNum}" class="row tweet ${animationClass}">`;
	let after = '</div>';
	let authorElement = `<a href="https://twitter.com/${author.screen_name}" style="color: #${author.profile_link_color}; cursor: pointer">@${author.screen_name}</a>`;
	
	return `${before}
						<a href="https://twitter.com/${author.screen_name}">
							<div class="col-md-2 avatar-container" style="background: #${author.profile_background_color}">
								<img src="${author.profile_image_url}" class="center-block avatar">
							</div>
						</a>
						<div class="col-md-10 tweet-body">${authorElement}: ${someTweet.text}</div>
					${after}`;
}

function getTweets() {
	// Get initial tweets
	$.getJSON(tweetSource, function(data) {
		tweetData = data;
		totalTweets = data.length;
	}).then(function() {
		// Show intitial tweets
		for (var i = 0; i < numTweetsToShow; i++) {
			let tweet = tweetData[i];

			$('#tweets').prepend(
				tweetTemplate(tweet, '')
			);

			incrementTweetNum();
		}
		
		// Continuously get new tweets
		tweetIntervalId = window.setInterval(getNextTweet, tweetInterval);
	});
}

function getNextTweet() {
	let nextTweet = tweetData[tweetNum];
	let lastTweet = $('#tweets').children().last();

	// Fade in the next tweet
	$('#tweets').prepend(
		tweetTemplate(nextTweet, 'animated fade-in')
	);

	// Slide down the middle tweets
	let middleTweets = $('#tweets').children().not('h2').not(':first').not(':last');
	var nextTweetElement = $(`#tweet-${tweetNum}`);

	nextTweetElement.on('animationend', function() {
		middleTweets.removeClass('animated slide-down');
	});

	middleTweets.addClass('animated slide-down');

	// Fade out the last tweet
	lastTweet.addClass('animated fade-out');
	lastTweet.on('animationend', function() {
		$(this).remove();
	});

	incrementTweetNum();

	// 'Roll back' to first tweet eventually
	/*if (tweetNum >= totalTweets) {
		tweetNum = 0;
	}*/
}

function getHashtags() {
	// Sample an arbitrary number of tweets
	let sampleTweets = [];
	
	while (sampleTweets.length < hashtagSampleSize) {
		let randomIndex = Math.floor(Math.random() * tweetData.length);
		let randomTweet = tweetData[randomIndex];
		sampleTweets.push(randomTweet);
	}
	
	// Analyze their hashtags
	let hashtagCount = {};
	
	sampleTweets.forEach(function(sampleTweet) {
		if (typeof sampleTweet !== 'undefined' && sampleTweet.entities &&
			 sampleTweet.entities.hashtags) {
			
			sampleTweet.entities.hashtags.forEach(function(h) {
				let tag = h.text;
				
				if (typeof hashtagCount[tag] !== 'undefined') {
					hashtagCount[tag]++;
				}
				else {
					hashtagCount[tag] = 0;
				}
			});
		}
	});
	
	//console.log(hashtagCount);
	let topHashtags = [];
	let hashtagCountArray = [];
	
	for (let tag in hashtagCount) {
		hashtagCountArray.push(hashtagCount[tag]);
	}
	
	// Analyze only the top arbitrary number of hashtags
	while (topHashtags.length < numHashtagsToShow) {
		let topHashtagCount = Math.max.apply(Math, hashtagCountArray);
		hashtagCountArray.splice(hashtagCountArray.indexOf(topHashtagCount), 1);
		let topHashtag = Object.keys(hashtagCount).find(someTag => !topHashtags.includes(someTag) && hashtagCount[someTag] == topHashtagCount);
		topHashtags.push(topHashtag);
	}
	
	//console.log(topHashtags);
	// Create rows if they don't exist
	let hashtagRows = $('#hashtags tr');
	if (hashtagRows.length == 0) {
		topHashtags.forEach(function(topHashtag, index) {
			$('#hashtags').prepend(hashtagTableTemplate(topHashtag, hashtagCount[topHashtag], index));
		});
	}
	// Otherwise, update them
	else {
		hashtagRows.each(function(index, row) {
			let topTag = topHashtags[index];
			$(this).find('a').text('#' + topTag).attr('href', 'https://twitter.com/hashtag/' + topTag);
			$(this).find('td:last-child').text(hashtagCount[topTag]);
		});
	}

	$('#hashtag-sample-size').text(`Sampling ${hashtagSampleSize} tweets.`);
}

function hashtagTableTemplate(hashtag, count, index) {
	return `<tr id="top-tag-${index}">
						<td><a href="https://twitter.com/hashtag/${hashtag}" style="cursor: pointer">#${hashtag}</a></td>
						<td>${count}</td>
					</tr>`;
}