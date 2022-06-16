//this setup empty javascript object to act as endpoint for all routes.
let projectData = {};

//this requires Express to run server and routes.
let http = require('http');
let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let cors = require('cors');

//this start up an instance of app
let app = express();

/* Middleware*/
//this configures express to use body-parser as middle-ware.
	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

//this cors for cross origin allowance
	app.use(cors());

//this initializes the main project folder
	app.use(express.static('website'));

//this is to GET Route to retrieve projectData
	app.get('/projectData', (req, res) => {  
	res.status(200).send(projectData);
});

//this is to POST Route to store date, temp and user input in projectData
	app.post('/projectData', (req, res) => {
	projectData = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content
};
	console.log(projectData);
	res.status(200).send({
    sucess: true,
    message: "Data saved successfully",
    data: projectData
});
})

//this is to setup Server
let port = 8000;
let hostname = 'localhost';
let server = http.createServer(app);
	server.listen(port, hostname, () => console.log(`Server running on http://${hostname}:${port}`));
