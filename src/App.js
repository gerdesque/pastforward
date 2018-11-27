import React, { Component } from 'react';
import './App.css';
import ImageList from './ImageList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showIntro: true,
      showAboutUs: false,
      aboutText: "past forward"
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

    if (this.state.showAboutUs) {
      about = (<div className="about"><p className="about-Text">{this.state.aboutText}</p></div>);
    }

    if (this.state.showIntro) {
      component = (<video autoPlay muted onPause={this.pauseVideo}>
        <source type="video/mp4" src={require('./intro.mp4')}></source>
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
