import React from "../../../node_modules/react/react";

var Painting = React.createClass({

  render (){

    var painting = this.props.data;
    var perc = Math.round((painting.statistics.favorites/ painting.statistics.views)*100) + '%';

    return(
      <div>
        <p>{painting.title}</p>
        <ul>
          <li>Views : {painting.statistics.views}</li>
          <li>Favourites : {painting.statistics.favorites}</li>
          <li>Comments : {painting.statistics.comments}</li>
        </ul>
        <p>{perc}</p>
      </div>
    )
  }
});

export default Painting;
