from nba_api.stats.endpoints import leaguedashteamstats
import pandas as pd


def save_nba_team_stats_to_csv(season='2022-23'):
    team_stats = leaguedashteamstats.LeagueDashTeamStats(season=season, per_mode_detailed='PerGame')

    df_team_stats = team_stats.get_data_frames()[0]
    
    columns = ['TEAM_ID', 'TEAM_NAME', 'GP', 'W', 'L', 'W_PCT', 'PTS', 'REB', 'AST']

    df_filtered = df_team_stats[columns]
    
    csv_file_name = f'nba_team_stats_{season.replace("-", "_")}.csv'
    df_filtered.to_csv(csv_file_name, index=False)
    print(f'Saved NBA team stats to {csv_file_name}')

save_nba_team_stats_to_csv()
