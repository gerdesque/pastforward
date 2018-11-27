import React, { Component } from 'react';
import './App.css';
import ImageList from './ImageList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showIntro: true,
      showAboutUs: false
    }
  }

  pauseVideo = event => {
    this.setState({showIntro: false});
  }

  showAboutUs = event => {
    this.setState({showAboutUs: !this.state.showAboutUs});
  }

  render() {
    let component = null;
    let about = null;

    let aboutText = (<p className="about-Text">
      Das Leben vor rund 100 Jahren: Kaiserzeit, Erster Weltkrieg, Weimarer Republik. Das Medium Film vom Anfang des 20. Jahrhundert hält diese aufregende, turbulente und auch von Krieg und Zerstörung geprägte Zeit fest.<br/>
      <br/>Wir hoffen die kleinen Filmausschnitte haben euch einen guten, ersten Einblick geben können.<br/>
      <br/>Für alle die mehr zur Kaiserzeit, zum Ersten Weltkrieg, zur Weimarer Republik und zum Medium des Films zwischen Propaganda, Berichterstattung und Unterhaltung erfahren wollen, haben wir hier eitne kleine Auswahl an weiterführenden Links zusammengestellt (ohne Anspruch auf Vollständigkeit).<br/>
      <ul>
      <li><a href="https://www.dhm.de/lemo/kapitel/erster-weltkrieg/propaganda/kriegspropaganda-im-alltag.html"><span role="img" aria-label="list item">⏩ </span>LeMO (Lebendiges Museum Online): Propaganda im Alltag des 1. Weltkrieges</a>, <a href="https://www.dhm.de/lemo/kapitel/erster-weltkrieg/kriegsverlauf/kriegsgefangenschaft.html">Kriegsgefangenschaft</a>, uvm.</li>
      <li><a href="https://www.filmportal.de/thema/das-deutsche-kino-und-der-erste-weltkrieg"><span role="img" aria-label="list item">⏩ </span>filmportal.de: Das deutsche Kino und der Erste Weltkrieg</a>, <a href="https://www.filmportal.de/thema/singende-sprechende-und-musizierende-films-die-tonbild-sammlung-im-deutschen-filminstitut">das Tonbild</a></li>
      <li><a href="http://erster-weltkrieg.dnb.de/WKI/Web/DE/Home/home.html"><span role="img" aria-label="list item">⏩ </span>Deutsche Nationalbibliothek: virtuelle Ausstellung “100 Jahre Erster Weltkrieg”</a></li>
      </ul>
      <br/>Diese Website entstand im Rahmen des Kulturhackathon Coding DaVinci Rhein-Main 2018. Wir danken dem Deutschen Filminstitut, welches die Filme unter public domain und die dazugehörigen Metadaten unter der CC0 Lizenz zur Verfügung gestellt hat. Wir (Anne, Gerd, Jana und Nadine) sind ein Team von historisch, technisch und kulturellinteressierten Menschen, die mit dieser Anwendung eine spielerische und informative Annäherung an den Film und die Zeit vor 100 Jahren schaffen wollen.
      </p>)

    if (this.state.showAboutUs) {
      about = (<div className="about">{aboutText}</div>);
    }

    if (this.state.showIntro) {
      component = (<video autoPlay muted onPause={this.pauseVideo}>
        <source type="video/mp4" src={require('./assets/intro.mp4')}></source>
        Your browser does not support the video tag.
      </video>);
    } else {
      component = (<ImageList/>)
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-past">past</h1><h1 className="App-forward">forward</h1>
          <span className="App-About" onClick={this.showAboutUs}/>
        </header>
        {about}
        {component}
      </div>
    );
  }
}

export default App;
