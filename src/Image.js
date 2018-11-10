import React, { Component } from 'react';
import './Image.css';

class Image extends Component {
  size = (Math.random() * 0.25) + 0.5;
  angle = (Math.random() * Math.PI / 4) * (-1 + Math.random() * 2);

  state = {
    imageLeft: Math.random() * (window.innerWidth / 2) + 'px',
    imageTop: Math.random() * (window.innerHeight / 2) + 'px',
    zIndex: this.props.id,
    transform: 'rotate(' + this.angle + 'rad) scale(' + this.size + ')'
  };

  previousLeft = 0;
  previousTop = 0;
  store = [{x:-1, y:-1},{x:-1, y:-1}];
  dx = 0;
  dy = 0;
  swipe = false;
  startX;
  startY;
  distX;
  distY;
  threshold = 150; //required min distance traveled to be considered swipe
  restraint = 100; // maximum distance allowed at the same time in perpendicular direction
  allowedTime = 500; // maximum time allowed to travel that distance
  elapsedTime;
  startTime;
  that = this;

  onDown = event => {
    event.preventDefault();
    event.stopPropagation();
    this.startX = event.targetTouches[0].pageX;
    this.startY = event.targetTouches[0].pageY;
    this.startTime = new Date().getTime();
    this.that.init();
    this.that.gesture(event);
  };

  onMove = event => {
    event.preventDefault();
    event.stopPropagation();
    this.distX = event.targetTouches[0].pageX - this.startX;
    this.distY = event.targetTouches[0].pageY - this.startY;
    this.that.gesture(event);
  };

  onEnd = event => {
    this.elapsedTime = new Date().getTime() - this.startTime
    if (this.elapsedTime <= this.allowedTime){
      //alert(this.distX);
      if ((Math.abs(this.distX) >= this.threshold && Math.abs(this.distY) <= this.restraint)
       || (Math.abs(this.distY) >= this.threshold && Math.abs(this.distX) <= this.restraint)){ 
        this.swipe = !this.swipe;
        var element = document.getElementById(this.props.id);
        var height = element.clientHeight;
        var width = element.clientWidth;
        element.src = this.swipe ? 'back.png' : this.props.src;
        element.height = height;
        element.width = width;
      }
    }
  }

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
    var element = document.getElementById(this.props.id);
    var size_ratio = ((element.width * that.size) + size) / (element.width * that.size);
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
    var element = document.getElementById(this.props.id);
    this.setState(({imageLeft, imageTop}) => ({
      imageLeft: element.offsetLeft + dx + 'px',
      imageTop: element.offsetTop + dy + 'px',
    }));
  };

  playVideo = () => {
    var video = document.createElement("video");
    video.controls = true;
    var source = document.createElement("source"); 
    source.type = "video/mp4";
    source.src = this.props.video;
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
        onTouchStart={this.onDown}
        onTouchMove={this.onMove}
        onTouchEnd={this.onEnd}
        onClick={this.playVideo}
      />
    )
  }
}

export default Image;
