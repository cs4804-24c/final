import pandas as pd
import fns
import matplotlib.pyplot as plt
import numpy as np

def errors (fileString, colNames, dif, errorOutputFile):
    df = pd.read_csv(fileString)
    # drop the first column for times and rename the columns to match the colours
    df = df.iloc[1:, 1:]
    df.columns = colNames
    errors = {
        'o1Error': fns.calculateError(df[colNames[0]], dif),
        'o2Error': fns.calculateError(df[colNames[1]], dif),
        'o3Error': fns.calculateError(df[colNames[2]], dif),
        'o4Error': fns.calculateError(df[colNames[3]], dif),
        'o5Error': fns.calculateError(df[colNames[4]], dif),
        'o6Error': fns.calculateError(df[colNames[5]], dif),
        'o7Error': fns.calculateError(df[colNames[6]], dif),
        'o8Error': fns.calculateError(df[colNames[6]], dif),
        'o9Error': fns.calculateError(df[colNames[8]], dif),
        'o10Error': fns.calculateError(df[colNames[9]], dif),

        'b1Error': fns.calculateError(df[colNames[10]], dif),
        'b2Error': fns.calculateError(df[colNames[11]], dif),
        'b3Error': fns.calculateError(df[colNames[12]], dif),
        'b4Error': fns.calculateError(df[colNames[13]], dif),
        'b5Error': fns.calculateError(df[colNames[14]], dif),
        'b6Error': fns.calculateError(df[colNames[15]], dif),
        'b7Error': fns.calculateError(df[colNames[16]], dif),
        'b8Error': fns.calculateError(df[colNames[17]], dif),
        'b9Error': fns.calculateError(df[colNames[18]], dif),
        'b10Error': fns.calculateError(df[colNames[19]], dif),
    }
    dfErrors = pd.DataFrame(errors)
    #write the errors out to a csv file
    dfErrors.to_csv(errorOutputFile, index_label=False)
    return dfErrors

def viz (x, y, title, outputFile):
    # Perform linear regression to get the line of best fit
    coefficients = np.polyfit(x, y, 1)  # Perform linear regression (1st degree polynomial)
    polynomial = np.poly1d(coefficients)  # Create a polynomial function from the coefficients
    line_of_best_fit = polynomial(x)  # Calculate the values of the line of best fit

    # Create the scatter plot
    plt.scatter(x, y, label='Data')  # Scatter plot
    plt.plot(x, line_of_best_fit, color='red', label='Line of Best Fit')  # Line of best fit
    plt.xlabel('Standard Deviation of Each Dataset')  # Set the label for the x-axis
    plt.ylabel('Error Averages')  # Set the label for the y-axis
    plt.title(title)  # Set the title of the plot
    plt.grid(True)  # Show grid
    plt.savefig(outputFile)
    #plt.show()  # Display the plot

def createBarChart(chartTitle, oData, bData, outputName):
    # X-axis indices for the data points
    x_indices = np.arange(len(oData))

    # Width of each bar
    bar_width = 0.35

    # Create the bar graph
    plt.bar(x_indices, oData, bar_width, color='blue', label='Blue Graph Error Average')
    plt.bar(x_indices + bar_width, bData, bar_width, color='orange', label='Orange Graph Error Average')

    # Adding labels and title
    plt.xlabel('Data Array Index')
    plt.ylabel('Errors for Each Data Array')
    plt.title(chartTitle)

    # Adding legend
    plt.legend()

    # Adding x-axis ticks
    plt.xticks(x_indices + bar_width / 2, ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])

    # Show the plot
    plt.savefig(outputName)