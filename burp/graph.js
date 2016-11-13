// 'use strict'


//duration of the simulation
var simulation_time = 200;
//starting price
var init_price = 1000;
var plot_ctr = 0;
var last_price = 1000;
var news_count = 23;
var next_interval = 0;

    var sampleNews = [
      {
        index: 0,
        question: "Activist investor Phil Jackman believes the aging population and increasing healthcare product demand will be a significant catalyst in Valiant's future performance. Valiant's board has discussed the possibility to launch a major series of capital investments to set the platform for this future growth.",
        class: "Neutral",
        reason: "No materialization of the capital investments yet, not safe to invest right away",
        mu: 0.01,
        sigma: 0.008
      },
      {
        index: 1,
        question: "With continuing focus of margin management, Couche Tard’s management is emphasizing cost control in which they hope to cut the COGS margin by 1.2%.  With an increased expansion into India on the horizon, management has revised its capital expenditures to increase by $2.5 billion in 2017 and 2018.",
        class: "Bearish",
        reason: "In your Discounted Cash Flow model, remember that an increase in capital expenditure will decrease your target price estimation. With only a 1.2% decrease in COGS margin, this will not be sufficient to offset the negative effect on your future cash flow",
        mu: -0.025,
        sigma: 0.012
      },
      {
        index: 2,
        question: "The DOMINATOR program has underperformed management estimates in its first month. First-time sign-ups fell short of the 20,000 estimate by 5,000. However, management remains optimistic Q3 and Q4 results will reflect one full cycle of the value add from the program. ",
        class: "Bearish",
        reason: "This news will likely make Wall Street analysts drop their forecasts on sales growth, which is bad for your future cash flow.",
        mu: -0.02,
        sigma: 0.01 
      }, 
      {
        index: 3,
        question: "Due to the increasingly intense competition in the retail industry, Moody's revised the Aldo's credit rating to BB+, increasing credit spread by 2%.",
        class: "Bearish",
        reason: "Given that credit spreads affects the cost of debt in a firm, an increase in credit spreads wil increase the cost of debt of the firm, which will also increase the WACC, which then decreases the target price for Aldo.",
        mu: -0.015,
        sigma: 0.005
      },
      {
        index: 4,
        question: "The OPEC agreed on modest oil output cuts from 33.3 million barrels per day to 32.5 million barrels per day.",
        class: "Bullish",
        reason: "This type of news are seen as speculations in the short-term, as no production cuts will be materialized until the deal goes through during the OPEC's official meeting. However, this news will be sufficient to push oil prices up in the short-term.",
        mu: 0.05,
        sigma: 0.015
      }, 
      {
        index: 5,
        question: "Due to the continued fallout of oil prices, the U.S Federal Reserve revises CPI down by 50bps.",
        class: "Bearish",
        reason: "A decrease in inflation will have a negative impact on terminal growth rate, which will reduce the target price for equities.",
        mu: -0.03,
        sigma: 0.013
      },
      {
        index: 6,
        question: "Stephen Poloz, Bank of Canada's governor, announced that Canadian trade exports are faced with 'lack of competitiveness' and housing resales are expected to slowdown in the next quarter. The BoC has also hinted that a rate cut likelihood will increase if exports face more headwinds in the foreseeable future.",
        class: "Neutral or Bearish",
        reason: "This is a tricky question. Although the BoC expressed bearish commentary on the Canadian Economy, nothing has been materialized yet. However, the rate cut commentary is very dangerous and could have an impact on the market on the short-term. Therefore, both neutral & bearish should be expected given the fact that no further details are included about the given economic situation.",
        mu: -0.015,
        sigma: 0.005
      },
      {
        index: 7,
        question: "New technology shifts consumer demand away from Corsair's console segment, resulting in $1 billion decrease in EBIT.",
        class: "Bearish",
        reason: "A decrease in EBIT means the company suffers losses in the quarter. If this number is below estimates from Wall Street analysts, then the market will be expected to push the prices further down. In general, EBIT directly influence the firm's cash flow and a decrease in EBIT decreases future cash flow.",
        mu: -0.023,
        sigma: 0.012
      },
      {
        index: 8,
        question: "Cineplex acquires assets in their theatre segment, increasing their assets by $3 billion.",
        class: "Neutral",
        reason: "Assets do not affect the outcome of a Discounted Cash Flow model and does not reflect on the company's ability to generate revenue",
        mu: 0.012,
        sigma: 0.005
      },
      {
        index: 9,
        question: "The Bank of Japan’s recent quarterly report says, in effect, that the central bank has done all it can do to raise growth and inflation, and that fiscal policy needs to step in and help. The BOJ admitted that monetary policy alone won’t be enough to hit its 2 percent inflation target, now or ever",
        class: "Neutral",
        reason: "No materialization of the capital investments yet, not safe to invest right away ",
        mu: 0.015,
        sigma: 0.01
      },
      {
        index: 10,
        question: "Russia's automotive market would shrink by 30 to 40 percent this year if it were not receiving state support, Russian news agencies quoted President Vladimir Putin as saying on Saturday.",
        class: "Bearish",
        reason: "Auto sales and consumptions are huge part of a nation's GDP, therefore a dramatic decrease in this sector will reduce GDP growth, thus reducing growth expectations.",
        mu: -0.023,
        sigma: 0.01
      },
      {
        index: 11,
        question: "U.S. consumer sentiment rose more-than-expected last month, preliminary data showed on Friday. In a report, the University of Michigan said that consumer sentiment rose to a seasonally adjusted 91.6, from 87.2 in the preceding month. Analysts had expected UoM consumer sentiment to rise to 87.5 last month.",
        class: "Bullish",
        reason: "Consumer sentiment reported higher than expected, should expect a positive opening market",
        mu: 0.025,
        sigma: 0.01
      },  
      {
        index: 12,
        question: "Drilling activity in U.S. fields was little changed in this week's Baker Hughes survey, with oil rigs gaining by two to 452 and gas rigs falling by two to 115. The overall U.S. rig count, which also includes a loss of one miscellaneous rig, now totals 568. Total U.S. rigs are 26% lower than a year ago, oil rigs are down 21%, and gas rigs are off 40%.",
        class: "Bullish",
        reason: "",
        mu: 0.01,
        sigma: 0.007
      },      
      {
        index: 13,
        question: "In a report, Canadian Mortgage and Housing Corporation said that Canadian housing starts fell to a seasonally adjusted annual rate of 192.9K, from 219.4K in the preceding month whose figure was revised down from 220.6K. Analysts had expected Canadian housing starts to fall to 195.0K last month.",
        class: "Bearish",
        reason: "Slightly bearish as the result was slightly below analyst's expectation, but most of the info was already priced in",
        mu: -0.01,
        sigma: 0.005
      }, 
      {
        index: 14,
        question: "On November 30th 2016, the OPEC meeting ended up not materializing production cut (previously hinted to be around 700k bpd). The scenario has been hinted by Russia and Iran 2 weeks prior to the meeting, as both countries were unlikely to go through with the deal.",
        class: "Bearish",
        reason: "Given the fact that this is not an unexpected news, most of the price actions should have been priced in. But there should be an oil price plunge right after the meeting.",
        mu: -0.02,
        sigma: 0.012
      }, 
      {
        index: 15,
        question: "The British government has finalized their commitment to quit the EU union. Investors are rushing towards safe-heaven bonds among Canadian and U.S soverign bonds.",
        class: "Bearish",
        reason: "this would be similar to the aftermath effect of Brexit results, but not expected to be as dramatic. Yields across curves are expected to drop as bond prices rise due to high bids",
        mu: -0.02,
        sigma: 0.02
      }, 
      {
        index: 16,
        question: "S&P has downgraded Canada's Alberta bond ratings from AA to A-",
        class: "Neutral",
        reason: "This should not have an immediate effect on the equity market side, though it will cause Alberta yield spreads to widen against well-performing provinces such as Ontario",
        mu: -0.002,
        sigma: 0.002
      }, 
      {
        index: 17,
        question: "The entire population of Fort McMurray, about 90,000 people, was forced to flee nearly two weeks ago as the uncontrolled wildfire raged through some neighborhoods and destroyed about 15 percent of structures.  On Monday, the blaze continued to burn uncontrolled, now covering 285,000 hectares (704,000 acres), officials said. By Monday evening it was moving 30 to 40 meters (98 to 131 feet) every minute and had jumped a critical firebreak north of the city to push into the oil sand camp areas. ",
        class: "Bearish",
        reason: "Unexpected natural disaster on a massive scale and affecting Alberta's oil production, which is a huge part of their economy. Nonetheless, Canadian equity indexes are heavily concentrated with energy stocks.",
        mu: -0.032,
        sigma: 0.01
      }, 
      {
        index: 18,
        question: "Pirate attack to Nigeria cargoes shipping crude oil barrels.",
        class: "Bullish",
        reason: "Short term speculative news as traders expect oil productions to be slown down, causing oil prices to appreciate",
        mu: 0.025,
        sigma: 0.012
      }, 
      {
        index: 19,
        question: "The Chinese Manufacturing Index (PMI) just reported 51.2 YTD against a forecast of 70.2, dropping 20 pts from previous month.",
        class: "Bearish",
        reason: "huge discrepancy in outcome and forecast, this shows that China is slowing down and this will be bad for oil demand, leading other indexes to fall as well",
        mu: -0.04,
        sigma: 0.011
      }, 
      {
        index: 20,
        question: "Bifinex, the third largest exchange for Bitcoin transactions, has just reported that 100M worth of Bitcoins were hacked.",
        class: "Neutral",
        reason: "Does not necessarily have to do with the state of our economy",
        mu: -0.001,
        sigma: 0.001
      }, 
      {
        index: 21,
        question: "Almost two years after an unattended oil train derailed and exploded in Quebec, killing 47 people, the U.S. and Canadian governments jointly set new rules designed to reduce the risks of hauling crude by rail.",
        class: "Neutral",
        reason: "This is simply just a statement",
        mu: 0.001,
        sigma: 0.001
      }, 
      {
        index: 22,
        question: "Osama Bin Laden has just been confirmed to be still alive through Al-Quaida's recent video posts. Location cannot be confirmed.",
        class: "Neutral",
        reason: "This has nothing to do with the economy, though reminding the aftermath of 911, this should still be a bearish event, though not very extreme",
        mu: -0.004,
        sigma: 0.005
      }, 
      {
        index: 23,
        question: "The Federal Reserves has just announced that they will hike rates by 25bps, inline with expectations and futures market probability estimates",
        class: "Bullish",
        reason: "",
        mu: 0.02,
        sigma: 0.009
      }       

    ];





