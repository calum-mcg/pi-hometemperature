$(document).ready(function(){
    $('#download_data').click(function(){
	  $("#temperatureChart").get(0).toBlob(function(blob) {
	    saveAs(blob, "temperatureChart");
	  });
    });
    $('#switch_view').click(function(){
        $('.panel').toggleClass('flipped');
    });
});