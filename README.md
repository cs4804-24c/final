NBA Stats Ft. MVP Derrick Richard White
===

Bootstrapped with Create React App. All other project components were developed by us. Two static datasets were created for this project:

1. `players.json` - Quick access to a mapping between playerID and a player's full name.

2. `all_players_career_stats.csv` - Utilized for the Parallel Coordinate plot to avoid getting rate limited when using the playercareerstats NBA API endpoint.

All remaining data used in this project was gathered via calls to various NBA API endpoints.

Additionally, while the included screencast linked below demonstrates the key features of each page in our website, additional non-obvious features are also mentioneed here.

Player Page
===

In order to access a player's page, their name must be selected from the dropdown menu at the top of the Homepage. Additionally, users can click on the plotted shot attempts on the Shot Chart to view a clip of the shot itself.

Timeline Page
===

From the Homepage, users can click on any of the recently listed games to access their respective Timeline page. However, games first have to have been fully concluded, unless an error message will pop up.

Parallel Coordinate Page
===

Users have the ability to select two points on any of the plotted axes to filter out any NBA players that fall outside the modified range. This filter persists through multiple axis selections, and middle clicking anywhere will reset the plot.

Project Website
===

http://geospatialmqptesting.dyn.wpi.edu:3006/

Screencast
===

https://youtu.be/CBffDvCBY2U