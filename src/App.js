import './App.css';
import React, { Component } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import SparkLine from './components/SparkLine'
import Export from './components/Export'
import { csvToArray } from './util/dataManipulation'

class App extends Component {
  constructor() {
    super()
    const rawData = 'Date,Value\n1/1/17,1\n1/2/17,2\n1/3/17,4\n1/4/17,8\n1/5/17,5\n1/6/17,4\n1/7/17,6\n1/8/17,9\n1/9/17,7\n1/10/17,7\n'
    const parsedData = csvToArray(rawData)
    this.state = { 
      rawData: rawData,
      parsedData: parsedData
    }


    this.textAreaUpdate = this.textAreaUpdate.bind(this)
  }

  textAreaUpdate(event) {
    const val = event.target.value

    this.setState({ 
      rawData: val,
      parsedData: csvToArray(val)
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.rawData !== nextState.rawData
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <p className="form-label">Paste your data into this field, seperated by commas:</p>
          <textarea id="data-input" onChange={this.textAreaUpdate}>{this.state.rawData}</textarea>
          <p className="select-graph">Select your graph:</p>
	        <SparkLine data={this.state.parsedData} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App
