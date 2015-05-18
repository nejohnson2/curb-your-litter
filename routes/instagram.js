var api = require('instagram-node').instagram()

api.use({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET
});

var redirect_uri = 'http://curb-your-litter.com/handleauth';

exports.authorize_user = function(req, res) {
  res.redirect(api.get_authorization_url(redirect_uri, { scope: ['likes'], state: 'a state' }));
};

exports.handleauth = function(req, res) {
  api.authorize_user(req.query.code, redirect_uri, function(err, result) {
    if (err) {
      console.log(err.body);
      res.send("Didn't work");
    } else {
      console.log('Yay! Access token is ' + result.access_token);
      res.send('You made it!!');
    }
  });
};

        
/*
	GET /instagram
*/
exports.instagram = function(req, res){

	api.tag_media_recent('NewEngland', function(err, medias, pagination, remaining, limit) {
		//console.log(medias);
		console.log("Error: " + err);
		console.log("Pagination: ");
		console.log(pagination);
		console.log("remaining: " + remaining);		
		console.log("limit: " + limit);		
		
/*
		for(i=0; medias.length; i++){
			if (medias[i].location != null){
				console.log(medias[i].location.latitude);				
			}

			//console.log(medias[i].images.standard_resolution.url);
		};
*/
		var templateData = {
			'title' : 'Instagram Images',
			'data' : medias,
		}
		res.render('instagram.html', templateData);
	});

}