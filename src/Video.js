import React, { Component } from 'react';
import './Video.css';

let timeout;

class Video extends Component {

  constructor(props) {
    super(props);

    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  // TODO: Use video intro text, start/end time and association text from video nodes
  state = {
    showIntro: true,
    showVideo: false,
    showAssociation: false,
    introText: "Die Kaiserzeit: Kaiser Wilhelm II. beehrt am 4. Mai 1897 in Stettin eine der damals führenden Werften in Deutschland mit seinem Besuch an der Landungsbrücke des Werkgeländes. Anlass ist der Stapellauf des Transatlantik-Schnelldampfers  „Kaiser Wilhelm der Große“.",
    src: this.props.src+'#t=33,41',
    associationText: "Bereits 3 Jahre zuvor: der Zustand der Dampfschifffahrt im Schwarzen Meer"
  };

  componentDidMount() {
    timeout = setTimeout(() => this.setState({showIntro: false, showVideo: true}), 5000);
    document.addEventListener('click', this.handleClickOutside);
  };

  componentWillUnmount() {
    clearTimeout(timeout);
    document.removeEventListener('click', this.handleClickOutside);
  };

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
  };

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
      associationComponent = (<div className="association"><p className="association-Text">{this.state.associationText}</p></div>);
    }

    return (<div className="Video" ref={node => { this.node = node; }}>{introComponent}{videoComponent}{associationComponent}</div>);
  }
}

export default Video;
