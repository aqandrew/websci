# Purpose:  Use a webscraper to aggregate Spongebob Season 2 transcripts in CSV format.

from urllib import urlopen, urlretrieve, quote
from urlparse import urljoin
from bs4 import BeautifulSoup
import os
import csv

url = 'http://en.spongepedia.org/index.php?title=Episode_Transcripts/Season_2'
baseurl = 'http://en.spongepedia.org'
csv_name = 'spongebob_transcript_season_2.csv'
# These transcript articles lack a DOM element corresponding to '#id'.
no_dialogue_id = ["Grandma's Kisses", 'Graveyard Shift', 'Squid on Strike']
big_paragraph = ['Graveyard Shift', 'Krusty Love']


def scrape_transcripts():
    transcript_array = []

    u = urlopen(url)
    try:
        html = u.read().decode('utf-8')
    finally:
        u.close()

    soup = BeautifulSoup(html, 'html.parser')

    # Iterate through Season 2's episode transcripts
    for episode in soup.select('#mw-content-text > table td a'):
        # print episode.prettify()
        title = episode.string
        transcript_url = baseurl + episode['href']
        transcript_u = urlopen(transcript_url)
        try:
            transcript_html = transcript_u.read().decode('utf-8')
        finally:
            transcript_u.close()

        episode_soup = BeautifulSoup(transcript_html, 'html.parser')

        # Iterate through each line in each transcript
        crucial_id = 'Dialogue' if title not in no_dialogue_id else 'Characters'
        dialogue = episode_soup.find(id=crucial_id).parent
        lines = [line.text.replace('\n', '') for line in dialogue.find_next_siblings('p')]

        for line in lines:
            line_split = line.split(':')
            speaker = line_split[0]
            text = ''.join(line_split[1:]).encode('ascii', 'ignore') # ignore foreign Unicode characters

            if title not in big_paragraph:
                print '\t', speaker, '\t', text

        # transcript_array.append([title, line.string])

    return transcript_array


def write_transcripts(transcript_array):
    with open(csv_name, 'w') as csv_file:
        csv_writer = csv.writer(csv_file)
        header_row = ['episode', 'speaker', 'line']
        csv_writer.writerow(header_row)

        for line in transcript_array:
            csv_writer.writerow(line)


def main():
    full_transcript = scrape_transcripts()
    write_transcripts(full_transcript)


if __name__ == '__main__':
    main()
