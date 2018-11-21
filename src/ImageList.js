import React, { Component } from 'react';
import Image from './Image';

class ImageList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      films: [],
      associations: []
    };
  }

  async componentDidMount() {
    try {
      let response = await fetch('https://raw.githubusercontent.com/gerdesque/pastforwardgraph/master/films.json');
      let responseJson = await response.json();
      this.setState({ films: responseJson.nodes, associations: responseJson.arcs });
     } catch(error) {
      console.error(error);
    }
  }

  render() {
    const imageItems = this.state.films.map((film) =>
      (!film.thumbnail.toLowerCase().startsWith("todo")) ?
      <Image key={film.id} {...film} associations={this.state.associations.filter(a => a.source === film.section)}/>
      : null);
      return (<div className="ImageList">{imageItems}</div>);
  }
}

export default ImageList;
