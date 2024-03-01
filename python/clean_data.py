import pandas as pd

###
# When running for first time or reloading everything order should be:
# clean_draft_df()
# join_draft_player()
# total_dfs()
# source_target_value()
###


def total_dfs():
    years = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020']
    total_draft_df = pd.DataFrame(columns=['Round','Pick_No','Team','Player','Player_Link','Pos','College','Conf','ID','Conf_Clean','Div'])
    total_player_df = pd.DataFrame(columns=['Player','ID','MVP','SB_MVP','SB_WIN','OPOY','DPOY','OROY','DROY','First_AP','Second_AP','Pro_Bowl'])
    total_join_df = pd.DataFrame(columns=['Round','Pick_No','Team','Player','Player_Link','Pos','College','Conf','ID','Conf_Clean','Div','MVP','SB_MVP','SB_WIN','OPOY','DPOY','OROY','DROY','First_AP','Second_AP','Pro_Bowl'])
    
    for year in years:
        cur_draft_df = pd.read_csv("results/" + year + "/draftdf_" + year + "clean.csv")
        cur_player_df = pd.read_csv("results/" + year + "/playerdf_" + year + ".csv")
        cur_join_df = pd.read_csv("results/" + year + "/joindf_" + year + ".csv")

        total_draft_df = pd.concat([total_draft_df, cur_draft_df])
        total_player_df = pd.concat([total_player_df, cur_player_df])
        total_join_df = pd.concat([total_join_df, cur_join_df])
    
    total_draft_df.to_csv("results/total/draftdf_totalclean.csv", index= False)
    total_player_df.to_csv("results/total/playerdf_total.csv", index= False)
    total_join_df.to_csv("results/total/joindf_total.csv", index= False)


def clean_draft_df():
    years = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020']
    for year in years:
        cur_df = pd.read_csv("results/" + year + "/draftdf_" + year + ".csv")

        major_conf = ['SEC', 'ACC', 'Big Ten', 'Big 12', 'Pac12']

        team_changes = {'St Louis Rams' : 'Los Angeles Rams', 'Oakland Raiders' : 'Las Vegas Raiders', 'San Diego Chargers' : 'Los Angeles Chargers', 
            'Washington Redskins' : 'Washington Commanders', 'Washington Football Team' : 'Washington Commanders'}

        def getDiv(aTeam):
            if aTeam in ['New England Patriots', 'New York Jets', 'Miami Dolphins', 'Buffalo Bills']:
                return 'AFC East'
            elif aTeam in ['Baltimore Ravens', 'Cleveland Browns', 'Pittsburgh Steelers', 'Cincinnati Bengals']:
                return 'AFC North'
            elif aTeam in ['Houston Texans', 'Jacksonville Jaguars', 'Indianapolis Colts', 'Tennessee Titans']:
                return 'AFC South'
            elif aTeam in ['Kansas City Chiefs', 'Las Vegas Raiders', 'Denver Broncos', 'Los Angeles Chargers']:
                return 'AFC West'
            elif aTeam in ['Dallas Cowboys', 'Philadelphia Eagles', 'New York Giants', 'Washington Commanders']:
                return 'NFC East'
            elif aTeam in ['Detroit Lions', 'Chicago Bears', 'Green Bay Packers', 'Minnesota Vikings']:
                return 'NFC North'
            elif aTeam in ['Tampa Bay Buccaneers', 'New Orleans Saints', 'Atlanta Falcons', 'Carolina Panthers']:
                return 'NFC South'
            elif aTeam in ['San Francisco 49ers', 'Seattle Seahawks', 'Los Angeles Rams', 'Arizona Cardinals']:
                return 'NFC West'
            else:
                return 'None'

        cur_df['Conf_Clean'] = 'blank'
        cur_df['Team'] = cur_df['Team'].str.replace('  ', ' ')

        for index, row in cur_df.iterrows():

            if row['Conf'] not in major_conf:
                if((year in ['2010', '2011']) and row['Conf'] == 'Pac10'):
                    cur_df.at[index, 'Conf_Clean'] = 'Pac12'
                else:
                    cur_df.at[index, 'Conf_Clean'] = 'Other'
            else:
                cur_df.at[index, 'Conf_Clean'] = row['Conf']

        cur_df['Team'] = cur_df['Team'].replace(team_changes)
        cur_df['Div'] = cur_df['Team'].apply(getDiv)

        cur_df.to_csv("results/" + year + "/draftdf_" + year + "clean.csv", index= False)

def join_draft_player():
    years = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020']
    for year in years:
        draft_df = pd.read_csv("results/" + year + "/draftdf_" + year + "clean.csv")
        player_df = pd.read_csv("results/" + year + "/playerdf_" + year + ".csv")

        join_df = pd.merge(draft_df, player_df, how='inner', on=["ID", "Player"])
        join_df.to_csv("results/" + year + "/joindf_" + year + ".csv", index= False)

def source_target_value():
    years = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', 'total']
    for year in years:
        draft_df = pd.read_csv("results/" + year + "/draftdf_" + year + "clean.csv")
        first_link = draft_df.groupby(['Round', 'Conf_Clean'])['Player'].count().reset_index()
        first_link = first_link.rename(columns={'Round': 'source', 'Conf_Clean': 'target', 'Player': 'value'})
        second_link = draft_df.groupby(['Conf_Clean', 'Div'])['Player'].count().reset_index()
        second_link = second_link.rename(columns={'Conf_Clean': 'source', 'Div': 'target', 'Player': 'value'})

        total_link = pd.concat([first_link, second_link], axis = 0)
        total_link.to_csv("results/" + year + "/stv_" + year + ".csv", index=False)

def stack_conf():
    divs = ['AFC North', 'AFC East', 'AFC South', 'AFC West', 'NFC North', 'NFC East', 'NFC South', 'NFC West']
    years = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', 'total']
    for year in years:
        draft_df = pd.read_csv("results/" + year + "/draftdf_" + year + "clean.csv")
        conf_df = pd.get_dummies(draft_df[['Team', 'Conf_Clean', 'Div']], columns=['Conf_Clean'], dtype=int, prefix='', prefix_sep='')
        conf_df = conf_df.groupby(['Team', 'Div']).sum().reset_index()
        for div in divs:
            cur_df = conf_df[conf_df['Div'] == div][['Team', 'ACC', 'Big 12', 'Big Ten', 'SEC', 'Pac12', 'Other']]
            cur_df.to_csv("results/" + year + "/conf_stack/conf_stack_" + year + div.replace(' ', '') + ".csv", index=False)

def stack_round():
    divs = ['AFC North', 'AFC East', 'AFC South', 'AFC West', 'NFC North', 'NFC East', 'NFC South', 'NFC West']
    years = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', 'total']
    for year in years:
        draft_df = pd.read_csv("results/" + year + "/draftdf_" + year + "clean.csv")
        conf_df = pd.get_dummies(draft_df[['Team', 'Round', 'Div']], columns=['Round'], dtype=int, prefix='Round', prefix_sep=' ')
        conf_df = conf_df.groupby(['Team', 'Div']).sum().reset_index()
        for div in divs:
            cur_df = conf_df[conf_df['Div'] == div][['Team', 'Round 1', 'Round 2', 'Round 3', 'Round 4', 'Round 5', 'Round 6', 'Round 7']]
            cur_df.to_csv("results/" + year + "/round_stack/round_stack_" + year + div.replace(' ', '') + ".csv", index=False)

# stack_conf()
# stack_round()
