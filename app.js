var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 5000;

var io = require('socket.io').listen(app.listen(port));

var routes = require('./routes/index.js');	
var instagram = require('./routes/instagram.js');	

//require('./socket.js').configureSocketIOEvents(io);

// https://devcenter.heroku.com/articles/using-socket-io-with-node-js-on-heroku
/*
io.configure(function () {
  io.set("transports", [
    'websocket'
    , 'xhr-polling'
    , 'flashsocket'
    , 'htmlfile'
    , 'jsonp-polling'
  ]);
  io.set("polling duration", 10);
});
*/

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
