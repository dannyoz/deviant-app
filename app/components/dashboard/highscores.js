import React from "../../../node_modules/react/react";

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
      this.calulateStats(props);
    }
  },

  findAverage(arr){
    var sum = 0;
    for( var i = 0; i < arr.length; i++ ){
        sum += arr[i];
    }
    return sum/arr.length;
  },

  calulateStats (props){

    var comms = props.state.comments;
    var faves = props.state.favourites;
    var views = props.state.views;
    var percs = props.state.percs;

    var mostComms = comms.indexOf(Math.max.apply(Math, comms));
    var avgComms  = this.findAverage(comms);
    var mostViews = views.indexOf(Math.max.apply(Math, views));
    var avgViews  = this.findAverage(views);
    var mostFaves = faves.indexOf(Math.max.apply(Math, faves));
    var avgFaves  = this.findAverage(faves);
    var mostLiked = percs.indexOf(Math.max.apply(Math, percs));
    var avgLikes  = this.findAverage(percs);

    console.log(this.findAverage(comms));

    this.setState({
      mostComms : props.state.paintings[mostComms],
      avgComms  : avgComms,
      mostViews : props.state.paintings[mostViews],
      avgViews  : avgViews,
      mostFaves : props.state.paintings[mostFaves],
      avgFaves  : avgFaves,
      mostLiked : props.state.paintings[mostLiked],
      avgLikes  : avgLikes
    });

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
