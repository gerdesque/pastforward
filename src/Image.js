import React, { Component } from 'react';
import './Image.css';

class Image extends Component {
  render() {
    let size = (Math.random() * 0.25) + 0.5;
    let angle = (Math.random() * Math.PI / 4) * (-1 + Math.random() * 2);
    let transform = 'rotate(' + angle + 'rad) scale(' + size + ')';

    let style = {
      left: Math.random() * (window.innerWidth / 2) + 'px',
      top: Math.random() * (window.innerHeight / 2) + 'px',
      zIndex: this.props.index,
      transform: transform
    };

    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...this.props} style={{...style}}/>
  }
}

export default Image;
