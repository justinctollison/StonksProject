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
    //configuration for fetch, requires API key in order to use yahoo finance
    const configuration = {
        method: "GET",
        headers: {
        "x-rapidapi-key": "481d539142msh5c8d0b19b0a28bcp1dc5aejsndd7860612836",
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        "useQueryString": true,
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
    }

    //fetch stock data from four symbols using the yahoo finance API, jsons it into a object, then uses the object in stocklist function
    fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=AMC%2CGME%2CNOK%2CBB", configuration)
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
        const stockTitle = document.createElement('li')
        stockTitle.id = stock.symbol
        stockTitle.innerText = stock.symbol
        listPanel.appendChild(stockTitle)
        stockTitle.addEventListener('click', function(e){
            stockInformation(stock)
            console.log("testing")
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
        <li><strong>Market Change</strong>: $ ${stock.regularMarketChange}</li>
        <li><strong>Market Change Percent</strong>:  ${stock.regularMarketChangePercent} %</li>
        <li><strong>Market Day Range</strong>: $ ${stock.regularMarketDayRange}</li>
        <br>
        `
        //adds a like button
        showPanel.innerHTML += `<button id=${stock.symbol}>I like the stock</button>`
        
        //adds a click event to the like button to display text after interaction
        document.querySelector('button').addEventListener('click', function(e){
            showPanel.innerHTML += "<strong>TO THE MOON"
        })
    }
//Event Listener 2:
//add functionality to persist likes in a server

//Event Listener 3:
//comment box
});
