var express = require('express'),
    swig = require('swig'),
    http = require('http');

var app = express();
var port = 4000;
var server = app.listen(port);
var routeData = require('./app/routes.json');
var superAgent = require('superAgent');





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

app.get('/api/:route',function(req,res){

	var json = require('./app/api/'+req.params.route+'.json');

	res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(json));
});




//DEVIANT ART...

var token        = {},
	deviantart   = {},
	path         = 'https://www.deviantart.com/oauth2/token',
	appId        = '?client_id=4044',
	clientSecret = '&client_secret=4570f8cf16d7c63d137f25d4a6fc5aca',
	type         = '&grant_type=client_credentials',
	url          = path+appId+clientSecret+type;

superAgent.get(url).end(function(err, response){
	token = response.body;

	superAgent.get('https://www.deviantart.com/api/v1/oauth2/gallery/?username=danosborne&mode=popular&mature_content=true&access_token=' + token.access_token)
		.end(function(err, response){
			deviantart = response.body;
	});
});


app.get('/api/deviantart/token',function(req,res){

	res.setHeader('Content-Type', 'application/json');
    res.send(token);
});

app.get('/api/deviantart/data',function(req,res){

	res.setHeader('Content-Type', 'application/json');
    res.send(deviantart);
});

console.log("Express server listening on port ",port);