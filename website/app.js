/* Global Variables */
//these HTML elements listens for click events, get values, update dynamically and configure the OpenWeatherApi
let button = document.getElementById('generate')
let zip = document.getElementById('zip')
let feelings = document.getElementById('feelings')
let date = document.getElementById('date')
let temp = document.getElementById('temp')
let content = document.getElementById('content')
let url = 'https://api.openweathermap.org/data/2.5/weather'
let APIKey = '56a13938398c2a6da8160476adbc71e6'

//this is to create a new date instance dynamically with javascript
let d = new Date()
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear()

//this is to fetch weather data from OpenWeatherApi
let fetchWeather = async (baseURL, zip, apiKey) => {
	try {
let request = await fetch(
	`${baseURL}?zip=${zip},us&units=metric&APPID=${apiKey}`,
)
let result = await request.json()

//this destructuring of the result object
let {
	main: {temp},
} = result
	return temp
} catch (e) {
	throw e
}
}

//this is to POST Request to store date, temp and user input
let saveData = async (path, data) => {
	try {
	await fetch(path, {
	method: 'POST',
	headers: {
	'Content-Type': 'application/json',
},
	body: JSON.stringify(data),
})
} catch (e) {
	throw e
}
}

//this is to update UI dynamically
let updateUI = async (temperature, newDate, feelings) => {
	date.innerText = newDate
	temp.innerText = `${temperature} deg`
	ontent.innerText = feelings
}

//this listens for click events
	button.addEventListener('click', () => {
	fetchWeather(url, zip.value, APIKey)
	.then(temp => {
	return {date: newDate, temp, content: feelings.value}
})
	.then(data => {
	saveData('/api/projectdata', data)
	return data
})
	.then(({temp, date, content}) => updateUI(temp, date, content))
	.catch(e => {

//this is for error handling with UI
	console.error(e)
})
})