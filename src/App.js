import './App.css';
import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SparkLine from './components/SparkLine';
import * as data from './data/timeScalar.json';

class App extends Component {
  constructor() {
    super()
    this.state = { rawData: 'put yer data here' }
    
    this.textAreaUpdate = this.textAreaUpdate.bind(this)
  }

  textAreaUpdate(event) {
    this.setState({ rawData: event.target.value })
  }

  componentShouldUpdate(nextProps, nextState) {
    return this.state.rawData !== nextState.rawData
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <p>All right, let's make some charts. Paste your date into this handy-dandy box, seperated by commas:</p>
          <textarea id="data-input" onChange={this.textAreaUpdate}>{this.state.rawData}</textarea>
	        <SparkLine data={data.default} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App
