import React, { Component } from 'react'
import copy from 'copy-to-clipboard';

class Export extends Component {
	copyToClipboard() {
		copy(document.getElementById('export__textarea').value);
	}
	render() {
		return (
			<div className="export">
				<h2>OK, let's export this baby</h2>
				<p>Copy this code into a blank file and name it <i>(whatever).svg</i></p>
				<textarea id="export__textarea"></textarea>
				<p>
					<button className="export__copy" onClick={this.copyToClipboard}>
						Copy to clipboard
					</button>
				</p>
			</div>
		)
	}
}

export default Export