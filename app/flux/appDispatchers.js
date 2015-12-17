const Dispatcher = require("../../node_modules/flux/dist/flux").Dispatcher;
const assign = require("../../node_modules/object-assign/index");

let AppDispatcher = assign(new Dispatcher(),{

	handleStats (payload){
		this.dispatch(payload);
	}

});


export default AppDispatcher;
