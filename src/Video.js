import React, { Component } from 'react';
import './Video.css';

let timeout;

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showIntro: true,
      showVideo: false,
      showAssociation: false,
      introText: this.props.intro,
      src: this.props.src+'#t='+this.convertTime(this.props.start)+','+this.convertTime(this.props.end),
      associations: this.props.associations
    }
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  convertTime(value) {
    var splitValue = value.split(':');
    return (+splitValue[0]) * 60 + (+splitValue[1]);
  }

  componentDidMount() {
    timeout = setTimeout(() => this.setState({showIntro: false, showVideo: true}), 5000);
    document.addEventListener('click', this.handleClickOutside);
  };

  componentWillUnmount() {
    clearTimeout(timeout);
    document.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.node && !this.node.contains(event.target)) {
    this.setState({
      showIntro: false,
      showVideo: false,
      showAssociation: false
    });
    }
  }

  pauseVideo = event => {
    this.setState({showVideo: false, showAssociation: true});
  }

  render() {

    let introComponent = null;
    let videoComponent = null;
    let associationComponent = null;
  
    if (this.state.showIntro) {
      introComponent = (<div className="intro"><p className="intro-Text">{this.state.introText}</p></div>);
    }
    if (this.state.showVideo) {
      videoComponent = (<video autoPlay onPause={this.pauseVideo}>
        <source type="video/mp4" src={this.state.src}></source>
        Your browser does not support the video tag.
      </video>);
    }
    if (this.state.showAssociation) {
      let associations = this.state.associations.map((a) => <p className="association-Text">{a.associationText}</p>);
      associationComponent = (<div className="association">{associations}</div>);
    }

    return (<div className="Video" ref={node => { this.node = node; }}>{introComponent}{videoComponent}{associationComponent}</div>);
  }
}

export default Video;
