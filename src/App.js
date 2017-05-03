import './App.css';
import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SparkLine from './components/SparkLine';
import * as data from './data/timeScalar.json';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
        </div>
        <SparkLine data={data.default} />
        <Footer />
      </div>
    );
  }
}

export default App;
