# pi-hometemperature
## Summary
An automated temperature and humidity monitoring system using a Raspberry Pi Zero with a Rails dashboard. 

<p align="center">
  <img src="https://i.imgur.com/8OFh54F.jpg" width="300">
  <img src="https://i.imgur.com/SD4YvZG.png" width="500">
</p>

The system uses Python to log temperature and humidity to CSV files on the Pi. Another Python script asynchronously performs polynomial regression on both temperature and humidity on a range of orders and updates the CSV files. A rails application then uses the data within the CSV files to generate a graphical dashboard.

Click [here](https://codepen.io/cjmcguicken/full/OYqGyb) see a demo version of the dashboard, with only a sample slice of data.

## Installation

## Theory

## Areas for improvement


