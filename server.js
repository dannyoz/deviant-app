var express = require('express'),
    swig = require('swig'),
    http = require('http');

var app = express();
var port = 3000;
var server = app.listen(port);
var routeData = require('./app/routes.json');
var superAgent = require('superAgent');
var deviantArt = require('./server/deviantArt');
var mongoose = require('mongoose');

// Get deviant art data
// deviantArt.run();

// mongoose.connect('mongodb://localhost/deviantart');
//mongoose.model('data',{content: Object});


//Templating settings
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/build/views');

//For static asset files
['css', 'img', 'js', 'views', 'api', 'msg'].forEach(function (dir){
    app.use('/'+dir, express.static(__dirname+'/build/'+dir));
});

routeData.routes.forEach(function (route){

	app.get(route.path, function(req, res) {
		res.render(route.view, {
		    pageTitle : route.title
		});
	});

});

app.get('/api/deviantart/data',function(req,res){
	mongoose.model('artdata').find(function(err,data){
    	res.send(data);
	});
});

app.get('/api/:route',function(req,res){

	var json = require('./app/api/'+req.params.route+'.json');

	res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(json));
});


console.log("Express server listening on port ",port);
