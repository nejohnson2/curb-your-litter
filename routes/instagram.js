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
  Instagram.tags.recent({
      name: 'newengland',
      complete: function(data) {
      	var templateData = {
	      	'title' : 'Instagram Images #NewEngland',
	      	'data' : data,
      	}
      	//io.sockets.emit('first_show', templateData);
        res.render('instagram.html', templateData);
      }
  });
};
/*
	GET /callback
*/
exports.callback = function(req, res){
    var handshake =  Instagram.subscriptions.handshake(req, res);
    console.log(handshake);
};

/* 
	POST /callback
*/
exports.post_callback = function(req, res) {
	console.log('called back');
	/*
		This is where instagram will make the post request with new data.
		Now we need to take that data and send it to the database but only 
		the part that we need.
	*/
};
