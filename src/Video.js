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
      showEnd: false,
      introText: this.props.intro,
      src: this.props.src+'#t='+this.convertTime(this.props.start)+','+this.convertTime(this.props.end),
      associations: this.props.associations,
      films: [],
      arcs: [],
      counter: 0
    }
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  introTime = 5000;
  counterLimit = 6;

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
    if (this.state.counter >= this.counterLimit) {
      this.showEndPage();
    } else {
      this.setState({showIntro: false, showVideo: false, showAssociation: true});
    }
  }

  showEndPage() {
    this.setState({
      showIntro: false,
      showVideo: false,
      showAssociation: false,
      showEnd: true
    });
  }

  selectAssociation = target => {
    let currentNode = this.state.films.find(a => a.section === target);
    this.setState((prevState) => {
      return {
      showIntro: true,
      introText: currentNode.intro,
      src: currentNode.video+'#t='+this.convertTime(currentNode.start)+','+this.convertTime(currentNode.end),
      associations: this.state.arcs.filter(a => a.source === target),   
      counter: prevState.counter + 1}
    });
    this.setTimer();
  }

  getThumbnail(target) {
    let currentNode = this.state.films.find(a => a.section === target);
    return require('./assets/thumbnails/' + currentNode.id + '.jpg');
  }

  render() {
    const { showIntro, showVideo, showAssociation, showEnd } = this.state;

    let introComponent = null;
    let videoComponent = null;
    let associationComponent = null;
    let endComponent = null;
    let endText = (<div className="end-Text">
    Das Leben vor rund 100 Jahren: Kaiserzeit, Erster Weltkrieg, Weimarer Republik. Das Medium Film vom Anfang des 20. Jahrhundert hält diese aufregende, turbulente und auch von Krieg und Zerstörung geprägte Zeit fest.<br/>
    <br/>Wir hoffen die kleinen Filmausschnitte haben euch einen guten, ersten Einblick geben können.<br/>
    <br/>Für alle die mehr zur Kaiserzeit, zum Ersten Weltkrieg, zur Weimarer Republik und zum Medium des Films zwischen Propaganda, Berichterstattung und Unterhaltung erfahren wollen, haben wir hier eine kleine Auswahl an weiterführenden Links zusammengestellt (ohne Anspruch auf Vollständigkeit).<br/>
    <ul>
    <li><span role="img" aria-label="list item">⏩ </span>LeMO (Lebendiges Museum Online): <a target="_blank" rel="noopener noreferrer" href="https://www.dhm.de/lemo/kapitel/erster-weltkrieg/propaganda/kriegspropaganda-im-alltag.html">Propaganda im Alltag des 1. Weltkrieges</a>, <a target="_blank" rel="noopener noreferrer" href="https://www.dhm.de/lemo/kapitel/erster-weltkrieg/kriegsverlauf/kriegsgefangenschaft.html">Kriegsgefangenschaft</a>, <a target="_blank" rel="noopener noreferrer" href="https://www.dhm.de/lemo/kapitel/weimarer-republik/alltagsleben/hunger-und-elend.html">Hunger und soziales Elend in der Weimarer Republik</a>, uvm.</li>
    <li><span role="img" aria-label="list item">⏩ </span>filmportal.de: <a target="_blank" rel="noopener noreferrer" href="https://www.filmportal.de/thema/das-deutsche-kino-und-der-erste-weltkrieg">Das deutsche Kino und der Erste Weltkrieg</a>, <a target="_blank" rel="noopener noreferrer" href="https://www.filmportal.de/thema/singende-sprechende-und-musizierende-films-die-tonbild-sammlung-im-deutschen-filminstitut">das Tonbild</a></li>
    <li><span role="img" aria-label="list item">⏩ </span>Deutsche Nationalbibliothek: <a target="_blank" rel="noopener noreferrer" href="http://erster-weltkrieg.dnb.de/WKI/Web/DE/Home/home.html">virtuelle Ausstellung “100 Jahre Erster Weltkrieg”</a></li>
    <li><span role="img" aria-label="list item">⏩ </span>Deutsche digitale Bibliothek: <a target="_blank" rel="noopener noreferrer" href="http://ausstellungen.deutsche-digitale-bibliothek.de/kino/">Das Kino des Ersten Weltkriegs</a></li>
    </ul>
    <br/>Diese Website entstand im Rahmen des <a target="_blank" rel="noopener noreferrer" href="https://codingdavinci.de/events/rheinmain/">Kulturhackathon Coding DaVinci Rhein-Main 2018</a>. Wir danken dem <a target="_blank" rel="noopener noreferrer" href="https://deutsches-filminstitut.de/">Deutschen Filminstitut</a>, welches die Filme unter CC-BY-SA und die dazugehörigen Metadaten unter der CC0 Lizenz zur Verfügung gestellt hat. Wir (Anne, Gerd, Jana und Nadine) sind ein Team von historisch, technisch und kulturell interessierten Menschen, die mit dieser Anwendung eine spielerische und informative Annäherung an den Film und die Zeit vor 100 Jahren schaffen wollen.</div>)
  
    introComponent = (showIntro && <div className="intro"><p className="intro-Text">{this.state.introText}</p></div>);

    videoComponent = (showVideo && <video autoPlay muted onPause={this.pauseVideo}>
      <source type="video/mp4" src={this.state.src}></source>
      Your browser does not support the video tag.
    </video>);
    
    if (showAssociation) {
      let associations = this.state.associations.map((a) => <div className="association-Container" onClick={e => this.selectAssociation(a.target)}>
      <img className="association-Image" alt={a.target} src={this.getThumbnail(a.target)}/>
      <p className="association-Text">{a.associationText}</p>
      </div>);
      associationComponent = (<div style={{ display: (showIntro || showVideo ? 'none' : 'flex') }} className="association">{associations}</div>);
    }

    endComponent = (showEnd && <div className="end"><div className="end-Text">{endText}</div></div>);

    return (<div className="Video" ref={node => { this.node = node; }}>{introComponent}{videoComponent}{associationComponent}{endComponent}</div>);
  }
}

export default Video;
