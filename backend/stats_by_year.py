from nba_api.stats.endpoints import leaguedashteamstats
import pandas as pd

# Get team statistics
team_stats = leaguedashteamstats.LeagueDashTeamStats(season='2022-23')

# Convert to DataFrame
df = team_stats.get_data_frames()[0]

# Save to CSV
df.to_csv('2022_team_stats.csv', index=False)
