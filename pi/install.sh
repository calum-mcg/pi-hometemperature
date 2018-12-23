#!/usr/bin/env bash

#Check for updates
echo "\nChecking for updates....."
sudo apt-get update
#Install essential python libraries
echo "\nInstalling essential Python libraries (Python 2 and 3)....."
sudo apt-get install build-essential python-dev python-openssl git
sudo apt-get install python3 python3-dev python3-setuptools
#Cloning Adafruit Python Libraries
echo "\nCloning Adafruit Python Libraries....."
git clone https://github.com/adafruit/Adafruit_Python_DHT.git
cd Adafruit_Python_DHT
#Install Adafruit library for Python 2 & 3
echo "\nInstalling essential Python libraries....."
sudo python setup.py install
sudo python3 setup.py install
#Get DHT sensor type as variable
echo "\nWhat DHT Sensor? Please type 11/22, followed by [ENTER]:"
read sensorVersion
#Get GPIO number as variable
echo "\nWhat GPIO number is the sensor connected to? Followed by [ENTER]:"
read gpioNumber
#Test sensor
echo "\nTesting sensor....."
cd examples
sudo ./AdafruitDHT.py $sensorVersion $gpioNumber