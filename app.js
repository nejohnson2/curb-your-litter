var express = require('express');
var path = require('path');

var app = express();

var routes = require('./routes/index.js');	
var instagram = require('./routes/instagram.js');	

/* var api = require('instagram-node').instagram() */

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
});

/*
	Main Page Routes
*/
app.get('/', routes.main);


/*
	Instagram Routes
*/
app.get('/instagram', instagram.instagram);
app.get('/callback', instagram.callback);
app.post('/callback', instagram.post_callback);




/************* *************/
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});