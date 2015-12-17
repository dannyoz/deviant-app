import AppDispatcher from "./appDispatchers";
import assign from "../../node_modules/object-assign/index";

const EventEmitter = require('events').EventEmitter;

var stats = {
	"favourites" : [],
	"comments" : [],
	"views" : [],
	"percs" : []
};

let AppStore = assign({}, EventEmitter.prototype,{

	addStat(stat,score){
		stats[stat].push(score);
	},

	getStats(stat){
		return stats[stat];
	},

	emitChange (event,data) {
	    this.emit(event,data);
	},

	addChangeListener (event,callback) {
		this.setMaxListeners(Infinity);
	    this.on(event,callback);
	},

	removeChangeListener (event,callback) {
	    this.removeListener(event,callback);
	}

});

AppDispatcher.register(function (payload) {
	if(payload.type == 'stats'){
		AppStore.emitChange(payload.type,payload.statObj);
	}
});

export default AppStore;
