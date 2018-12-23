# Code is adapted from Adafruit library with additions to log time, date as well into CSV files
import sys
import Adafruit_DHT
import datetime
import csv

# Parse command line parameters.
sensor_args = { '11': Adafruit_DHT.DHT11,
                '22': Adafruit_DHT.DHT22,
                '2302': Adafruit_DHT.AM2302 }
if len(sys.argv) == 3 and sys.argv[1] in sensor_args:
    sensor = sensor_args[sys.argv[1]]
    pin = sys.argv[2]
else:
    print('Usage: sudo ./Adafruit_DHT.py [11|22|2302] <GPIO pin number>')
    print('Example: sudo ./Adafruit_DHT.py 2302 4 - Read from an AM2302 connected to GPIO pin #4')
    sys.exit(1)

# Try to grab a sensor reading.  Use the read_retry method which will retry up
# to 15 times to get a sensor reading (waiting 2 seconds between each retry).
humidity, temperature = Adafruit_DHT.read_retry(sensor, pin)

# Note that sometimes you won't get a reading and
# the results will be null (because Linux can't
# guarantee the timing of calls to read the sensor).
# If this happens try again!
if humidity is not None and temperature is not None:
    print('Temp={0:0.1f}*  Humidity={1:0.1f}%'.format(temperature, humidity))
else:
    print('Failed to get reading. Try again!')
    sys.exit(1)

#Get time and date
now = datetime.datetime.now()
time_now = "{}:{}:{}, {}/{}/{}".format(now.hour, now.minute, now.second, now.day, now.month, now.year)

#Write to csv
temperature_row = [temperature, time_now]
humidity_row = [humidity, time_now]
temperature_filename = "Temp.csv"
humidity_filename = "Humid.csv"
with open(temperature_filename, 'a') as csvFile:
    writer = csv.writer(csvFile)
    writer.writerow(temperature_row)
csvFile.close()
with open(humidity_filename, 'a') as csvFile:
    writer = csv.writer(csvFile)
    writer.writerow(humidity_row)
csvFile.close()


