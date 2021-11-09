let LocationInputEl = document.querySelector("#location");
let LocationFormEl = document.querySelector('#location-form');
let historyDivEl = document.querySelector('#history')
let conditionsEl = document.querySelector('#weather')


// ??? why is this city variable working ??
var getWeather = function(city) {
    // format the github api url
    // var apiUrl = "https://api.github.com/users/" + user + "/repos";
    // 'https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=78f0fb365d40d76ade73efbcbef1c0aa'
   
    let locationUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city +'&appid=78f0fb365d40d76ade73efbcbef1c0aa'
    // var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=78f0fb365d40d76ade73efbcbef1c0aa'
    // temp, wind and humidity
    console.log(city);
    // make a request to the url
    fetch(locationUrl)
        .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                // displayRepos(data, user);
                let longitude = data.coord.lon;
                let latitude = data.coord.lat;
                let coordUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' +latitude + '&lon='+longitude+'&exclude=minutely,hourly&appid=78f0fb365d40d76ade73efbcbef1c0aa'
                fetch (coordUrl)
                    .then(function(response){
                        response.json().then(function(data){
                            console.log(data);
                            displayWeather(data.daily); 
                        })
                    })
                    .catch(function(error){
                        alert('unable to connect to OpenWeather')
                    })
            });
            } else {
                alert("Error: Location Not Found");
            }
        })
        .catch(function(error) {
            console.log(error);
            alert("Unable to connect to OpenWeather");
        });
};

LocationInputEl.placeholder = "enter a city ";
let formSubmitHandler = function(event) {
    event.preventDefault();
    let location = LocationInputEl.value.trim();
    console.log(location)
    saveCity();
    // createHistory();
    getWeather(location);
    LocationInputEl.textContent = ''; 
    console.log(location)
    // return location; 
}

// let createHistory = function(location) {
//     let listHistoryEl = document.createElement('ul');
//     let listItemEl = document.createElement('li');
//     historyDivEl.appendChild(listHistoryEl);
//     listHistoryEl.appendChild(listItemEl)
//     // listHistoryEl.textContent = location; 
//     console.log (location)
//     var queryString = document.location.search;
//     console.log(document.location.search)
//     let savedName = queryString.split("=")[1];
//     listItemEl.textContent = savedName;
//     console.log(savedName)

// }

let saveCity = function(){
    console.log('this fired')
    let savedCityArr = [];
    savedCityArr.push(location);
    
    for (let i = 0; i < savedCityArr.length; i++) {
        // if ()
        // savedCityArr.push(city[i]); 
      
        let savedCityEl = document.createElement('p');
        savedCityEl.textContent= savedCityArr[i];
        historyDivEl.appendChild(savedCityEl);
        console.log(location)
        console.log('fired')

        
    }
    localStorage.setItem('histroy', JSON.stringify(savedCityArr));
}

let displayWeather = function(data){
    console.log(data.current)
    // console.log(data)
    for (let i = 0; i < 5; i++) {
        let dailyEl = data[i] 
        console.log (data[i])
        let forecastEl = document.createElement('div');
        conditionsEl.appendChild(forecastEl);
        forecastEl.textContent = dailyEl.temp.day
        // console.log(dailyEl.temp.day)
    }

}


 LocationFormEl.addEventListener("submit", formSubmitHandler);




// var userFormEl = document.querySelector("#location-form");
// var LocationInputEl = document.querySelector("#location");
// LocationInputEl.placeholder = "enter a city ";
// var formSubmitHandler = function(event) {
//     event.preventDefault();
//     // get value from input element
//     var location = LocationInputEl.value.trim();
//     console.log(location)

//     if (location) {
//         getUserRepos(username);
//         // LocationInputEl.value = "";
//     } else {
//         alert("Please enter a city");
//     }
//     console.log(event)
//   };

 

//   var displayRepos = function(repos, searchTerm) {
    
//     // clear old content
//     repoContainerEl.textContent = "";
//     repoSearchTerm.textContent = searchTerm;
//     // the following block displays repos
//     // loop over repos
//     for (var i = 0; i < repos.length; i++) {
//         // format repo name
//         var repoName = repos[i].owner.login + "/" + repos[i].name;
  
//         // create a container for each repo
//         var repoEl = document.createElement("a");
//         repoEl.classList = "list-item flex-row justify-space-between align-center";
       
//         // create a span element to hold repository name
//         var titleEl = document.createElement("span");
//         titleEl.textContent = repoName;
  
//         // append to container
//         repoEl.appendChild(titleEl);
  
//         // create a status element
//         var statusEl = document.createElement("span");
//         statusEl.classList = "flex-row align-center";

//         // check if current repo has issues or not
//         if (repos[i].open_issues_count > 0) {
//         statusEl.innerHTML =
//             "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
//         } else {
//         statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
//         }

//         // append to container
//         repoEl.appendChild(statusEl);

//         // append container to the dom
//         repoContainerEl.appendChild(repoEl);
//     }
// }; 
// // getFeaturedRepos("javascript"); to see the reponse object
// var getFeaturedRepos= function(language) {
//     var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";
//     fetch(apiUrl).then(function(response) {
//         if (response.ok) {
//           response.json().then(function(data) {
//             displayRepos(data.items, language);
//           });
//         } else {
//           alert('Error: GitHub User Not Found');
//         }
//     });
// }