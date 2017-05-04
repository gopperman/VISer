import React, { Component } from 'react'
import logo from '../logo.svg'

class Header extends Component {
  render() {
    return (
        <header className="app-header">
			<img src={logo} className="app-logo" alt="logo" />
			<h1>Viser</h1>
			<p>Input your data, get an SVG</p>
        </header>
    )
  }
}

export default Header