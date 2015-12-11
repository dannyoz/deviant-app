//DEVIANT ART...

// var token        = {},
// 	deviantart   = {},
// 	path         = 'https://www.deviantart.com/oauth2/token',
// 	appId        = '?client_id=4044',
// 	clientSecret = '&client_secret=4570f8cf16d7c63d137f25d4a6fc5aca',
// 	type         = '&grant_type=client_credentials',
// 	url          = path+appId+clientSecret+type;

// superAgent.get(url).end(function(err, response){
// 	token = response.body;

// 	superAgent.get('https://www.deviantart.com/api/v1/oauth2/gallery/?username=danosborne&mode=popular&mature_content=true&access_token=' + token.access_token)
// 		.end(function(err, response){
// 			deviantart = response.body;
// 	});
// });


// app.get('/api/deviantart/token',function(req,res){

// 	superAgent.get(url).end(function(err, response){
// 		var tokenData = response.body;

// 		res.setHeader('Content-Type', 'application/json');
//     	res.send(tokenData);

// 	});
// });

// app.get('/api/deviantart/data',function(req,res){

// 	res.setHeader('Content-Type', 'application/json');
//     res.send(deviantart);
// });


var HTTP      = require('superAgent');
var Q         = require('q');
var auth      = {};
var userData  = {};
var items     = [];


var deviantart = (function(){
	

	var chain = function(){

		authenticate()
		.then(function(data){
			auth = data;
		})
		.then(getUserData)
		.then(function(data){
			userData = data
		})
		.then(getGallery)
		.then(function(data){

			var hasMore = data.has_more,
				offset  = data.next_offset,
				results = data.results;

			items = results;

		})
		.then(getPosts)
		.then(getStats)
		.done();
	},

	run = function(){

	},

	request = function(url){

		var deferred = Q.defer();

		HTTP.get(url).end(function(err, response){
			if(err){
				deferred.reject(new Error(err));
			} else {
				deferred.resolve(response.body);
			}			
		});

		return deferred.promise;
	},

	timer = function(time){

		var deferred = Q.defer();

		setTimeout(function(){
			deferred.resolve(time);
		},time)

		return deferred.promise;

	},

	authenticate = function(){

		var path         = 'https://www.deviantart.com/oauth2/token',
			appId        = '?client_id=4044',
			clientSecret = '&client_secret=4570f8cf16d7c63d137f25d4a6fc5aca',
			type         = '&grant_type=client_credentials',
			url          = path+appId+clientSecret+type;

		return request(url);
	},

	getUserData = function(){


		var path    = 'https://www.deviantart.com/api/v1/oauth2/user/profile/danosborne?ext_collections=false&ext_galleries=true'
			user    = 'danosborne',
			queries = '&mode=newest&mature_content=true&access_token=',
			token   = auth.access_token,
			url     = path+user+queries+token;

		return request(url);
	},

	getGallery = function(offset){

		var path    = 'https://www.deviantart.com/api/v1/oauth2/gallery/?username=',
			user    = 'danosborne',
			paging  = (offset) ? '&offset=' + offset : '&offset=0',
			queries = '&mode=newest&mature_content=true&access_token=',
			token   = auth.access_token,
			url     = path+user+paging+queries+token;

		var pages     = [],
			count     = userData.stats.user_deviations,
			pageCount = (count%10)-1;


		return request(url);
	},

	getPosts = function(){

		console.log(items.length)

		return timer(400);
	},

	getStats = function(){

		console.log(4)
		return timer(1000);
	}

	chain();

	return {

		run : chain
	}

})();

module.exports = deviantart;