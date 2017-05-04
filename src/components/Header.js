import React, { Component } from 'react'
import logo from '../logo.svg';

class Header extends Component {
  render() {
    return (
        <header className="app-header">
			<img src={logo} className="app-logo" alt="logo" />
          <h1>Viser</h1>
        </header>
    )
  }
}

export default Header