import * as d3 from 'd3'

// Set the default dimensions and margins of the graph

const margin = {top: 20, right: 20, bottom: 30, left: 50}

const getWidth = (el) => {
	return parseInt(el.style('width'), 10) - margin.left - margin.right
}

const width = getWidth(d3.select('body')),
    height = width * .75

const dimensions = { margin, width, height }

export { dimensions, getWidth }