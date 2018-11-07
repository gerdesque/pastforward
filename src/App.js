import React, { Component } from 'react';
import './App.css';
import ImageList from './ImageList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <a href="#top" className="App-Link" onClick="document.getElementsByTagName('video')[0].remove(document.getElementsByTagName('video')[0]);">
          <h1>past forward</h1>
        </a>
        </header>
        <ImageList/>
      </div>
    );
  }
}

export default App;
