'use strict'


// generate random integer from x1, x2
function generateInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;  
}


//given database containing economic news with preset impact on the market, we retrieve the news that will appear in each interval
//let the program random assigns random news
function randomNewsInterval(time_interval_list, price_list, news_end_time, mean, sigma) {

    // amount of random news to be added...
    var number_of_random_news = generateInterval(6, 10)
    var count = 0, start_time = 0
    // once the time intervals have already been decided, we run down the list
    while (count < number_of_random_news):
        
        start_time = generateInterval(start_time, news_end_time);
        // decide to interrupt the program with additional news
        
        if not start_time in time_interval_list {
            
            time_interval_list.push(start_time);
            time_interval_list.sort();
     
            price_list.push(GBMpath(time_interval_list[count]-time_interval_list[count-1], price_list[price_list.length-1], mean[count], sigma[count], 0.5));
            //price_list.append(randomPath(time_interval_list[count]-time_interval_list[count-1], mean[count], sigma[count], price_list[-1]))
            count = count + 1;
            
        }
    return price_list;
}



function collect_params(interval, total_news) {
    
    news_index = [];

    // generate news index
    for (var i=0; i < total_news.length; i++) {
        news_index.push(generateInterval(0, 30));
    }

    // news_index = random.sample(range(0,30), total_news)

    mean = [];
    sigma = [];

    for (var i=0; i < interval.length; i++) {
        //fetch from database based on their column value
        mean.push(news_index[i].mean);
        sigma.push(news_index[i].sigma);

    }

    // for i in range(0,len(interval)):
    //     #fetch from database based on their column value
    //     mean.append(news_index[i].mean)
    //     sigma.append(news_index[i].sigma)
    
    return mean, sigma

}


$(function () {

//duration of the simulation
var simulation_time = 700

//starting price
var init_price = 1000

var canvas = document.getElementById('updating-chart'),
    ctx = canvas.getContext('2d'),
    startingData = {
      labels: [init_price],
      datasets: [
          {
              fillColor: "rgba(151,187,205,0.2)",
              strokeColor: "rgba(151,187,205,1)",
              pointColor: "rgba(151,187,205,1)",
              pointStrokeColor: "#fff",
              data: [init_price]
          }
      ]
    },
    latestLabel = startingData.labels[0];

// Reduce the animation steps for demo clarity.
var myLiveChart = new Chart(ctx).Line(startingData, {animationSteps: 15});

var point_ctr = 1;

setInterval(function(){
  
  console.log(generateInterval(5,10));
  // Add two random numbers for each dataset

  // if (latestLabel >= 10)
  //     latestLabel = 0;
  // else
  //     latestLabel++;

      var x = Math.random() * 700;
      // var y = Math.random() * 300;

  if (point_ctr >= simulation_time) {
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