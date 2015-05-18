var ejs = require('ejs')
	, partials = require('express-partials')
	, express = require('express')
	, app = express();

var routes = require('./routes/index.js');	
/*
var instagram = require('./routes/instagram.js');	


api.use({
  client_id: 'aee1ef05f261441db8c6b92c3d74a1e2',
  client_secret: '86f15bb5ca394bd28684dd0ea2905e87'
});

var redirect_uri = 'http://curb-your-litter.com/handleauth';
*/

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
//app.get('/authorize_user', exports.authorize_user);
// This is your redirect URI
//app.get('/handleauth', exports.handleauth);

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});