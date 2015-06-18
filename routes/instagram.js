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
		complete: function(data) {
			res.json(buildGeoJson(data));
	  	}
	});
};

function harvester() {

	Instagram.tags.recent({
		name: 'Greenpoint',
		complete: function(data,pagination) {
			//regex strips the underscore and additional numbers from the ID that comes back
			
			for(each in data) {
				if(data[each].location != null){
					var regex = /^[^_]+(?=_)/g;
					var dbDocument = {
						id : regex.exec(String(data[each].id))[0],
						coordinates : [ data[each].location.longitude, data[each].location.latitude ],
						img_hi_res : data[each].images.standard_resolution.url,
						img_lo_res : data[each].images.low_resolution.url,
						img_thumb : data[each].images.thumbnail.url,
						time : data[each].created_time
					};
				};
				console.log("Already existing photos added to DB:" + dbDocument.id)
				
				var insta = new instagramModel(dbDocument); // new db document
				 //save to database
				insta.save(function(err){
					if(err) { console.log(err) }
					else { console.log("saved harvested photos " + dbDocument.id) }
				});
			};	
		}
	});
};

function getNewest(id) {
	console.log("getting newest photos...")
	Instagram.tags.recent({
		name: 'Greenpoint',
		MAX_TAG_ID: id,
		complete: function(data,pagination) {
			
			//console.log(data)
			//console.log(pagination)
			for(each in data) {
				if(data[each].location != null){
					//regex strips a non-relevant number string from the ID that comes back
					var regex = /^[^_]+(?=_)/g;
					var dbDocument = {
						id : regex.exec(String(data[each].id))[0],
						coordinates : [ data[each].location.longitude, data[each].location.latitude ],
						img_hi_res : data[each].images.standard_resolution.url,
						img_lo_res : data[each].images.low_resolution.url,
						img_thumb : data[each].images.thumbnail.url,
						time : data[each].created_time
					};
				};
				console.log("Newest photos added to DB:" + dbDocument.id)
				
				//var insta = new instagramModel(dbDocument); // new db document
				 //save to database
				// insta.save(function(err){
				// 	if(err) { console.log(err) }
				// 	else { console.log("saved newer photos " + dbDocument.id) }
				// });
			};	
		}
	});
};


function mostRecent() {
	console.log("Getting information on most recent photo")

	instagramModel.findOne({},{},{sort:{ 'created-at':-1 } },function(err, record){
	    if (err) {
	    	console.error('uhoh something went wrong');
	    	console.error(err);
		}
		else if (record == null) {
	    	console.log("There were no photos in the database. Harvesting some now!")
	    	harvester();
		} else if(record != null) {
	    	//console.log("found newest photo in database, with id: " + record.id);
	    	console.log(record);
	    	console.log("getting any new photos after this one.")
	    	getNewest(record.id);
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
	var data = req.body;
	console.log('POST from Instagram ocurred');
	mostRecent();
	
	
    //res.status(200).send("Thanks!");

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
		      "id": incoming_data[each].id,	
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
	return geojson;
	};



