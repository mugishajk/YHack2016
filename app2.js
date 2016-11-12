'use strict'

$(function () {


var canvas = document.getElementById('updating-chart'),
    ctx = canvas.getContext('2d'),
    startingData = {
      labels: [1000],
      datasets: [
          {
              fillColor: "rgba(151,187,205,0.2)",
              strokeColor: "rgba(151,187,205,1)",
              pointColor: "rgba(151,187,205,1)",
              pointStrokeColor: "#fff",
              data: [1000]
          }
      ]
    },
    latestLabel = startingData.labels[0];

// Reduce the animation steps for demo clarity.
var myLiveChart = new Chart(ctx).Line(startingData, {animationSteps: 15});

var point_ctr = 1;

setInterval(function(){
  

  // Add two random numbers for each dataset

  // if (latestLabel >= 10)
  //     latestLabel = 0;
  // else
  //     latestLabel++;

      var x = Math.random() * 700;
      // var y = Math.random() * 300;

  if (point_ctr >= 300) {
      // point_ctr = 0;


    // myLiveChart.addData([x, y], Math.round(x));

    // myLiveChart.removeData();
  }
  else {
      point_ctr++;
      myLiveChart.addData([x], Math.round(point_ctr));
  }
  // myLiveChart.addData([Math.random() * 100, Math.random() * 100], ++latestLabel);
  // myLiveChart.addData([40, 40], ++latestLabel);

  // Remove the first point so we dont just add values forever
  // myLiveChart.removeData();

}, 500);


});


/*
start with 10 points

add 1 point at a time until 20,

when its 20
*/