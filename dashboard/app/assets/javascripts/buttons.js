$(document).ready(function(){

    $('#download_data').click(function(){
	  $("#temperatureChart").get(0).toBlob(function(blob) {
	  	console.log('download');
	    saveAs(blob, "temperatureChart");
	  });
    });

    $('#save_image').click(function(){
	  $("#temperatureChart").get(0).toBlob(function(blob) {
	    console.log('image');
	    saveAs(blob, "temperatureChart");
	  });
    });

    $('#switch_view').click(function(){
		$(this).text(function(i, text){
			return text === "View Graph" ? "View Data" : "View Graph";
		})
        $('.panel1').toggleClass('flipped');
        $('.panel2').toggleClass('flipped');
    });
});