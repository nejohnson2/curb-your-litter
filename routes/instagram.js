/* var api = require('instagram-node').instagram() */
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

exports.callback = function(req, res){
    var handshake =  Instagram.subscriptions.handshake(req, res);
    console.log(handshake);
};      

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
        res.render('instagram.html', templateData);
      }
  });
};

exports.post_callback = function(req, res) {
	console.log('called back');
    var data = req.body;

    data.forEach(function(tag) {
      var url = 'https://api.instagram.com/v1/tags/' + tag.object_id + '/media/recent?client_id=479edbf0004c42758987cf0244afd3ef';
      sendMessage(url);

    });
    res.end();
};