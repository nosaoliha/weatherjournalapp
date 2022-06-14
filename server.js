//this setup empty javascript object to act as endpoint for all routes
	projectData = {}

//this requires Express to run server and routes
let express = require('express')
let bodyParser = require('body-parser')
let cors = require('cors')
let fetch = require('node-fetch')

//this start up an instance of app
let app = express()

/* Middleware*/
//this configures express to use body-parser as middle-ware.
	app.use(bodyParser.urlencoded({extended: false}))
	app.use(bodyParser.json())

//this cors for cross origin allowance
	app.use(cors())

//this initializes the main project folder
	app.use(express.static('website'))

//this is to GET Route to retrieve projectData
	app.get('/api/projectdata', (req, res) => {
	res.status(200).send(projectData)
})

//this is to POST Route to store date, temp and user input in projectData
	app.post('/api/projectdata', (req, res) => {
let {date, temp, content} = req.body
	projectData[date] = {
    temp,
    content,
}
	res.status(201).send()
})

//this is to setup Server
	app.listen(8080, () => {
	console.log('Running server on port 8080 with CORS enabled.')
})