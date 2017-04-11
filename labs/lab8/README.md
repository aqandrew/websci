# Lab 8

1. What dataset did you use and why?

  I was happy to practice using Python's BeautifulSoup module for web-scraping,

  At first, this (on Spongebobpedia) came at the cost of having to account for
  HTML pages that aren't consistently formatted--e.g. dialogue transcript pages
  that lack an element matching the '#dialogue' CSS selector, transcripts in
  which all of the lines are wrapped in one large paragraph DOM element as
  opposed to each having their own, etc.

  Then I switched to Spongebob.wikia.com. Here, I ran into ASCII-Unicode
  decoding errors, which bamboozled me for a couple hours--especially since
  str.decode('ascii', 'ignore') still gave the error on the introductory aside
  to Sailor Mouth. Eventually, I bypassed the error by ignoring that single line.

  Parker said it would be an interesting and funny dataset to work with, and he
  was totally right!

2. What did you learn about the dataset from your exploration?

3. What challenges did you face (due to R, the dataset, or formating), and how did you overcome them?

## References

## Observations

## Questions
