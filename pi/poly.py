import pandas as pd
import numpy as np
from sklearn.linear_model import Ridge
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import make_pipeline
from datetime import datetime
import time
start_time = time.time()

temperature_filename = "/home/pi/Temperature_Logging/Temp.csv"
humidity_filename = "/home/pi/Temperature_Logging/Humid.csv"

# Load CSVs into dataframes
temp_dataframe = pd.read_csv(temperature_filename, names=["Temp", "Time", "Date", "Poly6", "Poly7", "Poly8"])
humid_dataframe = pd.read_csv(humidity_filename, names=["Humid", "Time", "Date", "Poly6", "Poly7", "Poly8"])

# Store Temp dataframe columns as lists for calcs
temp_list = temp_dataframe['Temp'].tolist()
temp_time = temp_dataframe['Time'].tolist()
temp_date = temp_dataframe['Date'].tolist()

# Store Humid dataframe columns as lists for calcs
humid_list = humid_dataframe['Humid'].tolist()
humid_time = humid_dataframe['Time'].tolist()
humid_date = humid_dataframe['Date'].tolist()

# Change datetime into timedelta in seconds for Polynomial regression for Temp
first_datetime_temp = datetime.strptime(temp_date[0] + " " + temp_time[0], "%d/%m/%Y %H:%M:%S")
second_difference_temp = []
for i in range(len(temp_time)):
    current_datetime = datetime.strptime(temp_date[i] + " " + temp_time[i], "%d/%m/%Y %H:%M:%S")
    second_difference_temp.append((current_datetime-first_datetime_temp).total_seconds())
    #print("{} - {} = {}".format(current_datetime,first_datetime,second_difference))

# Change datetime into timedelta in seconds for Polynomial regression for Humidity
first_datetime_humid = datetime.strptime(humid_date[0] +" "+ humid_time[0], "%d/%m/%Y %H:%M:%S")
second_difference_humid = []
for i in range(len(temp_time)):
    current_datetime = datetime.strptime(temp_date[i] +" "+ temp_time[i], "%d/%m/%Y %H:%M:%S")
    second_difference_humid.append((current_datetime-first_datetime_humid).total_seconds())
    #print("{} - {} = {}".format(current_datetime,first_datetime,second_difference))

# Change time difference and temperature into Numpy array for Scikit
x = np.array(second_difference_temp)
y = np.array(temp_list)
    
# Create matrix version of temperature
X = x[:, np.newaxis]

# Produce three models with differing polynomial degrees and then predict with time values, adding to temp dataframe
for i, degree in enumerate([6, 7, 8]):
    model = make_pipeline(PolynomialFeatures(degree), Ridge())
    model.fit(X, y)
    temp_dataframe["Poly"+str(degree)] = model.predict(X)
    
# Change time difference and humidity into Numpy array for Scikit
x = np.array(second_difference_humid)
y = np.array(humid_list)
    
# Create matrix version of humidity
X = x[:, np.newaxis]

# Produce three models with differing polynomial degrees and then predict with time values, adding to humid dataframe
for i, degree in enumerate([6, 7, 8]):
    model = make_pipeline(PolynomialFeatures(degree), Ridge())
    model.fit(X, y)
    humid_dataframe["Poly"+str(degree)] = model.predict(X)

print(temp_dataframe)

# Store updated dataframes in CSV files
temp_dataframe.to_csv(temperature_filename, header=False, index=False)
humid_dataframe.to_csv(humidity_filename, header=False, index=False)

print("--- %s seconds ---" % (time.time() - start_time))
