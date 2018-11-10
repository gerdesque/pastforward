import React, { Component } from 'react';
import './App.css';
import ImageList from './ImageList';

class App extends Component {
  onClick = event => {
    document.getElementsByTagName('video')[0].remove(document.getElementsByTagName('video')[0]);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <a href="#top" className="App-Link" onClick={this.onClick}>
          <span className="App-past">past</span><span className="App-forward">forward</span>
        </a>
        </header>
        <ImageList/>
      </div>
    );
  }
}

export default App;
