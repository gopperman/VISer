import './App.css';
import React, { Component } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Bar from './components/Bar'
import Donut from './components/Donut'
import SparkLine from './components/SparkLine'
import { analyzeData, csvToArray } from './util/dataManipulation'
import { poll, timeScalar } from './data/sampleData'

class App extends Component {
  constructor() {
    super()

    const rawData = [],
      parsedData = csvToArray(rawData)

    this.state = { 
      rawData: [],
      parsedData: parsedData,
      ...analyzeData(parsedData)
    }

    this.textAreaUpdate = this.textAreaUpdate.bind(this)
    this.loadData = this.loadData.bind(this)
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

  componentDidMount() {
    // Let's cache some selectors
    this.textArea = document.getElementById('data-input')
  }

  loadData(e) {
    switch(e.target.getAttribute('data-set')) {
      case 'poll':
        this.textArea.value = poll
        break
      case 'timeScalar':
        this.textArea.value = timeScalar
        break
    }

    // Trigger onChange
    const event = new Event('input', { bubbles: true });
    this.textArea.dispatchEvent(event)
  }

  dataFacts() {
    const type = this.state.isDate ? 'time series' : 'dataset'

    return `a ${type} with ${this.state.rows} rows and ${this.state.columns} columns`
  }

  results() {
    // TODO: We could do a better job of checking for well-formed data
    if (this.state.rows > 0 && this.state.columns > 1) {
      return (
        <div id="results">
          <h2 className="input-detection">
              <p className="input-detection">Cool! It looks like you have <span className="data-facts">{this.dataFacts()}</span></p>
          </h2>
          <p className="select-graph">Here's what we made with it:</p>
          {this.renderCharts()}
        </div>
      )
    }
  }

  renderCharts() {
    let charts = []
    if (this.state.isDate) {
      charts.push(<SparkLine data={this.state.parsedData} />)
    } else {
      charts.push(<Donut data={this.state.parsedData} />)
      charts.push(<Bar data={this.state.parsedData} />)
    }
    return charts
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <label htmlFor="data-input" className="form-label">
            <p>Paste your data into this field, seperated by commas:</p>
            <p className="label-sub">(Alternatively, you can load some <a onClick={this.loadData} data-set="poll">sample</a> <a onClick={this.loadData} data-set="timeScalar">data</a>)</p>
          </label>
          <textarea id="data-input" onChange={this.textAreaUpdate} value={this.state.rawData}></textarea>
          {this.results()}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App
