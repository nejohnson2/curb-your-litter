/*
	This is the main javascript file where goodness
	should be happening.
*/
// jQuery(document).ready(function(){
	
// 	console.log('ready');
	
// 	var socket = io.connect();
	
// 	socket.on('firstShow', function (data) {
// 		console.log('first show');
// 		console.log(data);
// 		//socket.emit('my other event', { my: 'data' });
// 	});
// 	socket.on('show', function(data) {
// 		var url = data.show;
// 		console.log(url);
// 		console.log('SHOW');
	
// 	    $.ajax({
// 	        url: url,
// 	        type: 'POST',
// 	        crossDomain: true,
// 	        dataType: 'jsonp'
// 	    }).done(function (data) {
// 	        console.log(data);
// 	        console.log('who data');
// 	    }); 	
// 	});
// });