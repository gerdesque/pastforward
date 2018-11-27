import React, { Component } from 'react';
import './App.css';
import ImageList from './ImageList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showIntro: true
    }
  }

  pauseVideo = event => {
    this.setState({showIntro: false});
  }

  render() {
    let component = null;
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
        </header>
        {component}
      </div>
    );
  }
}

export default App;
