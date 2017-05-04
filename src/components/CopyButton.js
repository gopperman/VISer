import React, { Component, PropTypes } from 'react'
import { exportSVG } from '../util/dom'

class CopyButton extends Component {
	copyToClipboard(e) {
		const button = e.target
		button.classList.add('button__copy--clicked')
		button.innerHTML = 'Code Copied'
		exportSVG(button.getAttribute('data-source'))
		setTimeout(() => {
			button.classList.remove('button__copy--clicked')
			button.innerHTML = 'Copy Code to Clipboard'
		}, 5000)
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