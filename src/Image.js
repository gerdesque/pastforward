import React, { Component } from 'react';
import './Image.css';

class Image extends Component {
  size = (Math.random() * 0.25) + 0.5;
  angle = (Math.random() * Math.PI / 4) * (-1 + Math.random() * 2);

  state = {
    imageLeft: Math.random() * (window.innerWidth / 2) + 'px',
    imageTop: Math.random() * (window.innerHeight / 2) + 'px',
    zIndex: this.props.index,
    transform: 'rotate(' + this.angle + 'rad) scale(' + this.size + ')'
  };

  previousLeft = 0;
  previousTop = 0;
  store = [{x:-1, y:-1},{x:-1, y:-1}];
  dx = 0;
  dy = 0;
  that = this;

  onDown = event => {
    event.preventDefault();
    event.stopPropagation();
    this.that.init();
    this.that.gesture(event);
  };

  onMove = event => {
    event.preventDefault();
    event.stopPropagation();
    this.that.gesture(event);

  };

  init = () => {
    this.store[0].x = this.store[0].y = this.store[1].x = this.store[1].y = -1;    
    var zIndex = 0; // just using positive indices
    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
      if (parseInt(images[i].style.zIndex, 10) >= zIndex) {
        zIndex = parseInt(images[i].style.zIndex, 10) + 1;
      }
    }
    this.setState({zIndex: zIndex});
  };

  gesture = event => {
    var x1 = 0;
    var x2 = 0;
    var y1 = 0;
    var y2 = 0;
    var angle = 0;
    var size = 0;
    if (event.targetTouches) {
      if (event.targetTouches.length >= 2) {

        // two (or more) fingers
        x1 = event.targetTouches[0].pageX - event.target.offsetLeft;
        y1 = event.targetTouches[0].pageY - event.target.offsetTop;
        x2 = event.targetTouches[1].pageX - event.target.offsetLeft;
        y2 = event.targetTouches[1].pageY - event.target.offsetTop;
        if (this.store[0].x !== -1) {
          angle = Math.atan((y2 - y1) / (x2 - x1)) - Math.atan((this.store[1].y - this.store[0].y) / (this.store[1].x - this.store[0].x));
          if (Math.abs(angle) >= 3) { // jumped 180 degrees due to my poor math skills
            angle = angle - Math.PI;
          }
          size = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2)) - Math.sqrt(Math.pow((this.store[0].x - this.store[1].x), 2) + Math.pow((this.store[0].y - this.store[1].y), 2));
          this.twofinger(size, angle);
        }
        // store the values for later comparison
        this.store[0].x = x1;
        this.store[0].y = y1;
        this.store[1].x = x2;
        this.store[1].y = y2;

      } else if (event.targetTouches.length === 1) {

        // one finger
        x1 = event.targetTouches[0].pageX;
        y1 = event.targetTouches[0].pageY;
        // check if user went from two fingers to one finger - otherwise movement offset is wrong depending on which finger was lifted
        if (this.store[1].x !== -1) {
          // treat the two-to-one change as a completely new gesture
          this.init();
        }
        if (this.store[0].x !== -1) {
          this.onefinger(x1 - this.store[0].x, y1 - this.store[0].y);
        }
        // store the values for later comparison
        this.store[0].x = x1;
        this.store[0].y = y1;
      }
    }
  };

  twofinger = function (size, angle) {
    var that = this;
    var size_ratio = ((that.element.width * that.size) + size) / (that.element.width * that.size);
    that.size *= size_ratio;
    if (that.size < 0.5) {
      that.size = 0.5;
    }
    if (that.size > 1) {
      that.size = 1;
    }
    that.angle += angle;
    this.setState(({transform}) => ({
      transform: 'rotate(' + that.angle + 'rad) scale(' + that.size + ')'
    }));
  };

  onefinger = function (dx, dy) {
    var that = this;
    this.setState(({imageLeft, imageTop}) => ({
      imageLeft: that.element.offsetLeft + dx + 'px',
      imageTop: that.element.offsetTop + dy + 'px',
    }));
  };

  playVideo = function (src) {
    var video = document.createElement("video");
    video.controls = true;
    var source = document.createElement("source"); 
    source.type = "video/mp4";
    source.src = src;
    video.appendChild(source);
    document.body.appendChild(video);
    video.play();
  }

  render() {
    const {imageLeft, imageTop, zIndex, transform} = this.state;
    let style = {
      left: imageLeft,
      top: imageTop,
      zIndex: zIndex,
      transform: transform
    };

    return (
      // eslint-disable-next-line jsx-a11y/alt-text
      <img {...this.props} style={{...style}}
        onPointerDown={this.onDown}
        onPointerMove={this.onMove}
        onTouchStart={this.onDown}
        onTouchMove={this.onMove}
      />
    )
  }
}

export default Image;
