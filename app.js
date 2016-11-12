'use strict'

$(function () {

	var data = {
		labels: ["News 1", "News 2", "News 3"],

		datasets: [
			{
				label: "First Dataset",
				fillColor: "rgba(153,0,76,0.2)",
				strokeColor: "rgba(153,0,76,1)",
				pointColor: "rgba(153,0,76,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(153,0,76,1)",
				data: [0, 25, 50]
			}
		]	
	};
	var option = {};

	var ctx = document.getElementById("myChart").getContext('2d');
	var myLineChart = new Chart(ctx).Line(data, option);

});