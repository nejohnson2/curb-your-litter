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
var ig = require('instagram-node').instagram();

// Every call to `ig.use()` overrides the `client_id/client_secret`
// or `access_token` previously entered if they exist.
ig.use({ access_token: 'YOUR_ACCESS_TOKEN' });
ig.use({ client_id: process.env.CLIENT_ID,
         client_secret: process.env.CLIENT_SECRET });

app.post('/like/:media_id', function(req, res, next) {
  var ig = require('instagram-node').instagram({});
  ig.use({ access_token: 'YOUR_ACCESS_TOKEN' });

  ig.add_like(req.param('media_id'), {
    sign_request: {
      client_secret: 'YOUR_CLIENT_SECRET',
      // Then you can specify the request:
      client_req: req
      // or the IP on your own:
      ip: 'XXX.XXX.XXX.XXX'
    }
  }, function(err) {
    // handle err here
    return res.send('OK');
  });
});
*/
         
exports.instagram = function(req, res){

	var medias = api.tag_media_recent('NewEngland', function(err, medias, pagination, remaining, limit) {
//		console.log(medias.images);

/*
		for(i=0; medias.length; i++){
			console.log(i);
			console.log(medias[i].images.standard_resolution.url);
		};
*/

//		console.log(remaining);
//		console.log(limit);
	});
	

    res.render('instagram.html', {data: medias});
}