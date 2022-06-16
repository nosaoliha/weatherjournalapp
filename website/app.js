/* Global Variables */
//these HTML elements listens for click events, get values, update dynamically and configure the OpenWeatherApi
//http://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&APPID={APIKEY}
const APIKEY = '56a13938398c2a6da8160476adbc71e6&units=metric;
let apiBaseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let fetchWeather = async function (url) {
let response = await fetch(url);
	try {
let data = await response.json();

//this destructuring of the result object
    return data;
  } catch (err) {
    console.log("Err:", err)
  }
}

//this is to fetch weather data from OpenWeatherApi
let handleGenerate= async function() {
let zip = document.getElementById('zip').value;
let content = document.getElementById('feelings').value;
let url = `${apiBaseUrl}${zip}&APPID=${APIKEY}`;
  
	if (zip.length === 0 || feelings.length === 0) {
    alert("Please fill up all values !");
    return
  }
let weatherData = await fetchWeather(url);
  
// console.log("weatherData=",weatherData);
let temp = weatherData.main.temp;

// Create a new date instance dynamically with JS
let d = new Date();
let date = d.getDate() + '.'+ (d.getMonth() + 1 )+ '.' + d.getFullYear();
let data = {
    date: date,
    temp: temp,
    content: content,
  }
  
//this is to POST Request to store date, temp and user input
	await postData("http://localhost:8000/projectData", data);
  
//this is to update UI dynamically
	updateUI();  
}
let updateUI=> async function() {
let dateDiv = document.getElementById('date');
let tempDiv = document.getElementById('temp');
let contentDiv = document.getElementById('content');
  
//Get data from owr own server
let UI_Data = await getData("http://localhost:8000/projectData");
  
//this is to update UI dynamically
	dateDiv.innerHTML = UI_Data.date;
	tempDiv.innerHTML = UI_Data.temp;
	contentDiv.innerHTML = UI_Data.content;
}

	async function postData(url,data) {
let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
	return await response.json(); 
}

let getData= async function(url) {
let response = await fetch(url)
	try {
let data = response.json();
    console.log(data);

//this is for error handling with UI    
    return data;
  } catch(err){
    console.log(err);
  }
 
}
//this listens for click events
let generateBtn = document.querySelector('#generate');
	generateBtn.addEventListener('click', handleGenerate);
