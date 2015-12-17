import React from "../../node_modules/react/react";

let MainPanel = React.createClass({

  componentWillReceiveProps (newProps) {
    console.log(newProps.state.paintings);
  },

  render () {

    var paintings = this.props.state.paintings.map(function(painting){
      return(
        <div>
          <p>{painting.title}</p>
          <ul>
            <li>Views : {painting.statistics.views}</li>
            <li>Favourites : {painting.statistics.favorites}</li>
            <li>Comments : {painting.statistics.comments}</li>
          </ul>
        </div>
      )
    });

    return(
      <div id="main-panel">
        {paintings}
      </div>
    )
  }
});

export default MainPanel;
