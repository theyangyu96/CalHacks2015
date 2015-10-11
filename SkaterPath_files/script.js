
$(document).ready(function(){
   $("#feedbackPanel").hide();
});

document.getElementById("searchButton").addEventListener("click", function(){
	console.log("searchButton");
	$("#searchButton").addClass("active");
	$("#feedbackButton").removeClass();
    $("#feedbackPanel").hide();
    $("#pathInput").show();
});

document.getElementById("feedbackButton").addEventListener("click", function(){
	console.log("feeedbackButton");
	$("#feedbackButton").addClass("active");
	$("#searchButton").removeClass();
    $("#feedbackPanel").show();
    $("#pathInput").hide();
});

