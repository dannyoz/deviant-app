import React      from "../../node_modules/react/react";
import apiService from '../services/apiService';
import MainPanel  from './mainPanel';
import Sidebar    from './sidebar';
import AppStore   from '../flux/appStore';
import AppActions from '../flux/appActions';

var Dashboard = React.createClass({

	getInitialState (){
		return {
			userData   : {},
			paintings  : [],
      views      : [],
      favourites : [],
      comments   : [],
			percs      : [],
			hasStats   : false
		}
	},

	statsHandler(stat){
		AppStore.addStat("comments",stat.comments);
    AppStore.addStat("favourites",stat.favorites);
    AppStore.addStat("views",stat.views);
		AppStore.addStat("percs",stat.perc);

		if(AppStore.getStats('comments').length == this.state.paintings.length){

			var comments   = AppStore.getStats('comments');
			var views      = AppStore.getStats('views');
			var favourites = AppStore.getStats('favourites');
			var percs      = AppStore.getStats('percs');

			this.setState({
				views : views,
	      favourites : favourites,
	      comments :comments,
				percs : percs
			});
		}

		this.setState({
			hasStats : true
		})
  },

	componentDidMount () {

		AppStore.addChangeListener('stats',this.statsHandler);

    var self = this;

		this.api = new apiService();
		this.api.request('/api/deviantart/data')
			.end(function(err, response){
				self.setState({
					userData : response.body[0].userData,
					paintings : response.body[0].paintings
				})
			});
	},

	render (){
		return (
			<div id="dashboard">
				<Sidebar state={this.state}/>
				<MainPanel state={this.state} getStats={this.getStats}/>
			</div>
		)
	}

});

export default Dashboard;
