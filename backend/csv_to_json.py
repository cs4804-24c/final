import pandas as pd


df = pd.read_csv('all_seasons_stats.csv')

df.to_json('all_seasons_stats.json', orient='records', lines=True)
