import React, { Component } from 'react'
import logo from '../logo2.svg'

class Header extends Component {
  render() {
    return (
        <header className="app-header">
			<img src={require('../logo.svg')} className="app-logo" alt="logo" />
          <h1>Viser</h1>
        </header>
    )
  }
}

export default Header
export {logo}