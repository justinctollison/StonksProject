function submitData(){
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

    fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=AMC%2CGME", configuration)
    .then(function(response){
        return response.json();
    })
    .then(function(object){
        console.log(object)
    })
    .catch(function(error){
        alert("This ain't it chief.");
        console.log(error.message)
    });
}