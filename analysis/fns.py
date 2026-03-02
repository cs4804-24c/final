import pandas as pd
import ast
import numpy as np
import math

def compute_difference(arr):
    arr = ast.literal_eval(arr)
    if len(arr) >= 2:
        return abs(arr[0] - arr[1])
    else:
        return None

def findPercentDifference(a, b):
    #https://www.calculatorsoup.com/calculators/algebra/percent-difference-calculator.php
    absolute_difference = abs(a - b)
    average_value = (a + b) / 2
    percent_diff = (absolute_difference / average_value) * 100
    return percent_diff


def calculateError(judged, true):
    #same error calculation formula as provided in the paper for consistency comparrsion
    errors = []
    for j, t in zip(judged, true):
        score = math.log2(abs(j - t) + 1 / 8)
        errors.append(score)
    return errors


#standard deviation of each of the data arrays
def std (arrayFile):
    stdList = []
    df1 = pd.read_csv(arrayFile)
    arrs = df1.iloc[:, 1]
    for i in arrs:
        intArr = ast.literal_eval(i)
        stdIntArr = np.std(intArr)
        stdList.append(stdIntArr)
    return stdList