import React, { Component, PropTypes } from 'react'
import { exportSVG } from '../util/dom'

class CopyButton extends Component {
	copyToClipboard(e) {
		e.target.classList.add('button__copy--clicked')
		e.target.innerHTML = 'SVG Copied'
		exportSVG(e.target.getAttribute('data-source'))
	}

	render() {
		return (
			<button className="button__copy" 
				onClick={this.copyToClipboard}
				data-source={this.props.source}>
				Copy SVG to Clipboard
			</button>
		)
	}
}

CopyButton.propTypes = {
	source: PropTypes.string.isRequired,
}

export default CopyButton