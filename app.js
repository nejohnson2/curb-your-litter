var ejs = require('ejs')
	, partials = require('express-partials')
	, api = require('instagram-node').instagram()
	, express = require('express')
	, app = express();

var routes = require('./routes/index.js');	
var instagram = require('./routes/instagram.js');	

api.use({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET
});

var redirect_uri = 'http://curb-your-litter.com/handleauth';

app.configure(function(){

	app.use(partials());
	app.engine('html', require('ejs').renderFile); //renders .ejs as html
	
	app.set('views', __dirname + '/views');
	app.use(express.static(__dirname + '/public'));
	
	app.use(express.bodyParser()); //deals with incoming request objects
	app.use(express.methodOverride());
	    
	/**** Turn on some debugging tools ****/
	app.use(express.logger()); // sends messages into the terminal 
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); //dumpExceptions - directs exceptions to stderr - showStack - generate HTML for an exception å
    
});

app.get('/', routes.main);

// This is where you would initially send users to authorize
app.get('/authorize_user', instagram.authorize_user);
// This is your redirect URI
app.get('/handleauth', instagram.handleauth);

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});