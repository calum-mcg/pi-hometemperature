#!/usr/bin/env bash
#Check for updates
printf "\nChecking for updates....."
sudo apt-get update
#Install essential python libraries
printf "\nInstalling essential Python libraries (Python 2 and 3)....."
sudo apt-get install build-essential python-dev python-openssl git
sudo apt-get install python3 python3-dev python3-setuptools
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
cd /home/pi/
sudo mkdir -p Temperature_Logging
cd Temperature_Logging
#Create files
sudo touch Temp.csv
sudo touch Humid.csv
#Set read/write permissions
sudo chmod -R 755 ../Temperature_Logging
#Get Python script from github
wget https://raw.githubusercontent.com/emperorcal/pi-hometemperature/master/pi/log.py
sudo python3 /home/pi/Temperature_Logging/log.py $sensorVersion $gpioNumber
#Create cronjobs
printf "\nCreating cronjob....."
sudo crontab -l > mycron
#echo new cron into cron file
sudo echo "* * * * * sudo python3 /home/pi/Temperature_Logging/log.py $sensorVersion $gpioNumber" >> mycron
#install new cron file
sudo crontab mycron
sudo rm mycron
#Install rails
printf "\nInstalling requirements for rails....."
cd /home/pi/
sudo apt-get install -y git curl zlib1g-dev subversion
sudo apt-get install -y openssl libreadline6-dev git-core zlib1g libssl-dev
sudo apt-get install -y libyaml-dev libsqlite3-dev sqlite3
sudo apt-get install -y libxml2-dev libxslt-dev
sudo apt-get install -y autoconf automake libtool bison
sudo curl -L get.rvm.io | bash -s stable --rails
#If this fails you may need to use the gpg2 --keyserver command given as an error message to update the signatures
sudo source ~/.rvm/scripts/rvm
#Copy rails project over from Github
cd Temperature_Logging
sudo svn checkout https://github.com/emperorcal/pi-hometemperature/trunk/dashboard
