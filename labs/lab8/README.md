# Lab 8

1. What dataset did you use and why?

  I was happy to practice using Python's BeautifulSoup module for web-scraping.

  At first, this (on Spongebobpedia) came at the cost of having to account for
  HTML pages that aren't consistently formatted--e.g. dialogue transcript pages
  that lack an element matching the '#dialogue' CSS selector, transcripts in
  which all of the lines are wrapped in one large paragraph DOM element as
  opposed to each having their own, etc.

  Then I switched to Spongebob.wikia.com. Here, I ran into ASCII-Unicode
  decoding errors, which bamboozled me for a couple hours--especially since
  str.decode('ascii', 'ignore') still gave the error on the Unicode character
  for an 8th note, within the introductory aside to Sailor Mouth. Eventually,
  I bypassed the error by ignoring that single line.

  Parker said it would be an interesting and funny dataset to work with, and he
  was totally right!

2. What did you learn about the dataset from your exploration?



3. What challenges did you face (due to R, the dataset, or formating), and how did you overcome them?

  This was the first time I had seen R, so I had to learn both data manipulation
  and plotting from scratch.

  See answer 1.

  To make the transcript data easier to work with, I learned a little bit about
  regular expressions, so that I could remove asides and punctuation (except)
  apostrophes.

## References

https://docs.python.org/2/library/csv.html
https://www.crummy.com/software/BeautifulSoup/bs4/doc/
http://stackoverflow.com/questions/9351522/python-how-to-remove-text-within-round-brackets
http://stackoverflow.com/questions/1276764/stripping-everything-but-alphanumeric-chars-from-a-string-in-python
http://stackoverflow.com/questions/12985456/replace-all-non-alphanumeric-characters-in-a-string
http://www.cyclismo.org/tutorial/R/input.html#reading-a-csv-file

## Observations

## Questions