// var n = news();
// console.log(n);

//TODO, declare a nj var pointing to numjs library
// var nj = require('numjs');
function endrealizedPnL(){

   var unrealizedPnL = parseFloat(document.getElementById("unrealized").innerHTML);
   var realizedPnL = parseFloat(document.getElementById("realized").innerHTML);

   document.getElementById("realized").innerHTML = realizedPnL + unrealizedPnL;
   document.getElementById("unrealized").innerHTML = 0;

}

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

function generateUniqueRandom(upper_bound){
   var ret = [];
   for (var i = 1; i < upper_bound; i++){
       ret.push(i);
   }
   return ret;
}


function shuffle(array, total_news){
   var i = array.length,
       j = 0,
       temp;

   while (i--){
       j = Math.floor(Math.random() * (i+1));
       // swap randomly chosen element with current element
       temp = array[i];
       array[i] = array[j];
       array[j] = temp;
   }
   return array.splice(0,total_news);
}

function collect_params(interval, total_news) {
    
    //Database ###################
    // var news_index = [];

   //create a list of news index, which goes from 0 - 23 because we only have 23 news stored in our database
   //if we random chose 8 news, then there will be 8 news_indexes
   var news_index = shuffle(generateUniqueRandom(23), total_news);
    console.log("num of news index: " + news_index.length);
    console.log(total_news);   

    var mean = [];
    var sigma = [];
    var texts= [];

   for(var i=0; i<news_index.length; i++){
      texts.push(sampleNews[news_index[i]]['question']);
      mean.push(sampleNews[news_index[i]]['mu']);
      sigma.push(sampleNews[news_index[i]]['sigma']);
   }
     //  console.log(news_index[i]);

   //  //generate news index
   // for (var i=0; i < total_news.length; i++) {
   //     news_index.push(generateInterval(0, 23));
   //  }
   
    //var news_index = random.sample(range(0,23), total_news);

    // var news_index_mean = [];
    // var news_index_sigma = [];
    // var news_text = [];


    // //get from 'database' [4,1,5,3]
    // // sampleNews.forEach( function (arrayItem)
    // // {
    // //     news_index_mean.push(arrayItem.mu);
    // //     news_index_sigma.push(arrayItem.sigma);
    // //     news_text.push(arrayItem.question);
    // // });


    // // var news_index_mean = [-0.04,0.4,-0.02,-0.01,0.05,-0.03,-0.01,-0.07,0.005,-0.03];
    // // var news_index_sigma =  [0.025,0.12,0.01,0.005,0.02,0.02,0.005,0.04,0.005,0.015];

    // var mean = [];
    // var sigma = [];
    // var texts= [];
    // for (var i=0; i < interval.length; i++) {
    //     //fetch from database based on their column value

    //     // mean.push(news_index[i].mean);
    //     // sigma.push(news_index[i].sigma);

    //     mean.push(news_index_mean[i]);
    //     sigma.push(news_index_sigma[i]);
    //     texts.push(news_text[i]);
    // }

    // for i in range(0,len(interval)):
    //     #fetch from database based on their column value
    //     mean.append(news_index[i].mean)
    //     sigma.append(news_index[i].sigma)
    
    var return_list = [mean,sigma,texts,news_index];
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
    var number_of_news = generateInterval(7,10);
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
      // console.log("haha" + interval[interval.length-1]);
      interval.push(simulation_time+1); 
    }

    // collect mean, sigma

    var results_list =  collect_params(interval, total_news);

    var mean = results_list[0]; 
    var sigma = results_list[1];
    var text = results_list[2];

    // for (var i = 0; i < interval.length; i++) 
    //   console.log(interval[i]);

    // for (var i = 0; i < mean.length; i++) 
    //   {console.log(mean[i]);
    //     console.log(sigma[i]);
    //     console.log(text[i]);
    //   }
 

    // console.log(mean.length);
    // console.log(sigma.length);


    
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

  var results_list_2 = [price_list,text,interval];
  return results_list_2;
}



$(function () {

  var results_list_2 = main();
  var prices = results_list_2[0];
  var texts = results_list_2[1];
  var interval = results_list_2[2];
  var news_index = results_list_2[3];


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

      if (interval.indexOf(point_ctr) != -1 ){
        document.getElementById("news").innerHTML += ('<tr><td>' + texts[next_interval] + '</td></tr>' );
        next_interval++;
      }


               


      myLiveChart.addData([x], Math.round(point_ctr));
      point_ctr++;
      document.getElementById("marketprice").innerHTML =x.toFixed(2);
      unrealizedPnL();


  }
  else{
    endrealizedPnL();
    return;
  }

  if (point_ctr >= 20) {
      myLiveChart.removeData();
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