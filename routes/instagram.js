var instagramModel = require('../models/instagram_model.js');

Instagram = require('instagram-node-lib');

Instagram.set('client_id', process.env.CLIENT_ID);
Instagram.set('client_secret', process.env.CLIENT_SECRET);
Instagram.set('callback_url', 'http://curb-your-litter.herokuapp.com/callback');
Instagram.set('redirect_uri', 'http://curb-your-litter.herokuapp.com:5000');
Instagram.set('maxSockets', 10);

Instagram.subscriptions.subscribe({
  object: 'tag',
  object_id: 'NewEngland',
  aspect: 'media',
  callback_url: 'http://curb-your-litter.herokuapp.com/callback',
  type: 'subscription',
  id: '#'
});


/*
	GET /instagram
*/
exports.instagram = function(req, res){

	/*
	
		Playground
	
	*/

	Instagram.tags.recent({
	  name: 'newengland',
	  complete: function(data) {
	  	var templateData = {
	      	'title' : 'Instagram Images #NewEngland',
	      	'data' : data,
	  	};
	
	  	//io.sockets.emit('first_show', templateData);
	    res.render('instagram.html', templateData);
	  }
	});
	// This is what this function will really use.
	//res.render('BensFile.html');
};
/*
	Get /insta-api
*/
exports.instagramApi = function(req, res){
	/*
		1. Client requests database data
		2. Serve gets data from db
		3. Verify lat/lon
		4. Generate geojson
		5. Send to client
	*/

    res.send(data)
};

/*
	GET /callback
*/
exports.callback = function(req, res){
    var handshake =  Instagram.subscriptions.handshake(req, res);
	console.log("Handshake");
    console.log(handshake);
};

/* 
	POST /callback
*/
exports.post_callback = function(req, res) {
	/*
		This is where instagram will make the post request with new data.
		Now we need to take that data and send it to the database but only 
		the part that we need.
		
		1. Take incoming data from instagram and subset
		2. Save to mongodb
	*/
	console.log('called back');
	console.log(req.body);
	
	var data = req.body;
//	var insta = new instagramModel(saveData); // new astronaut document
//	insta.save(); //save to database
    res.end();

};

function buildGeoJson(incoming_data){
	
	
}