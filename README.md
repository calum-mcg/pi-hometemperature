# pi-hometemperature
## Summary
An automated temperature and humidity monitoring system using a Raspberry Pi Zero with a Rails dashboard, asynchronously performing polynomial regression.

<p align="center">
  <img src="https://i.imgur.com/8OFh54F.jpg" width="300">
  <img src="https://i.imgur.com/SD4YvZG.png" width="500">
</p>

The system uses Python to log temperature and humidity to CSV files on the Pi. Another Python script asynchronously performs polynomial regression on both the temperature and humidity datasets and updates the CSV files. A rails application then uses the data within the CSV files to generate an interactive, graphical dashboard.

Click [here](https://codepen.io/cjmcguicken/full/OYqGyb) see a demo version of the dashboard, with only a sample slice of data.

## Installation
The following guide assumes that Raspbian is already installed and the sensor has been connected to the Pi. Both DHT22 and DHT11 sensors are supported.

For more information on setting up a DHT sensor with the Pi I would recommend [this](https://learn.adafruit.com/dht-humidity-sensing-on-raspberry-pi-with-gdocs-logging/wiring) link.

Please note the sensor model and the GPIO port number it is connected to, this is needed for the setup script.

The setup bash script comprehensively installs the project. To run the script, navigate to the home folder and run the following:

```
wget https://raw.githubusercontent.com/calum-mcg/pi-hometemperature/master/pi/install.sh
sudo bash install.sh
```

*Please note: There is a known potential issue when installing Ruby with Raspbian, if an error occurs please ensure keys are set with the 'gpkg' command. More details will be produced in the console if the error occurs.*

Once installed you are good to go! The Pi will regularly record temperature and humidity as well as perform polynomial regression on the datasets. Just run the rails server from the _'..home\dashboard\'_ folder to start the dashboard and view the outputs.

## Theory
Within this project, regression techniques were used to try and determine the relationship between temperature and time, as well as humidity and time. Regression, put simply, is the process of understanding the relationship between variables.
Given the example of X and Y below:
<p align="center">
  <img height="300" src="https://i.imgur.com/XuYtQwo.png">
</p>

In order to try and determine the relationship between X and Y, we create a hypothesis function. The generic hypothesis function for linear regression is:
<p align="center">
  <img height="40" src="https://i.imgur.com/n92QlZ2.png">
</p>

And for polynomial regression (order 2):
<p align="center">
  <img height="35" src="https://i.imgur.com/iXs35qn.png">
</p>

To ensure that the hypothesis function is most representative of the actual dataset, a cost function can be used. A cost function measures the accuracy of the hypothesis function by essentially taking an average of the difference between the hypothesis function and actual dataset. 
A common cost function, known as the ‘mean squared error’ is represented by the following equation:
<p align="center">
  <img height="60" src="https://i.imgur.com/GNh3P0k.png">
</p>

*Where m is the number of data points*

For the linear hypothesis function, this can be shown visually using the X, Y example above: 
<p align="center">
  <img height="300" src="https://i.imgur.com/2XuUoL1.png">
</p>

 
And similarly for the polynomial (order 2) hypothesis function:
<p align="center">
  <img height="300" src="https://i.imgur.com/jTmQJ6P.png">
</p>

 
Therefore, the most accurate hypothesis function is where the coefficients (θ) produce the minimum value from the cost function.

In this project, polynomial regression was performed using [Scikit-learn](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.PolynomialFeatures.html), a machine learning library for Python. In order to perform regression with time, the time date variable was converted into seconds from start.


## Areas for improvement
* Create an additional Python script to compare the outputs of the Polynomial regression analysis and display the most accurate
* Improve functionality to allow for multiple devices / rooms
* Show forecasted temperature and humidity

