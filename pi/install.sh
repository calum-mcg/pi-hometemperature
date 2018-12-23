#!/usr/bin/env bash

#Check for updates
printf "\nChecking for updates....."
sudo apt-get update
#Install essential python libraries
printf "\nInstalling essential Python libraries (Python 2 and 3)....."
sudo apt-get install build-essential python-dev python-openssl git
sudo apt-get install python3 python3-dev python3-setuptools
#Install rails
printf "\nInstalling requirements for rails....."
sudo apt-get install -y git curl zlib1g-dev subversion
sudo apt-get install -y openssl libreadline6-dev git-core zlib1g libssl-dev
sudo apt-get install -y libyaml-dev libsqlite3-dev sqlite3
sudo apt-get install -y libxml2-dev libxslt-dev
sudo apt-get install -y autoconf automake libtool bison
curl -L get.rvm.io | bash -s stable --rails
source ~/.rvm/scripts/rvm
#Cloning Adafruit Python Libraries
printf "\nCloning Adafruit Python Libraries....."
git clone https://github.com/adafruit/Adafruit_Python_DHT.git
cd Adafruit_Python_DHT
#Install Adafruit library for Python 2 & 3
printf "\nInstalling essential Python libraries....."
sudo python setup.py install
sudo python3 setup.py install
#Get DHT sensor type as variable
printf "\nWhat DHT Sensor? Please type 11/22, followed by [ENTER]:"
read sensorVersion
#Get GPIO number as variable
printf "\nWhat GPIO number is the sensor connected to? Followed by [ENTER]:"
read gpioNumber
#Test sensor
printf "\nTesting sensor....."
cd examples
sudo ./AdafruitDHT.py $sensorVersion $gpioNumber
#Create folder structure
printf "\nCreating folder structure and logging files....."
cd ~
sudo mkdir -p Temperature_Logging
cd Temperature_Logging
#Create files
sudo touch Temp.csv
sudo touch Humid.csv
#Set read/write permissions
sudo chmod -R 755 ./Temperature_Logging
#Get Python script from github
wget https://raw.githubusercontent.com/emperorcal/pi-hometemperature/master/pi/log.py
sudo sudo ./log.py $sensorVersion $gpioNumber