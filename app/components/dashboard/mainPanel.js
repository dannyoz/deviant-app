import React      from "../../../node_modules/react/react";
import AppActions from '../../flux/appActions';
import Painting   from './painting';
import HighScores from './highscores';

let MainPanel = React.createClass({

  componentWillReceiveProps(props){

    if(!props.state.hasStats){

      var paintings = props.state.paintings;
      for(var i = 0; i<paintings.length; i++){

        var stats = paintings[i].statistics;
        var perc  = (stats.favorites/ stats.views)*100;

        stats.perc = perc;

        AppActions.setStats(stats);
      };

    }
  },

  render () {

    var paintings = this.props.state.paintings.map(function(painting){
      return(
        <Painting data={painting}/>
      )
    },this);

    return(
      <div id="main-panel">
        <HighScores state={this.props.state}/>
        {paintings}
      </div>
    )
  }
});

export default MainPanel;
