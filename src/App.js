import './App.css';
import React, { Component } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import SparkLine from './components/SparkLine'
import { analyzeData, csvToArray } from './util/dataManipulation'

class App extends Component {
  constructor() {
    super()
    const rawData = '1/1/17,1\n1/2/17,2\n1/3/17,4\n1/4/17,8\n1/5/17,5\n1/6/17,4\n1/7/17,6\n1/8/17,9\n1/9/17,7\n1/10/17,7\n',
      parsedData = csvToArray(rawData)

    this.state = { 
      rawData: rawData,
      parsedData: parsedData,
      ...analyzeData(parsedData)
    }

    this.textAreaUpdate = this.textAreaUpdate.bind(this)
  }

  textAreaUpdate(event) {
    const val = event.target.value,
      parsedData = csvToArray(val)

    this.setState({ 
      rawData: val,
      parsedData: parsedData,
      ...analyzeData(parsedData)
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.rawData !== nextState.rawData
  }

  renderCharts() {
    let charts = []
    if (this.state.isDate) {
      charts.push(<SparkLine data={this.state.parsedData} />)
    }
  }

  dataFacts() {
    const type = this.state.isDate ? 'time series' : 'dataset'

    return `a ${type} with ${this.state.rows} rows and ${this.state.columns} columns`
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <p className="form-label">Paste your data into this field, seperated by commas:</p>
          <textarea id="data-input" onChange={this.textAreaUpdate} value={this.state.rawData}></textarea>
          <h2>
            <p>Cool! It looks like you have {this.dataFacts()}.</p>
            <p>Let's see what we can do with that.</p>
          </h2>
          <p className="select-graph">Select your graph:</p>
	        {this.renderCharts()}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App
