import React, { Component } from 'react';
import './App.css';
import ImageList from './ImageList';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <span className="App-past">past</span><span className="App-forward">forward</span>
        </header>
        <ImageList/>
      </div>
    );
  }
}

export default App;
