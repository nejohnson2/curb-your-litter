var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');

//var io = require('socket.io').listen(app.listen(port)); // this is for sockets

var routes = require('./routes/index.js');	
var instagram = require('./routes/instagram.js');	

//require('./socket.js').configureSocketIOEvents(io);  // see socket.js file

app.configure(function(){

	app.set('views', __dirname + '/views');
	
	app.set('view engine','html');
	app.set('layout','layout');
	app.engine('html', require('hogan-express'));
	
	app.use(express.bodyParser()); //deals with incoming request objects
	app.use(express.methodOverride());
	    
	/**** Turn on some debugging tools ****/
	app.use(express.logger()); // sends messages into the terminal 
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 

	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));    
	
	app.db = mongoose.connect(process.env.MONGOLAB_URI);
	console.log("connected to database");
});

/*
	Main Page Routes
*/
app.get('/', routes.main);
app.get('/map', instagram.map);
/*
	Instagram Routes
*/
app.get('/harvester', instagram.harvester);
app.get('/instagram', instagram.instagram);
app.get('/callback', instagram.callback); 
app.post('/callback', instagram.post_callback); // route for Instagram subscription


var port = process.env.PORT || 5000;
app.listen(port, function(){
	console.log("Listening on " + port);
});