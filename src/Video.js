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
      associations: this.props.associations,
      films: [],
      arcs: []
    }
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  introTime = 5000;

  convertTime(value) {
    var splitValue = value.split(':');
    return (+splitValue[0]) * 60 + (+splitValue[1]);
  }

  componentDidMount() {
    this.setTimer();
    document.addEventListener('click', this.handleClickOutside);
    this.getNodes();
  };

  setTimer() {
    timeout = setTimeout(() => this.setState({showIntro: false, showVideo: true}), this.introTime);
  }

  async getNodes() {
    try {
      let response = await fetch('https://raw.githubusercontent.com/gerdesque/pastforwardgraph/master/films.json');
      let responseJson = await response.json();
      this.setState({ films: responseJson.nodes, arcs: responseJson.arcs });
     } catch(error) {
      console.error(error);
    }
  }

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
    this.setState({showIntro: false, showVideo: false, showAssociation: true});
  }

  selectAssociation = target => {
    let currentNode = this.state.films.find(a => a.section === target);
    this.setState({
      introText: currentNode.intro,
      src: currentNode.video+'#t='+this.convertTime(currentNode.start)+','+this.convertTime(currentNode.end),
      associations:this.state.arcs.filter(a => a.source === target),      
    });
    this.setState({showIntro: true});
    this.setTimer();
  }

  getThumbnail(target) {
    let currentNode = this.state.films.find(a => a.section === target);
    return currentNode.thumbnail;
  }

  render() {

    let introComponent = null;
    let videoComponent = null;
    let associationComponent = null;
  
    if (this.state.showIntro) {
      introComponent = (<div className="intro"><p className="intro-Text">{this.state.introText}</p></div>);
    }
    if (this.state.showVideo) {
      videoComponent = (<video autoPlay muted onPause={this.pauseVideo}>
        <source type="video/mp4" src={this.state.src}></source>
        Your browser does not support the video tag.
      </video>);
    }
    if (this.state.showAssociation) {
      let associations = this.state.associations.map((a) => <div className="association-Container" onClick={e => this.selectAssociation(a.target)}>
      <img className="association-Image" alt={a.target} src={this.getThumbnail(a.target)}/>
      <p className="association-Text">{a.associationText}</p>
      </div>);
      associationComponent = (<div className="association">{associations}</div>);
    }

    return (<div className="Video" ref={node => { this.node = node; }}>{introComponent}{videoComponent}{associationComponent}</div>);
  }
}

export default Video;
