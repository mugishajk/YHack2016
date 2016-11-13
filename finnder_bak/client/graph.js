'use strict'


//duration of the simulation
var simulation_time = 200;
//starting price
var init_price = 1000;
var plot_ctr = 0;
var last_price = 1000;


var n = news();
console.log(n);

//TODO, declare a nj var pointing to numjs library
// var nj = require('numjs');

function unrealizedPnL(){
   
   //get current unrealized profit
   var unrealizedPnL = parseFloat(document.getElementById("unrealized").innerHTML);
   var averagecost = parseFloat(document.getElementById("averagecost").innerHTML);
   var currentposition = parseInt(document.getElementById("position").innerHTML);
   var marketprice = parseFloat(document.getElementById("marketprice").innerHTML);
   
   //whenever market ticks, update the unrealized PnL
   var currentUnrealized = currentposition * (marketprice - averagecost);
   document.getElementById("unrealized").innerHTML = currentUnrealized.toFixed(2);
}


// generate random integer from x1, x2
function generateInterval(min, max) {
    // return Math.floor(Math.random() * (max - min + 1)) + min;  

    return Math.floor(math.random(min, max)); 
}

function inArray(needle,haystack)
{
    var count=haystack.length;
    for(var i=0;i<count;i++)
    {
        if(haystack[i]===needle){return true;}
    }
    return false;
}

//given database containing economic news with preset impact on the market, we retrieve the news that will appear in each interval
//let the program random assigns random news
function randomNewsInterval(time_interval_list, price_list, news_end_time, mean, sigma) {

    // amount of random news to be added...
    var number_of_random_news = generateInterval(6, 10);
    var count = 0, start_time = 0;
    // once the time intervals have already been decided, we run down the list
    while (count < number_of_random_news){
        
        start_time = generateInterval(start_time, news_end_time);
        // decide to interrupt the program with additional news
        
        // if not start_time in time_interval_list {
            
        if (!inArray(start_time, time_interval_list))  {   
            time_interval_list.push(start_time);
            time_interval_list.sort();
     
            // price_list.push(GBMpath(time_interval_list[count]-time_interval_list[count-1], price_list[price_list.length-1], mean[count], sigma[count], 0.5));
            price_list.append(randomPath(time_interval_list[count]-time_interval_list[count-1], mean[count], sigma[count], price_list[-1]));
            count = count + 1;   
        }
    }
    return price_list;
}



function collect_params(interval, total_news) {
    
    //Database ###################
    var news_index = [];

    //generate news index
   for (var i=0; i < total_news.length; i++) {
       news_index.push(generateInterval(0, 23));
    }
   
    //var news_index = random.sample(range(0,23), total_news);

    var news_index_mean = [-0.04,0.4,-0.02,-0.01,0.05,-0.03,-0.01,-0.07,0.005,-0.03];
    var news_index_sigma =  [0.025,0.12,0.01,0.005,0.02,0.02,0.005,0.04,0.005,0.015];

    var mean = [];
    var sigma = [];
    for (var i=0; i < interval.length; i++) {
        //fetch from database based on their column value

        // mean.push(news_index[i].mean);
        // sigma.push(news_index[i].sigma);

        mean.push(news_index_mean[i]);
        sigma.push(news_index_sigma[i]);
    }

    // for i in range(0,len(interval)):
    //     #fetch from database based on their column value
    //     mean.append(news_index[i].mean)
    //     sigma.append(news_index[i].sigma)
    
    var return_list = [mean,sigma];
    return return_list;
}

// returns a gaussian random function with the given mean and stdev.
function gaussian(mean, stdev) {
    var y2;
    var use_last = false;

    // return function() {

        var y1;
        if(use_last) {
           y1 = y2;
           use_last = false;
        }
        else {
            var x1, x2, w;
            do {
                 x1 = 2.0 * Math.random() - 1.0;
                 x2 = 2.0 * Math.random() - 1.0;
                 w  = x1 * x1 + x2 * x2;               
            } while( w >= 1.0);
            w = Math.sqrt((-2.0 * Math.log(w))/w);
            y1 = x1 * w;
            y2 = x2 * w;
            use_last = true;
       }

       var retval = mean + stdev * y1;
       return retval;
   // }
}


