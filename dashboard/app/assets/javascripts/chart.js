$(document).ready(function(){
	window.chartColors = {
	red: 'rgb(255, 99, 132, 0.2)',
	darkred1: 'rgb(229, 62, 96)',
	darkred2: 'rgb(255, 32, 63)',
	darkred3: 'rgb(202, 0, 27)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235, 0.2)',
	darkblue1: 'rgb(37, 128, 189)',
	darkblue2: 'rgb(19, 92, 141)',
	darkblue3: 'rgb(0, 65, 108)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)',
	darkgrey: 'rgb(107, 107, 107)'
	};

	var roomTemp = $('#graphCanvas').data('temperatures');
	var roomHumidity = $('#graphCanvas').data('humidities');
	var dates = $('#graphCanvas').data('dates');
	var times = $('#graphCanvas').data('times');
	var tempPoly6 = $('#graphCanvas').data('temppoly6');
	var tempPoly7 = $('#graphCanvas').data('temppoly7');
	var tempPoly8 = $('#graphCanvas').data('temppoly8');
	var humidPoly6 = $('#graphCanvas').data('humidpoly6');
	var humidPoly7 = $('#graphCanvas').data('humidpoly7');
	var humidPoly8 = $('#graphCanvas').data('humidpoly8');

	console.log(tempPoly6);

	//Create datetime
    var datetime = [];
    if (dates.length === times.length) {
        for(var i=0;i<dates.length;i++)
            datetime.push(dates[i]+" "+times[i]);
    }

    //Possibility of adding multiple rooms here, insert loop to go through 2D array
    //var room1 = roomTemp[0];
	//var numberOfRooms = $('#graphCanvas').data('roomNumber');

	var ctx = document.getElementById("temperatureChart").getContext('2d');
	var myChart = new Chart(ctx, {
	    type: 'line',
	    data: {
	        labels: datetime,
	        datasets: [{
	            label: 'Temperature',
                yAxisID: 'temperature',
	            data: roomTemp,
	            fill: false,
				backgroundColor: window.chartColors.red,
				borderColor: window.chartColors.red,
	            borderWidth: 1,
				pointRadius: 1,
				pointHoverRadius: 5
	        }, {
	            label: 'Temperature Polynomial Order 6',
                yAxisID: 'temperature',
	            data: tempPoly6,
	            fill: false,
				backgroundColor: window.chartColors.darkred1,
				borderColor: window.chartColors.darkred1,
	            borderWidth: 1,
				pointRadius: 1,
				pointHoverRadius: 5
	        }, {
	            label: 'Temperature Polynomial Order 7',
                yAxisID: 'temperature',
	            data: tempPoly7,
	            fill: false,
				backgroundColor: window.chartColors.darkred2,
				borderColor: window.chartColors.darkred2,
	            borderWidth: 1,
				pointRadius: 1,
				pointHoverRadius: 5
	        }, {
	            label: 'Temperature Polynomial Order 8',
                yAxisID: 'temperature',
	            data: tempPoly8,
	            fill: false,
				backgroundColor: window.chartColors.darkred3,
				borderColor: window.chartColors.darkred3,
	            borderWidth: 1,
				pointRadius: 1,
				pointHoverRadius: 5
	        }, {
                label: 'Humidity',
                yAxisID: 'humidity',
	            data: roomHumidity,
	            hidden: true,
	            fill: false,
				backgroundColor: window.chartColors.blue,
				borderColor: window.chartColors.blue,
	            borderWidth: 1,
				pointRadius: 1,
				pointHoverRadius: 5
	        }, {
                label: 'Humidity Polynomial Order 6',
                yAxisID: 'humidity',
	            data: humidPoly6,
	            hidden: true,
	            fill: false,
				backgroundColor: window.chartColors.darkblue1,
				borderColor: window.chartColors.darkblue1,
	            borderWidth: 1,
				pointRadius: 1,
				pointHoverRadius: 5
	        }, {
                label: 'Humidity Polynomial Order 7',
                yAxisID: 'humidity',
	            data: humidPoly7,
	            hidden: true,
	            fill: false,
				backgroundColor: window.chartColors.darkblue2,
				borderColor: window.chartColors.darkblue2,
	            borderWidth: 1,
				pointRadius: 1,
				pointHoverRadius: 5
	        }, {
                label: 'Humidity Polynomial Order 6',
                yAxisID: 'humidity',
	            data: humidPoly8,
	            hidden: true,
	            fill: false,
				backgroundColor: window.chartColors.darkblue3,
				borderColor: window.chartColors.darkblue3,
	            borderWidth: 1,
				pointRadius: 1,
				pointHoverRadius: 5
	        }]
	    },
	    options: {
	    	legend: {
	            display: true,
	            labels: {
	                boxWidth: 20
	            }
	    	},
			scales: {
				xAxes: [{
					display: true,
					type: 'time',
					time: {
						unit: 'day',
						parser: 'DD/MM/YY HH:mm:ss',
						unitStepSize: 1,
						displayFormats: {
					    	'day': 'DD MMM'
					},
					scaleLabel: {
						display: true,
						fontSize: 16
					}
					}
				}],
				yAxes: [{
					id: 'temperature',
					display: true,
					position: 'left',
					scaleLabel: {
						display: true,
						labelString: String.fromCharCode(176)+"C",
						fontSize: 16
					},
					ticks: {
						beginAtZero: false,
						maxRotation: 0
					}		
				}, {
					id: 'humidity',
				    display: true,
                    position: 'right',
					scaleLabel: {
						display: true,
						labelString: "%",
						fontSize: 16
					},
					ticks: {
						beginAtZero: false,
						maxRotation: 0
					}
                }]
			},
		tooltips: {
	            enabled: true,
	            mode: 'single',
	            callbacks: {
	                label: function(tooltipItems, data) {
	                	console.log(tooltipItems.datasetIndex);
                        if (tooltipItems.datasetIndex < 4) {
                           return tooltipItems.yLabel + String.fromCharCode(176)+"C";
                        } else if (tooltipItems.datasetIndex >= 4) {
                            return tooltipItems.yLabel + "%";
                        } else {
                            return "N/A";
                        }
	                	}
	            }
	        }
	    }
	});
});