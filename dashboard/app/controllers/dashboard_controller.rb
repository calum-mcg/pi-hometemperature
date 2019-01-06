require 'csv'
class DashboardController < ApplicationController
  def index
  	#Read CSV files for Temperature and Humidity
  	csvHumidity = File.read(File.dirname(File.expand_path('.')) + '/Humid.csv')
  	csvTemperature = File.read(File.dirname(File.expand_path('.')) + '/Temp.csv')
  	humidityArray = CSV.parse(csvHumidity, :headers => false)
  	temperatureArray = CSV.parse(csvTemperature, :headers => false)

  	#Get columns from CSV arrays
  	temperatureColumn = temperatureArray.map {|row| row[0]}
  	@times = temperatureArray.map {|row| row[1]}
  	@dates = temperatureArray.map {|row| row[2]}
  	humidityColumn = humidityArray.map {|row| row[0]}

  	#Ensure Temperature and Humidity to two decimal points
  	@temperatureDataset = temperatureColumn.map! {|item| '%.2f' % item.to_f}
  	@humidityDataset = humidityColumn.map! {|item| '%.2f' % item.to_f}

  	#Combine arrays into one in order to dynamically create the data table
  	@combinedDataset = @dates.zip(@times, @temperatureDataset, @humidityDataset)

  	#TODO: Allow possibility of multiple rooms
  	@roomNumber = 1
  end
end