//based on given parameters, generate random returns
function randomPath(days, mu, vol, initPrice) {

    // daily_returns=1+np.random.normal(mu/days,vol/math.sqrt(days),days)

    var daily_returns = [];

    for (var i=0; i < days; i++) {
      var standard = 1.0+gaussian(mu/days, vol/Math.sqrt(days));
      // console.log(standard);
      daily_returns.push(standard);
    }

    // var daily_returns = 1+ np.random.normal(mu/days,vol/Math.sqrt(days),days);
    // print len(daily_returns)
    //console.log(daily_returns);

    var prices = [initPrice];
    // for x in daily_returns:
    //   prices.append(prices[-1]*x)
     
    for (var x=0; x < daily_returns.length; x++) {
      prices.push(prices[prices.length-1] * daily_returns[x]);
      // console.log(prices[prices.length-1] * daily_returns[x]);
    }

    return prices;
}



// plotGraph


function main() {
    //start of program
    console.log ("initiate trading sequence...");
    
    //check how many news to be generated for the program
    var number_of_news = generateInterval(7, 10);
    //number_of_noise_news = generateInterval(6, 10);
    var total_news = number_of_news;
    var news_start_time = 30;

    //start generating intervals for the entire program
    var iterate = 0;
    var news_end_time = generateInterval(news_start_time*2, news_start_time*2 + 10);
    var interval = [generateInterval(news_start_time, news_end_time)];
    while (iterate < number_of_news) {
        
        // news appearing at a frequency between each 30-45 seconds
        var iterative_range = generateInterval(30,45);
        interval.push(generateInterval(interval[interval.length-1],interval[interval.length-1] + iterative_range)) ;      
        iterate = iterate + 1;
    }
    console.log("haha" + interval[interval.length-1]);
    if (interval[interval.length-1] < simulation_time) {
      console.log("haha" + interval[interval.length-1]);
      interval.push(simulation_time+1); 
    }

    // collect mean, sigma

    var results_list =  collect_params(interval, total_news);

    var mean = results_list[0]; 
    var sigma = results_list[1];

    for (var i = 0; i < interval.length; i++) 
      console.log(interval[i]);

    for (var i = 0; i < mean.length; i++) 
      {console.log(mean[i]);
        console.log(sigma[i]);
      }
 

    console.log(mean.length);
    console.log(sigma.length);

    
    // initiate first price path    
    //price_list = [GBMpath(interval[0], init_price, mean[0], sigma[0], 0.5)]
    var price_list = [init_price];
    var price_sub_list;
    price_sub_list = randomPath(interval[0], mean[0], sigma[0], init_price);
    
    for (var j=0; j< price_sub_list.length; j++)
      price_list.push(price_sub_list[j]);
    // console.log("ggggg");
    

    // [randomPath(interval[0], mean[0], sigma[0], init_price)];
    init_price=price_list[price_list.length-1];
    console.log(price_list[price_list.length-1]);


    last_price = price_list[price_list.length-1];

    //add random news into the intervals
    // randomNewsInterval(interval, price_list, news_start_time, mean, sigma);
    //price_list = randomNewsInterval(interval, price_list, news_start_time, mean, sigma);
    
    //console.log(price_list[0]);

   //start generating entire price paths
    // for i in range(0, len(interval)):
    for (var i=0; i < interval.length; i++) {
        //price_list.append(GBMpath(interval[i]-interval[i-1], price_list[-1], mean[i], sigma[i], 0.5))
        price_sub_list = randomPath(interval[i]-interval[i-1], mean[i], sigma[i], init_price);
      
        for (var j=0; j< price_sub_list.length; j++) 
          price_list.push(price_sub_list[j]);
        init_price = price_list[price_list.length-1];

    }      

    //combine price paths to form graph
    //this will be plotted on a tick-by-tick basis using javascript in our final version

    console.log("PLOT");

    // plotGraph(price_list);
    for (var i=0; i < price_list.length; i++) {
      console.log(price_list[i]);
  }
  console.log("LENGTH");
  console.log(price_list.length);
  console.log(interval[interval.length-1]);
  return price_list;
}

$(function () {

  var prices = main();
  console.log("PLOTTING");
  console.log(prices[0]);

  // alert("haha");

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
});


/*
start with 10 points

add 1 point at a time until 20,

when its 20
*/