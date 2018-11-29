/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import './Image.css';
import Video from './Video';

class Image extends Component {
  size = (Math.random() * 0.25) + 0.5;
  angle = (Math.random() * Math.PI / 4) * (-1 + Math.random() * 2);

  constructor(props) {
    super(props);
    this.state = {
      imageLeft: Math.random() * (window.innerWidth / 2) + 'px',
      imageTop: Math.random() * (window.innerHeight / 4) + 'px',
      zIndex: this.props.id,
      transform: 'rotate(' + this.angle + 'rad) scale(' + this.size + ')',
      src: require('./assets/thumbnails/' + this.props.id + '.jpg'),
      showVideo: false
    };
  }

  store = [{x:-1, y:-1},{x:-1, y:-1}];
  dragging = false;
  disable_click = false;
  swipe = false;
  startX;
  startY;
  distX;
  distY;
  threshold = 100; //required min distance traveled to be considered swipe
  restraint = 100; // maximum distance allowed at the same time in perpendicular direction
  allowedTime = 500; // maximum time allowed to travel that distance
  elapsedTime;
  startTime;
  self = this;

  onDown = event => {
    event.preventDefault();
    event.stopPropagation();
    this.disable_click = false;
    if (!event.targetTouches) {
      this.dragging = true;
    }
    this.self.init(event);
    if (event.targetTouches) {
      this.startX = event.targetTouches[0].pageX;
      this.startY = event.targetTouches[0].pageY;
      this.startTime = new Date().getTime(); 
      this.self.gesture(event);
    }
  };

  onMove = event => {
    event.preventDefault();
    event.stopPropagation();
    this.disable_click = true;
    if (this.dragging) {
      var x1 = event.pageX;
      var y1 = event.pageY;
      
      if (this.store[0].x !== -1) {
        var left = event.target.offsetLeft + x1 - this.store[0].x + 'px'
        var top = event.target.offsetTop + y1 - this.store[0].y + 'px'
        this.setState(({imageLeft, imageTop}) => ({
          imageLeft: left,
          imageTop: top
        }));
      }
      this.store[0].x = x1;
      this.store[0].y = y1;
    }
    if (event.targetTouches) {
      this.self.gesture(event);
    }
  };

  onEnd = event => {
    event.stopPropagation();
    this.dragging = false;
    if (event.targetTouches) {
      this.elapsedTime = new Date().getTime() - this.startTime
      if (event.targetTouches.length === 0 && this.elapsedTime <= this.allowedTime){
        if ((Math.abs(this.distX) >= this.threshold && Math.abs(this.distY) <= this.restraint)
        || (Math.abs(this.distY) >= this.threshold && Math.abs(this.distX) <= this.restraint)){ 
          this.swipe = !this.swipe;
          var element = document.getElementById(this.props.id);
          var height = element.clientHeight;
          var width = element.clientWidth;
          this.setState({src: this.swipe ? require('./assets/flipside/' + this.props.id + '.jpg') : require('./assets/thumbnails/' + this.props.id + '.jpg')});
          element.height = height;
          element.width = width;
        }
      }
    }
  }

  init = () => {
    this.store[0].x = this.store[0].y = this.store[1].x = this.store[1].y = -1;   
    var zIndex = 0;
    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
      if (parseInt(images[i].style.zIndex, 10) >= zIndex) {
        zIndex = parseInt(images[i].style.zIndex, 10) + 1;
      }
      images[i].addEventListener('touchmove',
      function(e) {
          e.preventDefault();
      }, {passive:false});
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
    this.distX = event.targetTouches[0].pageX - this.startX;
    this.distY = event.targetTouches[0].pageY - this.startY;
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

  twofinger = (size, angle) => {
    var element = document.getElementById(this.props.id);
    var size_ratio = ((element.width * this.size) + size) / (element.width * this.size);
    this.size *= size_ratio;
    if (this.size < 0.5) {
      this.size = 0.5;
    }
    if (this.size > 1) {
      this.size = 1;
    }
    this.angle += angle;
    this.setState(({transform}) => ({
      transform: 'rotate(' + this.angle + 'rad) scale(' + this.size + ')'
    }));
  };

  onefinger = (dx, dy) => {
    var element = document.getElementById(this.props.id);
    this.setState(({imageLeft, imageTop}) => ({
      imageLeft: element.offsetLeft + dx + 'px',
      imageTop: element.offsetTop + dy + 'px',
    }));
  };

  displayVideo = () => {
    if (!this.disable_click) {
      this.setState({showVideo: !this.state.showVideo})
    }
  }

  render() {
    const {imageLeft, imageTop, zIndex, transform} = this.state;
    let style = {
      left: imageLeft,
      top: imageTop,
      zIndex: zIndex,
      transform: transform
    };

    let video = null;
    if (this.state.showVideo) {
      video = (<Video {...this.props} src={this.props.video}/>)
    }

    return (
      <div>
      <img className="Image" {...this.props} src={this.state.src} style={{...style}}
        onTouchStart={this.onDown}
        onTouchMove={this.onMove}
        onTouchEnd={this.onEnd}
        onPointerDown={this.onDown}
        onPointerMove={this.onMove}
        onPointerUp={this.onEnd}
        onPointerOut={this.onEnd}
        onClick={this.displayVideo}
      />
      {video}
      </div>
    )
  }
}

export default Image;
