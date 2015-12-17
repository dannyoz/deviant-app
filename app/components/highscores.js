import React from "../../node_modules/react/react";

let HighScores = React.createClass({

  getInitialState(){
    return{
      mostComms : {},
      mostViews : {},
      mostFaves : {},
      mostLiked : {}
    }
  },

  componentWillReceiveProps(props){

    if(props.state.comments.length > 0){

      var comms = props.state.comments;
      var faves = props.state.favourites;
      var views = props.state.views;
      var percs = props.state.percs;

      var mostComms = comms.indexOf(Math.max.apply(Math, comms));
      var mostViews = views.indexOf(Math.max.apply(Math, views));
      var mostFaves = faves.indexOf(Math.max.apply(Math, faves));
      var mostLiked = percs.indexOf(Math.max.apply(Math, percs));

      this.setState({
        mostComms : props.state.paintings[mostComms],
        mostViews : props.state.paintings[mostViews],
        mostFaves : props.state.paintings[mostFaves],
        mostLiked : props.state.paintings[mostLiked]
      });
    }
  },

  render(){
    return(
      <div>
        <div>{this.state.mostLiked.title}</div>
        <div>{this.state.mostComms.title}</div>
        <div>{this.state.mostViews.title}</div>
        <div>{this.state.mostFaves.title}</div>
      </div>
    )
  }
});

export default HighScores;
