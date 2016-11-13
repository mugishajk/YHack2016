
  // alert("haha");

function plot(prices) {

  var canvas = document.getElementById('updating-chart'),
      ctx = canvas.getContext('2d'),
      startingData = {
        labels: [0],
        datasets: [
            {
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 10,
                pointHoverBorderWidth: 3,
                xAxisID: "Time",
                yAxisID: "Value",
                spanGaps: true,
                data: []
            }
        ]
      },
      latestLabel = startingData.labels[0];

  // Reduce the animation steps for demo clarity.
  var myLiveChart = new Chart(ctx).Line(startingData, {animationSteps: 15});

  // // DUMMY DATA
  // for (var k=0; k < 20; k++) {
  //   myLiveChart.addData([k], k);
  // }


  var point_ctr = 0;

  setInterval(function(){
    // Add two random numbers for each dataset
    // if (latestLabel >= 10)
    //     latestLabel = 0;
    // else
    //     latestLabel++;

    var x = prices[plot_ctr];
    plot_ctr++;

        // var y = Math.random() * 300;



    if(x == null)
      return;    

    if (point_ctr <= simulation_time) {
        myLiveChart.addData([x], Math.round(point_ctr));
        point_ctr++;
        document.getElementById("marketprice").innerHTML =x.toFixed(2);
        unrealizedPnL();
    }
    else
    {
      return;
    }

    if (point_ctr >= 20) {
        myLiveChart.removeData();
    }
    // myLiveChart.addData([Math.random() * 100, Math.random() * 100], ++latestLabel);
    // myLiveChart.addData([40, 40], ++latestLabel);

    // Remove the first point so we dont just add values forever
    // myLiveChart.removeData();
  }, 100);


}