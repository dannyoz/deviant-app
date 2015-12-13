var HTTP      = require('superAgent');
var mongoose  = require('mongoose');
var Q         = require('q');
var auth      = {};
var userData  = {};
var items     = [];
var paintings = [];

mongoose.connect('mongodb://localhost/deviantart');

var Schema = new mongoose.Schema({
	userData  : Object,
	paintings : Array
});

var Data = mongoose.model('data',Schema);

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
			items = data
		})
		.then(flatten)
		.then(getStats)
		.then(save)
		.done();
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

	getGallery = function(){

		var deferred = Q.defer();

		var path    = 'https://www.deviantart.com/api/v1/oauth2/gallery/?username=',
			user    = 'danosborne',	
			queries = '&mode=newest&mature_content=true&access_token=',
			token   = auth.access_token;
			
		var pages     = [],
			count     = userData.stats.user_deviations,
			pageCount = (count%10)-1;

		for (var i = 0; i<pageCount; i++){

			var paging = '&offset=' + (i*10),
				url    = path+user+paging+queries+token;
		
			request(url).then(function(data){
				pages.push(data.results)		

				if(pages.length == pageCount){

					deferred.resolve(pages)
				}
			});
		}

		return deferred.promise;
	},

	flatten = function(){

		var pageCount = items.length;

		for (var i = 0; i<pageCount; i++){

			if(i == 0){
				paintings = items[i];
			} else {
				paintings.push.apply(paintings,items[i]);
			}
		}

		return timer(400);
	},

	getStats = function(){

		var deferred = Q.defer();

		var inc = 0;

		var path = 'http://backend.deviantart.com/oembed?url=';

		for (var i = 0; i<paintings.length; i++){

			var paintUrl = paintings[i].url,
				painting = paintings[i];

			request(path+paintUrl).then(function(data){
				inc ++
				painting.statistics = data.community.statistics["_attributes"]

				if(inc == userData.stats.user_deviations){
					deferred.resolve('done')
				}
			});
		}

		return deferred.promise;
	},

	save = function(){
		new Data({
			userData  : userData,
			paintings : paintings
		}).save(function(err,doc){
			if(err) console.log(err);
			else console.log('dunnit');
		})
	}

	chain();

	return {

		run : chain
	}

})();

module.exports = deviantart;