


function sell(){
    
    //get current position
    var currentposition = parseInt(document.getElementById("position").innerHTML);
    var size = document.getElementById("size").value;
    
    if (size != "" && size != "0" && size > "0"){
        
        var marketprice = parseFloat(document.getElementById("marketprice").innerHTML);
        var realizedPnL = parseFloat(document.getElementById("realized").innerHTML);
        
        //consider short selling:
        if (currentposition == "0"){
            
            //negative position
            document.getElementById("averagecost").innerHTML = marketprice;
        }
        else{
            //get the current average cost prior to purchase and the unrealized pnl
            var averagecost = parseFloat(document.getElementById("averagecost").innerHTML);
            var unrealizedPnL = parseFloat(document.getElementById("unrealized").innerHTML) - (marketprice - averagecost) * size;
            document.getElementById("realized").innerHTML = (realizedPnL + size * (marketprice-averagecost)).toFixed(2);
        }
    
        //update current position after the purchase
        document.getElementById("position").innerHTML = parseInt(currentposition) - parseInt(size);
    
    }
    
    else
        document.getElementById("size").value = 0;
}

function buy(){
    
    
    //get current position
    var currentposition = parseInt(document.getElementById("position").innerHTML);
    var size = document.getElementById("size").value;
    
    if (size != "" && size != "0" && size > "0"){
        
        //get the current average cost prior to purchase and the unrealized pnl
        var averagecost = parseFloat(document.getElementById("averagecost").innerHTML);
        var realizedPnL = parseFloat(document.getElementById("realized").innerHTML);
        var marketprice = parseFloat(document.getElementById("marketprice").innerHTML);
        
        //cover short trades
        if (currentposition < "0"){
            var unrealizedPnL = parseFloat(document.getElementById("unrealized").innerHTML);
            document.getElementById("realized").innerHTML = (realizedPnL + size * (averagecost - marketprice)).toFixed(2);  
            //document.getElementById("unrealized").innerHTML = unrealizedPnL - size * (averagecost - marketprice);
            
        }
        
        //need to retrieve current market price, at least capture the interval[i] in order to match a price by dictionary
        var newaveragecost = parseFloat(Math.abs(averagecost * currentposition) + (size * marketprice))/(parseInt(Math.abs(currentposition)) + parseInt(size)).toFixed(2);
        
        //update current position after the purchase
        document.getElementById("position").innerHTML = parseInt(currentposition) + parseInt(size);
        document.getElementById("averagecost").innerHTML = newaveragecost.toFixed(2);
    }
    else
        document.getElementById("size").value = 0;
 
    
}

