import React, { Component } from 'react'
import taco from '../svg/taco.svg'

class Footer extends Component {
  render() {
    return (
        <footer className="app-footer">
			<div className="taco__container">
				<img src={taco} className="taco" alt="A taco" />
			</div>
			<p>Made by Greg Opperman &amp; Amanda Erickson</p>
        </footer>
    )
  }
}

export default Footer