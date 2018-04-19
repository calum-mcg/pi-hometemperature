class DashboardController < ApplicationController
  def index
  	@temperatureDataset = [[18,17,18,19,21,22],[16,15,13,17,18,19],[6,5,3,7,8,10],[7,8,5,11,12,11],[17,12,5,10,15,11]]
  	@dates = ["17/04/18", "18/04/18", "19/04/18", "20/04/18", "21/04/18", "22/04/18"]
  end
end
