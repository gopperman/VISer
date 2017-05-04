import copy from 'copy-to-clipboard';

/**
 * Takes the ID of a container with an SVG and a target textarea, 
 * and puts the SVG code in that textarea
 * @param  {string}	The container ID to pull the SVG from
 * @return {string}	the textarea ID to put the text into
 */
const exportSVG = (container) => {
		const doctype = 'xmlns="http://www.w3.org/2000/svg"',
			svg = document.getElementById(container).innerHTML

		copy(svg.replace('<svg', `<svg ${doctype}`))
}

export { exportSVG }