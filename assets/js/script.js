var LocationInputEl = document.querySelector("#location");
let LocationFormEl = document.querySelector('#location-form');
let historyDivEl = document.querySelector('#history')
let conditionsEl = document.querySelector('#weather')
let currentEl = document.querySelector('#current')
let forecastEl = document.querySelector('#forecast')



var getWeather = function(city) {
    let locationUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city +'&appid=78f0fb365d40d76ade73efbcbef1c0aa'
    fetch(locationUrl)
        .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                // displayRepos(data, user);
                let longitude = data.coord.lon;
                let latitude = data.coord.lat;
                let coordUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' +latitude + '&lon='+longitude+'&exclude=minutely,hourly&units=imperial&appid=78f0fb365d40d76ade73efbcbef1c0aa'
                fetch (coordUrl)
                    .then(function(response){
                        response.json().then(function(data){
                            console.log(data);
                            displayWeather(data.daily,data.current); 
                            
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
    
};

LocationInputEl.placeholder = "enter a city ";
let formSubmitHandler = function(event) {
    event.preventDefault();
    let location = LocationInputEl.value.trim();
    saveCity(location);
   
    getWeather(location);
    createCity()
    console.log(location)
    
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
let savedCityArr = [];
let loadCity = function() {
    
    let savedCity = JSON.parse(localStorage.getItem('history'))

    if (!savedCity) {
        return false;
    }   

    console.log('saved fired again')
    console.log(savedCity);
    console.log(savedCityArr)
    savedCityArr = savedCity;
    
}
loadCity();

let saveCity = function(location){
    console.log('this fired')
    
    savedCityArr.push(location);
    localStorage.setItem('history', JSON.stringify(savedCityArr));
    
}




// current weather display
let currentCityEl= document.createElement('h2')

let currentDateEl = document.createElement('h2')
let currentIconEl = document.createElement('h2')
let currentUlEl = document.createElement('ul');
let currentTemp = document.createElement('li');
let currentWind = document.createElement('li');
let currentHumidity = document.createElement('li');
let currentUv =document.createElement('li');
currentEl.appendChild(currentCityEl);

currentEl.appendChild(currentDateEl);
currentEl.appendChild(currentIconEl);
currentEl.appendChild(currentUlEl);
currentUlEl.appendChild(currentTemp);
currentUlEl.appendChild(currentWind);
currentUlEl.appendChild(currentHumidity);
currentUlEl.appendChild(currentUv);
currentUlEl.id ='currentlist';
currentUv.id ='uv'
if (currentUv>1){
    currentUv.setAttribute('style','background-color:rgb(190, 149, 115)')
} else {
    currentUv.setAttribute('style','background-color:rgb(124, 196, 139)')
}

// listEl.setAttribute("style","background-color:#333;padding:20px;");


// forecast weather display
let displayWeather = function(data, current){



    currentTemp.textContent = 'Temp: ' + current.temp + ' F';
    currentWind.textContent = 'Wind: ' +current.wind_speed + ' MPH';
    currentHumidity.textContent = 'Humidity: ' +current.humidity +'%';
    currentUv.textContent = 'UV Index: ' + current.uvi;
    currentCityEl.textContent = LocationInputEl.value.trim()
    currentDateEl.textContent = moment().format('dddd,MMM DD')
    currentIconEl.innerHTML = `<img src= 'http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png'>`
   
    for (let i = 0; i < 5; i++) {
       removeforecast();
    }
   
    for (let i = 0; i < 5; i++) {
        let daily = data[i] 
        var forecastDivEl = document.createElement('div');
        forecastDivEl.id = 'remove'
        var forecastUlEl = document.createElement('ul')
        forecastUlEl.id = 'forecast-card'
        forecastEl.appendChild(forecastDivEl);
        forecastDivEl.appendChild(forecastUlEl);
        var forecastLi1El = document.createElement('li');
        forecastUlEl.appendChild(forecastLi1El);
        var forecastLi2El = document.createElement('li');
        forecastUlEl.appendChild(forecastLi2El);
        var forecastLi3El = document.createElement('li');
        forecastUlEl.appendChild(forecastLi3El);
        var forecastLi4El = document.createElement('li');
        forecastUlEl.appendChild(forecastLi4El);
        var forecastLi5El = document.createElement('li');
        forecastUlEl.appendChild(forecastLi5El);
        let date = moment();
        forecastLi1El.textContent = date.add(i+1,'d').format('dddd,MMM DD')
        forecastLi2El.innerHTML = `<img src= 'http://openweathermap.org/img/wn/${daily.weather[0].icon}@2x.png'>`
        forecastLi3El.textContent = 'Temp:' + daily.temp.day + ' F';
        forecastLi4El.textContent = 'Wind:' + daily.wind_speed + ' MPH';
        forecastLi5El.textContent = 'Humidity:' +daily.humidity + ' %';
    }
    
     
}

let removeforecast = function () {
    let removeThisEl = document.querySelector('#remove')
    if (removeThisEl) {
        removeThisEl.remove();
    }
}


let createCity = function() {
    historyDivEl.innerHTML='';
    for (let i = 0; i < savedCityArr.length; i++) {
        let savedCityEl = document.createElement('button');
        savedCityEl.id ='savedbtn'
        savedCityEl.textContent= savedCityArr[i];
        historyDivEl.appendChild(savedCityEl);
      console.log('history fired')
    }
}
    
createCity();

let histroyHandler = function(event) {
    event.preventDefault();
    console.log(event);
}


historyDivEl.addEventListener('click', histroyHandler)
LocationFormEl.addEventListener("submit", formSubmitHandler);



