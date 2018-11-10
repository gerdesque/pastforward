import React, { Component } from 'react';
import films from './films.js';
import Image from './Image';

class ImageList extends Component {

  render() {
    const imageItems = films.map((film, index) =>
      <Image key={index} id={index} src={film.thumbnail} video={film.video}/>
      );
      return (<div className="ImageList">{imageItems}</div>);
  }
}

export default ImageList;
