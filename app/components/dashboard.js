import React      from "../../node_modules/react/react";
import apiService from '../services/apiService';
import MainPanel  from './mainPanel';
import Sidebar    from './sidebar';

var Dashboard = React.createClass({

	getInitialState (){
		return {
			userData : {},
			paintings : []
		}
	},

	componentDidMount () {

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
				<MainPanel state={this.state}/>
			</div>
		)
	}

});

export default Dashboard;
