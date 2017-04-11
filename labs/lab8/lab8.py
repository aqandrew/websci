# Purpose:  Use a webscraper to aggregate Spongebob Season 2 transcripts in CSV format.

from urllib import urlopen, urlretrieve, quote
from urlparse import urljoin
from bs4 import BeautifulSoup
import os
import csv

url = 'http://spongebob.wikia.com/wiki/List_of_transcripts/season_2'
baseurl = 'http://spongebob.wikia.com/'
csv_name = 'spongebob_transcript_season_2.csv'


def scrape_transcripts():
    transcript_array = []

    u = urlopen(url)
    try:
        html = u.read().decode('utf-8')
    finally:
        u.close()

    soup = BeautifulSoup(html, 'html.parser')

    # Iterate through Season 2's episode transcripts
    for row_num, episode in enumerate(soup.select('tr')):
        # print episode.prettify()
        # Skip the header row.
        if row_num == 0:
            continue

        title = episode.select('td:nth-of-type(2) a')[0]['title']
        transcript_url = baseurl + episode.select('td:nth-of-type(3) a')[0]['href']
        print title#, '\n\t', transcript_url
        transcript_u = urlopen(transcript_url)
        try:
            transcript_html = transcript_u.read().decode('utf-8')
        finally:
            transcript_u.close()

        episode_soup = BeautifulSoup(transcript_html, 'html.parser')

        # Iterate through each line in each transcript
        transcript = episode_soup.select('#mw-content-text ul li')

        for line in transcript:
            line_split = line.text.strip().split(':')
            speaker = line_split[0]
            text = ''.join(line_split[1:])
            transcript_array.append([title, speaker, text])

    return transcript_array


def write_transcripts(transcript_array):
    with open(csv_name, 'w') as csv_file:
        csv_writer = csv.writer(csv_file)
        header_row = ['episode', 'speaker', 'line']
        csv_writer.writerow(header_row)

        for line in transcript_array:
            try:
                csv_writer.writerow(line)
            except UnicodeEncodeError:
                continue # Sailor Mouth intro aside


def main():
    full_transcript = scrape_transcripts()
    write_transcripts(full_transcript)


if __name__ == '__main__':
    main()
