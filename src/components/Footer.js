import React, { Component } from 'react'
import taco from '../svg/taco.svg'

class Footer extends Component {
  render() {
    return (
        <footer className="app-footer">
		<p>Made by Greg Opperman &amp; Amanda Erickson</p>
		<div className="taco__container">
			<img src={taco} className="taco" alt="A taco" />
		</div>

        </footer>
    )
  }
}

export default Footer