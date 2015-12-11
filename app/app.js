import React from "../node_modules/react/react";
import Header from "./views/components/header/header";
import apiService from './services/apiService';
import HTTP from "../node_modules/superagent/lib/client";
let jsonp = require('superagent-jsonp');

var Home = React.createClass({

	getInitialState (){
		return {
			appName : "",
			techStack : []
		}
	},
	
	componentDidMount () {

		// this.api = new apiService();
		// this.api.request('/api/test')
		// 	.end(function(err, response){

		// 	    this.setState({
		// 	    	appName : response.body.appName,
		// 			techStack : response.body.tech
		// 	    });

		// 	}.bind(this));

		HTTP.get('https://www.deviantart.com/oauth2/token?client_id=4044&client_secret=4570f8cf16d7c63d137f25d4a6fc5aca&grant_type=client_credentials')
			.withCredentials()
			.end(function(err, response){

				console.log(response);
			});

	},
	render (){
		return (
			<div className="centre">
				<h1 className="text-centre">{this.state.appName}</h1>
				<ul className="tech-list">
					{this.state.techStack.map(function(tech){
						return <li>{tech}</li>
					})}
				</ul>
			</div>
		)
	}

});


React.render(
 	<Home/>,
    document.getElementById('home')
);

var HeaderComponent = document.getElementById('main-header');

if(HeaderComponent){
	React.render(
		<Header />,
		HeaderComponent
	);
};

