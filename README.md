Final Project - Interactive Data Visualization  
===
## Links
Website - https://bradya25.github.io/final/
Youtube Video - https://www.youtube.com/watch?v=5SPrY1ti-Js&t=1s&ab_channel=AaronBrady 

## File Breakdown
"_images" folder contains the first sankey diagram we made in this project

"_python" folder contains all of the data scraping, cleaning, and data sets.

"_results" folder within the python folder contains all the csvs used in the project. They are outputed by scraper.py and clean_data.py. The csvs are stored in their years folder. Each year folder contains the raw draft df (draftdf_XXXX.csv), raw player data (playerdf_XXXX.csv), a join of these (joindf_XXXX.csv), a cleaned csv (draftdf_XXXXcleaned.csv), source target value (stv_XXXX.csv), the round and conference stack folders contain csvs for each nfl data about the number of picks by each team in a round, and number of draft picks from a conference that year.

"scraper.py" uses BS4 to scrape the data. For each year it scrapes wiki nfl draft page to save the entire table as a csv. Then for each player it goes to the player link and collects player accomplishments. We did not end up using the player accomplishments in this visual.

"clean_data.py" cleans the data and creates the csvs used for the visuals. We cleaned multiple fields. For college conference if it was a major conference it would stay the same, else it would be 'Other' in the conf_clean column. For teams that had moved they had a team name change so had to ensure that those teams were saved as the same name. We also created a nfl division column based on the team name. Once this was done we would save the csv as draftdf_XXXX.csv. Then we would join this csv with the player data so we would have a df with player draft and stats. Then we appended all of the years together for the clean, player, and joined df. Using the cleaned dfs we created the source target values that would be the data source for the sankey. We did this by using pandas group by function and grouping by the source and target. The last two functions get aggregate measures for each team in a division and writes to a csv. The stack_conf is used for the stacked bar chart.

"ExploratoryNotebook.ipynb" uses pandas and seaborn to do simple EDA. It also has some of the preliminary data cleaning we did before creating the python data cleaning file.

"styles" contains a styles css for the website.

"index.html" is the homepage of the website. Links to the other parts of the project and contains brief project description.

"Presentation.html" has my 2 minute youtube embedded in it.

"ProcessBook.html" has by process book pdf embedded in it.

"ProcessBook.pdf" is my process book.

"sankey.js" is from the source at the bottom of the read me. Did not make any changes.

"test2.html" contains both of the visuals. Had source code from reference below. Changed colors and data source. Also added the stacked bar chart and interactive filters.

### Non-Obvious features
You can drag the nodes vertically and place them where you want.
Year filter applies to the stacked bar chart.


## References
---
Wiki pages scraped
- https://en.wikipedia.org/wiki/2010_NFL_draft
- https://en.wikipedia.org/wiki/2011_NFL_draft
- https://en.wikipedia.org/wiki/2012_NFL_draft
- https://en.wikipedia.org/wiki/2013_NFL_draft
- https://en.wikipedia.org/wiki/2014_NFL_draft
- https://en.wikipedia.org/wiki/2015_NFL_draft
- https://en.wikipedia.org/wiki/2016_NFL_draft
- https://en.wikipedia.org/wiki/2017_NFL_draft
- https://en.wikipedia.org/wiki/2018_NFL_draft
- https://en.wikipedia.org/wiki/2019_NFL_draft
- https://en.wikipedia.org/wiki/2020_NFL_draft

D3 Sankey Starter Code
- https://gist.github.com/d3noob/06e72deea99e7b4859841f305f63ba85 

