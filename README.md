# pi-hometemperature
## Summary
An automated temperature and humidity monitoring system using a Raspberry Pi Zero with a Rails dashboard. 

<p align="center">
  <img src="https://i.imgur.com/8OFh54F.jpg" width="300">
  <img src="https://i.imgur.com/SD4YvZG.png" width="500">
</p>

The system uses Python to log temperature and humidity to CSV files on the Pi. Another Python script asynchronously performs polynomial regression on both temperature and humidity and updates the CSV files. A rails application then uses the data within the CSV files to generate a graphical dashboard.

Click [here](https://codepen.io/cjmcguicken/full/OYqGyb) see a demo version of the dashboard, with only a sample slice of data.

## Installation
The following guide assumes that Raspbian is already installed and the sensor has been connected to the Pi. Both DHT22 and DHT11 sensors are supported.

For more information on setting up a DHT sensor with the Pi I would recommend [this]( https://learn.adafruit.com/dht-humidity-sensing-on-raspberry-pi-with-gdocs-logging/wiring) link.

Please note the sensor model and the GPIO port number it is connected to, this is needed for the setup script.

The setup bash script comprehensively installs the project. To run the script, navigate to the home folder and run the following:

```
wget https://raw.githubusercontent.com/calum-mcg/pi-hometemperature/master/pi/install.sh
sudo bash install.sh
```

*Please note: There is a known potential issue when installing Ruby with Raspbian, if an error occurs please ensure keys are set with the 'gpkg' command. More details will be produced in the console if the error occurs.*

Once installed you are good to go! The Pi will regularly record temperature and humidity as well as perform polynomial regression on the datasets. Just run the rails server from the *..home\dashboard\* folder to start the dashboard and view the outputs.

## Theory

## Areas for improvement


