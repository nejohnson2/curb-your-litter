/*
	GET /
*/
exports.main = function(req, res){
        res.render('main.html');
}

exports.map = function(req,res){
		res.render('map.html');

}
