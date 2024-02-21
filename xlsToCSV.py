import pandas as pd

# Read multi-page XLS file
xls_file = pd.ExcelFile("./Data Sources/EPA Data- CO2 Only.xls")

# Initialize an empty list to store DataFrames for each page
dfs = []

# Iterate over each page and read into a DataFrame
for i, sheet_name in enumerate(xls_file.sheet_names):
    df = pd.read_excel(xls_file, sheet_name=sheet_name)
    # Add a new column to track the original page
    df['Page'] = i + 1
    dfs.append(df)

# Concatenate DataFrames into a single DataFrame
combined_df = pd.concat(dfs, ignore_index=True)

# Write combined DataFrame to CSV file
combined_df.to_csv('combined_data.csv', index=False)