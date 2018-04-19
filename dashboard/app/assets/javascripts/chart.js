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
	var roomtemp = $('#graphCanvas').data('dataset');
	var dates = $('#graphCanvas').data('dates');
	var numberOfRooms = $('#graphCanvas').data('roomNumber'); 
	var room1 = roomtemp[0];
	var room2 = roomtemp[1];
	var room3 = roomtemp[2];
	var room4 = roomtemp[3];
	var room5 = roomtemp[4];
	var roomtempAverage = [];
	var count = 0;
	for (i = 0; i < 6; i++) {
	    	for (j = 0; j < 5; j++) {
			    count += roomtemp[j][i];
			    if (j == 4) {
				    roomtempAverage[i] = (count/(j+1));
				    count = 0;
				}
			}
	}
	var ctx = document.getElementById("temperatureChart").getContext('2d');
	var myChart = new Chart(ctx, {
	    type: 'line',
	    data: {
	        labels: dates,
	        datasets: [{
	            label: 'Room 1',
	            data: room1,
	            fill: false,
				backgroundColor: window.chartColors.red,
				borderColor: window.chartColors.red,
	            borderWidth: 1
	        },
	        {
				label: 'Room 2',
			    data: room2,
	            fill: false,
				backgroundColor: window.chartColors.blue,
				borderColor: window.chartColors.blue,
	            borderWidth: 1        	
	        },
	        {
				label: 'Room 3',
			    data: room3,
	            fill: false,
				backgroundColor: window.chartColors.green,
				borderColor: window.chartColors.green,
	            borderWidth: 1  	        	
	        },
	        {
				label: 'Room 4',
			    data: room4,
	            fill: false,
				backgroundColor: window.chartColors.yellow,
				borderColor: window.chartColors.yellow,
	            borderWidth: 1 	        	
	        },
	        {
				label: 'Room 5',
			    data: room5,
	            fill: false,
				backgroundColor: window.chartColors.purple,
				borderColor: window.chartColors.purple,
	            borderWidth: 1 	        	
	        },
	        {
				label: 'Average',
			    data: roomtempAverage,
	            fill: false,
				backgroundColor: window.chartColors.darkgrey,
				borderColor: window.chartColors.darkgrey,
	            borderWidth: 1,
	            borderDash: [10,5]	        	
	        }]
	    },
	    options: {
			scales: {
				xAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						fontSize: 16
					},
					time: {
					unit: 'day'
					}
				}],
				yAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: String.fromCharCode(176)+"C",
						fontSize: 16
					},
					ticks: {
						beginAtZero: true,
						maxRotation: 0
					}		
				}]
			},
		tooltips: {
	            enabled: true,
	            mode: 'single',
	            callbacks: {
	                label: function(tooltipItems, data) { 
	                    return tooltipItems.yLabel + String.fromCharCode(176) + "C";
	                	}
	            }
	        }
	    }
	});
});