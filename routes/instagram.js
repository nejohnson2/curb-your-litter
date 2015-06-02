var instagramModel = require('../models/instagram_model.js');

Instagram = require('instagram-node-lib');

Instagram.set('client_id', process.env.CLIENT_ID);
Instagram.set('client_secret', process.env.CLIENT_SECRET);
Instagram.set('callback_url', 'http://curb-your-litter.herokuapp.com/callback');
Instagram.set('redirect_uri', 'http://curb-your-litter.herokuapp.com:5000');
Instagram.set('maxSockets', 10);

Instagram.subscriptions.subscribe({
  object: 'tag',
  object_id: 'Greenpoint',
  aspect: 'media',
  callback_url: 'http://curb-your-litter.herokuapp.com/callback',
  type: 'subscription',
  id: '#'
});

exports.map = function(req,res){
	
	res.render('map.html');
};

/*
	GET /instagram
*/
exports.instagram = function(req, res){

	Instagram.tags.recent({
		name: 'Greenpoint',
		complete: function(data, pagination) {
			console.log(data)
			var page = pagination;
			console.log(page)
			res.json(buildGeoJson(data));
	  	}
	});
};

/*
	GET /callback
*/
exports.callback = function(req, res){
    var handshake =  Instagram.subscriptions.handshake(req, res);
	//console.log("Handshake");
    //console.log(handshake);
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
	//console.log(req.body);
	
	var data = req.body[0].data;

	console.log(data)
	// var insta = new instagramModel(data); // new astronaut document
	// insta.save(); //save to database
    res.end();

};

function buildGeoJson(incoming_data){

	var geojson = {};
	geojson['type'] = 'FeatureCollection';
	geojson['features'] = [];

	for (var each in incoming_data){
		if(incoming_data[each].location != null) {
			var newFeature = {
		    	"type": "Feature",
		    	"geometry": {
		     	"type": "Point",
		      	"coordinates": [incoming_data[each].location.longitude, incoming_data[each].location.latitude
		    ]},
		    "properties": {
		      "img_hi_res": incoming_data[each].images.standard_resolution.url,
		      "img_lo_res": incoming_data[each].images.low_resolution.url,
		      "img_thumb": incoming_data[each].images.thumbnail.url,
		      "time": incoming_data[each].created_time,
		      "icon": {"iconUrl": "http://png-2.findicons.com/files/icons/1508/sketchcons_x/128/trash.png","iconSize": [35,35],"iconAnchor": [25, 25],"popupAnchor": [0, -25],"className": "customMaker"}
		    	}
		  }
		  geojson['features'].push(newFeature);
		};
	};
	//console.log(geojson);
	return geojson;
	};



