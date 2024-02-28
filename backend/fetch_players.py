from nba_api.stats.static import players
import pandas as pd
active_players = players.get_active_players()

active_players_df = pd.DataFrame(active_players)

csv_file_path = 'active_nba_players.csv'

active_players_df.to_csv(csv_file_path, index=False)

print(f"Active NBA players data saved to {csv_file_path}")
