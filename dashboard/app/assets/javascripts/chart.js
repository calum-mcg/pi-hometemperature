$(document).ready(function(){
	window.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)',
	darkgrey: 'rgb(107, 107, 107)'
	};
	var roomtemp = $('#graphCanvas').data('temperatures');
	var roomhumidity = $('#graphCanvas').data('humidities');
	var dates = $('#graphCanvas').data('dates');
	var times = $('#graphCanvas').data('times');
	//Create datetime
    var datetime = [];
    if (dates.length === times.length) {
        for(var i=0;i<dates.length;i++)
            datetime.push(dates[i]+" "+times[i]);
    }

    //Possibility of adding multiple rooms here, insert loop to go through 2D array
    //var room1 = roomtemp[0];
	//var numberOfRooms = $('#graphCanvas').data('roomNumber');

	var ctx = document.getElementById("temperatureChart").getContext('2d');
	var myChart = new Chart(ctx, {
	    type: 'line',
	    data: {
	        labels: datetime,
	        datasets: [{
	            label: 'Temperature',
                yAxisID: 'temperature',
	            data: roomtemp,
	            fill: false,
				backgroundColor: window.chartColors.red,
				borderColor: window.chartColors.red,
	            borderWidth: 1,
				pointRadius: 1,
				pointHoverRadius: 5
	        }, {
                label: 'Humidity',
                yAxisID: 'humidity',
	            data: roomhumidity,
	            fill: false,
				backgroundColor: window.chartColors.blue,
				borderColor: window.chartColors.blue,
	            borderWidth: 1,
				pointRadius: 1,
				pointHoverRadius: 5
	        }]
	    },
	    options: {
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
                        if (tooltipItems.datasetIndex === 0) {
                           return tooltipItems.yLabel + String.fromCharCode(176)+"C";
                        } else if (tooltipItems.datasetIndex === 1) {
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