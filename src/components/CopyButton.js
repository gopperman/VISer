import React, { Component, PropTypes } from 'react'
import { exportSVG } from '../util/dom'

class CopyButton extends Component {
	copyToClipboard(e) {
		e.target.classList.add('button__copy--clicked')
		e.target.innerHTML = 'Code Copied to Clipboard'
		//console.log(this.attr('data-source'))
		exportSVG(e.target.getAttribute('data-source'))
	}

	render() {
		return (
			<button className="button__copy" 
				onClick={this.copyToClipboard}
				data-source={this.props.source}>
				Copy Code to Clipboard
			</button>
		)
	}
}

CopyButton.propTypes = {
	source: PropTypes.string.isRequired,
}

export default CopyButton