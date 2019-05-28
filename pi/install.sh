#!/usr/bin/env bash
#Bash script to install Python logging

#Check for updates
printf "\nChecking for updates.....\n\n"
sudo apt-get update

#Install essential python libraries
printf "\nInstalling essential Python libraries (Python 2 and 3).....\n\n"
sudo apt-get install build-essential python-dev python-openssl git
sudo apt-get install python3 python3-dev python3-setuptools

#Cloning Adafruit Python Libraries
printf "\nCloning Adafruit Python Libraries....."
git clone https://github.com/adafruit/Adafruit_Python_DHT.git
cd Adafruit_Python_DHT

#Install Adafruit library for Python 2 & 3
printf "\nInstalling essential Python libraries.....\n\n"
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
printf "\nCreating folder structure and logging files.....\n\n"
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
wget https://raw.githubusercontent.com/emperorcal/pi-hometemperature/master/pi/poly.py

#Create cronjobs
printf "\nCreating cronjob.....\n\n"
sudo crontab -l > mycron

#Echo new cron into cron file
sudo echo "* * * * * sudo python3 /home/pi/Temperature_Logging/log.py $sensorVersion $gpioNumber" >> mycron
sudo echo "*/5 * * * * sudo python3 /home/pi/Temperature_Logging/poly.py" >> mycron

#Install new cron file
sudo crontab mycron
sudo rm mycron

#Install rails
printf "\nInstalling requirements for rails.....\n\n"
cd /home/pi/
sudo apt-get install -y git curl zlib1g-dev subversion
sudo apt-get install -y openssl libreadline6-dev git-core zlib1g libssl-dev
sudo apt-get install -y libyaml-dev libsqlite3-dev sqlite3
sudo apt-get install -y libxml2-dev libxslt-dev
sudo apt-get install -y autoconf automake libtool bison
sudo apt-get install -y gnupg2
sudo apt-get install -y dirmngr
sudo curl -L get.rvm.io | sudo bash -s stable --rails

#WARNING----
#If this fails you may need to use the gpg2 --keyserver command given as an error message to update the signatures
source /home/pi/.rvm/scripts/rvm

#Add user to RVM group
sudo usermod -a -G rvm $(whoami)

#Copy rails project over from Github
cd Temperature_Logging
sudo svn checkout https://github.com/emperorcal/pi-hometemperature/trunk/dashboard

#Set read/write permissions
sudo chown -R $(whoami):$(whoami) dashboard
cd dashboard

#Install JS for Rails
gem install execjs
sudo apt-get install -y nodejs

#Install bundler and Rails dependencies
gem install bundler
bundler update

#Print progress
printf "\nCompleted!\n\n"
