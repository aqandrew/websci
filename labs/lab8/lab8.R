library(dplyr)
library(igraph)

# Load the data
transcript <- read.csv(file="spongebob_transcript_season_2.csv", head=TRUE, sep=',')