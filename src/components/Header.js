import React, { Component } from 'react'
import logo from '../logo.svg'

class Header extends Component {
  render() {
    return (
        <header className="app-header">
			<img src={logo} className="app-logo" alt="logo" />
			<h1>Viser</h1>
			<p>Input your data, get the code</p>
        </header>
    )
  }
}

export default Header