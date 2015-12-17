import AppDispatcher from "./appDispatchers";

let AppActions = {

	setStats : function(statObj){
		AppDispatcher.handleStats({
			type : 'stats',
			statObj : statObj
		});
	}
}

export default AppActions;
