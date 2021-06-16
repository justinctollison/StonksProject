//todo:
    //Create Divs in order to manipulate the DOM
    //Create containers to hold information
    //Create a list, create a location for the chart, create a location for the statistics
    //fetch data from yahoo API, check that it works

//list panel
    //list of stonks
//show panel
    //current price
    //symbol name
    //company name
    //price change during day or at closing
    //percentage change at closing
    //(optional) a chart listing the changes in the week
    // overview data

//Loads everything at the same time on the web page
document.addEventListener("DOMContentLoaded", () => 
{
    //hides the object Object error on the top of the page lol
     setInterval(function(){ window.scrollBy(0,1); }, 1);

    //configuration for fetch, requires API key in order to use yahoo finance
    const configuration = {
        method: "GET",
        headers: {
        "x-rapidapi-key": "fde7b0ebc5msh853c0ef5e41b90cp1233b7jsnbe81d2d2ceb5",
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        "useQueryString": true,
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
    }

    //fetch stock data from four symbols using the yahoo finance API, jsons it into a object, then uses the object in stocklist function
    fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=AMC%2CGME%2CNOK%2CBB%2", configuration)
    .then(function(response){
        return response.json();
    })
    .then(function(stocks){
        console.log(stocks)
        stocks.quoteResponse.result.forEach(stock => stocksList(stock))
    })
    .catch(function(error){
        alert("This ain't it chief.");
        console.log(error.message)
    });

    //function to create a sidepanel list that will display the four stocks to select from, adds event listener to each one
    function stocksList(stock){
        const listPanel = document.querySelector('#list-panel')
        const stockTitle = document.createElement('ol')
        stockTitle.id = stock.symbol
        stockTitle.innerText = stock.symbol
        listPanel.appendChild(stockTitle)

        //event listener when clicking a stock name from the sidepanel list, executes stockinformation() function
        stockTitle.addEventListener('click', function(e){
            stockInformation(stock)
            console.log("testing")
        })
        
        //mouse over highlight to notify user that the sidepanel list is interactable
        stockTitle.addEventListener('mouseover', function(e){
            e.target.style.color = "orange"
            setTimeout(function(){
                e.target.style.color = "";
            }, 500);
        })
    }
//allow user to interact with sidelist OR search for stock
//display stock chart and statistics

//Event Listener 1: When the user clicks on an item in the list or submits a form, fetch the data for the stock
    //function to display information after the click event goes through
    function stockInformation(stock){
        const showPanel = document.querySelector("#show-panel")
        showPanel.innerHTML = `
        <ul><strong>${stock.shortName}</strong></ul>
        <br>
        <li><strong>Symbol</strong>: ${stock.symbol}</li>
        <li><strong>Current Price</strong>: $ ${stock.regularMarketPrice}</li>
        <li><strong>Previous Close</strong>: $ ${stock.regularMarketPreviousClose}</li>
        <li><strong>Market Change</strong>: $ ${stock.regularMarketChange.toFixed(2)}</li>
        <li><strong>Market Change Percent</strong>:  ${stock.regularMarketChangePercent.toFixed(1)} %</li>
        <li><strong>Market Day Range</strong>: $ ${stock.regularMarketDayRange}</li>
        <br>
        `

        //function to add chart/graph for visual respresentation
        function dataChart(){
            
            //creates array of data grabbed from API
            let data = [
                ["Market Open", stock.regularMarketOpen], 
                ["Market High", stock.regularMarketDayHigh],
                ["Market Low", stock.regularMarketDayLow],
                ["Market Close", stock.regularMarketPrice,]
            ]
            //Creates line chart
            chart = anychart.line();
            
            //plots data from array
            chart.line(data)
            
            //Sets title to chart
            chart.title(`${stock.symbol}`)
           
            //names the Axis
            chart.yAxis().title("Price, USD$")
            chart.xAxis().title("Market Data")
            
            //mouse over interactivity with chart
            chart.interactivity("by-x")

            //selects container div to display the chart
            const charts = document.querySelector("#container")
            //draws the chart
            charts.innerHTML = chart.draw()

            //chart's information, keep below the above code or it will not display the chart properly
            chart.container("container")

            //todo: there is an Object object at the top of the page, I suspect it's trying to display an object or array of information instead of the actual chart display
            //no idea how to fix it yet
        }
        dataChart()
        
        //adds a like button
        showPanel.innerHTML += `<button id=${stock.symbol}>I like the stock</button>`
        
        //adds a click event to the like button to display text after interaction
        document.querySelector('button').addEventListener('click', function(e){
            const message = ["Apes strong togeher.", "TO THE MOON", "DIAMOND HANDS", "HOLD"]
            const a = Math.floor(Math.random() * message.length)
            alert(message[a])
        })
    }

//Event Listener optional:
//comment box
});
