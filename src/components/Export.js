import React, { Component } from 'react'

class Export extends Component {
  render() {
    return (
		<div className="export">
			<h2>OK, let's export this baby</h2>
			<p>Copy this code into a blank file and name it <i>(whatever).svg</i></p>
			<textarea id="export__textarea"></textarea>
		</div>
    )
  }
}

export default Export