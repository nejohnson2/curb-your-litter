//socket.js
module.exports.configureSocketIOEvents = function(io){
	
	io.sockets.on('connection', function (socket) {
		console.log('connected');

/*
		Instagram.tags.recent({
		  name: 'newengland',
		  complete: function(data) {
		    io.sockets.emit('firstShow', { firstShow: data });
		  }
		});
*/	
		
		// New Chat Message received from Client
/*
		socket.on('new chat msg', function(msg) {
		
		    //broadcast new chat message to everyone
		    io.sockets.emit('new chat msg', msg);
		});
		
		// New Background color received from client
		socket.on('background color set', function(color) {
		
		    //broadcast new color to everyone
		    io.sockets.emit('background color update', color);
		
		});
*/
	});
}