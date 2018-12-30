class DashboardController < ApplicationController
  def index
  	@temperatureDataset = [18,17,18,19,21,22]
  	@humidityDataset = [55,55,55,55,55,55]
  	@dates = ["17/04/18", "18/04/18", "19/04/18", "20/04/18", "21/04/18", "22/04/18"]
  	@times = ["11:49:00", "11:49:00", "11:49:00", "11:49:00", "11:49:00", "11:49:00"]
  	@roomNumber = 1
  	@combinedDataset = @dates.zip(@times, @temperatureDataset, @humidityDataset)
  end
end
